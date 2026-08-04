import React from 'react';
import { CheckSquare } from 'lucide-react';

const Planner = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Study Planner</h1>
      <p className="text-gray-500 dark:text-gray-400">Your personalized 30-day placement preparation roadmap.</p>
      
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center mt-8">
        <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
            <CheckSquare className="w-10 h-10 text-primary-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Roadmap Generation</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md leading-relaxed">Our AI is ready to analyze your performance history to generate a tailored daily roadmap covering Data Structures, Algorithms, and Aptitude.</p>
        <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-sm">Generate New Plan</button>
      </div>
    </div>
  );
};

export default Planner;
