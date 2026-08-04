import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calculator, MessageSquare, Briefcase, FileText, CheckSquare, Clock, FileBadge, LogOut, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'DSA Sheet', href: '/dsa', icon: BookOpen },
    { name: 'Aptitude', href: '/aptitude', icon: Calculator },
    { name: 'Interview Prep', href: '/interview', icon: MessageSquare },
    { name: 'Companies', href: '/companies', icon: Briefcase },
    { name: 'Notes', href: '/notes', icon: FileText },
    { name: 'Study Planner', href: '/planner', icon: CheckSquare },
    { name: 'Timer', href: '/timer', icon: Clock },
    { name: 'Resume', href: '/resume', icon: FileBadge },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100 dark:border-gray-700">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">PlacementPrep</span>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* User Profile Summary */}
          {user && (
            <Link to="/profile" className="block px-4 py-6 border-b border-gray-100 dark:border-gray-700 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full mx-auto shadow-sm ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-800" />
              <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{user.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.college}</p>
              <div className="mt-3 flex justify-center space-x-4 text-xs font-medium">
                <div className="text-orange-500">🔥 {user.streak} Days</div>
                <div className="text-purple-500">⭐ {user.xp} XP</div>
              </div>
            </Link>
          )}

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto hide-scrollbar">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'} group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200`}
                >
                  <Icon className={`${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'} mr-3 flex-shrink-0 h-5 w-5`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            >
              <LogOut className="mr-3 flex-shrink-0 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        {/* Top Navbar */}
        <header className="bg-white/80 backdrop-blur-md dark:bg-gray-800/80 sticky top-0 z-30 shadow-sm border-b border-gray-100 dark:border-gray-700 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">PlacementPrep</span>
            <div className="w-6 h-6"></div> {/* Placeholder */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
