import React, { useState, useEffect, useCallback } from 'react';
import { GameScenario, MachineType } from '../types';
import { generateScenario } from '../services/geminiService';
import { MACHINES } from '../constants';
import { Loader2, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, Lightbulb, Atom } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameSectionProps {
    onBack: () => void;
}

export const GameSection: React.FC<GameSectionProps> = ({ onBack }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [scenario, setScenario] = useState<GameScenario | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<MachineType | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const loadNewQuestion = useCallback(async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScenario(null);
    
    try {
      const newScenario = await generateScenario();
      setScenario(newScenario);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (type: MachineType) => {
    if (selectedAnswer || !scenario) return; // Prevent double submission

    setSelectedAnswer(type);
    const correct = type === scenario.correctMachine;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#3B82F6', '#F59E0B']
      });
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium"
        >
            <ArrowRight className="w-5 h-5" />
            إنهاء الاختبار
        </button>
        
        <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
                <span className="text-xs text-slate-400 font-bold uppercase">الدرجة</span>
                <span className="text-2xl font-black text-indigo-900">{score}</span>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex flex-col items-end">
                <span className="text-xs text-slate-400 font-bold uppercase">تتابع الفوز</span>
                <span className="text-2xl font-black text-orange-500 flex items-center gap-1">
                    {streak} <Trophy className="w-5 h-5" />
                </span>
            </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Question Panel (Left/Top) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {loading ? (
                <div className="flex-grow min-h-[300px] flex flex-col items-center justify-center bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-6" />
                    <p className="text-slate-800 font-bold text-lg animate-pulse">جاري تحضير المسألة الفيزيائية...</p>
                    <p className="text-slate-500 text-sm mt-2">يتم توليد سيناريو باستخدام الذكاء الاصطناعي</p>
                </div>
            ) : scenario ? (
                <>
                    <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden min-h-[250px] flex flex-col justify-center border-b-8 border-indigo-500">
                        <div className="absolute top-0 left-0 p-4 opacity-10">
                            <Atom className="w-48 h-48 text-indigo-200" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-indigo-300 mb-4 text-sm font-bold uppercase tracking-wider">
                                <Lightbulb className="w-5 h-5" />
                                مسألة {scenario.difficulty === 'HARD' ? 'للمتفوقين' : 'تطبيقية'}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold leading-relaxed text-right dir-rtl font-cairo">
                                "{scenario.scenario}"
                            </h3>
                        </div>
                    </div>

                    {/* Feedback Area */}
                    <div className={`rounded-3xl p-6 border-2 transition-all duration-500 ${
                        selectedAnswer 
                        ? (isCorrect ? 'bg-green-50 border-green-500 scale-100 opacity-100' : 'bg-red-50 border-red-500 scale-100 opacity-100')
                        : 'bg-slate-50 border-transparent scale-95 opacity-50 hidden lg:block'
                    }`}>
                        {selectedAnswer ? (
                            <>
                                <div className="flex items-start gap-4 mb-4">
                                    {isCorrect ? (
                                        <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" />
                                    ) : (
                                        <XCircle className="w-8 h-8 text-red-600 shrink-0" />
                                    )}
                                    <div>
                                        <h4 className={`font-bold text-xl ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                            {isCorrect ? 'إجابة صحيحة!' : 'حاول مرة أخرى'}
                                        </h4>
                                        <p className="text-slate-700 mt-3 leading-relaxed text-base font-medium">
                                            {scenario.explanation}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={loadNewQuestion}
                                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    السؤال التالي
                                </button>
                            </>
                        ) : (
                            <div className="text-center text-slate-400 py-8">
                                اختر الآلة المناسبة للحل
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="p-6 bg-red-50 text-red-600 rounded-xl">حدث خطأ في التحميل</div>
            )}
        </div>

        {/* Options Grid (Right/Bottom) */}
        <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full content-start">
                {Object.values(MachineType).map((type) => {
                    const info = MACHINES[type];
                    const isSelected = selectedAnswer === type;
                    const isCorrectAnswer = scenario?.correctMachine === type;
                    const showResult = selectedAnswer !== null;
                    
                    let containerClass = "relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group border-4 ";
                    
                    if (!showResult) {
                        containerClass += "border-white shadow-md hover:shadow-2xl hover:scale-[1.02] hover:border-indigo-400 hover:z-10";
                    } else {
                        if (isCorrectAnswer) {
                            containerClass += "border-green-500 ring-4 ring-green-200 shadow-xl scale-105 z-20";
                        } else if (isSelected && !isCorrectAnswer) {
                            containerClass += "border-red-500 opacity-60";
                        } else {
                            containerClass += "border-slate-100 opacity-40 grayscale";
                        }
                    }

                    return (
                        <button
                            key={type}
                            onClick={() => handleAnswer(type)}
                            disabled={showResult}
                            className={containerClass}
                        >
                            <img 
                                src={info.imageUrl} 
                                alt={info.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${
                                showResult && isCorrectAnswer ? 'from-green-900/90 via-green-900/20' : 'from-black/90 via-black/20'
                            } to-transparent opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                            
                            <div className="absolute bottom-0 w-full p-4 text-right">
                                <h4 className="text-white font-black text-xl md:text-2xl shadow-black drop-shadow-lg mb-1">
                                    {info.name}
                                </h4>
                                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                                    showResult && isCorrectAnswer ? 'bg-green-500 text-white' : 'bg-white/20 text-slate-200 backdrop-blur-sm'
                                }`}>
                                    {info.scientificName}
                                </span>
                            </div>

                            {showResult && isCorrectAnswer && (
                                <div className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>

      </div>
    </div>
  );
};