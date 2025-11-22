import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Compass, Heart, Shield, Zap, BookOpen, TrendingUp, Megaphone,
  LifeBuoy, User, Download, ArrowRight, CheckCircle, Sparkles,
  Volume2, Play, Pause, X
} from 'lucide-react';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Lottie from 'lottie-react';

// Subtle particle configuration - VERY minimal, just adds depth
const ParticleBackground = ({ color = "#142d63" }) => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            }
          },
          modes: {
            grab: {
              distance: 140,
              links: { opacity: 0.15 }
            }
          }
        },
        particles: {
          color: { value: color },
          links: {
            color: color,
            distance: 150,
            enable: true,
            opacity: 0.08,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" }
          },
          number: {
            density: { enable: true, area: 800 },
            value: 30
          },
          opacity: {
            value: 0.15
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 3 }
          }
        },
        detectRetina: true
      }}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

// Reading Progress Bar Component
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="h-1 bg-gradient-to-r from-[#f65625] via-[#faaa68] to-[#028393] origin-left"
        style={{ scaleX }}
      />
      {progress > 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm font-bold text-[#142d63] border border-gray-100 z-40"
        >
          {progress}% Complete
        </motion.div>
      )}
    </div>
  );
};

// Voice Narration Player Component
const VoiceNarrationPlayer = ({ sectionName, audioUrl, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm z-50"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#f65625] rounded-full flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-[#142d63] text-sm">Now Playing</p>
            <p className="text-gray-600 text-xs">{sectionName}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
          <div
            className="bg-[#f65625] h-1 rounded-full transition-all"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="w-12 h-12 bg-[#f65625] rounded-full flex items-center justify-center text-white shadow-lg"
        >
          {isPlaying ? <Pause className="w-6 h-6" fill="white" /> : <Play className="w-6 h-6 ml-0.5" fill="white" />}
        </motion.button>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <p className="text-xs text-gray-400 mt-4 text-center">
        Voice powered by ElevenLabs
      </p>
    </motion.div>
  );
};

// Listen Button Component
const ListenButton = ({ onClick, sectionName }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="inline-flex items-center gap-2 px-6 py-3 bg-[#f65625] hover:bg-[#142d63] text-white rounded-full font-bold text-sm transition-colors shadow-lg hover:shadow-xl"
  >
    <Volume2 className="w-5 h-5" />
    Listen to {sectionName}
  </motion.button>
);

// Simple animated icon components (CSS-based until user adds Lottie JSON files)
const AnimatedCompass = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <Compass className="w-full h-full" />
    </motion.div>
  </div>
);

const AnimatedFlame = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [1, 0.8, 1]
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <Zap className="w-full h-full" fill="currentColor" />
    </motion.div>
  </div>
);

const AnimatedShield = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Shield className="w-full h-full" />
    </motion.div>
  </div>
);

const AnimatedHeart = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    >
      <Heart className="w-full h-full" fill="currentColor" />
    </motion.div>
  </div>
);

