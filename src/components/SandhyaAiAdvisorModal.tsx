import React from 'react';
import { X, Bot, Sparkles, PhoneCall, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language, CustomerAccount } from '../types';
import { AiBusinessAdvisor } from './portal/AiBusinessAdvisor';
import { BUSINESS_INFO } from '../data/content';

interface SandhyaAiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  customer?: CustomerAccount | null;
  onOpenOrderModal?: () => void;
}

export const SandhyaAiAdvisorModal: React.FC<SandhyaAiAdvisorModalProps> = ({
  isOpen,
  onClose,
  lang,
  customer,
  onOpenOrderModal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-slate-900 px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-sm">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                  SANDHYA ENTERPRISES OFFICIAL
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  GEMINI 3.5 + GOOGLE SEARCH
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black uppercase tracking-tight text-white">
                {lang === 'kn' ? 'ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ & ಹೋಟೆಲ್ ವ್ಯವಹಾರ ವೃದ್ಧಿ AI' : 'Commercial LPG & Business Development AI Advisor'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phonePrimary}`}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-orange-400 border border-slate-700 text-xs font-bold transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>+91 {BUSINESS_INFO.phonePrimary}</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 bg-slate-50/50">
          <AiBusinessAdvisor
            lang={lang}
            customer={customer}
            onOpenOrderModal={() => {
              onClose();
              if (onOpenOrderModal) onOpenOrderModal();
            }}
          />
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {lang === 'kn'
                ? 'ಅಧಿಕೃತ ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ಡೀಲರ್ • ನೆಲಮಂಗಲ, ದಾಬಸ್‌ಪೇಟೆ, ತುಮಕೂರು, ಶಿರಾ ಕಾರಿಡಾರ್'
                : 'Official Commercial LPG Distributor • Nelamangala, Dobbaspet, Tumkur, Sira Corridor'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
          >
            {lang === 'kn' ? 'ಮುಚ್ಚಿ' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
