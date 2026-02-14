import React, { useEffect, useMemo, useState } from 'react';
import { X, Calendar, Clock, MapPin, Building2, Users, IndianRupee, ShieldCheck } from 'lucide-react';
import { EVENTS } from '../constants';
import { EventItem } from '../types';

interface DepartmentEvent {
  id: string;
  department: string;
  eventName: string;
  date: string;
  time: string;
  venue: string;
}

interface JsonEvent {
  Sheet: string;
  SNo: string;
  EventName: string;
  Date: string;
  Time: string;
  Venue: string;
}

/** Fuzzy-match a table event to the detailed EVENTS constant */
function findMatchingEvent(ev: DepartmentEvent): EventItem | null {
  const name = ev.eventName.toLowerCase().trim();
  // Try exact title match first
  let match = EVENTS.find(e => e.title.toLowerCase().trim() === name);
  if (match) return match;
  // Try includes match (either direction)
  match = EVENTS.find(e =>
    e.title.toLowerCase().includes(name) || name.includes(e.title.toLowerCase())
  );
  if (match) return match;
  // Try matching by first significant word (3+ chars)
  const words = name.split(/[\s\-–()/]+/).filter(w => w.length >= 3);
  match = EVENTS.find(e => {
    const t = e.title.toLowerCase();
    return words.length > 0 && words.every(w => t.includes(w));
  });
  return match ?? null;
}

