import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Asset Imports
import heroImg from "@/assets/FanCast_ScreenGrabs/Hero.jpg";
import problemImg from "@/assets/FanCast_ScreenGrabs/Problem_Statement.jpg";
import researchImg from "@/assets/FanCast_ScreenGrabs/Quantitative_Research.jpg";
import personaImg from "@/assets/FanCast_ScreenGrabs/User_Persona.jpg";
import screensImg from "@/assets/FanCast_ScreenGrabs/Major_Screens.jpg";
import taskflowsImg from "@/assets/FanCast_ScreenGrabs/Taskflows.jpg";
import sketchesImg from "@/assets/FanCast_ScreenGrabs/Sketches.jpg";
import thanksImg from "@/assets/FanCast_ScreenGrabs/Thank_You.jpg";
import it1 from "@/assets/FanCast_ScreenGrabs/Hifi_-_Digi_-_Home_Screen_-_Iteration_1.png";
import it1Extended from "@/assets/FanCast_ScreenGrabs/Hifi_-_Digi_-_Home_Screen_-_Iteration_1_extended.png";

const FanCastProject = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            {["SCHOOL PROJECT", "UX/UI DESIGN", "RESEARCH", "PRODUCT ARCHITECTURE"].map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full border border-white/20 font-mono-text text-[9px] tracking-widest uppercase text-white/60">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-body text-[clamp(4.5rem,14vw,14rem)] leading-[0.82] tracking-tight font-medium mb-12">
            FanCast<br />Experience.
          </h1>
          <p className="max-w-4xl font-body text-xl md:text-2xl text-white/40 leading-[1.3] font-light">
            FanCast is a UX design case study exploring how to create an engaging streaming experience tailored to fans of movies and TV shows. The project aimed to solve common user frustrations with streaming platforms — such as cluttered interfaces, poor personalization, and difficulty discovering new content — by delivering a streamlined and visually immersive app experience.
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
                { label: "YEAR", value: "2024" },
                { label: "CLIENT", value: "NONE" },
                { label: "INDUSTRY", value: "GAMING" },
                { label: "TIMELINE", value: "3 MONTHS" },
              ].map((spec) => (
                <div key={spec.label} className="pb-8 border-b border-white/10 flex justify-between items-baseline">
                  <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30">{spec.label}</p>
                  <p className="font-display text-2xl text-white/90">{spec.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div 
            {...fadeIn} 
            className="aspect-[3/2] overflow-hidden bg-white/5"
          >
            <img src={heroImg} className="w-full h-full object-cover transition-all duration-1000" alt="FanCast Hero" />
          </motion.div>
        </div>
      </section>

      {/* 3. Narrative Section: Problem Statement (Asymmetric 30/70) */}
      <section className="px-6 md:px-12 lg:px-16 py-48 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-24">
          <motion.div {...fadeIn}>
            <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 sticky top-32">THE CHALLENGE</p>
          </motion.div>
          <motion.div {...fadeIn} className="space-y-16">
            <h2 className="font-body text-[clamp(2.5rem,6vw,6.5rem)] leading-tight tracking-tight font-medium text-white/95 lowercase">
              Identifying the core frictions in fan engagement.
            </h2>
            <div className="max-w-3xl space-y-8">
              <p className="font-body text-xl md:text-2xl text-white/40 leading-relaxed font-light">
                The challenge is a lack of interaction and engagement between sports viewers and players. Traditional viewing methods often result in negative emotions like frustration and anxiety because they fail to replicate the high-energy experience of attending a game in person. Consequently, the goal is to develop a platform that improves real-time engagement and provides a more exciting, dynamic viewing experience for users.
              </p>
              <div className="aspect-[16/9] overflow-hidden bg-white/5">
                <img src={heroImg} className="w-full h-full object-cover" alt="Problem Statement" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Research Section (Asymmetric 30/70) */}
      <section className="px-6 md:px-12 lg:px-16 py-48 bg-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-24">
          <motion.div {...fadeIn}>
            <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 sticky top-32">QUANTITATIVE RESEARCH</p>
          </motion.div>
          <motion.div {...fadeIn} className="space-y-16">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={researchImg} className="w-full h-full object-cover" alt="Research Data" />
            </div>
            <p className="max-w-2xl font-body text-xl text-white/40 leading-relaxed italic">
              "Users suggested unique ideas, like in-game rewards, VR, and real-time Q&A with players, indicating an appetite for new, immersive, and interactive experiences."
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. Statistics Section (30/70) */}
      <section className="px-6 md:px-12 lg:px-16 py-48">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-24">
          <motion.div {...fadeIn}>
            <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 sticky top-32">METRICS</p>
          </motion.div>
          <motion.div {...fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { num: "78%", label: "Survey respondents who have watched 5+ online esports events." },
              { num: "20.5%", label: "Increase in total hours watched on YouTube Live in Q2 2024." },
              { num: "15.2B", label: "Total hours watched on YouTube Live reached in Q2 2024." },
              { num: "22%", label: "Users who report they are 'not likely' to attend in-person events." },
            ].map((stat, i) => (
              <div key={i} className="pt-12 border-t border-white/20">
                <h3 className="font-display text-8xl text-white mb-4">{stat.num}</h3>
                <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/40 max-w-[200px] leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Visual Gallery: Persona (Asymmetric 30/70) */}
      <section className="px-6 md:px-12 lg:px-16 py-48 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-24">
          <motion.div {...fadeIn}>
            <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 sticky top-32">PERSONA INSIGHTS</p>
          </motion.div>
          <motion.div {...fadeIn} className="space-y-16">
            <div className="aspect-[16/9] overflow-hidden bg-white/5">
              <img src={personaImg} className="w-full h-full object-cover" alt="User Persona" />
            </div>
            <h2 className="font-body text-4xl text-white/80 leading-snug font-light max-w-3xl">
              Understanding the diverse landscape of users through in-depth qualitative analysis and interaction mapping.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* 7. Major Screens (Full Width Cinematic) */}
      <section className="px-6 md:px-12 lg:px-16 pb-32">
        <motion.div {...fadeIn} className="relative aspect-[16/9] overflow-hidden bg-white/5">
          <img src={screensImg} className="w-full h-full object-cover" alt="Major Screens" />
          <div className="absolute bottom-12 left-12">
             <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/40">Visual Interface Overview</p>
          </div>
        </motion.div>
      </section>

      {/* 8. Design Detail Grid (Asymmetric) */}
      <section className="px-6 md:px-12 lg:px-16 py-48 border-y border-white/10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div {...fadeIn} className="space-y-12">
            <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30">TASKFLOWS</p>
            <div className="aspect-square overflow-hidden bg-white/5">
              <img src={taskflowsImg} className="w-full h-full object-cover" alt="Taskflows" />
            </div>
          </motion.div>
          <motion.div {...fadeIn} className="space-y-12 lg:mt-32">
            <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30">IDEATION SKETCHES</p>
            <div className="aspect-[4/5] overflow-hidden bg-white/5">
              <img src={sketchesImg} className="w-full h-full object-cover" alt="Sketches" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. Final Iteration Showcase */}
      <section className="px-6 md:px-12 lg:px-16 py-64">
        <div className="max-w-[1600px] mx-auto space-y-32">
          <motion.div {...fadeIn} className="text-center space-y-8 mb-32">
             <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30">FINAL ITERATION</p>
             <h2 className="font-body text-6xl md:text-8xl tracking-tighter text-white lowercase">The Home Experience.</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
            <motion.div {...fadeIn} className="bg-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <img src={it1Extended} className="w-full h-auto object-cover" alt="Home Screen Extended" />
            </motion.div>
            <motion.div {...fadeIn} className="space-y-12">
              <div className="bg-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <img src={it1} className="w-full h-auto object-cover" alt="Home Screen" />
              </div>
              <div className="pt-12 border-t border-white/10">
                <p className="font-body text-3xl text-white/40 leading-snug font-light italic">
                  Refining the visual hierarchy to prioritize immersion and discoverability.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. Latest Projects Footer */}
      <section className="px-6 md:px-12 lg:px-16 py-32 border-t border-white/10">
        <motion.div {...fadeIn} className="max-w-[1600px] mx-auto">
          <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 mb-16">Latest Projects</p>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            {["ROSÉ MIXING", "URBAN YOUTH", "THE SAUCE", "PILLATEA"].map((p) => (
              <Link 
                key={p} 
                to="/work" 
                className="font-display text-4xl text-white/20 hover:text-white transition-colors duration-500 uppercase tracking-tight"
              >
                {p}
              </Link>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FanCastProject;
