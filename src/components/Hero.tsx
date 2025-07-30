import React, { useEffect, useState } from 'react';
import { Play, ArrowRight, Coins } from 'lucide-react';

const Hero = () => {
  const [tokens, setTokens] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Create floating tokens animation
    const newTokens = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setTokens(newTokens);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#002D62] via-[#003A7A] to-[#004B92]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Tokens */}
        {tokens.map((token) => (
          <div
            key={token.id}
            className="absolute animate-bounce"
            style={{
              left: `${token.x}%`,
              top: `${token.y}%`,
              animationDelay: `${token.delay}s`,
              animationDuration: '3s'
            }}
          >
            <Coins className="h-6 w-6 text-[#DAA520] opacity-30" />
          </div>
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#DAA520] rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block">Solve Problems.</span>
              <span className="block text-[#DAA520]">Earn Tokens.</span>
              <span className="block">Get Hired.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Problinx connects solvers to real-world challenges with real outcomes.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="group px-8 py-4 bg-[#DAA520] text-white text-lg font-semibold rounded-xl hover:bg-[#B8860B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <span>Solve Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="group px-8 py-4 border-2 border-white/30 text-white text-lg font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Learn How It Works</span>
            </button>
          </div>

          {/* Hero Animation Illustration */}
          <div className="pt-12">
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-[#DAA520] rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl">💻</span>
                    </div>
                    <p className="text-white/80">Students solving real problems</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex space-x-2">
                      {[1, 2, 3].map((i) => (
                        <Coins 
                          key={i} 
                          className="h-8 w-8 text-[#DAA520] animate-bounce" 
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-[#DAA520] rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <p className="text-white/80">Earning tokens & getting hired</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;