import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 my-12">
      <h2 className="text-3xl font-bold text-[#142d63] mb-8">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-[#028393] transition-colors"
        >
          {/* Question Button */}
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-bold text-[#142d63] pr-8 leading-relaxed">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown className={`w-6 h-6 ${openIndex === index ? 'text-[#f65625]' : 'text-[#028393]'}`} />
            </motion.div>
          </button>

          {/* Answer Panel */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2 text-gray-700 leading-relaxed bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
                  {/* Handle multi-paragraph answers */}
                  {faq.answer.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
