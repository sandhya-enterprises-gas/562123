import React from 'react';
import { PhoneCall, MessageCircle, Flame, Bot, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface FloatingActionsProps {
  lang: Language;
  onOpenInquiryModal: () => void;
  onOpenAiAdvisor?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  lang,
  onOpenInquiryModal,
  onOpenAiAdvisor
}) => {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
      {/* AI Business Advisor Quick Trigger */}
      {onOpenAiAdvisor && (
        <button
          type="button"
          id="floating-ai-advisor-btn"
          onClick={onOpenAiAdvisor}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white text-xs font-black uppercase tracking-wider shadow-xl border border-orange-400/40 transition-all hover:scale-105 active:scale-95"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-white animate-pulse" />
          </div>
          <span className="hidden sm:inline">
            {lang === 'kn' ? 'ಸಂಧ್ಯಾ AI ಸಲಹೆಗಾರ (Google Search)' : 'Sandhya AI Advisor (Google Search)'}
          </span>
          <span className="sm:hidden font-bold">
            {lang === 'kn' ? 'AI ಸಲಹೆ' : 'AI Help'}
          </span>
          <Sparkles className="w-3 h-3 text-amber-200 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Quick Rate Pill */}
      <button
        id="floating-rate-pill-btn"
        onClick={onOpenInquiryModal}
        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider shadow-lg border border-orange-500/50 transition-colors"
      >
        <Flame className="w-3.5 h-3.5 text-orange-400" />
        <span>{lang === 'kn' ? 'ಇಂದಿನ ಗ್ಯಾಸ್ ದರ' : 'Today\'s Rate'}</span>
      </button>

      {/* WhatsApp Button */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
          lang === 'kn'
            ? 'ನಮಸ್ಕಾರ ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್, ನನಗೆ ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ಇಂದಿನ ದರ ಮತ್ತು ಡೆಲಿವರಿ ಮಾಹಿತಿ ಬೇಕಾಗಿದೆ.'
            : 'Hello Sandhya Enterprises, Please share today\'s commercial LPG cylinder rate & booking details.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-lg transition-colors border border-emerald-600"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Call Button */}
      <a
        id="floating-call-btn"
        href={`tel:${BUSINESS_INFO.phonePrimary}`}
        aria-label="Call Sandhya Enterprises"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center shadow-lg transition-colors border border-orange-500"
      >
        <PhoneCall className="w-5 h-5" />
      </a>
    </aside>
  );
};
