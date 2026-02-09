
import React from 'react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] py-8 px-8 md:px-16 flex justify-between items-center pointer-events-none">
      {/* Brand Logo */}

      <div className="pointer-events-auto">
        <a href="#" className="flex flex-row items-center gap-3 group">
          {/* College Logo left - big */}
          <img src="/college-logo.png" alt="College Logo" className="w-28 h-28 md:w-40 md:h-40 lg:w-52 lg:h-52" style={{ objectFit: 'contain' }} />
        </a>
      </div>

      {/* Nav Links - Centered */}
      <div className="hidden lg:flex items-center gap-12 glass-pill px-10 py-3.5 rounded-full pointer-events-auto shadow-lg">
        {NAV_ITEMS.map((item) => (
          <a 
            key={item.label} 
            href={item.href}
            className="text-[11px] font-semibold text-purple-200/60 hover:text-violet-300 transition-all tracking-[0.2em] uppercase"
          >
            {item.label}
          </a>
        ))}
      </div>
      
    </nav>
  );
};

export default Navbar;
