import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  CheckCircle2,
  Zap,
  Award,
  Truck,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  CookingPot,
  Gauge
} from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface PowerGasLandingProps {
  lang: Language;
  onOpenInquiry: () => void;
}

export const PowerGasLanding: React.FC<PowerGasLandingProps> = ({ lang, onOpenInquiry }) => {
  const powerGasVariants = [
    {
      size: '12 KG',
      nameEn: '12 KG High Pressure / Compact',
      nameKn: '12 ಕೆ.ಜಿ ಹೈ ಪ್ರೆಶರ್ / ಕಾಂಪ್ಯಾಕ್ಟ್',
      typeEn: 'Compact Commercial High-Flame',
      typeKn: 'ಕಾಂಪ್ಯಾಕ್ಟ್ ಹೈ-ಫ್ಲೇಮ್',
      descEn: 'High intensity burner setups for roadside food counters, mobile kiosks & small fryers.',
      descKn: 'ಫಾಸ್ಟ್ ಫುಡ್ ಕೌಂಟರ್, ಮೊಬೈಲ್ ಕಿಯಾಸ್ಕ್ ಮತ್ತು ಡೀಪ್ ಫ್ರೈಯರ್‌ಗಳಿಗೆ ತೀವ್ರ ಜ್ವಾಲೆ.',
      badge: 'High Flame'
    },
    {
      size: '15 KG',
      nameEn: '15 KG Commercial Bhatti Standard',
      nameKn: '15 ಕೆ.ಜಿ ಕಮರ್ಷಿಯಲ್ ಭಟ್ಟಿ ಸ್ಟ್ಯಾಂಡರ್ಡ್',
      typeEn: 'Mid-Size Commercial Power',
      typeKn: 'ಮಧ್ಯಮ ವಾಣಿಜ್ಯ ಸಾಮರ್ಥ್ಯ',
      descEn: 'Sweet shops, snack centers & catering units operating continuous high-BTU stoves.',
      descKn: 'ಸ್ವೀಟ್ ಶಾಪ್, ಸ್ನ್ಯಾಕ್ ಸೆಂಟರ್ ಹಾಗೂ ನಿರಂತರ ಹೈ-BTU ಸ್ಟೌವ್ ಬಳಸುವ ಕ್ಯಾಟರಿಂಗ್ ಘಟಕಗಳು.',
      badge: 'Bhatti Jet'
    },
    {
      size: '17 KG',
      nameEn: '17 KG High Thermal Output',
      nameKn: '17 ಕೆ.ಜಿ ಹೈ ಥರ್ಮಲ್ ಔಟ್‌ಪುಟ್',
      typeEn: 'Extended Duration High-Flame',
      typeKn: 'ಹೆಚ್ಚು ಕಾಲ ತೀವ್ರ ಜ್ವಾಲೆ',
      descEn: 'Chinese wok ranges, tandoors & multi-burner fast-food kitchens.',
      descKn: 'ಚೈನೀಸ್ ವೋಕ್ ರೇಂಜ್, ತಂದೂರ್ ಮತ್ತು ಮಲ್ಟಿ-ಬರ್ನರ್ ಫಾಸ್ಟ್-ಫುಡ್ ಕಿಚನ್‌ಗಳು.',
      badge: 'High Thermal'
    },
    {
      size: '19.2 KG',
      nameEn: '19.2 KG Commercial Standard (Heavy Duty)',
      nameKn: '19.2 ಕೆ.ಜಿ ಕಮರ್ಷಿಯಲ್ ಸ್ಟ್ಯಾಂಡರ್ಡ್ (ಹೆವಿ ಡ್ಯೂಟಿ)',
      typeEn: 'Highway Dhaba & Restaurant Standard',
      typeKn: 'ಹೆದ್ದಾರಿ ದಾಬಾ & ಹೋಟೆಲ್ ಸ್ಟ್ಯಾಂಡರ್ಡ್',
      descEn: 'Engineered for intense cooking pressure, non-stop curries, biryani bhattis and heavy stockpots.',
      descKn: 'ಬಿರಿಯಾನಿ ಭಟ್ಟಿ, ಹೆದ್ದಾರಿ ದಾಬಾ ಹಾಗೂ ದೊಡ್ಡ ಪಾತ್ರೆಗಳಲ್ಲಿ ಅಡುಗೆ ಮಾಡುವ ಹೋಟೆಲ್‌ಗಳಿಗೆ ಸೂಕ್ತ.',
      badge: '🔥 Most Popular'
    },
    {
      size: '33 KG LOT',
      nameEn: '33 KG LOT Liquid Off-Take Industrial',
      nameKn: '33 ಕೆ.ಜಿ LOT ಲಿಕ್ವಿಡ್ ಆಫ್-ಟೇಕ್ ಇಂಡಸ್ಟ್ರಿಯಲ್',
      typeEn: 'Heavy Industrial Manifold Supply',
      typeKn: 'ಭಾರಿ ಕೈಗಾರಿಕಾ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಪೂರೈಕೆ',
      descEn: 'High vaporizing demand: multi-cylinder banks, industrial heating, powder coating & large hotels.',
      descKn: 'ದೊಡ್ಡ ಪ್ರಮಾಣದ ಅನಿಲ ಬಳಕೆ, ಮ್ಯಾನಿಫೋಲ್ಡ್ ಬ್ಯಾಂಕ್, ಇಂಡಸ್ಟ್ರಿಯಲ್ ಹೀಟಿಂಗ್ ಮತ್ತು ಪೌಡರ್ ಕೋಟಿಂಗ್.',
      badge: 'Heavy LOT'
    }
  ];

  const advantages = [
    {
      titleEn: 'Max Heat & Intense Blue Flame',
      titleKn: 'ಗರಿಷ್ಠ ಶಾಖ & ತೀವ್ರ ನೀಲಿ ಜ್ವಾಲೆ',
      descEn: 'Calibrated for commercial high-pressure bhattis and jumbo burners with superior BTU output.',
      descKn: 'ಕಮರ್ಷಿಯಲ್ ಹೈ-ಪ್ರೆಶರ್ ಭಟ್ಟಿ ಹಾಗೂ ಜಂಬೋ ಬರ್ನರ್‌ಗಳಿಗೆ ಸೂಕ್ತವಾದ ಅಧಿಕ ಕ್ಯಾಲೋರಿಫಿಕ್ ಜ್ವಾಲೆ.'
    },
    {
      titleEn: 'Zero Flame Fluctuation',
      titleKn: 'ಸ್ಥಿರ ಹಾಗೂ ನಿರಂತರ ಒತ್ತಡ',
      descEn: 'Consistent cylinder pressure from first light until empty, ensuring uniform food preparation.',
      descKn: 'ಸಿಲಿಂಡರ್ ಖಾಲಿಯಾಗುವವರೆಗೂ ಒಂದೇ ಸಮನಾದ ಸ್ಥಿರ ಒತ್ತಡ, ಅಡುಗೆಯ ಗುಣಮಟ್ಟದಲ್ಲಿ ಯಾವುದೇ ವ್ಯತ್ಯಾಸವಿಲ್ಲ.'
    },
    {
      titleEn: 'Rush Season Guaranteed Supply',
      titleKn: 'ಪೀಕ್ ಸಮಯದಲ್ಲಿ ನಿರಂತರ ಸರಬರಾಜು',
      descEn: 'Never run out during weekend surges, weddings, or festival catering rushes with dedicated stock.',
      descKn: 'ವಾರಾಂತ್ಯ, ಮದುವೆ ಸೀಸನ್ ಹಾಗೂ ಹಬ್ಬದ ದಿನಗಳಲ್ಲಿ ಮೀಸಲಾದ ಸ್ಟಾಕ್ ಮೂಲಕ ತಡೆರಹಿತ ಸರಬರಾಜು.'
    },
    {
      titleEn: 'Nelamangala Highway Express Fleet',
      titleKn: 'ಹೆದ್ದಾರಿ ಕಾರಿಡಾರ್‌ನಲ್ಲಿ ವೇಗದ ಡೆಲಿವರಿ',
      descEn: 'Express delivery vehicles stationed along Tumkur Main Road, Nelamangala & industrial hubs.',
      descKn: 'ತುಮಕೂರು ಮುಖ್ಯ ರಸ್ತೆ, ನೆಲಮಂಗಲ ಮತ್ತು ಕೈಗಾರಿಕಾ ವಲಯದಲ್ಲಿ ಸದಾ ಸಂಚರಿಸುವ ನಮ್ಮ ವಾಹನಗಳು.'
    }
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Top Breadcrumb & Corporate Strip */}
      <div className="border-b border-blue-900/60 bg-blue-950/40 py-2.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-300 font-semibold">
            <Link to="/" className="text-slate-400 hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-blue-400 font-bold">Power Gas High-Pressure LPG</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-black uppercase tracking-wider border border-blue-500/30">
            <Zap className="w-3 h-3 text-blue-400" />
            🔥 Popular High-Pressure Choice
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 border-b border-slate-800 bg-gradient-to-b from-blue-950/60 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-wider border border-blue-500/30">
                <Zap className="w-4 h-4 fill-blue-400 text-blue-400" />
                <span>Power Gas High Pressure (Commercial LPG)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                {lang === 'kn' ? (
                  <>
                    ಪವರ್ ಗ್ಯಾಸ್ <span className="text-blue-400">ಹೈ ಪ್ರೆಶರ್ ಎಲ್‌ಪಿಜಿ</span>
                    <br />
                    <span className="text-xl sm:text-3xl font-bold text-slate-200">
                      ದಾಬಾ & ಹೆವಿ ಕಿಚನ್‌ಗಳ ಜನಪ್ರಿಯ ಆಯ್ಕೆ
                    </span>
                  </>
                ) : (
                  <>
                    Power Gas <span className="text-blue-400">High-Pressure LPG</span>
                    <br />
                    <span className="text-xl sm:text-3xl font-bold text-slate-200">
                      High BTU Flame | Fast Cooking | Dhaba Standard
                    </span>
                  </>
                )}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {lang === 'kn'
                  ? 'ಹೆದ್ದಾರಿ ದಾಬಾ, ಭಟ್ಟಿ ಸ್ಟೌವ್, ಫಾಸ್ಟ್ ಫುಡ್ ಕೌಂಟರ್ ಹಾಗೂ ತೀವ್ರ ಶಾಖದ ಅಡುಗೆಗೆ ವಿಶೇಷವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಅಧಿಕ ಒತ್ತಡದ ವಾಣಿಜ್ಯ ಸಿಲಿಂಡರ್‌ಗಳು. ಪೀಕ್ ಬಿಸಿನೆಸ್ ಸಮಯದಲ್ಲೂ ತಡೆರಹಿತ ಸರಬರಾಜು.'
                  : 'Engineered for intensive commercial kitchen loads, high-BTU bhatti stoves, highway dhabas, and mega catering setups. Rapid uninterrupted delivery across Nelamangala & Tumkur corridor.'}
              </p>

              {/* Note about available cylinders */}
              <div className="p-3.5 rounded-xl bg-blue-950/80 border border-blue-700/60 text-xs text-blue-200 space-y-1">
                <div className="flex items-center gap-2 font-black uppercase tracking-wide text-blue-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>{lang === 'kn' ? 'ಲಭ್ಯವಿರುವ ಪವರ್ ಗ್ಯಾಸ್ ಅಳತೆಗಳು:' : 'Available Power Gas Variants:'}</span>
                </div>
                <p className="font-semibold text-white">
                  12 KG • 15 KG • 17 KG • 19.2 KG • 33 KG LOT
                </p>
                <p className="text-[11px] text-amber-300">
                  {lang === 'kn'
                    ? 'ಸೂಚನೆ: ನಮ್ಮ ಬಳಿ 45 KG / 47.5 KG ಸಿಲಿಂಡರ್ ಲಭ್ಯವಿಲ್ಲ. ಕೇವಲ 12KG, 15KG, 17KG, 19.2KG, 33KG LOT ಮಾತ್ರ ಲಭ್ಯ.'
                    : 'Important Note: 45 KG / 47.5 KG cylinders are not stocked. Only 12 KG, 15 KG, 17 KG, 19.2 KG & 33 KG LOT commercial cylinders supplied.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/booking"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Flame className="w-4 h-4" />
                  <span>{lang === 'kn' ? 'ಪವರ್ ಗ್ಯಾಸ್ ಬುಕ್ ಮಾಡಿ' : 'Book Power Gas Online'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <a
                  href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
                    lang === 'kn'
                      ? 'ನಮಸ್ಕಾರ, ನನಗೆ ಪವರ್ ಗ್ಯಾಸ್ (Power Gas) ಹೈ ಪ್ರೆಶರ್ ಕಮರ್ಷಿಯಲ್ ಸಿಲಿಂಡರ್ ಇಂದಿನ ದರ ಮತ್ತು ಡೆಲಿವರಿ ಬೇಕಾಗಿದೆ.'
                      : 'Hello Sandhya Enterprises, I would like to book Power Gas high-pressure commercial cylinders.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'kn' ? 'WhatsApp ಆರ್ಡರ್' : 'WhatsApp Order'}</span>
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                >
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                  <span>{BUSINESS_INFO.phoneRateEnquiry}</span>
                </a>
              </div>
            </div>

            {/* Right Hero High-Impact Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-900 border-2 border-blue-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">High-Pressure Spec</span>
                    <h3 className="text-lg font-black text-white uppercase">Power Gas Commercial</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-black text-xs uppercase border border-blue-500/40">
                    🔥 Popular Choice
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Bhatti & High Flame Rating</span>
                    <strong className="text-blue-400 font-bold">⭐⭐⭐⭐⭐ Grade A</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Pressure Consistency</span>
                    <strong className="text-blue-400 font-bold">100% Regulated Flow</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Highway Delivery Area</span>
                    <strong className="text-blue-400 font-bold">Nelamangala - Tumkur Belt</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Peak Hour Support</span>
                    <strong className="text-blue-400 font-bold">Emergency Refill Available</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <span>{lang === 'kn' ? 'ದರ ವಿಚಾರಣೆಗೆ ಕರೆ ಮಾಡಿ' : 'Request Commercial Rate Quote'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Power Gas Variants Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-blue-400">High-Pressure Range</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
            {lang === 'kn' ? 'ಲಭ್ಯವಿರುವ ಪವರ್ ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ಶ್ರೇಣಿ' : 'Power Gas Cylinder Portfolio'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'kn'
              ? 'ಹೋಟೆಲ್ ಭಟ್ಟಿ, ದಾಬಾ ಮತ್ತು ಕಮರ್ಷಿಯಲ್ ಬರ್ನರ್‌ಗಳಿಗೆ ನಿಖರ 5 ಅಳತೆಗಳು ಲಭ್ಯ.'
              : 'Five calibrated commercial sizes designed for peak flame performance and maximum kitchen output.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {powerGasVariants.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
                    {item.badge}
                  </span>
                  <span className="text-lg font-black text-blue-300 font-mono">{item.size}</span>
                </div>

                <div>
                  <h3 className="text-base font-black text-white group-hover:text-blue-400 transition-colors">
                    {lang === 'kn' ? item.nameKn : item.nameEn}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400 block mt-0.5">
                    {lang === 'kn' ? item.typeKn : item.typeEn}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {lang === 'kn' ? item.descKn : item.descEn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="text-xs font-black text-blue-400 hover:text-blue-300 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'kn' ? 'ದರ ವಿಚಾರಿಸಿ' : 'Get Rate Quote'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  to="/booking"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  {lang === 'kn' ? 'ಬುಕ್ ಮಾಡಿ' : 'Book'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-12 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-blue-400">Power Performance</span>
            <h2 className="text-2xl font-black text-white uppercase">
              {lang === 'kn' ? 'ಪವರ್ ಗ್ಯಾಸ್ ವೈಶಿಷ್ಟ್ಯಗಳು' : 'Why High-Volume Kitchens Choose Power Gas'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {advantages.map((adv, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-black text-white">{lang === 'kn' ? adv.titleKn : adv.titleEn}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{lang === 'kn' ? adv.descKn : adv.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Footer Strip */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
          {lang === 'kn' ? 'ನಿಮ್ಮ ದಾಬಾ ಅಥವಾ ಹೋಟೆಲ್‌ಗೆ ಪವರ್ ಗ್ಯಾಸ್ ಆಯ್ಕೆಮಾಡಿ' : 'Power Your Commercial Kitchen Today'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          {lang === 'kn'
            ? 'ತೀವ್ರ ಜ್ವಾಲೆ, ವೇಗದ ಅಡುಗೆ ಹಾಗೂ ನೇರ ಡೋರ್‌ಸ್ಟೆಪ್ ವಿತರಣೆಗಾಗಿ ಇಂದೇ ಸಂಪರ್ಕಿಸಿ.'
            : 'Uncompromising heat output, stable high pressure, and fast doorstep delivery.'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/booking"
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
          >
            <Flame className="w-4 h-4" />
            <span>{lang === 'kn' ? 'ಆನ್‌ಲೈನ್ ಬುಕ್ ಮಾಡಿ' : 'Book Online Now'}</span>
          </Link>
          <a
            href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
            className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider border border-slate-700 flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-blue-400" />
            <span>Call {BUSINESS_INFO.phoneRateEnquiry}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
