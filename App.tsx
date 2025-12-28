import React, { useState } from 'react';
import { STAGES_CONFIG } from './constants';
import { AppStage } from './types';
import Stage1Anatomy from './components/Stage1Anatomy';
import Stage2Inequity from './components/Stage2Inequity';
import Stage3Asymmetry from './components/Stage3Asymmetry';
import { BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<AppStage>(AppStage.ANATOMY);

  const renderContent = () => {
    switch (currentStage) {
      case AppStage.ANATOMY:
        return <Stage1Anatomy />;
      case AppStage.INEQUITY:
        return <Stage2Inequity />;
      case AppStage.ASYMMETRY:
        return <Stage3Asymmetry />;
      default:
        return <Stage1Anatomy />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans text-slate-200">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-slate-900 border-r border-slate-800 flex flex-col sticky top-0 h-auto md:h-screen z-10">
        <div className="p-6 border-b border-slate-800 flex items-center">
          <div className="bg-indigo-600 text-white p-2 rounded-lg mr-3 shadow-lg shadow-indigo-500/20">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-100 leading-tight">Tokens Didácticos</h1>
            <p className="text-xs text-slate-400">Guía para Arte Digital</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {STAGES_CONFIG.map((stage) => {
            const isActive = currentStage === stage.id;
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                onClick={() => setCurrentStage(stage.id as AppStage)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left group border
                  ${isActive 
                    ? 'bg-indigo-900/30 text-indigo-300 shadow-sm border-indigo-500/30' 
                    : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200'
                  }`}
              >
                <Icon 
                  size={20} 
                  className={`mr-3 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} 
                />
                <div>
                  <div className={`font-semibold text-sm ${isActive ? 'text-indigo-200' : ''}`}>
                    {stage.title}
                  </div>
                  <div className="text-xs opacity-70 mt-0.5 font-medium">
                    {stage.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-950 rounded-lg p-4 text-slate-400 text-xs border border-slate-800">
            <p className="opacity-70 mb-2">Desarrollado con:</p>
            <div className="flex items-center space-x-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              <span>Gemini 3 Flash</span>
            </div>
            <div className="flex items-center space-x-2 font-mono mt-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
              <span>React + Tailwind</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto max-w-5xl mx-auto w-full">
        {renderContent()}
      </main>

    </div>
  );
};

export default App;