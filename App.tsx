
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './components/Navbar';
import FloatingElements from './components/FloatingElements';
import ThreeDCard from './components/ThreeDCard';
import Countdown from './components/Countdown';
import { EVENTS } from './constants';

const App: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Parallax effects for deep space feeling
  const earthY = useTransform(scrollY, [0, 1000], [0, 200]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textY = useTransform(scrollY, [0, 400], [0, -50]);

  return (
    <div className="bg-[#010208] min-h-screen relative overflow-x-hidden selection:bg-blue-500/30">
      <Navbar />
      
      {/* Background stars and ambiance */}
      <FloatingElements />

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20 px-4">
        
        {/* Main Title Layer - ABHYUDAY 2K26 with Video Mask and Cinematic Floating Animation */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY, perspective: 1000 }}
          className="relative z-10 flex flex-col items-center justify-center w-full max-w-full select-none text-center"
        >
          <motion.div
            animate={{ 
              y: [0, -12, 0],
              rotateX: [0, 2, -2, 0],
              rotateY: [-1, 1, -1],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-full flex justify-center"
          >
            {/* Video-in-Text Implementation - Carefully scaled to fit 100% of viewport width */}
            <div className="relative inline-block overflow-hidden rounded-2xl max-w-full">
              {/* The Video Source - Abstract visuals */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-[1.25]"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-movement-of-fluid-shapes-in-blue-and-pink-31804-large.mp4" type="video/mp4" />
              </video>
              
              {/* The Mask Layer
                  Calibrated font size: 13 characters (A B H Y U D A Y _ 2 K 2 6)
                  Using slightly smaller vw units to guarantee it stays in frame. 
              */}
              <h1 className="relative font-brand font-black text-white leading-none tracking-tighter text-[6.2vw] md:text-[6.8vw] lg:text-[7.2vw] bg-[#010208] mix-blend-multiply py-4 px-2 md:px-8 lg:px-12 whitespace-nowrap uppercase">
                ABHYUDAY 2K26
              </h1>
            </div>

            {/* Subtle Outer Glow */}
            <motion.div 
              animate={{ opacity: [0.05, 0.12, 0.05] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute inset-0 bg-blue-500/10 blur-[100px] -z-10 rounded-full"
            />
          </motion.div>

          {/* Subtitle and Countdown */}
          <div className="mt-8 md:mt-12 flex flex-col items-center w-full max-w-2xl">
            <p className="text-xs md:text-lg lg:text-xl text-white/50 font-light tracking-[0.5em] uppercase drop-shadow-lg mb-4">
              Explore the infinite.
            </p>
            <div className="scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
              <Countdown />
            </div>
          </div>
        </motion.div>

        {/* Earth Sphere Layer (Bottom) */}
        <motion.div 
          style={{ y: earthY }}
          className="absolute bottom-[-55%] md:bottom-[-80%] w-[160%] max-w-[2400px] aspect-square z-30 pointer-events-none flex items-center justify-center"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden earth-glow">
            <img 
              src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bac4?q=80&w=1600&auto=format&fit=crop" 
              alt="Planet Earth"
              className="w-full h-full object-cover opacity-70 scale-105 animate-slow-rotate"
            />
            {/* Curvature Atmosphere Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-400/15 mix-blend-screen" />
            <div className="absolute inset-0 shadow-[inset_0_20px_120px_rgba(0,0,0,0.95)]" />
          </div>
        </motion.div>

        {/* Main CTA Button - Floating over Earth curvature */}
        <div className="absolute bottom-[5%] md:bottom-[7%] z-40">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.98 }}
            className="glass-pill px-8 py-3.5 md:px-12 md:py-4 lg:px-14 lg:py-5 rounded-full flex items-center gap-4 text-white text-sm md:text-lg lg:text-xl font-light tracking-wide transition-all border border-white/10 group shadow-2xl"
          >
            See events <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="relative z-50 py-32 md:py-48 px-8 bg-gradient-to-b from-transparent to-[#010208]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-brand font-bold mb-4 tracking-tight">Galactic Missions</h2>
            <div className="w-24 h-1 bg-blue-500 rounded-full mb-6 mx-auto md:mx-0"></div>
            <p className="text-white/50 text-lg max-w-xl mx-auto md:mx-0">Embark on journeys through technical mastery, cultural fusion, and literary brilliance.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {EVENTS.map((event) => (
              <ThreeDCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Proshow Section */}
      <section id="proshow" className="relative z-50 py-32 md:py-48 px-8 bg-[#010208]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-brand font-black mb-8 uppercase tracking-tighter text-center lg:text-left">CELESTIAL <br/><span className="text-blue-500 font-brand">BEATS</span></h2>
            <p className="text-white/60 text-xl leading-relaxed mb-10 text-center lg:text-left">
              When the stars align, the music starts. Join thousands of dreamers for a night that transcends planetary boundaries.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="px-10 py-4 bg-white text-black font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all transform hover:-rotate-2">
                GET PROSHOW PASS
              </button>
            </div>
          </motion.div>
          <div className="relative aspect-video glass-pill rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
             <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" alt="Concert" />
             <div className="absolute inset-0 bg-blue-900/20"></div>
          </div>
        </div>
      </section>

      <footer id="contact" className="relative z-50 py-16 px-8 border-t border-white/5 bg-[#010208]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-brand text-2xl font-bold tracking-tight text-white/90 lowercase">abhyuday 2k26</span>
            <span className="text-white/30 text-xs tracking-widest uppercase">NMAMIT Nitte • 2026</span>
          </div>
          <div className="flex gap-10 text-sm font-medium text-white/40">
            <a href="#" className="hover:text-blue-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
