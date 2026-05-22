'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Artwork } from '@/lib/artworks'

export default function Portfolio({ initialArtworks }: { initialArtworks: Artwork[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব')
  const [selectedArtwork, setSelectedArtwork] = useState<null | Artwork>(null)

  // Dynamically compile categories based on actual artworks, seeding defaults
  const defaultCategories = ['ল্যান্ডস্কেপ', 'প্রকৃতি', 'আকাশ', 'বিমূর্ত']
  const uniqueCategories = Array.from(new Set(initialArtworks.map(art => art.category).filter(Boolean)))
  const categoriesList = Array.from(new Set([...defaultCategories, ...uniqueCategories]))
  const categories = ['সব', ...categoriesList]

  const filteredArtworks = selectedCategory === 'সব'
    ? initialArtworks
    : initialArtworks.filter(art => art.category === selectedCategory)

  return (
    <section id="portfolio" className="py-28 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase mb-4 text-sm md:text-base">পোর্টফোলিও</p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 text-balance tracking-tight">
            আমার শিল্পকর্ম
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-balance max-w-2xl mx-auto font-light leading-relaxed">
            টেক্সচার্ড ৩D পেইন্টিং এর একটি সংগ্রহ যেখানে প্রতিটি কাজ একটি অনন্য যাত্রা
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.5)] scale-105'
                  : 'bg-secondary/50 text-foreground hover:bg-secondary hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              onClick={() => setSelectedArtwork(artwork)}
              style={{ breakInside: 'avoid' }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-500 relative"
            >
              {/* Dynamic Aspect Ratio simulation for Masonry using default object-cover */}
              <div className={`relative w-full overflow-hidden ${index % 3 === 0 ? 'aspect-[3/4]' : index % 2 === 0 ? 'aspect-[4/3]' : 'aspect-square'} bg-muted`}>
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">
                    {artwork.title}
                  </h3>
                  <p className="text-primary font-medium text-sm drop-shadow-md">
                    {artwork.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Modal */}
        {selectedArtwork && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setSelectedArtwork(null)}
          >
            <div className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center">
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white/10 hover:bg-primary text-white rounded-full p-3 transition-colors duration-300 backdrop-blur-md z-[101]"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <div className="relative w-full h-[80vh] flex items-center justify-center">
                <Image
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  fill
                  quality={100}
                  sizes="100vw"
                  className="object-contain drop-shadow-2xl"
                />
              </div>
              <div className="mt-6 text-center max-w-2xl px-4">
                <h4 className="font-bold text-2xl text-white tracking-wide">{selectedArtwork.title}</h4>
                <p className="text-primary font-medium mt-1 text-sm">{selectedArtwork.category}</p>
                {selectedArtwork.description && (
                  <p className="text-muted-foreground mt-3 text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto">
                    {selectedArtwork.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
