import React from 'react';
import { Truck, Wrench, ShieldAlert, BadgePercent, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { SERVICES_LIST, BUSINESS_INFO } from '../data/content';
import serviceImage from '../assets/images/lpg_commercial_service_1788344692668.jpg';

interface ServicesSpecialtiesProps {
  lang: Language;
  onOpenInquiryModal: () => void;
}

export const ServicesSpecialties: React.FC<ServicesSpecialtiesProps> = ({
  lang,
  onOpenInquiryModal
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-5 h-5 text-orange-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-orange-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'BadgePercent':
        return <BadgePercent className="w-5 h-5 text-emerald-400" />;
      default:
        return <Truck className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <section id="services" className="py-12 sm:py-16 bg-slate-900 text-white border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest border border-orange-500/30">
            <span>{lang === 'kn' ? 'ನಮ್ಮ ಪ್ರತ್ಯೇಕತೆ (Special Services)' : 'SPECIALIZED LPG SERVICES'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            {lang === 'kn' ? (
              <>
                ನೆಲಮಂಗಲ & ಸುತ್ತಮುತ್ತ{' '}
                <span className="text-orange-500">
                  ಅತ್ಯುತ್ತಮ ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಸೇವೆ
                </span>
              </>
            ) : (
              <>
                Engineered for Commercial Reliability &{' '}
                <span className="text-orange-500">
                  Total Kitchen Safety
                </span>
              </>
            )}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {lang === 'kn'
              ? 'ಕೇವಲ ಸಿಲಿಂಡರ್ ಡೆಲಿವರಿ ಮಾತ್ರವಲ್ಲದೆ, ಗ್ಯಾಸ್ ಪೈಪ್‌ಲೈನ್ ಕಾಮಗಾರಿ, ನಿಯಮಿತ ಲೀಕೇಜ್ ತಪಾಸಣೆ ಮತ್ತು ದಿನದ 24 ಗಂಟೆಯೂ ತಾಂತ್ರಿಕ ನೆರವು.'
              : 'Beyond dependable cylinder delivery, we engineer professional kitchen manifold pipelines, conduct emergency leak testing, and provide certified gas fittings.'}
          </p>
        </div>

        {/* 4 Feature Cards in High Density 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
                    24/7 Available
                  </span>
                </div>

                <h3 className="text-base font-black text-white mb-1.5 group-hover:text-orange-400 transition-colors uppercase tracking-tight">
                  {lang === 'kn' ? service.titleKn : service.titleEn}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {lang === 'kn' ? service.descKn : service.descEn}
                </p>

                {/* Highlights checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-slate-700">
                  {(lang === 'kn' ? service.highlightsKn : service.highlightsEn).map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                      <span className="font-semibold text-[11px]">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between">
                <a
                  href={`tel:${BUSINESS_INFO.phonePrimary}`}
                  className="text-xs font-black uppercase tracking-wider text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  <span>{lang === 'kn' ? 'ಸರ್ವಿಸ್: 8152889500' : 'Book: 8152889500'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onOpenInquiryModal}
                  className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  {lang === 'kn' ? 'ವಿವರ' : 'Inquire'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Technician Banner in High Density Style */}
        <div className="mt-8 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-4 h-48 lg:h-full min-h-[180px]">
            <img
              src={serviceImage}
              alt="LPG Pipeline Technician"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-8 p-5 sm:p-6 space-y-2.5">
            <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest bg-red-500/20 text-red-300 border border-red-500/30 rounded">
              {lang === 'kn' ? 'ತುರ್ತು ಸುರಕ್ಷತಾ ಸೇವೆ' : 'SAFETY PRIORITY'}
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
              {lang === 'kn'
                ? 'ಗ್ಯಾಸ್ ಲೀಕೇಜ್ ಅಥವಾ ಪೈಪ್‌ಲೈನ್ ಸಮಸ್ಯೆಗಳಿವೆಯೇ? ತಕ್ಷಣ ಕರೆ ಮಾಡಿ'
                : 'Suspect a Commercial Gas Leak or Need Urgent Pipeline Repairs?'}
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              {lang === 'kn'
                ? 'ನಮ್ಮ ತಜ್ಞ ತಾಂತ್ರಿಕ ತಂಡವು ನೆಲಮಂಗಲ ಹಾಗೂ ಸುತ್ತಮುತ್ತಲ ಕೈಗಾರಿಕೆ ಮತ್ತು ರೆಸ್ಟೋರೆಂಟ್‌ಗಳಿಗೆ ತಕ್ಷಣವೇ ಸ್ಥಳಕ್ಕೆ ಬಂದು ಪರಿಶೀಲಿಸಿ ಸುರಕ್ಷತೆ ಒದಗಿಸುತ್ತದೆ.'
                : 'Our certified gas engineers arrive promptly with electronic sniffers and emergency replacement valves across Nelamangala & Bangalore Rural.'}
            </p>
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <a
                href={`tel:${BUSINESS_INFO.phonePrimary}`}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-xs transition-colors"
              >
                {lang === 'kn' ? 'ತುರ್ತು ಕರೆ: 8152889500' : 'EMERGENCY: 8152889500'}
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.emailEmergency}`}
                className="px-3.5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-colors"
              >
                {BUSINESS_INFO.emailEmergency}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
