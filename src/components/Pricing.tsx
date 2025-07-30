import React, { useState } from 'react';
import { Check, Star, Users, Crown } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';

interface Plan {
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  features: string[];
  limitations: string[];
  cta: string;
  popular: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleGetStarted = () => {
    smoothScrollTo('problems', 80);
  };

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for getting started',
      features: [
        'Access to public problems',
        'Basic token portfolio',
        'Community support',
        'Up to 3 problem submissions/month',
        'Basic profile visibility',
        'Email notifications'
      ],
      limitations: [
        'Limited to beginner-level problems',
        'No priority support',
        'Basic analytics only'
      ],
      cta: 'Get Started',
      popular: false,
      icon: Users
    },
    {
      name: 'Pro',
      price: { monthly: 29, annual: 290 },
      description: 'For serious problem-solvers',
      features: [
        'Access to all problem levels',
        'Priority problem notifications',
        'Up to 20 problem submissions/month',
        'Detailed performance analytics',
        'Enhanced profile visibility',
        'Direct recruiter messaging',
        'Discord community access',
        'Detailed solution feedback',
        'Portfolio customization tools',
        'Early access to new features'
      ],
      limitations: [],
      cta: 'Upgrade to Pro',
      popular: true,
      icon: Star
    },
    {
      name: 'Enterprise',
      price: { monthly: 99, annual: 990 },
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Unlimited problem submissions',
        'Custom problem posting',
        'Team analytics dashboard',
        'Dedicated account manager',
        'Priority customer support',
        'Custom integrations',
        'Bulk user management',
        'Advanced reporting',
        'White-label options',
        'API access',
        'Custom onboarding'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      icon: Crown
    }
  ];

  const features = [
    {
      category: 'Problem Access',
      items: [
        { name: 'Public problems', free: true, pro: true, enterprise: true },
        { name: 'Advanced problems', free: false, pro: true, enterprise: true },
        { name: 'Expert-level problems', free: false, pro: true, enterprise: true },
        { name: 'Custom problems', free: false, pro: false, enterprise: true }
      ]
    },
    {
      category: 'Submissions & Portfolio',
      items: [
        { name: 'Monthly submissions', free: '3', pro: '20', enterprise: 'Unlimited' },
        { name: 'Portfolio visibility', free: 'Basic', pro: 'Enhanced', enterprise: 'Premium' },
        { name: 'Solution feedback', free: 'Basic', pro: 'Detailed', enterprise: 'Expert review' },
        { name: 'Portfolio customization', free: false, pro: true, enterprise: true }
      ]
    },
    {
      category: 'Analytics & Insights',
      items: [
        { name: 'Performance tracking', free: 'Basic', pro: 'Advanced', enterprise: 'Enterprise' },
        { name: 'Skill assessments', free: false, pro: true, enterprise: true },
        { name: 'Market insights', free: false, pro: true, enterprise: true },
        { name: 'Team analytics', free: false, pro: false, enterprise: true }
      ]
    },
    {
      category: 'Support & Community',
      items: [
        { name: 'Community support', free: true, pro: true, enterprise: true },
        { name: 'Discord access', free: false, pro: true, enterprise: true },
        { name: 'Priority support', free: false, pro: true, enterprise: true },
        { name: 'Dedicated manager', free: false, pro: false, enterprise: true }
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'Google',
      content: 'Pro plan helped me showcase my skills and land my dream job. The detailed feedback was invaluable.',
      avatar: '👩‍💻'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Data Scientist',
      company: 'Microsoft',
      content: 'The analytics in Pro plan showed me exactly where to improve. Got hired within 2 months!',
      avatar: '👨‍💻'
    }
  ];

  const partnerLogos = [
    { name: 'Google', logo: '🔍' },
    { name: 'Microsoft', logo: '🪟' },
    { name: 'Amazon', logo: '📦' },
    { name: 'Meta', logo: '👥' },
    { name: 'Apple', logo: '🍎' },
    { name: 'Netflix', logo: '🎬' }
  ];

  const faqs = [
    {
      question: 'How do tokens convert to real value?',
      answer: 'Tokens serve as proof of your problem-solving abilities and are displayed on your profile. While tokens don\'t have direct monetary value, they significantly increase your visibility to recruiters and demonstrate your skills to potential employers.'
    },
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, changes take effect at your next billing cycle.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your profile and portfolio remain active even after cancellation. You\'ll keep access to all your submitted solutions and earned tokens, but lose access to premium features.'
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes! Students with valid .edu email addresses get 50% off Pro plans. Contact our support team with your student verification for the discount code.'
    }
  ];

  const getPrice = (plan: Plan) => {
    return isAnnual ? plan.price.annual : plan.price.monthly;
  };

  const getSavings = (plan: Plan) => {
    if (plan.price.monthly === 0) return 0;
    return (plan.price.monthly * 12) - plan.price.annual;
  };

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#002D62] mb-4">
            Choose Your Plan to Unlock Problinx
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start solving, building portfolios, and getting hired with the plan that fits your goals
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-[#002D62]' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-offset-2 ${
                isAnnual ? 'bg-[#DAA520]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-[#002D62]' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-[#DAA520] text-white text-xs font-bold px-2 py-1 rounded-full">
                Save up to 17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const price = getPrice(plan);
            const savings = getSavings(plan);
            
            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-[#DAA520] scale-105' : 'border border-gray-200'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#DAA520] text-white text-sm font-bold px-4 py-2 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      plan.popular ? 'bg-[#DAA520]' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`h-8 w-8 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#002D62] mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-[#002D62]">${price}</span>
                        {price > 0 && (
                          <span className="text-gray-500 ml-1">/{isAnnual ? 'year' : 'month'}</span>
                        )}
                      </div>
                      {isAnnual && savings > 0 && (
                        <p className="text-sm text-[#DAA520] font-medium mt-1">
                          Save ${savings}/year
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-[#DAA520] text-white hover:bg-[#B8860B] shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      {plan.cta}
                    </button>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-[#002D62] mb-3">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-[#DAA520] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-[#002D62] text-center mb-8">
            Compare All Features
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-[#002D62]">Features</th>
                  <th className="text-center py-4 px-4 font-semibold text-[#002D62]">Free</th>
                  <th className="text-center py-4 px-4 font-semibold text-[#002D62] bg-[#DAA520]/10 rounded-t-lg">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold text-[#002D62]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className="bg-gray-100">
                      <td colSpan={4} className="py-3 px-4 font-semibold text-[#002D62] text-sm uppercase tracking-wide">
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">{item.name}</td>
                        <td className="py-3 px-4 text-center">
                          {typeof item.free === 'boolean' ? (
                            item.free ? (
                              <Check className="h-5 w-5 text-[#DAA520] mx-auto" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )
                          ) : (
                            <span className="text-gray-700">{item.free}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center bg-[#DAA520]/5">
                          {typeof item.pro === 'boolean' ? (
                            item.pro ? (
                              <Check className="h-5 w-5 text-[#DAA520] mx-auto" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )
                          ) : (
                            <span className="text-gray-700 font-medium">{item.pro}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {typeof item.enterprise === 'boolean' ? (
                            item.enterprise ? (
                              <Check className="h-5 w-5 text-[#DAA520] mx-auto" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )
                          ) : (
                            <span className="text-gray-700">{item.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Elements */}
        <div className="text-center mb-16">
          <h3 className="text-xl font-semibold text-[#002D62] mb-8">
            Trusted by talent at leading companies
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="flex items-center space-x-2 text-2xl">
                <span>{partner.logo}</span>
                <span className="font-semibold text-gray-600">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-[#002D62] rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="text-white/90 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-white/70 text-sm">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#002D62] text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-[#002D62] mb-3">{faq.question}</h4>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pt-16">
          <h3 className="text-2xl font-bold text-[#002D62] mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-gray-600 mb-8">
            Join thousands of problem-solvers building their careers on Problinx
          </p>
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

export default Pricing;