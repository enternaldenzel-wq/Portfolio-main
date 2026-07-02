import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { archiveEntries, ArchiveEntry } from "../data/archive";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ProjectArchive = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<ArchiveEntry | null>(null);
  
  const categories = ["All", "Photography", "Graphic Design", "Landing Page", "Experiment"];

  const filteredEntries = archiveEntries.filter(entry => 
    selectedCategory === "All" || entry.category === selectedCategory
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-white/10 selection:text-white">
      <section className="relative z-10 min-h-screen bg-background px-6 pt-48 pb-32 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-32 flex flex-col gap-12">
            <Link to="/work" className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors flex items-center gap-2 mb-8">
               ← Back to Selected Work
            </Link>
            <div className="flex flex-col gap-8 max-w-[1400px]">
              <h2 className="font-body text-[clamp(4rem,10vw,10rem)] leading-[0.85] tracking-tight text-white/95 font-medium">
                The Archive (2020-2024)
              </h2>
              <div className="max-w-xl md:ml-[30%] mt-4">
                <p className="font-body text-lg md:text-xl text-white/30 leading-relaxed font-light">
                  A collection of older explorations, photography, and experiments that shaped my journey. Not every project needs a case study, but every project tells a story.
                </p>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-16 border-b border-white/5 pb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono-text text-[10px] uppercase tracking-widest px-4 py-2 transition-all rounded-full border ${
                  selectedCategory === cat 
                  ? "bg-white text-black border-white" 
                  : "text-white/40 border-white/10 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 w-full">
            <AnimatePresence mode="popLayout">
              {filteredEntries.map((project, i) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => setSelectedImage(project)}
                  className="relative group overflow-hidden bg-white/[0.02] cursor-pointer rounded-xl break-inside-avoid"
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6 pointer-events-none">
                    <div className="flex justify-between items-start translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-500">
                       <span className="font-mono-text text-[9px] uppercase tracking-widest text-white bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
                         {project.category}
                       </span>
                       <span className="font-mono-text text-[9px] text-white/60">{project.year}</span>
                    </div>

                    <div className="translate-y-[10px] group-hover:translate-y-0 transition-transform duration-500">
                      {project.note && (
                        <p className="font-mono-text text-[10px] text-white mt-1 uppercase tracking-widest drop-shadow-md">
                          {project.note}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Lightbox */}
          <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
            <DialogContent className="max-w-[95vw] max-h-[95vh] border-none bg-black/95 backdrop-blur-xl p-0 overflow-hidden flex flex-col items-center justify-center">
              <AnimatePresence>
                {selectedImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative w-full h-full flex flex-col items-center justify-center gap-6 p-4 md:p-12"
                  >
                    <img
                      src={selectedImage.image}
                      alt={selectedImage.id}
                      className="max-w-full max-h-[75vh] object-contain shadow-[0_0_100px_rgba(255,255,255,0.1)] rounded-sm"
                    />
                    <div className="text-center space-y-2">
                      <div className="flex items-center gap-4 justify-center">
                        <span className="font-mono-text text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1 rounded-full">
                          {selectedImage.category}
                        </span>
                        <span className="font-mono-text text-[10px] text-white/20">{selectedImage.year}</span>
                      </div>
                      {selectedImage.note && (
                        <p className="font-mono-text text-[11px] text-white/30 uppercase tracking-[0.2em] mt-2">
                           {selectedImage.note}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogContent>
          </Dialog>

          <div className="mt-48 flex flex-col items-center gap-12 text-center py-32 border-t border-white/5">
            <h3 className="font-body text-3xl md:text-5xl text-white/40 font-light italic">
              Wait, there's more coming...
            </h3>
            <p className="font-body text-white/20 max-w-md">
              Denzel is currently curating more of his historic work. Check back soon for more photography and design artifacts.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-black pt-40 pb-20 px-6 md:px-12 lg:px-16 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 mb-8">Ready to see the future?</p>
          <Link to="/work" className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-none text-white hover:text-white/70 transition-colors">
            BACK TO SELECTED WORK
          </Link>
          <div className="flex justify-between items-center mt-40 pt-10 border-t border-white/5">
             <p className="font-mono-text text-[9px] uppercase tracking-widest text-white/20">© 2026 DENZEL NWANKWO</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectArchive;
