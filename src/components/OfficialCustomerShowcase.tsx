import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  Truck,
  PhoneCall,
  Flame,
  CheckCircle2,
  ArrowRight,
  Eye,
  Lock
} from 'lucide-react';
import { Language, CylinderProduct } from '../types';
import { OFFICIAL_CUSTOMER_BENEFITS, CYLINDER_PRODUCTS, BUSINESS_INFO } from '../data/content';

interface OfficialCustomerShowcaseProps {
  lang: Language;
  onOpenCustomerPortal: () => void;
  onSelectProduct?: (prod: CylinderProduct) => void;
}

export const OfficialCustomerShowcase: React.FC<OfficialCustomerShowcaseProps> = ({
  lang,
  onOpenCustomerPortal,
  onSelectProduct
}) => {
  const content = OFFICIAL_CUSTOMER_BENEFITS[lang];
  const [selectedCylinder, setSelectedCylinder] = useState<CylinderProduct>(CYLINDER_PRODUCTS[0]);

  const icons = [
    Zap,          // Instant connection
    ShieldCheck,  // 100% Weight & Safety
    Layers,       // Wide Portfolio
    Sparkles,     // GoGas Elite
    Truck,        // Express Regional Delivery
    PhoneCall     // 24/7 Support
  ];

  return (
    <section id="customer-benefits" className="py-12 sm:py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>1. FOR CUSTOMERS • ಗ್ರಾಹಕರಿಗೆ (ಅಧಿಕೃತ ಸೇವೆಗಳು)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* 6 Official Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.items.map((item, idx) => {
            const IconComp = icons[idx] || ShieldCheck;
            const isHighlight = item.id === 'gogas-elite' || item.id === 'conn';

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isHighlight
                    ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-orange-500/40 shadow-lg shadow-orange-950/20 ring-1 ring-orange-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${isHighlight ? 'bg-orange-600 text-white' : 'bg-slate-800 text-orange-400 border border-slate-700'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {item.id === 'gogas-elite' && (
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-sky-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      {lang === 'kn' ? 'ಗ್ಯಾಸ್ ಮಟ್ಟ ಹೊರಗಿನಿಂದಲೇ ಗೋಚರ' : 'Visible LPG Level Body'}
                    </span>
                    <span className="text-[10px] text-slate-400">100% Rust-Proof</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Wide Cylinder Portfolio Spotlight (12kg, 17kg, 19kg, 33kg, 45kg LOT/VOT) */}
        <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-orange-400">
                {lang === 'kn' ? 'ಸಂಪೂರ್ಣ ಸಿಲಿಂಡರ್ ಶ್ರೇಣಿ' : 'Comprehensive LPG Portfolio'}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5">
                12kg, 17kg, 19kg, 33kg & 45kg (LOT/VOT)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCustomerPortal}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all whitespace-nowrap"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{lang === 'kn' ? 'ಗ್ರಾಹಕರ ಲಾಗಿನ್' : 'Customer Portal'}</span>
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phonePrimary}`}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-slate-700 transition-all whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>8152889500</span>
              </a>
            </div>
          </div>

          {/* Cylinder Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {CYLINDER_PRODUCTS.map((prod) => {
              const isSelected = selectedCylinder.id === prod.id;
              return (
                <button
                  key={prod.id}
                  onClick={() => setSelectedCylinder(prod)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-orange-600/20 border-orange-500 text-white shadow-xs ring-1 ring-orange-500'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {prod.brand}
                  </div>
                  <div className="text-sm font-black text-white my-1">
                    {prod.capacity}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {lang === 'kn' ? prod.badgeKn : prod.badgeEn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Cylinder Detailed View */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-orange-600 text-white">
                  {selectedCylinder.brand}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {lang === 'kn' ? selectedCylinder.typeKn : selectedCylinder.typeEn}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-white">
                {lang === 'kn' ? selectedCylinder.nameKn : selectedCylinder.nameEn}
              </h4>
              <p className="text-xs text-slate-300">
                <strong className="text-orange-400">{lang === 'kn' ? 'ಸೂಕ್ತ ಬಳಕೆ:' : 'Ideal For:'} </strong>
                {lang === 'kn' ? selectedCylinder.idealForKn : selectedCylinder.idealForEn}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {(lang === 'kn' ? selectedCylinder.featuresKn : selectedCylinder.featuresEn).map((f, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-2 flex-shrink-0">
              <a
                href={`https://wa.me/918152889500?text=${encodeURIComponent(
                  `Namaste Sandhya Enterprises, I would like to book a commercial connection for ${selectedCylinder.nameEn} (${selectedCylinder.capacity}). Please share details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{lang === 'kn' ? 'ವಾಟ್ಸಾಪ್ ಬುಕಿಂಗ್' : 'Book on WhatsApp'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onOpenCustomerPortal}
                className="w-full px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black uppercase tracking-wider text-center border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-orange-400" />
                <span>{lang === 'kn' ? '1-ಕ್ಲಿಕ್ ಆರ್ಡರ್ ಪೋರ್ಟಲ್' : '1-Click Customer Portal'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
