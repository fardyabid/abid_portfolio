'use server'

import { revalidatePath } from 'next/cache'
import { put, del } from '@vercel/blob'
import fs from 'fs'
import path from 'path'
import { getArtworks, saveArtworks, Artwork } from '@/lib/artworks'

// Helper to save uploaded file locally (during development)
async function saveUploadedFileLocally(file: File): Promise<string> {
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
      return { success: false, error: 'সবগুলো ক্ষেত্র পূরণ করুন (শিরোনাম, বিভাগ এবং ছবি প্রয়োজন)।' };
    }

    if (photo.size === 0) {
      return { success: false, error: 'অনুগ্রহ করে একটি সঠিক ছবি নির্বাচন করুন।' };
    }

    let imageUrl = '';
    const hasBlobConfig = !!process.env.BLOB_READ_WRITE_TOKEN;

    if (hasBlobConfig) {
      // Save image to Vercel Blob
      const timestamp = Date.now();
      const safeFilename = photo.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const blobPath = `uploads/${timestamp}-${safeFilename}`;
      
      console.log(`Server Action [uploadArtworkAction]: Uploading to Vercel Blob at path: ${blobPath}`);
      const blob = await put(blobPath, photo, {
        access: 'public',
      });
      console.log(`Server Action [uploadArtworkAction]: Uploaded successfully. URL: ${blob.url}`);
      imageUrl = blob.url;
    } else {
      // Check if we are running in production / serverless environment
      const isVercel = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
      if (isVercel) {
        return { 
          success: false, 
          error: 'Vercel Blob Storage is not connected to your project. Please go to your Vercel Dashboard -> Storage, connect your Blob Store to this project, and trigger a Redeploy.' 
        };
      }

      // Fallback: Save locally during dev
      console.log(`Server Action [uploadArtworkAction]: BLOB_READ_WRITE_TOKEN is missing. Falling back to local filesystem storage.`);
      imageUrl = await saveUploadedFileLocally(photo);
    }

    // Save artwork record
    const artworks = await getArtworks();
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
    await saveArtworks(artworks);
    console.log(`Server Action [uploadArtworkAction]: Added new artwork database record:`, newArtwork.id);

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
    const artworks = await getArtworks();
    const artworkToDelete = artworks.find(art => art.id === id);

    if (!artworkToDelete) {
      console.warn('Server Action [deleteArtworkAction]: Artwork not found for id:', id);
      return { success: false, error: 'শিল্পকর্মটি পাওয়া যায়নি।' };
    }

    const imagePath = artworkToDelete.image;

    // Delete image asset depending on whether it is local or cloud
    if (imagePath.startsWith('/uploads/')) {
      // Local development asset delete
      const filePath = path.join(process.cwd(), 'public', imagePath);
      console.log('Server Action [deleteArtworkAction]: Deleting local image file at path:', filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('Server Action [deleteArtworkAction]: Local image file deleted successfully');
      }
    } else if (!imagePath.startsWith('/images/')) {
      // Vercel Blob cloud asset delete
      console.log('Server Action [deleteArtworkAction]: Deleting image from Vercel Blob:', imagePath);
      try {
        await del(imagePath);
        console.log('Server Action [deleteArtworkAction]: Image deleted successfully from Vercel Blob');
      } catch (blobError) {
        console.error('Server Action [deleteArtworkAction]: Error deleting from Vercel Blob:', blobError);
      }
    }

    const updatedArtworks = artworks.filter(art => art.id !== id);
    await saveArtworks(updatedArtworks);
    console.log('Server Action [deleteArtworkAction]: Database updated. Total items left:', updatedArtworks.length);

    revalidatePath('/');
    revalidatePath('/admin');

    return { success: true };
  } catch (error: any) {
    console.error('Server Action [deleteArtworkAction]: Error occurred during deletion:', error);
    return { success: false, error: error.message || 'ডিলিট করার সময় একটি ত্রুটি ঘটেছে।' };
  }
}
