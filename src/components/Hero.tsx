import React from 'react';
import {
  PhoneCall,
  MessageCircle,
  Truck,
  Flame,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Zap,
  ShieldCheck,
  Check
} from 'lucide-react';
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
          loading="lazy"
          decoding="async"
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
                  width="56"
                  height="56"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {lang === 'kn'
                    ? 'ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ ಪರಿಹಾರಗಳು (ESTD. 2010)'
                    : 'COMMERCIAL LPG SOLUTIONS (ESTD. 2010)'}
                </span>
              </div>
            </div>

            {/* Main Heading (Customer Strategy: Go Gas & Power Gas First) */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                {lang === 'kn' ? (
                  <>
                    <span className="text-orange-500">Commercial LPG Solutions</span>
                    <br />
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100">
                      ಗೋ ಗ್ಯಾಸ್ & ಪವರ್ ಗ್ಯಾಸ್
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-orange-500">Commercial LPG Solutions</span>
                    <br />
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100">
                      Go Gas & Power Gas
                    </span>
                  </>
                )}
              </h1>

              <p className="text-emerald-300 font-bold text-sm sm:text-base tracking-wide">
                {lang === 'kn'
                  ? 'Go Gas & Power Gas – ವೇಗದ ಡೆಲಿವರಿ | ಅತ್ಯುತ್ತಮ ಬೆಲೆ | ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ'
                  : 'Go Gas & Power Gas – Fast Delivery | Best Price | Trusted Service'}
              </p>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal pt-0.5">
                {lang === 'kn'
                  ? 'ದಾಖಲೆಗಳ ಗೋಜಿಲ್ಲದೆ ಹೋಟೆಲ್, ಬೇಕರಿ, ಕ್ಯಾಟರಿಂಗ್ ಹಾಗೂ ಕೈಗಾರಿಕೆಗಳಿಗೆ ತಕ್ಷಣ ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ ಸಂಪರ್ಕ ಮತ್ತು 24/7 ನಿರಂತರ ಪೂರೈಕೆ.'
                  : 'Zero documentation delays, rapid doorstep delivery, and dedicated high-BTU commercial cylinders for kitchens & industries across Nelamangala & Tumkur corridor.'}
              </p>
            </div>

            {/* TWO LARGE PRIMARY BRAND EXPLORE CTA BUTTONS (HIGHLIGHTED FOR GO GAS & POWER GAS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* BUTTON 1: Explore Go Gas (Green Theme) */}
              <Link
                to="/go-gas"
                id="hero-explore-gogas-btn"
                className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl border-2 border-emerald-400/60 hover:border-emerald-300 transition-all transform hover:-translate-y-0.5 group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/25 flex items-center justify-center shrink-0 border border-emerald-300/40">
                    <Flame className="w-5 h-5 text-emerald-300 fill-emerald-300" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200 block">
                      ⭐ Recommended • Best Seller
                    </span>
                    <strong className="text-base sm:text-lg font-black text-white block leading-tight">
                      {lang === 'kn' ? 'Explore Go Gas (ಗೋ ಗ್ಯಾಸ್)' : 'Explore Go Gas'}
                    </strong>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-200 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* BUTTON 2: Explore Power Gas (Blue Theme) */}
              <Link
                to="/power-gas"
                id="hero-explore-powergas-btn"
                className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white shadow-xl hover:shadow-2xl border-2 border-blue-400/60 hover:border-blue-300 transition-all transform hover:-translate-y-0.5 group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/25 flex items-center justify-center shrink-0 border border-blue-300/40">
                    <Zap className="w-5 h-5 text-blue-300 fill-blue-300" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block">
                      🔥 Popular Choice • High Pressure
                    </span>
                    <strong className="text-base sm:text-lg font-black text-white block leading-tight">
                      {lang === 'kn' ? 'Explore Power Gas (ಪವರ್ ಗ್ಯಾಸ್)' : 'Explore Power Gas'}
                    </strong>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-200 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Note about Available Cylinders (12kg, 15kg, 17kg, 19.2kg, 33kg LOT - NO 45/47.5kg) */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="font-black text-orange-400 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                  {lang === 'kn' ? 'ಲಭ್ಯವಿರುವ ಸಿಲಿಂಡರ್ ಶ್ರೇಣಿ:' : 'Available Cylinder Range:'}
                </span>
                <span className="font-bold text-white font-mono text-[11px]">
                  12 KG • 15 KG • 17 KG • 19.2 KG • 33 KG LOT
                </span>
              </div>
              <p className="text-[11px] text-amber-300 font-medium">
                {lang === 'kn'
                  ? 'ಗಮನಿಸಿ: ನಮ್ಮ ಬಳಿ 45 KG / 47.5 KG ಗ್ಯಾಸ್ ಲಭ್ಯವಿಲ್ಲ. ಕೇವಲ 12KG, 15KG, 17KG, 19.2KG & 33KG LOT ಮಾತ್ರ ಲಭ್ಯ.'
                  : 'Important Note: 45 KG / 47.5 KG cylinders are not supplied. Available sizes: 12 KG, 15 KG, 17 KG, 19.2 KG & 33 KG LOT.'}
              </p>
            </div>

            {/* PROMINENT CUSTOMER BOOKING TOOLS (PRIMARY FOCUS) */}
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* TOOL 1: Firebase Cylinder Booking (Email/Google Login) */}
                <Link
                  to="/booking"
                  id="hero-firebase-booking-card"
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-700 text-white shadow-lg hover:shadow-xl border border-orange-400/50 hover:border-amber-300 transition-all transform hover:-translate-y-0.5 group flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/30 text-amber-200">
                        <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
                        <span>Online Order</span>
                      </span>
                      <span className="text-[10px] font-bold text-orange-200 uppercase tracking-wider">
                        Quick Booking
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-white leading-snug">
                      {lang === 'kn'
                        ? 'ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ (Online Booking)'
                        : 'Book Cylinder Online (Instant Dispatch)'}
                    </h3>

                    <p className="text-[11px] text-orange-100/90 leading-relaxed font-normal">
                      {lang === 'kn'
                        ? 'ಗೂಗಲ್ ಅಥವಾ ಇಮೇಲ್ ಲಾಗಿನ್ ಮೂಲಕ ತಕ್ಷಣ ಸಿಲಿಂಡರ್ ಬುಕ್ ಮಾಡಿ.'
                        : 'Instant online booking with live tracking for hotels & commercial kitchens.'}
                    </p>
                  </div>

                  <div className="pt-2 mt-1 border-t border-orange-500/40 flex items-center justify-between font-black text-xs uppercase tracking-wider text-amber-200 group-hover:text-white">
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
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white shadow-lg hover:shadow-xl border border-emerald-400/50 hover:border-emerald-300 transition-all transform hover:-translate-y-0.5 group flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/30 text-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                        <span>Zero Sign-In</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">
                        Google Form
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-white leading-snug">
                      {lang === 'kn'
                        ? 'ಹೊಸ ಗ್ರಾಹಕರ ಬುಕಿಂಗ್ (Google Form)'
                        : 'New Customer Order (Google Form)'}
                    </h3>

                    <p className="text-[11px] text-emerald-100/90 leading-relaxed font-normal">
                      {lang === 'kn'
                        ? 'ಯಾವುದೇ ಲಾಗಿನ್ ಅಗತ್ಯವಿಲ್ಲದೆ ನೇರವಾಗಿ ಗೂಗಲ್ ಫಾರ್ಮ್ ಮೂಲಕ ಆರ್ಡರ್ ಮಾಡಿ.'
                        : 'Zero login required. First-time customers can order instantly.'}
                    </p>
                  </div>

                  <div className="pt-2 mt-1 border-t border-emerald-600/40 flex items-center justify-between font-black text-xs uppercase tracking-wider text-emerald-200 group-hover:text-white">
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
                      ? 'ನಮಸ್ಕಾರ ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್, ನನಗೆ ಗೋ ಗ್ಯಾಸ್ / ಪವರ್ ಗ್ಯಾಸ್ ಕಮರ್ಷಿಯಲ್ ಸಿಲಿಂಡರ್ ಡೆಲಿವರಿ ಮತ್ತು ಇಂದಿನ ದರ ಬೇಕಾಗಿದೆ.'
                      : 'Hello Sandhya Enterprises, I would like to inquire about Go Gas / Power Gas commercial LPG cylinder rate & booking.'
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
                  <span>{lang === 'kn' ? 'ದರ ಕರೆ' : 'Call Desk'}: {BUSINESS_INFO.phoneRateEnquiry}</span>
                </a>
              </div>
            </div>

            {/* Quick feature checks (100% Truthful Business Highlights) */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{lang === 'kn' ? '2010 ರಿಂದ ವಿಶ್ವಾಸಾರ್ಹ' : 'Trusted Since 2010'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{lang === 'kn' ? '100% ನಿಖರ ತೂಕ' : '100% Calibrated Weight'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{lang === 'kn' ? '24/7 ತುರ್ತು ನೆರವು' : '24/7 Dedicated Support'}</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card - Spotlight on Go Gas & Power Gas (Bharat Gas omitted from Hero as requested) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    {lang === 'kn' ? 'ಪ್ರಮುಖ ವಾಣಿಜ್ಯ ಸಿಲಿಂಡರ್‌ಗಳು' : 'FEATURED COMMERCIAL BRANDS'}
                  </span>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight">
                    {lang === 'kn' ? 'ಗೋ ಗ್ಯಾಸ್ & ಪವರ್ ಗ್ಯಾಸ್' : 'Go Gas & Power Gas'}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/40 flex items-center justify-center p-0.5 overflow-hidden shadow-sm flex-shrink-0">
                  <img
                    src={sandhyaNewLogo}
                    alt="Sandhya Seal"
                    className="w-full h-full object-contain rounded-full"
                    width="40"
                    height="40"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* 2 Prominently Featured Brand Cards (Go Gas & Power Gas) */}
              <div className="space-y-3">
                {/* 1. Go Gas (Featured Brand) */}
                <Link
                  to="/go-gas"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border-2 border-emerald-500/60 hover:border-emerald-400 transition-all group cursor-pointer block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black text-sm">
                      GG
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">
                          Go Gas
                        </span>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                          ⭐ Recommended
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        12kg, 15kg, 17kg, 19.2kg & 33kg LOT (Composite & Steel)
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* 2. Power Gas (Featured Brand) */}
                <Link
                  to="/power-gas"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border-2 border-blue-500/60 hover:border-blue-400 transition-all group cursor-pointer block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-black text-sm">
                      PG
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">
                          Power Gas
                        </span>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase">
                          🔥 Popular Choice
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        High Pressure Bhatti Flame (12kg, 15kg, 17kg, 19.2kg, 33kg LOT)
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Delivery Hub Note */}
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50 text-[11px] text-slate-300 flex items-start gap-2">
                <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="leading-tight">
                  <strong className="text-white">Daily Run:</strong> Nelamangala & Bengaluru Rural (562123). Rapid delivery in 30-45 minutes.
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onOpenInquiryModal}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'kn' ? 'ದರ ವಿಚಾರಣೆ' : 'Rate Inquiry'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  to="/brands"
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  {lang === 'kn' ? 'ಎಲ್ಲಾ ಬ್ರ್ಯಾಂಡ್‌ಗಳು ನೋಡಿ' : 'View All Brands'} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
