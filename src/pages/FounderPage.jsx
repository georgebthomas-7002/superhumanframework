import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Megaphone, Heart, Target, Shield, Zap, ArrowRight,
  Sparkles, User, BookOpen, Users
} from 'lucide-react';

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

const FounderPage = ({ navigate }) => {
  const [sectionsRead, setSectionsRead] = useState([]);

  // Section tracking refs
  const originRef = useRef(null);
  const pivotRef = useRef(null);
  const philosophyRef = useRef(null);
  const roleRef = useRef(null);
  const feamRef = useRef(null);

  // Track which sections have been read
  useEffect(() => {
    const observers = [
      { ref: originRef, name: 'origin' },
      { ref: pivotRef, name: 'pivot' },
      { ref: philosophyRef, name: 'philosophy' },
      { ref: roleRef, name: 'role' },
      { ref: feamRef, name: 'feam' }
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
              <Sparkles className="w-4 h-4" />
              I mastered the machine. Then I realized the humans were broken.
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            I'm George B. Thomas.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            Speaker. Catalyst. Guide.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="prose prose-lg prose-invert max-w-3xl mx-auto"
          >
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              For the last decade, you probably knew me as <strong className="text-white">"The HubSpot Guy."</strong>
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              I hold world records for certifications. I've trained thousands of companies. I've helped organizations generate millions in revenue.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              But after 10 years of fixing businesses, I realized something terrifying:
            </p>
            <p className="text-2xl text-[#f65625] font-bold leading-relaxed">
              We were optimizing the software, but destroying the soul.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* THE ORIGIN STORY SECTION */}
      <section ref={originRef} className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-extrabold text-[#142d63] mb-8"
            >
              The Day the Hoodie & Hat<br />Stopped Being Enough
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="prose prose-lg max-w-3xl mx-auto"
          >
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              I didn't start as a guru. I started as a <strong className="text-[#142d63]">high school dropout</strong> who was hungry for a better life.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              I hustled. I learned. I became obsessed with "Inbound" and the power of connecting people to solutions.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              I spent years on the road, standing on stages in my signature hoodie and hat, teaching marketers how to use automation, workflows, and CRMs. I brought the energy. I became the "fixer" for broken sales funnels.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              But then I started looking closer at the leaders I was helping.
            </p>

            <ul className="space-y-3 mb-6 text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#f65625] font-bold">•</span>
                <span>I saw CEOs who hit their revenue targets but hadn't had dinner with their families in a month.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#f65625] font-bold">•</span>
                <span>I saw Sales Reps who were crushing quotas but were visibly shaking from anxiety.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#f65625] font-bold">•</span>
                <span>I saw Pastors who were growing their churches but losing their faith.</span>
              </li>
            </ul>

            <p className="text-2xl text-[#f65625] font-bold leading-relaxed mb-6">
              I realized that better software doesn't fix a broken operating system.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              If you give a Ferrari to a driver who hasn't slept in three days, they don't win the race. <strong className="text-[#142d63]">They crash faster.</strong>
            </p>

            <p className="text-xl text-gray-700 leading-relaxed">
              I realized I was teaching people how to <em>do</em> more, but they didn't know how to <strong className="text-[#f65625]">be</strong> more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE PIVOT SECTION */}
      <section ref={pivotRef} className="py-24 bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-8 text-center"
            >
              Why I Built the<br />Superhuman Framework
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="prose prose-lg max-w-3xl mx-auto"
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                I didn't create this framework to write a book. <strong className="text-[#f65625]">I created it because I needed it.</strong>
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                I needed a way to balance the <strong>"Hungry Hustle"</strong> of building a legacy with the <strong>"Holistic Living"</strong> required to be a good father and husband.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                I needed a way to be a <strong className="text-[#f65625]">"Beast"</strong> in business but a <strong className="text-[#028393]">"Servant"</strong> in life.
              </p>
              <p className="text-2xl text-[#142d63] font-bold leading-relaxed mb-6">
                I realized that the strategies we use to grow companies—Purpose, Passion, Persistence, Love—are the exact same strategies we need to grow humans.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                So, I stopped just teaching the tool (HubSpot).
              </p>
              <p className="text-2xl text-[#f65625] font-bold leading-relaxed">
                I started teaching the Human.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* THE PHILOSOPHY SECTION */}
      <section ref={philosophyRef} className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-12 text-center"
            >
              It's Not B2B.<br />It's H2H.
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="prose prose-lg max-w-3xl mx-auto mb-12"
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                My philosophy is simple: <strong className="text-[#f65625]">Business is Human-to-Human.</strong>
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-[#f65625]/10 to-[#faaa68]/10 rounded-2xl p-6 border-2 border-[#f65625]/20"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  You aren't managing <em>"resources"</em>; you are <strong className="text-[#f65625]">leading humans</strong>.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-[#028393]/10 to-[#028393]/5 rounded-2xl p-6 border-2 border-[#028393]/20"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  You aren't selling to <em>"leads"</em>; you are <strong className="text-[#028393]">helping humans</strong>.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-[#142d63]/10 to-[#142d63]/5 rounded-2xl p-6 border-2 border-[#142d63]/20"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  You aren't marketing to <em>"segments"</em>; you are <strong className="text-[#142d63]">connecting with humans</strong>.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="prose prose-lg max-w-3xl mx-auto mt-12"
            >
              <p className="text-2xl text-[#f65625] font-bold leading-relaxed mb-4">
                When you get the Human part right, the business part gets easy.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-3">
                When you fix the leader, the team heals.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                When you fix the culture, the profits follow.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MY ROLE NOW SECTION */}
      <section ref={roleRef} className="py-24 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-6 text-center"
            >
              I Am a Catalyst
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 italic text-center mb-12 max-w-3xl mx-auto"
            >
              <strong>Definition:</strong> A substance that increases the rate of a chemical reaction without itself undergoing any permanent chemical change.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-700 leading-relaxed text-center mb-12 max-w-3xl mx-auto"
            >
              I come into your organization to speed up the reaction. To ignite the fire. To get you unstuck.
            </motion.p>

            <div className="space-y-8">
              {/* As a Speaker */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-gray-100 hover:border-[#f65625] transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#f65625] rounded-2xl flex items-center justify-center shrink-0">
                    <Megaphone className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-extrabold text-[#142d63] mb-3">
                      As a Speaker
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      I wake up the room. I don't do boring. I bring the hard truths wrapped in humor and energy.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* As a Coach */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-gray-100 hover:border-[#028393] transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#028393] rounded-2xl flex items-center justify-center shrink-0">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-extrabold text-[#142d63] mb-3">
                      As a Coach
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      I am the safe harbor for leaders who are tired of wearing the mask. I help you design a life that feels as good as it looks on paper.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* As a Guide */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-gray-100 hover:border-[#faaa68] transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#faaa68] rounded-2xl flex items-center justify-center shrink-0">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-extrabold text-[#142d63] mb-3">
                      As a Guide
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      I help you install the Superhuman Operating System so you can stop drifting and start designing.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE "FEAM" SECTION */}
      <section ref={feamRef} className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-12 text-center"
            >
              Who I Am When<br />the Mic is Off
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-[#142d63] to-[#028393] rounded-3xl p-12 text-white shadow-2xl mb-8"
            >
              <div className="text-center mb-8">
                <Users className="w-16 h-16 text-[#faaa68] mx-auto mb-4" />
                <h3 className="text-3xl font-extrabold mb-4">The FEAM</h3>
                <p className="text-xl text-gray-200 mb-2">(Family + Team)</p>
              </div>

              <div className="prose prose-lg prose-invert max-w-3xl mx-auto">
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  I hustle for my <strong className="text-white">last name</strong>, not my first.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Everything I do is for my family. We call ourselves <strong className="text-[#faaa68]">"The FEAM"</strong> (Family + Team).
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  I believe that <strong className="text-white">Humor is a holy weapon</strong>.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  I believe that <strong className="text-white">Love is a business strategy</strong>.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  And I believe that you have a reservoir of potential inside you that you haven't even tapped yet.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 border-2 border-gray-100 text-center"
            >
              <p className="text-2xl text-[#142d63] font-bold leading-relaxed mb-4">
                My goal isn't to be your guru.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                My goal is to be the <strong className="text-[#f65625]">mirror</strong> that shows you who you really are—and who you could be.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-24 bg-gradient-to-br from-[#142d63] to-[#1a3a7a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleIn}
              className="mb-8"
            >
              <Shield className="w-20 h-20 text-[#faaa68] mx-auto" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-extrabold mb-6"
            >
              Ready to Upgrade Your OS?
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-2xl mb-12 text-gray-300 font-bold"
            >
              We have work to do. Let's stop talking about it and start being about it.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('speaking')}
                className="bg-[#f65625] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-white hover:text-[#f65625] transition-colors flex items-center justify-center gap-2"
              >
                <Megaphone className="w-5 h-5" />
                Book George to Speak
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('framework')}
                className="bg-white/10 text-white border-2 border-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-white hover:text-[#142d63] transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <BookOpen className="w-5 h-5" />
                Explore the Framework
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FounderPage;
