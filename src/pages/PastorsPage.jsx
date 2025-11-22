import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";
import {
  ArrowRight,
  Sparkles,
  Target,
  Flame,
  Shield,
  Heart,
  BookOpen,
  TrendingUp,
  Users,
  Smile,
  Church,
  Lightbulb,
  Apple,
  Zap,
  Globe,
  Laugh,
  Download
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

const PastorsPage = ({ navigate }) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">
      <ReadingProgress />

      {init && (
        <Particles
          id="tsparticles-pastors"
          options={particlesOptions}
          className="absolute inset-0 pointer-events-none"
        />
      )}

      {/* Hero Section */}
      <section id="hero" data-section className="bg-[#142d63] text-white py-32 md:py-48 text-center relative overflow-hidden">
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

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold backdrop-blur-sm">
              <span className="text-[#faaa68] flex items-center gap-2">
                <Church className="w-4 h-4" />
                Moving from "Religious CEO" to "Superhuman Shepherd"
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            Superhuman Pastors
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            Lead from Overflow,<br />Not Obligation.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            You don't have to choose between growing your church and saving your soul. This is the operating system for ministry leaders who are tired of the "CEO Pastor" grind and are ready to pick up the lighter burden of true Shepherding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
        </div>
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
              The "CEO Pastor" Trap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Let's have a real conversation about Monday morning.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              We all know what Sunday looks like. The lights, the worship, the handshake line. You are "on." You are the spiritual superhero everyone looks up to.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold">But then Monday hits.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              The adrenaline crashes. The emails about the budget come in. The criticism from the member who didn't like the music lands in your inbox. The weight of carrying everyone else's burdens starts to crush your own chest.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-black text-[#142d63] mb-6">The Trap:</h3>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              We have professionalized ministry to the point where Pastors feel like CEOs of religious non-profits. You are expected to be the Preacher, the Therapist, the CFO, and the Event Planner.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-black text-[#142d63] mb-6">The Result:</h3>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              You are running on fumes. You are preaching grace to others while refusing to give it to yourself.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-2xl font-black text-[#f65625] mb-8">The Superhuman Shift:</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  from: 'Religious CEO',
                  to: 'Superhuman Shepherd'
                },
                {
                  from: 'Managing Members',
                  to: 'Shepherding Souls'
                },
                {
                  from: 'Burnout',
                  to: 'Breakthrough'
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
              How Pastors Use the 4 Cornerstones
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto italic">
              You cannot lead God's people if you are running on empty. Before you write the sermon, check your spirit.
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Purpose: The Kingdom</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Building a Church</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Building the Kingdom</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                It is easy to drift into "Non-Profit Manager" mode. You start worrying about the building fund more than the Gospel. Purpose is{' '}
                <span className="font-bold text-[#142d63]">leading out of divine assignment</span> rather than obligation to a board. Realign with the "Why," and the "What" gets easier.
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Passion: The Zeal</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Religious Duty</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Spiritual Zeal</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                The congregation can taste stale bread. If you are bored with the Word, they will be too. Passion is{' '}
                <span className="font-bold text-[#142d63]">rediscovering the joy of your salvation</span>. It's preaching because you have fire in your bones, not just because it's Sunday and the calendar says you have to speak.
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Persistence: The Endurance</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Ministry Fatigue</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Spiritual Grit</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ministry is a marathon through mud. People leave. Leaders fail. Budgets shrink. Persistence is the{' '}
                <span className="font-bold text-[#142d63]">spiritual grit to stay faithful</span> when the pews are empty or the criticism is loud. It's the "long obedience in the same direction."
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Love: The Shepherd</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Managing People</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Shepherding Souls</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Agape. This is the hardest one. It is easy to love the theology; it is hard to love the people. Especially the ones that bite. Love means{' '}
                <span className="font-bold text-[#142d63]">leading with the heart of a Father or Mother</span>, not the mind of a CEO.
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
              Part 2: The 10 H Pillars of Ministry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The daily behaviors that protect the leader's soul.
            </p>
          </motion.div>

          {/* Character Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-black text-[#142d63] mb-8 text-center">Character (The Inner Life)</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  title: 'Humble',
                  description: 'Kill the "Celebrity Pastor" vibe. Wash feet. Admit you aren\'t the Messiah. You don\'t have to save everyone—that\'s Jesus\' job.'
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'Honest',
                  description: 'Be authentic in the pulpit. Share your struggles (wisely). If you pretend to be perfect, you create a culture where everyone else has to pretend, too.'
                },
                {
                  icon: <Church className="w-8 h-8" />,
                  title: 'Holiness',
                  description: 'Guard your heart. Live above reproach—not out of legalism, but out of intimacy. Be the same person in the Green Room as you are on stage.'
                },
                {
                  icon: <Smile className="w-8 h-8" />,
                  title: 'Happy',
                  description: 'The "Joy of the Lord" is your strength. Fight against the "somber/miserable saint" stereotype. Show the world that following Jesus is a joyful existence.'
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: 'Humanity',
                  description: 'You are a person, not just a parson. You need friends who aren\'t church members. You need hobbies that aren\'t "spiritual."'
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
            <h3 className="text-3xl font-black text-[#142d63] mb-8 text-center">Action (The Ministry Life)</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Lightbulb className="w-8 h-8" />,
                  title: 'Helpful',
                  description: 'Equip the saints (Eph 4). Stop trying to do it all yourself. The most helpful thing you can do is give away your authority and empower others.'
                },
                {
                  icon: <Apple className="w-8 h-8" />,
                  title: 'Healthy',
                  description: 'Sabbath is not a suggestion; it is a command. You cannot lead on empty. If you are physically wrecked, you are dangerous to your church.'
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: 'Hungry Hustle',
                  description: 'Zealous for the lost. Being aggressive about the mission, but working from a place of rest, not for approval.'
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: 'Holistic Living',
                  description: 'Do not sacrifice your family on the altar of the church. Your spouse and children are your first ministry.'
                },
                {
                  icon: <Laugh className="w-8 h-8" />,
                  title: 'Humor',
                  description: 'Church can be weird. People are awkward. Use humor to bring levity to heavy situations. Take God seriously, but don\'t take yourself so seriously.'
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
              Get the Pastor Playbook
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              We've compiled the exact strategies, Sabbath protocols, and soul-care habits for{' '}
              <span className="font-bold text-[#f65625]">Superhuman Pastors</span> into a comprehensive PDF guide.
            </p>
            <button
              onClick={() => navigate('framework')}
              className="group bg-[#f65625] text-white px-10 py-5 rounded-full font-black text-xl hover:bg-white hover:text-[#142d63] transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <Download className="w-6 h-6" />
              Download Playbook
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PastorsPage;
