import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import asset1 from "@/assets/Asset 1@2x.png";

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Navbar = ({ isMenuOpen, setIsMenuOpen }: NavbarProps) => {
  const [currentTime, setCurrentTime] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: "CV", path: "/cv" },
  ];

  const handleLinkClick = (path: string) => {
    if (path.startsWith("#")) {
      const el = document.getElementById(path.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: path.slice(1) } });
      }
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[70] h-full w-full bg-black px-8 py-8 md:w-[500px] md:px-16 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex justify-end mb-8">
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="group relative h-10 w-16 rounded-full border border-white/20 flex items-center justify-center transition-all hover:border-white/40"
                  >
                    <div className="relative h-4 w-4">
                      <span className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 rotate-45 bg-white" />
                      <span className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 -rotate-45 bg-white" />
                    </div>
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 mb-4">Menu</p>
                  {menuItems.map((item, i) => {
                    const isActive = location.pathname === item.path || (item.path === "/" && location.pathname === "");
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="group flex items-baseline gap-2 cursor-pointer py-1"
                        onClick={() => handleLinkClick(item.path)}
                      >
                        <h3 className="font-display text-4xl sm:text-6xl tracking-tight text-white transition-colors group-hover:text-white/70 md:text-7xl uppercase relative">
                          {item.name}
                          {isActive && (
                            <motion.div 
                              layoutId="activeUnderline"
                              className="absolute -bottom-1 left-0 h-px w-full bg-white/40"
                            />
                          )}
                        </h3>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-8 mb-2">
                <div className="pt-8 border-t border-white/10">
                  <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 mb-3">Let's Talk</p>
                  <a href="mailto:ENTERNALDENZEL@GMAIL.COM" className="font-display text-2xl sm:text-3xl text-white underline underline-offset-8 decoration-white/20 hover:decoration-white transition-all uppercase block whitespace-nowrap overflow-hidden text-ellipsis">
                    ENTERNALDENZEL@GMAIL.COM +
                  </a>
                </div>

                <div className="flex flex-col gap-1 text-white/40">
                  <p className="font-display text-lg uppercase">LONDON, UNITED KINGDOM</p>
                  <p className="font-mono-text text-sm">{currentTime}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="font-mono-text text-[10px] uppercase tracking-widest text-white/30 mb-3">Socials</p>
                    <div className="flex gap-6">
                      {[
                        { label: "IG", url: "https://www.instagram.com/dxnzel.n/" },
                        { label: "LI", url: "https://www.linkedin.com/in/dnwankwo/" }
                      ].map((social) => (
                        <a 
                          key={social.label} 
                          href={social.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-mono-text text-xs text-white hover:text-white/60 transition-colors"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-6 border-t border-white/10">
                    <div className="flex gap-4">
                      <a href="#" className="font-mono-text text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-colors underline underline-offset-4 decoration-white/10">Privacy Policy</a>
                      <a href="#" className="font-mono-text text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-colors underline underline-offset-4 decoration-white/10">Terms</a>
                    </div>
                    <p className="font-mono-text text-[9px] uppercase tracking-widest text-white/20">© 2026 DENZEL NWANKWO</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-12 lg:px-16 transition-all duration-500 pointer-events-none"
      >
        <div className="pointer-events-auto h-8 w-8 cursor-pointer" onClick={() => navigate("/")}>
          <img src={asset1} alt="DENZEL NWANKWO" className="h-full w-full object-contain opacity-90 transition-opacity hover:opacity-100" />
        </div>

        <div className="hidden md:flex flex-col items-center gap-0.5 pointer-events-auto cursor-default translate-x-12">
          <p className="font-mono-text text-[9px] uppercase tracking-[0.2em] text-white/40">London (UK)</p>
          <p className="font-mono text-xs text-white font-medium">{currentTime}</p>
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col gap-1.5 p-2 group"
          >
            <span className="w-8 h-[1px] bg-white transform transition-transform group-hover:scale-x-75 origin-right" />
            <span className="w-8 h-[1px] bg-white transform transition-transform group-hover:scale-x-50 origin-right" />
          </button>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
