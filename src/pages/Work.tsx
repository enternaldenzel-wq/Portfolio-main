import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { projects } from "../data/projects";

const Work = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  // Get unique categories for filtering (Handle multi-tag projects)
  const categories = useMemo(() => {
    const allTags = projects.flatMap(p => p.category.split(", "));
    return ["All", ...Array.from(new Set(allTags))];
  }, []);

  // Filtering Logic (Handle containment for multi-tag projects)
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || project.category.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-white/10 selection:text-white">
      <div className="relative min-h-screen w-full bg-background">
        <section id="work" className="relative z-10 min-h-screen bg-background px-6 pt-48 pb-32 md:px-12 lg:px-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-32 flex flex-col gap-12">
              <p className="font-mono-text text-[11px] tracking-[0.2em] text-white/40">Case studies</p>
              <div className="flex flex-col gap-8 max-w-[1400px]">
                <h2 className="font-body text-[clamp(4rem,10vw,10rem)] leading-[0.85] tracking-tight text-white/95 font-medium">
                  Selected projects.
                </h2>
                <div className="max-w-xl md:ml-[30%] mt-4">
                  <p className="font-body text-lg md:text-xl text-white/30 leading-relaxed font-light">
                    Real work for real clients who needed more than pretty pictures. Explore how I’ve helped brands launch, scale, and transform through strategic design.
                  </p>
                </div>
              </div>
            </div>

            {/* Search & Filter - Fully Functional */}
            <div className="flex flex-col md:flex-row gap-6 mb-24 items-start">
              <div className="w-full md:w-[320px] relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <span className="text-[10px] opacity-20 text-white">🔍</span>
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search project..." 
                  className="w-full bg-transparent border-b border-white/10 px-6 py-3 font-body text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/20" 
                />
              </div>

              {/* Functional Genre Filter Dropdown */}
              <div className="w-full md:w-48 relative group">
                <div 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full bg-transparent border-b border-white/10 px-0 py-3 font-body text-sm flex justify-between items-center cursor-pointer hover:border-white/30 transition-colors group"
                >
                  <span className="text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-widest text-[10px]">
                    {selectedCategory}
                  </span>
                  <span className={`text-[8px] opacity-20 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}>▼</span>
                </div>
                
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border border-white/10 z-50 mt-2 py-2 overflow-hidden shadow-2xl"
                    >
                      {categories.map((cat) => (
                        <div 
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsFilterOpen(false);
                          }}
                          className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-colors cursor-pointer hover:bg-white/5 ${selectedCategory === cat ? 'text-white' : 'text-white/40'}`}
                        >
                          {cat}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Landscape Grid Layout - Updated with filtering */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32 items-start">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => {
                  return (
                    <motion.div 
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Link 
                        to={`/project/${project.id}`}
                        className="group cursor-pointer"
                        onMouseMove={(e) => handleMouseMove(e, project.id)}
                      >
                        <div className="relative aspect-[3/2] overflow-hidden mb-8 bg-white/10 rounded-sm">
                          <div className="absolute top-6 left-6 z-10 transition-opacity duration-500 group-hover:opacity-0">
                            <span className="font-mono-text text-[10px] text-white/40 tracking-widest">
                              [{String(i + 1).padStart(2, '0')}]
                            </span>
                          </div>
                      
                          <img 
                            src={project.heroImage} 
                            alt={project.title} 
                            className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:blur-md group-hover:brightness-50" 
                          />

                          {/* Hover Overlay Information */}
                          <div className="absolute inset-0 hidden md:flex flex-col justify-center px-12 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none translate-y-4 group-hover:translate-y-0">
                             <div className="flex flex-wrap gap-2 mb-6">
                                <span className="px-3 py-1 rounded-full border border-white/30 font-mono-text text-[9px] tracking-widest uppercase text-white/80 backdrop-blur-sm">
                                  {project.category}
                                </span>
                             </div>
                             <p className="font-body text-xl md:text-2xl text-white/90 leading-tight font-light max-w-sm">
                                {project.description.slice(0, 100)}...
                             </p>
                             <div className="mt-8">
                               <span className="font-mono-text text-[9px] text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                                 View Case Study <span className="text-white">→</span>
                               </span>
                             </div>
                          </div>
                        </div>

                        <div className="space-y-3 mt-4">
                          <div className="flex justify-between items-baseline">
                            <h4 className="font-display text-2xl text-white tracking-[0.02em] font-medium transition-colors group-hover:text-white/80">
                              {project.title}
                            </h4>
                            <span className="font-mono-text text-[10px] text-white/20">{project.year}</span>
                          </div>
                          <div className="md:hidden mt-2">
                             <span className="px-3 py-1 rounded-full border border-white/30 font-mono-text text-[9px] tracking-widest uppercase text-white/80">
                               {project.category}
                             </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Link to Archive */}
            <div className="mt-48 flex flex-col items-center justify-center py-24 border-y border-white/5 group">
              <Link to="/archive" className="flex flex-col items-center gap-6">
                <span className="font-mono-text text-[10px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">Exploring more</span>
                <h3 className="font-display text-4xl md:text-6xl text-white uppercase text-center hover:text-white/70 transition-colors cursor-pointer flex items-center gap-4">
                  View older projects <span className="text-white/20 group-hover:translate-x-4 transition-transform duration-500">→</span>
                </h3>
                <p className="font-body text-white/20 text-sm mt-4 tracking-wide font-light">Photography, Graphic Design & Experiments</p>
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="relative z-10 bg-black pt-40 pb-20 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
              <div>
                <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 mb-12">Let's work together</p>
                <a href="mailto:ENTERNALDENZEL@GMAIL.COM" className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-none text-white uppercase hover:text-white/70 transition-colors underline underline-offset-[20px] decoration-white/10">ENTERNALDENZEL@GMAIL.COM ↗</a>
              </div>
              <div className="flex flex-col gap-8 md:text-right">
                <div>
                  <p className="font-mono-text text-[9px] uppercase tracking-widest text-white/20 mb-2">Location</p>
                  <p className="font-display text-xl text-white uppercase">London, UK</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center py-10 border-t border-white/5">
              <p className="font-mono-text text-[9px] uppercase tracking-widest text-white/20">© 2026 DENZEL NWANKWO</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Work;
