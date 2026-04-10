import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Work from "./pages/Work.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import FanCastProject from "./pages/FanCastProject.tsx";
import CV from "./pages/CV";
import NotFound from "./pages/NotFound.tsx";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

const PageTransition = ({ children, isMenuOpen }: { children: React.ReactNode; isMenuOpen: boolean }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ 
          opacity: isMenuOpen ? 0.6 : 1, 
          y: 0,
          filter: isMenuOpen ? "blur(10px)" : "blur(0px)",
          scale: isMenuOpen ? 0.98 : 1
        }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full origin-center"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <PageTransition isMenuOpen={isMenuOpen}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/work" element={<Work />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
