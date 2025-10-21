import React from 'react';
import { Wallet, LogOut, User, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-gradient-to-r from-primary via-secondary to-primary dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-100 shadow-xl border-b-4 border-primary dark:border-gray-600 transition-colors duration-200">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white dark:bg-gray-700 p-2 rounded-xl shadow-md">
              <Wallet className="w-7 h-7 text-primary dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Budget Tracker</h1>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">Smart financial management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-full shadow-md transition-all duration-200"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {currentUser && (
              <>
                <div className="hidden md:flex items-center space-x-3 bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-md">
                  <div className="bg-primary dark:bg-blue-500 p-1.5 rounded-full">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{currentUser.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 px-4 py-2 rounded-full shadow-md transition-all duration-200 font-medium text-sm"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
