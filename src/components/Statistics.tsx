import React, { useState, useEffect, useRef } from 'react';
import { Coins, CheckCircle, Users, Building2 } from 'lucide-react';

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ tokens: 0, problems: 0, solvers: 0, recruiters: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = React.useMemo(() => [
    {
      icon: Coins,
      value: 5000,
      suffix: '+',
      label: 'Tokens Earned',
      color: 'bg-[#DAA520]'
    },
    {
      icon: CheckCircle,
      value: 100,
      suffix: '+',
      label: 'Problems Solved',
      color: 'bg-green-500'
    },
    {
      icon: Users,
      value: 200,
      suffix: '+',
      label: 'Verified Solvers',
      color: 'bg-blue-500'
    },
    {
      icon: Building2,
      value: 50,
      suffix: '+',
      label: 'Recruiters Onboarded',
      color: 'bg-purple-500'
    }
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      const counters = stats.map((stat, index) => {
        const increment = stat.value / steps;
        let currentCount = 0;

        return setInterval(() => {
          currentCount += increment;
          if (currentCount >= stat.value) {
            currentCount = stat.value;
            clearInterval(counters[index]);
          }

          setCounts(prev => ({
            ...prev,
            [index === 0 ? 'tokens' : index === 1 ? 'problems' : index === 2 ? 'solvers' : 'recruiters']: Math.floor(currentCount)
          }));
        }, stepDuration);
      });

      return () => counters.forEach(clearInterval);
    }
  }, [isVisible, stats]);

  const getCount = (index: number) => {
    switch (index) {
      case 0: return counts.tokens;
      case 1: return counts.problems;
      case 2: return counts.solvers;
      case 3: return counts.recruiters;
      default: return 0;
    }
  };

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gradient-to-r from-[#002D62] to-[#003A7A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Platform Impact
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real numbers from a growing community of problem-solvers and opportunity creators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const currentCount = getCount(index);
            
            return (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center group hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold text-white">
                    {isVisible ? currentCount.toLocaleString() : '0'}{stat.suffix}
                  </div>
                  <div className="text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <p className="text-white text-lg">
              Join thousands of problem-solvers and companies already building the future of work on Problinx.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;