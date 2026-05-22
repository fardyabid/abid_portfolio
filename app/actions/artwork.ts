'use server'

import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'
import { getArtworks, saveArtworks, Artwork } from '@/lib/artworks'

// Helper to save uploaded file
async function saveUploadedFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const timestamp = Date.now();
  const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `${timestamp}-${safeFilename}`;
  const filePath = path.join(uploadsDir, filename);

  await fs.promises.writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

export async function uploadArtworkAction(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const photo = formData.get('photo') as File;

    if (!title || !category || !photo) {
      return { success: false, error: 'সবগুলো ক্ষেত্র পূরণ করুন (শিরোনাম, বিভাগ এবং ছবি প্রয়োজন)।' };
    }

    if (photo.size === 0) {
      return { success: false, error: 'অনুগ্রহ করে একটি সঠিক ছবি নির্বাচন করুন।' };
    }

    // Save image
    const imageUrl = await saveUploadedFile(photo);

    // Save artwork record
    const artworks = getArtworks();
    const newArtwork: Artwork = {
      id: `art-${Date.now()}`,
      title,
      description: description || '',
      category,
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };

    // Prepend to display uploaded works first on the page
    artworks.unshift(newArtwork);
    saveArtworks(artworks);

    // Revalidate client pages
    revalidatePath('/');
    revalidatePath('/admin');

    return { success: true, artwork: newArtwork };
  } catch (error: any) {
    console.error('Error uploading artwork:', error);
    return { success: false, error: error.message || 'আপলোড করার সময় একটি ত্রুটি ঘটেছে।' };
  }
}

export async function deleteArtworkAction(id: string) {
  try {
    console.log('Server Action [deleteArtworkAction]: Initiating delete for id:', id);
    const artworks = getArtworks();
    const artworkToDelete = artworks.find(art => art.id === id);

    if (!artworkToDelete) {
      console.warn('Server Action [deleteArtworkAction]: Artwork not found for id:', id);
      return { success: false, error: 'শিল্পকর্মটি পাওয়া যায়নি।' };
    }

    // Delete uploaded image if it resides in public/uploads
    if (artworkToDelete.image.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', artworkToDelete.image);
      console.log('Server Action [deleteArtworkAction]: Deleting image file at path:', filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('Server Action [deleteArtworkAction]: Image file deleted successfully');
      } else {
        console.warn('Server Action [deleteArtworkAction]: Image file not found on disk at path:', filePath);
      }
    }

    const updatedArtworks = artworks.filter(art => art.id !== id);
    saveArtworks(updatedArtworks);
    console.log('Server Action [deleteArtworkAction]: Database updated. Total items left:', updatedArtworks.length);

    revalidatePath('/');
    revalidatePath('/admin');

    return { success: true };
  } catch (error: any) {
    console.error('Server Action [deleteArtworkAction]: Error occurred during deletion:', error);
    return { success: false, error: error.message || 'ডিলিট করার সময় একটি ত্রুটি ঘটেছে।' };
  }
}
