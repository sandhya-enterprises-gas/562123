import React, { useState } from 'react';
import { Flame, Check, MessageCircle, PhoneCall, ArrowRight, Shield, Zap, Sparkles, AlertTriangle } from 'lucide-react';
import { Language, GasBrand } from '../types';
import { CYLINDER_PRODUCTS, BUSINESS_INFO } from '../data/content';

interface BrandShowcaseProps {
  lang: Language;
  onOpenInquiryModal: (brandId?: string) => void;
}

export const BrandShowcase: React.FC<BrandShowcaseProps> = ({
  lang,
  onOpenInquiryModal
}) => {
  const [selectedBrand, setSelectedBrand] = useState<GasBrand>('all');

  const filteredProducts = selectedBrand === 'all'
    ? CYLINDER_PRODUCTS
    : CYLINDER_PRODUCTS.filter((p) => p.brandKey === selectedBrand);

  const brandTabs = [
    { id: 'all' as GasBrand, labelEn: 'All Cylinders', labelKn: 'ಎಲ್ಲಾ ಸಿಲಿಂಡರ್‌ಗಳು' },
    { id: 'bharat' as GasBrand, labelEn: 'Bharat Gas', labelKn: 'ಭಾರತ್ ಗ್ಯಾಸ್' },
    { id: 'gogas' as GasBrand, labelEn: 'GoGas', labelKn: 'ಗೋಗ್ಯಾಸ್' },
    { id: 'powergas' as GasBrand, labelEn: 'Power Gas', labelKn: 'ಪವರ್ ಗ್ಯಾಸ್' },
  ];

  return (
    <section id="brands" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-orange-100 text-orange-900 text-[10px] font-black uppercase tracking-widest border border-orange-200">
            <Flame className="w-3 h-3 text-orange-600" />
            <span>{lang === 'kn' ? 'ನಮ್ಮಲ್ಲಿ ಲಭ್ಯವಿರುವ ಪ್ರಮುಖ ಬ್ರ್ಯಾಂಡ್‌ಗಳು' : 'COMMERCIAL LPG CYLINDER RANGE'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            {lang === 'kn' ? (
              <>
                ಭಾರತ್ ಗ್ಯಾಸ್, ಗೋ ಗ್ಯಾಸ್ & ಪವರ್ ಗ್ಯಾಸ್{' '}
                <span className="text-orange-600">ಅಧಿಕೃತ ಪೂರೈಕೆ</span>
              </>
            ) : (
              <>
                Bharat Gas, Go Gas & Power Gas{' '}
                <span className="text-orange-600">Authorized Supply</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {lang === 'kn'
              ? 'ಹೋಟೆಲ್, ರೆಸ್ಟೋರೆಂಟ್, ಕ್ಯಾಟರಿಂಗ್ ಹಾಗೂ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾದ ಅಧಿಕೃತ ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್‌ಗಳು. ಪ್ರತಿ ತಿಂಗಳು ದರ ಬದಲಾಗುವುದರಿಂದ ಇಂದಿನ ರಿಯಾಯಿತಿ ದರಕ್ಕಾಗಿ ಕರೆ ಮಾಡಿ.'
              : 'Certified commercial LPG cylinders engineered for high efficiency, high BTU output, and reliable doorstep dispatch across Nelamangala & Tumkur corridors.'}
          </p>
        </div>

        {/* Brand Selector Tabs */}
        <div className="flex items-center justify-center mt-6 mb-8">
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/80 border border-slate-300 gap-1 flex-wrap justify-center">
            {brandTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedBrand(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedBrand === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-white/70'
                }`}
              >
                {lang === 'kn' ? tab.labelKn : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-orange-500 hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                {/* Top Subtle Accent Strip */}
                <div className="h-1 w-full bg-slate-800 group-hover:bg-orange-600 transition-colors" />

                <div className="p-5 flex-1 flex flex-col">
                  {/* Top Badge & Brand Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                      {lang === 'kn' ? product.badgeKn : product.badgeEn}
                    </span>

                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {product.brand}
                    </span>
                  </div>

                  {/* Title & Capacity */}
                  <div className="mb-3">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                      {lang === 'kn' ? product.nameKn : product.nameEn}
                    </h3>
                    <div className="inline-block mt-1 px-2.5 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-[11px] font-black uppercase">
                      Capacity: {product.capacity}
                    </div>
                  </div>

                  {/* Type / Ideal For */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 mb-3 text-xs space-y-0.5">
                    <div className="font-bold text-slate-700 text-[11px] uppercase">
                      {lang === 'kn' ? 'ಸೂಕ್ತ ಬಳಕೆ:' : 'Ideal Usage:'}
                    </div>
                    <div className="text-slate-600 text-xs leading-snug">
                      {lang === 'kn' ? product.idealForKn : product.idealForEn}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-1.5 mb-4 flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {lang === 'kn' ? 'ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯಗಳು' : 'Specifications'}
                    </div>
                    <ul className="space-y-1">
                      {(lang === 'kn' ? product.featuresKn : product.featuresEn).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <Check
                            className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-orange-600"
                          />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Advisory Note */}
                  <div className="p-2.5 rounded-lg bg-orange-50 border-l-3 border-orange-600 border border-orange-200 mb-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-orange-950 uppercase">
                      <AlertTriangle className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                      <span>{lang === 'kn' ? 'ದರ ವಿಚಾರಣೆ ಸೂಚನೆ:' : 'Live Price Advisory:'}</span>
                    </div>
                    <p className="text-[11px] text-orange-900 mt-0.5 leading-snug">
                      {lang === 'kn'
                        ? 'ಪ್ರತಿ ತಿಂಗಳು ಗ್ಯಾಸ್ ದರ ಬದಲಾಗುವುದರಿಂದ ಇಂದಿನ ದರಕ್ಕಾಗಿ ಕರೆ ಮಾಡಿ: 8152889500'
                        : 'Rate revisions occur monthly. First call or WhatsApp for today\'s discounted wholesale rate.'}
                    </p>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={`tel:${BUSINESS_INFO.phonePrimary}`}
                      className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] uppercase tracking-wider transition-colors text-center"
                    >
                      <PhoneCall className="w-3 h-3 text-orange-400" />
                      <span>8152889500</span>
                    </a>

                    <a
                      href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
                        lang === 'kn'
                          ? `ನಮಸ್ಕಾರ ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್, ನನಗೆ ${product.nameKn} (${product.capacity}) ಇಂದಿನ ದರ ಮತ್ತು ಡೆಲಿವರಿ ಮಾಹಿತಿ ಬೇಕಾಗಿದೆ.`
                          : `Hello Sandhya Enterprises, Please share today's rate & delivery availability for ${product.nameEn} (${product.capacity}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-black text-[11px] uppercase tracking-wider transition-colors text-center"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bulk Supply Bar in High Density Style */}
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800 shadow-sm">
          <div className="space-y-0.5 text-center md:text-left">
            <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              {lang === 'kn' ? 'ಬೃಹತ್ ಪ್ರಮಾಣದ ಆರ್ಡರ್ (Bulk Commercial Gas Supply)?' : 'Commercial Kitchen & Industrial Manifold Supply'}
            </h4>
            <p className="text-xs text-slate-300">
              {lang === 'kn'
                ? 'ಹೋಟೆಲ್ ಚೈನ್, ಕ್ಯಾಟರಿಂಗ್ ಮತ್ತು ಕೈಗಾರಿಕೆಗಳಿಗೆ ವಿಶೇಷ ರಿಯಾಯಿತಿ ಮತ್ತು ನಿರಂತರ ಬ್ಯಾಕ್‌ಅಪ್ ಒಪ್ಪಂದಗಳು ಲಭ್ಯ.'
                : 'Special bulk concessions, auto-replenishment contracts & multi-cylinder manifold engineering assistance.'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onOpenInquiryModal()}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider transition-colors"
            >
              {lang === 'kn' ? 'ಬಲ್ಕ್ ದರ ಕೇಳಿ' : 'REQUEST BULK QUOTE'}
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phonePrimary}`}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider border border-slate-700 transition-colors"
            >
              +91 {BUSINESS_INFO.phonePrimary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
