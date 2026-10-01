import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck, Flame, CheckCircle2, Truck, FileSpreadsheet } from 'lucide-react';
import { Language } from '../types';

interface AppSheetEmbedProps {
  lang?: Language;
  height?: string;
  showCardWrapper?: boolean;
}

export const AppSheetEmbed: React.FC<AppSheetEmbedProps> = ({
  lang = 'kn'
}) => {
  const appsheetUrl = 'https://www.appsheet.com/start/789fbccb-644c-4975-a5ab-c345a8a4b5ac';

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-orange-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{lang === 'kn' ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ AppSheet ಪೋರ್ಟಲ್' : 'Sandhya Enterprises AppSheet Portal'}</span>
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'kn' ? '✓ ನೇರ ಗೂಗಲ್ ಶೀಟ್ ಸಿಂಕ್' : '✓ Live Google Sheet Sync'}</span>
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-950/80 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'kn' ? 'ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಡೆಲಿವರಿ' : 'Express Delivery'}</span>
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {lang === 'kn'
                ? 'ವಾಣಿಜ್ಯ ಸಿಲಿಂಡರ್ ಅಧಿಕೃತ AppSheet ಆನ್‌ಲೈನ್ ನಮೂನೆ'
                : 'Official Commercial LPG Cylinder AppSheet Booking'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-2xl">
              {lang === 'kn'
                ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಅಧಿಕೃತ ಗೂಗಲ್ AppSheet ಬುಕಿಂಗ್ ಲಿಂಕ್ ಮೂಲಕ ತಕ್ಷಣವೇ ಬುಕ್ ಮಾಡಿ. ಯಾವುದೇ ಲಾಗಿನ್ ಅಥವಾ ಬ್ರೋಕನ್ ಐಫ್ರೇಮ್ ಸಮಸ್ಯೆ ಇಲ್ಲದೆ ಪೂರ್ಣಸ್ಕ್ರೀನ್‌ನಲ್ಲಿ ಸುಲಭವಾಗಿ ಆರ್ಡರ್ ಸಲ್ಲಿಸಿ.'
                : 'Directly launch the Sandhya Enterprises official Google AppSheet portal. Fast, clean, reliable booking with instant synchronization to our dispatch fleet.'}
            </p>
          </div>

          {/* Direct Action Button Requested by User */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={appsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-black text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-orange-500/25 active:scale-95 flex items-center justify-center gap-3 cursor-pointer border border-orange-400/40"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>{lang === 'kn' ? 'ಒಪನ್ ಮಾಡಿ / Open AppSheet Booking' : 'ಒಪನ್ ಮಾಡಿ / Open AppSheet Booking'}</span>
              <ExternalLink className="w-4 h-4 text-white" />
            </a>
          </div>

          {/* Feature highlights */}
          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="font-mono text-orange-400 font-bold text-[10px] block">FEATURE 01</span>
              <strong className="text-white block mt-0.5">{lang === 'kn' ? '100% ಸುರಕ್ಷಿತ' : '100% Official & Secure'}</strong>
              <span className="text-slate-400 text-[11px] block mt-0.5">
                {lang === 'kn' ? 'ನೇರವಾಗಿ ಅಧಿಕೃತ AppSheet ಕ್ಲೌಡ್‌ನಲ್ಲಿ ತೆರೆಯುತ್ತದೆ' : 'Opens directly in authenticated AppSheet cloud'}
              </span>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="font-mono text-orange-400 font-bold text-[10px] block">FEATURE 02</span>
              <strong className="text-white block mt-0.5">{lang === 'kn' ? 'ಲೈವ್ ಸಿಂಕ್' : 'Live Sheet Sync'}</strong>
              <span className="text-slate-400 text-[11px] block mt-0.5">
                {lang === 'kn' ? 'ಆರ್ಡರ್ ವಿವರಗಳು ನೇರವಾಗಿ ರವಾನೆಯಾಗುತ್ತವೆ' : 'Orders sync to central agency master sheet'}
              </span>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="font-mono text-orange-400 font-bold text-[10px] block">FEATURE 03</span>
              <strong className="text-white block mt-0.5">{lang === 'kn' ? 'ಎಲ್ಲಾ ಬ್ರ್ಯಾಂಡ್‌ಗಳು' : 'All Commercial Brands'}</strong>
              <span className="text-slate-400 text-[11px] block mt-0.5">
                {lang === 'kn' ? 'ಭಾರತ್ ಗ್ಯಾಸ್, ಇಂಡೇನ್ ಮತ್ತು ಹೆಚ್‌ಪಿ ಗ್ಯಾಸ್' : 'Bharat Gas, Indane & HP Commercial cylinders'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
