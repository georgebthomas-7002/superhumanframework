import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Compass, Heart, Shield, Zap, Download, ArrowRight, CheckCircle,
  TrendingUp, Users, Target, Flame
} from 'lucide-react';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Subtle particle configuration
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

// Animated icon components
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

// Animation variants
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

const LeadershipPage = ({ navigate }) => {
  const [sectionsRead, setSectionsRead] = useState([]);

  // Section tracking refs
  const problemRef = useRef(null);
  const foundationRef = useRef(null);
  const habitsRef = useRef(null);
  const ctaRef = useRef(null);

  // Track which sections have been read
  useEffect(() => {
    const observers = [
      { ref: problemRef, name: 'problem' },
      { ref: foundationRef, name: 'foundation' },
      { ref: habitsRef, name: 'habits' },
      { ref: ctaRef, name: 'cta' }
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

  return (
    <div className="animate-fade-in">
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* HERO SECTION */}
      <section className="bg-[#142d63] text-white py-32 md:py-48 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#028393] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f65625] rounded-full blur-[120px] opacity-15"></div>
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
            <span className="text-[#faaa68]">Moving from "The Boss" to "The Leader"</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            Superhuman Leadership
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            The World Has Enough Bosses.<br />It Needs More Humans.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Stop managing tasks. Start igniting souls. This is the operating system for leaders who are tired of the "Command and Control" relic and are ready to build a legacy of trust, impact, and sustainable growth.
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
          </motion.div>
        </motion.div>
      </section>

      {/* THE PROBLEM */}
      <section ref={problemRef} className="py-32 bg-white relative overflow-hidden">
        <ParticleBackground color="#f65625" />

        <motion.div
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span
            variants={scaleIn}
            className="text-[#f65625] font-bold uppercase tracking-widest text-sm bg-[#f65625]/10 px-4 py-2 rounded-full inline-block mb-6"
          >
            The Reality • {sectionsRead.includes('problem') && <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />}
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold text-[#142d63] mb-8 tracking-tight"
          >
            The Silent Struggle of Success
          </motion.h2>

          <div className="text-xl text-gray-600 leading-relaxed space-y-6 text-left md:text-center mt-8">
            <motion.p variants={fadeInUp} className="text-2xl font-bold text-[#142d63]">
              You are successful on paper. The revenue is up. The team is growing.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-2xl font-bold text-[#f65625]">
              But you are drowning.
            </motion.p>
            <motion.p variants={fadeInUp}>
              You spend 80% of your day putting out fires you thought you hired other people to handle. You feel isolated at the top, caught between the demands of the board and the complaints of the staff.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-2xl font-bold text-[#142d63]">
              You are leading from Memory (how it used to be done), not Vision (how it should be done).
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-8">
              <p className="text-xl font-bold text-[#142d63] mb-6">The Superhuman Shift:</p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-8 bg-[#142d63]/5 rounded-3xl border border-[#142d63]/10 cursor-default"
                >
                  <p className="text-gray-600 mb-2">From: <span className="font-bold text-[#f65625]">The Fixer</span> (Reactive)</p>
                  <ArrowRight className="w-6 h-6 text-[#028393] mx-auto my-2" />
                  <p className="text-gray-600">To: <span className="font-bold text-[#028393]">The Architect</span> (Proactive)</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-8 bg-[#f65625]/5 rounded-3xl border border-[#f65625]/10 cursor-default"
                >
                  <p className="text-gray-600 mb-2">From: <span className="font-bold text-[#f65625]">Managing Tasks</span></p>
                  <ArrowRight className="w-6 h-6 text-[#028393] mx-auto my-2" />
                  <p className="text-gray-600">To: <span className="font-bold text-[#028393]">Leading a Mission</span></p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-8 bg-[#028393]/5 rounded-3xl border border-[#028393]/10 cursor-default"
                >
                  <p className="text-gray-600 mb-2">From: <span className="font-bold text-[#f65625]">Using People</span></p>
                  <ArrowRight className="w-6 h-6 text-[#028393] mx-auto my-2" />
                  <p className="text-gray-600">To: <span className="font-bold text-[#028393]">Serving Humans</span></p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PART 1: THE FOUNDATION */}
      <section ref={foundationRef} className="py-32 bg-[#F9FAFB] relative overflow-hidden">
        <ParticleBackground color="#142d63" />

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
              Part 1 • {sectionsRead.includes('foundation') && <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-extrabold text-[#142d63] mt-6 mb-4">
              How Leaders Use the 4 Cornerstones
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 mt-6 max-w-3xl mx-auto text-xl leading-relaxed">
              You cannot build a skyscraper on a swamp. Before you optimize your strategy, you must solidify your foundation.
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
                shift: 'Managing Tasks → Leading a Mission',
                desc: 'Most managers just move pile A to pile B. A Superhuman Leader knows why the pile exists. You provide the answer to the question, "Why are we here?" When you lead with Purpose, you stop chasing quarterly metrics and start chasing legacy.',
                AnimatedIcon: AnimatedCompass,
                audioKey: 'purpose'
              },
              {
                title: 'Passion',
                subtitle: 'The Fuel',
                shift: 'Delegating Work → Igniting Belief',
                desc: 'Passion is simply energy transfer. If you show up to the Zoom call bored, your team will be bored. If you show up with a fire in your belly, that heat spreads. Passion is the difference between compliance ("I have to do this") and commitment ("I get to do this").',
                AnimatedIcon: AnimatedFlame,
                audioKey: 'passion'
              },
              {
                title: 'Persistence',
                subtitle: 'The Anchor',
                shift: 'Panicking → Anchoring',
                desc: 'Leadership is easy when the graph is going up. But who are you when the market crashes? Persistence is the grit to hold the line. It\'s about being the anchor in the storm for your people. When they panic, they look at you. If you are persistent, they feel safe.',
                AnimatedIcon: AnimatedShield,
                audioKey: 'persistence'
              },
              {
                title: 'Love',
                subtitle: 'The Strategy',
                shift: 'Using People → Serving People',
                desc: 'This is the word most corporate leaders are afraid to use. Love in business isn\'t romance; it\'s radical care. It\'s the willingness to fight for your people, to advocate for their growth, and to see them as human beings, not just line items on a P&L. When your people know you love them, they will run through walls for you.',
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
                <p className="text-[#028393] font-bold text-sm mb-4 uppercase tracking-wide">The Shift: {item.shift}</p>
                <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PART 2: THE 10 H PILLARS */}
      <section ref={habitsRef} className="py-32 bg-[#142d63] text-white relative overflow-hidden">
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
              Part 2 • {sectionsRead.includes('habits') && <CheckCircle className="w-4 h-4 inline ml-2 text-green-400" />}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-extrabold mt-6 mb-4">
              The 10 H Pillars of Leadership
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300 mt-6 max-w-3xl mx-auto text-xl leading-relaxed">
              The daily behaviors that separate the "Bosses" from the "Superhumans."
            </motion.p>
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
              Character (The Internal Work)
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-10"
              variants={staggerContainer}
            >
              {[
                { name: 'Humble', desc: 'You take the blame when things go wrong and give away the credit when things go right. You kill the ego.' },
                { name: 'Honest', desc: 'You practice radical candor. You share the hard news early and transparently. No spin, just truth.' },
                { name: 'Holiness', desc: '(Integrity). You are "set apart" by your ethical standards. You are the same person in private as you are in public.' },
                { name: 'Happy', desc: 'Your mood is the weather of the organization. You choose to bring the sunshine to the boardroom.' },
                { name: 'Humanity', desc: 'You stop trying to be a robot. You admit when you don\'t know the answer. You show your scars to build trust.' }
              ].map((h) => (
                <motion.div
                  key={h.name}
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#f65625] hover:border-[#f65625] transition-all cursor-default group"
                >
                  <h4 className="font-bold text-2xl mb-3 group-hover:text-white transition-colors">{h.name}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white">{h.desc}</p>
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
              Action (The External Work)
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-10"
              variants={staggerContainer}
            >
              {[
                { name: 'Helpful', desc: 'Servant Leadership. Your first question is always, "What blockers can I remove for you?"' },
                { name: 'Healthy', desc: 'You model sustainability. You show your team that high performance requires rest. You can\'t pour from an empty cup.' },
                { name: 'Hungry Hustle', desc: 'You work on the business, not just in it. You are constantly pushing for innovation, never settling for the status quo.' },
                { name: 'Holistic Living', desc: 'You encourage work-life integration. You recognize your team has families, hobbies, and dreams outside of work.' },
                { name: 'Humor', desc: 'You take the mission seriously, but you don\'t take yourself too seriously. You use levity to defuse tension and build bonds.' }
              ].map((h) => (
                <motion.div
                  key={h.name}
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#028393] hover:border-[#028393] transition-all cursor-default group"
                >
                  <h4 className="font-bold text-2xl mb-3 group-hover:text-white transition-colors">{h.name}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white">{h.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section ref={ctaRef} className="py-32 bg-white relative overflow-hidden">
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
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-6">
              Get the Leadership Playbook
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-10 leading-relaxed">
              We've compiled the exact strategies, scripts, and habits for Superhuman Leaders into a comprehensive PDF guide.
            </motion.p>
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
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

export default LeadershipPage;
