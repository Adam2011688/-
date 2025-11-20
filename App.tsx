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

      <footer className="bg-slate-100 py-6 mt-12 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 لعبة الآلات البسيطة التعليمية. تم التصميم باستخدام Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;