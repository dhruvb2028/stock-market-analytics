import React from 'react';
import { BarChart4 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart4 size={36} className="text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold leading-none">NSE Top Companies</h1>
              <p className="text-sm text-indigo-200 mt-1">Track market leaders with ease</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <p className="text-sm bg-blue-800 px-3 py-1 rounded-full">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;