import React from 'react';
import { MessageSquare, Video, Mic } from 'lucide-react';

const Interview = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Preparation</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Mock interviews and common HR/Technical questions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-transform hover:-translate-y-1">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Technical AI Mock</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Practice algorithms and system design with an AI interviewer.</p>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">Start Session</button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-transform hover:-translate-y-1">
          <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mic className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">HR Mock Interview</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Prepare for behavioral questions and cultural fit rounds.</p>
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm">Start Session</button>
        </div>
      </div>
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center"><MessageSquare className="w-5 h-5 mr-2 text-primary-500" /> Common Questions</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">1. Tell me about yourself.</h4>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">Keep it concise. Focus on your education, relevant projects, and technical skills. Do not recite your resume word for word.</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">2. What are the 4 pillars of OOP?</h4>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">Encapsulation, Abstraction, Inheritance, and Polymorphism. Be prepared to give real-world and coding examples for each.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
