import React from 'react';
import { ShieldAlert, PhoneCall, AlertTriangle, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { SAFETY_GUIDELINES, BUSINESS_INFO } from '../data/content';

interface SafetyGuideProps {
  lang: Language;
}

export const SafetyGuide: React.FC<SafetyGuideProps> = ({ lang }) => {
  const guidelines = SAFETY_GUIDELINES[lang];

  return (
    <section id="safety" className="py-12 sm:py-16 bg-slate-900 text-white border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-black uppercase tracking-widest border border-red-500/30">
            <ShieldAlert className="w-3 h-3 text-red-400" />
            <span>{lang === 'kn' ? 'ತುರ್ತು ಸುರಕ್ಷತೆ & ಸಹಾಯವಾಣಿ' : 'SAFETY PROTOCOL & 24/7 HOTLINE'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            {lang === 'kn' ? (
              <>
                ಗ್ಯಾಸ್ ಸೋರಿಕೆ ಅಥವಾ ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ{' '}
                <span className="text-red-400">ಪಾಲಿಸಬೇಕಾದ ನಿಯಮಗಳು</span>
              </>
            ) : (
              <>
                Commercial LPG Safety Guidelines &{' '}
                <span className="text-red-400">Emergency Protocols</span>
              </>
            )}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {lang === 'kn'
              ? 'ಅಡುಗೆ ಮನೆ ಸುರಕ್ಷತೆ ನಮ್ಮ ಪ್ರಮುಖ ಆದ್ಯತೆ. ಯಾವುದೇ ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ಗಾಬರಿಯಾಗದೆ ಕೆಳಗಿನ ಕ್ರಮಗಳನ್ನು ಅನುಸರಿಸಿ ತಕ್ಷಣ ನಮ್ಮ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.'
              : 'Kitchen and industrial safety is non-negotiable. Follow these standard emergency measures and contact our dispatch desk immediately.'}
          </p>
        </div>

        {/* 5-Step Safety Steps in High Density Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-8">
          {guidelines.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex flex-col justify-between hover:border-red-500 transition-colors"
            >
              <div>
                <div className="w-6 h-6 rounded bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center font-black text-xs mb-2.5">
                  {item.step}
                </div>
                <h3 className="text-xs font-black uppercase tracking-tight text-white mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Call Box in High Density Style */}
        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-800 border-l-4 border-l-red-600 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-600 text-white flex-shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-red-300">
                {lang === 'kn' ? '24/7 ತುರ್ತು ಲೀಕೇಜ್ ಸಹಾಯವಾಣಿ' : '24/7 EMERGENCY GAS LEAK HOTLINE'}
              </div>
              <div className="text-base sm:text-lg font-black text-white">
                +91 8152889500
              </div>
              <div className="text-xs text-slate-300">
                Email: <span className="text-white font-semibold">{BUSINESS_INFO.emailEmergency}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <a
              href={`tel:${BUSINESS_INFO.phonePrimary}`}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-lg transition-colors text-center"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ತುರ್ತು ಕರೆ' : 'EMERGENCY CALL'}</span>
            </a>
            <a
              href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs uppercase tracking-wider rounded-lg transition-colors text-center"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
