import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Compass, TrendingUp, Megaphone, Heart, LifeBuoy, BookOpen,
  Menu, X, ChevronDown, ArrowRight, Linkedin, Instagram, Youtube,
  CheckCircle, User, Target, Zap, Shield, Star, ArrowLeft, ArrowDown, Sparkles
} from 'lucide-react';
import FrameworkPage from './pages/FrameworkPage';
import LeadershipPage from './pages/LeadershipPage';
import MarketingPage from './pages/MarketingPage';
import SalesPage from './pages/SalesPage';
import HRPage from './pages/HRPage';
import ServicePage from './pages/ServicePage';
import PersonalPage from './pages/PersonalPage';
import PastorsPage from './pages/PastorsPage';
import WhoPage from './pages/WhoPage';
import FounderPage from './pages/FounderPage';
import SpeakerPage from './pages/SpeakerPage';
import WorkshopsPage from './pages/WorkshopsPage';
import CoachingPage from './pages/CoachingPage';
import MastermindPage from './pages/MastermindPage';
import ContactSlideOut from './components/ContactSlideOut';

// --- EASTER EGG: KONAMI CODE HOOK ---
const useKonamiCode = () => {
  const [triggered, setTriggered] = useState(false);
  const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === sequence[index]) {
        const nextIndex = index + 1;
        if (nextIndex === sequence.length) {
          setTriggered(true);
          setIndex(0);
        } else {
          setIndex(nextIndex);
        }
      } else {
        setIndex(0);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index]);

  return triggered;
};

// --- UX: SCROLL PROGRESS BAR ---
const ScrollProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setWidth(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1.5 bg-gray-100 z-[60] w-full">
      <div 
        className="h-full bg-gradient-to-r from-[#f65625] to-[#faaa68] transition-all duration-150 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

// --- UX: CONFETTI COMPONENT ---
const Confetti = ({ isActive }) => {
  if (!isActive) return null;
  // Generate 50 particles
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            backgroundColor: ['#f65625', '#028393', '#faaa68', '#142d63'][Math.floor(Math.random() * 4)],
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
    </div>
  );
};

// --- DESIGN SYSTEM CONSTANTS ---
const COLORS = {
  navy: '#142d63',      
  teal: '#028393',      
  orange: '#f65625',    
  softOrange: '#faaa68',
  white: '#FFFFFF',
  lightGrey: '#F9FAFB',
  textDark: '#1f2937'
};

// --- ASSETS ---

