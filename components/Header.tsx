
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="pt-20 pb-12 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="relative inline-flex mb-10">
        <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-10 animate-pulse"></div>
        <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-[32px] bg-white shadow-xl shadow-blue-500/10 text-[#4A90E2] border border-blue-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
      
      <h1 className="text-6xl font-black text-[#1B2A41] mb-6 tracking-tighter">
        KnowMy<span className="bg-gradient-to-r from-[#4A90E2] to-[#67B26F] bg-clip-text text-transparent">Labs</span>
      </h1>
      
      <p className="text-2xl text-slate-500 max-w-2xl mx-auto px-6 leading-relaxed font-outfit font-medium">
        We turn complicated health reports into <span className="text-[#4A90E2] font-semibold">simple, comforting stories</span> that anyone can understand.
      </p>
      
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-slate-50 text-[11px] font-black text-slate-400 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-teal-400 mr-2 shadow-sm shadow-teal-400/50"></span> Zero Jargon
        </div>
        <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-slate-50 text-[11px] font-black text-slate-400 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 shadow-sm shadow-blue-400/50"></span> 100% Private
        </div>
        <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-slate-50 text-[11px] font-black text-slate-400 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2 shadow-sm shadow-indigo-400/50"></span> Calm Focused
        </div>
      </div>
    </header>
  );
};

export default Header;
