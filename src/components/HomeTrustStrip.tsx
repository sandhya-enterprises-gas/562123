import React from 'react';
import { ShieldCheck, Truck, Scale, Award, ArrowUpRight, Lock, PhoneCall } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface HomeTrustStripProps {
  lang: Language;
  onOpenCustomerPortal: () => void;
  onSelectSection: (sectionId: 'brands' | 'services' | 'customers' | 'calculator' | 'accessories' | 'contact') => void;
}

export const HomeTrustStrip: React.FC<HomeTrustStripProps> = ({
  lang,
  onOpenCustomerPortal,
  onSelectSection
}) => {
  const pillars = [
    {
      icon: Scale,
      titleKn: '100% ನಿಖರ ತೂಕ ಖಾತರಿ',
      titleEn: '100% Net Weight Guaranteed',
      descKn: 'ಡೆಲಿವರಿ ಸ್ಥಳದಲ್ಲೇ ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸ್ಕೇಲ್ ಪರಿಶೀಲನೆ ಸೌಲಭ್ಯ.',
      descEn: 'On-the-spot calibrated digital weighing scale verification.',
      badgeKn: 'ತೂಕ ಖಾತರಿ',
      badgeEn: 'Verified',
      actionSection: 'brands' as const
    },
    {
      icon: Truck,
      titleKn: 'ನಿರಂತರ ಡೋರ್‌ಸ್ಟೆಪ್ ಡೆಲಿವರಿ',
      titleEn: 'Doorstep Fleet Dispatch',
      descKn: 'ನೆಲಮಂಗಲ ಮತ್ತು ತುಮಕೂರು ಹೆದ್ದಾರಿ ಹೋಟೆಲ್ & ಫ್ಯಾಕ್ಟರಿಗಳಿಗೆ ವೇಗದ ಪೂರೈಕೆ.',
      descEn: 'Rapid commercial vehicle runs for hotels, dhabas & industrial units.',
      badgeKn: 'ಎಕ್ಸ್‌ಪ್ರೆಸ್ ರನ್',
      badgeEn: 'Express Run',
      actionSection: 'services' as const
    },
    {
      icon: ShieldCheck,
      titleKn: 'PESO & ಸುರಕ್ಷತಾ ಪ್ರಮಾಣಿತ',
      titleEn: 'PESO & Safety Compliant',
      descKn: 'ಅಧಿಕೃತ ಸಿಲಿಂಡರ್ ಸೀಲ್, ಸುರಕ್ಷಿತ ವಾಲ್ವ್ ಮತ್ತು ಗುಣಮಟ್ಟದ ಮಾನದಂಡ.',
      descEn: 'Tamper-proof safety seals, authentic testing & compliance.',
      badgeKn: 'ಅಧಿಕೃತ ಡೀಲರ್',
      badgeEn: 'Authorized',
      actionSection: 'services' as const
    },
    {
      icon: Award,
      titleKn: 'ಜಿಎಸ್‌ಟಿ ಇನ್‌ವಾಯ್ಸ್ & ಲೆಡ್ಜರ್',
      titleEn: 'Official GST Invoicing',
      descKn: 'ಅಧಿಕೃತ ಬಿಲ್ ಮತ್ತು ಗ್ರಾಹಕರ ಪಾಸ್‌ಬುಕ್ ಲೆಡ್ಜರ್ ಸೌಲಭ್ಯ.',
      descEn: '100% transparent GST bills & digital monthly passbook ledger.',
      badgeKn: 'GSTIN ನೋಂದಾಯಿತ',
      badgeEn: 'GSTIN Verified',
      actionSection: 'calculator' as const
    }
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-900 border-y border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectSection(pillar.actionSection);
                  const el = document.getElementById('home-sections-hub');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group text-left p-4 rounded-2xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-orange-500/60 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-700/70 text-slate-300 border border-slate-600">
                      {lang === 'kn' ? pillar.badgeKn : pillar.badgeEn}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white mb-1 group-hover:text-orange-400 transition-colors">
                    {lang === 'kn' ? pillar.titleKn : pillar.titleEn}
                  </h3>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {lang === 'kn' ? pillar.descKn : pillar.descEn}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-700/50 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-orange-300">
                  <span>{lang === 'kn' ? 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'View Section'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
