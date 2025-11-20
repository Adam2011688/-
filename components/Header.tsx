import React from 'react';
import { Wrench } from 'lucide-react';

interface HeaderProps {
  onHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHome }) => {
  return (
    <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          onClick={onHome}
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="bg-white/20 p-2 rounded-full">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">عالم الآلات البسيطة</h1>
        </div>
        <nav className="hidden sm:flex gap-4 text-sm font-medium">
          <button onClick={onHome} className="hover:text-indigo-200">الرئيسية</button>
        </nav>
      </div>
    </header>
  );
};