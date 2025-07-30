import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I earn tokens on Problinx?',
      answer: 'You earn tokens by successfully solving problems posted by companies. The number of tokens awarded depends on the complexity of the problem and quality of your solution. Top solutions receive the highest token rewards.'
    },
    {
      question: 'Are the problems real-world tasks from actual companies?',
      answer: 'Yes! All problems on Problinx are submitted by real companies facing genuine challenges. These range from startups to enterprise organizations looking for innovative solutions to their business problems.'
    },
    {
      question: 'How is the hiring process handled on the platform?',
      answer: 'Recruiters browse verified portfolios of problem-solvers and contact candidates directly based on their demonstrated skills. Your solutions serve as proof of your capabilities, making the hiring process more efficient and merit-based.'
    },
    {
      question: 'What is Problinx Plus and what benefits does it offer?',
      answer: 'Problinx Plus is our premium subscription that offers priority access to high-value problems, advanced portfolio analytics, direct communication with recruiters, and exclusive networking opportunities with top companies.'
    },
    {
      question: 'Can I participate as both a solver and a company posting problems?',
      answer: 'Absolutely! Many users participate in multiple roles. You can solve problems to build your portfolio while also posting challenges for your own company or startup. This dual participation enriches the platform ecosystem.'
    },
    {
      question: 'How are solutions evaluated and ranked?',
      answer: 'Solutions are evaluated by company representatives based on criteria like innovation, feasibility, completeness, and impact. Our algorithm also considers community feedback and peer reviews to ensure fair ranking.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#002D62] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Problinx
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-[#002D62] pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-[#DAA520]" />
                  ) : (
                    <Plus className="h-5 w-5 text-[#DAA520]" />
                  )}
                </div>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${
                openIndex === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-12">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help.
          </p>
          <button className="px-8 py-3 bg-[#002D62] text-white font-semibold rounded-xl hover:bg-[#003A7A] transition-colors duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;