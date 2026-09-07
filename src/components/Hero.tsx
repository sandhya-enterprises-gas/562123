import React from 'react';
import { PhoneCall, MessageCircle, Truck, Flame, Sparkles, CheckCircle2, ChevronRight, MapPin, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';
import heroImage from '../assets/images/sandhya_hero_banner_1788344672799.jpg';

interface HeroProps {
  lang: Language;
  onOpenInquiryModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenInquiryModal }) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden py-10 sm:py-14 border-b border-slate-800">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity">
        <img
          src={heroImage}
          alt="Sandhya Enterprises Commercial LPG Yard"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Main Hero Left Content */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>
                {lang === 'kn'
                  ? 'ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ಪೂರೈಕೆ ತಜ್ಞರು (ESTD. 2010)'
                  : 'COMMERCIAL LPG SUPPLIER & SERVICE SPECIALISTS (ESTD. 2010)'}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                {lang === 'kn' ? (
                  <>
                    <span className="text-orange-500">ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್</span>
                    <br />
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100">
                      ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ಗ್ಯಾಸ್ ಪೂರೈಕೆ & ಸರ್ವಿಸ್
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-orange-500">SANDHYA ENTERPRISES</span>
                    <br />
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100">
                      Commercial & Industrial LPG Specialists
                    </span>
                  </>
                )}
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal pt-1">
                {lang === 'kn'
                  ? 'ನೆಲಮಂಗಲ, ತುಮಕೂರು ಹೆದ್ದಾರಿ, ಶಿರಾ ಹಾಗೂ ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ ವ್ಯಾಪ್ತಿಯ ಹೋಟೆಲ್, ರೆಸ್ಟೋರೆಂಟ್, ಕ್ಯಾಟರಿಂಗ್ ಮತ್ತು ಇಂಡಸ್ಟ್ರಿಯಲ್ ಅಗತ್ಯಗಳಿಗೆ ಅಧಿಕೃತ ಭಾರತ್ ಗ್ಯಾಸ್, ಗೋ ಗ್ಯಾಸ್ ಹಾಗೂ ಪವರ್ ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ಪೂರೈಕೆ.'
                  : 'Doorstep supply of Bharat Gas, Go Gas & Power Gas commercial cylinders, industrial pipelines & 24/7 technical leak support across Nelamangala & Tumkur corridors.'}
              </p>
            </div>

            {/* High Density Rate Advisory Box */}
            <div className="bg-orange-500/10 border-l-4 border-orange-500 p-3.5 rounded-r-lg border-y border-r border-orange-500/20">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-black text-orange-400 uppercase tracking-wide">
                    {lang === 'kn' ? 'ಪ್ರಮುಖ ಸೂಚನೆ: ' : 'IMPORTANT NOTICE: '}
                  </span>
                  <span className="text-slate-200">
                    {lang === 'kn'
                      ? 'ಪ್ರತಿ ತಿಂಗಳು ಗ್ಯಾಸ್ ದರ ಪರಿಷ್ಕರಣೆಯಾಗುವುದರಿಂದ, ಇಂದಿನ ರಿಯಾಯಿತಿ ದರಕ್ಕಾಗಿ ಮೊದಲು ಕರೆ ಮಾಡಿ: '
                      : 'Every Month Rates Are Subject to Change. First Call and Ask Today\'s Best Price: '}
                  </span>
                  <a href={`tel:${BUSINESS_INFO.phonePrimary}`} className="font-black text-orange-400 underline hover:text-white ml-1">
                    +91 {BUSINESS_INFO.phonePrimary}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              <a
                id="hero-primary-call-btn"
                href={`tel:${BUSINESS_INFO.phonePrimary}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider shadow-xs transition-colors active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{lang === 'kn' ? 'ಕರೆ ಮಾಡಿ: 8152889500' : 'CALL 8152889500'}</span>
              </a>

              <a
                id="hero-whatsapp-booking-btn"
                href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
                  lang === 'kn'
                    ? 'ನಮಸ್ಕಾರ ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್, ನನಗೆ ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ಡೆಲಿವರಿ / ದರ ವಿಚಾರಣೆ ಬೇಕಾಗಿದೆ.'
                    : 'Hello Sandhya Enterprises, I want to inquire about commercial LPG cylinder rate & booking.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs uppercase tracking-wider shadow-xs transition-colors active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'kn' ? 'ವಾಟ್ಸಾಪ್: 8152889500' : 'WHATSAPP 8152889500'}</span>
              </a>

              <button
                id="hero-quote-calculator-btn"
                onClick={onOpenInquiryModal}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>{lang === 'kn' ? 'ಬುಕಿಂಗ್ & ದರ' : 'GET QUOTE'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick feature checks */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span>{lang === 'kn' ? 'ವೇಗದ ಡೋರ್‌ಸ್ಟೆಪ್ ಡೆಲಿವರಿ' : 'Express Delivery'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span>{lang === 'kn' ? 'ಪೈಪ್‌ಲೈನ್ ಕಾಮಗಾರಿ' : 'Pipeline Fittings'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span>{lang === 'kn' ? '24/7 ತುರ್ತು ಲೀಕೇಜ್ ಚೆಕ್' : '24/7 Safety Check'}</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card - High Density Bento Matrix */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                    {lang === 'kn' ? 'ಪ್ರಮುಖ ಬ್ರ್ಯಾಂಡ್‌ಗಳು' : 'AUTHORIZED GAS BRANDS'}
                  </span>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight">
                    {lang === 'kn' ? 'ಕಮರ್ಷಿಯಲ್ & ಡೊಮೆಸ್ಟಿಕ್ ಪೂರೈಕೆ' : 'Commercial & Domestic Network'}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
              </div>

              {/* 3 Brand High Density Badges */}
              <div className="space-y-2.5">
                {/* Bharat Gas */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center font-black text-xs">
                      BG
                    </div>
                    <div>
                      <div className="text-xs font-black text-white">Bharat Gas</div>
                      <div className="text-[11px] text-slate-400">19kg Commercial & 47.5kg Bulk</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                    Commercial VOT
                  </span>
                </div>

                {/* Go Gas */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center font-black text-xs">
                      GG
                    </div>
                    <div>
                      <div className="text-xs font-black text-white">GoGas</div>
                      <div className="text-[11px] text-slate-400">17kg, 21kg & 33kg Commercial & Elite</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                    Composite & Steel
                  </span>
                </div>

                {/* Power Gas */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center font-black text-xs">
                      PG
                    </div>
                    <div>
                      <div className="text-xs font-black text-white">Power Gas</div>
                      <div className="text-[11px] text-slate-400">Commercial High Flame & Domestic</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                    High Flame
                  </span>
                </div>
              </div>

              {/* Delivery Hub Note */}
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50 text-[11px] text-slate-300 flex items-start gap-2">
                <Truck className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="leading-tight">
                  <strong className="text-white">Coverage:</strong> Nelamangala & Bengaluru Rural (562123). Tumkur & Sira (Bulk orders 10-15+ only).
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Dispatch Line:</span>
                  <span className="text-xs font-black text-orange-400">+91 8152889500</span>
                </div>
                <a
                  href={`tel:${BUSINESS_INFO.phonePrimary}`}
                  className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {lang === 'kn' ? 'ಕರೆ ಮಾಡಿ' : 'CALL NOW'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
