
import React, { useState, useRef } from 'react';

interface InputSectionProps {
  onProcessText: (text: string) => void;
  onProcessFile: (base64: string, mimeType: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onProcessText, onProcessFile, isLoading }) => {
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onProcessText(text);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        onProcessFile(base64, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-16 relative">
      <div className="mesh-bg"></div>
      
      {/* Privacy Floating Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white rounded-full shadow-xl shadow-emerald-500/20 border-2 border-white animate-bounce-slow">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          <span className="text-xs font-black uppercase tracking-widest">Secure & Private</span>
        </div>
      </div>

      <div className="bg-white rounded-[48px] shadow-2xl shadow-blue-900/10 p-4 transition-all hover:shadow-blue-900/15 group">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow w-full">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4A90E2] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="jargon"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a test name (e.g. Creatinine, HbA1c)..."
              className="w-full pl-16 pr-8 py-7 rounded-[40px] bg-slate-50/70 border-2 border-transparent focus:bg-white focus:border-[#4A90E2]/20 focus:ring-4 focus:ring-[#4A90E2]/5 transition-all text-xl font-medium text-[#1B2A41] placeholder-slate-400 outline-none"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => !isLoading && fileInputRef.current?.click()}
              className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200/80 transition-all flex items-center justify-center relative group/btn"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">Scan Report Image</span>
            </button>
            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="flex-grow md:flex-grow-0 px-10 py-5 rounded-[36px] bg-[#4A90E2] text-white font-black text-lg hover:bg-[#357ABD] disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Thinking...
                </>
              ) : 'Explain Clearly'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center gap-2 p-4 animate-in fade-in duration-700 delay-100">
          <span className="text-2xl">✨</span>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Educational focus,<br/>never diagnostic.</p>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 animate-in fade-in duration-700 delay-200">
          <span className="text-2xl">🔒</span>
          <p className="text-xs font-bold text-[#4A90E2] uppercase tracking-widest leading-relaxed">No data is saved.<br/>Local processing.</p>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 animate-in fade-in duration-700 delay-300">
          <span className="text-2xl">😊</span>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Friendly stories,<br/>zero jargon.</p>
        </div>
      </div>

      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        disabled={isLoading}
      />
    </div>
  );
};

export default InputSection;
