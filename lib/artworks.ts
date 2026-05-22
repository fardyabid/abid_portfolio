import fs from 'fs'
import path from 'path'

export interface Artwork {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
}

const dbPath = path.join(process.cwd(), 'data', 'artworks.json');

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

export function getArtworks(): Artwork[] {
  if (!fs.existsSync(dbPath)) {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const initialData = seedData();
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading artworks JSON:', error);
    return seedData();
  }
}

export function saveArtworks(artworks: Artwork[]): void {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dbPath, JSON.stringify(artworks, null, 2), 'utf-8');
}
