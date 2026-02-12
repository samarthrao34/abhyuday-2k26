
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Clock, MapPin, Users, IndianRupee, CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import { EventItem } from '../types';

interface EventModalProps {
  event: EventItem;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const categoryColors = {
    technical: { from: 'from-cyan-500', to: 'to-blue-600', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' },
    cultural: { from: 'from-pink-500', to: 'to-rose-600', badge: 'bg-pink-500/20 text-pink-300 border-pink-400/30' },
    literary: { from: 'from-amber-500', to: 'to-orange-600', badge: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
  };

  const colors = categoryColors[event.category];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#2a2048] to-[#1e1835] rounded-3xl border border-purple-400/20 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-64 overflow-hidden rounded-t-3xl">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a2048] via-[#2a2048]/50 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border ${colors.badge}`}>
                {event.category}
              </span>
            </div>

            {/* Event Title */}
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-4xl font-brand font-black text-white mb-2">{event.title}</h2>
              <p className="text-purple-200/70">{event.description}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 rounded-2xl p-4 border border-purple-400/10">
                <div className="flex items-center gap-2 text-purple-300/50 text-xs mb-2">
                  <Trophy className="w-4 h-4" />
                  Prize Pool
                </div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${colors.from} ${colors.to} bg-clip-text text-transparent`}>
                  {event.prize}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-purple-400/10">
                <div className="flex items-center gap-2 text-purple-300/50 text-xs mb-2">
                  <IndianRupee className="w-4 h-4" />
                  Registration
                </div>
                <div className="text-lg font-semibold text-purple-100">
                  {event.registrationFee}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-purple-400/10">
                <div className="flex items-center gap-2 text-purple-300/50 text-xs mb-2">
                  <Users className="w-4 h-4" />
                  Team Size
                </div>
                <div className="text-lg font-semibold text-purple-100">
                  {event.teamSize}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-purple-400/10">
                <div className="flex items-center gap-2 text-purple-300/50 text-xs mb-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </div>
                <div className="text-lg font-semibold text-purple-100">
                  {event.date.split(',')[0].replace('February ', 'Feb ')}
                </div>
              </div>
            </div>

            {/* Time and Venue */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-4 bg-white/5 rounded-2xl p-5 border border-purple-400/10">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.from} ${colors.to}`}>
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-purple-300/50 text-xs mb-1">Timing</div>
                  <div className="text-purple-100 font-medium">{event.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 rounded-2xl p-5 border border-purple-400/10">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.from} ${colors.to}`}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-purple-300/50 text-xs mb-1">Venue</div>
                  <div className="text-purple-100 font-medium">{event.venue}</div>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="mb-8">
              <h3 className="text-xl font-brand font-bold text-purple-100 mb-4">Rules & Guidelines</h3>
              <div className="space-y-3">
                {event.rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 mt-0.5 ${colors.badge.split(' ')[1]}`} />
                    <span className="text-purple-200/70">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 bg-gradient-to-r ${colors.from} ${colors.to} text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow`}
            >
              Register Now <ExternalLink className="w-5 h-5" />
            </motion.button>

            <p className="text-center text-purple-300/40 text-sm mt-4">
              Registration closes 24 hours before the event
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventModal;
