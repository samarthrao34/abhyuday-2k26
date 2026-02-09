
import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Nebula Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-700/15 rounded-full blur-[180px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[180px]" />
      <div className="absolute top-[-8%] right-[-8%] w-[45%] h-[45%] rounded-full blur-[200px]" style={{ background: 'rgba(40, 180, 120, 0.07)' }} />
      <div className="absolute top-[5%] right-[5%] w-[25%] h-[25%] rounded-full blur-[150px]" style={{ background: 'rgba(60, 200, 140, 0.05)' }} />
      <div className="absolute top-[30%] right-[-5%] w-[30%] h-[30%] bg-fuchsia-600/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-[20%] left-[10%] w-[25%] h-[25%] bg-blue-700/8 rounded-full blur-[150px]" />
      {/* Light bluish-purple glow from bottom-left */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[200px]" style={{ background: 'rgba(120, 140, 255, 0.09)' }} />
      <div className="absolute bottom-[5%] left-[2%] w-[30%] h-[30%] rounded-full blur-[170px]" style={{ background: 'rgba(150, 130, 240, 0.07)' }} />

      {/* Starfield particles */}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${i % 5 === 0 ? 'bg-purple-300/50' : i % 3 === 0 ? 'bg-blue-200/40' : 'bg-white/30'}`}
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 
          }}
          animate={{ 
            opacity: [Math.random() * 0.05, i % 5 === 0 ? 0.6 : 0.35, Math.random() * 0.05],
            scale: [1, i % 7 === 0 ? 1.8 : 1.3, 1]
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: `${Math.random() * (i % 10 === 0 ? 4 : 2.5) + 0.5}px`,
            height: `${Math.random() * (i % 10 === 0 ? 4 : 2.5) + 0.5}px`
          }}
        />
      ))}
      
      {/* Cosmic glows */}
      <div className="absolute top-1/4 left-1/4 w-px h-px shadow-[0_0_120px_50px_rgba(100,60,200,0.12)]" />
      <div className="absolute bottom-1/3 right-1/4 w-px h-px shadow-[0_0_150px_60px_rgba(139,92,246,0.08)]" />
      <div className="absolute top-2/3 right-1/3 w-px h-px shadow-[0_0_100px_40px_rgba(60,40,180,0.1)]" />
    </div>
  );
};

export default FloatingElements;
