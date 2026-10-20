import { getArtworks, Artwork } from '@/lib/artworks'
import AcademicPortfolioClient from '@/components/AcademicPortfolioClient'

export default async function Home() {
  const artworks: Artwork[] = await getArtworks()

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <AcademicPortfolioClient initialArtworks={artworks} />
    </main>
  )
}
