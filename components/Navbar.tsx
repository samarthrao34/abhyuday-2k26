import React, { useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  const handleSmoothNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      window.location.hash = href;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    } else if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      window.location.hash = `#${id}`;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    }
    // External links handled by default
  }, []);

  return (
    <motion.nav
      style={{ opacity: navOpacity }}
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-auto"
    >
      {/* Desktop: College logo, org logos, centered nav, org logos */}
      <div className="hidden lg:flex items-center pointer-events-auto px-4 pt-3 pb-1">
        {/* Left: College logo */}
        <a href="#home" className="flex items-center flex-shrink-0 pointer-events-auto">
          <img src="/college-logo.png" alt="Ashoka Institute" className="h-12 w-auto object-contain drop-shadow-lg" loading="eager" decoding="async" />
        </a>

        {/* Center: Navigation bar */}
        <div className="flex-1 flex justify-center">
          <div
              className="flex items-center gap-3 xl:gap-4 whitespace-nowrap flex-nowrap px-6 py-2.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #2a1a12 0%, #22160f 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,164,58,0.2)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.25), 0 0 15px rgba(212,164,58,0.05)',
              }}
          >
            {NAV_ITEMS.map((item, i) => {
              const isExternal = item.href.startsWith('http');
              return (
                <React.Fragment key={item.label}>
                  <a
                    href={item.href}
                    {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                    onClick={!isExternal ? (e) => handleSmoothNav(e, item.href) : undefined}
                    className="relative text-[11px] font-medium text-white hover:text-amber-200 transition-all duration-300 tracking-[0.18em] uppercase group"
                  >
                    {item.label}
                    <span className="absolute left-0 -bottom-1.5 h-[1.5px] w-0 bg-gradient-to-r from-amber-400/80 via-yellow-300/90 to-orange-400/80 transition-all duration-300 group-hover:w-full rounded-full" />
                  </a>
                  {i < NAV_ITEMS.length - 1 && (
                    <span className="w-px h-3 bg-amber-300/15" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right: Spacer to balance the logo */}
        <div className="w-12 flex-shrink-0" />
      </div>

      {/* Mobile: Top bar with logo + hamburger */}
      <div
        className="flex lg:hidden items-center justify-between px-3 py-2 mx-2 mt-2 pointer-events-auto rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(10,5,25,0.55) 0%, rgba(20,10,40,0.45) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(212,164,58,0.2)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        }}
      >
        <a href="#home" className="flex items-center">
          <img src="/college-logo.png" alt="Ashoka Institute" className="h-10 w-auto object-contain drop-shadow-lg" loading="eager" decoding="async" />
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg"
          style={{
            background: 'rgba(20,10,40,0.6)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(212,164,58,0.25)',
          }}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`block h-0.5 bg-amber-200/80 rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-amber-200/80 rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-amber-200/80 rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile: Dropdown menu */}
      {mobileOpen && (
        <div
          className="lg:hidden pointer-events-auto mx-3 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(20,10,40,0.9) 0%, rgba(30,15,50,0.85) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(212,164,58,0.25)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}
        >
          <div className="flex flex-col py-3">
            {NAV_ITEMS.map((item) => {
              const isExternal = item.href.startsWith('http');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (!isExternal) handleSmoothNav(e, item.href);
                  }}
                  className="px-5 py-3 text-sm font-medium text-white hover:text-amber-200 hover:bg-white/5 transition-all tracking-[0.12em] uppercase"
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
