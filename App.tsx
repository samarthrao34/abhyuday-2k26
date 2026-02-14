import React, { useEffect, useState, lazy, Suspense, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Countdown from './components/Countdown';
import DepartmentEventsTable from './components/DepartmentEventsTable';
import { EVENTS } from './constants';
import { EventItem } from './types';

// Lazy load below-the-fold components
const Schedule = lazy(() => import('./components/Schedule'));
const Gallery = lazy(() => import('./components/Gallery'));
const Coordinators = lazy(() => import('./components/Coordinators'));
const EventDetailsModal = lazy(() => import('./components/EventDetailsModal'));

const App: React.FC = () => {
  const { scrollY } = useScroll();
  const [maskUrl, setMaskUrl] = useState<string>('');
  const [outlineMaskUrl, setOutlineMaskUrl] = useState<string>('');
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEventsPage, setIsEventsPage] = useState(false);
  const [deptFilter, setDeptFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeLogo, setActiveLogo] = useState<string | null>(null);

  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textY = useTransform(scrollY, [0, 400], [0, -50]);

  useEffect(() => {
    const img = new Image();
    img.src = '/abhyuday%20logo.jpeg';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext('2d'); if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data; const fillData = new Uint8ClampedArray(d);
      for (let i = 0; i < fillData.length; i += 4) {
        const lum = 0.299 * fillData[i] + 0.587 * fillData[i + 1] + 0.114 * fillData[i + 2];
        fillData[i + 3] = lum > 245 ? 0 : 255; fillData[i] = 255; fillData[i + 1] = 255; fillData[i + 2] = 255;
      }
      ctx.putImageData(new ImageData(fillData, canvas.width, canvas.height), 0, 0);
      setMaskUrl(canvas.toDataURL());
      const outCanvas = document.createElement('canvas'); outCanvas.width = img.width; outCanvas.height = img.height; const outCtx = outCanvas.getContext('2d'); if (!outCtx) return;
      outCtx.drawImage(canvas, 0, 0); outCtx.filter = 'blur(3px)'; outCtx.drawImage(canvas, 0, 0); outCtx.filter = 'none';
      const outData = outCtx.getImageData(0, 0, outCanvas.width, outCanvas.height); const od = outData.data;
      for (let i = 0; i < od.length; i += 4) { const outerAlpha = od[i + 3]; const innerAlpha = fillData[i + 3]; const edgeAlpha = Math.max(0, outerAlpha - innerAlpha * 0.7); od[i] = 255; od[i + 1] = 255; od[i + 2] = 255; od[i + 3] = Math.min(255, edgeAlpha * 2); }
      outCtx.putImageData(outData, 0, 0); setOutlineMaskUrl(outCanvas.toDataURL());
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const syncPage = () => {
      const hash = window.location.hash;
      const nextIsEvents = hash === '#all-events';
      setIsEventsPage(nextIsEvents);
      if (nextIsEvents) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash) {
        const id = hash.replace('#', '');
        window.requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        });
      }
    };
    syncPage();
    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  const handleOpenEvent = useCallback((event: EventItem | null) => {
    setSelected(event);
  }, []);

  // Filter and sort events: technical -> literary -> cultural
  const allDepartments = useMemo(() => {
    const depts = new Set(EVENTS.map(ev => ev.department));
    return Array.from(depts).sort();
  }, []);

  const sortedAndFilteredEvents = useMemo(() => {
    const categoryOrder: Record<string, number> = { technical: 1, literary: 2, cultural: 3 };
    
    return EVENTS
      .filter(ev => {
        if (deptFilter !== 'all' && ev.department !== deptFilter) return false;
        if (categoryFilter !== 'all' && ev.category !== categoryFilter) return false;
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
          ev.title.toLowerCase().includes(query) ||
          ev.category.toLowerCase().includes(query) ||
          ev.department.toLowerCase().includes(query) ||
          ev.venue.toLowerCase().includes(query) ||
          ev.description.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => (categoryOrder[a.category] || 999) - (categoryOrder[b.category] || 999));
  }, [searchQuery, deptFilter, categoryFilter]);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-amber-400/30" style={{ background: 'linear-gradient(180deg, #1f1510 0%, #2a1a12 25%, #22160f 50%, #1f1510 75%, #2a1a12 100%)' }}>
      <video autoPlay loop muted playsInline preload="none" className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none" style={{ opacity: 0.5 }}>
        <source src="https://cdn.coverr.co/videos/coverr-stars-in-the-night-sky-2609/1080p.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(26,18,12,0.4) 0%, rgba(90,45,10,0.22) 30%, rgba(55,35,20,0.12) 70%, rgba(45,28,12,0.15) 100%)' }} />
      <div className="fixed inset-0 z-[2] pointer-events-none" style={{ background: 'radial-gradient(2px 2px at 20% 30%, rgba(255,230,200,0.28), transparent), radial-gradient(2px 2px at 80% 10%, rgba(255,210,160,0.22), transparent), radial-gradient(2px 2px at 50% 70%, rgba(255,220,180,0.2), transparent), radial-gradient(1px 1px at 10% 80%, rgba(255,200,150,0.28), transparent), radial-gradient(1px 1px at 90% 60%, rgba(255,230,200,0.22), transparent)' }} />

      <Navbar />

      {/* Hero */}
      <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-x-hidden px-4">
        <div
          className="absolute inset-0 z-0 bg-center bg-cover"
          style={{ backgroundImage: "url('./bg-image.png')", filter: 'brightness(1.18) contrast(1.18)' }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Main hero content */}
        <motion.div style={{ opacity: textOpacity, y: textY }} className="relative z-10 flex flex-col items-center justify-center w-full max-w-full select-none text-center mt-20 sm:mt-24 lg:mt-16">
          {/* Abhyuday'26 Main Logo - just below navbar */}
          <div className="w-[90vw] sm:w-[80vw] md:w-[55vw] lg:w-[40vw] max-w-3xl mb-1 sm:mb-2">
            <img
              src="/abhyuday.png"
              alt="Abhyuday'26"
              className="w-full h-auto object-contain scale-[0.95] sm:scale-[1] md:scale-[1.05] lg:scale-[1.1]"
              loading="eager"
              decoding="async"
              style={{
                filter: 'drop-shadow(0 0 32px #ffe47a) drop-shadow(0 0 60px #d4a43a) drop-shadow(0 10px 40px rgba(0,0,0,0.85)) brightness(1.18)',
              }}
            />
          </div>

          {/* Countdown - right below logo */}
          <div className="scale-[1.1] sm:scale-[0.9] md:scale-[0.7] lg:scale-[0.5] origin-center -mt-2 sm:-mt-3 mb-2 sm:mb-3"><Countdown /></div>

          <div className="flex flex-col items-center w-full max-w-3xl px-2 gap-0.5 sm:gap-1 -mt-2 sm:-mt-3">
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl italic tracking-[0.08em] golden-glow-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Where Innovation Meets Creativity!</p>
            <p className="text-[10px] sm:text-xs md:text-base lg:text-lg italic tracking-[0.15em] sm:tracking-[0.25em] golden-glow-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Ashoka Institute of Technology and Management, Varanasi</p>

            {/* Organization Logos */}
            <div className="flex items-center justify-center mt-3 sm:mt-4 px-4 w-full">
              <div className="flex gap-4 sm:gap-6 md:gap-8">
                {[
                  { src: '/cipher.jpg', alt: 'CS Cipher' },
                  { src: '/MOKSH.png', alt: 'MOKSH' },
                  { src: '/IEEE.png', alt: 'IEEE' },
                  { src: '/IIC.png', alt: 'IIC' },
                ].map((logo) => (
                  <div
                    key={logo.alt}
                    onMouseEnter={() => setActiveLogo(logo.alt)}
                    onMouseLeave={() => setActiveLogo(null)}
                    className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center overflow-hidden cursor-pointer group"
                    style={{
                      background: logo.alt === 'MOKSH' ? 'transparent' : '#ffffff',
                      border: '2px solid rgba(212,164,58,0.4)',
                      boxShadow: '0 0 16px rgba(212,164,58,0.25), 0 0 30px rgba(255,220,140,0.15), 0 2px 12px rgba(0,0,0,0.3)',
                      transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease, border-color 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.18)';
                      e.currentTarget.style.borderColor = 'rgba(255,220,140,0.9)';
                      e.currentTarget.style.boxShadow = '0 0 24px rgba(212,164,58,0.7), 0 0 48px rgba(255,220,140,0.45), 0 4px 20px rgba(0,0,0,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(212,164,58,0.4)';
                      e.currentTarget.style.boxShadow = '0 0 16px rgba(212,164,58,0.25), 0 0 30px rgba(255,220,140,0.15), 0 2px 12px rgba(0,0,0,0.3)';
                    }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={logo.alt === 'MOKSH' ? "h-full w-full object-cover rounded-full" : "h-[72%] w-[72%] object-contain"}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
              <div className="w-12 sm:w-14 md:w-16" />
              <div className="flex gap-4 sm:gap-6 md:gap-8">
                {[
                  { src: '/ic_logo.png', alt: 'IC' },
                  { src: '/IOE.png', alt: 'IOE' },
                  { src: '/CSI-LOGO.png', alt: 'DCIC' },
                  { src: '/GeeksForGeeks_logo.png', alt: 'GFG' },
                ].map((logo) => (
                  <div
                    key={logo.alt}
                    onMouseEnter={() => setActiveLogo(logo.alt)}
                    onMouseLeave={() => setActiveLogo(null)}
                    className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center overflow-hidden cursor-pointer group"
                    style={{
                      background: logo.alt === 'MOKSH' ? 'transparent' : '#ffffff',
                      border: '2px solid rgba(212,164,58,0.4)',
                      boxShadow: '0 0 16px rgba(212,164,58,0.25), 0 0 30px rgba(255,220,140,0.15), 0 2px 12px rgba(0,0,0,0.3)',
                      transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease, border-color 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.18)';
                      e.currentTarget.style.borderColor = 'rgba(255,220,140,0.9)';
                      e.currentTarget.style.boxShadow = '0 0 24px rgba(212,164,58,0.7), 0 0 48px rgba(255,220,140,0.45), 0 4px 20px rgba(0,0,0,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(212,164,58,0.4)';
                      e.currentTarget.style.boxShadow = '0 0 16px rgba(212,164,58,0.25), 0 0 30px rgba(255,220,140,0.15), 0 2px 12px rgba(0,0,0,0.3)';
                    }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={logo.alt === 'MOKSH' ? "h-full w-full object-cover rounded-full" : "h-[72%] w-[72%] object-contain"}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {!isEventsPage && (
        <>
          <DepartmentEventsTable />

          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-purple-300 animate-pulse">Loading...</div></div>}>
            <Schedule />
            <Gallery />
            <Coordinators />
          </Suspense>
        </>
      )}

      {isEventsPage && (
        <section id="all-events" className="relative z-50 section-blend py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-transparent via-[#352558]/80 to-[#2a2048]" style={{ minHeight: '100vh' }}>
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="mb-4 sm:mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-brand font-bold tracking-tight text-purple-100">All Events</h2>
              <a href="#home" className="px-4 py-2 rounded-full text-xs sm:text-sm border border-purple-300/30 text-purple-100/80 hover:text-white hover:border-purple-200/60 transition-colors">
                Back to Home
              </a>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mb-4 sm:mb-6" />
            <p className="text-sm sm:text-base text-purple-200/70 max-w-2xl">Browse everything across technical, cultural and literary galaxies.</p>

            {/* Search & Filters */}
            <div className="mt-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end relative z-[9999] pointer-events-auto" style={{ position: 'relative' }}>
                <div className="relative">
                  <label className="block text-xs text-purple-200/70 mb-1">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search events by name, department, venue..."
                      className="w-full px-4 py-3 pl-11 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-purple-100 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-400/50 transition-all duration-200"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300/70 hover:text-purple-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-purple-200/70 mb-1">Department</label>
                  <select
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="w-full border border-white/20 rounded-lg px-3 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-colors cursor-pointer"
                    style={{ backgroundColor: 'rgba(30, 20, 50, 0.9)', color: '#e9d5ff', WebkitAppearance: 'menulist', MozAppearance: 'menulist' as any, position: 'relative', zIndex: 9999 }}
                  >
                    <option value="all" style={{ backgroundColor: '#1a1030', color: '#e9d5ff' }}>All Departments</option>
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

                <div>
                  <label className="block text-xs text-purple-200/70 mb-1">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full border border-white/20 rounded-lg px-3 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-colors cursor-pointer"
                    style={{ backgroundColor: 'rgba(30, 20, 50, 0.9)', color: '#e9d5ff', WebkitAppearance: 'menulist', MozAppearance: 'menulist' as any }}
                  >
                    <option value="all" style={{ backgroundColor: '#2a1a12', color: '#e9d5ff' }}>All Categories</option>
                    <option value="technical" style={{ backgroundColor: '#2a1a12', color: '#e9d5ff' }}>Technical</option>
                    <option value="cultural" style={{ backgroundColor: '#2a1a12', color: '#e9d5ff' }}>Cultural</option>
                    <option value="literary" style={{ backgroundColor: '#2a1a12', color: '#e9d5ff' }}>Literary</option>
                  </select>
                </div>
              </div>

              <p className="mt-3 text-sm text-purple-300/60">
                Showing {sortedAndFilteredEvents.length} of {EVENTS.length} events
              </p>
            </div>

            {/* Table Container */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">S.No</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Event Name</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Venue</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-100 uppercase tracking-wider">Team Size</th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-purple-100 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {sortedAndFilteredEvents.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-purple-300/60">
                          No events found matching your search.
                        </td>
                      </tr>
                    ) : (
                      sortedAndFilteredEvents.map((ev, idx) => (
                        <tr 
                          key={ev.id}
                          className="hover:bg-white/5 transition-colors duration-200 group"
                        >
                          <td className="px-6 py-4 text-sm text-purple-200/80">{idx + 1}</td>
                          <td className="px-6 py-4 text-sm text-purple-200/80 font-medium">{ev.department}</td>
                          <td className="px-6 py-4 text-sm font-medium text-purple-100 group-hover:text-violet-300 transition-colors">
                            {ev.title}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              ev.category === 'technical' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
                              ev.category === 'literary' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' :
                              'bg-pink-500/20 text-pink-300 border border-pink-400/30'
                            }`}>
                              {ev.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-purple-200/70">
                            <div>{new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                            <div className="text-xs text-purple-300/50">{ev.time}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-purple-200/70">{ev.venue}</td>
                          <td className="px-6 py-4 text-sm text-purple-200/70">{ev.teamSize}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleOpenEvent(ev)}
                              className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet Cards */}
              <div className="md:hidden divide-y divide-white/5">
                {sortedAndFilteredEvents.length === 0 ? (
                  <div className="p-8 text-center text-purple-300/60">
                    No events found matching your search.
                  </div>
                ) : (
                  sortedAndFilteredEvents.map((ev, idx) => (
                  <div
                    key={ev.id}
                    className="p-4 hover:bg-white/5 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-purple-300/60 text-xs font-bold">#{idx + 1}</span>
                          <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full bg-violet-500/20 text-violet-300">
                            {ev.department}
                          </span>
                          <span className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                            ev.category === 'technical' ? 'bg-blue-500/20 text-blue-300' :
                            ev.category === 'literary' ? 'bg-emerald-500/20 text-emerald-300' :
                            'bg-pink-500/20 text-pink-300'
                          }`}>
                            {ev.category}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-purple-100 mb-2">{ev.title}</h3>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>
                        <span className="text-purple-300/50">Date:</span>
                        <span className="text-purple-200 ml-1">{new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div>
                        <span className="text-purple-300/50">Time:</span>
                        <span className="text-purple-200 ml-1">{ev.time}</span>
                      </div>
                      <div>
                        <span className="text-purple-300/50">Venue:</span>
                        <span className="text-purple-200 ml-1">{ev.venue}</span>
                      </div>
                      <div>
                        <span className="text-purple-300/50">Team:</span>
                        <span className="text-purple-200 ml-1">{ev.teamSize}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-purple-300/50">Department:</span>
                        <span className="text-violet-300 ml-1 font-medium">{ev.department}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleOpenEvent(ev)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg"
                    >
                      View Details
                    </button>
                  </div>
                ))) }
              </div>
            </div>
          </div>
        </section>
      )}

      <footer id="contact" className="relative z-50 border-t border-purple-500/15 bg-[#1a1030]">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

            {/* Column 1 — Branding */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex gap-3 items-center">
                <img src="/college-logo.png" alt="Ashoka Institute Logo" className="w-20 h-20 rounded-xl object-contain bg-white/10 p-1" />
              </div>
              <h3 className="font-brand text-xl sm:text-2xl font-bold text-gradient-gold tracking-tight">Abhyuday 2026</h3>
              <p className="text-amber-300/80 text-sm font-medium">2026</p>
              <p className="text-purple-200/60 text-sm leading-relaxed text-center md:text-left max-w-xs">
                Annual Technical Fest of Ashoka Institute of Technology and Management. A platform for innovation, creativity and technical excellence.
              </p>
              <div className="flex gap-4 mt-2">
                <a href="https://www.instagram.com/abhyuday2k26?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:scale-110 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg>
                </a>
                <a href="https://www.linkedin.com/school/ashoka-institute-of-technology-and-management-varanasi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:scale-110 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 8a6 6 0 0 1 6 6v5h-4v-5a2 2 0 0 0-4 0v5h-4v-5a6 6 0 0 1 6-6z" /><circle cx="8.5" cy="8.5" r="1.5" /><line x1="6" y1="20" x2="6" y2="9" /></svg>
                </a>
              </div>
            </div>

            {/* Column 2 — Quick Links */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="text-base font-semibold text-purple-100 mb-1">Quick Links</h4>
              <a href="#hero" className="text-sm text-purple-300/70 hover:text-amber-300 transition-colors">Home</a>
              <a href="#events" className="text-sm text-purple-300/70 hover:text-amber-300 transition-colors">Events</a>
              <a href="#schedule" className="text-sm text-purple-300/70 hover:text-amber-300 transition-colors">Schedule</a>
              <a href="#coordinators" className="text-sm text-purple-300/70 hover:text-amber-300 transition-colors">Faculty Coordinators</a>
              <a href="https://ashokainstitute.com" target="_blank" rel="noopener noreferrer" className="text-sm text-purple-300/70 hover:text-amber-300 transition-colors">ashokainstitute.com</a>
            </div>

            {/* Column 3 — Contact */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="text-base font-semibold text-purple-100 mb-1">Contact Us</h4>
              <a href="tel:+9198840005" className="text-sm text-purple-300/70 hover:text-amber-300 transition-colors">+91-98840005</a>
              <a href="tel:+9198840006" className="text-sm text-purple-300/70 hover:text-amber-300 transition-colors">+91-98840006</a>
              <a href="mailto:abhyuday@ashokainstitute.com" className="text-sm text-purple-300/70 hover:text-amber-300 transition-colors">abhyuday@ashokainstitute.com</a>
              <a href="mailto:info@ashokainstitute.com" className="text-sm text-purple-300/70 hover:text-amber-300 transition-colors">info@ashokainstitute.com</a>
              <p className="text-sm text-purple-300/60 leading-relaxed text-center md:text-left mt-2">
                Ashoka Institute of Technology and Management,<br />
                Varanasi, Uttar Pradesh
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/10 bg-[#150f25]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-col items-center justify-center gap-1">
            <p className="text-[11px] sm:text-xs text-purple-300/40 text-center">
              © 2025 Ashoka Institute of Technology and Management. All rights reserved.
            </p>
            <p className="text-[11px] sm:text-xs text-purple-300/60 text-center mt-1">
              Made by <span className="font-semibold text-amber-300">Samarth Rao</span>
            </p>
          </div>
        </div>
      </footer>

      <Suspense fallback={null}>
        <EventDetailsModal event={selected} onClose={() => setSelected(null)} />
      </Suspense>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 z-[200] p-3 rounded-full border border-amber-300/30 shadow-lg backdrop-blur-lg"
          style={{ background: 'rgba(20,10,40,0.7)' }}
          aria-label="Scroll to top"
        >
          <ArrowUpRight className="w-4 h-4 text-amber-200 rotate-[-45deg]" />
        </button>
      )}
    </div>
  );
};

export default App;
