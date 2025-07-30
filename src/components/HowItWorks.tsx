import React from 'react';
import { Building2, Users, Trophy, Briefcase } from 'lucide-react';

const HowItWorks = () => {
  const timeline = [
    {
      icon: Building2,
      title: 'Companies Post Problems',
      description: 'Real businesses submit actual challenges they need solved, from startups to enterprise companies.',
      color: 'bg-blue-500',
      step: '01'
    },
    {
      icon: Users,
      title: 'Solvers Submit Real Solutions',
      description: 'Students and freelancers work on genuine problems, creating tangible value and demonstrating skills.',
      color: 'bg-[#DAA520]',
      step: '02'
    },
    {
      icon: Trophy,
      title: 'Top Solvers Earn Tokens & Visibility',
      description: 'Best solutions are rewarded with tokens and featured in verified portfolios for recruiters to see.',
      color: 'bg-green-500',
      step: '03'
    },
    {
      icon: Briefcase,
      title: 'HRs Contact for Jobs/Internships',
      description: 'Recruiters reach out directly based on proven problem-solving abilities and real-world impact.',
      color: 'bg-purple-500',
      step: '04'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#002D62] mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple four-step process that connects real problems with talented solvers, 
            creating opportunities for everyone involved.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#DAA520] to-[#002D62] opacity-20"></div>

          <div className="space-y-12 lg:space-y-16">
            {timeline.map((item, index) => {
              const IconComponent = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={item.title} className="relative">
                  <div className={`lg:flex lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className="lg:w-5/12">
                      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="flex items-start space-x-4">
                          <div className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl font-bold text-[#DAA520]">{item.step}</span>
                              <h3 className="text-xl font-bold text-[#002D62]">{item.title}</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center dot for desktop */}
                    <div className="hidden lg:block lg:w-2/12 flex justify-center">
                      <div className="w-4 h-4 bg-[#DAA520] rounded-full border-4 border-white shadow-lg"></div>
                    </div>

                    {/* Spacer for desktop */}
                    <div className="hidden lg:block lg:w-5/12"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-16">
          <button className="px-8 py-4 bg-[#DAA520] text-white text-lg font-semibold rounded-xl hover:bg-[#B8860B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Join the Platform
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;