import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface CategoryEvent {
  sheet: string;
  sno: string;
  eventName: string;
  date: string;
  time: string;
  venue: string;
}

interface TabularSegmentProps {
  id: string;
  category: 'technical' | 'cultural' | 'literary';
  title: string;
  blurb: string;
  events: CategoryEvent[];
  registerLink?: string;
}

const TabularSegment: React.FC<TabularSegmentProps> = ({ id, category, title, blurb, events, registerLink }) => {
  const [selectedDept, setSelectedDept] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const bg =
    category === 'technical'
      ? 'bg-[radial-gradient(80%_60%_at_10%_10%,rgba(20,150,255,0.15),transparent),radial-gradient(80%_60%_at_90%_20%,rgba(0,255,188,0.12),transparent),linear-gradient(180deg,#0f1025,#151238)]'
      : category === 'cultural'
        ? 'bg-[radial-gradient(80%_60%_at_15%_10%,rgba(255,120,80,0.15),transparent),radial-gradient(80%_60%_at_85%_20%,rgba(255,0,170,0.12),transparent),linear-gradient(180deg,#1a0f25,#241338)]'
        : 'bg-[radial-gradient(80%_60%_at_10%_10%,rgba(255,220,100,0.12),transparent),radial-gradient(80%_60%_at_90%_20%,rgba(160,120,255,0.12),transparent),linear-gradient(180deg,#141325,#1b1432)]';

  const departments = useMemo(() => {
    const unique = new Set(events.map(e => e.sheet));
    return ['all', ...Array.from(unique).sort()];
  }, [events]);

  const filtered = useMemo(() => {
    let result = events;
    if (selectedDept !== 'all') {
      result = result.filter(e => e.sheet === selectedDept);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        e =>
          e.eventName.toLowerCase().includes(q) ||
          e.sheet.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.date.toLowerCase().includes(q)
      );
    }
    return result;
  }, [events, selectedDept, searchQuery]);

  return (
    <section
      id={id}
      className={`relative z-[60] section-blend py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 ${bg}`}
      style={{ overflow: 'visible', isolation: 'isolate' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-brand font-bold tracking-tight text-purple-100">{title}</h2>
            {registerLink && (
              <a
                href={registerLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base font-bold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                  category === 'technical'
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white shadow-sky-500/30'
                    : category === 'cultural'
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-rose-500/30'
                      : 'bg-gradient-to-r from-amber-400 to-violet-500 hover:from-amber-500 hover:to-violet-600 text-white shadow-violet-500/30'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Register Now
              </a>
            )}
          </div>
          <div
            className={`w-20 sm:w-28 h-1 rounded-full mb-4 sm:mb-6 mx-auto md:mx-0 ${
              category === 'technical'
                ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300'
                : category === 'cultural'
                  ? 'bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400'
                  : 'bg-gradient-to-r from-amber-300 via-violet-300 to-pink-300'
            }`}
          />
          <p className="text-purple-200/80 text-sm sm:text-lg max-w-2xl mx-auto md:mx-0">{blurb}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6 relative z-[100]" style={{ position: 'relative', isolation: 'isolate' }}>
          <div className="text-xs sm:text-sm text-purple-200/60">
            Showing {filtered.length} of {events.length} events
          </div>

          <div className="flex flex-col gap-1 text-xs sm:text-sm text-purple-200/70">
            <span>Search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Event name, venue..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-purple-100 placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1 text-xs sm:text-sm text-purple-200/70">
            <span>Department</span>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full border border-white/20 rounded-lg px-3 py-2 text-purple-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-colors cursor-pointer"
              style={{ backgroundColor: 'rgba(30, 20, 50, 0.9)', color: '#e9d5ff', WebkitAppearance: 'menulist', MozAppearance: 'menulist' as any }}
            >
              {departments.map(dept => (
                <option key={dept} value={dept} style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>
                  {dept === 'all' ? 'All departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-b border-white/10">
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">S.No</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Department</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Event</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Date</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Time</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Venue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-purple-300/60">
                      No events found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((ev, idx) => (
                    <tr
                      key={`${ev.sheet}-${ev.sno}`}
                      className="hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="px-5 py-4 text-xs text-purple-200/80">{ev.sno}</td>
                      <td className="px-5 py-4 text-xs font-semibold text-purple-200/90">{ev.sheet}</td>
                      <td className="px-5 py-4 text-sm font-medium text-purple-100">{ev.eventName}</td>
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
                  key={`${ev.sheet}-${ev.sno}`}
                  className="p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-purple-300/70">#{ev.sno}</span>
                    <span className="text-xs font-semibold text-purple-200/90">{ev.sheet}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-purple-100 mb-2">{ev.eventName}</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
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
    </section>
  );
};

export default TabularSegment;
