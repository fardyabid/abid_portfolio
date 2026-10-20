import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const lato = Lato({ 
  subsets: ["latin"],
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lato'
});

export const metadata: Metadata = {
  title: 'Abid Hossain | 3D Landscape Artist & Sculptural Painter',
  description: 'Portfolio of Abid Hossain, a 3D Landscape Artist and Sculptural Relief Painter based in Dhaka, Bangladesh. Specializing in textured impasto paintings and nature art.',
  icons: {
    icon: '/images/paint-brush.png',
    apple: '/images/paint-brush.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans antialiased text-[#222222] bg-white`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
