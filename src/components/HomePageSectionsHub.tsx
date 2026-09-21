import React from 'react';
import {
  Flame,
  Wrench,
  Users,
  Calculator,
  UtensilsCrossed,
  MapPin,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { BrandShowcase } from './BrandShowcase';
import { ServicesSpecialties } from './ServicesSpecialties';
import { CustomerSegments } from './CustomerSegments';
import { OfficialCustomerShowcase } from './OfficialCustomerShowcase';
import { OrderQuoteCalculator } from './OrderQuoteCalculator';
import { CommercialAccessories } from './CommercialAccessories';
import { GoogleMapsLocator } from './GoogleMapsLocator';
import { ContactAndLocation } from './ContactAndLocation';

export type HomeSectionId = 'brands' | 'services' | 'customers' | 'calculator' | 'accessories' | 'contact';

interface HomePageSectionsHubProps {
  lang: Language;
  activeSection: HomeSectionId;
  onSelectSection: (sectionId: HomeSectionId) => void;
  onOpenInquiryModal: (brandId?: string) => void;
  onOpenCustomerPortal: () => void;
}

export const HomePageSectionsHub: React.FC<HomePageSectionsHubProps> = ({
  lang,
  activeSection,
  onSelectSection,
  onOpenInquiryModal,
  onOpenCustomerPortal
}) => {
  const sections = [
    {
      id: 'brands' as HomeSectionId,
      icon: Flame,
      labelKn: 'ಗ್ಯಾಸ್ ಬ್ರ್ಯಾಂಡ್‌ಗಳು',
      labelEn: 'Gas Brands',
      subKn: 'ಭಾರತ್, ಗೋ ಗ್ಯಾಸ್, ಪವರ್ ಗ್ಯಾಸ್',
      subEn: '19kg, 33kg, 47.5kg & Composite',
      badgeKn: 'ಅಧಿಕೃತ ಪೂರೈಕೆ',
      badgeEn: 'Official Brands',
      color: 'from-orange-500 to-amber-600'
    },
    {
      id: 'services' as HomeSectionId,
      icon: Wrench,
      labelKn: 'ಸೇವೆಗಳು',
      labelEn: 'Services & Pipeline',
      subKn: 'ಕಮರ್ಷಿಯಲ್ ಪೈಪ್‌ಲೈನ್ & ಮ್ಯಾನಿಫೋಲ್ಡ್',
      subEn: 'Manifold Installation & 24/7 Support',
      badgeKn: 'PESO ಗುಣಮಟ್ಟ',
      badgeEn: 'Certified',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'customers' as HomeSectionId,
      icon: Users,
      labelKn: 'ಗ್ರಾಹಕರು',
      labelEn: 'Who We Serve',
      subKn: 'ಹೋಟೆಲ್, ಧಾಬಾ, ಕಲ್ಯಾಣ ಮಂಟಪ, ಫ್ಯಾಕ್ಟರಿ',
      subEn: 'Hotels, Catering, Dhabas & Industry',
      badgeKn: 'ಪ್ರಾಶಸ್ತ್ಯ ಸೌಲಭ್ಯ',
      badgeEn: 'Commercial Perks',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      id: 'calculator' as HomeSectionId,
      icon: Calculator,
      labelKn: 'ಬುಕಿಂಗ್ & ದರ',
      labelEn: 'Booking & Rate',
      subKn: 'ಅಂದಾಜು ವೆಚ್ಚ & ಆರ್ಡರ್ ಲೆಕ್ಕಾಚಾರ',
      subEn: 'Instant Commercial Quote Calculator',
      badgeKn: 'ಇಂದಿನ ಬೆಲೆ',
      badgeEn: 'Live Estimate',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'accessories' as HomeSectionId,
      icon: UtensilsCrossed,
      labelKn: 'ಉಪಕರಣಗಳು',
      labelEn: 'Accessories',
      subKn: 'ಹೆವಿ ಡ್ಯೂಟಿ ಬರ್ನರ್, ರೆಗ್ಯುಲೇಟರ್, ಹೋಸ್',
      subEn: 'Heavy Burners, Regulators & Pipes',
      badgeKn: 'ಐಎಸ್ಐ ಮಾರ್ಕ್',
      badgeEn: 'Industrial Gear',
      color: 'from-amber-600 to-orange-700'
    },
    {
      id: 'contact' as HomeSectionId,
      icon: MapPin,
      labelKn: 'ಏಜೆನ್ಸಿ ವಿಳಾಸ',
      labelEn: 'Agency Location',
      subKn: 'ಶರಾಪುರಪಾಳ್ಯ, ನೆಲಮಂಗಲ ಡಿಪೋ & ಮ್ಯಾಪ್',
      subEn: 'Nelamangala Depot & Direct Map',
      badgeKn: 'ಲೈವ್ ಗೂಗಲ್ ಮ್ಯಾಪ್',
      badgeEn: 'Depot Map',
      color: 'from-slate-700 to-slate-900'
    }
  ];

  return (
    <section id="home-sections-hub" className="py-10 sm:py-14 bg-gradient-to-b from-slate-50 via-white to-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === 'kn' ? 'ಅಧಿಕೃತ ಪುಟಗಳು & ಕಟಲಾಗ್' : 'OFFICIAL PAGES & CATALOG EXPLORER'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
            {lang === 'kn' ? (
              <>
                ನಿಮಗೆ ಬೇಕಾದ <span className="text-orange-600">ವಿವರಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ</span>
              </>
            ) : (
              <>
                Explore What You Need <span className="text-orange-600">Without Clutter</span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {lang === 'kn'
              ? 'ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ದೀರ್ಘವಾಗಿ ಹುಡುಕಾಡುವ ಅಗತ್ಯವಿಲ್ಲದೆ, ಕೆಳಗಿನ ಪ್ರತಿಯೊಂದು ವಿಭಾಗವನ್ನು ಒಂದೇ ಸ್ಪರ್ಶದಲ್ಲಿ ವೀಕ್ಷಿಸಿ.'
              : 'Directly view cylinder brands, pipeline services, pricing calculator, accessories, or depot location.'}
          </p>
        </div>

        {/* Interactive Tabs / Page Selector Pills (Matches Screenshot: ಪುಟಗಳು) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-8">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isSelected = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                id={`hub-tab-${sec.id}`}
                type="button"
                onClick={() => {
                  onSelectSection(sec.id);
                  // Smooth scroll to content
                  const el = document.getElementById('hub-content-container');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`group relative text-left p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-orange-500 shadow-lg scale-[1.02] ring-2 ring-orange-500/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-orange-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-orange-500/30 text-orange-300 border border-orange-400/40'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {lang === 'kn' ? sec.badgeKn : sec.badgeEn}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <div
                    className={`text-xs sm:text-sm font-black uppercase tracking-tight leading-snug ${
                      isSelected ? 'text-white' : 'text-slate-900 group-hover:text-orange-600'
                    }`}
                  >
                    {lang === 'kn' ? sec.labelKn : sec.labelEn}
                  </div>
                  <div
                    className={`text-[10px] leading-tight line-clamp-1 ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {lang === 'kn' ? sec.subKn : sec.subEn}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-orange-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Section Content Container */}
        <div id="hub-content-container" className="scroll-mt-24 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* Active Section Banner Header */}
          <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-orange-400">
                {lang === 'kn' ? 'ಪ್ರಸ್ತುತ ವೀಕ್ಷಿಸುತ್ತಿರುವ ವಿಭಾಗ:' : 'CURRENTLY VIEWING PAGE:'}
              </span>
              <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {lang === 'kn'
                  ? sections.find((s) => s.id === activeSection)?.labelKn
                  : sections.find((s) => s.id === activeSection)?.labelEn}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 hidden sm:inline text-[11px]">
                {lang === 'kn' ? 'ಇತರ ಪುಟಗಳನ್ನು ನೋಡಲು ಮೇಲಿನ ಟ್ಯಾಬ್ ಬಳಸಿ' : 'Click any tab above to switch'}
              </span>
              <button
                type="button"
                onClick={onOpenCustomerPortal}
                className="px-2.5 py-1 rounded bg-orange-600/90 hover:bg-orange-600 text-white text-[11px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
              >
                <span>{lang === 'kn' ? 'ಗ್ರಾಹಕರ ಲಾಗಿನ್' : 'Customer Portal'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* DYNAMIC CONTENT SWITCHER */}
          <div className="p-1 sm:p-2">
            {/* 1. Gas Brands Showcase */}
            {activeSection === 'brands' && (
              <div className="animate-in fade-in duration-300">
                <BrandShowcase
                  lang={lang}
                  onOpenInquiryModal={(brandId) => onOpenInquiryModal(brandId)}
                />
              </div>
            )}

            {/* 2. Services & Commercial Pipeline */}
            {activeSection === 'services' && (
              <div className="animate-in fade-in duration-300">
                <ServicesSpecialties
                  lang={lang}
                  onOpenInquiryModal={() => onOpenInquiryModal()}
                />
              </div>
            )}

            {/* 3. Who We Serve & Commercial Customer Benefits */}
            {activeSection === 'customers' && (
              <div className="animate-in fade-in duration-300 space-y-4">
                <OfficialCustomerShowcase
                  lang={lang}
                  onOpenCustomerPortal={onOpenCustomerPortal}
                />
                <CustomerSegments
                  lang={lang}
                  onOpenInquiryModal={() => onOpenInquiryModal()}
                />
              </div>
            )}

            {/* 4. Booking & Order Rate Quote Calculator */}
            {activeSection === 'calculator' && (
              <div className="animate-in fade-in duration-300">
                <OrderQuoteCalculator
                  lang={lang}
                />
              </div>
            )}

            {/* 5. Commercial Kitchen Accessories */}
            {activeSection === 'accessories' && (
              <div className="animate-in fade-in duration-300">
                <CommercialAccessories
                  lang={lang}
                  onOpenInquiryModal={() => onOpenInquiryModal()}
                />
              </div>
            )}

            {/* 6. Agency Address & Depot Map */}
            {activeSection === 'contact' && (
              <div className="animate-in fade-in duration-300 space-y-4">
                <GoogleMapsLocator
                  lang={lang}
                />
                <ContactAndLocation
                  lang={lang}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
