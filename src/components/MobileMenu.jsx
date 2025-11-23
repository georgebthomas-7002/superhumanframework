import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronDown, ChevronRight, Linkedin, Instagram, Youtube,
  Mail, ArrowRight, Sparkles
} from 'lucide-react';

const MobileMenu = ({ isOpen, onClose, navigate, godMode }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleNavigate = (route) => {
    navigate(route);
    onClose();
  };

  const menuSections = [
    {
      id: 'framework',
      title: 'The Framework',
      route: 'the-framework',
      items: null
    },
    {
      id: 'who',
      title: "Who It's For",
      route: 'who',
      items: [
        { label: 'Leaders', route: 'leadership' },
        { label: 'HR & People Ops', route: 'hr' },
        { label: 'Marketing', route: 'marketing' },
        { label: 'Sales', route: 'sales' },
        { label: 'Service', route: 'service' },
        { label: 'Individuals', route: 'personal' },
        { label: 'Pastors', route: 'pastors' },
      ]
    },
    {
      id: 'services',
      title: 'Services',
      route: null,
      items: [
        { label: 'Keynote Speaking', route: 'speaking' },
        { label: 'Team Workshops', route: 'workshops' },
        { label: '1:1 Coaching', route: 'coaching' },
        { label: 'The Mastermind', route: 'mastermind' },
      ]
    },
    {
      id: 'resources',
      title: 'Resources',
      route: 'resources',
      items: null
    },
    {
      id: 'about',
      title: 'About',
      route: null,
      items: [
        { label: 'The Founder', route: 'founder' },
      ]
    },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/georgebthomas/',
      color: 'bg-[#0077b5]',
      description: 'Daily Insights'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/georgebthomas/',
      color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
      description: 'Behind the Scenes'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@georgebthomas',
      color: 'bg-[#FF0000]',
      description: 'Deep Dives'
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed right-0 top-0 h-full w-full z-50 overflow-y-auto ${
              godMode
                ? 'bg-gradient-to-br from-black via-gray-900 to-black'
                : 'bg-gradient-to-br from-[#142d63] via-[#028393] to-[#142d63]'
            }`}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-white"
                  style={{
                    width: Math.random() * 200 + 100,
                    height: Math.random() * 200 + 100,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Content Container */}
            <div className="relative z-10 pb-20">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/20">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-6 h-6 text-[#faaa68]" />
                  <span className="text-white font-bold text-lg">Menu</span>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-8 h-8 text-white" />
                </motion.button>
              </div>

              {/* Navigation Sections */}
              <div className="px-6 py-8 space-y-2">
                {menuSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {/* Section Header */}
                    <button
                      onClick={() => {
                        if (section.items) {
                          toggleSection(section.id);
                        } else {
                          handleNavigate(section.route);
                        }
                      }}
                      className="w-full flex items-center justify-between py-4 px-4 rounded-xl hover:bg-white/10 transition-all group"
                    >
                      <span className="text-white text-xl font-bold group-hover:text-[#faaa68] transition-colors">
                        {section.title}
                      </span>
                      {section.items ? (
                        <motion.div
                          animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-6 h-6 text-[#faaa68]" />
                        </motion.div>
                      ) : (
                        <ChevronRight className="w-6 h-6 text-[#faaa68] opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {section.items && expandedSection === section.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-8 pr-4 py-2 space-y-1">
                            {section.items.map((item, itemIndex) => (
                              <motion.button
                                key={item.route}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: itemIndex * 0.05 }}
                                onClick={() => handleNavigate(item.route)}
                                className="w-full text-left py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all text-lg font-medium"
                              >
                                {item.label}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Assessment CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="px-6 mb-8"
              >
                <button
                  onClick={() => handleNavigate('quiz')}
                  className="w-full bg-gradient-to-r from-[#f65625] to-[#faaa68] text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-[#f65625]/50 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-6 h-6" />
                  Take Assessment
                </button>
              </motion.div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="px-6 py-6 border-t border-white/20"
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-[#faaa68]" />
                  Get In Touch
                </h3>

                {/* Direct Email */}
                <a
                  href="mailto:george@georgebthomas.com"
                  className="block w-full bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 hover:bg-white/20 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-medium mb-1">Email Direct</p>
                      <p className="text-white font-bold group-hover:text-[#faaa68] transition-colors">
                        george@georgebthomas.com
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#faaa68] group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>

                {/* Social Links */}
                <div className="mb-4">
                  <p className="text-white/60 text-sm font-medium mb-3">Connect with us</p>
                  <div className="grid grid-cols-3 gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 hover:scale-105 transition-all group"
                      >
                        <div className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <social.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white text-xs font-medium">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Response Time Note */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <p className="text-white/80 text-sm leading-relaxed">
                    <span className="font-bold text-white">Response time:</span> We practice healthy boundaries.
                    Expect a reply within <span className="text-[#faaa68] font-bold">24-48 business hours</span>.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
