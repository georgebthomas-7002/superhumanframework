import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-5 my-20">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-4">Frequently Asked Questions</h2>
        <p className="text-xl text-gray-600">Quick answers to common questions about this topic</p>
      </div>
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`border-2 rounded-3xl overflow-hidden bg-white shadow-lg transition-all ${
            openIndex === index
              ? 'border-[#f65625] shadow-xl'
              : 'border-gray-200 hover:border-[#028393] hover:shadow-xl'
          }`}
        >
          {/* Question Button */}
          <button
            onClick={() => toggleFAQ(index)}
            className={`w-full flex items-center justify-between p-8 text-left transition-all ${
              openIndex === index ? 'bg-gradient-to-r from-gray-50 to-white' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-4 flex-1">
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md ${
                openIndex === index
                  ? 'bg-gradient-to-br from-[#f65625] to-[#faaa68] text-white'
                  : 'bg-gradient-to-br from-[#028393] to-[#142d63] text-white'
              }`}>
                {index + 1}
              </div>
              <span className="text-xl font-extrabold text-[#142d63] pr-8 leading-relaxed">
                {faq.question}
              </span>
            </div>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                openIndex === index ? 'bg-[#f65625]' : 'bg-[#028393]'
              }`}>
                <ChevronDown className="w-6 h-6 text-white" />
              </div>
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
                <div className="px-8 pb-8 pt-4 text-gray-700 leading-relaxed bg-gradient-to-br from-gray-50 to-white border-t-2 border-gray-200">
                  {/* Handle multi-paragraph answers */}
                  {faq.answer.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 last:mb-0 text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQAccordion;
