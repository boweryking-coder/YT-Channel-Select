
import React from 'react';
import { YouTubeIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm shadow-lg border-b border-slate-800 sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <YouTubeIcon />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wider">
              Channel Explorer
            </h1>
          </div>
          <p className="hidden md:block text-slate-400">Your guide to a curated YouTube experience</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
