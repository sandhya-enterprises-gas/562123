import React from 'react';
import { Flame, PhoneCall, MessageCircle, Headphones, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { RATE_NOTICE, BUSINESS_INFO } from '../data/content';

interface RateAlertBannerProps {
  lang: Language;
  onOpenInquiryModal?: () => void;
}

export const RateAlertBanner: React.FC<RateAlertBannerProps> = ({
  lang,
  onOpenInquiryModal
}) => {
  const content = RATE_NOTICE[lang];

  return (
    <aside aria-label="Commercial LPG Pricing Notice" className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-zinc-950 text-white border-b border-orange-500/30 shadow-md">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
          
          {/* Notice Brief with Live Indicator */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Animated Flame & Live Pulse Badge */}
            <div className="relative flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-sm ring-2 ring-orange-400/30">
                <Flame className="w-4 h-4 animate-pulse text-amber-100" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>

            {/* Smart Descriptive Notice (No raw numbers) */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-orange-500/20 text-orange-300 border border-orange-500/30 px-2 py-0.5 rounded-full">
                  <ShieldAlert className="w-3 h-3 text-orange-400" />
                  {content.badge}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold tracking-wide uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  {lang === 'kn' ? 'ದೈನಂದಿನ ಪರಿಷ್ಕರಣೆ' : 'Live Daily Revision'}
                </span>
              </div>

              <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight flex items-center gap-2 flex-wrap">
                <span>{content.title}</span>
              </h2>

              <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-snug mt-0.5">
                {content.subtitle} —{' '}
                <span className="text-orange-300 font-semibold">
                  {lang === 'kn'
                    ? 'ಇಂದಿನ ರಿಯಾಯಿತಿ ದರ ಮತ್ತು ಡೆಲಿವರಿಗಾಗಿ ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ'
                    : 'Tap below for instant rate confirmation & doorstep delivery'}
                </span>
              </p>
            </div>
          </div>

          {/* Smart "One-Click" Interactive Action Buttons (No raw numbers displayed) */}
          <div className="flex items-center gap-2 w-full lg:w-auto flex-wrap sm:flex-nowrap flex-shrink-0 pt-1 lg:pt-0">
            {/* Primary Action: Direct Rate Call */}
            <a
              id="smart-rate-call-btn"
              href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
              title={lang === 'kn' ? 'ದರ ವಿಚಾರಣೆಗೆ ಕರೆ ಮಾಡಿ' : "Click to call for today's rate"}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-orange-500/20 ring-1 ring-orange-400/40 active:scale-95 transition-all whitespace-nowrap min-h-[40px]"
            >
              <span className="p-1 rounded-lg bg-black/20">
                <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              </span>
              <span>{content.actionCall}</span>
            </a>

            {/* Secondary Action: Direct WhatsApp Chat */}
            <a
              id="smart-rate-whatsapp-btn"
              href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
                lang === 'kn'
                  ? 'ನಮಸ್ಕಾರ ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್, ಇಂದಿನ ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್ ರಿಯಾಯಿತಿ ದರ ಮತ್ತು ಡೆಲಿವರಿ ಮಾಹಿತಿ ತಿಳಿಸಿ.'
                  : "Hello Sandhya Enterprises, Please share today's discounted commercial LPG cylinder rate and delivery schedule."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title={lang === 'kn' ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ದರ ತಿಳಿಯಿರಿ' : "Click to WhatsApp for today's rate"}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-emerald-500/20 ring-1 ring-emerald-400/40 active:scale-95 transition-all whitespace-nowrap min-h-[40px]"
            >
              <span className="p-1 rounded-lg bg-black/20">
                <MessageCircle className="w-3.5 h-3.5" />
              </span>
              <span>{content.actionWhatsApp}</span>
            </a>

            {/* Tertiary Action: 24/7 Helpline */}
            <a
              id="smart-rate-helpline-btn"
              href={`tel:${BUSINESS_INFO.phoneHelpline}`}
              title={lang === 'kn' ? '24/7 ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ' : 'Call 24/7 Helpline'}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-700 active:scale-95 transition-all whitespace-nowrap min-h-[40px]"
            >
              <Headphones className="w-3.5 h-3.5 text-orange-400" />
              <span>{content.actionHelpline}</span>
            </a>

            {/* Optional Quote Modal Button */}
            {onOpenInquiryModal && (
              <button
                id="smart-rate-modal-btn"
                type="button"
                onClick={onOpenInquiryModal}
                className="hidden xl:inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-white/15 active:scale-95 transition-all whitespace-nowrap min-h-[40px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'kn' ? 'ದರ ಕೇಳಿ' : 'Ask Rate'}</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </aside>
  );
};
