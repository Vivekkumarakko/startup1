import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      company: 'MIT',
      content: 'Problinx helped me build a portfolio with real-world projects. I got hired at Google after solving just 3 problems on the platform!',
      rating: 5,
      avatar: '👩‍💻'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Freelance Developer',
      company: 'Independent',
      content: 'The token system is brilliant. I earned 500 tokens in my first month and landed two high-paying contracts through recruiters who found me here.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Jennifer Park',
      role: 'HR Manager',
      company: 'TechCorp',
      content: 'Finally, a way to see actual skills instead of just resumes. We hired 5 incredible developers through Problinx in the last quarter.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'David Thompson',
      role: 'Engineering Student',
      company: 'Stanford',
      content: 'The problems are challenging and real. Each solution I submitted taught me something new and showcased my abilities to potential employers.',
      rating: 5,
      avatar: '👨‍🎓'
    },
    {
      name: 'Lisa Wang',
      role: 'Talent Acquisition Lead',
      company: 'StartupXYZ',
      content: 'Problinx revolutionized our hiring process. We can now identify top talent based on proven problem-solving skills, not just credentials.',
      rating: 5,
      avatar: '👩‍💼'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#002D62]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hear from students, freelancers, and recruiters who found success through Problinx.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl">
            <div className="text-center space-y-6">
              {/* Stars */}
              <div className="flex justify-center space-x-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#DAA520] fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed italic">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="space-y-2">
                <div className="text-4xl">{testimonials[currentIndex].avatar}</div>
                <div>
                  <div className="font-bold text-[#002D62] text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-500">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm border border-white/20"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-[#DAA520] scale-125' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm border border-white/20"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-16">
          <button className="px-8 py-4 bg-[#DAA520] text-white text-lg font-semibold rounded-xl hover:bg-[#B8860B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Your Success Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;