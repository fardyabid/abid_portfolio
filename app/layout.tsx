import type { Metadata } from 'next'
import { Noto_Sans_Bengali } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansBengali = Noto_Sans_Bengali({ 
  subsets: ["bengali", "latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'আবিদ হোসেইন - ৩D ল্যান্ডস্কেপ আর্টিস্ট',
  description: 'আবিদ হোসেইনের ৩D টেক্সচার্ড ল্যান্ডস্কেপ পেইন্টিং পোর্টফোলিও। অনন্য শিল্পকর্ম এবং সৃজনশীল ডিজাইন।',
  generator: 'v0.app',
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
    <html lang="bn" className="dark">
      <body className={`${notoSansBengali.variable} font-sans antialiased text-foreground bg-background`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
