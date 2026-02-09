
import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[150px]" />

      {/* Pure Star System */}
      {[...Array(150)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            opacity: Math.random() * 0.7 
          }}
          animate={{ 
            opacity: [Math.random() * 0.3, 0.8, Math.random() * 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: `${Math.random() * 1.5 + 0.5}px`,
            height: `${Math.random() * 1.5 + 0.5}px`
          }}
        />
      ))}
      
      {/* Occasional distant nebulae or lens flare */}
      <div className="absolute top-1/4 left-1/4 w-px h-px shadow-[0_0_100px_40px_rgba(96,165,250,0.05)]" />
      <div className="absolute bottom-1/3 right-1/4 w-px h-px shadow-[0_0_150px_60px_rgba(139,92,246,0.03)]" />
    </div>
  );
};

export default FloatingElements;
