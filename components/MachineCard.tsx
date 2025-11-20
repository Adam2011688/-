import React from 'react';
import { MachineInfo } from '../types';

interface MachineCardProps {
  info: MachineInfo;
}

export const MachineCard: React.FC<MachineCardProps> = ({ info }) => {
  return (
    <div className={`group flex flex-col h-full relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white border border-slate-100 hover:translate-y-[-5px]`}>
      {/* Image Section */}
      <div className="h-56 overflow-hidden relative">
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${info.color.replace('text-', 'bg-')}`}></div>
        <img 
            src={info.imageUrl} 
            alt={info.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 right-4 text-white">
            <h3 className="text-2xl font-black tracking-tight mb-1">{info.name}</h3>
            <p className="text-sm font-medium opacity-90 font-mono">{info.scientificName}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col gap-4">
        <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">الوصف</span>
            <p className="text-slate-700 font-medium leading-relaxed mt-1">{info.description}</p>
        </div>
          
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="flex items-center gap-2 font-bold text-indigo-900 text-sm mb-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                المبدأ الفيزيائي
            </span>
            <p className="text-slate-600 text-sm leading-relaxed">{info.physicsConcept}</p>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">أمثلة من الحياة</span>
            <div className="flex flex-wrap gap-2 mt-2">
                {info.example.split('،').map((ex, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">
                        {ex.trim()}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};