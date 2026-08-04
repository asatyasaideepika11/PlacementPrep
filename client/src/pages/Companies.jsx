import React from 'react';
import { Building } from 'lucide-react';

const Companies = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Top Companies</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Discover company-specific interview experiences and questions</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {['Google', 'Amazon', 'Microsoft', 'Atlassian', 'Goldman Sachs', 'Uber'].map(company => (
          <div key={company} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Building className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{company}</h3>
            <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm font-medium rounded-lg transition-colors">View Archives</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
