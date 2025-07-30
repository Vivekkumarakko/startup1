import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ProblemStatement = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#002D62]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[#DAA520] rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            The Problem We're Solving
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
              Students and freelancers lack opportunities to prove themselves with real-world work. 
              Meanwhile, recruiters waste countless hours screening resumes instead of evaluating 
              actual skills and problem-solving abilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-300 mb-3">For Talent</h3>
              <p className="text-gray-300">No way to showcase real skills beyond academic projects</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-300 mb-3">For Recruiters</h3>
              <p className="text-gray-300">Time-consuming screening with limited insight into actual capabilities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;