// Animation variants for scroll reveals
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const FrameworkPage = ({ navigate }) => {
  const [expandedPillar, setExpandedPillar] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [sectionsRead, setSectionsRead] = useState([]);

  // Section tracking refs
  const philosophyRef = useRef(null);
  const cornerstonesRef = useRef(null);
  const pillarsRef = useRef(null);
  const applicationRef = useRef(null);

  // Track which sections have been read
  useEffect(() => {
    const observers = [
      { ref: philosophyRef, name: 'philosophy' },
      { ref: cornerstonesRef, name: 'cornerstones' },
      { ref: pillarsRef, name: 'pillars' },
      { ref: applicationRef, name: 'application' }
    ].map(({ ref, name }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !sectionsRead.includes(name)) {
            setSectionsRead(prev => [...prev, name]);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, [sectionsRead]);

  // NOTE: Replace these with actual ElevenLabs API calls
  // For now, these are placeholder URLs
  const audioFiles = {
    philosophy: '/audio/philosophy.mp3', // Replace with actual ElevenLabs generated audio
    purpose: '/audio/purpose.mp3',
    passion: '/audio/passion.mp3',
    persistence: '/audio/persistence.mp3',
    love: '/audio/love.mp3',
    pillars: '/audio/pillars.mp3'
  };

  const handlePlayAudio = (sectionName, audioUrl) => {
    setPlayingAudio({ sectionName, audioUrl });
  };

  return (
    <div className="animate-fade-in">
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Voice Narration Player */}
      {playingAudio && (
        <VoiceNarrationPlayer
          sectionName={playingAudio.sectionName}
          audioUrl={playingAudio.audioUrl}
          onClose={() => setPlayingAudio(null)}
        />
      )}

      {/* HERO SECTION */}
      <section className="bg-[#142d63] text-white py-32 md:py-48 text-center relative overflow-hidden">
        {/* Subtle background blurs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#028393] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f65625] rounded-full blur-[120px] opacity-15"></div>

        {/* Subtle particle effect */}
        <ParticleBackground color="#faaa68" />

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
            <span className="text-[#faaa68]">The DNA of a Superhuman Life</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            The Operating System<br />for Excellence.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            A comprehensive architecture for leading yourself, leading others, and building a life of impact.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#f65625] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-white hover:text-[#f65625] transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download the Playbook
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('quiz')}
              className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#142d63] transition-colors"
            >
              Take the Assessment
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* THE PHILOSOPHY */}
      <section ref={philosophyRef} className="py-32 bg-white relative overflow-hidden">
        <ParticleBackground color="#142d63" />

        <motion.div
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="flex justify-center mb-6">
            <ListenButton
              onClick={() => handlePlayAudio("The Philosophy", audioFiles.philosophy)}
              sectionName="this section"
            />
          </div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold text-[#142d63] mb-8 tracking-tight"
          >
            Stop Hacking. Start Building.
          </motion.h2>

          <div className="text-xl text-gray-600 leading-relaxed space-y-6 text-left md:text-center">
            <motion.p variants={fadeInUp} className="text-2xl font-bold text-[#f65625]">
              Most people are trying to build a 100-story life on a 1-story foundation.
            </motion.p>
            <motion.p variants={fadeInUp}>
              We are obsessed with "hacks." We want the quick fix for our revenue, the shortcut for our leadership,
              and the easy button for our happiness. But hacks don't last. Strategies change. Tactics expire.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-2xl font-bold text-[#142d63]">
              Principles remain.
            </motion.p>
            <motion.p variants={fadeInUp}>
              The Superhuman Framework is not a list of tips. It is a <strong>structural blueprint</strong>.
              It is designed to help you build a life and business that doesn't just look successful on the outside,
              but is strong, healthy, and sustainable on the inside.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-8">
              <p className="text-xl font-bold text-[#142d63] mb-4">It consists of two unshakeable components:</p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-8 bg-[#142d63]/5 rounded-3xl border border-[#142d63]/10 cursor-default"
                >
                  <h3 className="text-2xl font-bold text-[#142d63] mb-2">The 4 Cornerstones</h3>
                  <p className="text-[#f65625] font-bold">The Foundation of Who You Are.</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-8 bg-[#f65625]/5 rounded-3xl border border-[#f65625]/10 cursor-default"
                >
                  <h3 className="text-2xl font-bold text-[#142d63] mb-2">The 10 H Pillars</h3>
                  <p className="text-[#028393] font-bold">The Habits of What You Do.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PART 1: THE 4 CORNERSTONES */}
      <section ref={cornerstonesRef} className="py-32 bg-[#F9FAFB] relative overflow-hidden">
        <ParticleBackground color="#f65625" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="mb-20 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.span
              variants={scaleIn}
              className="text-[#f65625] font-bold uppercase tracking-widest text-sm bg-[#f65625]/10 px-4 py-2 rounded-full inline-block"
            >
              Part 1 • {sectionsRead.includes('cornerstones') && <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-extrabold text-[#142d63] mt-6 mb-4">
              The Foundation
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 mt-6 max-w-3xl mx-auto text-xl leading-relaxed">
              You cannot build a skyscraper on a swamp. These four elements must be present in your DNA before you can lead effectively.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: 'Purpose',
                subtitle: 'The North Star',
                desc: 'Purpose is the difference between drifting and driving. It is knowing exactly who you are, why you are here, and who you are here to serve. When you lose your Purpose, you become a reactive victim of circumstance. When you have Purpose, every decision becomes clear.',
                AnimatedIcon: AnimatedCompass,
                audioKey: 'purpose'
              },
              {
                title: 'Passion',
                subtitle: 'The Fuel',
                desc: 'Passion is not just excitement; it is vitality. It is the electric energy that allows you to influence others. If you are bored, your team will be bored. If you are on fire, the world will come to watch you burn. Passion is the antidote to apathy.',
                AnimatedIcon: AnimatedFlame,
                audioKey: 'passion'
              },
              {
                title: 'Persistence',
                subtitle: 'The Grit',
                desc: 'Life will punch you in the mouth. Markets will crash. Strategies will fail. Persistence is the unshakeable resolve to stay in the fight. It is the understanding that failure is not a destination; it is just data. It is the long obedience in the same direction.',
                AnimatedIcon: AnimatedShield,
                audioKey: 'persistence'
              },
              {
                title: 'Love',
                subtitle: 'The Secret Weapon',
                desc: 'This is the cornerstone most leaders are afraid of. But in the Superhuman Framework, Love is not a weakness; it is a strategy. It is Agape—radical care for the human beings you lead and serve. If you do not love your team, your customers, or yourself, you are building on sand.',
                AnimatedIcon: AnimatedHeart,
                audioKey: 'love'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="p-12 bg-white rounded-3xl border border-gray-100 hover:border-[#f65625] hover:shadow-2xl transition-all group cursor-default"
              >
                <div className="flex items-start gap-6 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-20 h-20 bg-[#142d63]/5 rounded-2xl flex items-center justify-center shrink-0 text-[#f65625] group-hover:bg-[#f65625] group-hover:text-white transition-colors"
                  >
                    <item.AnimatedIcon />
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#142d63] mb-1">{i + 1}. {item.title}</h3>
                    <p className="text-[#f65625] font-bold text-lg">"{item.subtitle}"</p>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">{item.desc}</p>
                <ListenButton
                  onClick={() => handlePlayAudio(item.title, audioFiles[item.audioKey])}
                  sectionName={item.title}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PART 2: THE 10 H PILLARS */}
      <section ref={pillarsRef} className="py-32 bg-[#142d63] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#028393] rounded-full blur-[150px] opacity-20"></div>
        <ParticleBackground color="#faaa68" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="mb-20 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.span
              variants={scaleIn}
              className="text-[#faaa68] font-bold uppercase tracking-widest text-sm bg-[#faaa68]/10 px-4 py-2 rounded-full inline-block"
            >
              Part 2 • {sectionsRead.includes('pillars') && <CheckCircle className="w-4 h-4 inline ml-2 text-green-400" />}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-extrabold mt-6 mb-4">
              The Habits
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300 mt-6 max-w-3xl mx-auto text-xl leading-relaxed mb-8">
              If the Cornerstones are your mindset, the Pillars are your actions. These are the ten levers you pull every day to create momentum.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <ListenButton
                onClick={() => handlePlayAudio("The 10 H Pillars", audioFiles.pillars)}
                sectionName="all 10 Pillars"
              />
            </motion.div>
          </motion.div>

          {/* Character Pillars */}
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeInUp} className="text-3xl font-bold text-[#faaa68] mb-4 text-center">
              The Character Pillars (Internal Work)
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-gray-300 text-center mb-10 text-lg">
              How you show up when no one is watching.
            </motion.p>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-5 gap-6"
              variants={staggerContainer}
            >
              {[
                { name: 'Humble', desc: 'The removal of Ego. It is the "Student Mindset"—always learning, always willing to admit when you are wrong, and always giving credit to the team.' },
                { name: 'Honest', desc: 'Radical Truth. It is the refusal to spin, manipulate, or hide. It is transparency in your leadership, your marketing, and your relationships.' },
                { name: 'Holiness', desc: 'Integrity. Being "Set Apart." It is the alignment of your private behavior with your public values. It means you are safe to trust.' },
                { name: 'Happy', desc: 'The strategic choice of Joy. It is refusing to let stress dictate your atmosphere. It is bringing light into the room rather than sucking the oxygen out of it.' },
                { name: 'Humanity', desc: 'Authenticity. It is dropping the "Corporate Mask." It is H2H (Human to Human) connection. It is the permission to be vulnerable, messy, and real.' }
              ].map((h) => (
                <motion.div
                  key={h.name}
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => setExpandedPillar(expandedPillar === h.name ? null : h.name)}
                  className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#f65625] hover:border-[#f65625] transition-all cursor-pointer group"
                >
                  <h4 className="font-bold text-2xl mb-3 group-hover:text-white transition-colors">{h.name}</h4>
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedPillar === h.name ? "auto" : 0,
                      opacity: expandedPillar === h.name ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-300 text-sm leading-relaxed group-hover:text-white overflow-hidden"
                  >
                    {h.desc}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Action Pillars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeInUp} className="text-3xl font-bold text-[#faaa68] mb-4 text-center">
              The Action Pillars (External Work)
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-gray-300 text-center mb-10 text-lg">
              How you impact the world around you.
            </motion.p>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-5 gap-6"
              variants={staggerContainer}
            >
              {[
                { name: 'Helpful', desc: 'Servant Leadership. It is the relentless pursuit of adding value to others. It is moving from "What can I get?" to "What can I give?"' },
                { name: 'Healthy', desc: 'Sustainability. It is treating your body and mind as the vehicle for your purpose. Sleep, nutrition, and boundaries are not luxuries; they are requirements for high performance.' },
                { name: 'Hungry Hustle', desc: 'Ambition without Burnout. It is a proactive, aggressive pursuit of potential. It is refusing to settle for mediocrity. It is working hard, but working smart.' },
                { name: 'Holistic Living', desc: 'Balance. It is the understanding that you are a whole person. You are not just an employee; you are a parent, a friend, and a neighbor. Success in business does not justify failure at home.' },
                { name: 'Humor', desc: 'Levity. It is the ability to laugh at yourself and the chaos of life. Humor breaks down walls, builds trust, and makes the hard journey enjoyable.' }
              ].map((h) => (
                <motion.div
                  key={h.name}
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => setExpandedPillar(expandedPillar === h.name ? null : h.name)}
                  className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#028393] hover:border-[#028393] transition-all cursor-pointer group"
                >
                  <h4 className="font-bold text-2xl mb-3 group-hover:text-white transition-colors">{h.name}</h4>
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedPillar === h.name ? "auto" : 0,
                      opacity: expandedPillar === h.name ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-300 text-sm leading-relaxed group-hover:text-white overflow-hidden"
                  >
                    {h.desc}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* APPLICATION */}
      <section ref={applicationRef} className="py-32 bg-white relative overflow-hidden">
        <ParticleBackground color="#028393" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-5xl font-extrabold text-[#142d63] mb-6">
              Knowledge Without Action is Just Noise.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Now that you know the Framework, you need to apply it to your specific battleground.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { id: 'leadership', icon: Compass, title: 'For Leaders', desc: 'How to lead with Vision.' },
              { id: 'hr', icon: Heart, title: 'For HR', desc: 'How to build Culture.' },
              { id: 'marketing', icon: Megaphone, title: 'For Marketing', desc: 'How to connect via H2H.' },
              { id: 'sales', icon: TrendingUp, title: 'For Sales', desc: 'How to sell with Trust.' },
              { id: 'pastors', icon: BookOpen, title: 'For Pastors', desc: 'How to lead from Overflow.' },
              { id: 'personal', icon: User, title: 'For You', desc: 'How to design your Life.' }
            ].map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => navigate(item.id)}
                className="p-10 rounded-3xl bg-white shadow-sm border border-gray-100 hover:shadow-2xl hover:border-[#028393]/30 transition-all cursor-pointer group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-[#142d63]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#028393] transition-colors"
                >
                  <item.icon className="w-8 h-8 text-[#142d63] group-hover:text-white transition-colors" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#142d63] mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6 text-lg">{item.desc}</p>
                <span className="text-[#142d63] font-bold group-hover:text-[#028393] flex items-center text-sm uppercase tracking-wide transition-colors">
                  Read More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="py-32 bg-[#F9FAFB] relative overflow-hidden">
        <ParticleBackground color="#f65625" />

        <motion.div
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div
            variants={scaleIn}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-16 rounded-3xl shadow-xl border border-gray-100"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1, rotate: 360 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CheckCircle className="w-20 h-20 text-[#f65625] mx-auto mb-8" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-6">
              Where are you weak?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-10 leading-relaxed">
              Most people are strong in 2 Cornerstones but missing 2.<br />
              Most are great at "Hustle" but terrible at "Healthy."
            </motion.p>
            <motion.p variants={fadeInUp} className="text-2xl font-bold text-[#f65625] mb-8">
              Find your blind spots now.
            </motion.p>
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('quiz')}
              className="bg-[#f65625] text-white px-12 py-6 rounded-full font-bold text-xl shadow-xl hover:bg-[#142d63] transition-colors"
            >
              Take the Assessment
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default FrameworkPage;
