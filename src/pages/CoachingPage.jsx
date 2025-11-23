import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  User, Heart, Shield, TrendingUp, CheckCircle, X,
  ArrowRight, Zap, Target, Clock, MessageCircle, Compass
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

const CoachingPage = ({ navigate }) => {
  const [sectionsRead, setSectionsRead] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    track: '',
    challenge: '',
    readiness: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Section tracking refs
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const tracksRef = useRef(null);
  const philosophyRef = useRef(null);
  const formatRef = useRef(null);
  const applicationRef = useRef(null);

  // Track which sections have been read
  useEffect(() => {
    const observers = [
      { ref: problemRef, name: 'problem' },
      { ref: solutionRef, name: 'solution' },
      { ref: tracksRef, name: 'tracks' },
      { ref: philosophyRef, name: 'philosophy' },
      { ref: formatRef, name: 'format' },
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
      setSubmitMessage('Application received! We\'ll review and reach out within 48 hours.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        track: '',
        challenge: '',
        readiness: ''
      });
    }, 1500);
  };

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
              <Compass className="w-4 h-4" />
              Get the insight you can't see from where you're standing
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            Even Superhumans<br />Need a Guide
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            1:1 Mentorship & Executive Coaching
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            You can't read the label when you're inside the jar.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#f65625] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-white hover:text-[#f65625] transition-colors flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              Apply for Coaching
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section ref={problemRef} className="py-24 bg-white">
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
              The Higher You Climb,<br />The Harder It Gets
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
              <strong className="text-[#142d63]">High performance is lonely.</strong>
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Whether you are a CEO carrying the weight of a company, a Pastor carrying the weight of a church, or a High-Achiever trying to break through a glass ceiling—you eventually hit a wall that you cannot climb alone.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              You don't need more information. You have podcasts for that.
            </p>
            <p className="text-2xl text-[#f65625] font-bold leading-relaxed mb-6">
              You need insight.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              You need someone who isn't on your payroll and isn't impressed by your title. You need someone who can see your blind spots, challenge your excuses, and help you design a life that doesn't just <em>look good on paper</em>, but <strong>feels good in your soul</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE SOLUTION SECTION */}
      <section ref={solutionRef} className="py-24 bg-[#F9FAFB]">
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
              This isn't "Life Coaching."<br />This is Life Design.
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="prose prose-lg max-w-3xl mx-auto"
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                My coaching isn't about giving you a pep talk. It's about <strong className="text-[#f65625]">installing the Superhuman Operating System</strong> into your personal and professional life.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                We go deep into the <strong>4 Cornerstones</strong> (Who You Are) and the <strong>10 H Pillars</strong> (What You Do) to ensure you are winning in every area—not just the ones that show up on a spreadsheet.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CHOOSE YOUR TRACK SECTION */}
      <section ref={tracksRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-4"
            >
              Who I Work With
            </motion.h2>
          </motion.div>

          <div className="space-y-8">
            {/* Track 1: Executive Leader */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-gray-100 hover:border-[#f65625] transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#f65625] rounded-2xl flex items-center justify-center shrink-0">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-extrabold text-[#142d63] mb-3">
                    The Executive Leader
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide font-bold">
                    For: CEOs, Founders, C-Suite Executives
                  </p>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">The Battle:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Isolation, Decision Fatigue, Imposter Syndrome.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">The Work:</h4>
                      <p className="text-gray-600 leading-relaxed mb-3">
                        We work on the Leader, not just the business.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#f65625] shrink-0 mt-0.5" />
                          <span>We audit your <strong>Holiness</strong> (Integrity): Are you the same person in private as you are in public?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#f65625] shrink-0 mt-0.5" />
                          <span>We protect your <strong>Health</strong>: Ensuring you have the energy to lead.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#f65625] shrink-0 mt-0.5" />
                          <span>We clarify your <strong>Vision</strong>: Moving you from chaos to clarity.</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">The Outcome:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        You lead with confidence, sleep better at night, and build a legacy without burning down your personal life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Track 2: Ministry Leader */}
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
                    The Ministry Leader
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide font-bold">
                    For: Senior Pastors, Executive Pastors, Church Planters
                  </p>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">The Battle:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Burnout, Spiritual Dryness, The "Fishbowl" Pressure.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">The Work:</h4>
                      <p className="text-gray-600 leading-relaxed mb-3">
                        I become your safe place. You can't tell your Board everything. You can't tell your members everything. <strong className="text-[#028393]">You can tell me.</strong>
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#028393] shrink-0 mt-0.5" />
                          <span>We drop the "Pastor" mask and deal with the Human.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#028393] shrink-0 mt-0.5" />
                          <span>We focus on <strong>Rest</strong> (Sabbath as a command).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#028393] shrink-0 mt-0.5" />
                          <span>We realign you to lead out of Overflow, not obligation.</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">The Outcome:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        A ministry that outlasts you without destroying you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Track 3: Personal Growth Architect */}
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
                    The Personal Growth Architect
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide font-bold">
                    For: Entrepreneurs, Professionals feeling stuck, High-Achievers
                  </p>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">The Battle:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        "Is this it?", Lack of Purpose, Self-Sabotage.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">The Work:</h4>
                      <p className="text-gray-600 leading-relaxed mb-3">
                        This is the battle of <strong className="text-[#faaa68]">You vs. You</strong>.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#faaa68] shrink-0 mt-0.5" />
                          <span>We kill the inner critic using the <strong>Love</strong> cornerstone.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#faaa68] shrink-0 mt-0.5" />
                          <span>We build the habits of <strong>Hungry Hustle</strong> and <strong>Holistic Living</strong>.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#faaa68] shrink-0 mt-0.5" />
                          <span>We create a roadmap to get you from "Existing" to "Designing."</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">The Outcome:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        You wake up with a clear Purpose and the vitality to attack the day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MY PHILOSOPHY SECTION */}
      <section ref={philosophyRef} className="py-24 bg-[#F9FAFB]">
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
              What to Expect When We Work Together
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100"
              >
                <h3 className="font-bold text-xl text-[#142d63] mb-3 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#f65625]" />
                  I Am Not Your Cheerleader
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  I will encourage you, yes. But I am your coach. I love you enough to tell you the truth you are avoiding.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100"
              >
                <h3 className="font-bold text-xl text-[#142d63] mb-3 flex items-center gap-3">
                  <Target className="w-6 h-6 text-[#028393]" />
                  I Am Not Your Therapist
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We acknowledge the past, but we focus on the future. We focus on action.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100"
              >
                <h3 className="font-bold text-xl text-[#142d63] mb-3 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-[#faaa68]" />
                  H2H (Human to Human)
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  No corporate stiffness. We laugh. We dig deep. We get real. We do the work.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* THE FORMAT SECTION */}
      <section ref={formatRef} className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-4"
            >
              How It Works
            </motion.h2>
          </motion.div>

          <div className="space-y-8">
            {/* Step 1: The Assessment */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex items-start gap-6 bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#f65625] transition-all"
            >
              <div className="w-12 h-12 bg-[#f65625] rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="font-bold text-2xl text-[#142d63] mb-3">The Assessment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Before we ever get on a call, you complete a deep-dive audit of your current Cornerstones and Pillars. We establish your baseline.
                </p>
              </div>
            </motion.div>

            {/* Step 2: The Strategy Sessions */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex items-start gap-6 bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#028393] transition-all"
            >
              <div className="w-12 h-12 bg-[#028393] rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="font-bold text-2xl text-[#142d63] mb-3">The Strategy Sessions</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#028393] shrink-0 mt-0.5" />
                    <span><strong>Frequency:</strong> Bi-Weekly Zoom Calls (60 Minutes).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#028393] shrink-0 mt-0.5" />
                    <span><strong>Focus:</strong> One major block per session. No fluff. We identify the bottleneck and break it.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 3: The Access */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex items-start gap-6 bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#faaa68] transition-all"
            >
              <div className="w-12 h-12 bg-[#faaa68] rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="font-bold text-2xl text-[#142d63] mb-3">The Access</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <MessageCircle className="w-5 h-5 text-[#faaa68] shrink-0 mt-0.5" />
                    <span><strong>Async Coaching:</strong> You get direct access to me (via Voxer/Email) between calls. When s*** hits the fan on a Tuesday, you don't have to wait until our next call to get support.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* APPLICATION ONLY SECTION */}
      <section id="application-form" ref={applicationRef} className="py-24 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-6"
            >
              Is This a Fit?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8"
            >
              I take this work seriously, and I only take on a handful of 1:1 clients at a time to ensure I can give you my full energy.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-700 mb-6"
            >
              I am looking for people who are:
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-gray-100">
              <div className="w-12 h-12 bg-[#f65625]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-[#f65625]" />
              </div>
              <h3 className="font-bold text-lg text-[#142d63] mb-2">Humble</h3>
              <p className="text-gray-600 text-sm">Willing to learn.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-gray-100">
              <div className="w-12 h-12 bg-[#028393]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-[#028393]" />
              </div>
              <h3 className="font-bold text-lg text-[#142d63] mb-2">Honest</h3>
              <p className="text-gray-600 text-sm">Willing to tell the truth about where they are.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-gray-100">
              <div className="w-12 h-12 bg-[#faaa68]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-[#faaa68]" />
              </div>
              <h3 className="font-bold text-lg text-[#142d63] mb-2">Hungry</h3>
              <p className="text-gray-600 text-sm">Willing to do the hard work required to change.</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <p className="text-xl text-gray-700 font-medium">
              If that's you, let's talk.
            </p>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white rounded-3xl p-8 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="track" className="block text-sm font-bold text-gray-700 mb-2">
                Which Track describes you?
              </label>
              <select
                id="track"
                name="track"
                value={formData.track}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
              >
                <option value="">Select a track...</option>
                <option value="executive">Executive Leader</option>
                <option value="pastor">Ministry Leader</option>
                <option value="personal">Personal Growth Architect</option>
              </select>
            </div>

            <div>
              <label htmlFor="challenge" className="block text-sm font-bold text-gray-700 mb-2">
                What is the #1 challenge keeping you up at night?
              </label>
              <textarea
                id="challenge"
                name="challenge"
                value={formData.challenge}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800 resize-none"
                placeholder="Be honest about what's keeping you stuck..."
              ></textarea>
            </div>

            <div>
              <label htmlFor="readiness" className="block text-sm font-bold text-gray-700 mb-2">
                On a scale of 1-10, how ready are you to make a change?
              </label>
              <select
                id="readiness"
                name="readiness"
                value={formData.readiness}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
              >
                <option value="">Select your readiness level...</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            {submitMessage && (
              <div className="bg-[#028393]/10 border-2 border-[#028393] rounded-lg p-4 text-center">
                <p className="text-[#028393] font-bold">{submitMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#f65625] text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:bg-[#142d63] hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <User className="w-6 h-6" />
                  Submit Application
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="bg-gradient-to-br from-[#142d63] to-[#028393] rounded-3xl p-12 text-white shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Compass className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to See Your Blind Spots?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              You can't read the label when you're inside the jar. Let's get you out of the jar.
            </p>

            <button
              onClick={() => document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-block"
            >
              <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <span className="relative z-10 bg-white text-[#142d63] px-10 py-5 rounded-full font-bold text-lg shadow-lg group-hover:bg-[#f65625] group-hover:text-white transition-colors inline-flex items-center gap-2">
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoachingPage;
