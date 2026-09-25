import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface AppSheetEmbedProps {
  lang?: Language;
  height?: string;
  showCardWrapper?: boolean;
}

export const AppSheetEmbed: React.FC<AppSheetEmbedProps> = ({
  lang = 'kn',
  height = '650px',
  showCardWrapper = true
}) => {
  const appsheetUrl = 'https://www.appsheet.com/start/789fbccb-644c-4975-a5ab-c345a8a4b5ac?raw=true';

  return (
    <div className="w-full max-w-[850px] mx-auto">
      {showCardWrapper && (
        <div className="bg-slate-900 border border-slate-800 rounded-t-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-white">
                  {lang === 'kn' ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ AppSheet ಪೋರ್ಟಲ್' : 'Sandhya Enterprises AppSheet Form'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Official Form
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'kn'
                  ? 'ಆನ್‌ಲೈನ್ ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ ಮತ್ತು ಗ್ರಾಹಕರ ನಮೂನೆ (AppSheet)'
                  : 'Direct commercial LPG booking & customer portal powered by Google AppSheet'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಸುರಕ್ಷಿತ ಸಲ್ಲಿಕೆ' : 'Verified Secure'}</span>
            </div>
            <a
              href={appsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all shadow-sm"
            >
              <span>{lang === 'kn' ? 'ಹೊಸ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ' : 'Open Fullscreen'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
            </a>
          </div>
        </div>
      )}

      {/* Sandhya Enterprises Embedded AppSheet Form */}
      <div 
        style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
        className={showCardWrapper ? 'bg-white rounded-b-2xl p-2 sm:p-3 border-x border-b border-slate-800 shadow-2xl' : ''}
      >
        <iframe 
          src={appsheetUrl}
          width="100%" 
          height={height} 
          style={{ border: '2px solid #ff5722', borderRadius: '8px' }} 
          allow="geolocation"
          title="Sandhya Enterprises Embedded AppSheet Form"
        />
      </div>
    </div>
  );
};
