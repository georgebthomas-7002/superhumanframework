import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";
import {
  ArrowRight,
  Target,
  Flame,
  Shield,
  Heart,
  BookOpen,
  Users,
  Smile,
  Church,
  Lightbulb,
  Apple,
  Zap,
  Globe,
  Laugh,
  Download,
  User
} from 'lucide-react';

// Reading Progress Component
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(latest => {
      setProgress(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#f65625] origin-left z-50"
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
    </>
  );
};

// Animated Icons
const AnimatedCompass = () => (
  <motion.div
    animate={{ rotate: [0, 10, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <Target className="w-12 h-12 text-[#f65625]" />
  </motion.div>
);

const AnimatedFlame = () => (
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <Flame className="w-12 h-12 text-[#f65625]" />
  </motion.div>
);

const AnimatedShield = () => (
  <motion.div
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <Shield className="w-12 h-12 text-[#f65625]" />
  </motion.div>
);

const AnimatedHeart = () => (
  <motion.div
    animate={{ scale: [1, 1.15, 1] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <Heart className="w-12 h-12 text-[#f65625]" />
  </motion.div>
);

// Particle Background Component
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

const PersonalPage = ({ navigate }) => {
  const [init, setInit] = useState(false);
  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.3,
          },
        },
      },
    },
    particles: {
      color: {
        value: "#f65625",
      },
      links: {
        color: "#f65625",
        distance: 150,
        enable: true,
        opacity: 0.15,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 30,
      },
      opacity: {
        value: 0.2,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">
      <ReadingProgress />

      {/* Hero Section */}
      <section id="hero" data-section className="bg-[#142d63] text-white py-32 md:py-48 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#028393] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f65625] rounded-full blur-[120px] opacity-15"></div>
        <ParticleBackground color="#faaa68" />

        {/* Animated Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/5 rounded-full"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-white/5"
          animate={{
            y: [0, 40, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-32 h-32 border border-white/5 rounded-lg"
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          className="max-w-6xl mx-auto px-4 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold backdrop-blur-sm"
          >
            <span className="text-[#faaa68] flex items-center gap-2">
              <User className="w-4 h-4" />
              Moving from "Drifting" to "Designing"
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            Superhuman Personal Growth
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            Win the Battle of You vs. You.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Stop drifting through life on a script society wrote for you. This is the operating system for humans who are tired of "existing" and are ready to start "designing" a life of impact, joy, and purpose.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => {
                const element = document.getElementById('cta');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-[#f65625] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-white hover:text-[#f65625] transition-colors flex items-center justify-center gap-2"
            >
              Download Playbook
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('problem');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white/5 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#142d63] transition-all flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section id="problem" data-section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#142d63] mb-6">
              The "Drift" Trap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Let me ask you a question that might sting a little.
            </p>
            <p className="text-2xl font-bold text-[#f65625] max-w-3xl mx-auto mb-6">
              Are you living your life, or are you just existing in it?
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Most people aren't crashing and burning. They are just… <span className="font-bold">drifting</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-2xl border border-gray-200 mb-12 max-w-4xl mx-auto"
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              They wake up, drink the coffee, go to the job, pay the bills, watch Netflix, sleep, and repeat. They are waiting for "Someday."
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#f65625] rounded-full mt-2 flex-shrink-0"></div>
                <span>Someday I'll get in shape.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#f65625] rounded-full mt-2 flex-shrink-0"></div>
                <span>Someday I'll write that book.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#f65625] rounded-full mt-2 flex-shrink-0"></div>
                <span>Someday I'll be happy.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-2xl font-black text-[#f65625] text-center mb-6">
              Stop waiting. "Someday" is not a day of the week.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
              You are the architect of your own existence. If you don't like the view, you have the power to change the window. But you can't do it on autopilot.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-black text-[#f65625] mb-8 text-center">The Superhuman Shift:</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  from: 'Drifting (Reactive)',
                  to: 'Designing (Intentional)'
                },
                {
                  from: 'Victim of Circumstance',
                  to: 'Hero of the Story'
                },
                {
                  from: '"Someday"',
                  to: 'Today'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="text-base text-gray-400 mb-2">{item.from}</div>
                    <div className="text-2xl text-[#f65625] font-black mb-2">→</div>
                    <div className="text-lg font-black text-[#142d63]">{item.to}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Foundation Section - 4 Cornerstones */}
      <section id="foundation" data-section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#142d63] mb-6">
              Part 1: The Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              How High-Achievers Use the 4 Cornerstones
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto italic">
              You cannot build a skyscraper on a swamp. If you don't know who you are, you will fall for anything.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Purpose */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[#f65625]"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <AnimatedCompass />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Purpose: The North Star</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Wandering</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Directed</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Most people are wandering. They don't know where they are going, so any road will take them there. Purpose is your{' '}
                <span className="font-bold text-[#142d63]">North Star</span>. It's knowing why you are on this planet. It's breaking free from the "standard life script" and defining what success looks like for you.
              </p>
            </motion.div>

            {/* Passion */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[#f65625]"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <AnimatedFlame />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Passion: The Vitality</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Numbness</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Electricity</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                I'm not talking about a hobby. I'm talking about <span className="font-bold text-[#142d63]">Vitality</span>. Passion is the fuel in your tank. It's finding the things that light your soul on fire so you wake up with excitement rather than dread. You were not created to be bored. You were created to be{' '}
                <span className="font-bold italic">electric</span>.
              </p>
            </motion.div>

            {/* Persistence */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[#f65625]"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <AnimatedShield />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Persistence: The Grit</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Quitting</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Resilience</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Life is going to punch you in the face. That's a guarantee. Persistence is the ability to{' '}
                <span className="font-bold text-[#142d63]">take the hit and keep moving forward</span>. It's viewing failure as data, not as a definition of your worth. It's the grit to say, "I'm not done yet."
              </p>
            </motion.div>

            {/* Love */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[#f65625]"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <AnimatedHeart />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Love: The Overflow</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Self-Sabotage</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Self-Respect</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                This starts with the person in the mirror. We are often our own worst critics. Love means{' '}
                <span className="font-bold text-[#142d63]">killing that inner critic</span>. It means filling your own cup first so you can actually overflow into the lives of your family and friends. You cannot give what you do not have.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Habits Section - 10 H Pillars */}
      <section id="habits" data-section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#142d63] mb-6">
              Part 2: The 10 H Pillars of a Life Well Lived
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The daily habits that separate the "Dreamers" from the "Doers."
            </p>
          </motion.div>

          {/* Character Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-black text-[#142d63] mb-8 text-center">Character (The Inner Work)</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  title: 'Humble',
                  description: 'Adopt a "Student Mindset" for life. You are never too old to learn, never too successful to grow, and never too smart to say "I was wrong."'
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'Honest',
                  description: 'Radical Self-Truth. Stop lying to yourself about your excuses, your bad habits, and your fears. The truth will set you free, but first it will make you uncomfortable.'
                },
                {
                  icon: <Church className="w-8 h-8" />,
                  title: 'Holiness (Self-Integrity)',
                  description: 'Keep the promises you make to yourself. If you say you\'re going to the gym, go. Confidence comes from keeping promises to yourself.'
                },
                {
                  icon: <Smile className="w-8 h-8" />,
                  title: 'Happy',
                  description: 'Happiness is a choice, not a result. Stop waiting for the promotion or the new car. Cultivate gratitude for what you have right now.'
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: 'Humanity',
                  description: 'Give yourself grace. You are a work in progress. You are going to mess up. Humanity means accepting your flaws and refusing to chase toxic perfectionism.'
                }
              ].map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#142d63] to-[#1a3a7a] text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <div className="text-[#f65625] mb-4">{pillar.icon}</div>
                  <h4 className="text-xl font-black mb-3">{pillar.title}</h4>
                  <p className="text-gray-200 leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Section */}
          <div>
            <h3 className="text-3xl font-black text-[#142d63] mb-8 text-center">Action (The External Work)</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Lightbulb className="w-8 h-8" />,
                  title: 'Helpful',
                  description: 'Find significance in service. The quickest way to get out of your own head is to help someone else. Depression hates a moving target.'
                },
                {
                  icon: <Apple className="w-8 h-8" />,
                  title: 'Healthy',
                  description: 'Your body is the vehicle for your Purpose. If your vehicle breaks down, the mission stops. Sleep, nutrition, and movement are non-negotiables.'
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: 'Hungry Hustle',
                  description: 'Be ambitious about your own potential. Refuse to settle for mediocrity. It\'s not about burnout; it\'s about seeing how good you can actually be.'
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: 'Holistic Living',
                  description: 'Balance the Wheel of Life. Success isn\'t just a bank account. Don\'t let your career destroy your marriage or your health.'
                },
                {
                  icon: <Laugh className="w-8 h-8" />,
                  title: 'Humor',
                  description: 'Life is too short to be grumpy. Learn to laugh at your mistakes. Humor brings lightness to heavy days. If you can laugh at it, you can live through it.'
                }
              ].map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#f65625] to-[#ff7a47] text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <div className="text-white mb-4">{pillar.icon}</div>
                  <h4 className="text-xl font-black mb-3">{pillar.title}</h4>
                  <p className="text-white/90 leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" data-section className="py-20 px-4 bg-gradient-to-br from-[#142d63] to-[#1a3a7a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Get the Personal Growth Playbook
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              We've compiled the exact strategies, scripts, and daily habits for designing a{' '}
              <span className="font-bold text-[#f65625]">Superhuman life</span> into a comprehensive PDF guide.
            </p>
            <button
              onClick={() => navigate('framework')}
              className="group bg-[#f65625] text-white px-10 py-5 rounded-full font-black text-xl hover:bg-white hover:text-[#142d63] transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <Download className="w-6 h-6" />
              Download Playbook
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="mt-6 text-gray-400">
              Join thousands who've stopped drifting and started designing their lives.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PersonalPage;
