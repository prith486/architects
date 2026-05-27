'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Philosophy', 'Projects', 'Process', 'Contact'];

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
          scrolled || mobileMenuOpen
            ? 'bg-black/90 backdrop-blur-xl border-b border-primary/20 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
            : 'bg-gradient-to-b from-black/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden w-32 flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white/80 hover:text-primary transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Empty slot to balance flex-between on desktop */}
          <div className="w-32 hidden lg:block"></div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-12 text-white/70 text-xs font-inter uppercase tracking-[0.2em]">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="relative group hover:text-white transition-colors duration-500 py-2"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6 w-32 justify-end">
            <a 
              href="#contact" 
              className="flex items-center justify-center px-5 py-2 md:px-8 md:py-2.5 border border-primary text-primary text-[10px] md:text-[11px] uppercase tracking-[0.2em] hover:bg-primary/10 transition-all duration-500 rounded-md group relative overflow-hidden font-medium"
            >
              <span className="relative z-10">INQUIRE</span>
              <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col gap-10 text-center">
              {navItems.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-playfair tracking-widest text-white/80 hover:text-primary transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
