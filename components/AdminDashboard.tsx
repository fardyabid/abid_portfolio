'use client'

import { useState, useRef, useTransition, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { uploadArtworkAction, deleteArtworkAction } from '@/app/actions/artwork'
import { Artwork } from '@/lib/artworks'
import { Trash2, Upload, X, Image as ImageIcon, ArrowLeft, Loader2, Plus, Sparkles } from 'lucide-react'
import { Toaster, toast } from 'sonner'

export default function AdminDashboard({ initialArtworks }: { initialArtworks: Artwork[] }) {
  useEffect(() => {
    console.log('Client [AdminDashboard]: Component has mounted and hydrated successfully!');
  }, [])

  const [artworksList, setArtworksList] = useState<Artwork[]>(initialArtworks)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('ল্যান্ডস্কেপ')
  const [customCategory, setCustomCategory] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const presetCategories = ['ল্যান্ডস্কেপ', 'প্রকৃতি', 'আকাশ', 'বিমূর্ত']

  // Handle file selections
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('অনুগ্রহ করে একটি ছবি ফাইল (.jpg, .png, .jpeg ইত্যাদি) নির্বাচন করুন।')
      return
    }
    // Max 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      toast.error('ফাইলের সাইজ অনেক বড়। সর্বোচ্চ ১০MB পর্যন্ত ফাইল আপলোড করতে পারবেন।')
      return
    }
    setPhoto(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const finalCategory = customCategory.trim() !== '' ? customCategory.trim() : category

    if (!title.trim()) {
      toast.error('শিল্পকর্মের শিরোনাম প্রদান করুন।')
      return
    }
    if (!finalCategory.trim()) {
      toast.error('অনুগ্রহ করে একটি বিভাগ নির্বাচন করুন বা লিখুন।')
      return
    }
    if (!photo) {
      toast.error('একটি ছবি আপলোড করা আবশ্যক।')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', finalCategory)
    formData.append('photo', photo)

    startTransition(async () => {
      const result = await uploadArtworkAction(formData)
      if (result.success && result.artwork) {
        toast.success('শিল্পকর্মটি সফলভাবে আপলোড করা হয়েছে!')
        setArtworksList((prev) => [result.artwork as Artwork, ...prev])
        // Reset Form
        setTitle('')
        setDescription('')
        setCustomCategory('')
        setPhoto(null)
        setPhotoPreview(null)
      } else {
        toast.error(result.error || 'আপলোড করার সময় একটি সমস্যা হয়েছে।')
      }
    })
  }

  // Delete Handler
  const handleDelete = (id: string, itemTitle: string) => {
    console.log('Client [handleDelete]: Button clicked for id:', id);
    const isConfirmed = window.confirm(`আপনি কি নিশ্চিতভাবে "${itemTitle}" শিল্পকর্মটি ডিলিট করতে চান?`);
    if (!isConfirmed) {
      console.log('Client [handleDelete]: Deletion cancelled by user.');
      return;
    }

    console.log('Client [handleDelete]: Confirmation verified. Executing server action for id:', id);
    startTransition(async () => {
      try {
        const result = await deleteArtworkAction(id)
        console.log('Client [handleDelete]: Server action returned result:', result);
        if (result.success) {
          toast.success('শিল্পকর্মটি সফলভাবে মুছে ফেলা হয়েছে।')
          setArtworksList((prev) => prev.filter((art) => art.id !== id))
        } else {
          toast.error(result.error || 'মুছে ফেলার সময় একটি সমস্যা হয়েছে।')
        }
      } catch (error) {
        console.error('Client [handleDelete]: Executing delete action failed:', error);
        toast.error('মুছে ফেলার সময় নেটওয়ার্ক বা সিস্টেমের ত্রুটি ঘটেছে।')
      }
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-8 relative overflow-hidden">
      <Toaster position="bottom-right" theme="dark" />
      
      {/* Background gradients for premium artistic look */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border/40 pb-8">
          <div>
            <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase mb-2 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>অ্যাডমিন ড্যাশবোর্ড</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              পোর্টফোলিও ম্যানেজমেন্ট
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary/50 hover:bg-secondary/40 text-foreground transition-all duration-300 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>মূল ওয়েবসাইটে ফিরুন</span>
          </Link>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Pane - Form Card */}
          <div className="lg:col-span-5 bg-card/40 backdrop-blur-md rounded-2xl border border-border/50 p-6 md:p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 border-b border-border/20 pb-4 flex items-center gap-2">
              <Plus className="text-primary w-6 h-6" />
              <span>নতুন শিল্পকর্ম আপলোড করুন</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Image upload area */}
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-2">
                  ছবি আপলোড (Photo)*
                </label>
                
                {!photoPreview ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                      isDragOver
                        ? 'border-primary bg-primary/5 scale-[0.99]'
                        : 'border-border/60 hover:border-primary/60 hover:bg-secondary/20'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                      className="hidden"
                    />
                    <div className="bg-secondary p-4 rounded-full mb-4 text-muted-foreground group-hover:text-primary transition-colors">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-center mb-1">
                      ক্লিক করুন অথবা ড্র্যাগ করে আনুন
                    </p>
                    <p className="text-xs text-muted-foreground text-center">
                      PNG, JPG, JPEG (সর্বোচ্চ ১০MB)
                    </p>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-border bg-black/40 aspect-[4/3] flex items-center justify-center group shadow-inner">
                    <Image
                      src={photoPreview}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPhoto(null)
                        setPhotoPreview(null)
                      }}
                      className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition-transform hover:scale-105"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-xs border border-border/30">
                      {photo?.name} ({(photo!.size / (1024 * 1024)).toFixed(2)} MB)
                    </div>
                  </div>
                )}
              </div>

              {/* Title input */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-muted-foreground mb-2">
                  শিল্পকর্মের নাম (Title)*
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="যেমন: শরতের আকাশ, পাহাড়ি ঝর্ণা..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isPending}
                  className="w-full bg-secondary/30 border border-border/80 focus:border-primary/80 focus:ring-1 focus:ring-primary/80 rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground/60 transition-all outline-none"
                  required
                />
              </div>

              {/* Category selector */}
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-2">
                  বিভাগ (Category)*
                </label>
                
                {/* Preset categories grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {presetCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat)
                        setCustomCategory('') // Reset custom category when selecting preset
                      }}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        category === cat && !customCategory
                          ? 'bg-primary/10 border-primary text-primary shadow-sm'
                          : 'bg-secondary/10 border-border/50 hover:bg-secondary/40 text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="অথবা নতুন বিভাগ লিখুন (যেমন: পোট্রেট)"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    disabled={isPending}
                    className="w-full bg-secondary/30 border border-border/80 focus:border-primary/80 focus:ring-1 focus:ring-primary/80 rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground/60 transition-all outline-none"
                  />
                  {customCategory.trim() !== '' && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary/20 text-primary text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-primary/20">
                      কাস্টম
                    </div>
                  )}
                </div>
              </div>

              {/* Description input */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-muted-foreground mb-2">
                  বিবরণ (Description)
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="শিল্পকর্মটি সম্পর্কে সংক্ষিপ্ত বিবরণ লিখুন..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isPending}
                  className="w-full bg-secondary/30 border border-border/80 focus:border-primary/80 focus:ring-1 focus:ring-primary/80 rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground/60 transition-all outline-none resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isPending
                    ? 'bg-primary/50 text-primary-foreground cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:scale-[1.01] cursor-pointer'
                }`}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>আপলোড হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>শিল্পকর্ম যোগ করুন</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Pane - Current Items List */}
          <div className="lg:col-span-7 bg-card/40 backdrop-blur-md rounded-2xl border border-border/50 p-6 md:p-8 shadow-xl flex flex-col h-full lg:max-h-[820px]">
            <div className="flex items-center justify-between mb-6 border-b border-border/20 pb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ImageIcon className="text-primary w-6 h-6" />
                <span>বর্তমান শিল্পকর্মসমূহ ({artworksList.length})</span>
              </h2>
              <span className="text-xs text-muted-foreground">নতুনগুলো উপরে প্রদর্শিত হবে</span>
            </div>

            {artworksList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed border-border/40 rounded-xl">
                <ImageIcon className="w-16 h-16 mb-4 text-muted-foreground/40" />
                <p className="text-lg font-medium">কোনো শিল্পকর্ম পাওয়া যায়নি</p>
                <p className="text-sm mt-1">বামদিকের ফর্মটি ব্যবহার করে প্রথম শিল্পকর্ম আপলোড করুন।</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 lg:max-h-[660px] custom-scrollbar">
                {artworksList.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-xl bg-secondary/15 hover:bg-secondary/30 border border-border/30 hover:border-primary/20 transition-all duration-300 items-start md:items-center group"
                  >
                    {/* Small thumbnail preview */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted border border-border/50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-[11px] font-semibold">
                          {item.category}
                        </span>
                        {item.image.startsWith('/uploads/') && (
                          <span className="bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-medium">
                            আপলোডেড
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-base md:text-lg text-foreground truncate group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      {item.description ? (
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground/40 italic mt-0.5">
                          কোনো বিবরণ নেই
                        </p>
                      )}
                    </div>

                    {/* Action Button - Trash Icon */}
                    <div className="flex-shrink-0 ml-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.title)}
                        disabled={isPending}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-300 bg-secondary/50 border-border/80 text-muted-foreground hover:text-red-500 hover:border-red-500/50 hover:bg-red-950/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isPending ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        <span>ডিলিট</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
