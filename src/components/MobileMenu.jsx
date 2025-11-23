import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronDown, Linkedin, Instagram, Youtube,
  Mail, Sparkles, Home
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
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/georgebthomas/',
      color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@georgebthomas',
      color: 'bg-[#FF0000]',
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
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

          {/* Menu Panel - Clean White Design */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full bg-white z-50 overflow-y-auto md:hidden"
          >
            {/* Header with Close Button */}
            <div className="sticky top-0 bg-white z-20 border-b-2 border-gray-100 px-6 py-5 flex justify-between items-center">
              <button
                onClick={() => handleNavigate('home')}
                className="flex items-center gap-2 text-[#142d63] hover:text-[#f65625] transition-colors"
              >
                <Home className="w-6 h-6" />
                <span className="font-bold text-lg">Home</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-7 h-7 text-gray-700" />
              </button>
            </div>

            {/* Navigation - Simple & Clean */}
            <div className="px-6 py-6">
              {menuSections.map((section, index) => (
                <div key={section.id} className="mb-1">
                  {/* Section Button */}
                  <button
                    onClick={() => {
                      if (section.items) {
                        toggleSection(section.id);
                      } else {
                        handleNavigate(section.route);
                      }
                    }}
                    className="w-full flex items-center justify-between py-4 px-4 rounded-xl hover:bg-gray-50 transition-all group"
                  >
                    <span className="text-[#142d63] text-lg font-bold group-hover:text-[#f65625] transition-colors">
                      {section.title}
                    </span>
                    {section.items && (
                      <motion.div
                        animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-[#028393]" />
                      </motion.div>
                    )}
                  </button>

                  {/* Submenu */}
                  <AnimatePresence>
                    {section.items && expandedSection === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-gray-50 rounded-xl ml-4 mb-2"
                      >
                        <div className="py-2">
                          {section.items.map((item) => (
                            <button
                              key={item.route}
                              onClick={() => handleNavigate(item.route)}
                              className="w-full text-left py-3 px-5 text-gray-700 hover:text-[#f65625] hover:bg-white transition-all font-medium"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Assessment CTA */}
            <div className="px-6 mb-6">
              <button
                onClick={() => handleNavigate('quiz')}
                className="w-full bg-gradient-to-r from-[#f65625] to-[#faaa68] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Take Assessment
              </button>
            </div>

            {/* Contact Section */}
            <div className="px-6 py-6 border-t-2 border-gray-100">
              <h3 className="text-xl font-bold text-[#142d63] mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#f65625]" />
                Get In Touch
              </h3>

              {/* Email */}
              <a
                href="mailto:george@georgebthomas.com"
                className="block w-full bg-gray-50 rounded-xl p-4 mb-4 hover:bg-gray-100 transition-all active:scale-95"
              >
                <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                <p className="text-[#142d63] font-bold">george@georgebthomas.com</p>
              </a>

              {/* Social Links */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 font-bold mb-3">Connect</p>
                <div className="grid grid-cols-3 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-95 transition-all"
                    >
                      <div className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center shadow-md`}>
                        <social.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold text-[#142d63]">Response time:</span> 24-48 business hours
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
