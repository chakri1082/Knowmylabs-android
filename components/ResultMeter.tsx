
import React from 'react';

interface ResultMeterProps {
  value: number;
  min: number;
  max: number;
  unit: string;
}

const ResultMeter: React.FC<ResultMeterProps> = ({ value, min, max, unit }) => {
  const range = max - min;
  const padding = range * 0.4;
  const start = min - padding;
  const end = max + padding;
  
  const percentage = Math.max(0, Math.min(100, ((value - start) / (end - start)) * 100));
  
  const minPos = ((min - start) / (end - start)) * 100;
  const maxPos = ((max - start) / (end - start)) * 100;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-700">
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="text-5xl font-black text-[#1B2A41] tracking-tighter">{value}</span>
          <span className="text-lg font-black text-[#4A90E2]/60 ml-3 uppercase tracking-widest font-outfit">{unit}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] block mb-2">Ref. Range</span>
          <div className="text-sm text-[#1B2A41] font-black bg-white px-4 py-1.5 rounded-2xl border-2 border-slate-50 shadow-sm inline-block">
            {min} – {max}
          </div>
        </div>
      </div>
      
      <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-visible shadow-inner">
        {/* Background segments with softer colors */}
        <div className="absolute inset-y-0 left-0 bg-amber-100 rounded-l-full" style={{ width: `${minPos}%` }}></div>
        <div className="absolute inset-y-0 bg-[#67B26F]/30" style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}></div>
        <div className="absolute inset-y-0 right-0 bg-rose-100 rounded-r-full" style={{ left: `${maxPos}%` }}></div>
        
        {/* Value Marker - Premium Look */}
        <div 
          className="absolute -top-1.5 w-3 h-7 bg-[#1B2A41] border-4 border-white rounded-full shadow-xl z-10 transition-all duration-1000 cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          style={{ left: `calc(${percentage}% - 6px)` }}
        >
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#1B2A41] text-white text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-widest shadow-lg">RESULT</div>
          {/* Subtle line from marker to value */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-12 w-px border-l-2 border-dotted border-slate-200 -z-10"></div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-sm shadow-amber-300/40"></span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lower</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#67B26F] shadow-sm shadow-[#67B26F]/40"></span>
          <span className="text-[10px] font-black text-[#67B26F] uppercase tracking-[0.2em]">Typical</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-300 shadow-sm shadow-rose-300/40"></span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Higher</span>
        </div>
      </div>
    </div>
  );
};

export default ResultMeter;
