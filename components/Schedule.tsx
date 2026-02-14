import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RawEvent {
  Sheet: string;
  SNo: string;
  EventName: string;
  Date: string;
  Time: string;
  Venue: string;
}

interface ScheduleItem {
  id: string;
  name: string;
  department: string;
  venue: string;
  time: string;
  sortKey: string;
  days: number[];
}

const dayTabs = [
  { label: 'Day 1 • Feb 25', value: 1 },
  { label: 'Day 2 • Feb 26', value: 2 },
  { label: 'Day 3 • Feb 27', value: 3 },
];

/** Parse the varied date strings to determine which fest day(s) the event falls on */
function parseDateToDays(dateStr: string): number[] {
  if (!dateStr || !dateStr.trim()) return [1, 2]; // No date → show on both technical days
  const s = dateStr.trim().toLowerCase();
  // Strip 4-digit years (e.g. 2026) and stray 3-digit suffixes (e.g. 026, 036)
  const cleaned = s.replace(/\b\d{4}\b/g, '').replace(/'?\d{3}\b/g, '');
  const days: number[] = [];
  if (/\b25\b|25th|^25/.test(cleaned)) days.push(1);
  if (/\b26\b|26th|^26/.test(cleaned)) days.push(2);
  if (/\b27\b|27th|^27/.test(cleaned)) days.push(3);
  return days.length > 0 ? days : [1];
}

/** Extract the start time from varied formats and normalise to 24h for sorting */
function parseStartTime(timeStr: string): string {
  if (!timeStr || !timeStr.trim()) return '99:99';
  const match = timeStr.match(/(\d{1,2}):(\d{2})(?::\d{2})?\s*([AaPp]\.?\s*[Mm]\.?)?/);
  if (!match) return '99:99';
  let hours = parseInt(match[1]);
  const minutes = match[2];
  const ampm = match[3]?.replace(/\./g, '').replace(/\s/g, '').toLowerCase();
  if (ampm) {
    if (ampm === 'pm' && hours !== 12) hours += 12;
    if (ampm === 'am' && hours === 12) hours = 0;
  }
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

const deptColors: Record<string, string> = {
  'CSE': 'bg-blue-500/20 text-blue-300 border-blue-400/30',
  'ECE': 'bg-green-500/20 text-green-300 border-green-400/30',
  'EE': 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
  'ME': 'bg-orange-500/20 text-orange-300 border-orange-400/30',
  'CE': 'bg-red-500/20 text-red-300 border-red-400/30',
  'MBA': 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
  'B.Pharm': 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
  'Bio-Tech': 'bg-teal-500/20 text-teal-300 border-teal-400/30',
  'ASB': 'bg-pink-500/20 text-pink-300 border-pink-400/30',
  'CULTURAL': 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/30',
  'Fine Arts': 'bg-rose-500/20 text-rose-300 border-rose-400/30',
  'Literary': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
};

const Schedule: React.FC = () => {
  const [active, setActive] = useState(1);
  const [events, setEvents] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/all_events.json')
      .then(res => res.json())
      .then((data: RawEvent[]) => {
        const items: ScheduleItem[] = data.map((ev, idx) => ({
          id: `${ev.Sheet}-${ev.SNo}-${idx}`,
          name: ev.EventName,
          department: ev.Sheet,
          venue: ev.Venue || 'TBA',
          time: ev.Time?.trim() || 'TBA',
          sortKey: parseStartTime(ev.Time),
          days: parseDateToDays(ev.Date),
        }));
        setEvents(items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const list = useMemo(
    () => events.filter(ev => ev.days.includes(active)).sort((a, b) => a.sortKey.localeCompare(b.sortKey)),
    [events, active],
  );

  const getDeptColor = (dept: string) => deptColors[dept] || 'bg-purple-500/20 text-purple-300 border-purple-400/30';

  return (
    <section id="schedule" className="relative z-50 section-blend py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-10 bg-[#2a2048]">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-brand font-bold mb-3 sm:mb-4 tracking-tight text-purple-100">Dynamic Schedule</h2>
          <p className="text-sm sm:text-base text-purple-200/70">Tap a day to view all {events.length} events chronologically.</p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-12">
          {dayTabs.map(d => (
            <button
              key={d.value}
              onClick={() => setActive(d.value)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border text-sm sm:text-base transition-all ${active === d.value ? 'bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-500/25' : 'border-purple-400/30 text-purple-200/80 hover:bg-white/5'}`}
            >
              {d.label}
              <span className="ml-1.5 text-xs opacity-70">({events.filter(e => e.days.includes(d.value)).length})</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-purple-300 animate-pulse py-12">Loading schedule…</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative">
              <div className="relative pl-6 md:pl-10">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-purple-400/40 via-purple-400/10 to-purple-400/40" />
                <div className="space-y-4">
                  {list.length === 0 ? (
                    <p className="text-purple-200/50 text-center py-8">No events scheduled for this day.</p>
                  ) : (
                    list.map(item => (
                      <div key={item.id} className="relative">
                        <div className="absolute -left-3 top-2 w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_20px_4px_rgba(139,92,246,0.5)]" />
                        <div className="glass-pill border border-purple-400/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="text-base md:text-lg font-semibold text-purple-100 leading-tight">{item.name}</h3>
                              <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${getDeptColor(item.department)}`}>
                                {item.department}
                              </span>
                            </div>
                            {item.venue !== 'TBA' && <p className="text-sm text-purple-200/60">{item.venue}</p>}
                          </div>
                          <div className="text-sm text-purple-200/80 whitespace-nowrap shrink-0">{item.time}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default Schedule;
