
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Music, BookOpen, Trophy, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import { EventItem } from '../types';
import { TECH_EVENTS, CULTURAL_EVENTS, LITERARY_EVENTS } from '../constants';
import EventModal from './EventModal';

interface FestCardProps {
  event: EventItem;
  index: number;
  onEventClick: (event: EventItem) => void;
}

const FestCard: React.FC<FestCardProps> = ({ event, index, onEventClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-400/15 hover:border-purple-400/30 transition-all duration-500 cursor-pointer"
      onClick={() => onEventClick(event)}
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2048] via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-violet-500/80 text-white rounded-full">
            {event.prize}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-brand font-bold text-purple-100 mb-2 group-hover:text-violet-300 transition-colors">
          {event.title}
        </h3>
        <p className="text-purple-200/50 text-sm mb-4 line-clamp-2">{event.description}</p>
        <div className="flex flex-wrap gap-3 text-xs text-purple-300/60">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {event.time.split(' - ')[0]}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {event.venue.split(',')[0]}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {event.teamSize}
          </span>
        </div>
        <div className="mt-4 flex items-center text-violet-400 text-sm font-medium group-hover:gap-2 transition-all">
          View Details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

interface FestSectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  events: EventItem[];
  gradientFrom: string;
  gradientTo: string;
  onEventClick: (event: EventItem) => void;
}

const FestSection: React.FC<FestSectionProps> = ({
  title,
  subtitle,
  icon,
  events,
  gradientFrom,
  gradientTo,
  onEventClick,
}) => {
  return (
    <div className="mb-32">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-4"
      >
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-lg`}>
          {icon}
        </div>
        <div>
          <h3 className="text-3xl md:text-4xl font-brand font-bold text-purple-100">{title}</h3>
          <p className="text-purple-300/50 text-sm">{subtitle}</p>
        </div>
      </motion.div>
      <div className={`w-24 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full mb-10`} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <FestCard 
            key={event.id} 
            event={event} 
            index={index}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};

const FestSegments: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  return (
    <section id="events" className="relative z-50 py-32 md:py-48 px-8 bg-gradient-to-b from-transparent via-[#352558]/80 to-[#2a2048]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-brand font-black text-purple-100 mb-4">
            EXPLORE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">UNIVERSE</span>
          </h2>
          <p className="text-purple-200/50 text-lg max-w-2xl mx-auto">
            Three spectacular domains, eighteen stellar events, one unforgettable experience. Choose your adventure.
          </p>
        </motion.div>

        {/* Tech Fest */}
        <FestSection
          title="Tech Fest"
          subtitle="Innovation • Code • Build"
          icon={<Code2 className="w-8 h-8 text-white" />}
          events={TECH_EVENTS}
          gradientFrom="from-cyan-500"
          gradientTo="to-blue-600"
          onEventClick={setSelectedEvent}
        />

        {/* Cultural Fest */}
        <FestSection
          title="Cultural Fest"
          subtitle="Dance • Music • Expression"
          icon={<Music className="w-8 h-8 text-white" />}
          events={CULTURAL_EVENTS}
          gradientFrom="from-pink-500"
          gradientTo="to-rose-600"
          onEventClick={setSelectedEvent}
        />

        {/* Literary Fest */}
        <FestSection
          title="Literary Fest"
          subtitle="Words • Wisdom • Wit"
          icon={<BookOpen className="w-8 h-8 text-white" />}
          events={LITERARY_EVENTS}
          gradientFrom="from-amber-500"
          gradientTo="to-orange-600"
          onEventClick={setSelectedEvent}
        />
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </section>
  );
};

export default FestSegments;
