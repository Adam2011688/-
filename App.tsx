import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { LearnSection } from './components/LearnSection';
import { GameSection } from './components/GameSection';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('HOME');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-right" dir="rtl">
      <Header onHome={() => setCurrentView('HOME')} />
      
      <main className="flex-grow">
        {currentView === 'HOME' && (
          <HomePage 
            onStartLearn={() => setCurrentView('LEARN')}
            onStartGame={() => setCurrentView('GAME')}
          />
        )}
        
        {currentView === 'LEARN' && (
          <LearnSection onBack={() => setCurrentView('HOME')} />
        )}
        
        {currentView === 'GAME' && (
          <GameSection onBack={() => setCurrentView('HOME')} />
        )}
      </main>

      <footer className="bg-slate-100 py-8 mt-12 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center flex flex-col items-center gap-4">
          <p className="text-indigo-900 font-bold text-lg">مشروع الشغل والآلات البسيطة</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-slate-600 text-sm">
            <div className="flex items-center gap-2">
              <span>إعداد الطالب:</span>
              <span className="font-bold text-slate-800">آدم عبدالله</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold">التاسع أ</span>
            </div>
            
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300"></div>
            
            <div className="flex items-center gap-2">
              <span>بإشراف المعلم:</span>
              <span className="font-bold text-slate-800">عبدالله السويطي</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;