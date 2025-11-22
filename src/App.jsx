import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, TrendingUp, Megaphone, Heart, LifeBuoy, BookOpen, 
  Menu, X, ChevronDown, ArrowRight, Linkedin, Instagram, Youtube,
  CheckCircle, User, Target, Zap, Shield, Star, ArrowLeft, ArrowDown, Sparkles
} from 'lucide-react';

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
const SuperhumanLogo = ({ className = "h-10", godMode }) => {
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
      <svg viewBox="0 0 100 100" fill="currentColor" className={`h-full w-auto ${godMode ? 'text-[#fbbf24]' : 'text-[#142d63]'} transition-colors duration-500`}>
        <path d="M15 90 H85 V82 H15 Z" /> {/* Base */}
        <path d="M22 78 V25 L32 15 V78 Z" /> {/* Pillar 1 */}
        <path d="M38 78 V10 L48 0 V78 Z" />  {/* Pillar 2 (Tallest) */}
        <path d="M54 78 V10 L64 0 V78 Z" />  {/* Pillar 3 (Tallest) */}
        <path d="M70 78 V25 L80 15 V78 Z" /> {/* Pillar 4 */}
      </svg>
      <div className="flex flex-col justify-center h-full">
          <span className={`font-extrabold text-xl leading-none tracking-tight ${godMode ? 'text-white' : 'text-[#142d63]'} uppercase font-sans transition-colors duration-500`}>Superhuman</span>
          <span className={`font-bold text-[0.65rem] leading-none tracking-[0.2em] ${godMode ? 'text-[#fbbf24]' : 'text-[#f65625]'} uppercase font-sans mt-1 ml-0.5 transition-colors duration-500`}>Framework</span>
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
            <button onClick={() => navigate('framework')} className={`text-sm font-bold hover:text-[#028393] transition-colors uppercase tracking-wide ${godMode ? 'text-gray-300' : 'text-gray-600'}`}>
              The Framework
            </button>

            {/* Dropdown: Who It's For */}
            <div className="relative group h-full flex items-center">
              <button className={`text-sm font-bold group-hover:text-[#028393] flex items-center focus:outline-none transition-colors uppercase tracking-wide ${godMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Who It's For <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className={`absolute top-16 left-0 w-64 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left border overflow-hidden z-50 ${godMode ? 'bg-gray-900 border-yellow-500/30' : 'bg-white border-gray-100'}`}>
                <div className="p-2">
                  {['leadership', 'hr', 'sales', 'marketing', 'service', 'pastors', 'personal'].map((item) => (
                    <button 
                      key={item}
                      onClick={() => navigate(item)} 
                      className={`block w-full text-left px-4 py-3 text-sm font-medium hover:bg-[#f65625]/10 hover:text-[#f65625] rounded-lg capitalize transition-colors ${godMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      {item === 'hr' ? 'HR & People Ops' : item.charAt(0).toUpperCase() + item.slice(1)}
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

            <button onClick={() => navigate('about')} className={`text-sm font-bold hover:text-[#028393] transition-colors uppercase tracking-wide ${godMode ? 'text-gray-300' : 'text-gray-600'}`}>
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
          <button onClick={() => { navigate('framework'); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-4 text-xl font-bold border-b ${godMode ? 'text-white border-gray-800' : 'text-[#142d63] border-gray-50'}`}>The Framework</button>
          
          <div className={`py-4 border-b ${godMode ? 'border-gray-800' : 'border-gray-50'}`}>
            <div className="text-sm font-bold text-[#028393] uppercase tracking-wider mb-3">Who It's For</div>
            {['leadership', 'hr', 'sales', 'marketing', 'service', 'pastors', 'personal'].map((item) => (
              <button key={item} onClick={() => { navigate(item); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-3 pl-4 font-medium capitalize active:text-[#f65625] ${godMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item === 'hr' ? 'HR & People' : item}
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
          <div className="mb-6 text-white">
             <SuperhumanLogo className="h-12 text-white opacity-90" godMode={godMode} />
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

const HomePage = ({ navigate, godMode }) => (
  <div className="animate-fade-in overflow-hidden">
    {/* HERO */}
    <section className={`pt-32 pb-24 md:pt-48 md:pb-40 relative overflow-hidden transition-colors duration-700 ${godMode ? 'bg-black text-white' : 'bg-[#142d63] text-white'}`}>
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
              <button onClick={() => navigate('framework')} className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#142d63] transition-all active:scale-95">
                Explore Framework
              </button>
            </div>
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
                <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-[#142d63] flex items-center justify-center text-xs text-[#142d63] font-bold bg-white">JD</div>
                    <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-[#142d63] flex items-center justify-center text-xs text-[#142d63] font-bold bg-gray-100">AS</div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-[#142d63] flex items-center justify-center text-xs text-[#142d63] font-bold bg-gray-200">MR</div>
                </div>
                <p>Joined by 10,000+ Humans</p>
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
            
            {/* New Slider Component replacing static floating badge */}
            <TestimonialSlider />
            
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

const QuizPage = ({ navigate, setTriggerConfetti }) => {
  const [step, setStep] = useState(0); // 0: Intro, 1: Name, 2: Question, 3: Analyzing, 4: Done
  const [name, setName] = useState('');
  
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) setStep(2);
  };

  const finishQuiz = (result) => {
    setStep(3);
    setTimeout(() => {
      setTriggerConfetti(true); // Trigger confetti
      navigate(result);
      setTimeout(() => setTriggerConfetti(false), 5000); // Stop after 5s
    }, 2000);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white relative overflow-hidden py-20">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#faaa68]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#028393]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="w-full max-w-3xl px-6 relative z-10">
        
        {/* PROGRESS BAR (Visual Only) */}
        {step > 0 && step < 3 && (
            <div className="w-full h-2 bg-gray-100 rounded-full mb-12 overflow-hidden">
                <div 
                    className="h-full bg-[#f65625] transition-all duration-500 ease-out" 
                    style={{width: step === 1 ? '33%' : '66%'}}
                ></div>
            </div>
        )}

        {/* STEP 0: INTRO */}
        {step === 0 && (
          <div className="text-center animate-fade-in">
            <div className="inline-block p-6 bg-[#142d63]/5 rounded-3xl mb-8">
                <Target className="w-16 h-16 text-[#142d63]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#142d63] mb-8 tracking-tight">What is Your Superhuman Archetype?</h1>
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              You are fighting a battle every day. But which one? <br/>
              Find out which superpowers you need to win it in less than 2 minutes.
            </p>
            <button onClick={() => setStep(1)} className="bg-[#f65625] text-white px-12 py-6 rounded-full text-xl font-bold shadow-xl hover:bg-[#142d63] hover:scale-105 transition-all active:scale-95">
              Start Assessment
            </button>
            <p className="mt-8 text-sm text-gray-400 uppercase tracking-wide font-bold">Takes 90 seconds • No email required to start</p>
          </div>
        )}

        {/* STEP 1: NAME */}
        {step === 1 && (
          <div className="animate-fade-in">
            <button onClick={() => setStep(0)} className="flex items-center text-gray-400 hover:text-[#142d63] mb-12 transition-colors font-bold uppercase tracking-wide text-sm"><ArrowLeft className="w-4 h-4 mr-2"/> Back</button>
            <h2 className="text-4xl font-bold text-[#142d63] mb-4">Let's get started.</h2>
            <p className="text-gray-500 mb-12 text-xl">First things first, what should we call you?</p>
            <form onSubmit={handleNameSubmit}>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Type your first name..." 
                    className="w-full text-4xl font-bold border-b-4 border-gray-100 py-6 focus:outline-none focus:border-[#f65625] text-[#142d63] placeholder-gray-300 transition-colors bg-transparent"
                    autoFocus
                />
                <div className="mt-16 flex justify-end">
                    <button 
                        type="submit" 
                        disabled={!name.trim()}
                        className="bg-[#142d63] text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-[#f65625] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center shadow-lg active:scale-95"
                    >
                        Next Step <ArrowRight className="ml-2 w-6 h-6" />
                    </button>
                </div>
            </form>
          </div>
        )}

        {/* STEP 2: QUESTION */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-12">
                <button onClick={() => setStep(1)} className="flex items-center text-gray-400 hover:text-[#142d63] transition-colors font-bold uppercase tracking-wide text-sm"><ArrowLeft className="w-4 h-4 mr-2"/> Back</button>
                <span className="text-[#028393] font-bold uppercase text-sm tracking-widest bg-[#028393]/10 px-4 py-2 rounded-full">Hi, {name}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#142d63] mb-12 leading-snug">
              When you wake up on Monday morning, what is the primary battlefield you are stepping into?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'The Boardroom (Leading a Team)', res: 'leadership', icon: Compass },
                { label: 'The Culture (Managing People)', res: 'hr', icon: Heart },
                { label: 'The Arena (Closing Deals)', res: 'sales', icon: TrendingUp },
                { label: 'The Noise (Getting Attention)', res: 'marketing', icon: Megaphone },
                { label: 'The Pulpit (Leading a Church)', res: 'pastors', icon: BookOpen },
                { label: 'The Mirror (Me vs. Me)', res: 'personal', icon: User },
              ].map((opt) => (
                <button 
                    key={opt.res} 
                    onClick={() => finishQuiz(opt.res)} 
                    className="w-full p-8 border-2 border-gray-100 rounded-3xl hover:border-[#f65625] hover:bg-[#f65625]/5 group text-left transition-all flex items-start active:scale-[0.98]"
                >
                  <div className="w-12 h-12 bg-white shadow-md rounded-2xl flex items-center justify-center mr-6 group-hover:bg-[#f65625] transition-colors shrink-0 text-[#142d63] group-hover:text-white">
                    <opt.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-bold text-gray-700 group-hover:text-[#142d63] mt-2">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: ANALYZING */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center animate-fade-in text-center py-20">
            <div className="relative mb-12">
                <div className="w-32 h-32 border-8 border-gray-100 rounded-full"></div>
                <div className="w-32 h-32 border-8 border-[#f65625] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <h2 className="text-4xl font-bold text-[#142d63] mb-4">Analyzing your archetype...</h2>
            <p className="text-xl text-gray-500">Building your custom Superhuman roadmap, {name}.</p>
          </div>
        )}
      </div>
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

// ... (FrameworkPage, ServicesPage etc. - Using same updated styling logic) ...

const FrameworkPage = () => (
    <div className="animate-fade-in">
      <section className="bg-[#142d63] text-white py-32 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-6xl font-extrabold mb-8">The Source Code</h1>
          <p className="text-2xl text-gray-300">The Superhuman Framework is not a list of tips. It is a structural blueprint for excellence.</p>
        </div>
      </section>
      
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-20 text-center">
            <span className="text-[#f65625] font-bold uppercase tracking-widest text-sm bg-[#f65625]/10 px-4 py-2 rounded-full">Part 1</span>
            <h2 className="text-5xl font-extrabold text-[#142d63] mt-6">The 4 Cornerstones</h2>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-xl">The Foundation of Who You Are.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { title: 'Purpose', desc: 'The North Star. Moving from Drifting to Driving. Knowing exactly why you are here.', icon: Compass },
              { title: 'Passion', desc: 'The Fuel. Not just excitement, but vitality. The energy that makes people want to follow you.', icon: Zap },
              { title: 'Persistence', desc: 'The Grit. The unshakeable resolve to hold the line when the plan fails.', icon: Shield },
              { title: 'Love', desc: 'The Strategy. Radical care for humans. The ultimate retention tool.', icon: Heart }
            ].map((item, i) => (
              <div key={i} className="p-12 bg-[#F9FAFB] rounded-3xl border border-gray-100 hover:border-[#f65625] hover:shadow-xl transition-all group">
                <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mr-6 text-[#f65625] group-hover:bg-[#f65625] group-hover:text-white transition-colors">
                        <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-[#142d63]">{i + 1}. {item.title}</h3>
                </div>
                <p className="text-gray-600 text-xl leading-relaxed pl-22">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  
      <section className="py-32 bg-[#142d63] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#028393] rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="mb-20 text-center">
            <span className="text-[#faaa68] font-bold uppercase tracking-widest text-sm bg-[#faaa68]/10 px-4 py-2 rounded-full">Part 2</span>
            <h2 className="text-5xl font-extrabold mt-6">The 10 H Pillars</h2>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-xl">The Habits of What You Do.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {['Humble', 'Honest', 'Holiness', 'Happy', 'Humanity', 'Helpful', 'Healthy', 'Hungry Hustle', 'Holistic Living', 'Humor'].map((h) => (
              <div key={h} className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center hover:bg-[#f65625] hover:border-[#f65625] hover:-translate-y-1 transition-all cursor-default group">
                <h4 className="font-bold text-xl group-hover:text-white transition-colors">{h}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

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
  const [view, setView] = useState('home');
  const [showConfetti, setShowConfetti] = useState(false);
  const godMode = useKonamiCode(); // Triggered by hooks

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'home': return <HomePage navigate={setView} godMode={godMode} />;
      case 'framework': return <FrameworkPage />;
      case 'quiz': return <QuizPage navigate={setView} setTriggerConfetti={setShowConfetti} />;
      
      // Verticals
      case 'leadership': return <VerticalPage 
        title="Superhuman Leadership" 
        sub="Stop Managing. Start Leading."
        problemTitle="The Firefighter Trap"
        problemText="You spend your days putting out fires and your nights worrying about the ones you missed. You feel isolated at the top. It's time to shift from Transactional Manager to Superhuman Leader."
        shiftFrom="Managing Tasks"
        shiftTo="Designing the Future"
        playbookName="Leadership"
      />;
      case 'sales': return <VerticalPage 
        title="Superhuman Sales" 
        sub="Kill Commission Breath."
        problemTitle="Stop Pitching. Start Partnering."
        problemText="Prospects can smell desperation. The 'Always Be Closing' model is dead. It's time to shift to 'Always Be Helping'."
        shiftFrom="Transactional Pusher"
        shiftTo="Trusted Advisor"
        playbookName="Sales"
      />;
      case 'marketing': return <VerticalPage 
        title="Superhuman Marketing" 
        sub="The Era of H2H (Human to Human)."
        problemTitle="Stop Shouting. Start Connecting."
        problemText="Marketing has lost its soul to algorithms. Stop interrupting strangers and start connecting with humans using Empathy, Helpfulness, and Story."
        shiftFrom="Noise Maker"
        shiftTo="Trusted Guide"
        playbookName="Marketing"
      />;
      case 'hr': return <VerticalPage 
        title="Superhuman HR" 
        sub="Stop Policing. Start Architecting."
        problemTitle="From Compliance to Culture."
        problemText="Stop being the 'Principal\'s Office.' Become the heartbeat of the organization. Move from Human Resources to Human Relations."
        shiftFrom="Compliance Officer"
        shiftTo="Culture Architect"
        playbookName="HR"
      />;
      case 'service': return <VerticalPage 
        title="Superhuman Service" 
        sub="From Tickets to Wins."
        problemTitle="Don't be a Human Shield."
        problemText="Stop closing tickets and start creating wins. Move from reactive defense to proactive Success Partnership."
        shiftFrom="Ticket Resolver"
        shiftTo="Success Partner"
        playbookName="Service"
      />;
      case 'pastors': return <VerticalPage 
        title="Superhuman Pastors" 
        sub="Lead from Overflow, Not Obligation."
        problemTitle="The CEO Pastor Trap."
        problemText="You are saving the world but losing your soul. It's time to put down the heavy burden of performance and pick up the lighter burden of Shepherding."
        shiftFrom="Religious Duty"
        shiftTo="Spiritual Overflow"
        playbookName="Pastor"
      />;
      case 'personal': return <VerticalPage 
        title="Personal Growth" 
        sub="Win the Battle of You vs. You."
        problemTitle="Stop Drifting."
        problemText="You are running on a script society wrote for you. It's time to become the architect of your own existence."
        shiftFrom="Drifting"
        shiftTo="Designing"
        playbookName="Personal Growth"
      />;

      // Services
      case 'workshops': return <ServicesPage 
        title="Team Workshops"
        sub="Don't just learn the framework. Install it."
        content={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {t: 'Sales Track', d: 'Kill the pitch. Install the "Humble Inquiry" script.'},
              {t: 'Marketing Track', d: 'Audit your messaging for corporate speak. Move to H2H.'},
              {t: 'HR Track', d: 'Redesign the employee experience from compliance to connection.'}
            ].map((item, i) => (
              <div key={i} className="p-10 border border-gray-100 rounded-3xl shadow-sm bg-white hover:border-[#f65625] hover:-translate-y-2 transition-all group">
                <div className="w-16 h-16 bg-[#142d63] rounded-2xl mb-8 flex items-center justify-center text-white font-bold text-2xl">{i+1}</div>
                <h3 className="text-3xl font-bold text-[#142d63] mb-4">{item.t}</h3>
                <p className="text-gray-600 mb-10 leading-relaxed text-lg">{item.d}</p>
                <button className="w-full bg-white border-2 border-[#142d63] text-[#142d63] py-4 rounded-xl font-bold group-hover:bg-[#142d63] group-hover:text-white transition-all">Inquire</button>
              </div>
            ))}
          </div>
        }
      />;
      case 'coaching': return <ServicesPage 
        title="1:1 Coaching"
        sub="You can't read the label from inside the jar."
        content={
           <div className="max-w-3xl mx-auto bg-white p-12 rounded-3xl shadow-2xl border border-gray-100">
              <h2 className="text-4xl font-bold text-[#142d63] mb-4 text-center">Application Only</h2>
              <p className="text-gray-600 mb-12 text-center text-xl">I only take a handful of clients. I am looking for Humble, Honest, and Hungry humans.</p>
              <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Name</label>
                    <input type="text" className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#f65625] text-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Email</label>
                    <input type="email" className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#f65625] text-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Which track describes you?</label>
                    <select className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#f65625] text-gray-700 text-lg">
                        <option>Executive Leader</option>
                        <option>Pastor / Ministry</option>
                        <option>Personal Growth</option>
                    </select>
                  </div>
                   <button className="w-full bg-[#f65625] text-white px-8 py-5 rounded-xl font-bold text-xl hover:bg-[#142d63] transition-all shadow-lg mt-6 active:scale-95">Submit Application</button>
              </div>
          </div>
        }
      />;
      case 'mastermind': return <ServicesPage 
        title="The Mastermind"
        sub="Never Fight Alone Again."
        content={
          <div className="max-w-5xl mx-auto text-center">
             <div className="bg-[#142d63] rounded-[2.5rem] p-12 md:p-24 text-white relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                 <div className="relative z-10">
                    <h2 className="text-5xl font-bold mb-8">The 2026 Cohort</h2>
                    <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">A curated group of 20 humans holding the line together. Bi-weekly war rooms. Deep connection. No drift.</p>
                    <button className="bg-[#f65625] text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-white hover:text-[#f65625] transition-all shadow-2xl hover:-translate-y-1 active:scale-95">Apply for Waitlist</button>
                 </div>
             </div>
          </div>
        }
      />;
      case 'speaking': return <ServicesPage 
        title="Keynote Speaking"
        sub="I Don't Just Speak. I Ignite."
        content={
          <div className="max-w-5xl mx-auto">
             <h2 className="text-4xl font-bold text-[#142d63] mb-16 text-center">Most conferences are boring. Yours won't be.</h2>
             <div className="grid md:grid-cols-2 gap-12">
                <div className="p-12 border border-gray-100 rounded-3xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
                    <div className="w-16 h-16 bg-[#f65625]/10 rounded-2xl flex items-center justify-center text-[#f65625] mb-8">
                        <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-3xl mb-4 text-[#142d63]">The Superhuman Leader</h3>
                    <p className="text-gray-600 leading-relaxed mb-8 text-lg">Stop Managing. Start Leading. A high-octane session on shifting from transactional management to transformational leadership.</p>
                    <button className="text-[#f65625] font-bold flex items-center text-lg group">Book This Keynote <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" /></button>
                </div>
                 <div className="p-12 border border-gray-100 rounded-3xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
                    <div className="w-16 h-16 bg-[#028393]/10 rounded-2xl flex items-center justify-center text-[#028393] mb-8">
                        <Heart className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-3xl mb-4 text-[#142d63]">The H2H Revenue Revolution</h3>
                    <p className="text-gray-600 leading-relaxed mb-8 text-lg">Kill the pitch & connect with humans. How to build trust in a skeptical world using the 10 H Pillars.</p>
                    <button className="text-[#028393] font-bold flex items-center text-lg group">Book This Keynote <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" /></button>
                </div>
             </div>
          </div>
        }
      />;
      case 'contact': return <ServicesPage 
          title="Contact"
          sub="Let's Connect. Human to Human."
          content={
            <div className="max-w-4xl mx-auto grid gap-8">
                <button onClick={() => setView('speaking')} className="p-10 border-2 border-gray-100 rounded-3xl hover:border-[#f65625] hover:bg-[#f65625]/5 text-left bg-white transition-all group active:scale-[0.99]">
                    <h3 className="font-bold text-2xl text-[#142d63] mb-2">I want to hire George to Speak</h3>
                    <p className="text-gray-500 group-hover:text-[#f65625] text-lg">For conferences, events, and retreats.</p>
                </button>
                 <button onClick={() => setView('coaching')} className="p-10 border-2 border-gray-100 rounded-3xl hover:border-[#f65625] hover:bg-[#f65625]/5 text-left bg-white transition-all group active:scale-[0.99]">
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
                    <button onClick={() => setView('speaking')} className="text-[#f65625] font-bold hover:underline text-lg">View Speaking</button>
                    <button onClick={() => setView('framework')} className="text-[#142d63] font-bold hover:underline text-lg">Read the Framework</button>
                </div>
            </div>
          </div>
        }
      />;
      
      default: return <HomePage navigate={setView} godMode={godMode} />;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen font-sans transition-colors duration-500 ${godMode ? 'text-gray-200 bg-gray-900 selection:bg-[#fbbf24] selection:text-black' : 'text-[#1f2937] bg-white selection:bg-[#f65625] selection:text-white'}`}>
      <Confetti isActive={showConfetti} />
      <Navbar navigate={setView} currentView={view} godMode={godMode} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer navigate={setView} godMode={godMode} />
    </div>
  );
};

export default App;
