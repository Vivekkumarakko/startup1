import React from 'react';
import { GraduationCap, Briefcase, Users } from 'lucide-react';

const UserPersonas = () => {
  const personas = [
    {
      icon: GraduationCap,
      title: 'Students',
      description: 'Build portfolios by solving real problems',
      color: 'bg-blue-500'
    },
    {
      icon: Briefcase,
      title: 'Freelancers',
      description: 'Prove your skills and get noticed',
      color: 'bg-[#DAA520]'
    },
    {
      icon: Users,
      title: 'Recruiters',
      description: 'Hire by reviewing real-world solutions',
      color: 'bg-green-500'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#002D62] mb-4">
            Built for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're learning, freelancing, or hiring, Problinx connects you to meaningful opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((persona, index) => {
            const IconComponent = persona.icon;
            return (
              <div
                key={persona.title}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center space-y-6">
                  <div className={`w-20 h-20 ${persona.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#002D62]">
                    {persona.title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {persona.description}
                  </p>
                  
                  <button className="inline-flex items-center text-[#DAA520] font-semibold hover:text-[#B8860B] transition-colors duration-300">
                    Learn More
                    <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserPersonas;