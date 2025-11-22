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
  Download,
  LifeBuoy
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

const ServicePage = ({ navigate }) => {
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
          id="tsparticles-service"
          options={particlesOptions}
          className="absolute inset-0 pointer-events-none"
        />
      )}

      {/* Hero Section */}
      <section id="hero" data-section className="bg-[#142d63] text-white py-32 md:py-48 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#028393] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f65625] rounded-full blur-[120px] opacity-15"></div>

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

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold backdrop-blur-sm">
              <span className="text-[#faaa68] flex items-center gap-2">
                <LifeBuoy className="w-4 h-4" />
                Moving from "Ticket Resolver" to "Success Partner"
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            Superhuman Service
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            Stop Closing Tickets.<br />Start Creating Wins.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Move from being a "Human Shield" to a "Revenue Engine." This is the operating system for Customer Success and Support teams who are tired of reading robotic scripts and are ready to turn angry users into raving fans.
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
              The "Human Shield" Trap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Let's be honest about what it feels like to work in Support today.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              You are the frontline. You are the first person people talk to when they are angry, confused, or broken. And how does the company measure you?{' '}
              <span className="text-[#f65625] font-bold">Speed.</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-8 rounded-2xl border border-gray-200"
            >
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#f65625] rounded-full mt-2 flex-shrink-0"></div>
                  <span>"Average Handle Time."</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#f65625] rounded-full mt-2 flex-shrink-0"></div>
                  <span>"Tickets Closed Per Hour."</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#142d63] to-[#1a3a7a] text-white p-8 rounded-2xl"
            >
              <p className="text-lg leading-relaxed">
                You are being treated like a factory worker on an assembly line, but instead of building widgets, you are{' '}
                <span className="font-bold text-[#faaa68]">fixing complex human emotions</span>.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-black text-[#142d63] mb-6">The Result:</h3>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              You feel like a "Human Shield." You absorb impact all day. You read from a script because you don't have time to think. You burn out because you are absorbing negative energy without the tools to process it.
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
                  from: 'Ticket Resolver (Reactive)',
                  to: 'Success Partner (Proactive)'
                },
                {
                  from: 'Managing Anger',
                  to: 'Serving Humans'
                },
                {
                  from: '"I\'m Sorry"',
                  to: '"I\'m Owning This"'
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
              How Service Pros Use the 4 Cornerstones
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto italic">
              You cannot create happy customers if you are a miserable employee. Before you pick up the headset, check your intent.
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Purpose: The Hero</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Closing Tickets</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Creating Wins</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                You aren't just fixing bugs or resetting passwords; you are{' '}
                <span className="font-bold text-[#142d63]">saving the customer's day</span>. You are the reason they can send payroll on time or finish their project. When you view your role as the "Hero" rather than the "Fixer," the drudgery disappears.
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Passion: The Empathy</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Apathy</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Empathy</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                It is easy to go numb after the 50th call of the day. Passion in Service looks like{' '}
                <span className="font-bold text-[#142d63]">Empathy</span>. It means bringing the same energy to the last customer of the day as you did to the first. It's the "Grandma Rule"—treating every ticket like it's your own grandmother asking for help.
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Persistence: The Ownership</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Deflecting</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Owning</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                The average rep says, "That's not my department." The Superhuman Rep says,{' '}
                <span className="font-bold text-[#142d63]">"I've got you."</span> Persistence means sticking with the problem until it is fully resolved, not just passing the buck. You become the quarterback for the customer's success.
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
                  <h3 className="text-2xl font-black text-[#142d63] mb-2">Love: The Patience</h3>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-400 font-semibold">Managing Anger</span>
                    <ArrowRight className="w-5 h-5 text-[#f65625]" />
                    <span className="text-[#f65625] font-bold">Serving Humans</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                This is the hardest one. You have to love the customer enough to be patient when they are yelling. Love allows you to{' '}
                <span className="font-bold text-[#142d63]">see past their anger to their fear</span>. It allows you to be the thermostat (setting the temperature), not the thermometer (reacting to it).
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
              Part 2: The 10 H Pillars of Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The daily behaviors that turn a "Cost Center" into a "Retention Engine."
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
                  description: '"I don\'t know, but I will find out." You admit when the company messed up without being defensive.'
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'Honest',
                  description: 'Radical Transparency. If the server is down, say it. Don\'t spin. Trust is built when you tell the truth even when it hurts.'
                },
                {
                  icon: <Church className="w-8 h-8" />,
                  title: 'Holiness (Trust)',
                  description: 'You keep your promises. If you say "I\'ll call back at 2 PM," you call back at 2 PM.'
                },
                {
                  icon: <Smile className="w-8 h-8" />,
                  title: 'Happy',
                  description: 'Your tone is audible. If you are smiling, they can hear it. You bring relief, not stress, to the conversation.'
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: 'Humanity',
                  description: 'Burn the script. Talk like a person. Use emojis (if appropriate). Be real. Connection happens when you drop the "Corporate Voice."'
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
                  description: 'Proactive Service. "Since we fixed X, you might run into Y next. Here is a guide to help you avoid that."'
                },
                {
                  icon: <Apple className="w-8 h-8" />,
                  title: 'Healthy',
                  description: 'Emotional Hygiene. You need to "shower off" the negativity of the day so you don\'t take it home to your family.'
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: 'Hungry Hustle',
                  description: 'Speed matters, but accuracy matters more. You hustle to find the root cause, not just apply a band-aid.'
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: 'Holistic Living',
                  description: 'Leave the angry customers at the office. Protect your peace so you can come back fresh tomorrow.'
                },
                {
                  icon: <Laugh className="w-8 h-8" />,
                  title: 'Humor',
                  description: 'Diffuse tension. A well-timed, appropriate joke can turn a 1-star review into a 5-star raving fan.'
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
              Get the Service Playbook
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              We've compiled the exact strategies, scripts, and de-escalation techniques for{' '}
              <span className="font-bold text-[#f65625]">Superhuman Service Pros</span> into a comprehensive PDF guide.
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
              Join thousands of Service Pros who've ditched the scripts and started serving humans.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
