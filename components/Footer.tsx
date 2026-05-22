export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 text-foreground py-16 px-4 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="font-extrabold text-2xl mb-4 text-primary drop-shadow-sm">আবিদ হোসেইন</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
              ৩D টেক্সচার্ড ল্যান্ডস্কেপ পেইন্টিং এর মাধ্যমে প্রকৃতির অসাধারণ সৌন্দর্য প্রকাশ করি।
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-card/50 border border-white/5 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 shadow-sm">f</a>
              <a href="#" className="w-10 h-10 rounded-full bg-card/50 border border-white/5 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 shadow-sm">i</a>
              <a href="#" className="w-10 h-10 rounded-full bg-card/50 border border-white/5 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 shadow-sm">in</a>
            </div>
          </div>

  
        </div>

        <div className="border-t border-white/5 pt-8 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm font-light">
              © ২০২৬ আবিদ হোসেইন। সর্বাধিকার সংরক্ষিত।
            </p>
            <div className="flex gap-8 text-sm font-medium">
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
