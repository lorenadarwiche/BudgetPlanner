import React from 'react';
import { Wallet, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-primary via-secondary to-primary text-gray-800 shadow-xl border-b-4 border-primary">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-xl shadow-md">
              <Wallet className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Budget Tracker</h1>
              <p className="text-xs text-gray-600 mt-0.5">Smart financial management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser && (
              <>
                <div className="hidden md:flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-md">
                  <div className="bg-primary p-1.5 rounded-full">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-full shadow-md transition-all duration-200 font-medium text-sm"
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
