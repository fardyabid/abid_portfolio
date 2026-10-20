import { kv } from '@vercel/kv'
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

const artworkSeeds: { title: string; desc: string; category: string; file: string }[] = [
  {
    title: "Mountain Peak Reverie (3D Relief)",
    desc: "Heavy impasto textural landscape depicting rugged Himalayan ridges with layered marble dust paste, cobalt shadows, and warm gold sunrise glazes.",
    category: "Landscape",
    file: "IMG_20260505_220531832_HDR.jpg"
  },
  {
    title: "Riverbank Twilight Serenade",
    desc: "Multi-layered water vistas featuring gentle river ripples and atmospheric twilight reflections sculpted with translucent acrylic glazes.",
    category: "Nature & Forests",
    file: "FB_IMG_1777997631223.jpg"
  },
  {
    title: "Golden Horizon Sunset",
    desc: "Warm amber, terracotta, and crimson sunset gradients capturing the atmospheric glow over rolling delta horizons with sculpted cloud formations.",
    category: "Sky & Twilight",
    file: "FB_IMG_1777997645595.jpg"
  },
  {
    title: "Chromatic Dimensions & Abstract Form",
    desc: "Intersecting geometric waves and organic texture peaks created through knife carving, plaster layering, and subtle metallic undertones.",
    category: "Abstract & Relief",
    file: "FB_IMG_1777997657004.jpg"
  },
  {
    title: "Alpine Solitude in Winter",
    desc: "Snow-capped crystalline crags sculpted with heavy stucco paste, titanium white peaks, and deep ultramarine crevasse shadows.",
    category: "Landscape",
    file: "FB_IMG_1777997666537.jpg"
  },
  {
    title: "Verdant Woodland Sanctuary",
    desc: "Tactile forest canopy rendered with deep emerald greens, raw umber bark reliefs, and textured moss layers that react dynamically to ambient lighting.",
    category: "Nature & Forests",
    file: "FB_IMG_1777997678415.jpg"
  },
  {
    title: "Celestial Starry Nightscape",
    desc: "Swirling midnight blue galaxies, starry constellations, and glowing lunar textures sculpted with dimensional paste and iridescent mineral highlights.",
    category: "Sky & Twilight",
    file: "FB_IMG_1777997699473.jpg"
  },
  {
    title: "Terra & Geological Strata",
    desc: "Tactile exploration of natural stone formations and soil textures created with fine silica sand, raw pigment washes, and sculpted structural paste.",
    category: "Abstract & Relief",
    file: "IMG_20260505_220617389_HDR.jpg"
  }
];

function seedData(): Artwork[] {
  return artworkSeeds.map((item, index) => ({
    id: `art-${index + 1}`,
    title: item.title,
    description: item.desc,
    category: item.category,
    image: `/images/${item.file}`,
    createdAt: new Date(Date.now() - (artworkSeeds.length - index) * 24 * 60 * 60 * 1000).toISOString()
  }));
}

const localFilePath = path.join(process.cwd(), 'data', 'artworks.json');

export async function getArtworks(): Promise<Artwork[]> {
  // If KV is not configured, fall back to local JSON file
  if (!process.env.KV_REST_API_URL) {
    try {
      if (fs.existsSync(localFilePath)) {
        const fileContent = await fs.promises.readFile(localFilePath, 'utf8');
        const parsed = JSON.parse(fileContent);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading local artworks file:', e);
    }
    return seedData();
  }

  // Use Vercel KV when configured
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
    return seedData();
  }
}

export async function saveArtworks(artworks: Artwork[]): Promise<void> {
  // If KV is not configured, write to local JSON file
  if (!process.env.KV_REST_API_URL) {
    const isVercel = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
    if (isVercel) {
      throw new Error('Vercel KV (Redis) database is not connected to your project. Please connect it in your Vercel Dashboard and trigger a Redeploy.');
    }

    try {
      const dataDir = path.dirname(localFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      await fs.promises.writeFile(localFilePath, JSON.stringify(artworks, null, 2), 'utf8');
      return;
    } catch (e) {
      console.error('Error saving artworks to local file:', e);
      throw e;
    }
  }

  // Use Vercel KV when configured
  try {
    await kv.set('artworks', artworks);
  } catch (error) {
    console.error('Error saving artworks to Vercel KV:', error);
    throw error;
  }
}
