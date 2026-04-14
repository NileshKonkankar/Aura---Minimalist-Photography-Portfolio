import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

const BackgroundEffects: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();

  // Smooth out mouse movement for a fluid, elegant feel
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1 relative to the center of the screen
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform mouse movement into subtle positional shifts
  const orb1X = useTransform(springX, [-1, 1], [-80, 80]);
  const orb1Y = useTransform(springY, [-1, 1], [-80, 80]);
  
  const orb2X = useTransform(springX, [-1, 1], [80, -80]);
  const orb2Y = useTransform(springY, [-1, 1], [80, -80]);

  // Transform scroll position into parallax shifts
  const scrollYParallax1 = useTransform(scrollY, [0, 2000], [0, 400]);
  const scrollYParallax2 = useTransform(scrollY, [0, 2000], [0, -300]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#fafafa]">
      {/* Subtle noise texture overlay for a film-like photography feel */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }}
      />
      
      {/* Ambient Light Orb 1 - Top Left (Warm/Neutral) */}
      <motion.div 
        style={{ x: orb1X, y: orb1Y, translateY: scrollYParallax1 }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-stone-200/60 blur-[100px]"
      />
      
      {/* Ambient Light Orb 2 - Bottom Right (Cool/Neutral) */}
      <motion.div 
        style={{ x: orb2X, y: orb2Y, translateY: scrollYParallax2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-slate-200/50 blur-[120px]"
      />

      {/* Ambient Light Orb 3 - Center (Pulsing slowly) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-gray-200/40 blur-[80px]"
      />
    </div>
  );
};

export default BackgroundEffects;
