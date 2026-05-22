'use server'

import { revalidatePath } from 'next/cache'
import { put, del } from '@vercel/blob'
import { getArtworks, saveArtworks, Artwork } from '@/lib/artworks'

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

    // Save image to Vercel Blob
    const timestamp = Date.now();
    const safeFilename = photo.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const blobPath = `uploads/${timestamp}-${safeFilename}`;
    
    console.log(`Server Action [uploadArtworkAction]: Uploading to Vercel Blob at path: ${blobPath}`);
    const blob = await put(blobPath, photo, {
      access: 'public',
    });
    console.log(`Server Action [uploadArtworkAction]: Uploaded successfully. URL: ${blob.url}`);

    // Save artwork record
    const artworks = await getArtworks();
    const newArtwork: Artwork = {
      id: `art-${Date.now()}`,
      title,
      description: description || '',
      category,
      image: blob.url,
      createdAt: new Date().toISOString(),
    };

    // Prepend to display uploaded works first on the page
    artworks.unshift(newArtwork);
    await saveArtworks(artworks);
    console.log(`Server Action [uploadArtworkAction]: Added new artwork to Vercel KV database:`, newArtwork.id);

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

    // Delete uploaded image from Vercel Blob if it's not a seeded image (which starts with /images/)
    if (!artworkToDelete.image.startsWith('/images/')) {
      console.log('Server Action [deleteArtworkAction]: Deleting image from Vercel Blob:', artworkToDelete.image);
      try {
        await del(artworkToDelete.image);
        console.log('Server Action [deleteArtworkAction]: Image deleted successfully from Vercel Blob');
      } catch (blobError) {
        console.error('Server Action [deleteArtworkAction]: Error deleting from Vercel Blob:', blobError);
        // We will continue to delete the metadata even if blob deletion fails, to avoid orphaned/undeletable UI entries
      }
    } else {
      console.log('Server Action [deleteArtworkAction]: Skipping Vercel Blob deletion for seeded image path:', artworkToDelete.image);
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
