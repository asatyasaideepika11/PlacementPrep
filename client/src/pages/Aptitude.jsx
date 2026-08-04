import React from 'react';
import { Calculator, CheckCircle, Clock } from 'lucide-react';

const Aptitude = () => {
  const quizzes = [
    { id: 1, title: 'Quantitative Aptitude 1', category: 'Math', time: '30 mins', qs: 25 },
    { id: 2, title: 'Logical Reasoning Basics', category: 'Reasoning', time: '20 mins', qs: 15 },
    { id: 3, title: 'Verbal Ability Test', category: 'Verbal', time: '25 mins', qs: 20 },
    { id: 4, title: 'Data Interpretation', category: 'DI', time: '40 mins', qs: 30 },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Aptitude Preparation</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Practice mock tests to ace your preliminary rounds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quizzes.map((q) => (
          <div key={q.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-full transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-md">{q.category}</span>
              <Calculator className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{q.title}</h3>
            <div className="mt-auto space-y-2 mb-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-2" /> {q.time}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 mr-2" /> {q.qs} Questions
              </div>
            </div>
            <button className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors">
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aptitude;
