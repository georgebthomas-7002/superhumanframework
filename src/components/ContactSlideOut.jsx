import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Linkedin, Instagram, Youtube, ArrowRight, Clock } from 'lucide-react';

const ContactSlideOut = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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
      setSubmitMessage('Message sent! We\'ll respond within 24-48 business hours.');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });

      // Auto-close after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setSubmitMessage('');
      }, 3000);
    }, 1500);
  };

  return (
    <>
      {/* Tab Button - Always Visible */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 bg-[#f65625] text-white px-4 py-6 rounded-l-lg shadow-xl z-40 hover:bg-[#142d63] transition-colors"
        style={{
          top: '35%',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }}
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-lg font-bold tracking-wider">CONTACT US</span>
      </motion.button>

      {/* Slide-Out Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Content */}
              <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-4xl font-extrabold text-[#142d63] mb-3">
                    Let's Connect.
                  </h2>
                  <p className="text-xl text-gray-600 font-bold">
                    No bots. No black holes. Just us.
                  </p>
                </div>

                {/* The "No Void" Promise */}
                <div className="bg-gradient-to-br from-[#f65625]/10 to-[#faaa68]/10 rounded-2xl p-6 mb-8 border-2 border-[#f65625]/20">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    "Whether you want to book a keynote, apply for coaching, or just say hi—<strong className="text-[#142d63]">a real human</strong> (likely me or my team) reads every single message."
                  </p>

                  <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                    <Clock className="w-5 h-5 text-[#028393] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#142d63] mb-1">Our Response Time:</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We practice <strong>Healthy boundaries</strong>. We respond within <strong className="text-[#f65625]">24-48 business hours</strong>. If it's the weekend, we're with our families (and you should be too).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#142d63] mb-6">
                    How can we be Helpful today?
                  </h3>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                        Your Name *
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
                        Email Address *
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

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f65625] focus:outline-none transition-colors text-gray-800 resize-none"
                        placeholder="How can we help you today?"
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
                      className="w-full bg-[#f65625] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#142d63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-8 border-t-2 border-gray-100">
                  <h4 className="text-xl font-bold text-[#142d63] mb-3">
                    Need an answer faster?
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Come hang out where the conversation is happening right now.
                  </p>

                  <div className="space-y-3 mb-6">
                    <a
                      href="https://www.linkedin.com/in/georgebthomas/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#0077b5] rounded-lg flex items-center justify-center shrink-0">
                        <Linkedin className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 group-hover:text-[#f65625] transition-colors">LinkedIn</p>
                        <p className="text-sm text-gray-500">Daily Insights</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#f65625] transition-colors" />
                    </a>

                    <a
                      href="https://www.instagram.com/georgebthomas/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-lg flex items-center justify-center shrink-0">
                        <Instagram className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 group-hover:text-[#f65625] transition-colors">Instagram</p>
                        <p className="text-sm text-gray-500">Behind the Scenes</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#f65625] transition-colors" />
                    </a>

                    <a
                      href="https://www.youtube.com/@georgebthomas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#FF0000] rounded-lg flex items-center justify-center shrink-0">
                        <Youtube className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 group-hover:text-[#f65625] transition-colors">YouTube</p>
                        <p className="text-sm text-gray-500">Deep Dives</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#f65625] transition-colors" />
                    </a>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-bold text-gray-700 mb-2">Email Direct:</p>
                    <a
                      href="mailto:george@georgebthomas.com"
                      className="flex items-center gap-2 text-[#f65625] font-bold hover:text-[#142d63] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      george@georgebthomas.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactSlideOut;
