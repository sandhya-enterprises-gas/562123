import React from 'react';
import { PhoneCall, MessageCircle, Truck, Flame, Sparkles, CheckCircle2, ChevronRight, MapPin, AlertTriangle, ArrowRight, ExternalLink, FileSpreadsheet, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';
import heroImage from '../assets/images/sandhya_hero_banner_1788344672799.jpg';
import sandhyaNewLogo from '../assets/images/sandhya_new_logo.png';

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
            {/* Top Badge with Official Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-orange-500 ring-2 ring-orange-500/25 bg-slate-900 p-1 flex items-center justify-center shrink-0 shadow-lg">
                <img
                  src={sandhyaNewLogo}
                  alt="Sandhya Enterprises Official Logo"
                  className="w-full h-full object-contain filter drop-shadow-xs select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>
                  {lang === 'kn'
                    ? 'ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಸರ್ವಿಸ್ (ESTD. 2010)'
                    : 'COMMERCIAL GAS SERVICE (ESTD. 2010)'}
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                {lang === 'kn' ? (
                  <>
                    <span className="text-orange-500">ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್</span>
                    <br />
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100">
                      ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ & ಸರ್ವಿಸ್
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-orange-500">SANDHYA ENTERPRISES</span>
                    <br />
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100">
                      Commercial LPG & Pipeline Services
                    </span>
                  </>
                )}
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal pt-1">
                {lang === 'kn'
                  ? 'ಹೋಟೆಲ್ & ಕೈಗಾರಿಕೆಗಳಿಗೆ ಭಾರತ್ ಗ್ಯಾಸ್, ಗೋ ಗ್ಯಾಸ್ ಹಾಗೂ ಪವರ್ ಗ್ಯಾಸ್ ಅಧಿಕೃತ ಪೂರೈಕೆ ಮತ್ತು 24/7 ಸರ್ವಿಸ್.'
                  : 'Authorized commercial LPG supply, pipeline installation & 24/7 safety service across Nelamangala & Tumkur.'}
              </p>
            </div>

            {/* Rate Notice */}
            <div className="bg-orange-500/10 border-l-4 border-orange-500 p-3 rounded-r-lg border-y border-r border-orange-500/20">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-black text-orange-400 uppercase tracking-wide">
                    {lang === 'kn' ? 'ದರ ಸೂಚನೆ: ' : 'RATE NOTICE: '}
                  </span>
                  <span className="text-slate-200">
                    {lang === 'kn'
                      ? 'ಪ್ರತಿ ತಿಂಗಳ 1ನೇ ತಾರೀಖು ದರ ಪರಿಷ್ಕರಣೆಯಾಗುತ್ತದೆ. ಇಂದಿನ ರಿಯಾಯಿತಿ ವಾಣಿಜ್ಯ ಬೆಲೆಗಾಗಿ ತಕ್ಷಣ ಸಂಪರ್ಕಿಸಿ.'
                      : 'Rates update on 1st of every month. Please call or message to confirm today\'s discounted price.'}
                  </span>
                </div>
              </div>
            </div>

            {/* PROMINENT CUSTOMER BOOKING TOOLS (PRIMARY FOCUS) */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* TOOL 1: Firebase Cylinder Booking (Email/Google Login) */}
                <Link
                  to="/booking"
                  id="hero-firebase-booking-card"
                  className="p-4 rounded-2xl bg-gradient-to-br from-orange-600 via-orange-700 to-amber-700 text-white shadow-xl hover:shadow-2xl border-2 border-orange-400/50 hover:border-amber-300 transition-all transform hover:-translate-y-0.5 group flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/30 text-amber-200 border border-amber-300/30">
                        <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
                        <span>Firebase Live</span>
                      </span>
                      <span className="text-[10px] font-bold text-orange-200 uppercase tracking-wider">
                        Online Order
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                      {lang === 'kn'
                        ? 'ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ (Firebase Email/Google)'
                        : 'Firebase Cylinder Booking (Email/Google Login)'}
                    </h3>

                    <p className="text-xs text-orange-100/90 leading-relaxed font-normal">
                      {lang === 'kn'
                        ? 'ಗೂಗಲ್ ಅಥವಾ ಇಮೇಲ್ ಲಾಗಿನ್ ಮೂಲಕ ತಕ್ಷಣ ಸಿಲಿಂಡರ್ ಬುಕ್ ಮಾಡಿ & ಲೈವ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.'
                        : 'Instant online cylinder booking with live Firestore tracking via Google or Email sign-in.'}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-orange-500/40 flex items-center justify-between font-black text-xs uppercase tracking-wider text-amber-200 group-hover:text-white">
                    <span>{lang === 'kn' ? 'ಬುಕಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ' : 'Book Cylinder Now'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>

                {/* TOOL 2: New Customer Booking (Google Form) */}
                <a
                  href="https://forms.gle/msHNBSBVB9xy2T787"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-new-customer-google-form-card"
                  className="p-4 rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white shadow-xl hover:shadow-2xl border-2 border-emerald-400/50 hover:border-emerald-300 transition-all transform hover:-translate-y-0.5 group flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/30 text-emerald-200 border border-emerald-300/30">
                        <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                        <span>Zero Sign-In</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">
                        Google Form
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                      {lang === 'kn'
                        ? 'ಹೊಸ ಗ್ರಾಹಕರ ಬುಕಿಂಗ್ (Google Form)'
                        : 'New Customer Booking (Google Form)'}
                    </h3>

                    <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
                      {lang === 'kn'
                        ? 'ಯಾವುದೇ ಲಾಗಿನ್ ಅಗತ್ಯವಿಲ್ಲದೆ ಹೊಸ ಗ್ರಾಹಕರು ನೇರವಾಗಿ ಗೂಗಲ್ ಫಾರ್ಮ್ ಮೂಲಕ ಆರ್ಡರ್ ಮಾಡಿ.'
                        : 'Zero login required. First-time customers, hotels & restaurants can order directly.'}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-emerald-600/40 flex items-center justify-between font-black text-xs uppercase tracking-wider text-emerald-200 group-hover:text-white">
                    <span>{lang === 'kn' ? 'ಗೂಗಲ್ ಫಾರ್ಮ್ ತೆರೆಯಿರಿ' : 'Open Google Form'}</span>
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </div>
                </a>
              </div>

              {/* Customer Quick Assist Links (Tracking, WhatsApp, Desk Call) */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Link
                  to="/track-order"
                  id="hero-track-order-btn"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'kn' ? 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ' : 'Track Order'}</span>
                </Link>

                <a
                  id="hero-whatsapp-booking-btn"
                  href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
                    lang === 'kn'
                      ? 'ನಮಸ್ಕಾರ ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್, ನನಗೆ ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ಡೆಲಿವರಿ ಮತ್ತು ಇಂದಿನ ದರ ಬೇಕಾಗಿದೆ.'
                      : 'Hello Sandhya Enterprises, I would like to inquire about today\'s commercial LPG cylinder rate & booking.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'kn' ? 'WhatsApp ಬುಕಿಂಗ್' : 'WhatsApp'}</span>
                </a>

                <a
                  id="hero-primary-call-btn"
                  href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
                  <span>{lang === 'kn' ? 'ದರ ಕರೆ' : 'Call Desk'}</span>
                </a>
              </div>
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
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-orange-500/40 flex items-center justify-center p-0.5 overflow-hidden shadow-sm flex-shrink-0">
                  <img
                    src={sandhyaNewLogo}
                    alt="Sandhya Seal"
                    className="w-full h-full object-contain rounded-full"
                    referrerPolicy="no-referrer"
                  />
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
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'kn' ? '24/7 ತುರ್ತು ಲೀಕೇಜ್ ಚೆಕ್:' : '24/7 Emergency Helpline:'}</span>
                  <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    {lang === 'kn' ? 'ಸದಾ ಲಭ್ಯವಿದೆ' : 'Live & Active'}
                  </span>
                </div>
                <a
                  href={`tel:${BUSINESS_INFO.phoneHelpline}`}
                  className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>{lang === 'kn' ? 'ಕರೆ ಮಾಡಿ' : 'CALL HELPLINE'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
