
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] py-4 md:py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-[#2a2048]/80 backdrop-blur-xl shadow-lg' : ''}`}>
        {/* Brand Logo */}
        <div className="pointer-events-auto">
          <a href="#home" className="flex flex-row items-center gap-3 group">
            <img 
              src="/college-logo.png" 
              alt="College Logo" 
              className={`transition-all duration-500 ${isScrolled ? 'w-16 h-16 md:w-20 md:h-20' : 'w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36'}`} 
              style={{ objectFit: 'contain' }} 
            />
          </a>
        </div>

        {/* Nav Links - Desktop */}
        <div className="hidden lg:flex items-center gap-8 glass-pill px-8 py-3 rounded-full pointer-events-auto shadow-lg">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-[11px] font-semibold text-purple-200/60 hover:text-violet-300 transition-all tracking-[0.18em] uppercase relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Register Button - Desktop */}
        <div className="hidden lg:block pointer-events-auto">
          <motion.a
            href="#events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-700 text-white text-sm font-bold rounded-full hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-purple-500/25"
          >
            Register Now
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden pointer-events-auto p-2.5 rounded-xl bg-white/5 border border-purple-400/15 text-purple-200"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] lg:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-gradient-to-b from-[#2a2048] to-[#1e1835] border-l border-purple-400/15 shadow-2xl"
            >
              <div className="p-6 pt-24">
                <nav className="space-y-2">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-purple-200/70 hover:text-white hover:bg-white/5 transition-all font-medium"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-8 border-t border-purple-400/15"
                >
                  <a
                    href="#events"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-3 text-center bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold rounded-xl"
                  >
                    Register Now
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
