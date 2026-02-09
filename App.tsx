
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './components/Navbar';
import FloatingElements from './components/FloatingElements';
import ThreeDCard from './components/ThreeDCard';
import Countdown from './components/Countdown';
import { EVENTS } from './constants';

const App: React.FC = () => {
  const { scrollY } = useScroll();
  const [maskUrl, setMaskUrl] = useState<string>('');
  const [outlineMaskUrl, setOutlineMaskUrl] = useState<string>('');
  
  // Parallax effects for deep space feeling
  const earthY = useTransform(scrollY, [0, 1000], [0, 200]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textY = useTransform(scrollY, [0, 400], [0, -50]);

  // Generate alpha mask from logo: text → opaque, white bg → transparent
  useEffect(() => {
    const img = new Image();
    img.src = '/image.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      // Build fill mask
      const fillData = new Uint8ClampedArray(d);
      for (let i = 0; i < fillData.length; i += 4) {
        const lum = 0.299 * fillData[i] + 0.587 * fillData[i + 1] + 0.114 * fillData[i + 2];
        if (lum > 245) {
          fillData[i + 3] = 0;
        } else if (lum > 200) {
          fillData[i + 3] = Math.round(((245 - lum) / 45) * 255);
        } else {
          fillData[i + 3] = 255;
        }
        fillData[i] = 255;
        fillData[i + 1] = 255;
        fillData[i + 2] = 255;
      }
      ctx.putImageData(new ImageData(fillData, canvas.width, canvas.height), 0, 0);
      setMaskUrl(canvas.toDataURL());

      // Build outline mask: detect edges of the text
      const outCanvas = document.createElement('canvas');
      outCanvas.width = img.width;
      outCanvas.height = img.height;
      const outCtx = outCanvas.getContext('2d');
      if (!outCtx) return;
      // Draw the fill mask slightly larger (dilated) then subtract the fill to get outline
      outCtx.drawImage(canvas, 0, 0);
      // Apply a slight blur to expand the mask
      outCtx.filter = 'blur(3px)';
      outCtx.drawImage(canvas, 0, 0);
      outCtx.filter = 'none';
      // Read the dilated version
      const outData = outCtx.getImageData(0, 0, outCanvas.width, outCanvas.height);
      const od = outData.data;
      // Subtract original fill to keep only the edge
      for (let i = 0; i < od.length; i += 4) {
        const outerAlpha = od[i + 3];
        const innerAlpha = fillData[i + 3];
        // Edge = dilated minus original
        const edgeAlpha = Math.max(0, outerAlpha - innerAlpha * 0.7);
        od[i] = 255;
        od[i + 1] = 255;
        od[i + 2] = 255;
        od[i + 3] = Math.min(255, edgeAlpha * 2);
      }
      outCtx.putImageData(outData, 0, 0);
      setOutlineMaskUrl(outCanvas.toDataURL());
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-purple-500/30" style={{ background: 'linear-gradient(180deg, #2a2048 0%, #352558 25%, #2e2350 50%, #2a2048 75%, #352558 100%)' }}>
      {/* Full-screen background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.5 }}
      >
        <source src="/original-8f63ac682e80a3c6d898c050ecedd95d.mp4" type="video/mp4" />
      </video>
      {/* Cosmic nebula overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(26,21,48,0.4) 0%, rgba(50,25,90,0.25) 30%, rgba(30,55,45,0.12) 70%, rgba(25,50,40,0.15) 100%)' }} />
      {/* Subtle star shimmer layer */}
      <div className="fixed inset-0 z-[2] pointer-events-none" style={{ background: 'radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.3), transparent), radial-gradient(2px 2px at 80% 10%, rgba(200,180,255,0.25), transparent), radial-gradient(2px 2px at 50% 70%, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 10% 80%, rgba(180,160,255,0.3), transparent), radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.25), transparent)' }} />
      <Navbar />
      
      {/* Background stars and ambiance */}
      <FloatingElements />

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20 px-4">
        
        {/* Main Title Layer - Logo Image */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex flex-col items-center justify-center w-full max-w-full select-none text-center"
        >
          <div className="relative w-full flex justify-center items-center">
            {/* Video playing inside logo text shape */}
            <div className="logo-video-container w-[90vw] md:w-[65vw] lg:w-[50vw] max-w-4xl relative">
              {/* Aspect-ratio wrapper matching the logo proportions */}
              <div className="relative" style={{ paddingBottom: '25%' }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  style={maskUrl ? {
                    WebkitMaskImage: `url(${maskUrl})`,
                    maskImage: `url(${maskUrl})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                  } : { opacity: 0 }}
                >
                  <source src="/original-8f63ac682e80a3c6d898c050ecedd95d.mp4" type="video/mp4" />
                </video>
                {/* Glass edge highlight around the text shape */}
                {outlineMaskUrl && (
                  <div
                    className="absolute inset-0 logo-glass-edge"
                    style={{
                      WebkitMaskImage: `url(${outlineMaskUrl})`,
                      maskImage: `url(${outlineMaskUrl})`,
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                      background: 'linear-gradient(135deg, rgba(212,164,58,0.95), rgba(255,236,179,0.8), rgba(245,215,122,0.9), rgba(179,135,40,0.7), rgba(255,236,179,0.85), rgba(212,164,58,0.95))',
                    }}
                  />
                )}
                {/* Frosted golden glass fill */}
                {maskUrl && (
                  <div
                    className="absolute inset-0 logo-glass-fill"
                    style={{
                      WebkitMaskImage: `url(${maskUrl})`,
                      maskImage: `url(${maskUrl})`,
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                      background: 'linear-gradient(180deg, rgba(255,236,179,0.5) 0%, rgba(212,164,58,0.35) 30%, rgba(179,135,40,0.2) 60%, rgba(255,220,130,0.4) 100%)',
                    }}
                  />
                )}
                {/* Golden glass refraction bands */}
                {maskUrl && (
                  <div
                    className="absolute inset-0 logo-glass-refraction"
                    style={{
                      WebkitMaskImage: `url(${maskUrl})`,
                      maskImage: `url(${maskUrl})`,
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                      background: 'linear-gradient(120deg, transparent 20%, rgba(255,236,179,0.45) 30%, transparent 40%, rgba(212,164,58,0.3) 50%, transparent 60%, rgba(255,220,130,0.4) 75%, transparent 85%)',
                    }}
                  />
                )}
                {/* Animated golden specular highlight sweep */}
                {maskUrl && (
                  <div
                    className="absolute inset-0 logo-glass-specular"
                    style={{
                      WebkitMaskImage: `url(${maskUrl})`,
                      maskImage: `url(${maskUrl})`,
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                      background: 'linear-gradient(105deg, transparent 25%, rgba(255,236,179,0.1) 35%, rgba(255,240,190,0.7) 44%, rgba(255,250,220,0.95) 50%, rgba(255,240,190,0.7) 56%, rgba(255,236,179,0.1) 65%, transparent 75%)',
                      backgroundSize: '200% 100%',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Subtitle and Countdown */}
          <div className="mt-8 md:mt-12 flex flex-col items-center w-full max-w-3xl">
            <p className="text-base md:text-2xl lg:text-3xl italic tracking-[0.08em] mb-3 golden-glow-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Where Innovation Meets Creativity!
            </p>
            <p className="text-sm md:text-xl lg:text-2xl italic tracking-[0.25em] mb-6 golden-glow-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Ashoka Institute of Technology and Management, Varanasi
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
            className="glass-pill px-5 py-2.5 md:px-7 md:py-3 lg:px-9 lg:py-3.5 rounded-full flex items-center gap-2.5 text-purple-200 text-xs md:text-sm lg:text-base font-light tracking-wide transition-all border border-purple-400/20 group shadow-lg hover:border-purple-400/40"
          >
            See events <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="relative z-50 py-32 md:py-48 px-8 bg-gradient-to-b from-transparent via-[#352558]/80 to-[#2a2048]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-brand font-bold mb-4 tracking-tight text-purple-100">Galactic Missions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mb-6 mx-auto md:mx-0"></div>
            <p className="text-purple-200/60 text-lg max-w-xl mx-auto md:mx-0">Embark on journeys through technical mastery, cultural fusion, and literary brilliance.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {EVENTS.map((event) => (
              <ThreeDCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="relative z-50 py-32 md:py-48 px-8 bg-[#2a2048]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-brand font-black mb-8 uppercase tracking-tighter text-center lg:text-left text-purple-100">CELESTIAL <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-brand">BEATS</span></h2>
            <p className="text-purple-200/60 text-xl leading-relaxed mb-10 text-center lg:text-left">
              When the stars align, the music starts. Join thousands of dreamers for a night that transcends planetary boundaries.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="px-10 py-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all transform hover:-rotate-2 shadow-lg shadow-purple-500/25">
                VIEW SCHEDULE
              </button>
            </div>
          </motion.div>
          <div className="relative aspect-video glass-pill rounded-3xl overflow-hidden border border-purple-400/15 shadow-2xl shadow-purple-500/10">
             <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" alt="Concert" />
             <div className="absolute inset-0 bg-purple-600/20"></div>
          </div>
        </div>
      </section>

      <footer id="contact" className="relative z-50 py-16 px-8 border-t border-purple-500/15 bg-[#241c3a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-logo text-2xl tracking-tight text-gradient-gold">अभ्yuday'26</span>
            <span className="text-purple-300/40 text-xs tracking-widest uppercase">NMAMIT Nitte • 2026</span>
          </div>
          <div className="flex gap-10 text-sm font-medium text-purple-300/40">
            <a href="#" className="hover:text-violet-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
