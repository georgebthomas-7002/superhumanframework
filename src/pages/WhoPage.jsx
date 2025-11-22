import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";
import {
  ArrowRight,
  Compass,
  Heart,
  TrendingUp,
  Megaphone,
  LifeBuoy,
  Church,
  User,
  Sparkles,
  Target
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

const WhoPage = ({ navigate }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
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

  const verticals = [
    {
      icon: <Compass className="w-10 h-10" />,
      title: 'For LEADERS',
      shift: 'From Transactional Manager → To Visionary Leader',
      struggle: 'You are successful on paper, but drowning in the day-to-day. You feel isolated at the top and spend your time fighting fires instead of building the future.',
      promise: 'We use the framework to build a culture of Purpose and Trust so you can stop managing tasks and start leading a mission.',
      link: 'leadership',
      linkText: 'Explore Leadership'
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: 'For HR & PEOPLE OPS',
      shift: 'From Compliance Police → To Culture Architect',
      struggle: 'You are stuck in the middle—protecting the company from lawsuits while trying to protect employees from burnout. You are tired of being the "Department of No."',
      promise: 'We move you from "Human Resources" to "Human Relations." We give you the tools to prioritize Humanity so your company becomes a place people never want to leave.',
      link: 'hr',
      linkText: 'Explore HR'
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: 'For SALES TEAMS',
      shift: 'From Commission Chaser → To Trusted Advisor',
      struggle: 'You are fighting "Commission Breath" and skeptical prospects. The old "Always Be Closing" tactics are getting you blocked.',
      promise: 'We kill the pitch. We replace pressure with Helpfulness. We teach your team how to use Honesty to disarm prospects and close deals through trust.',
      link: 'sales',
      linkText: 'Explore Sales'
    },
    {
      icon: <Megaphone className="w-10 h-10" />,
      title: 'For MARKETING TEAMS',
      shift: 'From Noise Maker → To Trusted Guide',
      struggle: 'You are fighting the algorithm and shouting into the void. You feel like a robot writing for other robots.',
      promise: 'We install the H2H (Human to Human) philosophy. We align your messaging with Passion so you stop interrupting strangers and start connecting with humans.',
      link: 'marketing',
      linkText: 'Explore Marketing'
    },
    {
      icon: <LifeBuoy className="w-10 h-10" />,
      title: 'For SERVICE & SUPPORT',
      shift: 'From Ticket Resolver → To Success Partner',
      struggle: 'You feel like a "Human Shield," absorbing customer anger all day. You are measured by speed, not impact.',
      promise: 'We turn your Support team into a Revenue Engine. We use Empathy and Persistence to turn angry users into raving fans.',
      link: 'service',
      linkText: 'Explore Service'
    },
    {
      icon: <Church className="w-10 h-10" />,
      title: 'For PASTORS & MINISTRY',
      shift: 'From Religious Duty → To Spiritual Overflow',
      struggle: 'You are saving the world but losing your soul (and your family). You feel the pressure to be a CEO, Therapist, and Theologian all at once.',
      promise: 'We help you put down the heavy burden of performance. We focus on Holiness and Rest so you can lead God\'s people from a place of joy, not obligation.',
      link: 'pastors',
      linkText: 'Explore Ministry'
    },
    {
      icon: <User className="w-10 h-10" />,
      title: 'For PERSONAL GROWTH',
      shift: 'From Drifting → To Designing',
      struggle: 'You are fighting the "Script" society wrote for you. You feel stuck, bored, or like you are living on autopilot.',
      promise: 'This is the battle of You vs. You. We help you discover your Purpose and build the daily habits of Holistic Living to design a life that feels as good as it looks.',
      link: 'personal',
      linkText: 'Explore Personal Growth'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">
      <ReadingProgress />

      {init && (
        <Particles
          id="tsparticles-who"
          options={particlesOptions}
          className="absolute inset-0 pointer-events-none"
        />
      )}

      {/* Hero Section */}
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

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold backdrop-blur-sm">
              <span className="text-[#faaa68]">One Framework. Infinite Applications.</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            The Superhuman Framework<br />Meets You Where You Are.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            The DNA never changes.<br />But the battleground does.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            "Hustle" looks different for a CEO than it does for a Pastor. "Love" looks different for a Sales Rep than it does for an HR Director. Most frameworks fail because they are rigid. They try to force everyone into the same box. The Superhuman Framework is fluid. It adapts to your specific role, your specific pain points, and your specific goals.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl text-white font-bold"
          >
            Find your battleground below.
          </motion.p>
        </div>
      </section>

      {/* Directory Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#142d63] mb-6">
              Choose Your Path
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {verticals.map((vertical, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:scale-105"
              >
                <div className="p-8">
                  {/* Icon */}
                  <div className="text-[#f65625] mb-6 transform group-hover:scale-110 transition-transform">
                    {vertical.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-[#142d63] mb-4">
                    {vertical.title}
                  </h3>

                  {/* The Shift */}
                  <div className="mb-4">
                    <p className="text-sm font-bold text-[#f65625] mb-2">The Shift:</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{vertical.shift}</p>
                  </div>

                  {/* The Struggle */}
                  <div className="mb-4">
                    <p className="text-sm font-bold text-[#142d63] mb-2">The Struggle:</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{vertical.struggle}</p>
                  </div>

                  {/* The Promise */}
                  <div className="mb-6">
                    <p className="text-sm font-bold text-[#142d63] mb-2">The Promise:</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{vertical.promise}</p>
                  </div>

                  {/* Link */}
                  <button
                    onClick={() => navigate(vertical.link)}
                    className="group/btn w-full bg-gradient-to-r from-[#f65625] to-[#ff7a47] text-white px-6 py-3 rounded-full font-bold text-sm hover:from-[#142d63] hover:to-[#1a3a7a] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {vertical.linkText}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Bucket Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#142d63] mb-8">
              Don't See Your Role?
            </h2>

            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 mb-8">
              <div className="space-y-4 text-xl text-gray-600 mb-8">
                <p>"George, I'm a teacher."</p>
                <p>"I'm a stay-at-home parent."</p>
                <p>"I'm a creative freelancer."</p>
              </div>

              <p className="text-2xl font-black text-[#f65625] mb-6">
                Good news: You are still a Human.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                The Superhuman Framework is, at its core, about <span className="font-bold text-[#142d63]">Humanity</span>. Even if you don't fit into one of the corporate buckets above, the principles of Purpose, Passion, Persistence, and Love apply to you.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Start with the <span className="font-bold text-[#142d63]">Personal Growth</span> track. It is the universal foundation for everyone.
              </p>

              <button
                onClick={() => navigate('personal')}
                className="group bg-gradient-to-r from-[#f65625] to-[#ff7a47] text-white px-10 py-5 rounded-full font-black text-lg hover:from-[#142d63] hover:to-[#1a3a7a] transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105"
              >
                Start with Personal Growth
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Assessment CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#142d63] to-[#1a3a7a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <Sparkles className="w-16 h-16 text-[#faaa68] mx-auto" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Still Not Sure?
            </h2>

            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-bold">
              Let the algorithm decide.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
              Answer 3 simple questions to find out which Superhuman Archetype you need right now. We will analyze your pain points and point you to the exact Playbook you need.
            </p>

            <button
              onClick={() => navigate('framework')}
              className="group bg-[#f65625] text-white px-10 py-5 rounded-full font-black text-xl hover:bg-white hover:text-[#142d63] transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <Target className="w-6 h-6" />
              Take the Assessment
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhoPage;
