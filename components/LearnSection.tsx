import React from 'react';
import { MACHINES } from '../constants';
import { MachineCard } from './MachineCard';
import { MachineType } from '../types';
import { ArrowRight } from 'lucide-react';

interface LearnSectionProps {
    onBack: () => void;
}

export const LearnSection: React.FC<LearnSectionProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
      <div className="flex items-center gap-2 mb-8">
         <button 
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
         >
            <ArrowRight className="w-5 h-5" />
            عودة
         </button>
         <h2 className="text-3xl font-bold text-slate-800">تعلم عن الآلات</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(MachineType).map((type) => (
          <MachineCard key={type} info={MACHINES[type]} />
        ))}
      </div>
    </div>
  );
};