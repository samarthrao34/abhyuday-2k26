import React from 'react';
import { EventItem } from '../types';
import { X, Calendar, MapPin, Users, IndianRupee } from 'lucide-react';

interface Props {
  event: EventItem | null;
  onClose: () => void;
}

const EventDetailsModal: React.FC<Props> = ({ event, onClose }) => {
  if (!event) return null;
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/60 overflow-y-auto" onClick={onClose}>
      <div className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl glass-pill border border-purple-400/20 overflow-hidden my-auto max-h-[95vh] overflow-y-auto" onClick={handleModalClick}>
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20">
          <X className="w-5 h-5" />
        </button>
        <div className="h-40 sm:h-56 w-full overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 sm:p-6 md:p-8">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-brand font-bold mb-2">{event.title}</h3>
          <p className="text-sm sm:text-base text-purple-200/80 mb-4 sm:mb-5">{event.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-purple-200/80 mb-4 sm:mb-6">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{new Date(event.date).toDateString()} • {event.time}</span></div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{event.venue}</span></div>
            <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>Team: {event.teamSize}</span></div>
            <div className="flex items-center gap-2"><IndianRupee className="w-4 h-4" /><span>Fee: {event.registrationFee}</span></div>
          </div>
          <h4 className="text-xl font-semibold mb-2">Rules</h4>
          <ul className="list-disc list-inside space-y-1 text-purple-100/90">
            {event.rules.map((r, i) => (<li key={i}>{r}</li>))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
