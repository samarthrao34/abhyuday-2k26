
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EventItem } from '../types';
import { Trophy, Calendar, ExternalLink } from 'lucide-react';

interface ThreeDCardProps {
  event: EventItem;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({ event }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full h-[420px] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15 }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden glass-pill rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-white/[0.02]">
          <div className="h-56 overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
            />
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20">
                {event.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <Calendar className="w-3.5 h-3.5" />
                <span>{event.date}</span>
              </div>
            </div>
            <h3 className="text-2xl font-brand font-bold text-white group-hover:text-blue-400 transition-colors">
              {event.title}
            </h3>
            <div className="mt-4 flex items-center gap-2 text-white/30 text-sm">
              <p className="line-clamp-2">{event.description}</p>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-pill rounded-[2rem] p-10 flex flex-col justify-between shadow-2xl border border-white/10 bg-gradient-to-br from-blue-900/20 to-black/80">
          <div>
            <h3 className="text-3xl font-brand font-bold text-white mb-6">{event.title}</h3>
            <p className="text-white/60 leading-relaxed mb-8">
              {event.description}
            </p>
            <div className="flex items-center gap-3 text-blue-400 font-bold text-2xl">
              <Trophy className="w-6 h-6" />
              <span>{event.prize}</span>
            </div>
          </div>
          
          <button className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-400 hover:text-white transition-all transform active:scale-95 shadow-xl shadow-white/5">
            JOIN MISSION <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThreeDCard;
