import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Users, Shield, TrendingUp, Zap, CheckCircle, X,
  ArrowRight, MessageCircle, Target, Heart, Clock, Award, DollarSign
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

const MastermindPage = ({ navigate }) => {
  const [sectionsRead, setSectionsRead] = useState([]);
  const [cohortStatus, setCohortStatus] = useState('OPEN'); // OPEN or REVIEWING or FULL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    role: '',
    organization: '',
    whyJoin: '',
    superpower: '',
    kryptonite: '',
    readyToInvest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Section tracking refs
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const experienceRef = useRef(null);
  const investmentRef = useRef(null);
  const whoRef = useRef(null);
  const applicationRef = useRef(null);

  // Track which sections have been read
  useEffect(() => {
    const observers = [
      { ref: problemRef, name: 'problem' },
      { ref: solutionRef, name: 'solution' },
      { ref: experienceRef, name: 'experience' },
      { ref: investmentRef, name: 'investment' },
      { ref: whoRef, name: 'who' },
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
      setSubmitMessage('Application received! We\'ll review and respond within 72 hours.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        linkedin: '',
        role: '',
        organization: '',
        whyJoin: '',
        superpower: '',
        kryptonite: '',
        readyToInvest: ''
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
              <Shield className="w-4 h-4" />
              Never Fight Alone Again
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            The Inner Circle for<br />Superhuman Growth
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed font-bold"
          >
            A year-long, curated community of 20 humans dedicated to living the framework, holding the line, and growing together.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-[#faaa68] mb-12 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            Limited to 20 Spots. By Application Only.
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
              <Users className="w-5 h-5" />
              Apply for the 2026 Cohort
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
              The Most Dangerous Thing<br />You Can Do is Drift Alone
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
              We all know the saying: <strong className="text-[#142d63]">"It's lonely at the top."</strong>
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              But it's not just lonely. <strong className="text-[#f65625]">It's dangerous.</strong>
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              When you are the one everyone else looks to for answers—whether you are a CEO, a Pastor, or a Founder—you stop having a safe place to ask your own questions.
            </p>

            <ul className="space-y-3 mb-6 text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#f65625] font-bold">•</span>
                <span>Who challenges you?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#f65625] font-bold">•</span>
                <span>Who calls you out on your excuses?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#f65625] font-bold">•</span>
                <span>Who celebrates your wins without jealousy?</span>
              </li>
            </ul>

            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Most high-achievers drift because they lack <strong>Community</strong>. They have employees, they have fans, and they have families. But they don't have <strong className="text-[#028393]">Peers</strong>.
            </p>

            <p className="text-2xl text-[#f65625] font-bold leading-relaxed mb-3">
              You need a War Room.
            </p>
            <p className="text-2xl text-[#028393] font-bold leading-relaxed">
              And you need a Support Group.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mt-6">
              You need a circle of humans who are fighting the same battle you are.
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
              Welcome to The Superhuman<br />Mastermind
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="prose prose-lg max-w-3xl mx-auto"
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                This is not a course. There are no pre-recorded videos to watch.
              </p>
              <p className="text-2xl text-[#f65625] font-bold leading-relaxed mb-8">
                This is a living, breathing ecosystem of excellence.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                We are curating a group of <strong className="text-[#142d63]">20 Humans</strong> who are committed to installing the Superhuman Framework into every inch of their lives.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#f65625] shrink-0 mt-1" />
                  <div>
                    <p className="text-lg font-bold text-[#142d63] mb-1">We Cross-Pollinate:</p>
                    <p className="text-gray-700">Pastors learn from CEOs. CEOs learn from Creatives. The diversity is the strength.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#028393] shrink-0 mt-1" />
                  <div>
                    <p className="text-lg font-bold text-[#142d63] mb-1">We Go Deep:</p>
                    <p className="text-gray-700">No surface-level small talk. We deal with the real numbers and the real struggles.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#faaa68] shrink-0 mt-1" />
                  <div>
                    <p className="text-lg font-bold text-[#142d63] mb-1">We Hold the Line:</p>
                    <p className="text-gray-700">Accountability is the currency of this room.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* THE EXPERIENCE SECTION */}
      <section ref={experienceRef} className="py-24 bg-white">
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
              What Happens Inside?
            </motion.h2>
          </motion.div>

          <div className="space-y-8">
            {/* Component 1: Bi-Weekly War Rooms */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-gray-100 hover:border-[#f65625] transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#f65625] rounded-2xl flex items-center justify-center shrink-0">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-extrabold text-[#142d63] mb-3">
                    1. Bi-Weekly War Rooms (2x Month)
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We meet virtually twice a month for 90 minutes.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-[#f65625] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#142d63]">The Deep Dive:</strong> We unpack one of the 10 H Pillars and apply it to real-time challenges.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-[#f65625] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#142d63]">The Hot Seat:</strong> One member gets "The Chair." You present your biggest challenge, and the collective genius of the room (facilitated by George) solves it in real-time.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Component 2: Support Group */}
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
                    2. The "Superhuman" Support Group
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This is a safe harbor. <strong className="text-[#028393]">What is said in the Mastermind stays in the Mastermind.</strong>
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    It is a place to be <strong>Humble</strong> (admit you're struggling), <strong>Honest</strong> (share the real data), and <strong>Human</strong> (drop the mask).
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Component 3: 24/7 Lifeline */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-gray-100 hover:border-[#faaa68] transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#faaa68] rounded-2xl flex items-center justify-center shrink-0">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-extrabold text-[#142d63] mb-3">
                    3. The 24/7 Lifeline
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    You get access to our private community channel. When you hit a wall on a Tuesday afternoon, you have <strong className="text-[#faaa68]">19 other Superhumans and George</strong> ready to help you break through it instantly.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE INVESTMENT SECTION */}
      <section ref={investmentRef} className="py-24 bg-[#F9FAFB]">
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
              A Seat at the Table
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-700 text-center mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              This group is capped strictly at <strong className="text-[#f65625]">20 members</strong>.<br />
              Once the seats are full, the doors close until next year.
            </motion.p>

            {/* Pricing Cards */}
            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 mb-12"
            >
              {/* Monthly Option */}
              <motion.div
                variants={scaleIn}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#142d63] mb-2">Monthly</h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <DollarSign className="w-8 h-8 text-[#f65625]" />
                    <span className="text-5xl font-extrabold text-[#142d63]">1,000</span>
                    <span className="text-gray-500 text-lg">/ month</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#f65625] shrink-0 mt-0.5" />
                    <span className="text-gray-700">Bi-weekly War Rooms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#f65625] shrink-0 mt-0.5" />
                    <span className="text-gray-700">24/7 Community Access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#f65625] shrink-0 mt-0.5" />
                    <span className="text-gray-700">Hot Seat Opportunities</span>
                  </li>
                </ul>
              </motion.div>

              {/* Yearly Option - Featured */}
              <motion.div
                variants={scaleIn}
                className="bg-gradient-to-br from-[#f65625] to-[#faaa68] text-white rounded-3xl p-8 shadow-2xl transform scale-105 relative"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#142d63] text-white px-4 py-1 rounded-full text-sm font-bold">
                  BEST VALUE
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Yearly</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <DollarSign className="w-8 h-8" />
                    <span className="text-5xl font-extrabold">9,000</span>
                    <span className="text-white/90 text-lg">/ year</span>
                  </div>
                  <p className="text-white/90 text-sm font-bold">Save $3,000 (25% discount)</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>Bi-weekly War Rooms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>24/7 Community Access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>Hot Seat Opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-5 h-5 shrink-0 mt-0.5" />
                    <span><strong>Full commitment discount</strong></span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* What You're Buying */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 border-2 border-gray-100"
            >
              <h3 className="text-2xl font-bold text-[#142d63] mb-4">What you are buying:</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You aren't paying for "Zoom calls."
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                You are paying for <strong className="text-[#f65625]">Access</strong>. You are paying for <strong className="text-[#028393]">Accountability</strong>. You are paying for the <strong className="text-[#142d63]">one idea, connection, or breakthrough</strong> that will likely pay for the entire year in a single month.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHO IS THIS FOR SECTION */}
      <section ref={whoRef} className="py-24 bg-white">
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
              Are You One of the 20?
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-700 text-center mb-12 leading-relaxed"
            >
              We curate this room carefully. We are looking for a specific DNA:
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="space-y-6 mb-12"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-[#f65625]/10 to-[#faaa68]/10 rounded-2xl p-6 border-2 border-[#f65625]/20"
              >
                <h3 className="font-bold text-xl text-[#142d63] mb-2 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-[#f65625]" />
                  The Givers
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  You are willing to share your wisdom to help others grow.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-[#028393]/10 to-[#028393]/5 rounded-2xl p-6 border-2 border-[#028393]/20"
              >
                <h3 className="font-bold text-xl text-[#142d63] mb-2 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-[#028393]" />
                  The Growers
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  You are actively trying to improve, not just maintain.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-[#142d63]/10 to-[#142d63]/5 rounded-2xl p-6 border-2 border-[#142d63]/20"
              >
                <h3 className="font-bold text-xl text-[#142d63] mb-2 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#142d63]" />
                  The Gritty
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  You aren't looking for a pity party; you're looking for a breakthrough.
                </p>
              </motion.div>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 text-center italic"
            >
              This room includes a mix of <strong>Executives</strong>, <strong>Business Owners</strong>, <strong>Ministry Leaders</strong>, and <strong>High-Performance Creatives</strong>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* APPLICATION & WAITLIST SECTION */}
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
              Claim Your Spot
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="inline-block bg-white rounded-full px-6 py-3 shadow-lg border-2 border-gray-100"
            >
              <p className="text-lg">
                <strong className="text-[#142d63]">Status:</strong>{' '}
                <span className={`font-bold ${cohortStatus === 'OPEN' ? 'text-green-600' : cohortStatus === 'REVIEWING' ? 'text-orange-600' : 'text-red-600'}`}>
                  Applications for the 2026 Cohort are currently {cohortStatus}
                </span>
              </p>
            </motion.div>
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
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email *
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
              <label htmlFor="linkedin" className="block text-sm font-bold text-gray-700 mb-2">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-2">
                  Current Role *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                  placeholder="e.g., CEO, Pastor, Founder"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-bold text-gray-700 mb-2">
                  Organization *
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                  placeholder="Company or Church name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="whyJoin" className="block text-sm font-bold text-gray-700 mb-2">
                Why do you want to join this Mastermind? (Be specific.) *
              </label>
              <textarea
                id="whyJoin"
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800 resize-none"
                placeholder="Tell us what you hope to gain from this experience..."
              ></textarea>
            </div>

            <div>
              <label htmlFor="superpower" className="block text-sm font-bold text-gray-700 mb-2">
                What is the "Superpower" you bring to the group? *
              </label>
              <textarea
                id="superpower"
                name="superpower"
                value={formData.superpower}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800 resize-none"
                placeholder="What unique expertise, experience, or perspective do you offer?"
              ></textarea>
            </div>

            <div>
              <label htmlFor="kryptonite" className="block text-sm font-bold text-gray-700 mb-2">
                What is the "Kryptonite" you need help with? *
              </label>
              <textarea
                id="kryptonite"
                name="kryptonite"
                value={formData.kryptonite}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800 resize-none"
                placeholder="What's your biggest challenge or blind spot right now?"
              ></textarea>
            </div>

            <div>
              <label htmlFor="readyToInvest" className="block text-sm font-bold text-gray-700 mb-2">
                Are you ready to commit to the financial investment? *
              </label>
              <select
                id="readyToInvest"
                name="readyToInvest"
                value={formData.readyToInvest}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
              >
                <option value="">Select an option...</option>
                <option value="yes-yearly">Yes - Yearly ($9,000)</option>
                <option value="yes-monthly">Yes - Monthly ($1,000/month)</option>
                <option value="need-discussion">Need to discuss with my team/spouse</option>
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
                  <Users className="w-6 h-6" />
                  Apply for the Mastermind
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </motion.form>

          {/* Priority Waitlist Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16 bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 text-center"
          >
            <Clock className="w-12 h-12 text-[#028393] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#142d63] mb-3">Planning Ahead?</h3>
            <p className="text-lg text-gray-600 mb-4">Get First Dibs on the Next Cohort.</p>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              Because this group is limited to 20 humans, spots for the next year often fill up before we ever publicly launch them. If you know you want in for the next round, join the <strong>Priority List</strong>. You get the application link 48 hours before the public.
            </p>
            <button
              onClick={() => {
                // This could trigger a separate waitlist form or modal
                alert('Priority Waitlist feature coming soon!');
              }}
              className="bg-[#028393] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#142d63] transition-colors inline-flex items-center gap-2"
            >
              Join Priority Waitlist
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
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
              <Shield className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Never Fight Alone Again
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join a curated circle of 20 high-performers who are committed to growth, accountability, and excellence.
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

export default MastermindPage;
