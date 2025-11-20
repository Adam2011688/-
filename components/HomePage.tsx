import React from 'react';
import { BookOpen, PlayCircle, Atom, FlaskConical, Zap } from 'lucide-react';

interface HomePageProps {
  onStartGame: () => void;
  onStartLearn: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartGame, onStartLearn }) => {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
      
      <div className="relative mb-16 max-w-4xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold mb-6 border border-indigo-100 shadow-sm">
            <Atom className="w-4 h-4" />
            الفيزياء للصف التاسع
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          مختبر
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mx-3">
            الآلات البسيطة
          </span>
          الافتراضي
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          منصة تعليمية تفاعلية مدعومة بالذكاء الاصطناعي. اكتشف كيف تُغير الآلات حياتنا من خلال الصور الواقعية والمسائل الفيزيائية الممتعة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Learn Card */}
        <button 
          onClick={onStartLearn}
          className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 hover:border-indigo-500 shadow-xl hover:shadow-2xl transition-all duration-300 text-right h-64 flex flex-col justify-between p-8"
        >
          <div className="absolute top-0 right-0 w-full h-full opacity-0 group-hover:opacity-5 bg-indigo-600 transition-opacity"></div>
          <div className="flex justify-between items-start relative z-10">
            <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-8 h-8" />
            </div>
            <ArrowIcon />
          </div>
          <div className="relative z-10">
             <h2 className="text-2xl font-bold text-slate-900 mb-2">الموسوعة العلمية</h2>
             <p className="text-slate-500 font-medium">استعرض صوراً حقيقية للآلات وافهم مبدأ عملها الفيزيائي وقانون العزم.</p>
          </div>
        </button>

        {/* Game Card */}
        <button 
          onClick={onStartGame}
          className="group relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 text-right h-64 flex flex-col justify-between p-8 border-4 border-transparent hover:border-indigo-500/50"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-105 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="bg-indigo-600 p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-lg shadow-indigo-900/50">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-indigo-200 border border-white/10">
                مدعوم بالذكاء الاصطناعي
            </div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 text-white">تحدي الفيزياء</h2>
            <p className="text-indigo-100 font-medium opacity-90">حل ألغاز ومسائل واقعية. هل يمكنك اختيار الآلة الصحيحة لكل مهمة؟</p>
          </div>
        </button>
      </div>
    </div>
  );
};

const ArrowIcon = () => (
  <svg className="w-6 h-6 text-slate-300 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);