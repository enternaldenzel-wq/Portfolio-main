import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-body mb-4">Project Not Found</h1>
          <Link to="/" className="text-white/40 hover:text-white transition-colors underline underline-offset-8">Return to Home</Link>
        </div>
      </div>
    );
  }

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* 1. Hero Header */}
      <section className="pt-48 pb-24 px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto">
        <motion.div {...fadeIn}>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-4 py-1.5 rounded-full border border-white/20 font-mono-text text-[9px] tracking-widest uppercase text-white/60">
              {project.category}
            </span>
          </div>
          <h1 className="font-body text-[clamp(4rem,12vw,12rem)] leading-[0.82] tracking-tight font-medium mb-12 uppercase">
            {project.title.replace(" App", "").replace(" Experience", "")}<br />
            <span className="text-white/20 italic">{id === "pillatea" ? "Wellness" : "Case Study"}</span>
          </h1>
          <p className="max-w-4xl font-body text-xl md:text-2xl text-white/40 leading-[1.3] font-light">
            {project.description}
          </p>
        </motion.div>
      </section>

      {/* 2. Project Specs & Main Visual Split (50/50) */}
      <section className="px-6 md:px-12 lg:px-16 pb-48 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left: Specs Table */}
          <motion.div {...fadeIn} className="space-y-16">
            <div className="space-y-8">
              {[
                { label: "YEAR", value: project.year },
                { label: "CLIENT", value: project.client },
                { label: "ROLE", value: project.role },
                { label: "INDUSTRY", value: project.industry }
              ].map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-6 border-b border-white/10 group">
                  <span className="font-mono-text text-[10px] tracking-widest text-white/40 group-hover:text-white/60 transition-colors uppercase">
                    {spec.label}
                  </span>
                  <span className="font-body text-xl md:text-2xl font-medium uppercase text-white/90">
                    {spec.value}
                  </span>
                </div>
              ))}
              
              <div className="mt-8 flex flex-wrap gap-8 items-center font-mono-text text-[9px] uppercase tracking-[0.2em]">
                {/* Skip to Result */}
                <button 
                  onClick={() => {
                    const el = document.getElementById("results-section");
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }}
                  className="group flex items-center gap-4 text-white/40 hover:text-white transition-all duration-500 py-2"
                >
                  <span>Skip to result</span>
                  <div className="h-[1px] w-8 bg-white/20 group-hover:w-16 group-hover:bg-white transition-all duration-700" />
                </button>

                {/* Skip to Live Experience (Conditioned on existence) */}
                {project.sections.some(s => s.type === "iframe") && (
                  <button 
                    onClick={() => {
                      const el = document.getElementById("live-section");
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group flex items-center gap-4 text-white/40 hover:text-white transition-all duration-500 py-2"
                  >
                    <span>Live Experience</span>
                    <div className="h-[1px] w-8 bg-white/20 group-hover:w-16 group-hover:bg-white transition-all duration-700" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div 
            {...fadeIn} 
            className="aspect-[3/2] overflow-hidden bg-white/5"
          >
            <img src={project.heroImage} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-1000" alt={project.title} />
          </motion.div>
        </div>
      </section>

      {/* Dynamic Sections (Using FanCast Asymmetric 30/70 Logic) */}
      {(() => {
        const resultsIdx = project.sections.findIndex(s => 
          s.title?.toLowerCase().includes("final") || 
          s.title?.toLowerCase().includes("output") || 
          s.title?.toLowerCase().includes("result") ||
          s.title?.toLowerCase().includes("iteration") ||
          s.title?.toLowerCase().includes("packaging") ||
          (id === "the-sauce" && s.type === "video")
        );
        const targetIdx = resultsIdx !== -1 ? resultsIdx : project.sections.length - 1;

        return project.sections.map((section, idx) => {
          let sectionId;
          if (idx === targetIdx) sectionId = "results-section";
          if (section.type === "iframe") sectionId = "live-section";

          if (section.type === "text") {
            return (
              <section key={idx} id={sectionId} className="px-6 md:px-12 lg:px-16 py-48 border-t border-white/10">
              <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-24">
                <motion.div {...fadeIn}>
                  <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 sticky top-32">{section.title || "OVERVIEW"}</p>
                </motion.div>
                <motion.div {...fadeIn} className="space-y-16">
                  {section.subtitle && (
                    <h2 className="font-body text-[clamp(2.5rem,6vw,6.5rem)] leading-tight tracking-tight font-medium text-white/95 lowercase">
                      {section.subtitle}
                    </h2>
                  )}
                  <div className="max-w-3xl">
                    <p className="font-body text-xl md:text-2xl text-white/40 leading-relaxed font-light">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>
          );
        }

        if (section.type === "image") {
          return (
            <section key={idx} id={sectionId} className="px-6 md:px-12 lg:px-16 py-24">
              <motion.div {...fadeIn} className="relative aspect-[16/9] overflow-hidden bg-white/5 border border-white/5">
                <img 
                  src={section.content as string} 
                  className="w-full h-full object-contain p-8 md:p-12" 
                  alt={project.title} 
                />
                {section.title && (
                  <div className="absolute bottom-12 left-12">
                     <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/40">{section.title}</p>
                  </div>
                )}
              </motion.div>
            </section>
          );
        }

        if (section.type === "grid") {
          const gridContent = section.content as string[];
          return (
            <section key={idx} id={sectionId} className="px-6 md:px-12 lg:px-16 py-48 border-y border-white/10">
              <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {gridContent.map((img, i) => (
                  <motion.div key={i} {...fadeIn} className={i % 2 === 1 ? "lg:mt-32" : ""}>
                    <div className="aspect-square overflow-hidden bg-white/5 border border-white/5">
                      <img src={img} className="w-full h-full object-contain p-4 md:p-8" alt={`${project.title} detail`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        }

        if (section.type === "video") {
          return (
            <section key={idx} id={sectionId} className="px-6 md:px-12 lg:px-16 py-24">
              <motion.div {...fadeIn} className="relative aspect-[16/9] overflow-hidden bg-white/5 pb-[56.25%]">
                <video 
                  src={section.content as string} 
                  className="absolute inset-0 w-full h-full object-cover" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  controls
                />
                {section.title && (
                  <div className="absolute bottom-12 left-12">
                     <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/40">{section.title}</p>
                  </div>
                )}
              </motion.div>
            </section>
          );
        }

        if (section.type === "iframe") {
          return (
            <section key={idx} id={sectionId} className="px-6 md:px-12 lg:px-16 py-48 border-t border-white/10">
              <motion.div {...fadeIn} className="max-w-[1400px] mx-auto">
                <div className="mb-16">
                   <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 mb-4">LIVE EXPERIENCE</p>
                   <h2 className="font-body text-4xl md:text-5xl font-medium lowercase">Explore the finished site in-situ</h2>
                </div>
                
                {/* Browser UI Frame */}
                <div className="w-full bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Browser Bar */}
                  <div className="h-12 border-b border-white/10 flex items-center px-6 gap-8">
                    <div className="flex gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                       <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                       <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <div className="flex-1 bg-white/5 h-6 rounded-md flex items-center px-4">
                       <p className="font-mono-text text-[9px] text-white/30 uppercase tracking-widest truncate">{section.content as string}</p>
                    </div>
                  </div>
                  {/* Iframe Content */}
                  <div className="aspect-[16/10] w-full relative">
                    <iframe 
                      src={section.content as string}
                      className="absolute inset-0 w-full h-full bg-white"
                      title="Live Site Preview"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                   <a 
                    href={section.content as string} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 text-white/40 hover:text-white transition-all font-mono-text text-[9px] uppercase tracking-[0.2em]"
                   >
                     <span>Visit Live Website</span>
                     <div className="h-[1px] w-8 bg-white/20 group-hover:w-16 group-hover:bg-white transition-all duration-700" />
                   </a>
                </div>
              </motion.div>
            </section>
          );
        }

        return null;
        })
      })()}

      {/* 10. Latest Projects Footer */}
      <section className="px-6 md:px-12 lg:px-16 py-32 border-t border-white/10">
        <motion.div {...fadeIn} className="max-w-[1600px] mx-auto">
          <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 mb-16">Explore More</p>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            {projects.filter(p => p.id !== project.id).map((p) => (
              <Link 
                key={p.id} 
                to={`/project/${p.id}`} 
                className="font-display text-4xl text-white/20 hover:text-white transition-colors duration-500 uppercase tracking-tight"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ProjectDetail;
