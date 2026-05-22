'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase mb-4 text-sm md:text-base">যোগাযোগ</p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 text-balance tracking-tight">
            আমার সাথে কথা বলুন
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            আপনার প্রকল্প নিয়ে আলোচনা করতে আজই যোগাযোগ করুন। আমি প্রতিটি বার্তার উত্তর দিতে প্রতিশ্রুতিবদ্ধ।
          </p>
        </div>

        {submitted ? (
          <div className="bg-card/50 backdrop-blur-xl border border-primary/30 rounded-3xl p-12 text-center shadow-[0_0_40px_rgba(var(--primary),0.1)]">
            <div className="text-6xl mb-6 text-primary drop-shadow-md">✓</div>
            <p className="text-2xl text-foreground font-bold mb-2">ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে।</p>
            <p className="text-muted-foreground mt-2 text-lg">আমি শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl border border-border/50 bg-background/50 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 peer placeholder-transparent"
                  placeholder="আপনার সম্পূর্ণ নাম"
                />
                <label htmlFor="name" className="absolute left-4 top-4 text-muted-foreground transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-background peer-focus:px-2 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-primary peer-valid:bg-background peer-valid:px-2 cursor-text">
                  আপনার সম্পূর্ণ নাম
                </label>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl border border-border/50 bg-background/50 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 peer placeholder-transparent"
                  placeholder="আপনার ইমেইল"
                />
                <label htmlFor="email" className="absolute left-4 top-4 text-muted-foreground transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-background peer-focus:px-2 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-primary peer-valid:bg-background peer-valid:px-2 cursor-text">
                  ইমেইল ঠিকানা
                </label>
              </div>
            </div>

            <div className="relative group mb-10">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-4 rounded-xl border border-border/50 bg-background/50 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none peer placeholder-transparent"
                placeholder="আপনার প্রকল্প এবং চিন্তাভাবনা সম্পর্কে বলুন..."
              />
              <label htmlFor="message" className="absolute left-4 top-4 text-muted-foreground transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-background peer-focus:px-2 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-primary peer-valid:bg-background peer-valid:px-2 cursor-text">
                আপনার বার্তা
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:-translate-y-1 transform"
            >
              বার্তা পাঠান
            </button>
          </form>
        )}

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-3xl bg-card/30 backdrop-blur-sm border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">📧</div>
            <h3 className="text-xl font-bold text-foreground mb-3">ইমেইল</h3>
            <p className="text-muted-foreground group-hover:text-primary transition-colors duration-300">abid.hussain@gmail.com</p>
          </div>
          <div className="text-center p-8 rounded-3xl bg-card/30 backdrop-blur-sm border border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">📱</div>
            <h3 className="text-xl font-bold text-foreground mb-3">ফোন</h3>
            <p className="text-muted-foreground group-hover:text-accent transition-colors duration-300">+880 1716122475</p>
          </div>
          <div className="text-center p-8 rounded-3xl bg-card/30 backdrop-blur-sm border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">📍</div>
            <h3 className="text-xl font-bold text-foreground mb-3">অবস্থান</h3>
            <p className="text-muted-foreground group-hover:text-primary transition-colors duration-300">ঢাকা, বাংলাদেশ</p>
          </div>
        </div>
      </div>
    </section>
  )
}
