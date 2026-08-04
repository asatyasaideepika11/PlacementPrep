import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, CheckCircle, Bookmark, Share2, AlertCircle, Play, Code } from 'lucide-react';
import toast from 'react-hot-toast';

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('// Write your code here...\n\nfunction solve() {\n  \n}');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data } = await api.get(`/questions/${id}`);
        setQuestion(data);
      } catch (error) {
        toast.error('Failed to fetch question details');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleRunCode = () => {
    toast.success('Code execution simulated successfully!');
  };

  if (loading) return <div className="flex justify-center p-12 text-gray-500">Loading...</div>;
  if (!question) return <div className="text-center p-12 text-red-500">Question not found</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Left side: Problem Description */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
          <Link to="/dsa" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 flex items-center transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Link>
          <div className="flex space-x-3">
            <button className="text-gray-400 hover:text-primary-500 transition-colors"><Bookmark className="h-5 w-5" /></button>
            <button className="text-gray-400 hover:text-primary-500 transition-colors"><Share2 className="h-5 w-5" /></button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{question.title}</h1>
            <div className="flex items-center space-x-4 mt-3">
              <span className={`px-2.5 py-1 text-xs font-bold rounded-md 
                ${question.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                  question.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {question.difficulty}
              </span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{question.category}</span>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{question.description}</p>
          </div>

          {question.examples?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Examples</h3>
              {question.examples.map((ex, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <p className="font-mono text-sm text-gray-800 dark:text-gray-200"><strong className="text-gray-900 dark:text-white">Input:</strong> {ex.input}</p>
                  <p className="font-mono text-sm text-gray-800 dark:text-gray-200 mt-2"><strong className="text-gray-900 dark:text-white">Output:</strong> {ex.output}</p>
                  {ex.explanation && <p className="text-sm text-gray-600 dark:text-gray-400 mt-3"><strong className="text-gray-900 dark:text-white">Explanation:</strong> {ex.explanation}</p>}
                </div>
              ))}
            </div>
          )}

          {question.constraints?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Constraints</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                {question.constraints.map((c, i) => (
                  <li key={i} className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded inline-block">{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Code Editor */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
          <div className="flex space-x-2">
            <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm font-medium rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
            </select>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleRunCode}
              className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-semibold transition-colors"
            >
              <Play className="h-4 w-4 mr-2" /> Run
            </button>
            <button 
              onClick={() => toast.success('Solution submitted successfully!')}
              className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              <Code className="h-4 w-4 mr-2" /> Submit
            </button>
          </div>
        </div>
        
        <div className="flex-1 bg-[#1e1e1e] p-4 relative font-mono text-sm">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-transparent text-[#d4d4d4] resize-none outline-none leading-relaxed"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
