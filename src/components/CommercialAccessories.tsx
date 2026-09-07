import React from 'react';
import { PackageCheck, Flame, PhoneCall } from 'lucide-react';
import { Language } from '../types';
import { ACCESSORIES, BUSINESS_INFO } from '../data/content';

interface CommercialAccessoriesProps {
  lang: Language;
  onOpenInquiryModal: () => void;
}

export const CommercialAccessories: React.FC<CommercialAccessoriesProps> = ({
  lang,
  onOpenInquiryModal
}) => {
  return (
    <section id="accessories" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-orange-100 text-orange-900 text-[10px] font-black uppercase tracking-widest border border-orange-200">
            <PackageCheck className="w-3 h-3 text-orange-700" />
            <span>{lang === 'kn' ? 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಪರಿಕರಗಳು' : 'COMMERCIAL ACCESSORIES & HARDWARE'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            {lang === 'kn' ? (
              <>
                ಕಮರ್ಷಿಯಲ್ ಬರ್ನರ್‌ಗಳು, ರೆಗ್ಯುಲೇಟರ್‌ಗಳು &{' '}
                <span className="text-orange-600">ಸುರಕ್ಷತಾ ಉಪಕರಣಗಳು</span>
              </>
            ) : (
              <>
                High-BTU Burners, ISI Regulators &{' '}
                <span className="text-orange-600">Pipeline Accessories</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {lang === 'kn'
              ? 'ಹೋಟೆಲ್ ಅಡುಗೆ ಮನೆಗಳು, ಬೇಕರಿಗಳು ಮತ್ತು ದಾಬಾಗಳಿಗೆ ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ರೀತಿಯ ಕ್ಯಾಸ್ಟ್ ಐರನ್ ಬರ್ನರ್‌ಗಳು, ಕಾಪರ್ ಪೈಪ್‌ಗಳು ಮತ್ತು ಸುರಕ್ಷಿತ ಪರಿಕರಗಳು.'
              : 'Certified commercial kitchen fittings engineered for heavy daily loads, leak prevention, and optimal gas pressure.'}
          </p>
        </div>

        {/* Accessories Grid in High Density Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {ACCESSORIES.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-orange-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-900 text-[10px] font-black uppercase tracking-wider border border-orange-200">
                    {lang === 'kn' ? item.categoryKn : item.categoryEn}
                  </span>
                  <div className="p-1.5 rounded-md bg-white border border-slate-200 text-orange-600 shadow-2xs">
                    <Flame className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-sm font-black text-slate-900 mb-1.5 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                  {lang === 'kn' ? item.nameKn : item.nameEn}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'kn' ? item.descKn : item.descEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  {lang === 'kn' ? 'ಸ್ಟಾಕ್ ಲಭ್ಯವಿದೆ • ISI' : 'GENUINE ISI HARDWARE'}
                </span>
                <a
                  href={`tel:${BUSINESS_INFO.phonePrimary}`}
                  className="inline-flex items-center gap-1 text-xs font-black uppercase text-slate-900 hover:text-orange-600"
                >
                  <PhoneCall className="w-3 h-3 text-orange-600" />
                  <span>8152889500</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
