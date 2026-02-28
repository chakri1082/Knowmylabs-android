
import React from 'react';
import { Explanation } from '../types';
import ResultMeter from './ResultMeter';

interface ExplanationCardProps {
  explanation: Explanation;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ explanation }) => {
  const valNum = typeof explanation.value === 'string' ? parseFloat(explanation.value) : explanation.value;
  const hasRange = typeof valNum === 'number' && explanation.refMin !== undefined && explanation.refMax !== undefined;

  const getStatusTheme = () => {
    switch (explanation.interpretation) {
      case 'LOW': return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', dot: 'bg-amber-400', label: 'Lower End' };
      case 'HIGH': return { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', dot: 'bg-rose-400', label: 'Higher End' };
      case 'NORMAL': return { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', dot: 'bg-emerald-400', label: 'Typical Range' };
      default: return { color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100', dot: 'bg-slate-400', label: 'Educational' };
    }
  };

  const theme = getStatusTheme();

  return (
    <div className="bg-white rounded-[44px] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full companion-card animate-in zoom-in-95 duration-700">
      {/* Top Disclaimer Bar - More Subtle */}
      <div className="px-10 py-5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
         <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
           Education Only
         </span>
         <span className="text-[9px] font-black text-rose-400 uppercase tracking-[0.2em] flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-rose-200"></span>
           Not Advice
         </span>
      </div>

      <div className="px-10 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-12">
          <div className="flex-grow">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-5 bg-white border border-slate-100 shadow-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.dot} shadow-sm shadow-current`}></span>
              <span className={`text-[11px] font-black uppercase tracking-[0.15em] ${theme.color}`}>
                {theme.label}
              </span>
            </div>
            <h3 className="text-4xl font-black text-[#1B2A41] leading-tight mb-4 tracking-tighter">{explanation.testName}</h3>
            <p className="text-lg text-slate-500 font-medium font-outfit leading-snug">{explanation.whatItMeasures}</p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-slate-50/50 rounded-[28px] border-2 border-white shadow-inner flex items-center justify-center text-4xl transform rotate-3 hover:rotate-0 transition-transform">
              {explanation.interpretation === 'NORMAL' ? '✨' : '🧬'}
            </div>
          </div>
        </div>

        {hasRange && (
          <div className="bg-blue-50/20 rounded-[40px] p-8 border border-blue-50/50 mb-12">
            <ResultMeter 
              value={valNum!} 
              min={explanation.refMin!} 
              max={explanation.refMax!} 
              unit={explanation.unit || ''} 
            />
          </div>
        )}

        {/* Companion Insight - More "Floating" and friendly */}
        <div className="relative group/insight mb-12">
          <div className="absolute inset-0 bg-blue-500/5 rounded-[32px] blur-2xl group-hover/insight:bg-blue-500/10 transition-all"></div>
          <div className="relative bg-white rounded-[32px] p-8 border-2 border-blue-50 shadow-sm">
            <h4 className="flex items-center text-[#4A90E2] font-black text-xs mb-4 uppercase tracking-[0.2em]">
              <span className="text-2xl mr-3">💡</span> The Companion Note
            </h4>
            <p className="text-[#1B2A41] leading-relaxed text-lg font-bold font-outfit italic">
              "{explanation.personalInsight}"
            </p>
          </div>
        </div>

        {/* Up/Down Reasons - Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-rose-50/40 p-7 rounded-[32px] border border-rose-100/50 group/up transition-colors hover:bg-rose-50/60">
            <div className="flex items-center text-rose-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
              <div className="p-2 bg-rose-100 rounded-2xl mr-3 shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </div>
              What pushes it UP?
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-semibold">{explanation.upReasons}</p>
          </div>
          <div className="bg-amber-50/40 p-7 rounded-[32px] border border-amber-100/50 group/down transition-colors hover:bg-amber-50/60">
            <div className="flex items-center text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
              <div className="p-2 bg-amber-100 rounded-2xl mr-3 shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
              What pushes it DOWN?
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-semibold">{explanation.downReasons}</p>
          </div>
        </div>

        {/* The Big Picture and Analogy */}
        <div className="space-y-8 mb-12">
          <div className="px-2">
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
              <div className="h-px flex-grow bg-slate-100"></div>
              Full Background
              <div className="h-px flex-grow bg-slate-100"></div>
            </h4>
            <p className="text-slate-700 text-base leading-relaxed font-medium mb-6">{explanation.whatItIs}</p>
            <div className="bg-[#A7DADC]/15 rounded-[32px] p-7 border-2 border-dashed border-[#A7DADC]/40">
              <p className="text-[#1B2A41] text-base leading-relaxed font-medium italic">
                <span className="font-black text-[#A7DADC] not-italic mr-3 uppercase text-xs tracking-widest">Storyteller Analogy</span>
                {explanation.analogy}
              </p>
            </div>
          </div>
        </div>

        {/* Escalation Guide - Very Bold */}
        <div className="bg-[#1B2A41] text-white rounded-[40px] p-8 shadow-2xl shadow-slate-900/10 border-t-[8px] border-amber-400 relative overflow-hidden group/doc">
          <div className="absolute right-0 top-0 opacity-5 -mr-8 -mt-8 group-hover/doc:scale-110 transition-transform duration-700">
             <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor"><circle cx="100" cy="100" r="100" /></svg>
          </div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-400 mb-5 flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            When to seek expert advice
          </h4>
          <p className="text-lg leading-relaxed text-slate-100 font-extrabold font-outfit">
            {explanation.doctorAdvice}
          </p>
        </div>
      </div>
      
      <div className="px-10 py-6 bg-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] text-center border-t border-slate-100">
        Educational story only. No diagnosis provided.
      </div>
    </div>
  );
};

export default ExplanationCard;
