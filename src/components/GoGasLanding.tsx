import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  CheckCircle2,
  Sparkles,
  Award,
  Truck,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  UtensilsCrossed,
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO, CYLINDER_AVAILABILITY_NOTE } from '../data/content';

interface GoGasLandingProps {
  lang: Language;
  onOpenInquiry: () => void;
}

export const GoGasLanding: React.FC<GoGasLandingProps> = ({ lang, onOpenInquiry }) => {
  const goGasVariants = [
    {
      size: '12 KG',
      nameEn: '12 KG Commercial / Compact',
      nameKn: '12 ಕೆ.ಜಿ ಕಮರ್ಷಿಯಲ್ / ಕಾಂಪ್ಯಾಕ್ಟ್',
      typeEn: 'Compact Commercial LPG',
      typeKn: 'ಕಾಂಪ್ಯಾಕ್ಟ್ ಕಮರ್ಷಿಯಲ್',
      descEn: 'Food trucks, kiosks, tea stalls, small cafeterias & laboratories.',
      descKn: 'ಫುಡ್ ಟ್ರಕ್, ಕಿಯಾಸ್ಕ್, ಟೀ ಸ್ಟಾಲ್, ಸಣ್ಣ ಕೆಫೆ & ಲ್ಯಾಬ್.',
      badge: 'Compact'
    },
    {
      size: '15 KG',
      nameEn: '15 KG Commercial Mid-Size',
      nameKn: '15 ಕೆ.ಜಿ ಕಮರ್ಷಿಯಲ್ ಮಿಡ್-ಸೈಜ್',
      typeEn: 'Mid-Capacity Commercial',
      typeKn: 'ಮಧ್ಯಮ ಸಾಮರ್ಥ್ಯದ ಕಮರ್ಷಿಯಲ್',
      descEn: 'Bakeries, snack points, fast food centers and daily caterers.',
      descKn: 'ಬೇಕರಿ, ಸ್ನ್ಯಾಕ್ಸ್ ಪಾಯಿಂಟ್, ಫಾಸ್ಟ್ ಫುಡ್ ಮತ್ತು ನಿತ್ಯದ ಕ್ಯಾಟರರ್ಸ್.',
      badge: 'Bakery Choice'
    },
    {
      size: '17 KG',
      nameEn: '17 KG High-Efficiency / Elite Composite',
      nameKn: '17 ಕೆ.ಜಿ ಹೈ-ಎಫಿಷಿಯನ್ಸಿ / ಎಲೈಟ್ ಕಾಂಪೋಸಿಟ್',
      typeEn: 'Premium Clean Combustion',
      typeKn: 'ಶುದ್ಧ ದಹನ ತಂತ್ರಜ್ಞಾನ',
      descEn: 'Translucent fiberglass composite (see-through gas level) & steel versions.',
      descKn: 'ಗ್ಯಾಸ್ ಮಟ್ಟ ಹೊರಗಿಂದಲೇ ಕಾಣುವ ತುಕ್ಕು ರಹಿತ ಕಾಂಪೋಸಿಟ್ ಮತ್ತು ಸ್ಟೀಲ್ ಸಿಲಿಂಡರ್.',
      badge: 'Composite Tech'
    },
    {
      size: '19.2 KG',
      nameEn: '19.2 KG Commercial Standard VOT',
      nameKn: '19.2 ಕೆ.ಜಿ ಕಮರ್ಷಿಯಲ್ ಸ್ಟ್ಯಾಂಡರ್ಡ್ VOT',
      typeEn: 'Commercial Heavy Workhorse',
      typeKn: 'ಕಮರ್ಷಿಯಲ್ ಹೆವಿ ಡ್ಯೂಟಿ',
      descEn: 'Standard manifold connections for high-volume hotels, restaurants & dhabas.',
      descKn: 'ಹೋಟೆಲ್, ದೊಡ್ಡ ರೆಸ್ಟೋರೆಂಟ್ ಮತ್ತು ಹೆದ್ದಾರಿ ದಾಬಾಗಳಿಗೆ ನಿರಂತರ ಪೂರೈಕೆ.',
      badge: '⭐ Best Seller'
    },
    {
      size: '33 KG LOT',
      nameEn: '33 KG LOT Liquid Off-Take Commercial',
      nameKn: '33 ಕೆ.ಜಿ LOT ಲಿಕ್ವಿಡ್ ಆಫ್-ಟೇಕ್ ಕಮರ್ಷಿಯಲ್',
      typeEn: 'Industrial High Flow Liquid Off-Take',
      typeKn: 'ಕೈಗಾರಿಕಾ ಅಧಿಕ ಹರಿವಿನ LOT',
      descEn: 'Multi-burner banks, marriage feast kitchens, heavy ovens & baking plants.',
      descKn: 'ಮಲ್ಟಿ-ಬರ್ನರ್ ಮ್ಯಾನಿಫೋಲ್ಡ್, ಕಲ್ಯಾಣ ಮಂಟಪ, ಬೃಹತ್ ಬೇಕರಿ ಮತ್ತು ಹೀಟಿಂಗ್ ಓವನ್.',
      badge: 'Heavy LOT'
    }
  ];

  const benefits = [
    {
      titleEn: 'Zero Documentation Hassle',
      titleKn: 'ದಾಖಲೆಗಳ ಗೋಜಿಲ್ಲದೆ ಕನೆಕ್ಷನ್',
      descEn: 'Instant connection for commercial establishments without tedious paperwork or ration cards.',
      descKn: 'ರೇಷನ್ ಕಾರ್ಡ್ ಅಥವಾ ದಾಖಲೆಗಳ ವಿಳಂಬವಿಲ್ಲದೆ ಹೋಟೆಲ್ & ಬೇಕರಿಗಳಿಗೆ ತಕ್ಷಣ ನೂತನ ಕನೆಕ್ಷನ್.'
    },
    {
      titleEn: 'Soot-Free Clean Blue Flame',
      titleKn: 'ಕಪ್ಪು ಕಲೆ ರಹಿತ ಶುದ್ಧ ನೀಲಿ ಜ್ವಾಲೆ',
      descEn: 'High BTU thermal calorific value that keeps cooking cookware spotless and reduces fuel burn time.',
      descKn: 'ಗರಿಷ್ಠ ಕ್ಯಾಲೋರಿಫಿಕ್ ಮೌಲ್ಯ, ಪಾತ್ರೆಗಳಿಗೆ ಕಪ್ಪು ಕಲೆ ಹಿಡಿಯುವುದಿಲ್ಲ ಮತ್ತು ಅಡುಗೆ ಸಮಯ ಉಳಿತಾಯ.'
    },
    {
      titleEn: 'Rapid Doorstep Fleet Run',
      titleKn: '30-45 ನಿಮಿಷಗಳಲ್ಲಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಡೆಲಿವರಿ',
      descEn: 'Dedicated commercial trucks running through Nelamangala & Tumkur Road corridor daily.',
      descKn: 'ನೆಲಮಂಗಲ, ಡಾಬಸ್‌ಪೇಟೆ ಹಾಗೂ ತುಮಕೂರು ರಸ್ತೆ ಕಾರಿಡಾರ್‌ನಲ್ಲಿ ತ್ವರಿತ ಡೋರ್‌ಸ್ಟೆಪ್ ವಿತರಣೆ.'
    },
    {
      titleEn: '100% Weight & Tamper-Proof Seal',
      titleKn: '100% ನಿಖರ ತೂಕ ಮತ್ತು ಅಧಿಕೃತ ಸೀಲ್',
      descEn: 'Calibrated digital weight inspection upon delivery ensuring every kilogram of LPG is accounted for.',
      descKn: 'ಡೆಲಿವರಿ ಸಮಯದಲ್ಲಿ ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸ್ಕೇಲ್ ಪರಿಶೀಲನೆ ಹಾಗೂ ಅಧಿಕೃತ ಸೀಲ್ ಖಾತರಿ.'
    }
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Top Breadcrumb & Corporate Strip */}
      <div className="border-b border-emerald-900/60 bg-emerald-950/40 py-2.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold">
            <Link to="/" className="text-slate-400 hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-emerald-400 font-bold">Go Gas Commercial Solutions</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black uppercase tracking-wider border border-emerald-500/30">
            <Sparkles className="w-3 h-3" />
            ⭐ Recommended for Businesses
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 border-b border-slate-800 bg-gradient-to-b from-emerald-950/60 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
                <Flame className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                <span>Go Gas Commercial (Estd. 2010 Partner)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                {lang === 'kn' ? (
                  <>
                    ಗೋ ಗ್ಯಾಸ್ <span className="text-emerald-400">ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ</span>
                    <br />
                    <span className="text-xl sm:text-3xl font-bold text-slate-200">
                      ಅತ್ಯುತ್ತಮ ದರ & ತ್ವರಿತ ಡೆಲಿವರಿ
                    </span>
                  </>
                ) : (
                  <>
                    Go Gas <span className="text-emerald-400">Commercial LPG</span>
                    <br />
                    <span className="text-xl sm:text-3xl font-bold text-slate-200">
                      Fast Delivery | Best Price | Trusted Partner
                    </span>
                  </>
                )}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {lang === 'kn'
                  ? 'ದಾಖಲೆಗಳ ಗೋಜಿಲ್ಲದೆ ತಕ್ಷಣ ಹೊಸ ಕನೆಕ್ಷನ್, ಕಪ್ಪು ಕಲೆ ರಹಿತ ಶುದ್ಧ ನೀಲಿ ಜ್ವಾಲೆ ಮತ್ತು 30-45 ನಿಮಿಷಗಳಲ್ಲಿ ಮನೆಬಾಗಿಲಿಗೆ ಡೆಲಿವರಿ. ಹೋಟೆಲ್, ಬೇಕರಿ, ಕ್ಯಾಟರಿಂಗ್ ಹಾಗೂ ಕ್ಲೌಡ್ ಕಿಚನ್‌ಗಳ ಮೊದಲ ಆಯ್ಕೆ.'
                  : 'Zero documentation delays, instant commercial connections, soot-free intense blue flame, and express 30-45 minute doorstep replenishment across Nelamangala & Bangalore Rural.'}
              </p>

              {/* Note about available cylinders */}
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-xs text-emerald-200 space-y-1">
                <div className="flex items-center gap-2 font-black uppercase tracking-wide text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'kn' ? 'ಲಭ್ಯವಿರುವ ಗೋ ಗ್ಯಾಸ್ ಅಳತೆಗಳು:' : 'Available Go Gas Variants:'}</span>
                </div>
                <p className="font-semibold text-white">
                  12 KG • 15 KG • 17 KG • 19.2 KG • 33 KG LOT (Elite Composite 12kg & 17kg ಲಭ್ಯ)
                </p>
                <p className="text-[11px] text-amber-300">
                  {lang === 'kn'
                    ? 'ಸೂಚನೆ: ನಮ್ಮಲ್ಲಿ 45 KG / 47.5 KG ಸಿಲಿಂಡರ್ ಲಭ್ಯವಿಲ್ಲ. ಕೇವಲ 12KG, 15KG, 17KG, 19.2KG, 33KG LOT ಮಾತ್ರ ಲಭ್ಯ.'
                    : 'Important Note: 45 KG / 47.5 KG cylinders are not supplied. Available strictly: 12 KG, 15 KG, 17 KG, 19.2 KG & 33 KG LOT.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/booking"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Flame className="w-4 h-4" />
                  <span>{lang === 'kn' ? 'ಗೋ ಗ್ಯಾಸ್ ಬುಕಿಂಗ್' : 'Book Go Gas Online'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <a
                  href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
                    lang === 'kn'
                      ? 'ನಮಸ್ಕಾರ, ನನಗೆ ಗೋ ಗ್ಯಾಸ್ (Go Gas) ಕಮರ್ಷಿಯಲ್ ಸಿಲಿಂಡರ್ ಇಂದಿನ ಬೆಲೆ ಮತ್ತು ಡೆಲಿವರಿ ಬೇಕಾಗಿದೆ.'
                      : 'Hello Sandhya Enterprises, I would like to book Go Gas commercial cylinders and inquire about today\'s rate.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'kn' ? 'WhatsApp ಬುಕಿಂಗ್' : 'WhatsApp Order'}</span>
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>{BUSINESS_INFO.phoneRateEnquiry}</span>
                </a>
              </div>
            </div>

            {/* Right Hero High-Impact Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-900 border-2 border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Commercial Spotlight</span>
                    <h3 className="text-lg font-black text-white uppercase">Go Gas Commercial</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs uppercase border border-emerald-500/40">
                    🏆 Best Seller
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Daily Delivery Speed</span>
                    <strong className="text-emerald-400 font-bold">30 - 45 Minutes</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Paperwork Required</span>
                    <strong className="text-emerald-400 font-bold">0% (Instant Commercial)</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Flame Characteristic</span>
                    <strong className="text-emerald-400 font-bold">Soot-Free Blue Flame</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Commercial Support</span>
                    <strong className="text-emerald-400 font-bold">24/7 Dedicated Line</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://forms.gle/msHNBSBVB9xy2T787"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                  >
                    <span>Instant Google Form Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Go Gas Variants Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Cylinder Variants</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
            {lang === 'kn' ? 'ಲಭ್ಯವಿರುವ ಗೋ ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ಶ್ರೇಣಿ' : 'Go Gas Available Cylinder Portfolio'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'kn'
              ? 'ಪ್ರತಿಯೊಂದು ವಾಣಿಜ್ಯ ಅಡುಗೆ ಕೋಣೆ, ಬೇಕರಿ ಹಾಗೂ ಫ್ಯಾಕ್ಟರಿಯ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ 5 ನಿಖರ ಅಳತೆಗಳು ಲಭ್ಯ.'
              : 'Five calibrated commercial sizes specifically engineered for fuel savings and high burner efficiency.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goGasVariants.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                    {item.badge}
                  </span>
                  <span className="text-lg font-black text-emerald-300 font-mono">{item.size}</span>
                </div>

                <div>
                  <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">
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
                  className="text-xs font-black text-emerald-400 hover:text-emerald-300 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'kn' ? 'ದರ ವಿಚಾರಿಸಿ' : 'Get Today\'s Price'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  to="/booking"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  {lang === 'kn' ? 'ಬುಕ್ ಮಾಡಿ' : 'Book'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Why Choose Go Gas</span>
            <h2 className="text-2xl font-black text-white uppercase">
              {lang === 'kn' ? 'ಗೋ ಗ್ಯಾಸ್ ಆಯ್ಕೆ ಮಾಡುವುದರ ಲಾಭಗಳು' : 'Key Business Advantages with Go Gas'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-black text-white">{lang === 'kn' ? b.titleKn : b.titleEn}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{lang === 'kn' ? b.descKn : b.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Footer Strip */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
          {lang === 'kn' ? 'ಇಂದೇ ಗೋ ಗ್ಯಾಸ್ ವಾಣಿಜ್ಯ ಸಂಪರ್ಕ ಪಡೆಯಿರಿ' : 'Switch Your Kitchen to Go Gas Today'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          {lang === 'kn'
            ? 'ದೈನಂದಿನ ರಿಯಾಯಿತಿ ದರ, ತಕ್ಷಣದ ಡೋರ್‌ಸ್ಟೆಪ್ ಡೆಲಿವರಿ ಹಾಗೂ ಯಾವುದೇ ರೇಷನ್ ಕಾರ್ಡ್ ಅಥವಾ ದಾಖಲೆಗಳ ವಿಳಂಬವಿಲ್ಲ.'
            : 'Best commercial discount rates, prompt doorstep replenishment, and zero red-tape.'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/booking"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
          >
            <Flame className="w-4 h-4" />
            <span>{lang === 'kn' ? 'ಆನ್‌ಲೈನ್ ಬುಕ್ ಮಾಡಿ' : 'Book Online Now'}</span>
          </Link>
          <a
            href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
            className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider border border-slate-700 flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Call {BUSINESS_INFO.phoneRateEnquiry}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
