import { kv } from '@vercel/kv'

export interface Artwork {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
}

const imageFiles = [
  "FB_IMG_1777997631223.jpg", "FB_IMG_1777997639514.jpg", "FB_IMG_1777997645595.jpg", "FB_IMG_1777997657004.jpg", 
  "FB_IMG_1777997666537.jpg", "FB_IMG_1777997678415.jpg", "FB_IMG_1777997699473.jpg", "FB_IMG_1777997701526.jpg", 
  "FB_IMG_1777997712083.jpg", "FB_IMG_1777997733661.jpg", "FB_IMG_1777997742423.jpg", "FB_IMG_1777997760839.jpg", 
  "FB_IMG_1777997763803.jpg", "FB_IMG_1777997766357.jpg", "FB_IMG_1777997768696.jpg", "FB_IMG_1777997770920.jpg", 
  "FB_IMG_1777997773042.jpg", "FB_IMG_1777997775482.jpg", "FB_IMG_1777997778635.jpg", "FB_IMG_1777997781157.jpg", 
  "FB_IMG_1777997784326.jpg", "IMG_20260505_220439774_HDR.jpg", "IMG_20260505_220502735_HDR.jpg", "IMG_20260505_220531832_HDR.jpg", 
  "IMG_20260505_220617389_HDR.jpg", "IMG_20260505_220626489_HDR.jpg", "IMG_20260505_220645361_HDR.jpg", "IMG_20260505_220707242_HDR.jpg", 
  "IMG_20260505_220748249_HDR.jpg", "IMG_20260505_220819678_HDR.jpg", "IMG_20260505_220828177_HDR.jpg", "IMG_20260505_220841204_HDR.jpg", 
  "IMG_20260505_220853608.jpg", "IMG_20260505_220900549_HDR.jpg", "IMG_20260505_220911300_HDR.jpg", "IMG_20260505_220923267_HDR.jpg", 
  "IMG_20260505_220937329_HDR.jpg"
];

const categoriesList = ['ল্যান্ডস্কেপ', 'প্রকৃতি', 'আকাশ', 'বিমূর্ত'];

function seedData(): Artwork[] {
  return imageFiles.map((filename, index) => ({
    id: `seed-${index + 1}`,
    title: `শিল্পকর্ম ${index + 1}`,
    description: "একটি চমৎকার ৩D টেক্সচার্ড পেইন্টিং শিল্পকর্ম। আবিদ হোসেইনের অনন্য সৃজনশীল কাজ।",
    category: categoriesList[index % categoriesList.length],
    image: `/images/${filename}`,
    createdAt: new Date(Date.now() - (37 - index) * 24 * 60 * 60 * 1000).toISOString()
  }));
}

export async function getArtworks(): Promise<Artwork[]> {
  try {
    let artworks = await kv.get<Artwork[]>('artworks');
    if (!artworks || artworks.length === 0) {
      console.log('No artworks found in Vercel KV, seeding initial dataset...');
      artworks = seedData();
      await kv.set('artworks', artworks);
    }
    return artworks;
  } catch (error) {
    console.error('Error reading artworks from Vercel KV:', error);
    // Fall back to seed data if KV REST settings are not configured yet (e.g. local preview)
    return seedData();
  }
}

export async function saveArtworks(artworks: Artwork[]): Promise<void> {
  try {
    await kv.set('artworks', artworks);
  } catch (error) {
    console.error('Error saving artworks to Vercel KV:', error);
    throw error;
  }
}
