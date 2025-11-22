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
  Laugh
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

const HRPage = ({ navigate }) => {
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
          id="tsparticles-hr"
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
                <Heart className="w-4 h-4" />
                Moving from "Compliance Officer" to "Culture Architect"
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            Superhuman HR & People Ops
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            Stop Policing Policies.<br />Start Architecting Culture.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Move from "Human Resources" to "Human Relations." This is the operating system for People Ops leaders who are tired of being viewed as the "Principal's Office" and are ready to build a workplace where humans actually thrive.
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
              Get the HR Playbook
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
              The "Fun Police" Trap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              You didn't get into HR to enforce policies. You got into it to{' '}
              <span className="text-[#f65625] font-bold">help people thrive</span>. But somewhere along the way, you became the "Fun Police"—the person employees groan about when you walk into the room.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Compliance Officer',
                arrow: '→',
                subtitle: 'Culture Architect',
                description: 'Instead of simply enforcing rules, you design systems that unlock potential.'
              },
              {
                title: 'Managing Liabilities',
                arrow: '→',
                subtitle: 'Unlocking Potential',
                description: 'Shift from protecting the company to empowering people to do their best work.'
              },
              {
                title: '"No, you can\'t"',
                arrow: '→',
                subtitle: '"Here is how we can"',
                description: 'Move from shutting down ideas to creatively solving problems.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-center mb-4">
                  <div className="text-lg font-bold text-gray-400 mb-2">{item.title}</div>
                  <div className="text-2xl text-[#f65625] font-black mb-2">{item.arrow}</div>
                  <div className="text-xl font-black text-[#142d63]">{item.subtitle}</div>
                </div>
                <p className="text-gray-600 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#142d63] to-[#1a3a7a] text-white p-8 md:p-12 rounded-2xl"
          >
            <p className="text-xl md:text-2xl leading-relaxed">
              <span className="font-black text-[#f65625]">Here's the truth:</span> Your company doesn't need another policy enforcer. It needs a{' '}
              <span className="font-bold">Culture Architect</span>—someone who doesn't just manage people but{' '}
              <span className="font-bold">loves them</span>. The Superhuman Framework gives you the tools to lead with both{' '}
              <span className="font-bold">strength and compassion</span>, creating workplaces where people don't just show up—they{' '}
              <span className="font-bold italic">come alive</span>.
            </p>
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
              Part 1: The 4 Cornerstones for HR Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These aren't feel-good buzzwords. They're the foundation of a culture where people thrive.
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Purpose</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Headhunter</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Community Builder</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                HR isn't about <span className="font-semibold">filling seats</span>. It's about{' '}
                <span className="font-bold text-[#142d63]">building community</span>. Your job is to create a place where people don't just work—they{' '}
                <span className="font-bold italic">belong</span>.
              </p>
              <div className="bg-[#f65625]/5 p-4 rounded-lg">
                <p className="text-sm text-[#142d63] font-medium">
                  <span className="font-black">Superhuman Shift:</span> Stop chasing resumes. Start cultivating relationships.
                </p>
              </div>
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Passion</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Policy Enforcer</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Employee Champion</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Policies exist to <span className="font-semibold">protect people</span>, not punish them. When you lead with{' '}
                <span className="font-bold text-[#142d63]">empathy and advocacy</span>, you become the person employees{' '}
                <span className="font-bold italic">run to</span>, not away from.
              </p>
              <div className="bg-[#f65625]/5 p-4 rounded-lg">
                <p className="text-sm text-[#142d63] font-medium">
                  <span className="font-black">Superhuman Shift:</span> Stop saying "no" by default. Start asking, "How can we make this work?"
                </p>
              </div>
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Persistence</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Emotional Fatigue</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Resilient Empathy</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                HR is <span className="font-semibold">emotionally exhausting</span>. But resilience isn't about{' '}
                <span className="font-bold text-[#142d63]">hardening your heart</span>—it's about{' '}
                <span className="font-bold italic">sustaining your compassion</span>.
              </p>
              <div className="bg-[#f65625]/5 p-4 rounded-lg">
                <p className="text-sm text-[#142d63] font-medium">
                  <span className="font-black">Superhuman Shift:</span> Stop burning out. Start building boundaries that protect your capacity to care.
                </p>
              </div>
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Love</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Managing Personnel</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Loving People</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Employees aren't <span className="font-semibold">problems to manage</span>. They're{' '}
                <span className="font-bold text-[#142d63]">humans to honor</span>. When you lead with love, you don't just create a better workplace—you{' '}
                <span className="font-bold italic">transform lives</span>.
              </p>
              <div className="bg-[#f65625]/5 p-4 rounded-lg">
                <p className="text-sm text-[#142d63] font-medium">
                  <span className="font-black">Superhuman Shift:</span> Stop viewing employees as assets. Start seeing them as souls.
                </p>
              </div>
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
              Part 2: The 10 H Pillars of Superhuman HR
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Character shapes how you lead. Action determines what you build.
            </p>
          </motion.div>

          {/* Character Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-black text-[#142d63] mb-8 text-center">Character</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  title: 'Humble',
                  description: 'Great HR leaders don\'t have all the answers—they have the humility to listen.'
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'Honest',
                  description: 'Trust is built on transparency. Tell the truth, even when it\'s hard.'
                },
                {
                  icon: <Church className="w-8 h-8" />,
                  title: 'Holiness',
                  description: 'Integrity isn\'t optional. Do the right thing, even when no one\'s watching.'
                },
                {
                  icon: <Smile className="w-8 h-8" />,
                  title: 'Happy',
                  description: 'Your energy sets the tone. If you\'re miserable, your culture will be too.'
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: 'Humanity',
                  description: 'Lead with compassion. Every employee is carrying something you can\'t see.'
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
            <h3 className="text-3xl font-black text-[#142d63] mb-8 text-center">Action</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Lightbulb className="w-8 h-8" />,
                  title: 'Helpful',
                  description: 'Your job is to remove obstacles, not create them. Be the solution.'
                },
                {
                  icon: <Apple className="w-8 h-8" />,
                  title: 'Healthy',
                  description: 'You can\'t pour from an empty cup. Prioritize your own well-being first.'
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: 'Hungry Hustle',
                  description: 'Great cultures don\'t happen by accident. They\'re built with intentional effort.'
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: 'Holistic Living',
                  description: 'Work is just one part of life. Support the whole person, not just the employee.'
                },
                {
                  icon: <Laugh className="w-8 h-8" />,
                  title: 'Humor',
                  description: 'Work doesn\'t have to be miserable. Laughter is the antidote to burnout.'
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
      <section id="cta" data-section className="py-32 bg-white relative overflow-hidden">
        <motion.div
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#F9FAFB] p-16 rounded-3xl shadow-xl border border-gray-100"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1, rotate: 360 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Download className="w-20 h-20 text-[#f65625] mx-auto mb-8" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-6">
              Get the HR Playbook
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              We've compiled the exact strategies, Sabbath protocols, and soul-care habits for Superhuman HR leaders into a comprehensive PDF guide. Join thousands of HR leaders who've ditched the policies and started loving people.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('framework')}
              className="bg-[#f65625] text-white px-12 py-6 rounded-full font-bold text-xl shadow-xl hover:bg-[#142d63] transition-colors flex items-center justify-center gap-3 mx-auto"
            >
              <Download className="w-6 h-6" />
              Download Playbook
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default HRPage;
