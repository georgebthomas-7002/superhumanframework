import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Compass, Heart, Shield, Zap, Download, ArrowRight, CheckCircle,
  TrendingUp, Handshake, Target
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

const SalesPage = ({ navigate }) => {
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
              <TrendingUp className="w-4 h-4" />
              Moving from "Transactional Pusher" to "Trusted Advisor"
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            Superhuman Sales
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            Kill Commission Breath.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Stop pitching. Start partnering. This is the operating system for sales professionals who are tired of the "Wolf of Wall Street" grind and are ready to build trust, close deals, and sleep well at night.
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
            The "Pitch" Trap
          </motion.h2>

          <div className="text-xl text-gray-600 leading-relaxed space-y-6 text-left md:text-center mt-8">
            <motion.p variants={fadeInUp} className="text-2xl font-bold text-[#142d63]">
              We need to talk about the smell.
            </motion.p>
            <motion.p variants={fadeInUp}>
              You know it. It's that desperate, pushy, "I need this deal to hit my quota" energy that prospects can smell from a mile away. It's called Commission Breath, and it is killing your deals.
            </motion.p>
            <motion.p variants={fadeInUp}>
              For decades, sales training taught us to be aggressive. Handle the objection. Push for the close. Manipulate the "Yes."
            </motion.p>
            <motion.p variants={fadeInUp} className="text-2xl font-bold text-[#f65625]">
              But your buyers changed.
            </motion.p>
            <motion.p variants={fadeInUp}>
              They are smarter. They have Google. They know your pricing before they ever get on the Zoom call. They don't need a "Closer." They need a Guide.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-8">
              <p className="text-xl font-bold text-[#142d63] mb-6">The Superhuman Shift:</p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-8 bg-[#142d63]/5 rounded-3xl border border-[#142d63]/10 cursor-default"
                >
                  <p className="text-gray-600 mb-2">From: <span className="font-bold text-[#f65625]">Transactional Pusher</span></p>
                  <ArrowRight className="w-6 h-6 text-[#028393] mx-auto my-2" />
                  <p className="text-gray-600">To: <span className="font-bold text-[#028393]">Trusted Advisor</span></p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-8 bg-[#f65625]/5 rounded-3xl border border-[#f65625]/10 cursor-default"
                >
                  <p className="text-gray-600 mb-2">From: <span className="font-bold text-[#f65625]">Always Be Closing</span></p>
                  <ArrowRight className="w-6 h-6 text-[#028393] mx-auto my-2" />
                  <p className="text-gray-600">To: <span className="font-bold text-[#028393]">Always Be Helping</span></p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-8 bg-[#028393]/5 rounded-3xl border border-[#028393]/10 cursor-default"
                >
                  <p className="text-gray-600 mb-2">From: <span className="font-bold text-[#f65625]">Pitching</span></p>
                  <ArrowRight className="w-6 h-6 text-[#028393] mx-auto my-2" />
                  <p className="text-gray-600">To: <span className="font-bold text-[#028393]">Partnering</span></p>
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
              How Sales Pros Use the 4 Cornerstones
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 mt-6 max-w-3xl mx-auto text-xl leading-relaxed">
              You cannot sell what you do not believe in. Before you pick up the phone, check your intent.
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
                subtitle: 'The Solution',
                shift: 'Hitting Quota → Solving Problems',
                desc: 'Selling isn\'t about extracting money; it\'s about providing solutions. If you aren\'t solving a problem, you are being a nuisance. If your product doesn\'t actually help the person on the other end of the line, don\'t sell it. When you shift from "getting" to "giving," the pressure disappears.',
                AnimatedIcon: AnimatedCompass
              },
              {
                title: 'Passion',
                subtitle: 'The Conviction',
                shift: 'Faking Enthusiasm → Genuine Belief',
                desc: 'You cannot sell what you do not believe in. Period. Passion is simply the transfer of conviction. If you don\'t believe—in your bones—that your solution is going to change their business, your voice will betray you. You can\'t fake this.',
                AnimatedIcon: AnimatedFlame
              },
              {
                title: 'Persistence',
                subtitle: 'The Service',
                shift: 'Nagging → Relentless Service',
                desc: 'We all know sales is a game of rejection. But Persistence isn\'t about nagging. It\'s the resilience to hear "No" 99 times and still bring your best, most helpful self to the 100th call. It is follow-up done with value, not annoyance.',
                AnimatedIcon: AnimatedShield
              },
              {
                title: 'Love',
                subtitle: 'The Care',
                shift: 'Viewing as a Lead → Viewing as a Human',
                desc: 'You have to care about the prospect\'s outcome more than your commission check. Love in sales means you love them enough to say, "Hey, honestly? We aren\'t the right fit for you right now." That level of care builds a reputation that closes deals for years to come.',
                AnimatedIcon: AnimatedHeart
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
              The 10 H Pillars of Sales
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300 mt-6 max-w-3xl mx-auto text-xl leading-relaxed">
              The daily behaviors that turn a "Vendor" into a "Partner."
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
              Character (The Inner Work)
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-10"
              variants={staggerContainer}
            >
              {[
                { name: 'Humble', desc: 'You listen 80% of the time and talk 20% of the time. Drop the "Know-It-All" ego and become the "Investigator."' },
                { name: 'Honest', desc: 'No hidden fees. No over-promising features that don\'t exist yet. Build trust by being the one salesperson who tells the ugly truth.' },
                { name: 'Holiness', desc: '(Integrity). You don\'t sell ice to Eskimos. You protect your reputation at all costs. You are safe to do business with.' },
                { name: 'Happy', desc: 'Sales is a transfer of emotion. If you are stressed and desperate, the prospect smells it. If you are happy and confident, they buy into that energy.' },
                { name: 'Humanity', desc: 'Throw away the robotic script. Connect on a human level first. Be a human talking to a human.' }
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
                { name: 'Helpful', desc: 'The Consultative Sale. Your goal is to educate the prospect so they can make the best decision—even if that decision is not to buy from you.' },
                { name: 'Healthy', desc: 'Sales is an endurance sport. You prioritize sleep and mental health so you don\'t burn out in Q3. You can\'t perform on empty.' },
                { name: 'Hungry Hustle', desc: 'You don\'t wait for Marketing to give you leads. You hunt. But you hunt with intelligence and purpose, not desperation.' },
                { name: 'Holistic Living', desc: 'You don\'t sacrifice your family on the altar of the Deal. A balanced life makes you a more relatable and grounded salesperson.' },
                { name: 'Humor', desc: 'Money talks are awkward. Contracts are tense. Use humor to break the ice and lower defenses. People buy from people they enjoy being around.' }
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
              Get the Sales Playbook
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-10 leading-relaxed">
              We've compiled the exact strategies, scripts, and habits for Superhuman Sellers into a comprehensive PDF guide.
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

export default SalesPage;
