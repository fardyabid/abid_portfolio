'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Artwork } from '@/lib/artworks'

interface AcademicPortfolioClientProps {
  initialArtworks: Artwork[]
}

export default function AcademicPortfolioClient({ initialArtworks }: AcademicPortfolioClientProps) {
  const [activeLightbox, setActiveLightbox] = useState<{ src: string; caption: string } | null>(null)

  const openModal = (src: string, caption: string) => {
    setActiveLightbox({ src, caption })
  }

  const closeModal = () => {
    setActiveLightbox(null)
  }

  return (
    <div className="w-full max-w-[720px] mx-auto px-3.5 py-4 text-[#222222] font-['Lato',Verdana,Helvetica,sans-serif] text-[15px] leading-[1.55]">
      {/* Header Intro Table */}
      <table className="w-full border-0 border-separate border-spacing-0 mb-4 intro-table">
        <tbody>
          <tr className="intro-row">
            <td className="w-[66%] pr-3 py-2 align-middle intro-text">
              <div className="text-center mb-3 intro-name-email">
                <h1 className="text-[32px] font-bold text-[#111] tracking-tight m-0 inline-block">
                  Abid Hossain
                </h1>
                <div className="text-[14px] text-[#444] mt-1">
                  abid.hussain.art [AT] gmail [DOT] com &nbsp;&bull;&nbsp; Dhaka, Bangladesh
                </div>
              </div>

              <p className="text-justify text-[#333] leading-[1.6] mb-3.5 intro-bio text-[15px]">
                I am a <strong>3D Landscape Artist & Sculptural Relief Painter</strong> based in Dhaka, Bangladesh. With over a decade of dedicated studio exploration, I specialize in tactile multi-dimensional landscape painting, sculpted impasto mountainscapes, and atmospheric fine art that capture the serenity, texture, and organic drama of nature.
                <br /><br />
                My creative process bridges traditional fine art techniques and contemporary 3D sculptural reliefs, utilizing heavy-body acrylic mediums, marble dust stucco paste, and layered natural pigments on canvas and wood panels. With over 50 completed private and commercial commissions across Asia and internationally, my mission is to transform flat surfaces into living, breathing spatial landscapes that invite touch, contemplation, and emotion.
              </p>

              <div className="text-center font-medium text-[15px] intro-links">
                <a href="#artworks" className="text-[#800000] font-semibold hover:text-[#f09228] transition-colors">Artworks</a> &nbsp;/&nbsp;
                <a href="#experience" className="text-[#800000] font-semibold hover:text-[#f09228] transition-colors">Experience</a> &nbsp;/&nbsp;
                <a href="#skills" className="text-[#800000] font-semibold hover:text-[#f09228] transition-colors">Skills</a> &nbsp;/&nbsp;
                <a href="#exhibitions" className="text-[#800000] font-semibold hover:text-[#f09228] transition-colors">Exhibitions</a> &nbsp;/&nbsp;
                <a href="#education" className="text-[#800000] font-semibold hover:text-[#f09228] transition-colors">Education</a> &nbsp;/&nbsp;
                <a href="#contact" className="text-[#800000] font-semibold hover:text-[#f09228] transition-colors">Contact</a>
              </div>
            </td>

            <td className="w-[30%] max-w-[32%] p-2 align-middle text-center intro-image-cell">
              <a
                href="/images/abid-portrait.jpg"
                className="inline-block rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                title="Abid Hossain"
              >
                <img
                  src="/images/abid-portrait.jpg"
                  alt="Abid Hossain"
                  className="w-[160px] h-[160px] rounded-full object-cover block"
                />
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Section: Education */}
      <section id="education" className="mt-4">
        <h2 className="text-[22px] font-bold text-[#111] pb-1 border-b border-[#eaeaea] mb-2">
          Education
        </h2>
        <div className="py-1">
          <strong>B.F.A. in Painting & Visual Arts</strong> &mdash; 2018
          <br />
          <span className="text-[#444]">Faculty of Fine Art, University of Dhaka (Charukala), Bangladesh</span>
        </div>
      </section>

      {/* Section: Work Experience */}
      <section id="experience" className="mt-5">
        <h2 className="text-[22px] font-bold text-[#111] pb-1 border-b border-[#eaeaea] mb-2">
          Work Experience
        </h2>
        <div className="space-y-4 py-1">
          <div>
            <strong>Lead 3D Landscape Artist & Studio Founder</strong> | Abid Hossain Fine Art Studio, Dhaka, Bangladesh
            <br />
            <em className="text-[#555] text-[14px]">January 2018 &ndash; Present</em>
            <ul className="list-disc pl-5 mt-1.5 space-y-1 text-[#333]">
              <li>Conceptualize and sculpt bespoke 3D textured acrylic landscapes, large-scale multi-dimensional wall reliefs, and atmospheric horizon paintings.</li>
              <li>Specialize in impasto mountain ridges, textured cloudscapes, river reflections, and deep woodland foliage using proprietary texture pastes and heavy acrylics.</li>
              <li>Completed over 50 custom commissions for private collectors, boutique architectural spaces, and high-end residential interiors with 100% satisfaction.</li>
            </ul>
          </div>

          <div>
            <strong>Curatorial Associate & Art Consultant</strong> | Dhaka Contemporary Fine Arts Network
            <br />
            <em className="text-[#555] text-[14px]">March 2016 &ndash; December 2018</em>
            <ul className="list-disc pl-5 mt-1.5 space-y-1 text-[#333]">
              <li>Curated thematic group exhibitions and oversaw artwork cataloging, lighting setup, and archival framing.</li>
              <li>Advised art patrons and interior architects on spatial artwork integration, color harmonization, and lighting angles for relief textures.</li>
            </ul>
          </div>

          <div>
            <strong>Visual Arts Instructor & Workshop Lead</strong> | Studio Crafts & Palette Academy, Dhaka
            <br />
            <em className="text-[#555] text-[14px]">January 2014 &ndash; February 2016</em>
            <ul className="list-disc pl-5 mt-1.5 space-y-1 text-[#333]">
              <li>Mentored over 120 students in palette-knife sculpting, texture mediums, color gradients, and compositional balance.</li>
              <li>Conducted hands-on demonstrations of heavy-body acrylic impasto techniques and protective archival varnishing.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section: Technical & Artistic Skills */}
      <section id="skills" className="mt-5">
        <h2 className="text-[22px] font-bold text-[#111] pb-1 border-b border-[#eaeaea] mb-2">
          Technical & Artistic Skills
        </h2>
        <table className="w-full border-0 border-separate border-spacing-0 skills-table text-[15px]">
          <tbody>
            <tr>
              <td className="w-[210px] font-bold text-[#222] py-1 align-top pr-3 whitespace-nowrap skills-category">Artistic Mediums:</td>
              <td className="text-[#333] py-1 align-top skills-desc">3D Textured Acrylics, Heavy-Body Impasto, Marble Dust Stucco, Mixed-Media Relief, Oil & Resin Glazes</td>
            </tr>
            <tr>
              <td className="w-[210px] font-bold text-[#222] py-1 align-top pr-3 whitespace-nowrap skills-category">Core Themes & Subjects:</td>
              <td className="text-[#333] py-1 align-top skills-desc">Mountain Ranges, Twilight & Sunrise Skies, Riverine Vistas, Verdant Forests, Celestial Nightscapes, Abstract Landscapes</td>
            </tr>
            <tr>
              <td className="w-[210px] font-bold text-[#222] py-1 align-top pr-3 whitespace-nowrap skills-category">Sculpting & Texturing:</td>
              <td className="text-[#333] py-1 align-top skills-desc">Palette Knife Sculpting, High-Relief Modeling, Multi-layer Glazing, Sgraffito, Texture Pastes, Gesso Priming, Archival Varnishing</td>
            </tr>
            <tr>
              <td className="w-[210px] font-bold text-[#222] py-1 align-top pr-3 whitespace-nowrap skills-category">Digital & Design Tools:</td>
              <td className="text-[#333] py-1 align-top skills-desc">Blender 3D, Adobe Photoshop, Procreate, Digital Mockups, Spatial Art Visualization</td>
            </tr>
            <tr>
              <td className="w-[210px] font-bold text-[#222] py-1 align-top pr-3 whitespace-nowrap skills-category">Professional Services:</td>
              <td className="text-[#333] py-1 align-top skills-desc">Bespoke Commission Painting, Spatial Curation, Art Consultation, Restoration & Framing, Private Art Masterclasses</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Section: Artworks & Projects */}
      <section id="artworks" className="mt-6">
        <h2 className="text-[22px] font-bold text-[#111] pb-1 border-b border-[#eaeaea] mb-3">
          Selected Artworks & Projects
        </h2>
        <div className="space-y-4">
          {initialArtworks.map((art, index) => (
            <div key={art.id} className="flex flex-col sm:flex-row gap-4 items-start py-1">
              <div className="w-full sm:w-[140px] shrink-0">
                <img
                  src={art.image}
                  alt={art.title}
                  onClick={() => openModal(art.image, `${art.title} — ${art.category}`)}
                  className="w-full sm:w-[140px] h-[95px] object-cover rounded shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:scale-105 hover:shadow-[0_6px_16px_rgba(0,0,0,0.22)] transition-all duration-200 cursor-pointer block"
                />
              </div>
              <div className="flex-1 text-[15px] leading-[1.5]">
                <button
                  type="button"
                  onClick={() => openModal(art.image, `${art.title} — ${art.category}`)}
                  className="text-left font-bold text-[#800000] hover:text-[#f09228] transition-colors p-0 m-0 border-0 bg-transparent cursor-pointer inline text-[15px]"
                >
                  [{index + 1}] {art.title}
                </button>
                : {art.description}
                <div className="text-[#666] text-[13.5px] mt-0.5">
                  ({art.category} &bull; 3D Textured Relief Medium)
                </div>
                <div className="mt-1 text-[14px]">
                  [<button
                    type="button"
                    onClick={() => openModal(art.image, `${art.title} — ${art.category}`)}
                    className="text-[#800000] hover:text-[#f09228] transition-colors bg-transparent border-0 p-0 cursor-pointer"
                  >
                    View High-Res Art
                  </button>] &nbsp;
                  [<a href="#contact" className="text-[#800000] hover:text-[#f09228] transition-colors">Inquire Commission</a>]
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Exhibitions & Honors */}
      <section id="exhibitions" className="mt-6">
        <h2 className="text-[22px] font-bold text-[#111] pb-1 border-b border-[#eaeaea] mb-2">
          Selected Exhibitions & Honors
        </h2>
        <div className="space-y-4 py-1">
          <div>
            <div className="font-bold text-[#800000]">
              [1] Echoes of Nature: 3D Relief Landscapes &mdash; Solo Exhibition
            </div>
            <strong>Abid Hossain</strong>
            <br />
            <span className="text-[#444]">National Art Gallery, Bangladesh Shilpakala Academy, Dhaka, 2024</span>
            <br />
            <span className="text-[#b22222] font-bold text-[13.5px]">&#127942; BEST CONTEMPORARY SCULPTURAL ARTWORK AWARD</span>
            <br />
            [<a href="#contact" className="text-[#800000] hover:text-[#f09228]">Catalog Details</a>] &nbsp;|&nbsp; [<a href="#contact" className="text-[#800000] hover:text-[#f09228]">Press Coverage</a>]
            <p className="mt-1 text-[#444] italic text-[14px]">
              A solo exhibition showcasing 28 tactile multi-dimensional landscape paintings investigating how ambient lighting creates organic shifts in depth, shadows, and mood throughout the day.
            </p>
          </div>

          <div>
            <div className="font-bold text-[#800000]">
              [2] Asian Landscape Art Biennale
            </div>
            <strong>Abid Hossain</strong> (Invited Resident Artist)
            <br />
            <span className="text-[#444]">International Contemporary Art Pavilion, Singapore, 2023</span>
            <br />
            <span className="text-[#b22222] font-bold text-[13.5px]">&#127941; SILVER DISTINCTION IN VISUAL FINE ARTS</span>
            <p className="mt-1 text-[#444] italic text-[14px]">
              Honored for innovative palette-knife texturing techniques and high-relief atmospheric landscape storytelling across Asian art circles.
            </p>
          </div>

          <div>
            <div className="font-bold text-[#800000]">
              [3] Terra & Sky: Dimensions of the Delta &mdash; Juried National Exhibition
            </div>
            <strong>Abid Hossain</strong>
            <br />
            <span className="text-[#444]">Bengal Foundation Art Gallery, Dhaka, 2022</span>
            <p className="mt-1 text-[#444] italic text-[14px]">
              Curated 8-piece series on riverine textures and twilight horizons celebrating the timeless landscape of rural Bangladesh.
            </p>
          </div>

          <div>
            <div className="font-bold text-[#800000]">
              [4] Emerging Fine Artist of the Year Award
            </div>
            <strong>Abid Hossain</strong>
            <br />
            <span className="text-[#444]">Bangladesh Visual Arts Guild Annual Honors, 2020</span>
            <p className="mt-1 text-[#444] italic text-[14px]">
              Awarded for outstanding contribution to modern dimensional landscape painting and community arts education.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Certifications */}
      <section className="mt-5">
        <h2 className="text-[22px] font-bold text-[#111] pb-1 border-b border-[#eaeaea] mb-2">
          Certifications & Masterclasses
        </h2>
        <div className="py-1 text-[#333] space-y-1">
          <div><strong>Masterclass in Advanced Palette Knife & Impasto Sculpting</strong> &mdash; 2021 | Royal Academy of Fine Arts (Online)</div>
          <div><strong>Archival Fine Art Conservation & Mixed-Media Preservation</strong> &mdash; 2019 | International Fine Art Guild</div>
          <div><strong>Digital 3D Visualization & Spatial Art Modeling</strong> &mdash; 2018 | Creative Media Arts</div>
        </div>
      </section>

      {/* Section: Volunteer */}
      <section className="mt-5">
        <h2 className="text-[22px] font-bold text-[#111] pb-1 border-b border-[#eaeaea] mb-2">
          Volunteer & Community Engagement
        </h2>
        <div className="py-1 text-[#333] space-y-3">
          <div>
            <strong>Community Fine Art Mentor</strong> | Dhaka Children&apos;s Art Foundation
            <br />
            <em className="text-[#555] text-[14px]">January 2019 &ndash; Present</em>
            <p className="text-[#444] mt-1 text-[14.5px]">
              Conducted weekly non-profit painting workshops for underprivileged youth, fostering visual literacy, drawing foundations, and creative self-expression.
            </p>
          </div>

          <div>
            <strong>Visual Arts Coordinator</strong> | National Youth Art Festival, Dhaka
            <br />
            <em className="text-[#555] text-[14px]">2017 &ndash; 2020</em>
            <p className="text-[#444] mt-1 text-[14.5px]">
              Coordinated exhibition layout and conducted interactive tactile art demonstrations for over 500 student artists.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Contact */}
      <section id="contact" className="mt-5">
        <h2 className="text-[22px] font-bold text-[#111] pb-1 border-b border-[#eaeaea] mb-2">
          Contact & Studio Commissions
        </h2>
        <div className="py-1 text-[#333]">
          <p className="mb-2">
            I welcome commissioned projects, exhibition opportunities, gallery collaborations, and private studio visits. Whether you are looking for a bespoke large-scale 3D landscape for an architectural space or an intimate textured fine art piece, feel free to get in touch:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Email:</strong> <a href="mailto:abid.hussain.art@gmail.com" className="text-[#800000] hover:text-[#f09228]">abid.hussain.art [AT] gmail [DOT] com</a></li>
            <li><strong>Studio Location:</strong> Dhaka, Bangladesh (Visits by appointment)</li>
            <li><strong>Inquiries:</strong> Available for global shipping & bespoke commissions</li>
            <li><strong>Social:</strong> <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#800000] hover:text-[#f09228]">Instagram</a> &nbsp;|&nbsp; <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#800000] hover:text-[#f09228]">LinkedIn</a> &nbsp;|&nbsp; <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[#800000] hover:text-[#f09228]">Facebook</a></li>
          </ul>
        </div>
      </section>

      {/* Footer Note */}
      <div className="text-right text-[12px] text-[#888] mt-8 pt-3 border-t border-[#eaeaea]">
        &copy; 2026 Abid Hossain. Design adapted in the clean academic style of <a href="https://arnab9961.github.io/" target="_blank" rel="noreferrer" className="text-[#800000] hover:text-[#f09228]">arnab9961.github.io</a> / Jon Barron.
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center p-4 cursor-pointer"
          onClick={closeModal}
        >
          <button
            type="button"
            className="absolute top-4 right-6 text-white text-3xl font-bold bg-transparent border-0 cursor-pointer hover:text-[#f09228]"
            onClick={closeModal}
          >
            &times;
          </button>
          <img
            src={activeLightbox.src}
            alt="Artwork Full"
            className="max-w-[90%] max-h-[80vh] object-contain rounded shadow-2xl"
          />
          <div className="text-white mt-3 text-center text-[16px] font-medium">
            {activeLightbox.caption}
          </div>
        </div>
      )}
    </div>
  )
}
