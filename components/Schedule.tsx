
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Code2, Music, BookOpen } from 'lucide-react';
import { SCHEDULE_EVENTS } from '../constants';
import { ScheduleEvent } from '../types';

const Schedule: React.FC = () => {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [filter, setFilter] = useState<'all' | 'technical' | 'cultural' | 'literary'>('all');

  const days = [
    { day: 1 as const, date: 'Feb 23', name: 'Day 1' },
    { day: 2 as const, date: 'Feb 24', name: 'Day 2' },
    { day: 3 as const, date: 'Feb 25', name: 'Day 3' },
  ];

  const categoryConfig = {
    technical: { 
      icon: <Code2 className="w-4 h-4" />, 
      color: 'from-cyan-500 to-blue-600',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-300'
    },
    cultural: { 
      icon: <Music className="w-4 h-4" />, 
      color: 'from-pink-500 to-rose-600',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/30',
      text: 'text-pink-300'
    },
    literary: { 
      icon: <BookOpen className="w-4 h-4" />, 
      color: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-300'
    },
  };

  const filteredEvents = SCHEDULE_EVENTS
    .filter(event => event.day === activeDay)
    .filter(event => filter === 'all' || event.category === filter)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  return (
    <section id="schedule" className="relative z-50 py-32 md:py-48 px-8 bg-[#2a2048]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-brand font-black text-purple-100 mb-4">
            EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">TIMELINE</span>
          </h2>
          <p className="text-purple-200/50 text-lg max-w-2xl mx-auto">
            Three days of non-stop action. Plan your journey through the cosmic celebration.
          </p>
        </motion.div>

        {/* Day Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/5 backdrop-blur-md rounded-2xl p-1.5 border border-purple-400/15">
            {days.map(({ day, date, name }) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeDay === day
                    ? 'bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg'
                    : 'text-purple-300/60 hover:text-purple-200'
                }`}
              >
                <div className="text-xs opacity-70 mb-0.5">{date}</div>
                <div className="font-brand font-bold">{name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {['all', 'technical', 'cultural', 'literary'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as typeof filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === cat
                  ? 'bg-violet-500/20 border-violet-400/50 text-violet-300'
                  : 'bg-white/5 border-purple-400/15 text-purple-300/50 hover:border-purple-400/30'
              }`}
            >
              {cat === 'all' ? 'All Events' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-400/30 via-violet-500/20 to-purple-400/30" />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDay}-${filter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {filteredEvents.map((event, index) => (
                <TimelineItem 
                  key={event.id} 
                  event={event} 
                  index={index}
                  categoryConfig={categoryConfig}
                  formatTime={formatTime}
                />
              ))}

              {filteredEvents.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 text-purple-300/40"
                >
                  No events scheduled for this selection
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  event: ScheduleEvent;
  index: number;
  categoryConfig: Record<string, { icon: React.ReactNode; color: string; bg: string; border: string; text: string }>;
  formatTime: (time: string) => string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index, categoryConfig, formatTime }) => {
  const config = categoryConfig[event.category];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`relative flex items-center gap-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} ml-16 md:ml-0`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`inline-block ${isEven ? 'md:float-right' : 'md:float-left'} w-full md:w-auto md:max-w-md`}
        >
          <div className={`${config.bg} ${config.border} border rounded-2xl p-6 backdrop-blur-sm`}>
            <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
              <span className={`p-1.5 rounded-lg bg-gradient-to-br ${config.color}`}>
                {config.icon}
              </span>
              <span className={`text-xs font-bold uppercase tracking-wider ${config.text}`}>
                {event.category}
              </span>
            </div>
            
            <h3 className="text-xl font-brand font-bold text-purple-100 mb-2">
              {event.title}
            </h3>

            <div className={`flex flex-wrap gap-4 text-sm text-purple-200/60 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {event.venue}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${config.color} shadow-lg ring-4 ring-[#2a2048]`} />
      </div>

      {/* Empty space for alignment */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

export default Schedule;
