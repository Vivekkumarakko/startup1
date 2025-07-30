import React, { useState } from 'react';
import { Handshake, Users, Target, Award, TrendingUp, Shield, CheckCircle, ArrowRight, Mail, Building, User, MessageSquare } from 'lucide-react';

const BecomePartner = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    role: '',
    email: '',
    message: ''
  });

  const benefits = [
    {
      icon: Users,
      title: 'Access Vetted Talent Pool',
      description: 'Connect with pre-screened problem-solvers who have proven their skills through real-world challenges.',
      color: 'bg-blue-500'
    },
    {
      icon: Target,
      title: 'Sponsor Token Rewards',
      description: 'Increase your brand visibility by sponsoring high-value problems and rewarding top performers.',
      color: 'bg-[#DAA520]'
    },
    {
      icon: Award,
      title: 'Review Verified Portfolios',
      description: 'Evaluate candidates based on actual work samples and problem-solving demonstrations.',
      color: 'bg-green-500'
    },
    {
      icon: TrendingUp,
      title: 'Mentor & Engage',
      description: 'Build relationships with emerging talent through mentorship and direct engagement opportunities.',
      color: 'bg-purple-500'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Post Sponsored Problems',
      description: 'Submit real challenges from your organization with attractive token rewards to attract top talent.',
      icon: Target
    },
    {
      step: '02',
      title: 'Review Solver Submissions',
      description: 'Evaluate innovative solutions from our community of verified problem-solvers and students.',
      icon: Users
    },
    {
      step: '03',
      title: 'Reward & Interview',
      description: 'Award tokens to outstanding solutions and schedule interviews with promising candidates.',
      icon: Award
    },
    {
      step: '04',
      title: 'Hire or Engage Long-term',
      description: 'Make job offers, internship opportunities, or establish ongoing consulting relationships.',
      icon: Handshake
    }
  ];

  const partnerTestimonials = [
    {
      name: 'Jennifer Park',
      role: 'Head of Talent Acquisition',
      company: 'TechCorp',
      content: 'Problinx transformed our hiring process. We found 5 exceptional developers in just one quarter, all with proven problem-solving skills.',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'StartupXYZ',
      content: 'The quality of solutions we receive is outstanding. We\'ve hired 3 interns who are now full-time employees.',
      avatar: '👨‍💻'
    },
    {
      name: 'Dr. Sarah Williams',
      role: 'Computer Science Professor',
      company: 'MIT',
      content: 'Our partnership with Problinx gives our students real-world experience while helping companies find fresh talent.',
      avatar: '👩‍🏫'
    }
  ];

  const partnerLogos = [
    { name: 'Google', logo: '🔍', type: 'Enterprise' },
    { name: 'Microsoft', logo: '🪟', type: 'Enterprise' },
    { name: 'Stanford', logo: '🎓', type: 'University' },
    { name: 'MIT', logo: '🏛️', type: 'University' },
    { name: 'Y Combinator', logo: '🚀', type: 'Accelerator' },
    { name: 'Techstars', logo: '⭐', type: 'Accelerator' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="partner" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#DAA520] rounded-2xl flex items-center justify-center">
              <Handshake className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#002D62] mb-4">
            Partner with Problinx
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect your brand to talent, solve real problems with real solvers, and build the future workforce together.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#002D62] text-center mb-12">
            Partner Advantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-gray-50 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 ${benefit.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#002D62] mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Flow */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#002D62] text-center mb-12">
            How Partnership Works
          </h2>
          
          <div className="relative">
            {/* Timeline line for desktop */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#DAA520] to-[#002D62] opacity-20"></div>

            <div className="space-y-12 lg:space-y-16">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={step.title} className="relative">
                    <div className={`lg:flex lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                      {/* Content */}
                      <div className="lg:w-5/12">
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                          <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-[#DAA520] rounded-xl flex items-center justify-center flex-shrink-0">
                              <IconComponent className="h-8 w-8 text-white" />
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl font-bold text-[#DAA520]">{step.step}</span>
                                <h3 className="text-xl font-bold text-[#002D62]">{step.title}</h3>
                              </div>
                              <p className="text-gray-600 leading-relaxed">{step.description}</p>
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
        </div>

        {/* Social Proof */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#002D62] text-center mb-12">
            Trusted by Leading Organizations
          </h2>
          
          {/* Partner Logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <div className="font-semibold text-gray-700">{partner.name}</div>
                <div className="text-sm text-gray-500">{partner.type}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnerTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-[#002D62]">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                      <div className="text-gray-500 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-[#002D62] to-[#003A7A] rounded-2xl p-8 lg:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Form Info */}
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6">Ready to Partner?</h2>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Join our network of forward-thinking organizations that are revolutionizing how talent is discovered and developed.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#DAA520]" />
                  <span>Access to 1000+ verified problem-solvers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#DAA520]" />
                  <span>Dedicated partnership manager</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#DAA520]" />
                  <span>Custom onboarding and training</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#DAA520]" />
                  <span>Flexible partnership terms</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="inline h-4 w-4 mr-1" />
                    Organization *
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                    placeholder="Company or university name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                  >
                    <option value="">Select your role</option>
                    <option value="hr-manager">HR Manager</option>
                    <option value="talent-acquisition">Talent Acquisition</option>
                    <option value="cto-ceo">CTO/CEO</option>
                    <option value="professor">Professor/Educator</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="inline h-4 w-4 mr-1" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                    placeholder="Tell us about your partnership goals and how we can help..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#DAA520] text-white font-semibold rounded-lg hover:bg-[#B8860B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>Become a Partner</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    Request Demo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-[#002D62] mb-4">
            Not Ready Yet?
          </h3>
          <p className="text-gray-600 mb-6">
            Browse our Problem Board to see the quality of work our solvers produce
          </p>
          <button className="px-6 py-3 bg-white border border-gray-300 text-[#002D62] font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center space-x-2 mx-auto">
            <span>Browse Problem Board</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BecomePartner;