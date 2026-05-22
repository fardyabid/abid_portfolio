import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getArtworks } from '@/lib/artworks'

export default async function Home() {
  const artworks = getArtworks()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Portfolio initialArtworks={artworks} />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}

