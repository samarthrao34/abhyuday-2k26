import React from 'react';
import { motion } from 'framer-motion';
import { EventItem } from '../types';
import { Calendar, ExternalLink } from 'lucide-react';

interface ThreeDCardProps {
  event: EventItem;
  onOpen?: (event: EventItem) => void;
}

const ThreeDCard: React.FC<ThreeDCardProps> = React.memo(({ event, onOpen }) => {
  return (
    <motion.div
      className="w-full h-[300px] sm:h-[320px] md:h-[340px] cursor-pointer group"
      onClick={() => onOpen?.(event)}
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="relative w-full h-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl border border-purple-400/15 hover:border-purple-400/30 bg-white/5 backdrop-blur-md transition-all duration-300">
        <div className={`absolute -inset-20 opacity-40 blur-3xl ${event.category==='technical'?'bg-[conic-gradient(from_45deg,rgba(0,255,200,0.2),rgba(80,180,255,0.2),transparent_60%)]':event.category==='cultural'?'bg-[conic-gradient(from_120deg,rgba(255,100,50,0.2),rgba(255,0,150,0.2),transparent_60%)]':'bg-[conic-gradient(from_210deg,rgba(255,220,120,0.2),rgba(150,120,255,0.2),transparent_60%)]'}`} />
        
        <div className="h-28 sm:h-32 md:h-36 overflow-hidden relative">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="p-4 sm:p-5 md:p-6 relative">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-full border ${event.category==='technical'?'bg-cyan-500/10 text-cyan-200 border-cyan-400/30':event.category==='cultural'?'bg-rose-500/10 text-rose-200 border-rose-400/30':'bg-amber-500/10 text-amber-200 border-amber-400/30'}`}>
              {event.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-purple-300/50">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(event.date).toDateString()}</span>
            </div>
          </div>
          
          <h3 className="text-base sm:text-lg md:text-xl font-brand font-bold text-purple-100 group-hover:text-violet-300 transition-colors mb-1">
            {event.title}
          </h3>
          
          <p className="text-purple-200/60 text-xs line-clamp-1 mb-2">{event.description}</p>
          
          <ul className="list-disc list-inside text-[11px] text-purple-200/70 space-y-1 mb-3">
            <li>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {event.time}</li>
            <li>{event.venue}</li>
            <li>Team {event.teamSize} • Prize {event.prize}</li>
          </ul>
          
          <button 
            className="w-full mt-1 py-2 bg-gradient-to-r from-violet-600/80 to-purple-700/80 hover:from-violet-600 hover:to-purple-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/30"
            onClick={(e) => { e.stopPropagation(); onOpen?.(event); }}
          >
            View Details <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

ThreeDCard.displayName = 'ThreeDCard';

export default ThreeDCard;
