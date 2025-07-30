import React from 'react';
import { Users, Award, Handshake, ArrowRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';

const SolutionOverview = () => {
  const steps = [
    {
      icon: Users,
      title: 'Solve Real Problems',
      description: 'Work on actual challenges posted by real companies',
      color: 'bg-blue-500'
    },
    {
      icon: Award,
      title: 'Build Verified Portfolio',
      description: 'Top solutions become part of your proven track record',
      color: 'bg-green-500'
    },
    {
      icon: Handshake,
      title: 'Get Hired on Merit',
      description: 'Recruiters contact you based on real demonstrated skills',
      color: 'bg-purple-500'
    }
  ];

  const handleGetStarted = () => {
    smoothScrollTo('problems', 80);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#002D62] mb-4">
            Our Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A platform where real problems meet real talent, creating opportunities 
            for meaningful work and authentic skill demonstration.
          </p>
        </div>

        <div className="space-y-8">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.title} className="relative">
                    <div className="bg-gray-50 rounded-2xl p-6 h-full group hover:shadow-lg transition-all duration-300">
                      <div className="text-center space-y-4">
                        <div className={`w-16 h-16 ${step.color} rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-[#002D62]">{step.title}</h3>
                          <p className="text-gray-600 text-sm">{step.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="h-6 w-6 text-[#DAA520]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.title} className="relative">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-[#002D62]">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="h-6 w-6 text-[#DAA520] rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-12">
          <button 
            onClick={handleGetStarted}
            className="px-8 py-4 bg-[#DAA520] text-white text-lg font-semibold rounded-xl hover:bg-[#B8860B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;