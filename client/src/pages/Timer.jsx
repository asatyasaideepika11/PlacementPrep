import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Coffee, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleComplete = () => {
    setIsRunning(false);
    if (mode === 'work') {
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);
      toast.success('Focus session completed! Great job.', { icon: '🎉' });
      
      if (newSessions % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(15 * 60);
      } else {
        setMode('shortBreak');
        setTimeLeft(5 * 60);
      }
    } else {
      toast.success('Break time is over! Ready to focus?', { icon: '💪' });
      setMode('work');
      setTimeLeft(25 * 60);
    }
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'work') setTimeLeft(25 * 60);
    else if (mode === 'shortBreak') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'work') setTimeLeft(25 * 60);
    else if (newMode === 'shortBreak') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pomodoro Timer</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Boost your productivity with focused study sessions</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 flex flex-col items-center">
        
        {/* Mode Selector */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-lg mb-8">
          <button
            onClick={() => switchMode('work')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${mode === 'work' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          >
            <BookOpen className="w-4 h-4 mr-2" /> Focus
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${mode === 'shortBreak' ? 'bg-white dark:bg-gray-600 shadow-sm text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          >
            <Coffee className="w-4 h-4 mr-2" /> Short Break
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${mode === 'longBreak' ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          >
            <Coffee className="w-4 h-4 mr-2" /> Long Break
          </button>
        </div>

        {/* Circular Timer Display */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="110"
              className="stroke-current text-gray-100 dark:text-gray-700"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="128"
              cy="128"
              r="110"
              className={`stroke-current ${mode === 'work' ? 'text-primary-500' : mode === 'shortBreak' ? 'text-green-500' : 'text-blue-500'} transition-all duration-1000 ease-linear`}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray="691"
              strokeDashoffset={((110 * 2 * Math.PI) * (1 - (timeLeft / (mode === 'work' ? 1500 : mode === 'shortBreak' ? 300 : 900)))) || 0}
              strokeLinecap="round"
            />
          </svg>
          <div className="text-center z-10">
            <span className="text-6xl font-bold tracking-tighter text-gray-900 dark:text-white font-mono">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTimer}
            className={`flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-transform hover:scale-105 ${isRunning ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'bg-primary-600 text-white'}`}
          >
            {isRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
          </button>
          <button
            onClick={resetTimer}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Track */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Today's Sessions</h3>
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => {
            const isCompleted = i < (sessionsCompleted % 4 || (sessionsCompleted > 0 && sessionsCompleted % 4 === 0 ? 4 : 0));
            return (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-gray-100 text-gray-300 dark:bg-gray-700 dark:text-gray-500'}`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span>{i+1}</span>}
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Complete 4 focus sessions for a long break</p>
      </div>
    </div>
  );
};

export default Timer;
