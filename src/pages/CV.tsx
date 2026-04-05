import { motion } from "framer-motion";

const CV = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-48 pb-32 md:px-12 lg:px-16 selection:bg-white/10 selection:text-white">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div {...fadeIn} className="space-y-6">
            <p className="font-mono-text text-[11px] tracking-[0.2em] text-white/40 uppercase">Professional Documents</p>
            <h1 className="font-body text-[clamp(3.5rem,8vw,8.5rem)] leading-[0.85] tracking-tight text-white/95 font-medium uppercase">
              Curriculum<br />Vitae.
            </h1>
          </motion.div>

          <motion.div 
            {...fadeIn} 
            transition={{ ...fadeIn.transition, delay: 0.2 }}
            className="flex flex-col gap-8 md:text-right"
          >
            <p className="font-body text-xl text-white/30 leading-relaxed font-light max-w-sm ml-auto">
              A comprehensive breakdown of my design odyssey, creative strategies, and technical mastery.
            </p>
            
            <a 
              href="/Denzel_Nwankwo_CV.pdf" 
              download="Denzel_Nwankwo_CV.pdf"
              className="group relative inline-flex items-center gap-4 bg-white px-8 py-5 text-black font-mono-text text-[10px] uppercase tracking-widest overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Download CV [PDF]</span>
              <span className="relative z-10 text-lg group-hover:translate-y-1 transition-transform">↓</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </motion.div>
        </div>

        {/* PDF Viewer Container -snug layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[900px] mx-auto bg-white/5 border border-white/10 rounded-sm overflow-hidden group shadow-2xl shadow-white/5"
        >
          <iframe 
            src="/Denzel_Nwankwo_CV.pdf#view=FitH&toolbar=0&navpanes=0&scrollbar=0"
            className="w-full h-[1200px] border-none grayscale-[0.1] opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            title="Denzel Nwankwo CV"
          />
          
          {/* Subtle Overlay Hint */}
          <div className="absolute bottom-8 right-8 pointer-events-none opacity-40">
             <p className="font-mono-text text-[9px] uppercase tracking-widest text-white/30">Official A4 Deliverable</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CV;
