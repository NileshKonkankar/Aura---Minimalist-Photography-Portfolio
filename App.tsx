import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Instagram, Twitter, Mail, Camera, X, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from './types';
import BackgroundEffects from './components/BackgroundEffects';
import { ResponsiveImage } from './components/ResponsiveImage';

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
  
  // Subtle text parallax transforms
  const textY1 = useTransform(scrollY, [0, 800], [0, -150]); // Fastest
  const textY2 = useTransform(scrollY, [0, 800], [0, -100]); // Medium
  const textY3 = useTransform(scrollY, [0, 800], [0, -50]);  // Slowest

  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState(1);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate network request
    setTimeout(() => {
      setFormState('success');
      // Reset form after some time
      setTimeout(() => setFormState('idle'), 5000);
    }, 1500);
  };

  useEffect(() => {
    setVisibleCount(6);
    setCarouselIndex(0);
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
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 1, filter: 'blur(10px)' }}
            animate={{ scale: 1.08, filter: 'blur(0px)' }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <ResponsiveImage 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" 
              alt="Hero Background" 
              className="w-full h-full object-cover opacity-80"
              priority={true}
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#fafafa]"></div>
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-4 w-full max-w-5xl">
          <motion.div style={{ y: textY1 }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.6 }
                }
              }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight drop-shadow-lg"
            >
              <motion.span 
                className="block" 
                variants={{ 
                  hidden: { opacity: 0, y: 50, filter: 'blur(12px)', scale: 0.95 }, 
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } 
                }}
              >
                Capturing Light
              </motion.span>
              <motion.span 
                className="block italic text-white/90" 
                variants={{ 
                  hidden: { opacity: 0, y: 50, filter: 'blur(12px)', scale: 0.95 }, 
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } 
                }}
              >
                & Fleeting Moments
              </motion.span>
            </motion.div>
          </motion.div>
          
          <motion.div style={{ y: textY2 }}>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto text-white/90 drop-shadow-md"
            >
              Professional photography focused on architecture, nature, and the human experience.
            </motion.p>
          </motion.div>
          
          <motion.div style={{ y: textY3 }}>
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

        {activeCategory === 'All' ? (
          <>
            {/* Masonry-style Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredPhotos.slice(0, visibleCount).map((photo, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: (index % 3) * 0.1 // Slight stagger for items entering simultaneously
                    }}
                    key={photo.id}
                    className={`relative group overflow-hidden cursor-pointer bg-gray-100 ${
                      photo.aspectRatio === 'portrait' ? 'aspect-[3/4]' : 
                      photo.aspectRatio === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'
                    }`}
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <motion.div 
                      className="w-full h-full relative"
                      initial={{ scale: 1.05 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ResponsiveImage 
                        src={photo.url} 
                        alt={photo.title} 
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-700 ease-[0.16,1,0.3,1] flex flex-col justify-end p-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <span className="text-white/90 text-xs tracking-[0.2em] uppercase mb-3 block font-medium">{photo.category}</span>
                          <h3 className="text-white font-serif text-3xl drop-shadow-lg leading-tight">{photo.title}</h3>
                        </motion.div>
                      </div>
                    </motion.div>
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
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[60vh] md:h-[75vh] bg-gray-100 overflow-hidden group"
          >
            <AnimatePresence initial={false} custom={carouselDirection}>
              {filteredPhotos[carouselIndex] && (
                <motion.div
                  key={carouselIndex}
                  custom={carouselDirection}
                  initial={(d) => ({ opacity: 0, x: d * 200, scale: 0.95 })}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={(d) => ({ opacity: 0, x: d * -200, scale: 0.95 })}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setSelectedPhoto(filteredPhotos[carouselIndex])}
                >
                  <ResponsiveImage
                    src={filteredPhotos[carouselIndex].url}
                    alt={filteredPhotos[carouselIndex].title}
                    sizes="100vw"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="text-white/80 text-xs tracking-[0.2em] uppercase mb-4 block font-medium">{filteredPhotos[carouselIndex].category}</span>
                      <h3 className="text-white font-serif text-4xl md:text-6xl drop-shadow-lg leading-tight mb-8 md:mb-4">{filteredPhotos[carouselIndex].title}</h3>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Carousel Navigation */}
            {filteredPhotos.length > 1 && (
              <>
                <button 
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-105 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselDirection(-1);
                    setCarouselIndex(prev => prev === 0 ? filteredPhotos.length - 1 : prev - 1);
                  }}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={28} strokeWidth={1.5} />
                </button>
                
                <button 
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-105 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselDirection(1);
                    setCarouselIndex(prev => prev === filteredPhotos.length - 1 ? 0 : prev + 1);
                  }}
                  aria-label="Next photo"
                >
                  <ChevronRight size={28} strokeWidth={1.5} />
                </button>
                
                {/* Indicators */}
                <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10 bg-black/20 backdrop-blur-sm px-4 py-3 rounded-full">
                  {filteredPhotos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCarouselDirection(idx > carouselIndex ? 1 : -1);
                        setCarouselIndex(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-500 ease-[0.16,1,0.3,1] ${
                        idx === carouselIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to photo ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
              <ResponsiveImage 
                src="https://images.unsplash.com/photo-1554046920-90dcac824100?q=80&w=1974&auto=format&fit=crop" 
                alt="Alex Morgan" 
                sizes="(max-width: 1024px) 100vw, 50vw"
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
          <p className="text-gray-400 mb-12 text-lg font-light max-w-xl mx-auto">
            Available for freelance opportunities and creative collaborations worldwide. Drop me a message below.
          </p>

          <div className="min-h-[300px] flex flex-col justify-center">
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 p-12 text-center text-white"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-serif mb-2">Message Received</h3>
                <p className="text-gray-400 font-light text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                onSubmit={handleContactSubmit} 
                className="text-left space-y-8 w-full max-w-xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-8">
                  <div className="relative pt-6 z-0">
                    <input 
                      required 
                      type="text" 
                      id="contact-name"
                      className="peer w-full bg-transparent border-b border-gray-800 py-2 text-white focus:outline-none focus:border-white transition-colors font-light placeholder-transparent" 
                      placeholder="Name"
                    />
                    <label 
                      htmlFor="contact-name"
                      className="absolute left-0 top-0 text-xs text-gray-400 uppercase tracking-widest transition-all duration-300 pointer-events-none 
                                 peer-placeholder-shown:top-8 peer-placeholder-shown:text-base peer-placeholder-shown:lowercase peer-placeholder-shown:capitalize peer-placeholder-shown:tracking-wide peer-placeholder-shown:text-gray-500
                                 peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-white"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative pt-6 z-0">
                    <input 
                      required 
                      type="email" 
                      id="contact-email"
                      className="peer w-full bg-transparent border-b border-gray-800 py-2 text-white focus:outline-none focus:border-white transition-colors font-light placeholder-transparent" 
                      placeholder="Email"
                    />
                    <label 
                      htmlFor="contact-email"
                      className="absolute left-0 top-0 text-xs text-gray-400 uppercase tracking-widest transition-all duration-300 pointer-events-none 
                                 peer-placeholder-shown:top-8 peer-placeholder-shown:text-base peer-placeholder-shown:lowercase peer-placeholder-shown:capitalize peer-placeholder-shown:tracking-wide peer-placeholder-shown:text-gray-500
                                 peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-white"
                    >
                      Email
                    </label>
                  </div>
                </div>
                <div className="relative pt-6 z-0">
                  <textarea 
                    required 
                    id="contact-message"
                    rows={4} 
                    className="peer w-full bg-transparent border-b border-gray-800 py-2 text-white focus:outline-none focus:border-white transition-colors resize-none font-light placeholder-transparent"
                    placeholder="Message"
                  ></textarea>
                  <label 
                    htmlFor="contact-message"
                    className="absolute left-0 top-0 text-xs text-gray-400 uppercase tracking-widest transition-all duration-300 pointer-events-none 
                               peer-placeholder-shown:top-8 peer-placeholder-shown:text-base peer-placeholder-shown:lowercase peer-placeholder-shown:capitalize peer-placeholder-shown:tracking-wide peer-placeholder-shown:text-gray-500
                               peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-white"
                  >
                    Message
                  </label>
                </div>
                
                <button 
                  disabled={formState === 'submitting'} 
                  type="submit" 
                  className="w-full bg-white text-black py-5 text-xs tracking-widest uppercase hover:bg-gray-200 transition-colors cursor-pointer flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>Send Message</>
                  )}
                </button>
              </motion.form>
            )}
          </div>
          
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors cursor-pointer z-10 p-2"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} strokeWidth={1.5} />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="relative max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center cursor-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ResponsiveImage 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title} 
                priority={true}
                sizes="100vw"
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 text-center"
              >
                <h3 className="text-white font-serif text-3xl mb-2 tracking-wide">{selectedPhoto.title}</h3>
                <p className="text-gray-400 text-sm tracking-[0.2em] uppercase font-light">{selectedPhoto.category}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
