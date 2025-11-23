import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Mic, Flame, Users, TrendingUp, CheckCircle, ArrowRight, Download,
  Zap, Heart, Play, Calendar, Mail, MapPin, Target
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

const SpeakerPage = ({ navigate }) => {
  const [sectionsRead, setSectionsRead] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDate: '',
    location: '',
    audienceSize: '',
    eventGoal: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Section tracking refs
  const problemRef = useRef(null);
  const menuRef = useRef(null);
  const promiseRef = useRef(null);
  const bookingRef = useRef(null);

  // Track which sections have been read
  useEffect(() => {
    const observers = [
      { ref: problemRef, name: 'problem' },
      { ref: menuRef, name: 'menu' },
      { ref: promiseRef, name: 'promise' },
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
      setSubmitMessage('Thanks! We\'ll be in touch within 24 hours.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        eventDate: '',
        location: '',
        audienceSize: '',
        eventGoal: ''
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
              <Mic className="w-4 h-4" />
              The Antidote to Boring Business Conferences
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            I Don't Just Speak.<br />I Ignite the Room.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            No fluff. No corporate jargon.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Just high-energy, actionable truth that transforms the culture before lunch.
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
              <Calendar className="w-5 h-5" />
              Check Availability
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-white hover:text-[#142d63] transition-colors border border-white/20 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Sizzle Reel
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section ref={problemRef} className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-extrabold text-[#142d63] mb-6"
            >
              Most Business Conferences Have a Problem...
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-3xl md:text-4xl text-[#f65625] font-bold mb-8"
            >
              They are boring.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="prose prose-lg max-w-3xl mx-auto"
          >
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              We've all been there. Sitting in a cold ballroom, scrolling through our phones while a speaker reads bullet points off a PowerPoint slide. It's uninspiring. It's forgettable. And frankly, it's a waste of time.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              <strong className="text-[#142d63]">Your audience deserves better.</strong>
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              They deserve a <span className="text-[#f65625] font-bold">Catalyst</span>.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              They deserve an experience that is equal parts <strong>"Education"</strong> and <strong>"Entertainment."</strong>
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              They deserve to walk out of the room <em>different</em> than they walked in.
            </p>
            <p className="text-2xl text-[#142d63] font-bold leading-relaxed mb-6">
              That is what I do.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              When I take the stage, I don't just deliver a speech. I <strong>install an Operating System</strong>. I challenge the status quo. I make them laugh, I make them think, and most importantly, <span className="text-[#f65625] font-bold">I make them move</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE MENU: SIGNATURE KEYNOTES */}
      <section ref={menuRef} className="py-24 bg-[#F9FAFB]">
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
              The Menu: Signature Keynotes
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600"
            >
              Choose the track that fits your event.
            </motion.p>
          </motion.div>

          <div className="space-y-8">
            {/* Option 1: The Superhuman Leader */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-gray-100 hover:border-[#f65625] transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#142d63] rounded-2xl flex items-center justify-center shrink-0">
                  <Flame className="w-8 h-8 text-[#faaa68]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-extrabold text-[#142d63] mb-3">
                    The Superhuman Leader
                  </h3>
                  <p className="text-xl text-[#f65625] font-bold mb-4">
                    "Stop Managing. Start Leading."
                  </p>
                  <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide font-bold">
                    Best For: Executive Summits, Leadership Retreats, Management Training
                  </p>
                  <div className="mb-6">
                    <h4 className="font-bold text-lg text-[#142d63] mb-3">The Talk:</h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The world doesn't need more bosses. It needs more humans. In this high-impact session, George breaks down the 4 Cornerstones that shift leaders from "Command and Control" to "Connection and Culture."
                    </p>
                    <h4 className="font-bold text-lg text-[#142d63] mb-3">The Takeaway:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Your leaders will leave with a blueprint to build trust, drive performance, and stop the burnout cycle.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Option 2: The H2H Revenue Revolution */}
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
                    The H2H Revenue Revolution
                  </h3>
                  <p className="text-xl text-[#028393] font-bold mb-4">
                    "Kill the Pitch & Connect with the Human."
                  </p>
                  <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide font-bold">
                    Best For: Sales Kickoffs (SKO), Marketing Conferences, Revenue Teams
                  </p>
                  <div className="mb-6">
                    <h4 className="font-bold text-lg text-[#142d63] mb-3">The Talk:</h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      B2B is dead. We are in the era of Human-to-Human (H2H). George dismantles "Commission Breath" and teaches your team how to win by being Helpful, Honest, and Human.
                    </p>
                    <h4 className="font-bold text-lg text-[#142d63] mb-3">The Takeaway:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Your team will stop chasing "leads" and start building "relationships" that actually close.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Option 3: Stop Drifting, Start Designing */}
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
                    Stop Drifting, Start Designing
                  </h3>
                  <p className="text-xl text-[#faaa68] font-bold mb-4">
                    "Win the Battle of You vs. You."
                  </p>
                  <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide font-bold">
                    Best For: All-Hands Meetings, Associations, Motivational Events
                  </p>
                  <div className="mb-6">
                    <h4 className="font-bold text-lg text-[#142d63] mb-3">The Talk:</h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Most people are running their lives on autopilot. This session is a wake-up call. George challenges the audience to kill the inner critic and embrace their Purpose and Passion.
                    </p>
                    <h4 className="font-bold text-lg text-[#142d63] mb-3">The Takeaway:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      A motivated, re-energized workforce that takes ownership of their potential.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE PLANNER PROMISE */}
      <section ref={promiseRef} className="py-24 bg-white">
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
              The "Zero Diva" Policy
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-700 leading-relaxed mb-8 text-center"
            >
              I know your job as an Event Planner is stressful. My goal is to be the <strong className="text-[#f65625]">easiest speaker</strong> you have ever worked with.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-700 leading-relaxed mb-8 text-center font-bold"
            >
              Here is my promise to you:
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#028393] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg text-[#142d63] mb-1">I Show Up Early</h4>
                  <p className="text-gray-700">Sound check happens on your schedule, not mine.</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#028393] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg text-[#142d63] mb-1">I Respect the Clock</h4>
                  <p className="text-gray-700">If you give me 45 minutes, I take 45 minutes. I never go over.</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#028393] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg text-[#142d63] mb-1">I Bring the Energy</h4>
                  <p className="text-gray-700">Whether I'm the opening keynote at 8 AM or the closing slot after lunch, I bring 110% fire.</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#028393] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg text-[#142d63] mb-1">No Weird Demands</h4>
                  <p className="text-gray-700">No green M&Ms. Just water and a mic.</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl font-bold text-[#142d63] text-center mb-12"
          >
            Trusted by Event Planners at:
          </motion.h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-12 opacity-40"
          >
            <div className="text-3xl font-bold text-gray-400">[Logo]</div>
            <div className="text-3xl font-bold text-gray-400">[Logo]</div>
            <div className="text-3xl font-bold text-gray-400">[Logo]</div>
            <div className="text-3xl font-bold text-gray-400">[Logo]</div>
            <div className="text-3xl font-bold text-gray-400">[Logo]</div>
          </motion.div>
        </div>
      </section>

      {/* BOOKING INQUIRY FORM */}
      <section id="booking-form" ref={bookingRef} className="py-24 bg-white">
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
              Let's Blow the Roof Off Your Next Event
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600"
            >
              Dates fill up fast. Tell me about your event, and let's see if we're a fit.
            </motion.p>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="eventDate" className="block text-sm font-bold text-gray-700 mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                  placeholder="City, State"
                />
              </div>
            </div>

            <div>
              <label htmlFor="audienceSize" className="block text-sm font-bold text-gray-700 mb-2">
                Estimated Audience Size
              </label>
              <input
                type="text"
                id="audienceSize"
                name="audienceSize"
                value={formData.audienceSize}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800"
                placeholder="e.g., 200-300"
              />
            </div>

            <div>
              <label htmlFor="eventGoal" className="block text-sm font-bold text-gray-700 mb-2">
                What is the #1 Goal of this Event?
              </label>
              <textarea
                id="eventGoal"
                name="eventGoal"
                value={formData.eventGoal}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800 resize-none"
                placeholder='e.g., "We want them to leave feeling..."'
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
                  Submit Inquiry
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#F9FAFB] py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="bg-white rounded-3xl p-12 shadow-xl border-2 border-gray-100">
            <motion.div
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-gradient-to-br from-[#f65625] to-[#faaa68] rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Download className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-6">
              Ready to Transform Your Event?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's create an experience your audience will never forget.
            </p>

            <button
              onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#f65625] to-[#faaa68] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <span className="relative z-10 bg-[#f65625] text-white px-10 py-5 rounded-full font-bold text-lg shadow-lg group-hover:bg-white group-hover:text-[#f65625] transition-colors inline-flex items-center gap-2">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeakerPage;
