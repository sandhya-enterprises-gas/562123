import React from 'react';
import { UtensilsCrossed, Truck, Building2, Factory, ArrowRight, Check } from 'lucide-react';
import { Language } from '../types';
import { CUSTOMER_SEGMENTS } from '../data/content';

interface CustomerSegmentsProps {
  lang: Language;
  onOpenInquiryModal: () => void;
}

export const CustomerSegments: React.FC<CustomerSegmentsProps> = ({
  lang,
  onOpenInquiryModal
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-4 h-4 text-orange-600" />;
      case 'Truck':
        return <Truck className="w-4 h-4 text-orange-600" />;
      case 'Building2':
        return <Building2 className="w-4 h-4 text-orange-600" />;
      case 'Factory':
        return <Factory className="w-4 h-4 text-orange-600" />;
      default:
        return <UtensilsCrossed className="w-4 h-4 text-orange-600" />;
    }
  };

  return (
    <section id="customers" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-orange-100 text-orange-900 text-[10px] font-black uppercase tracking-widest border border-orange-200">
            <span>{lang === 'kn' ? 'ನಮ್ಮ ಸೇವೆಗಳು ಯಾರಿಗೆಲ್ಲ ಲಭ್ಯ?' : 'WHO WE SERVE'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            {lang === 'kn' ? (
              <>
                ಪ್ರತಿಯೊಂದು ಕಮರ್ಷಿಯಲ್ ಅಗತ್ಯಕ್ಕೂ{' '}
                <span className="text-orange-600">ವಿಶೇಷ ಗ್ಯಾಸ್ ಪರಿಹಾರ</span>
              </>
            ) : (
              <>
                Commercial LPG Solutions for{' '}
                <span className="text-orange-600">Every Business Sector</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {lang === 'kn'
              ? 'ಹೋಟೆಲ್‌ಗಳಿಂದ ಹಿಡಿದು ದೊಡ್ಡ ಕೈಗಾರಿಕೆಗಳವರೆಗೆ, ದಿನದ 24 ಗಂಟೆಯೂ ನಿರಂತರ ಮತ್ತು ಸುರಕ್ಷಿತ ಎಲ್‌ಪಿಜಿ ಅನಿಲ ಸರಬರಾಜು.'
              : 'From high-demand restaurant kitchens and banquet halls to industrial process heating lines, we ensure zero downtime.'}
          </p>
        </div>

        {/* 4 Core Segment Cards in High Density Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {CUSTOMER_SEGMENTS.map((segment) => (
            <div
              key={segment.id}
              className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-orange-500 hover:shadow-md transition-all flex flex-col group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform">
                  {getIcon(segment.icon)}
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 text-[10px] font-black uppercase tracking-wider">
                  {lang === 'kn' ? segment.tagKn : segment.tagEn}
                </span>
              </div>

              <h3 className="text-sm font-black text-slate-900 mb-1.5 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                {lang === 'kn' ? segment.titleKn : segment.titleEn}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                {lang === 'kn' ? segment.descKn : segment.descEn}
              </p>

              <button
                onClick={onOpenInquiryModal}
                className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-black text-orange-600 hover:text-orange-700 uppercase tracking-wider transition-colors"
              >
                <span>{lang === 'kn' ? 'ದರ ಪಟ್ಟಿ ಕೇಳಿ' : 'Ask Rates'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
