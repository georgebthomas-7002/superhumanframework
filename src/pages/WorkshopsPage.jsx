import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Users, TrendingUp, Heart, LifeBuoy, Megaphone, CheckCircle, X,
  ArrowRight, Zap, Target, Clock, MapPin, Mail, Building
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

const WorkshopsPage = ({ navigate }) => {
  const [sectionsRead, setSectionsRead] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    track: '',
    format: '',
    teamSize: '',
    painPoint: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Section tracking refs
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const tracksRef = useRef(null);
  const formatsRef = useRef(null);
  const whoRef = useRef(null);
  const bookingRef = useRef(null);

  // Track which sections have been read
  useEffect(() => {
    const observers = [
      { ref: problemRef, name: 'problem' },
      { ref: solutionRef, name: 'solution' },
      { ref: tracksRef, name: 'tracks' },
      { ref: formatsRef, name: 'formats' },
      { ref: whoRef, name: 'who' },
      { ref: bookingRef, name: 'booking' }
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
      setSubmitMessage('Thanks! We\'ll reach out within 24 hours to discuss your workshop.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        track: '',
        format: '',
        teamSize: '',
        painPoint: ''
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
              <Users className="w-4 h-4" />
              Get in the trenches and fix the culture
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            Move from Inspiration<br />to Implementation
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            Keynotes inspire, but workshops transform.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Bring George in to install the Superhuman Operating System directly into your team's DNA.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#f65625] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-white hover:text-[#f65625] transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Inquire About Workshops
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
              The "Monday Morning" Problem
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
              We've all seen it happen.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Your team goes to a conference. They get hyped up. They listen to a great speaker. They take notes. They feel the energy.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Then… <strong>Monday Morning hits</strong>.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              The emails pile up. The fires start burning. The inspiration fades. And within 48 hours, everyone is back to the same old habits, the same old conflicts, and the same old results.
            </p>
            <p className="text-2xl text-[#f65625] font-bold leading-relaxed mb-6">
              Information alone doesn't change behavior.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              To change a culture, you don't need a speech. You need a <strong className="text-[#142d63]">System</strong>.
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
              This is Not a Lecture. It's a Lab.
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="prose prose-lg max-w-3xl mx-auto"
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                My workshops aren't about me standing at a podium reading slides while your team checks their email.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                These are high-octane, <strong className="text-[#f65625]">interactive Labs</strong>.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                We roll up our sleeves. We have the hard conversations. We dismantle the roadblocks holding you back, and we rebuild your team's operating system using the <strong>4 Cornerstones</strong> and <strong>10 H Pillars</strong>.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                We don't just talk about "Trust" or "Hustle"—we build the roadmap to <em>actually do it</em>.
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
              Tailored to Your Battleground
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600"
            >
              We don't do generic. We contextualize the Framework to the specific department you are trying to fix.
            </motion.p>
          </motion.div>

          <div className="space-y-8">
            {/* Track 1: Sales */}
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
                    Superhuman SALES
                  </h3>
                  <p className="text-xl text-[#f65625] font-bold mb-6">
                    "From Commission Breath to Collaborative Breath"
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Problem:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Your team is pushing too hard, sounding robotic, and getting blocked.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Work:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        We kill the pitch. We role-play the "Humble Inquiry." We rebuild your sales process to be Helpful, Honest, and Human.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Outcome:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Your team leaves as Trusted Advisors, not pushy vendors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Track 2: Marketing */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-gray-100 hover:border-[#028393] transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#028393] rounded-2xl flex items-center justify-center shrink-0">
                  <Megaphone className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-extrabold text-[#142d63] mb-3">
                    Superhuman MARKETING
                  </h3>
                  <p className="text-xl text-[#028393] font-bold mb-6">
                    "From Noise Makers to Trusted Guides"
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Problem:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        You are creating content that checks a box but doesn't connect with a soul.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Work:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        We audit your messaging for "Corporate Speak" and replace it with "Human Speak." We align your team on Purpose and Passion.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Outcome:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        A marketing engine that builds genuine H2H (Human to Human) connection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Track 3: HR */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-gray-100 hover:border-[#faaa68] transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#faaa68] rounded-2xl flex items-center justify-center shrink-0">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-extrabold text-[#142d63] mb-3">
                    Superhuman HR & CULTURE
                  </h3>
                  <p className="text-xl text-[#faaa68] font-bold mb-6">
                    "From Compliance to Connection"
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Problem:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        You are viewed as the "Fun Police" or the "Principal's Office."
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Work:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        We redesign the employee experience. We move from "Gatekeeping" to "Pathfinding." We give your HR team the tools to be the Happy, Healthy heart of the organization.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Outcome:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        A culture that attracts top talent and retains them for the long haul.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Track 4: Service */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-gray-100 hover:border-[#142d63] transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#142d63] rounded-2xl flex items-center justify-center shrink-0">
                  <LifeBuoy className="w-8 h-8 text-[#faaa68]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-extrabold text-[#142d63] mb-3">
                    Superhuman SERVICE
                  </h3>
                  <p className="text-xl text-[#142d63] font-bold mb-6">
                    "From Tickets to Wins"
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Problem:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Your support team feels like a "Human Shield," absorbing anger and burning out.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Work:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        We burn the scripts. We teach de-escalation through Love and Patience. We shift the metric from "Speed" to "Success."
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">• The Outcome:</h4>
                      <p className="text-gray-600 leading-relaxed">
                        A support team that turns angry users into raving fans.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR FORMAT SECTION */}
      <section ref={formatsRef} className="py-24 bg-[#F9FAFB]">
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
              How We Deliver It
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Option 1: Jumpstart */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all"
            >
              <div className="w-12 h-12 bg-[#028393]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-6 h-6 text-[#028393]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#142d63] mb-3 text-center">
                The Superhuman Jumpstart
              </h3>
              <p className="text-sm text-gray-500 mb-4 text-center uppercase tracking-wide font-bold">
                1/2 Day Virtual Workshop
              </p>
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">The Vibe:</h4>
                  <p className="text-gray-600 text-sm">Fast, Focused, Foundational.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">Best For:</h4>
                  <p className="text-gray-600 text-sm">Remote teams needing a "Culture Reset" or language alignment.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">Deliverable:</h4>
                  <p className="text-gray-600 text-sm">The team learns the common language of the Framework and identifies their #1 Blocker.</p>
                </div>
              </div>
            </motion.div>

            {/* Option 2: Culture Catalyst */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="bg-gradient-to-br from-[#f65625] to-[#faaa68] text-white rounded-3xl p-8 shadow-2xl transform scale-105 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#142d63] text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-extrabold mb-3 text-center">
                The Culture Catalyst
              </h3>
              <p className="text-sm mb-4 text-center uppercase tracking-wide font-bold opacity-90">
                1 Full Day On-Location
              </p>
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-bold mb-2">The Vibe:</h4>
                  <p className="text-sm opacity-90">High Energy, Deep Connection, Breakthrough.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Best For:</h4>
                  <p className="text-sm opacity-90">Sales Kickoffs (SKO), Department Retreats, or teams stuck in a rut.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Deliverable:</h4>
                  <p className="text-sm opacity-90">We audit your team against the 10 Pillars, identify blind spots, and build a concrete 90-day action plan.</p>
                </div>
              </div>
            </motion.div>

            {/* Option 3: Mastermind */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all"
            >
              <div className="w-12 h-12 bg-[#142d63]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-6 h-6 text-[#142d63]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#142d63] mb-3 text-center">
                The Mastermind Deep Dive
              </h3>
              <p className="text-sm text-gray-500 mb-4 text-center uppercase tracking-wide font-bold">
                2 Full Days On-Location
              </p>
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">The Vibe:</h4>
                  <p className="text-gray-600 text-sm">Strategic, Transformational, Intensive.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">Best For:</h4>
                  <p className="text-gray-600 text-sm">Executive Leadership Teams, Crisis Turnarounds, or Mergers.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">Deliverable:</h4>
                  <p className="text-gray-600 text-sm">A complete cultural transformation. We tear down the old habits and build a custom "Constitution" for how your team operates.</p>
                </div>
              </div>
            </motion.div>
          </div>
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
              Can We Handle the Heat?
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* NOT FOR */}
              <motion.div
                variants={fadeInUp}
                className="bg-red-50 border-2 border-red-200 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-3">
                  <X className="w-6 h-6" />
                  These workshops are NOT for:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Teams who just want to "check a box."</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Leaders who aren't willing to be vulnerable.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Companies who want a "polite" speaker to tell them they are doing a great job.</span>
                  </li>
                </ul>
              </motion.div>

              {/* ARE FOR */}
              <motion.div
                variants={fadeInUp}
                className="bg-green-50 border-2 border-green-200 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  These workshops ARE for:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Leaders who are tired of the status quo.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Teams who are hungry for greatness.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Humans who are ready to stop drifting and start designing.</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BOOKING INQUIRY FORM */}
      <section id="booking-form" ref={bookingRef} className="py-24 bg-[#F9FAFB]">
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
              className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-4"
            >
              Ready to Upgrade Your Team?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600"
            >
              Dates fill up fast. Let's get your workshop on the calendar.
            </motion.p>
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
                  Contact Name
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
              <label htmlFor="company" className="block text-sm font-bold text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                placeholder="Your company"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="track" className="block text-sm font-bold text-gray-700 mb-2">
                  Which Track?
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
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="hr">HR & Culture</option>
                  <option value="service">Service</option>
                  <option value="leadership">Leadership</option>
                </select>
              </div>

              <div>
                <label htmlFor="format" className="block text-sm font-bold text-gray-700 mb-2">
                  Which Format?
                </label>
                <select
                  id="format"
                  name="format"
                  value={formData.format}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                >
                  <option value="">Select a format...</option>
                  <option value="virtual">Virtual (1/2 Day)</option>
                  <option value="1-day">1-Day On-Location</option>
                  <option value="2-day">2-Day On-Location</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="teamSize" className="block text-sm font-bold text-gray-700 mb-2">
                Estimated Team Size
              </label>
              <input
                type="text"
                id="teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                placeholder="e.g., 15-20 people"
              />
            </div>

            <div>
              <label htmlFor="painPoint" className="block text-sm font-bold text-gray-700 mb-2">
                The "One Thing": What is the #1 pain point your team is facing right now?
              </label>
              <textarea
                id="painPoint"
                name="painPoint"
                value={formData.painPoint}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800 resize-none"
                placeholder="Tell us what's keeping your team from peak performance..."
              ></textarea>
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
                  <Zap className="w-6 h-6" />
                  Inquire About Workshops
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
              <Users className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Don't Just Learn It. Install It.
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's transform your team from the inside out. No fluff. No theory. Just implementation.
            </p>

            <button
              onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-block"
            >
              <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <span className="relative z-10 bg-white text-[#142d63] px-10 py-5 rounded-full font-bold text-lg shadow-lg group-hover:bg-[#f65625] group-hover:text-white transition-colors inline-flex items-center gap-2">
                Start the Conversation
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopsPage;
