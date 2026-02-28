
import React from 'react';

const SafetyFooter: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 py-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block p-8 bg-white border-2 border-amber-200 rounded-[32px] mb-10 shadow-lg shadow-amber-900/5 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
            MANDATORY DISCLAIMER
          </div>
          <p className="text-[#1B2A41] text-lg font-extrabold mb-3 flex items-center justify-center gap-3">
            <span className="text-2xl">🛑</span> 
            <span>Educational Purposes Only</span>
          </p>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            KnowMyLabs is an AI-powered health literacy tool. It does not provide medical advice, diagnosis, or treatment recommendations. Always consult with a licensed healthcare provider regarding your health, laboratory results, and medical decisions.
          </p>
        </div>
        
        <div className="bg-[#1B2A41] text-white p-6 rounded-[24px] mb-8 max-w-lg mx-auto shadow-xl shadow-slate-900/10">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Zero Data Storage Guarantee
          </p>
          <p className="text-[11px] text-slate-300 font-medium">
            Your results are held strictly in your browser's temporary memory. Once you refresh or close this tab, all analyzed data is permanently erased. We never store, save, or share your personal health details.
          </p>
        </div>

        <p className="text-slate-400 text-[11px] leading-loose max-w-2xl mx-auto font-bold uppercase tracking-[0.2em] opacity-60">
          KnowMyLabs uses advanced AI. AI can make errors. Your data is private and processed in real-time. No medical records are stored.
        </p>
      </div>
    </footer>
  );
};

export default SafetyFooter;
