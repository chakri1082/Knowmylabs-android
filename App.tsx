
import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ExplanationCard from './components/ExplanationCard';
import SafetyFooter from './components/SafetyFooter';
import { getMedicalExplanations } from './services/geminiService';
import { AppState, Explanation } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [explanations, setExplanations] = useState<Explanation[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const processText = async (text: string) => {
    try {
      setState(AppState.LOADING);
      setErrorMessage(null);
      const result = await getMedicalExplanations(text);
      setExplanations(result.explanations);
      setState(AppState.SUCCESS);
    } catch (error) {
      console.error(error);
      setErrorMessage('Oops! We had some trouble understanding that. Please try again with a clearer term.');
      setState(AppState.ERROR);
    }
  };

  const processFile = async (base64: string, mimeType: string) => {
    try {
      setState(AppState.LOADING);
      setErrorMessage(null);
      const result = await getMedicalExplanations({ data: base64, mimeType });
      setExplanations(result.explanations);
      setState(AppState.SUCCESS);
    } catch (error) {
      console.error(error);
      setErrorMessage('We couldn\'t read that report. Make sure it\'s a clear photo of a lab result.');
      setState(AppState.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFF] selection:bg-blue-100">
      <main className="flex-grow container mx-auto px-6 max-w-6xl">
        <Header />
        
        <InputSection 
          onProcessText={processText} 
          onProcessFile={processFile}
          isLoading={state === AppState.LOADING}
        />

        {state === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center py-32 space-y-10">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-[6px] border-[#A7DADC]/20 rounded-[32px]"></div>
              <div className="absolute inset-0 border-[6px] border-[#4A90E2] border-t-transparent rounded-[32px] animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">✨</div>
            </div>
            <div className="text-center animate-in fade-in slide-in-from-bottom-2 duration-1000">
              <p className="text-[#1B2A41] font-black text-3xl tracking-tight mb-2">Creating your story...</p>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Translating medical data into human words</p>
            </div>
          </div>
        )}

        {state === AppState.ERROR && errorMessage && (
          <div className="bg-white border-2 border-rose-50 rounded-[48px] p-16 text-center mb-12 max-w-2xl mx-auto shadow-2xl shadow-rose-900/5 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner">🧩</div>
            <p className="text-[#1B2A41] font-black text-3xl mb-4 tracking-tighter">Something didn't quite click</p>
            <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed">{errorMessage}</p>
            <button 
              onClick={() => setState(AppState.IDLE)}
              className="px-12 py-5 bg-[#1B2A41] text-white rounded-[32px] font-black text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
              Try another search
            </button>
          </div>
        )}

        {state === AppState.SUCCESS && explanations.length > 0 && (
          <div className="mt-20 mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Clear Results Disclaimer Banner */}
            <div className="max-w-4xl mx-auto mb-16 bg-white border-2 border-amber-50 p-8 rounded-[40px] flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl shadow-amber-900/5 transition-all hover:scale-[1.01]">
               <div className="w-16 h-16 bg-amber-50 rounded-3xl flex items-center justify-center text-4xl shadow-inner">🧸</div>
               <div className="text-center sm:text-left">
                  <h3 className="text-[#1B2A41] font-black text-xl mb-2 tracking-tight uppercase tracking-widest text-[13px] text-amber-600">Educational Summary Only</h3>
                  <p className="text-slate-600 text-base font-medium leading-relaxed">
                    This guide is designed for learning and understanding biological terms. <strong>This is not a medical diagnosis or treatment advice.</strong> Always review these findings with a qualified healthcare professional.
                  </p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 px-6 gap-6">
              <h2 className="text-4xl font-black text-[#1B2A41] tracking-tighter">Your Health Summary</h2>
              <div className="flex items-center gap-3 bg-blue-50/50 px-5 py-2.5 rounded-full border border-blue-50 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-sm shadow-blue-500/50"></span>
                <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">
                  {explanations.length} {explanations.length === 1 ? 'Test' : 'Tests'} Explored
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {explanations.map((exp, index) => (
                <ExplanationCard key={`${exp.testName}-${index}`} explanation={exp} />
              ))}
            </div>

            <div className="mt-24 flex flex-col items-center gap-8">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-slate-200 to-transparent rounded-full"></div>
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setState(AppState.IDLE);
                }}
                className="group px-12 py-5 bg-white border-2 border-slate-100 rounded-[36px] font-black text-slate-500 hover:text-[#4A90E2] hover:border-[#4A90E2]/20 hover:bg-blue-50/20 transition-all shadow-sm hover:shadow-xl hover:shadow-blue-500/5 flex items-center gap-4"
              >
                <span>Clear & New Search</span>
                <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        )}

        {state === AppState.SUCCESS && explanations.length === 0 && (
          <div className="bg-white rounded-[56px] p-24 text-center border-2 border-slate-50 shadow-2xl shadow-slate-900/5 max-w-2xl mx-auto animate-in zoom-in-95 duration-700">
            <div className="text-7xl mb-10 filter drop-shadow-lg">🔭</div>
            <p className="text-[#1B2A41] font-black text-4xl mb-6 tracking-tighter">Nothing found yet</p>
            <p className="text-slate-500 text-xl font-medium leading-relaxed font-outfit">Try typing a common term like "ALT", "Glucose", or "CBC". Or ensure your upload is nice and clear!</p>
          </div>
        )}

        {state === AppState.IDLE && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto pb-32">
            <div className="group bg-white p-12 rounded-[44px] shadow-sm border border-slate-50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 cursor-default">
              <div className="w-16 h-16 bg-blue-50 text-[#4A90E2] rounded-[24px] flex items-center justify-center text-4xl mb-10 font-bold group-hover:scale-110 transition-transform duration-500 shadow-inner">📉</div>
              <h4 className="font-black text-[#1B2A41] text-2xl mb-4 tracking-tight">Visual Spectrum</h4>
              <p className="text-slate-500 font-medium text-base leading-relaxed font-outfit">See exactly where you sit on the spectrum from lower to higher ranges with premium meters.</p>
            </div>
            <div className="group bg-white p-12 rounded-[44px] shadow-sm border border-slate-50 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 cursor-default">
              <div className="w-16 h-16 bg-emerald-50 text-[#A7DADC] rounded-[24px] flex items-center justify-center text-4xl mb-10 font-bold group-hover:scale-110 transition-transform duration-500 shadow-inner">🏡</div>
              <h4 className="font-black text-[#1B2A41] text-2xl mb-4 tracking-tight">Friendly Analogies</h4>
              <p className="text-slate-500 font-medium text-base leading-relaxed font-outfit">We describe complex blood markers using metaphors you recognize from home and nature.</p>
            </div>
            <div className="group bg-white p-12 rounded-[44px] shadow-sm border border-slate-50 hover:shadow-2xl hover:shadow-indigo-900/10 transition-all duration-500 cursor-default">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-[24px] flex items-center justify-center text-4xl mb-10 font-bold group-hover:scale-110 transition-transform duration-500 shadow-inner">💬</div>
              <h4 className="font-black text-[#1B2A41] text-2xl mb-4 tracking-tight">Warm Insights</h4>
              <p className="text-slate-500 font-medium text-base leading-relaxed font-outfit">Receive calming, expert notes that provide context for your unique biological journey.</p>
            </div>
          </div>
        )}
      </main>
      
      <SafetyFooter />
    </div>
  );
};

export default App;
