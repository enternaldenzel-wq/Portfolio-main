import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import heroImage from "@/assets/IMG_5214.jpg";
import projectFancast from "@/assets/project-fancast.jpg";
import projectRose from "@/assets/project-rose.png";
import projectUrban from "@/assets/project-urban.jpg";
import projectSauce from "@/assets/project-sauce.jpg";
import projectPillatea from "@/assets/project-pillatea.png";
import projectSaddington from "@/assets/project-saddington.png";
import projectAnubis from "@/assets/Anubis_Fitness/Hero.jpg";


const portraits = [
  { id: "fancast", src: projectFancast, title: "FanCast App", alt: "FanCast App – UX Case Study" },
  { id: "rose-mixing", src: projectRose, title: "Rosé Mixing", alt: "Rosé Mixing & Mastering" },
  { id: "urban-youth", src: projectUrban, title: "Urban Youth", alt: "Urban Youth Brand Guide" },
  { id: "the-sauce", src: projectSauce, title: "The Sauce", alt: "The Sauce – Written Report" },
  { id: "pillatea", src: projectPillatea, title: "PillaTea", alt: "PillaTea's Brand Presentation" },
  { id: "saddington", src: projectSaddington, title: "Saddington", alt: "Saddington Baynes – Creative Production" },
  { id: "anubis-fitness", src: projectAnubis, title: "Anubis Fitness", alt: "Anubis Fitness – Brand Identity & Web Redesign" },
];

const roles = [
  "Digital\nDesigner",
  "Brand\nDesigner",
  "UX/UI\nDesigner",
  "Music\nProducer",
];

const Index = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 100);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 4000);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, 50);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  const cardWidth = 160;
  const cardGap = 12;
  const centerCardWidth = 200;

  const scrollToCenter = useCallback((index: number) => {
    if (!galleryRef.current) return;
    const container = galleryRef.current;
    const containerWidth = container.offsetWidth;
    let scrollPosition = 0;
    for (let i = 0; i < index; i++) {
      scrollPosition += (i === currentSlide ? centerCardWidth : cardWidth) + cardGap;
    }
    scrollPosition += (index === currentSlide ? centerCardWidth : cardWidth) / 2;
    scrollPosition -= containerWidth / 2;
    container.scrollTo({ left: scrollPosition, behavior: "smooth" });
  }, [currentSlide]);

  useEffect(() => {
    scrollToCenter(currentSlide);
  }, [currentSlide, scrollToCenter]);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="relative h-screen overflow-hidden bg-background" onMouseMove={handleMouseMove}>
      <div className="relative h-full w-full bg-background">
        <div className="absolute inset-0 group cursor-none">
          <img
            src={heroImage}
            alt="Editorial silhouette"
            className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
          
          <motion.div 
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden hidden md:block"
          >
            <motion.div
              className="absolute flex items-center justify-center w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                x: mousePosition.x - 48,
                y: mousePosition.y - 48,
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
                mass: 0.5
              }}
            >
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-mono-text">Explore</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-10 flex h-screen flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="px-6 pt-24 md:px-12 md:pt-16 lg:px-16"
          >
            <h1 className="font-display text-[clamp(5rem,12vw,11rem)] leading-[0.92] tracking-[0.02em] text-foreground">
              {displayedText.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[3px] h-[0.85em] bg-foreground/80 ml-1 align-baseline translate-y-[0.05em]"
              />
            </h1>
          </motion.div>

          <div className="mt-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="relative w-full"
            >
              <div
                ref={galleryRef}
                className="flex items-center gap-4 overflow-x-auto px-8 py-3 scrollbar-hide md:px-16"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
                onMouseDown={() => setIsDragging(false)}
                onMouseMove={() => setIsDragging(true)}
              >
                {portraits.map((portrait, i) => {
                  const isCenter = i === currentSlide;
                  const isHovered = i === hoveredCard;
                  const w = isHovered ? 560 : 220;
                  const h = isHovered ? 320 : 180;
                  return (
                    <Link 
                      to={`/project/${portrait.id}`} 
                      key={i} 
                      className="block group-hover/card:z-50"
                      onClick={(e) => isDragging && e.preventDefault()}
                    >
                      <motion.div
                        onMouseEnter={() => setHoveredCard(i)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`gallery-card group/card ${isCenter ? "gallery-card-center" : "gallery-card-edge"}`}
                        style={{ width: w, height: h }}
                        animate={{
                          width: w,
                          height: h,
                          opacity: isHovered || isCenter ? 1 : Math.max(0.4, 1 - Math.abs(i - currentSlide) * 0.2),
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <img
                          src={portrait.src}
                          alt={portrait.alt}
                          loading="lazy"
                          width={512}
                          height={640}
                          draggable={false}
                          className="h-full w-full object-cover"
                        />
                        
                        {/* Hover State: Bottom Title & Gradient Overlay */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                          <span className="font-mono-text text-[9px] uppercase tracking-[0.2em] text-white">
                            {portrait.title}
                          </span>
                        </div>

                        {isCenter && (
                          <motion.div
                            className="absolute inset-0 border border-white/20 z-40"
                            layoutId="card-highlight"
                            transition={{ duration: 0.4 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-3 px-6 py-5 md:px-12 lg:px-16"
            >
              <span className="font-mono-text text-xs text-foreground/50">
                {String((hoveredCard !== null ? hoveredCard : currentSlide) + 1).padStart(2, "0")}
              </span>
              <div className="relative h-px w-36 bg-foreground/15">
                <motion.div
                  className="absolute left-0 top-0 h-px bg-foreground/70"
                  animate={{
                    width: `${(((hoveredCard !== null ? hoveredCard : currentSlide) + 1) / portraits.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
              <span className="font-mono-text text-xs text-foreground/50">
                {String(portraits.length).padStart(2, "0")}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
