import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Instagram, Twitter, Mail, Camera, X, Menu } from 'lucide-react';
import { Photo } from './types';
import BackgroundEffects from './components/BackgroundEffects';

const PORTFOLIO: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
    title: 'Urban Solitude',
    category: 'Architecture',
    aspectRatio: 'landscape'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop',
    title: 'Morning Light',
    category: 'Portrait',
    aspectRatio: 'portrait'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop',
    title: 'Wilderness',
    category: 'Nature',
    aspectRatio: 'landscape'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    title: 'Gaze',
    category: 'Portrait',
    aspectRatio: 'portrait'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop',
    title: 'Concrete Jungle',
    category: 'Architecture',
    aspectRatio: 'square'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1470071131384-001b85755536?q=80&w=2000&auto=format&fit=crop',
    title: 'Misty Mountains',
    category: 'Nature',
    aspectRatio: 'landscape'
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop',
    title: 'Expression',
    category: 'Portrait',
    aspectRatio: 'portrait'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    title: 'Glass & Steel',
    category: 'Architecture',
    aspectRatio: 'portrait'
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop',
    title: 'Forest Path',
    category: 'Nature',
    aspectRatio: 'square'
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1506744626753-eba7bc36130e?q=80&w=2070&auto=format&fit=crop',
    title: 'Golden Hour',
    category: 'Nature',
    aspectRatio: 'landscape'
  },
  {
    id: '11',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
    title: 'Minimalist Interior',
    category: 'Architecture',
    aspectRatio: 'portrait'
  },
  {
    id: '12',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop',
    title: 'Neon Dreams',
    category: 'Portrait',
    aspectRatio: 'square'
  },
  {
    id: '13',
    url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop',
    title: 'Alpine Lake',
    category: 'Nature',
    aspectRatio: 'landscape'
  },
  {
    id: '14',
    url: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?q=80&w=2071&auto=format&fit=crop',
    title: 'City Geometry',
    category: 'Architecture',
    aspectRatio: 'portrait'
  },
  {
    id: '15',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
    title: 'Contemplation',
    category: 'Portrait',
    aspectRatio: 'portrait'
  }
];

const CATEGORIES = ['All', 'Portrait', 'Architecture', 'Nature'];

const App: React.FC = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 3);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPhotos = activeCategory === 'All' 
    ? PORTFOLIO 
    : PORTFOLIO.filter(photo => photo.category === activeCategory);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#111] font-sans selection:bg-[#111] selection:text-white relative">
      <BackgroundEffects />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl font-semibold tracking-tight">Alex Morgan</a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {['Portfolio', 'About', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-gray-500 transition-colors uppercase text-xs tracking-widest cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#111] z-50 relative cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Portfolio', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl font-serif hover:text-gray-500 transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2, filter: 'blur(10px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#fafafa]"></div>
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-4 w-full max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.4 }
              }
            }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight drop-shadow-lg"
          >
            <motion.span 
              className="block" 
              variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: "easeOut" } } }}
            >
              Capturing Light
            </motion.span>
            <motion.span 
              className="block italic text-white/90" 
              variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: "easeOut" } } }}
            >
              & Fleeting Moments
            </motion.span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto text-white/90 drop-shadow-md"
          >
            Professional photography focused on architecture, nature, and the human experience.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-16"
          >
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="group relative overflow-hidden border border-white/50 px-10 py-4 text-xs uppercase tracking-widest transition-colors duration-300 cursor-pointer backdrop-blur-sm"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">View Portfolio</span>
              <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out z-0"></div>
            </button>
          </motion.div>
        </div>
      </header>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Selected Works</h2>
            <p className="text-gray-500 max-w-md">A curated collection of my recent photography projects across various disciplines.</p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-sm tracking-wider uppercase pb-1 border-b-2 transition-colors cursor-pointer ${
                  activeCategory === category ? 'border-[#111] text-[#111]' : 'border-transparent text-gray-400 hover:text-[#111]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.slice(0, visibleCount).map((photo) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                key={photo.id}
                className={`relative group overflow-hidden cursor-pointer bg-gray-100 ${
                  photo.aspectRatio === 'portrait' ? 'aspect-[3/4]' : 
                  photo.aspectRatio === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'
                }`}
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100">
                  <span className="text-white/80 text-xs tracking-widest uppercase mb-2">{photo.category}</span>
                  <h3 className="text-white font-serif text-2xl">{photo.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Infinite Scroll Trigger */}
        {visibleCount < filteredPhotos.length && (
          <div ref={loadMoreRef} className="w-full h-20 flex items-center justify-center mt-12">
            <div className="w-6 h-6 border-2 border-[#111] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
              <img 
                src="https://images.unsplash.com/photo-1554046920-90dcac824100?q=80&w=1974&auto=format&fit=crop" 
                alt="Alex Morgan" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#fafafa] hidden md:block -z-10"></div>
            </div>
            <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-8">Behind the Lens</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  I'm Alex Morgan, a professional photographer based in New York City. With over a decade of experience, I specialize in capturing the raw emotion of human subjects, the stark lines of modern architecture, and the untamed beauty of nature.
                </p>
                <p>
                  My approach is rooted in minimalism and natural light. I believe that the most powerful images are often the simplest, stripped of unnecessary distractions to reveal the core essence of the subject.
                </p>
                <p>
                  Whether I'm shooting a commercial campaign or a personal documentary project, my goal remains the same: to create timeless imagery that resonates on a deeper level.
                </p>
              </div>
              
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gray-300"></div>
                <span className="text-sm tracking-widest uppercase text-gray-400">Exhibitions & Awards</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-500">
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Sony World Photography Awards</span>
                  <span>2023</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>"Urban Solitude" Solo Exhibition, NYC</span>
                  <span>2022</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>National Geographic Photo Contest Finalist</span>
                  <span>2021</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-[#111] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Camera size={48} strokeWidth={1} className="mx-auto mb-8 opacity-50" />
          <h2 className="font-serif text-4xl md:text-6xl mb-6">Let's Create Together</h2>
          <p className="text-gray-400 mb-12 text-lg font-light">
            Available for freelance opportunities and creative collaborations worldwide.
          </p>
          <a 
            href="mailto:hello@example.com" 
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Mail size={18} />
            Get in Touch
          </a>
          
          <div className="mt-24 flex justify-center gap-8">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-gray-600 py-8 text-center text-sm border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Alex Morgan Photography. All rights reserved.</p>
      </footer>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button 
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ scale: 0.8, opacity: 0, y: -40, filter: 'blur(10px)' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-6xl max-h-full w-full h-full flex flex-col items-center justify-center cursor-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title} 
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <h3 className="text-white font-serif text-3xl mb-2">{selectedPhoto.title}</h3>
                <p className="text-white/60 text-sm tracking-widest uppercase">{selectedPhoto.category}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