const EventDetailDialog: React.FC<{ event: DepartmentEvent | null; onClose: () => void }> = ({ event, onClose }) => {
  if (!event) return null;

  const detailed = findMatchingEvent(event);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl border border-purple-400/30 overflow-hidden shadow-2xl my-auto max-h-[95vh] overflow-y-auto"
        style={{ background: 'linear-gradient(135deg, #1a1030 0%, #2b1f3d 50%, #1f172f 100%)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Banner */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <img
            src={detailed?.image || '/abhyuday.png'}
            alt={event.eventName}
            className={detailed?.image ? 'w-full h-full object-cover' : 'w-full h-full object-contain p-6 bg-gradient-to-br from-violet-900/40 to-amber-900/20'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1030] via-transparent to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-violet-500 to-pink-400" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 pt-4 pb-2">
          <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 mb-3">
            {event.department}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-purple-50 leading-tight">
            {event.eventName}
          </h3>
          {detailed?.description && (
            <p className="mt-2 text-sm text-purple-200/70 leading-relaxed">{detailed.description}</p>
          )}
        </div>

        {/* Details Grid */}
        <div className="px-5 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-purple-400">Date</p>
              <p className="text-sm text-purple-100 font-medium">{event.date || 'TBA'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <Clock className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-purple-400">Time</p>
              <p className="text-sm text-purple-100 font-medium">{event.time || 'TBA'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
              <MapPin className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-purple-400">Venue</p>
              <p className="text-sm text-purple-100 font-medium">{event.venue || 'TBA'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-purple-400">Department</p>
              <p className="text-sm text-purple-100 font-medium">{event.department}</p>
            </div>
          </div>

          {detailed?.teamSize && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-purple-400">Team Size</p>
                <p className="text-sm text-purple-100 font-medium">{detailed.teamSize}</p>
              </div>
            </div>
          )}

          {detailed?.registrationFee && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <IndianRupee className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-purple-400">Fee</p>
                <p className="text-sm text-purple-100 font-medium">{detailed.registrationFee}</p>
              </div>
            </div>
          )}
        </div>

        {/* Rules & Regulations */}
        {detailed?.rules && detailed.rules.length > 0 && (
          <div className="px-5 sm:px-6 py-4 border-t border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h4 className="text-base sm:text-lg font-semibold text-purple-100">Rules & Regulations</h4>
            </div>
            <ul className="space-y-2">
              {detailed.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-purple-200/80">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-[10px] font-bold text-violet-300 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* No detailed info fallback */}
        {!detailed && (
          <div className="px-5 sm:px-6 py-4 border-t border-white/5">
            <p className="text-sm text-purple-300/60 italic text-center">
              Detailed rules and regulations will be updated soon.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 sm:px-6 pb-5 pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all duration-200 shadow-lg shadow-violet-900/30"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DepartmentEventsTable: React.FC = () => {
  const [events, setEvents] = useState<DepartmentEvent[]>([]);
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<DepartmentEvent | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/all_events.json');
      const data: JsonEvent[] = await res.json();

      const mapped: DepartmentEvent[] = data
        .filter(ev => ev.EventName && ev.EventName.trim())
        .map((ev, idx) => ({
          id: `${ev.Sheet}-${ev.SNo || idx}`,
          department: ev.Sheet.trim(),
          eventName: ev.EventName.trim(),
          date: (ev.Date || '').trim(),
          time: (ev.Time || '').trim(),
          venue: (ev.Venue || '').trim(),
        }));

      setEvents(mapped);
    };

    load();
  }, []);

  const departments = useMemo(() => {
    const unique = new Set(events.map(ev => ev.department));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [events]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter(ev => {
      if (department !== 'all' && ev.department !== department) return false;
      if (!q) return true;
      return [
        ev.department,
        ev.eventName,
        ev.date,
        ev.time,
        ev.venue,
      ].some(value => value.toLowerCase().includes(q));
    });
  }, [events, query, department]);

  return (
    <section id="department-events" className="relative z-[60] section-blend py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-transparent via-[#2b1f3d] to-[#1f172f]" style={{ overflow: 'visible', isolation: 'isolate' }}>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-brand font-bold mb-2 tracking-tight text-purple-100">All Events by Department</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-300 via-violet-300 to-pink-300 rounded-full mb-4 mx-auto md:mx-0" />
          <p className="text-sm sm:text-base text-purple-200/70 max-w-2xl mx-auto md:mx-0">Browse department-wise events and filter by department or keyword.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end mb-6 relative z-[100]" style={{ position: 'relative', isolation: 'isolate' }}>
          <div className="flex flex-col gap-1 text-xs sm:text-sm text-purple-200/70">
            <span>Search events</span>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by event, department, venue..."
                className="w-full px-4 py-3 pl-11 bg-white/10 border border-white/20 rounded-xl text-purple-100 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-400/50 transition-all duration-200"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300/70 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300/70 hover:text-purple-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs sm:text-sm text-purple-200/70">
            <span>Department</span>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full md:w-64 border border-white/20 rounded-lg px-3 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-colors cursor-pointer"
              style={{ backgroundColor: 'rgba(30, 20, 50, 0.9)', color: '#e9d5ff', WebkitAppearance: 'menulist', MozAppearance: 'menulist' as any, position: 'relative', zIndex: 9999 }}
            >
              <option value="all" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>All departments</option>
              <option value="ASB" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>ASB</option>
              <option value="B.Pharm" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>B.Pharm</option>
              <option value="Bio-Tech" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>Bio-Tech</option>
              <option value="CE" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>CE</option>
              <option value="CSE" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>CSE</option>
              <option value="CULTURAL" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>CULTURAL</option>
              <option value="ECE" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>ECE</option>
              <option value="EE" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>EE</option>
              <option value="Fine Arts" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>Fine Arts</option>
              <option value="Literary" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>Literary</option>
              <option value="MBA" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>MBA</option>
              <option value="ME" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>ME</option>
            </select>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-purple-300/60 mb-4">Showing {filtered.length} of {events.length} events</p>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-500/20 to-violet-500/20 border-b border-white/10">
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">S.No</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Dept</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Event</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Date</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Time</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Venue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-purple-300/60">No events found.</td>
                  </tr>
                ) : (
                  filtered.map((ev, idx) => (
                    <tr
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className="hover:bg-white/10 transition-colors duration-200 cursor-pointer group"
                    >
                      <td className="px-5 py-4 text-xs text-purple-200/70">{idx + 1}</td>
                      <td className="px-5 py-4 text-xs text-purple-200/80">{ev.department}</td>
                      <td className="px-5 py-4 text-sm font-medium text-purple-100 group-hover:text-amber-300 transition-colors duration-200">
                        {ev.eventName}
                      </td>
                      <td className="px-5 py-4 text-xs text-purple-200/70">{ev.date || '-'}</td>
                      <td className="px-5 py-4 text-xs text-purple-200/70">{ev.time || '-'}</td>
                      <td className="px-5 py-4 text-xs text-purple-200/70">{ev.venue || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden divide-y divide-white/5">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-purple-300/60">No events found.</div>
            ) : (
              filtered.map((ev, idx) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev)}
                  className="p-4 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-purple-300/70">{ev.department}</span>
                    <span className="text-[10px] text-purple-300/50">#{idx + 1}</span>
                  </div>
                  <h3 className="text-base font-semibold text-purple-100 mb-2 hover:text-amber-300 transition-colors duration-200">
                    {ev.eventName}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <span className="text-purple-300/50">Date:</span>
                      <span className="text-purple-200 ml-1">{ev.date || '-'}</span>
                    </div>
                    <div>
                      <span className="text-purple-300/50">Time:</span>
                      <span className="text-purple-200 ml-1">{ev.time || '-'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-purple-300/50">Venue:</span>
                      <span className="text-purple-200 ml-1">{ev.venue || '-'}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <EventDetailDialog event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  );
};

export default DepartmentEventsTable;
