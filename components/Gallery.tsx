
import React, { useState } from 'react';
import { GALLERY } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const items = GALLERY;
  const activeItem = GALLERY.find(g => g.id === active) || null;

  return (
    <section id="gallery" className="relative z-50 section-blend py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-10 bg-[#2a2048]">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-brand font-bold mb-3 sm:mb-4 tracking-tight text-purple-100">Gallery</h2>
          <p className="text-sm sm:text-base text-purple-200/70">Relive the energy from previous editions.</p>
        </div>



        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]"><div className="[&>img]:mb-4">
          {items.map(i => (
            <img
              key={i.id}
              onClick={() => setActive(i.id)}
              src={i.src}
              alt={i.alt}
              className="w-full rounded-xl hover:opacity-90 transition cursor-zoom-in aspect-[16/9] object-cover bg-black"
              style={{ aspectRatio: '16/9', objectFit: 'cover', backgroundColor: '#000' }}
            />
          ))}
        </div></div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <>
            {/* Blur the background when modal is open */}
            <motion.div
              className="fixed inset-0 z-[119] backdrop-blur-md bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div className="fixed inset-0 z-[120] flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
              <motion.img
                src={activeItem.src}
                alt={activeItem.alt}
                className="max-h-[85vh] rounded-2xl shadow-2xl aspect-[16/9] object-cover bg-black"
                style={{ aspectRatio: '16/9', objectFit: 'cover', backgroundColor: '#000' }}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
