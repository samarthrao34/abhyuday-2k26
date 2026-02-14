import React, { useState } from 'react';
import { EVENTS } from '../constants';
import { FestCategory, EventItem } from '../types';
import ThreeDCard from './ThreeDCard';

interface Props {
  id: string;
  category: FestCategory;
  title: string;
  blurb: string;
  onOpen: (event: EventItem) => void;
}

const FestSegment: React.FC<Props> = React.memo(({ id, category, title, blurb, onOpen }) => {
  const list = EVENTS.filter(e => e.category === category);
  const [selectedId, setSelectedId] = useState('all');
  const filtered = selectedId === 'all' ? list : list.filter(e => e.id === selectedId);
  const bg = category === 'technical'
    ? 'bg-[radial-gradient(80%_60%_at_10%_10%,rgba(20,150,255,0.15),transparent),radial-gradient(80%_60%_at_90%_20%,rgba(0,255,188,0.12),transparent),linear-gradient(180deg,#0f1025,#151238)]'
    : category === 'cultural'
    ? 'bg-[radial-gradient(80%_60%_at_15%_10%,rgba(255,120,80,0.15),transparent),radial-gradient(80%_60%_at_85%_20%,rgba(255,0,170,0.12),transparent),linear-gradient(180deg,#1a0f25,#241338)]'
    : 'bg-[radial-gradient(80%_60%_at_10%_10%,rgba(255,220,100,0.12),transparent),radial-gradient(80%_60%_at_90%_20%,rgba(160,120,255,0.12),transparent),linear-gradient(180deg,#141325,#1b1432)]';
  return (
    <section id={id} className={`relative z-50 section-blend py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-10 ${bg}`}>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-10 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-brand font-bold mb-3 tracking-tight text-purple-100">{title}</h2>
          <div className={`w-20 sm:w-28 h-1 rounded-full mb-4 sm:mb-6 mx-auto md:mx-0 ${category==='technical'?'bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300':category==='cultural'?'bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400':'bg-gradient-to-r from-amber-300 via-violet-300 to-pink-300'}`} />
          <p className="text-purple-200/80 text-sm sm:text-lg max-w-2xl mx-auto md:mx-0">{blurb}</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 sm:mb-8 relative z-[60] pointer-events-auto">
          <div className="text-xs sm:text-sm text-purple-200/60">
            Showing {filtered.length} of {list.length} events
          </div>
          <label className="flex flex-col gap-1 text-xs sm:text-sm text-purple-200/70 relative z-[60] pointer-events-auto">
            Pick an event
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full md:w-72 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-purple-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-colors appearance-none cursor-pointer"
              style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
            >
              <option value="all">All events</option>
              {list.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.title}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map(ev => (<ThreeDCard key={ev.id} event={ev} onOpen={onOpen} />))}
        </div>
      </div>
    </section>
  );
});

FestSegment.displayName = 'FestSegment';

export default FestSegment;
