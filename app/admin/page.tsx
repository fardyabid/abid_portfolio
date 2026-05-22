import { Metadata } from 'next'
import { getArtworks } from '@/lib/artworks'
import AdminDashboard from '@/components/AdminDashboard'

export const metadata: Metadata = {
  title: 'অ্যাডমিন প্যানেল - আবিদ হোসেইন পোর্টফোলিও',
  description: 'শিল্পকর্ম পোর্টফোলিও অ্যাডমিন প্যানেল। নতুন পেইন্টিং ও ছবি আপলোড করুন এবং বিদ্যমান শিল্পকর্ম পরিচালনা করুন।',
}

// Force dynamic execution to bypass static build cache and serve current items
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const artworks = getArtworks()

  return (
    <main className="min-h-screen bg-background">
      <AdminDashboard initialArtworks={artworks} />
    </main>
  )
}
