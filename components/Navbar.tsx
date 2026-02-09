
import React from 'react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] py-8 px-8 md:px-16 flex justify-between items-center pointer-events-none">
      {/* Brand Logo */}
      <div className="pointer-events-auto">
        <a href="#" className="font-brand text-2xl md:text-3xl font-bold tracking-tight lowercase text-white hover:text-blue-400 transition-colors whitespace-nowrap">
          abhyuday 2k26
        </a>
      </div>

      {/* Nav Links - Centered */}
      <div className="hidden lg:flex items-center gap-12 glass-pill px-10 py-3.5 rounded-full pointer-events-auto border border-white/5 shadow-2xl backdrop-blur-2xl">
        {NAV_ITEMS.map((item) => (
          <a 
            key={item.label} 
            href={item.href}
            className="text-[11px] font-semibold text-white/50 hover:text-white transition-all tracking-[0.2em] uppercase"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Action Button */}
      <div className="pointer-events-auto">
        <button className="px-8 py-2.5 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:border-white shadow-lg">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
