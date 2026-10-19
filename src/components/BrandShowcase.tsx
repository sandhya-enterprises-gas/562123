import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Check,
  MessageCircle,
  PhoneCall,
  ArrowRight,
  Shield,
  Zap,
  Sparkles,
  AlertTriangle,
  Award,
  CheckCircle2,
  ChevronRight,
  Truck
} from 'lucide-react';
import { Language, GasBrand } from '../types';
import { CYLINDER_PRODUCTS, BUSINESS_INFO, AVAILABLE_CYLINDERS, CYLINDER_AVAILABILITY_NOTE } from '../data/content';

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
    { id: 'all' as GasBrand, labelEn: 'All Brands', labelKn: 'ಎಲ್ಲಾ ಬ್ರ್ಯಾಂಡ್‌ಗಳು' },
    { id: 'gogas' as GasBrand, labelEn: '🟢 Go Gas (Recommended)', labelKn: '🟢 ಗೋ ಗ್ಯಾಸ್ (ಶಿಫಾರಸು)' },
    { id: 'powergas' as GasBrand, labelEn: '🔵 Power Gas (Popular)', labelKn: '🔵 ಪವರ್ ಗ್ಯಾಸ್ (ಜನಪ್ರಿಯ)' },
    { id: 'bharat' as GasBrand, labelEn: '🟠 Bharat Gas (Standard)', labelKn: '🟠 ಭಾರತ್ ಗ್ಯಾಸ್' }
  ];

  return (
    <section id="brands" className="py-12 sm:py-16 bg-slate-900 text-white border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-black uppercase tracking-widest border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'kn' ? 'ಪ್ರಮುಖ ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ ಶ್ರೇಣಿ' : 'COMMERCIAL LPG CYLINDER PORTFOLIO'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
            {lang === 'kn' ? (
              <>
                ಗೋ ಗ್ಯಾಸ್ & ಪವರ್ ಗ್ಯಾಸ್{' '}
                <span className="text-emerald-400">ಅಧಿಕೃತ ವಾಣಿಜ್ಯ ಪೂರೈಕೆ</span>
              </>
            ) : (
              <>
                Go Gas & Power Gas{' '}
                <span className="text-emerald-400">Authorized Commercial Supply</span>
              </>
            )}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {lang === 'kn'
              ? 'ಹೋಟೆಲ್, ರೆಸ್ಟೋರೆಂಟ್, ಬೇಕರಿ ಮತ್ತು ಕೈಗಾರಿಕೆಗಳ ವ್ಯಾಪಾರ ಲಾಭ ಹೆಚ್ಚಿಸಲು ಗೋ ಗ್ಯಾಸ್ ಮತ್ತು ಪವರ್ ಗ್ಯಾಸ್ ನಮ್ಮ ಮೊದಲ ಶಿಫಾರಸು. ಭಾರತ್ ಗ್ಯಾಸ್ ಸಹ ಲಭ್ಯವಿದೆ.'
              : 'Our primary recommendation for restaurants, hotels, bakeries & catering businesses is Go Gas and Power Gas for maximum fuel economy, rapid delivery, and zero paperwork. Bharat Gas is also supplied.'}
          </p>
        </div>

        {/* PROMINENT STRATEGIC OFFER BANNER FOR BUSINESSES (GO GAS & POWER GAS) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 border-2 border-emerald-500/50 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>⭐ Recommended for Commercial Establishments</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                {lang === 'kn'
                  ? 'ನಿಮ್ಮ ಕಿಚನ್‌ಗೆ ಗೋ ಗ್ಯಾಸ್ ಅಥವಾ ಪವರ್ ಗ್ಯಾಸ್ ಆಯ್ಕೆ ಮಾಡಿ!'
                  : 'Power Your Kitchen with Go Gas & Power Gas!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {lang === 'kn'
                  ? 'ದಾಖಲೆಗಳ ಗೋಜಿಲ್ಲದೆ 100% ತಕ್ಷಣ ಕನೆಕ್ಷನ್ • 30-45 ನಿಮಿಷಗಳಲ್ಲಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಡೆಲಿವರಿ • ಕಪ್ಪು ಕಲೆ ರಹಿತ ಶುದ್ಧ ನೀಲಿ ಜ್ವಾಲೆ • ಅತ್ಯುತ್ತಮ ರಿಯಾಯಿತಿ ದರ.'
                  : 'Zero documentation delays • Rapid 30-45 minute dispatch • Clean soot-free blue flame • Exclusive commercial discount pricing.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/go-gas"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 transition"
              >
                <span>Explore Go Gas</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/power-gas"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 transition"
              >
                <span>Explore Power Gas</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* STRICT AVAILABLE CYLINDER VARIANTS STRIP (12kg, 15kg, 17kg, 19.2kg, 33kg LOT - NO 45/47.5kg) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-black text-xs sm:text-sm text-white uppercase tracking-wider">
                {lang === 'kn' ? 'ಲಭ್ಯವಿರುವ ನಿಖರ ಸಿಲಿಂಡರ್ ಶ್ರೇಣಿ (Available Cylinder Variants):' : 'Officially Supplied Cylinder Variants:'}
              </span>
            </div>
            <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              {lang === 'kn' ? '45 KG / 47.5 KG ಲಭ್ಯವಿಲ್ಲ' : '45 KG & 47.5 KG Not Stocked'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { size: '12 KG', descEn: 'Compact / Cafes', descKn: 'ಸಣ್ಣ ಕೆಫೆ & ಫುಡ್ ಟ್ರಕ್', tag: 'Compact' },
              { size: '15 KG', descEn: 'Mid-Size Bakeries', descKn: 'ಬೇಕರಿ & ಸ್ನ್ಯಾಕ್ ಸೆಂಟರ್', tag: 'Mid-Size' },
              { size: '17 KG', descEn: 'High-Efficiency', descKn: 'ರೆಸ್ಟೋರೆಂಟ್ & ಕಾಂಪೋಸಿಟ್', tag: 'Efficient' },
              { size: '19.2 KG', descEn: 'Commercial Standard VOT', descKn: 'ಹೋಟೆಲ್ & ದಾಬಾ ಸ್ಟ್ಯಾಂಡರ್ಡ್', tag: 'Workhorse' },
              { size: '33 KG LOT', descEn: 'Liquid Off-Take Industrial', descKn: 'ಮ್ಯಾನಿಫೋಲ್ಡ್ & ಇಂಡಸ್ಟ್ರಿಯಲ್', tag: 'Heavy LOT' }
            ].map((v, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-500 block">{v.tag}</span>
                <span className="text-base font-black text-emerald-400 block font-mono">{v.size}</span>
                <span className="text-[10px] text-slate-400 block truncate">{lang === 'kn' ? v.descKn : v.descEn}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 italic text-center pt-1">
            {lang === 'kn' ? CYLINDER_AVAILABILITY_NOTE.kn : CYLINDER_AVAILABILITY_NOTE.en}
          </p>
        </div>

        {/* Brand Selector Tabs */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-800 border border-slate-700 gap-1 flex-wrap justify-center">
            {brandTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedBrand(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedBrand === tab.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                {lang === 'kn' ? tab.labelKn : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: Ordered Go Gas first, Power Gas second, Bharat Gas third */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isGoGas = product.brandKey === 'gogas';
            const isPowerGas = product.brandKey === 'powergas';

            return (
              <div
                key={product.id}
                className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden group shadow-lg ${
                  isGoGas
                    ? 'bg-gradient-to-b from-slate-900 to-emerald-950/40 border-emerald-500/60 hover:border-emerald-400 ring-1 ring-emerald-500/20'
                    : isPowerGas
                    ? 'bg-gradient-to-b from-slate-900 to-blue-950/40 border-blue-500/60 hover:border-blue-400 ring-1 ring-blue-500/20'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Top Accent Strip */}
                <div
                  className={`h-1.5 w-full ${
                    isGoGas
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : isPowerGas
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-400'
                      : 'bg-slate-700'
                  }`}
                />

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  {/* Top Badges */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          isGoGas
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : isPowerGas
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {lang === 'kn' ? product.badgeKn : product.badgeEn}
                      </span>

                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded ${
                          isGoGas
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                            : isPowerGas
                            ? 'bg-blue-950 text-blue-400 border border-blue-700'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {product.brand}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      {lang === 'kn' ? product.nameKn : product.nameEn}
                    </h3>

                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">
                        {lang === 'kn' ? product.typeKn : product.typeEn}
                      </span>
                      <span className="font-mono font-black text-sm text-emerald-300">
                        {product.capacity}
                      </span>
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300">
                      <strong className="text-slate-400 block uppercase text-[10px] font-black tracking-wider">
                        {lang === 'kn' ? 'ಸೂಕ್ತ ಬಳಕೆ:' : 'Ideal For:'}
                      </strong>
                      <span className="font-semibold text-white">
                        {lang === 'kn' ? product.idealForKn : product.idealForEn}
                      </span>
                    </div>

                    {/* Features list */}
                    <div className="mt-4 space-y-2">
                      {(lang === 'kn' ? product.featuresKn : product.featuresEn).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              isGoGas ? 'text-emerald-400' : isPowerGas ? 'text-blue-400' : 'text-slate-400'
                            }`}
                          />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center gap-2">
                      {isGoGas ? (
                        <Link
                          to="/go-gas"
                          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider text-center transition shadow-md"
                        >
                          {lang === 'kn' ? 'ಗೋ ಗ್ಯಾಸ್ ವಿವರ' : 'Explore Go Gas'} →
                        </Link>
                      ) : isPowerGas ? (
                        <Link
                          to="/power-gas"
                          className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider text-center transition shadow-md"
                        >
                          {lang === 'kn' ? 'ಪವರ್ ಗ್ಯಾಸ್ ವಿವರ' : 'Explore Power Gas'} →
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenInquiryModal(product.nameEn)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider text-center transition border border-slate-700 cursor-pointer"
                        >
                          {lang === 'kn' ? 'ದರ ವಿಚಾರಣೆ' : 'Rate Quote'}
                        </button>
                      )}

                      <Link
                        to="/booking"
                        className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition border border-slate-700 text-center"
                      >
                        {lang === 'kn' ? 'ಬುಕ್' : 'Book'}
                      </Link>
                    </div>

                    <a
                      href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
                        `Hello Sandhya Enterprises, I want to book ${product.nameEn} and get today's rate.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/50 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lang === 'kn' ? 'WhatsApp ಬುಕಿಂಗ್' : 'Order via WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPARISON TABLE: GO GAS vs POWER GAS vs BHARAT GAS */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 mt-8">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Strategic Comparison</span>
            <h3 className="text-lg font-black text-white uppercase">
              {lang === 'kn' ? 'ವಾಣಿಜ್ಯ ಬ್ರ್ಯಾಂಡ್‌ಗಳ ಹೋಲಿಕೆ (Brand Comparison)' : 'Commercial LPG Brand Comparison Matrix'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'kn'
                ? 'ನಿಮ್ಮ ಅಡುಗೆ ಮನೆ ಅಥವಾ ಕಾರ್ಖಾನೆಗೆ ಯಾವ ಬ್ರ್ಯಾಂಡ್ ಹೆಚ್ಚು ಸೂಕ್ತ ಎಂದು ನೋಡಿ:'
                : 'Evaluate which commercial brand maximizes your kitchen productivity and fuel economy:'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-black tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Feature / Benefit</th>
                  <th className="py-3 px-4 text-emerald-400">🟢 Go Gas (Best Seller)</th>
                  <th className="py-3 px-4 text-blue-400">🔵 Power Gas (Popular)</th>
                  <th className="py-3 px-4 text-slate-400">🟠 Bharat Gas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                <tr className="hover:bg-slate-900/50">
                  <td className="py-3 px-4 font-bold text-white">Daily Doorstep Run</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">✅ Rapid (30-45 mins)</td>
                  <td className="py-3 px-4 text-blue-300 font-bold">✅ Rapid (30-45 mins)</td>
                  <td className="py-3 px-4 text-slate-400">✔ Standard Daily Run</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-3 px-4 font-bold text-white">Commercial Focus</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">⭐⭐⭐⭐⭐ Highest</td>
                  <td className="py-3 px-4 text-blue-400 font-bold">⭐⭐⭐⭐⭐ Highest</td>
                  <td className="py-3 px-4 text-slate-400">⭐⭐⭐ Good</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-3 px-4 font-bold text-white">Paperwork / New Connection</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">✅ 0% Docs (Instant Setup)</td>
                  <td className="py-3 px-4 text-blue-300 font-bold">✅ 0% Docs (Instant Setup)</td>
                  <td className="py-3 px-4 text-slate-400">KYC Verification Required</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-3 px-4 font-bold text-white">Priority Support</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">✅ 24/7 Dedicated Support</td>
                  <td className="py-3 px-4 text-blue-300 font-bold">✅ 24/7 Dedicated Support</td>
                  <td className="py-3 px-4 text-slate-400">Standard Desk</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-3 px-4 font-bold text-white">Flame Characteristic</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">Pure Blue Flame (Soot-Free)</td>
                  <td className="py-3 px-4 text-blue-300 font-bold">High Flame & Intense Heat</td>
                  <td className="py-3 px-4 text-slate-400">Standard Commercial Flame</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-3 px-4 font-bold text-white">Available Sizes</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">12kg, 15kg, 17kg, 19.2kg, 33kg</td>
                  <td className="py-3 px-4 text-blue-300 font-mono">12kg, 15kg, 17kg, 19.2kg, 33kg</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">19.2kg & 33kg LOT</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