// Recreated Logo based on the "Pillars" PDF
// EASTER EGG: Logo spins on 5 clicks
const SuperhumanLogo = ({ className = "h-10", godMode, whiteMode = false }) => {
  const [clicks, setClicks] = useState(0);
  const [spin, setSpin] = useState(false);

  const handleClick = () => {
    setClicks(c => c + 1);
    if (clicks + 1 === 5) {
      setSpin(true);
      setTimeout(() => { setSpin(false); setClicks(0); }, 1000);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 ${className} ${spin ? 'animate-spin-fast' : ''} select-none`}
    >
      {/* Icon Representation of the Pillars */}
      <svg viewBox="0 0 100 100" fill="currentColor" className={`h-full w-auto ${whiteMode ? 'text-white' : godMode ? 'text-[#fbbf24]' : 'text-[#142d63]'} transition-colors duration-500`}>
        <path d="M15 90 H85 V82 H15 Z" /> {/* Base */}
        <path d="M22 78 V25 L32 15 V78 Z" /> {/* Pillar 1 */}
        <path d="M38 78 V10 L48 0 V78 Z" />  {/* Pillar 2 (Tallest) */}
        <path d="M54 78 V10 L64 0 V78 Z" />  {/* Pillar 3 (Tallest) */}
        <path d="M70 78 V25 L80 15 V78 Z" /> {/* Pillar 4 */}
      </svg>
      <div className="flex flex-col justify-center h-full">
          <span className={`font-extrabold text-xl leading-none tracking-tight ${whiteMode ? 'text-white' : godMode ? 'text-white' : 'text-[#142d63]'} uppercase font-sans transition-colors duration-500`}>Superhuman</span>
          <span className={`font-bold text-[0.65rem] leading-none tracking-[0.2em] ${whiteMode ? 'text-white' : godMode ? 'text-[#fbbf24]' : 'text-[#f65625]'} uppercase font-sans mt-1 ml-0.5 transition-colors duration-500`}>Framework</span>
      </div>
    </div>
  );
};

// --- COMPONENTS ---

// 1. NAVIGATION COMPONENT
const Navbar = ({ navigate, currentView, godMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 backdrop-blur-md border-b transition-all duration-500 shadow-sm ${godMode ? 'bg-black/90 border-yellow-500/30' : 'bg-white/95 border-gray-100'}`}>
      <ScrollProgress />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('home')}>
            <SuperhumanLogo className="h-14" godMode={godMode} />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => navigate('the-framework')} className={`text-sm font-bold hover:text-[#028393] transition-colors uppercase tracking-wide ${godMode ? 'text-gray-300' : 'text-gray-600'}`}>
              The Framework
            </button>

            {/* Dropdown: Who It's For */}
            <div className="relative group h-full flex items-center">
              <button onClick={() => navigate('who')} className={`text-sm font-bold group-hover:text-[#028393] flex items-center focus:outline-none transition-colors uppercase tracking-wide ${godMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Who It's For <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className={`absolute top-16 left-0 w-64 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left border overflow-hidden z-50 ${godMode ? 'bg-gray-900 border-yellow-500/30' : 'bg-white border-gray-100'}`}>
                <div className="p-2">
                  {['leadership', 'hr', 'marketing', 'sales', 'service', 'personal', 'pastors'].map((item) => (
                    <button
                      key={item}
                      onClick={() => navigate(item)}
                      className={`block w-full text-left px-4 py-3 text-sm font-medium hover:bg-[#f65625]/10 hover:text-[#f65625] rounded-lg capitalize transition-colors ${godMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      {item === 'hr' ? 'HR & People Ops' : item === 'personal' ? 'Individuals' : item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dropdown: Services */}
            <div className="relative group h-full flex items-center">
              <button className={`text-sm font-bold group-hover:text-[#028393] flex items-center focus:outline-none transition-colors uppercase tracking-wide ${godMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className={`absolute top-16 left-0 w-56 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left border overflow-hidden z-50 ${godMode ? 'bg-gray-900 border-yellow-500/30' : 'bg-white border-gray-100'}`}>
                <div className="p-2">
                  {['speaking', 'workshops', 'coaching', 'mastermind'].map((item) => (
                    <button key={item} onClick={() => navigate(item)} className={`block w-full text-left px-4 py-3 text-sm font-medium hover:bg-[#f65625]/10 hover:text-[#f65625] rounded-lg capitalize ${godMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => navigate('founder')} className={`text-sm font-bold hover:text-[#028393] transition-colors uppercase tracking-wide ${godMode ? 'text-gray-300' : 'text-gray-600'}`}>
              The Founder
            </button>
            
            <button 
              onClick={() => navigate('quiz')} 
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 ${godMode ? 'bg-[#fbbf24] text-black hover:bg-white' : 'bg-[#f65625] text-white hover:bg-[#142d63]'}`}
            >
              Take Assessment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`hover:text-[#f65625] focus:outline-none ${godMode ? 'text-white' : 'text-gray-700'}`}>
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-t p-4 h-screen overflow-y-auto pb-32 fixed w-full ${godMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-100'}`}>
          <button onClick={() => { navigate('the-framework'); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-4 text-xl font-bold border-b ${godMode ? 'text-white border-gray-800' : 'text-[#142d63] border-gray-50'}`}>The Framework</button>
          
          <div className={`py-4 border-b ${godMode ? 'border-gray-800' : 'border-gray-50'}`}>
            <button onClick={() => { navigate('who'); setIsMobileMenuOpen(false); }} className="text-sm font-bold text-[#028393] uppercase tracking-wider mb-3 hover:text-[#f65625] transition-colors">Who It's For</button>
            {['leadership', 'hr', 'marketing', 'sales', 'service', 'personal', 'pastors'].map((item) => (
              <button key={item} onClick={() => { navigate(item); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-3 pl-4 font-medium capitalize active:text-[#f65625] ${godMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item === 'hr' ? 'HR & People' : item === 'personal' ? 'Individuals' : item}
              </button>
            ))}
          </div>

          <div className={`py-4 border-b ${godMode ? 'border-gray-800' : 'border-gray-50'}`}>
            <div className="text-sm font-bold text-[#028393] uppercase tracking-wider mb-3">Services</div>
            {['speaking', 'workshops', 'coaching', 'mastermind'].map((item) => (
              <button key={item} onClick={() => { navigate(item); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-3 pl-4 font-medium capitalize active:text-[#f65625] ${godMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item}
              </button>
            ))}
          </div>

          <button onClick={() => { navigate('quiz'); setIsMobileMenuOpen(false); }} className="block w-full text-center mt-8 bg-[#f65625] text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform">
            Take Assessment
          </button>
        </div>
      )}
    </nav>
  );
};

// 2. FOOTER COMPONENT
const Footer = ({ navigate, godMode }) => (
  <footer className={`pt-20 pb-10 relative overflow-hidden text-white ${godMode ? 'bg-black' : 'bg-[#142d63]'}`}>
    {/* Background Pattern */}
    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="mb-6">
             <SuperhumanLogo className="h-12" whiteMode={true} />
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-8">
            The Operating System for high-performance leadership, business, and life. Stop Drifting. Start Designing.
          </p>
          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f65625] transition-colors cursor-pointer hover:scale-110 transform">
                <Linkedin className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f65625] transition-colors cursor-pointer hover:scale-110 transform">
                <Instagram className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f65625] transition-colors cursor-pointer hover:scale-110 transform">
                <Youtube className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-6 text-[#faaa68]">The Framework</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><button onClick={() => navigate('leadership')} className="hover:text-white hover:pl-2 transition-all">For Leaders</button></li>
            <li><button onClick={() => navigate('sales')} className="hover:text-white hover:pl-2 transition-all">For Sales</button></li>
            <li><button onClick={() => navigate('hr')} className="hover:text-white hover:pl-2 transition-all">For HR</button></li>
            <li><button onClick={() => navigate('pastors')} className="hover:text-white hover:pl-2 transition-all">For Pastors</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-[#faaa68]">Services</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><button onClick={() => navigate('speaking')} className="hover:text-white hover:pl-2 transition-all">Keynote Speaking</button></li>
            <li><button onClick={() => navigate('workshops')} className="hover:text-white hover:pl-2 transition-all">Team Workshops</button></li>
            <li><button onClick={() => navigate('coaching')} className="hover:text-white hover:pl-2 transition-all">1:1 Coaching</button></li>
            <li><button onClick={() => navigate('mastermind')} className="hover:text-white hover:pl-2 transition-all">The Mastermind</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-[#faaa68]">Resources</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><button className="hover:text-white hover:pl-2 transition-all">The Podcast</button></li>
            <li><button className="hover:text-white hover:pl-2 transition-all">The Blog</button></li>
            <li><button onClick={() => navigate('contact')} className="hover:text-white hover:pl-2 transition-all">Contact Us</button></li>
            <li><button onClick={() => navigate('quiz')} className="text-white font-bold bg-[#f65625] px-4 py-2 rounded hover:bg-white hover:text-[#142d63] transition-all mt-2 inline-block hover:scale-105 active:scale-95">Take Assessment</button></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
        <p>&copy; 2025 The Superhuman Framework. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-white">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);

// 3. PAGE COMPONENTS

// New Slider Component for HomePage
const TestimonialSlider = () => {
  const testimonials = [
    { quote: "Saved my leadership team from burnout.", author: "Sarah J., CEO" },
    { quote: "Revenue increased by 30% in Q1.", author: "Mike T., VP Sales" },
    { quote: "Finally aligned our culture with our values.", author: "Elena R., HR Director" },
    { quote: "The clarity I needed to scale effectively.", author: "David K., Founder" }
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute -bottom-48 -left-12 z-20 w-80 h-40">
        <div className="relative w-full h-full">
            {testimonials.map((t, i) => (
                <div 
                    key={i}
                    className={`absolute bottom-0 left-0 w-full bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 transition-all duration-700 ease-in-out transform
                        ${i === activeTestimonial ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'}
                    `}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 rounded-full text-green-600"><CheckCircle className="w-5 h-5" /></div>
                        <span className="font-bold text-[#142d63]">Proven Results</span>
                    </div>
                    <p className="text-sm text-gray-600 italic mb-3 leading-relaxed">"{t.quote}"</p>
                    <p className="text-xs text-[#f65625] font-bold uppercase tracking-wide text-right">- {t.author}</p>
                </div>
            ))}
        </div>
        {/* Dots Indicator */}
        <div className="absolute -bottom-8 left-0 w-full flex justify-center gap-2">
             {testimonials.map((_, i) => (
                <div 
                    key={i} 
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === activeTestimonial ? 'bg-[#f65625] w-6' : 'bg-gray-300 w-1.5'}`} 
                />
            ))}
        </div>
    </div>
  );
};

const ParticleBackground = ({ color }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full"
        style={{
          backgroundColor: color,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

const HomePage = ({ navigate, godMode }) => (
  <div className="animate-fade-in overflow-hidden">
    {/* HERO */}
    <section className={`pt-32 pb-24 md:pt-48 md:pb-40 relative overflow-hidden transition-colors duration-700 ${godMode ? 'bg-black text-white' : 'bg-[#142d63] text-white'}`}>
      <ParticleBackground color="#faaa68" />

      {/* Abstract Shapes */}
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none transition-colors duration-700 ${godMode ? 'bg-[#fbbf24]' : 'bg-[#028393]'}`}></div>
      <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-15 translate-y-1/3 -translate-x-1/3 pointer-events-none transition-colors duration-700 ${godMode ? 'bg-[#fbbf24]' : 'bg-[#f65625]'}`}></div>
      <div className="absolute top-1/4 left-1/2 w-24 h-24 bg-[#faaa68] rounded-full blur-[60px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8 text-center lg:text-left">
            <div className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-bold mb-8 backdrop-blur-sm animate-fade-in transition-colors duration-700 ${godMode ? 'bg-yellow-900/30 border-yellow-500/50 text-[#fbbf24]' : 'bg-[#ffffff]/10 border-[#ffffff]/20 text-[#faaa68]'}`}>
              <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${godMode ? 'bg-[#fbbf24]' : 'bg-[#f65625]'}`}></span>
              {godMode ? 'GOD MODE ACTIVATED' : 'New Operating System Available'}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight">
              Stop Drifting.<br />
              Start Designing.<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${godMode ? 'from-[#fbbf24] to-white' : 'from-[#f65625] to-[#faaa68]'}`}>Become Superhuman.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The comprehensive Operating System for high-performance leadership, business, and life. Don't just work harder. Upgrade your internal software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => navigate('quiz')} className={`px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:-translate-y-1 active:scale-95 transition-all ${godMode ? 'bg-[#fbbf24] text-black hover:shadow-[#fbbf24]/40' : 'bg-[#f65625] text-white hover:shadow-[#f65625]/40'}`}>
                Take the Assessment
              </button>
              <button onClick={() => navigate('the-framework')} className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#142d63] transition-all active:scale-95">
                Explore Framework
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="relative z-10 w-full aspect-[4/5] mx-auto max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 flex items-center justify-center overflow-hidden group transform rotate-3 hover:rotate-0 transition-all duration-500">
               {/* George B. Thomas Professional Photo */}
               <img src="/img/ESajPf4o_400x400 (1).jpg" alt="George B. Thomas" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#142d63]/80 to-transparent opacity-60"></div>
               
               <div className="relative text-center p-8 mt-auto">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg border-4 transition-colors duration-700 ${godMode ? 'bg-[#fbbf24] border-white' : 'bg-[#f65625] border-[#142d63]'}`}>
                    {godMode ? <Star className="w-12 h-12" fill="currentColor" /> : <Zap className="w-12 h-12" fill="currentColor" />}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">The Framework</h3>
                  <p className="text-[#faaa68] font-medium text-lg">Founder: George B. Thomas</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* AGITATION */}
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl font-extrabold text-[#142d63] mb-8 tracking-tight">You Are Running a 21st-Century Life on a <span className="text-gray-400 line-through decoration-[#f65625] decoration-4">20th-Century OS</span>.</h2>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Let’s be honest. The old rules don’t work anymore. The "Command and Control" leadership style? <strong>Dead.</strong> The "Always Be Closing" sales tactic? <strong>Ignored.</strong> The "Grind Until You Break" work ethic? <strong>Unsustainable.</strong>
        </p>
        <div className="p-10 bg-[#142d63]/5 rounded-3xl border border-[#142d63]/10 inline-block">
            <p className="text-2xl font-bold text-[#142d63]">
            You don’t need another app. You don’t need another "hack."<br />
            <span className="text-[#f65625]">You need a new Operating System.</span>
            </p>
        </div>
      </div>
    </section>

    {/* ROUTER GRID */}
    <section className="py-32 bg-[#F9FAFB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-[#028393] font-bold uppercase tracking-widest text-sm mb-3 block">The Ecosystem</span>
          <h2 className="text-5xl font-extrabold text-[#142d63] mb-6">Where Do You Need to Be Superhuman?</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">The Framework is universal, but the application is specific. Select your battleground to get your personalized Playbook.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 'leadership', icon: Compass, title: 'For Leaders', sub: 'Manager → Visionary', text: 'Stop putting out fires. Start building a legacy.' },
            { id: 'sales', icon: TrendingUp, title: 'For Sales', sub: 'Pitching → Partnering', text: 'Kill "Commission Breath" and become a Trusted Advisor.' },
            { id: 'marketing', icon: Megaphone, title: 'For Marketing', sub: 'Noise → Guide', text: 'Stop shouting. Start connecting H2H.' },
            { id: 'hr', icon: Heart, title: 'For HR & People', sub: 'Compliance → Culture', text: 'Stop policing policies. Start architecting connection.' },
            { id: 'service', icon: LifeBuoy, title: 'For Service', sub: 'Tickets → Wins', text: 'Move from Human Shield to Success Partner.' },
            { id: 'pastors', icon: BookOpen, title: 'For Pastors', sub: 'Duty → Overflow', text: 'Lead your church without losing your soul.' },
          ].map((card) => (
            <div key={card.id} onClick={() => navigate(card.id)} className="p-10 rounded-3xl bg-white shadow-sm border border-gray-100 hover:shadow-2xl hover:border-[#028393]/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden active:scale-95">
              <div className="absolute top-0 left-0 w-1 h-full bg-gray-100 group-hover:bg-[#028393] transition-colors"></div>
              <div className="w-16 h-16 bg-[#142d63]/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#028393] transition-colors duration-300">
                <card.icon className="w-8 h-8 text-[#142d63] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-[#142d63] mb-3">{card.title}</h3>
              <div className="inline-block bg-[#f65625]/10 rounded px-3 py-1 mb-6">
                <p className="text-xs font-bold text-[#f65625] uppercase tracking-wide">{card.sub}</p>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">{card.text}</p>
              <span className="text-[#142d63] font-bold group-hover:text-[#028393] flex items-center text-sm mt-auto tracking-wide uppercase">
                Explore {card.title.replace('For ', '')} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          ))}
        </div>

        {/* Featured Card */}
        <div onClick={() => navigate('personal')} className="mt-12 p-12 rounded-3xl bg-[#142d63] shadow-2xl hover:shadow-[#142d63]/40 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col md:flex-row items-center justify-between text-center md:text-left relative overflow-hidden active:scale-[0.99]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#028393] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="mb-8 md:mb-0 relative z-10 max-w-2xl">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <User className="text-[#faaa68] w-6 h-6" />
                <span className="text-[#faaa68] font-bold uppercase tracking-widest text-sm">The Universal Foundation</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">For Personal Growth</h3>
            <p className="text-gray-300 text-xl">Win the battle of You vs. You. Stop drifting through life and start designing it.</p>
          </div>
          <span className="relative z-10 bg-[#f65625] text-white px-10 py-5 rounded-full font-bold text-lg shadow-lg group-hover:bg-white group-hover:text-[#f65625] transition-colors">Start Designing Your Life</span>
        </div>
      </div>
    </section>
  </div>
);

// Animation variants for quiz page
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const QuizPage = ({ navigate, setTriggerConfetti }) => {
  // State Management
  const [step, setStep] = useState(0); // 0: Intro, 1: Name, 2: Q1, 3: Q2, 4: Q3, 5: Email, 6: Analysis, 7: Result
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [userPath, setUserPath] = useState(''); // leadership, hr, sales, marketing, service, pastors, personal
  const [q2Answer, setQ2Answer] = useState('');
  const [q3Answer, setQ3Answer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  // Question Database
  const q1Options = [
    { label: 'The Boardroom', sublabel: 'Leading a Team, Business Strategy', path: 'leadership', icon: Compass },
    { label: 'The Culture', sublabel: 'Managing People, HR, Benefits', path: 'hr', icon: Heart },
    { label: 'The Arena', sublabel: 'Closing Deals, Quotas, Revenue', path: 'sales', icon: TrendingUp },
    { label: 'The Noise', sublabel: 'Getting Attention, Content, Brand', path: 'marketing', icon: Megaphone },
    { label: 'The Frontlines', sublabel: 'Customer Support, Tickets, Retention', path: 'service', icon: LifeBuoy },
    { label: 'The Pulpit', sublabel: 'Leading a Church, Ministry, Non-Profit', path: 'pastors', icon: BookOpen },
    { label: 'The Mirror', sublabel: 'My own habits, mindset, and potential', path: 'personal', icon: User },
  ];

  const q2Questions = {
    leadership: {
      title: 'What is the heaviest weight in your backpack right now?',
      options: [
        { id: 'a', text: 'Feeling isolated at the top (Loneliness)' },
        { id: 'b', text: 'Constant firefighting and reactivity (Chaos)' },
        { id: 'c', text: 'Imposter syndrome—"Do I actually know what I\'m doing?" (Insecurity)' },
      ]
    },
    hr: {
      title: 'What frustrates you most about your role?',
      options: [
        { id: 'a', text: 'Being viewed as the "Fun Police" or compliance officer' },
        { id: 'b', text: 'Being stuck between Executive demands and Employee complaints' },
        { id: 'c', text: 'Spending all day on paperwork instead of people' },
      ]
    },
    sales: {
      title: 'What is the hardest part of your month?',
      options: [
        { id: 'a', text: 'The "Grind"—hearing "No" 50 times a day' },
        { id: 'b', text: '"Commission Breath"—feeling pushy or desperate to hit quota' },
        { id: 'c', text: 'Losing deals to competitors who have a worse product' },
      ]
    },
    marketing: {
      title: 'Why does your marketing feel broken?',
      options: [
        { id: 'a', text: 'We are shouting into the void (Low Engagement)' },
        { id: 'b', text: 'We sound like everyone else (Robotic/Corporate Speak)' },
        { id: 'c', text: 'I\'m burnt out trying to feed the content algorithm beast' },
      ]
    },
    service: {
      title: 'What drains your battery the fastest?',
      options: [
        { id: 'a', text: 'Being a "Human Shield" for angry customers' },
        { id: 'b', text: 'The monotony of closing ticket after ticket' },
        { id: 'c', text: 'Feeling like a cost center, not a value creator' },
      ]
    },
    pastors: {
      title: 'What is the secret struggle you don\'t tell the board?',
      options: [
        { id: 'a', text: 'I am spiritually dry while pouring out for everyone else' },
        { id: 'b', text: 'I feel more like a CEO running a business than a Shepherd' },
        { id: 'c', text: 'The pressure of the "Fishbowl"—I have no safe place to be human' },
      ]
    },
    personal: {
      title: 'What is stopping you from your potential?',
      options: [
        { id: 'a', text: '"Drifting"—I feel like I\'m on autopilot' },
        { id: 'b', text: '"The Inner Critic"—I talk myself out of greatness' },
        { id: 'c', text: '"Burnout"—I have ambition but no energy' },
      ]
    },
  };

  const q3Questions = {
    leadership: {
      title: 'If you could wave a magic wand, what would change tomorrow?',
      options: [
        { id: 'a', text: 'My team would run through walls for the vision' },
        { id: 'b', text: 'I would have time to actually think and strategize' },
        { id: 'c', text: 'I would sleep better at night knowing the ship is steady' },
      ]
    },
    hr: {
      title: 'How do you want to be seen by the company?',
      options: [
        { id: 'a', text: 'As a strategic partner who drives growth' },
        { id: 'b', text: 'As the "Heart" of the culture where people feel safe' },
        { id: 'c', text: 'As a coach who unlocks human potential' },
      ]
    },
    sales: {
      title: 'What does the perfect sales career look like to you?',
      options: [
        { id: 'a', text: 'Deals close themselves because prospects trust me implicitly' },
        { id: 'b', text: 'I hit my number without working 60 hours a week' },
        { id: 'c', text: 'I am viewed as a Trusted Advisor, not a vendor' },
      ]
    },
    marketing: {
      title: 'What is the holy grail for your brand?',
      options: [
        { id: 'a', text: 'Building a tribe of raving fans, not just "leads"' },
        { id: 'b', text: 'Creating content that actually helps people (H2H)' },
        { id: 'c', text: 'Stopping the "hack" game and building real authority' },
      ]
    },
    service: {
      title: 'What would make you love your job again?',
      options: [
        { id: 'a', text: 'Being empowered to solve problems, not just read scripts' },
        { id: 'b', text: 'Turning angry users into happy evangelists' },
        { id: 'c', text: 'Being recognized as a revenue engine for the company' },
      ]
    },
    pastors: {
      title: 'What does a healthy ministry look like?',
      options: [
        { id: 'a', text: 'Leading from overflow, not obligation' },
        { id: 'b', text: 'A church culture that disciples itself' },
        { id: 'c', text: 'Finishing the race with my soul and family intact' },
      ]
    },
    personal: {
      title: 'What is the ultimate win?',
      options: [
        { id: 'a', text: 'Waking up every day with clear Purpose and Passion' },
        { id: 'b', text: 'Designing a life that fits me, not society\'s script' },
        { id: 'c', text: 'Winning the battle of You vs. You' },
      ]
    },
  };

  const results = {
    leadership: {
      archetype: 'The Visionary Leader',
      trapped: 'Trapped in Manager Mode',
      subhead: 'It\'s time to stop managing tasks and start leading a mission.',
      playbook: 'The Superhuman Leadership Playbook',
      icon: Compass,
      color: '#142d63'
    },
    hr: {
      archetype: 'The Culture Architect',
      trapped: 'Trapped in Compliance Mode',
      subhead: 'Stop policing policies. Start architecting connection.',
      playbook: 'The Superhuman HR Playbook',
      icon: Heart,
      color: '#f65625'
    },
    sales: {
      archetype: 'The Trusted Advisor',
      trapped: 'Trapped in Transaction Mode',
      subhead: 'Kill commission breath. Stop pitching and start partnering.',
      playbook: 'The Superhuman Sales Playbook',
      icon: TrendingUp,
      color: '#028393'
    },
    marketing: {
      archetype: 'The Storyteller',
      trapped: 'Trapped in the Noise',
      subhead: 'Stop shouting at strangers. Start connecting with humans.',
      playbook: 'The Superhuman Marketing Playbook',
      icon: Megaphone,
      color: '#faaa68'
    },
    service: {
      archetype: 'The Success Partner',
      trapped: 'Trapped in Ticket Mode',
      subhead: 'Stop being a human shield. Start creating wins.',
      playbook: 'The Superhuman Service Playbook',
      icon: LifeBuoy,
      color: '#028393'
    },
    pastors: {
      archetype: 'The Shepherd',
      trapped: 'Trapped in CEO Mode',
      subhead: 'Lead from overflow, not obligation. Save your soul.',
      playbook: 'The Superhuman Pastor Playbook',
      icon: BookOpen,
      color: '#142d63'
    },
    personal: {
      archetype: 'The Life Designer',
      trapped: 'Trapped in the Drift',
      subhead: 'Stop waiting for "Someday." Win the battle of You vs. You.',
      playbook: 'The Superhuman Personal Growth Playbook',
      icon: User,
      color: '#f65625'
    },
  };

  // Handlers
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (firstName.trim()) setStep(2);
  };

  const handleQ1Answer = (path) => {
    setUserPath(path);
    setStep(3);
  };

  const handleQ2Answer = (answer) => {
    setQ2Answer(answer);
    setStep(4);
  };

  const handleQ3Answer = (answer) => {
    setQ3Answer(answer);
    setStep(5); // Go to email capture
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !consent) return;

    setIsSubmitting(true);
    setSubmissionError('');

    const submissionData = {
      fields: [
        {
          name: 'firstname',
          value: firstName || 'Friend'
        },
        {
          name: 'lastname',
          value: lastName || ''
        },
        {
          name: 'email',
          value: email
        },
        {
          name: 'archetype',
          value: results[userPath].archetype
        },
        {
          name: 'battlefield',
          value: userPath
        },
        {
          name: 'pain_point',
          value: q2Questions[userPath].options.find(opt => opt.id === q2Answer)?.text || ''
        },
        {
          name: 'aspiration',
          value: q3Questions[userPath].options.find(opt => opt.id === q3Answer)?.text || ''
        }
      ],
      context: {
        pageUri: window.location.href,
        pageName: 'Superhuman Archetype Assessment'
      }
    };

    // Log what we're sending
    console.log('📤 Submitting to HubSpot:', submissionData);

    try {
      // Submit to HubSpot Forms API
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/474711/edf2f3d0-1615-4019-aac1-748896643905`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        }
      );

      const responseData = await response.json();
      console.log('📥 HubSpot response:', responseData);

      if (!response.ok) {
        console.error('❌ HubSpot error:', responseData);
        throw new Error(responseData.message || 'Submission failed');
      }

      console.log('✅ Successfully submitted to HubSpot!');
      // Success - proceed to analysis
      setStep(6);
      setTimeout(() => setStep(7), 2500); // Then to results
    } catch (error) {
      console.error('❌ HubSpot submission error:', error);
      setSubmissionError('Something went wrong. But don\'t worry - you can still see your results!');
      // Still proceed even if submission fails
      setStep(6);
      setTimeout(() => setStep(7), 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipEmail = () => {
    // Skip email and go straight to analysis
    setStep(6);
    setTimeout(() => setStep(7), 2500);
  };

  const handleDownload = () => {
    setTriggerConfetti(true);
    setTimeout(() => {
      navigate(userPath);
      setTriggerConfetti(false);
    }, 1000);
  };

  // Calculate progress
  const getProgress = () => {
    if (step === 1) return 15;
    if (step === 2) return 30;
    if (step === 3) return 50;
    if (step === 4) return 70;
    if (step === 5) return 85;
    if (step === 6 || step === 7) return 100;
    return 0;
  };

  const getProgressMessage = () => {
    if (step === 1) return "Let's get to know you";
    if (step === 2) return "Identifying your battlefield";
    if (step === 3) return "Understanding your challenge";
    if (step === 4) return "Defining your vision";
    if (step === 5) return "Almost done!";
    return "";
  };

  const currentResult = results[userPath];

  return (
    <div className="bg-white">
      {/* STEP 0: INTRO - Full width hero */}
      {step === 0 && (
        <div className="animate-fade-in">
          {/* Hero Section - Full Width */}
          <section className="bg-[#142d63] text-white py-32 md:py-48 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#028393] rounded-full blur-[150px] opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f65625] rounded-full blur-[120px] opacity-15"></div>
              <ParticleBackground color="#faaa68" />

              {/* Breathing Wave Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-full"
                    style={{
                      background: `radial-gradient(ellipse at ${20 + i * 20}% ${30 + i * 15}%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="max-w-5xl mx-auto px-4 relative z-10"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div
                  variants={fadeInUp}
                  className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold backdrop-blur-sm"
                >
                  <span className="text-[#faaa68] flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Discover Your Superhuman Archetype
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
                >
                  What is Your<br />Superhuman Archetype?
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-bold"
                >
                  You are fighting a battle every day.<br />But <span className="text-[#faaa68]">which one</span>?
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                  Discover your unique leadership archetype and get a personalized playbook with the exact strategies, scripts, and habits you need to win.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col items-center gap-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(1)}
                    className="bg-[#f65625] text-white px-16 py-6 rounded-full text-2xl font-bold shadow-xl hover:bg-white hover:text-[#f65625] transition-colors flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-7 h-7" />
                    Start Your Assessment
                    <ArrowRight className="w-7 h-7" />
                  </motion.button>

                  <div className="flex items-center justify-center gap-8 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#faaa68]" />
                      <span>90 seconds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#faaa68]" />
                      <span>No email to start</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#faaa68]" />
                      <span>Free playbook</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </section>

            <div className="max-w-5xl mx-auto px-4">

            {/* What You'll Discover */}
            <div className="bg-gradient-to-br from-[#142d63] to-[#028393] rounded-3xl p-12 mb-16 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What You'll Discover</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Compass className="w-8 h-8 text-[#faaa68]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Your Archetype</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Which of 7 archetypes you are and what makes you unique
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-[#faaa68]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Your Battlefield</h3>
                  <p className="text-gray-200 leading-relaxed">
                    The primary challenge you're facing right now
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-[#faaa68]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Your Playbook</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Personalized strategies to upgrade your "operating system"
                  </p>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#142d63] mb-12 text-center">How It Works</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-6 bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-[#f65625] transition-all">
                  <div className="w-12 h-12 bg-[#f65625] rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[#142d63] mb-2">Identify Your Battlefield</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Choose which arena you're fighting in: Leadership, Sales, Marketing, HR, Service, Ministry, or Personal Growth.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-[#f65625] transition-all">
                  <div className="w-12 h-12 bg-[#028393] rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[#142d63] mb-2">Answer 2 Quick Questions</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Tell us what's draining you and what you want most. Be honest—this helps us personalize your results.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-[#f65625] transition-all">
                  <div className="w-12 h-12 bg-[#faaa68] rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[#142d63] mb-2">Get Your Custom Playbook</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Receive your archetype and a personalized playbook with strategies, scripts, and habits for Superhuman performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center bg-[#F9FAFB] rounded-3xl p-12 border-2 border-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold text-[#142d63] mb-4">Ready to Find Your Archetype?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Stop drifting. Start designing. Discover which superpowers you need to win your battle.
              </p>
              <button
                onClick={() => setStep(1)}
                className="bg-[#f65625] text-white px-16 py-6 rounded-full text-2xl font-bold shadow-2xl hover:bg-[#142d63] hover:scale-105 transition-all active:scale-95 inline-flex items-center gap-3"
              >
                <Sparkles className="w-7 h-7" />
                Begin Assessment
                <ArrowRight className="w-7 h-7" />
              </button>
              <p className="mt-6 text-sm text-gray-500 font-medium">
                Join thousands who have discovered their Superhuman archetype
              </p>
            </div>
            </div>
          </div>
        )}

      {/* STEPS 1-7: Constrained layout with background blobs */}
      {step > 0 && (
        <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white relative overflow-hidden py-20">
          {/* Background blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#faaa68]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#028393]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

          <div className="w-full max-w-4xl px-6 relative z-10">
            {/* PROGRESS BAR */}
            {step > 0 && step < 7 && (
              <div className="mb-12">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">{getProgressMessage()}</span>
                  <span className="text-sm font-bold text-[#f65625]">{getProgress()}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#f65625] to-[#faaa68] transition-all duration-500 ease-out"
                    style={{width: `${getProgress()}%`}}
                  ></div>
                </div>
              </div>
            )}

            {/* STEP 1: NAME */}
            {step === 1 && (
              <div className="animate-fade-in">
            <button onClick={() => setStep(0)} className="flex items-center text-gray-400 hover:text-[#142d63] mb-12 transition-colors font-bold uppercase tracking-wide text-sm"><ArrowLeft className="w-4 h-4 mr-2"/> Back</button>
            <h2 className="text-4xl font-bold text-[#142d63] mb-4">Let's get started.</h2>
            <p className="text-gray-500 mb-12 text-xl">First things first, what should we call you?</p>
            <form onSubmit={handleNameSubmit} className="space-y-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Type your first name..."
                      className="w-full text-3xl font-bold border-b-4 border-gray-100 py-4 focus:outline-none focus:border-[#f65625] text-[#142d63] placeholder-gray-300 transition-colors bg-transparent"
                      autoFocus
                      required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Type your last name..."
                      className="w-full text-3xl font-bold border-b-4 border-gray-100 py-4 focus:outline-none focus:border-[#f65625] text-[#142d63] placeholder-gray-300 transition-colors bg-transparent"
                  />
                </div>
                <div className="mt-16 flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => {setFirstName('Friend'); setLastName(''); setStep(2);}}
                        className="text-gray-400 hover:text-[#142d63] text-sm font-bold uppercase tracking-wide transition-colors"
                    >
                        Skip for now
                    </button>
                    <button
                        type="submit"
                        disabled={!firstName.trim()}
                        className="bg-[#142d63] text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-[#f65625] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center shadow-lg active:scale-95"
                    >
                        Next Step <ArrowRight className="ml-2 w-6 h-6" />
                    </button>
                </div>
            </form>
          </div>
        )}

        {/* STEP 2: QUESTION 1 (THE ROUTER) */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-12">
                <button onClick={() => setStep(1)} className="flex items-center text-gray-400 hover:text-[#142d63] transition-colors font-bold uppercase tracking-wide text-sm"><ArrowLeft className="w-4 h-4 mr-2"/> Back</button>
                <span className="text-[#028393] font-bold uppercase text-sm tracking-widest bg-[#028393]/10 px-4 py-2 rounded-full">Hi, {firstName} 👋</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#142d63] mb-4 leading-snug">
              When you wake up on Monday morning, what is the primary battlefield you are stepping into?
            </h2>
            <p className="text-lg text-gray-500 mb-4">Choose the one that resonates most with your daily reality:</p>
            <div className="bg-blue-50 border-l-4 border-[#028393] p-4 mb-12 rounded-r-lg">
                <p className="text-sm text-gray-600">
                    <strong className="text-[#028393]">💡 Pro tip:</strong> Go with your gut. Your first instinct is usually the most honest answer.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q1Options.map((opt) => (
                <button
                    key={opt.path}
                    onClick={() => handleQ1Answer(opt.path)}
                    className="w-full p-6 border-2 border-gray-100 rounded-2xl hover:border-[#f65625] hover:bg-[#f65625]/5 group text-left transition-all flex items-start gap-4 active:scale-[0.98]"
                >
                  <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center group-hover:bg-[#f65625] transition-colors shrink-0 text-[#142d63] group-hover:text-white">
                    <opt.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 mt-1">
                    <div className="text-lg font-bold text-gray-800 group-hover:text-[#142d63] mb-1">{opt.label}</div>
                    <div className="text-sm text-gray-500">{opt.sublabel}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: QUESTION 2 (THE AGITATOR) */}
        {step === 3 && userPath && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-12">
                <button onClick={() => setStep(2)} className="flex items-center text-gray-400 hover:text-[#142d63] transition-colors font-bold uppercase tracking-wide text-sm"><ArrowLeft className="w-4 h-4 mr-2"/> Back</button>
                <span className="text-[#028393] font-bold uppercase text-sm tracking-widest bg-[#028393]/10 px-4 py-2 rounded-full">Question 2 of 3</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#142d63] mb-4 leading-snug">
              {q2Questions[userPath].title}
            </h2>
            <p className="text-lg text-gray-500 mb-12">Be honest—this helps us personalize your playbook:</p>

            <div className="space-y-4">
              {q2Questions[userPath].options.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => handleQ2Answer(opt.id)}
                    className="w-full p-8 border-2 border-gray-100 rounded-2xl hover:border-[#f65625] hover:bg-[#f65625]/5 text-left transition-all group active:scale-[0.98]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#f65625] flex items-center justify-center shrink-0 mt-1 transition-colors">
                      <span className="text-sm font-bold text-gray-600 group-hover:text-white transition-colors">{opt.id.toUpperCase()}</span>
                    </div>
                    <span className="text-xl font-medium text-gray-700 group-hover:text-[#142d63] flex-1">{opt.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: QUESTION 3 (THE ASPIRATOR) */}
        {step === 4 && userPath && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-12">
                <button onClick={() => setStep(3)} className="flex items-center text-gray-400 hover:text-[#142d63] transition-colors font-bold uppercase tracking-wide text-sm"><ArrowLeft className="w-4 h-4 mr-2"/> Back</button>
                <span className="text-[#028393] font-bold uppercase text-sm tracking-widest bg-[#028393]/10 px-4 py-2 rounded-full">Final Question ✨</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#142d63] mb-4 leading-snug">
              {q3Questions[userPath].title}
            </h2>
            <p className="text-lg text-gray-500 mb-12">Dream big—what would success actually look like?</p>

            <div className="space-y-4">
              {q3Questions[userPath].options.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => handleQ3Answer(opt.id)}
                    className="w-full p-8 border-2 border-gray-100 rounded-2xl hover:border-[#f65625] hover:bg-[#f65625]/5 text-left transition-all group active:scale-[0.98]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#f65625] flex items-center justify-center shrink-0 mt-1 transition-colors">
                      <span className="text-sm font-bold text-gray-600 group-hover:text-white transition-colors">{opt.id.toUpperCase()}</span>
                    </div>
                    <span className="text-xl font-medium text-gray-700 group-hover:text-[#142d63] flex-1">{opt.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: EMAIL CAPTURE */}
        {step === 5 && userPath && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-12">
                <button onClick={() => setStep(4)} className="flex items-center text-gray-400 hover:text-[#142d63] transition-colors font-bold uppercase tracking-wide text-sm"><ArrowLeft className="w-4 h-4 mr-2"/> Back</button>
                <span className="text-[#028393] font-bold uppercase text-sm tracking-widest bg-[#028393]/10 px-4 py-2 rounded-full">One Last Step 🎯</span>
            </div>

            <div className="text-center mb-8">
              <div className="inline-block p-6 bg-gradient-to-br from-[#f65625] to-[#faaa68] rounded-3xl mb-6">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#142d63] mb-4 leading-snug">
                Get Your Personalized Playbook
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Enter your email to receive your <strong className="text-[#f65625]">{results[userPath].playbook}</strong> instantly.
              </p>
            </div>

            {/* Why We Need This */}
            <div className="bg-blue-50 border-l-4 border-[#028393] p-6 rounded-r-lg mb-8">
              <h3 className="font-bold text-[#028393] mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Why we ask for your email:
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#028393] mt-0.5 shrink-0" />
                  <span>To send you your personalized playbook PDF immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#028393] mt-0.5 shrink-0" />
                  <span>To provide additional resources specific to your archetype</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#028393] mt-0.5 shrink-0" />
                  <span>No spam, ever. Just valuable insights for your journey.</span>
                </li>
              </ul>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full text-xl px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#f65625] transition-colors bg-white"
                  disabled={isSubmitting}
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-1 w-5 h-5 text-[#f65625] border-gray-300 rounded focus:ring-[#f65625]"
                  disabled={isSubmitting}
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  I agree to receive my personalized playbook and occasional emails with valuable insights. I can unsubscribe anytime.
                </label>
              </div>

              {/* Error Message */}
              {submissionError && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <p className="text-sm text-yellow-700">{submissionError}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!email.trim() || !consent || isSubmitting}
                className="w-full bg-[#f65625] text-white px-12 py-5 rounded-full font-bold text-xl shadow-xl hover:bg-[#142d63] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Get My Results
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>

              {/* Skip Option */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSkipEmail}
                  className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  Skip for now (you won't receive the playbook)
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 6: ANALYZING */}
        {step === 6 && (
          <div className="flex flex-col items-center justify-center animate-fade-in text-center py-20">
            <div className="relative mb-12">
                <div className="w-32 h-32 border-8 border-gray-100 rounded-full"></div>
                <div className="w-32 h-32 border-8 border-[#f65625] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <h2 className="text-4xl font-bold text-[#142d63] mb-4">Analyzing your archetype...</h2>
            <p className="text-xl text-gray-500 mb-8">Building your custom Superhuman roadmap, {firstName}.</p>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="w-4 h-4 text-[#028393]" />
                    <span>Identifying your battlefield</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="w-4 h-4 text-[#028393]" />
                    <span>Mapping your challenges</span>
                </div>
                <div className="flex items-center gap-2 justify-center animate-pulse">
                    <div className="w-4 h-4 rounded-full border-2 border-[#f65625] border-t-transparent animate-spin"></div>
                    <span className="text-[#f65625] font-medium">Personalizing your playbook</span>
                </div>
            </div>
          </div>
        )}

        {/* STEP 7: RESULT */}
        {step === 7 && currentResult && (
          <div className="animate-fade-in">
            {/* Result Hero Section - Full Width */}
            <section className="bg-[#142d63] text-white py-32 md:py-40 text-center relative overflow-hidden mb-16">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#028393] rounded-full blur-[150px] opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f65625] rounded-full blur-[120px] opacity-15"></div>
              <ParticleBackground color="#faaa68" />

              {/* Breathing Wave Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-full"
                    style={{
                      background: `radial-gradient(ellipse at ${20 + i * 20}% ${30 + i * 15}%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="max-w-5xl mx-auto px-4 relative z-10"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div
                  variants={fadeInUp}
                  className="inline-block p-8 bg-white/10 backdrop-blur-sm rounded-3xl mb-8 relative border border-white/20"
                >
                  <currentResult.icon className="w-20 h-20 text-[#faaa68]" />
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="inline-block bg-[#faaa68]/20 px-6 py-2 rounded-full mb-6 backdrop-blur-sm border border-[#faaa68]/30"
                >
                  <span className="text-[#faaa68] font-bold text-sm uppercase tracking-widest">Your Archetype</span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
                >
                  {currentResult.archetype}
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-2xl md:text-3xl text-gray-300 mb-6 font-medium"
                >
                  ({currentResult.trapped})
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
                >
                  {currentResult.subhead}
                </motion.p>
              </motion.div>
            </section>

            <div className="max-w-4xl mx-auto px-6">

            <div className="bg-gradient-to-br from-[#142d63] to-[#028393] rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 mx-auto mb-6 text-[#faaa68]" />
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">The Fix:</h2>
                <p className="text-2xl md:text-3xl font-bold mb-8 text-[#faaa68]">{currentResult.playbook}</p>
                <p className="text-lg mb-10 text-gray-200 max-w-2xl mx-auto">
                  We've compiled the exact strategies, scripts, and habits for Superhuman {currentResult.archetype}s into a comprehensive PDF guide.
                </p>
                <button
                  onClick={handleDownload}
                  className="bg-[#f65625] text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:bg-white hover:text-[#f65625] transition-all active:scale-95 inline-flex items-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  Download Your Playbook
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* What Happens Next Section */}
            <div className="mt-12 bg-white border-2 border-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#142d63] mb-6 text-center">What Happens Next?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#028393]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-[#028393]">1</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Download Your Playbook</h4>
                  <p className="text-sm text-gray-600">Get instant access to your personalized framework</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#f65625]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-[#f65625]">2</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Explore the Framework</h4>
                  <p className="text-sm text-gray-600">Dive deeper into your specific vertical</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#faaa68]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-[#faaa68]">3</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Take Action Today</h4>
                  <p className="text-sm text-gray-600">Start implementing the first habit immediately</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {setStep(0); setUserPath(''); setFirstName(''); setLastName(''); setEmail(''); setConsent(false); setQ2Answer(''); setQ3Answer(''); setSubmissionError('');}}
                className="text-gray-400 hover:text-[#142d63] font-bold text-sm uppercase tracking-wide transition-colors"
              >
                Take Assessment Again
              </button>
            </div>
            </div>
          </div>
        )}
          </div>
        </div>
      )}
    </div>
  );
};

// REUSABLE VERTICAL PAGE COMPONENT (Updated Design)
const VerticalPage = ({ title, sub, problemTitle, problemText, shiftFrom, shiftTo, playbookName }) => (
  <div className="animate-fade-in">
    <header className="bg-[#142d63] text-white py-32 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="inline-block mb-6">
                <SuperhumanLogo className="h-12 text-white opacity-80" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">{title}</h1>
            <p className="text-2xl text-[#faaa68] font-bold uppercase tracking-wide">{sub}</p>
        </div>
    </header>
    
    <section className="py-24 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
            <h2 className="text-4xl font-bold text-[#142d63] mb-8">{problemTitle}</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">{problemText}</p>
            
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-3 h-full bg-[#f65625]"></div>
                <h3 className="text-2xl font-bold text-[#142d63] mb-8 flex items-center">
                    <Zap className="w-8 h-8 text-[#f65625] mr-3" fill="currentColor" /> 
                    The Transformation
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-between text-xl gap-4">
                    <div className="bg-gray-100 px-6 py-3 rounded-lg text-gray-500 font-medium line-through decoration-red-500">{shiftFrom}</div>
                    <ArrowRight className="text-[#028393] w-8 h-8 hidden md:block" />
                    <ArrowDown className="text-[#028393] w-8 h-8 md:hidden" /> {/* Using ArrowDown for mobile stack */}
                    <div className="bg-[#142d63]/5 px-6 py-3 rounded-lg text-[#142d63] font-bold shadow-sm">{shiftTo}</div>
                </div>
            </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-[#F9FAFB] text-center">
      <div className="max-w-3xl mx-auto px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-8 text-[#028393]">
            <BookOpen className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-extrabold text-[#142d63] mb-6">Get the Playbook</h2>
        <p className="mb-12 text-xl text-gray-600 leading-relaxed">We've compiled the exact strategies, scripts, and habits for {title.replace('Superhuman ', '')} into a comprehensive guide.</p>
        <button className="bg-[#f65625] text-white px-12 py-5 rounded-full font-bold text-xl shadow-xl hover:bg-[#142d63] transition-all hover:-translate-y-1 active:scale-95">
            Download {playbookName} Playbook
        </button>
      </div>
    </section>
  </div>
);

// ... (ServicesPage - Using same updated styling logic) ...
// Note: FrameworkPage is now in src/pages/FrameworkPage.jsx

const ServicesPage = ({ title, sub, content }) => (
    <div className="animate-fade-in">
      <header className="bg-[#142d63] text-white py-32 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-extrabold mb-8">{title}</h1>
          <p className="text-2xl text-[#faaa68] font-medium">{sub}</p>
        </div>
      </header>
      <section className="py-24 max-w-7xl mx-auto px-4">
        {content}
      </section>
    </div>
  );

// 4. MAIN APP COMPONENT (ROUTER LOGIC)
const App = () => {
  // Initialize view from URL path
  const getInitialView = () => {
    const path = window.location.pathname.slice(1) || 'home';
    return path === '' ? 'home' : path;
  };

  const [view, setView] = useState(getInitialView);
  const [showConfetti, setShowConfetti] = useState(false);
  const godMode = useKonamiCode(); // Triggered by hooks

  // Navigate function that updates both state and URL
  const navigate = (newView) => {
    setView(newView);
    const path = newView === 'home' ? '/' : `/${newView}`;
    window.history.pushState({}, '', path);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || 'home';
      setView(path === '' ? 'home' : path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'home': return <HomePage navigate={navigate} godMode={godMode} />;
      case 'the-framework': return <FrameworkPage navigate={navigate} />;
      case 'who': return <WhoPage navigate={navigate} />;
      case 'founder': return <FounderPage navigate={navigate} />;
      case 'quiz': return <QuizPage navigate={navigate} setTriggerConfetti={setShowConfetti} />;

      // Verticals
      case 'leadership': return <LeadershipPage navigate={navigate} />;
      case 'sales': return <SalesPage navigate={navigate} />;
      case 'marketing': return <MarketingPage navigate={navigate} />;
      case 'hr': return <HRPage navigate={navigate} />;
      case 'service': return <ServicePage navigate={navigate} />;
      case 'pastors': return <PastorsPage navigate={navigate} />;
      case 'personal': return <PersonalPage navigate={navigate} />;

      // Services
      case 'speaking': return <SpeakerPage navigate={navigate} />;
      case 'speaker': return <SpeakerPage navigate={navigate} />;
      case 'workshops': return <WorkshopsPage navigate={navigate} />;
      case 'coaching': return <CoachingPage navigate={navigate} />;
      case 'mastermind': return <MastermindPage navigate={navigate} />;
      case 'contact': return <ServicesPage 
          title="Contact"
          sub="Let's Connect. Human to Human."
          content={
            <div className="max-w-4xl mx-auto grid gap-8">
                <button onClick={() => navigate('speaking')} className="p-10 border-2 border-gray-100 rounded-3xl hover:border-[#f65625] hover:bg-[#f65625]/5 text-left bg-white transition-all group active:scale-[0.99]">
                    <h3 className="font-bold text-2xl text-[#142d63] mb-2">I want to hire George to Speak</h3>
                    <p className="text-gray-500 group-hover:text-[#f65625] text-lg">For conferences, events, and retreats.</p>
                </button>
                 <button onClick={() => navigate('coaching')} className="p-10 border-2 border-gray-100 rounded-3xl hover:border-[#f65625] hover:bg-[#f65625]/5 text-left bg-white transition-all group active:scale-[0.99]">
                    <h3 className="font-bold text-2xl text-[#142d63] mb-2">I am interested in Coaching</h3>
                    <p className="text-gray-500 group-hover:text-[#f65625] text-lg">1:1 Mentorship and guidance.</p>
                </button>
                 <div className="p-12 border border-gray-100 rounded-3xl bg-white shadow-xl mt-8">
                    <h3 className="font-bold text-3xl text-[#142d63] mb-8">General Inquiry</h3>
                     <input type="text" placeholder="Name" className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl mb-6 focus:outline-none focus:border-[#f65625] text-lg" />
                     <textarea placeholder="Message" className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl mb-8 h-48 focus:outline-none focus:border-[#f65625] text-lg"></textarea>
                     <button className="bg-[#142d63] text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#f65625] transition-colors active:scale-95">Send Message</button>
                </div>
            </div>
          }
      />;
      case 'about': return <ServicesPage 
        title="The Founder"
        sub="Speaker. Catalyst. Guide."
        content={
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
                <div className="aspect-[4/5] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                    {/* George B. Thomas Professional Photo */}
                    <img
                      src="/img/ESajPf4o_400x400 (1).jpg"
                      onError={(e) => {e.target.onerror = null; e.target.src="/img/ESajPf4o_400x400 (1).jpg"}}
                      alt="George B. Thomas"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </div>
            <div className="flex-1 text-xl text-gray-600 leading-relaxed">
                <h3 className="text-4xl font-bold text-[#142d63] mb-8">From HubSpot to Human.</h3>
                <p className="mb-8">You might know me as "The HubSpot Guy." But after training thousands of companies, I realized we had great tools but broken humans.</p>
                <p className="mb-8">I saw leaders burning out, sales teams losing their souls, and cultures crumbling under the weight of "metrics."</p>
                <p className="mb-10">I created the Superhuman Framework because I needed it. I needed a way to balance the hungry hustle of success with the need for a happy home. Now, I give that operating system to you.</p>
                <div className="flex gap-6">
                    <button onClick={() => navigate('speaking')} className="text-[#f65625] font-bold hover:underline text-lg">View Speaking</button>
                    <button onClick={() => navigate('the-framework')} className="text-[#142d63] font-bold hover:underline text-lg">Read the Framework</button>
                </div>
            </div>
          </div>
        }
      />;
      
      default: return <HomePage navigate={navigate} godMode={godMode} />;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen font-sans transition-colors duration-500 ${godMode ? 'text-gray-200 bg-gray-900 selection:bg-[#fbbf24] selection:text-black' : 'text-[#1f2937] bg-white selection:bg-[#f65625] selection:text-white'}`}>
      <Confetti isActive={showConfetti} />
      <Navbar navigate={navigate} currentView={view} godMode={godMode} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer navigate={navigate} godMode={godMode} />
      <ContactSlideOut />
    </div>
  );
};

export default App;
