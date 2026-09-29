import React from 'react';
import {
  HelpCircle,
  ShieldCheck,
  FileText,
  PhoneCall,
  MessageCircle,
  Truck,
  CreditCard,
  Wrench,
  AlertTriangle,
  Scale,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';
import { OfficialFAQ } from './OfficialFAQ';

interface FaqAndRulesPageProps {
  lang: Language;
}

export const FaqAndRulesPage: React.FC<FaqAndRulesPageProps> = ({ lang }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-900 border border-orange-200">
            <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === 'kn' ? 'ಗ್ರಾಹಕರ ಮಾಹಿತಿ ಕೇಂದ್ರ' : 'CUSTOMER INFORMATION DESK'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
            {lang === 'kn' ? (
              <>
                ಅಧಿಕೃತ ಪ್ರಶ್ನೋತ್ತರಗಳು, <span className="text-orange-600">ನಿಯಮಗಳು & ಸುರಕ್ಷತೆ</span>
              </>
            ) : (
              <>
                Official FAQ, <span className="text-orange-600">Rules & Safety Terms</span>
              </>
            )}
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {lang === 'kn'
              ? 'ಸಿಲಿಂಡರ್ ಡೆಲಿವರಿ ಸಮಯ, ಪಾವತಿ ವಿಧಾನಗಳು, ಗ್ಯಾಸ್ ಪೈಪ್‌ಲೈನ್ ಅಳವಡಿಕೆ ಹಾಗೂ ಸುರಕ್ಷತಾ ನಿಯಮಗಳ ಸಂಪೂರ್ಣ ಅಧಿಕೃತ ಮಾಹಿತಿ.'
              : 'Complete transparent guidelines on commercial LPG delivery schedules, accepted payment methods, manifold installation, and PESO safety rules.'}
          </p>

          {/* Quick Helpline Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              <span>{lang === 'kn' ? 'ತುರ್ತು ಸಹಾಯ: +91 8073407706' : 'Helpline: +91 8073407706'}</span>
            </a>

            <a
              href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
                lang === 'kn'
                  ? 'ನಮಸ್ಕಾರ ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್, ನನಗೆ ಸಿಲಿಂಡರ್ ನಿಯಮಗಳು ಮತ್ತು ದರಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಬೇಕಾಗಿದೆ.'
                  : 'Hello Sandhya Enterprises, I need details regarding commercial LPG delivery rules and pricing.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'WhatsApp ಚಾಟ್' : 'WhatsApp Support'}</span>
            </a>
          </div>
        </div>

        {/* Official Interactive FAQs Component */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <OfficialFAQ lang={lang} />
        </div>

        {/* Operating Rules & Regulatory Guidelines Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-600 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'kn' ? 'ಅಧಿಕೃತ ನಿಯಮಾವಳಿಗಳು' : 'STATUTORY REGULATIONS & TERMS'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {lang === 'kn'
                ? 'ವಾಣಿಜ್ಯ ಮತ್ತು ಗೃಹಬಳಕೆಯ ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್ ನಿಯಮಗಳು'
                : 'Commercial & Domestic LPG Cylinder Operating Rules'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rule 1: Delivery & Offloading */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Truck className="w-4 h-4 text-orange-600" />
                <h3>{lang === 'kn' ? '1. ಸಿಲಿಂಡರ್ ಡೆಲಿವರಿ & ತೂಕ ಪರಿಶೀಲನೆ' : '1. Delivery & Weight Verification'}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'kn'
                  ? 'ಡೆಲಿವರಿ ಸಮಯದಲ್ಲಿ ಸಿಬ್ಬಂದಿಯ ಉಪಸ್ಥಿತಿಯಲ್ಲೇ ಡಿಜಿಟಲ್ ತೂಕ ಮಾಪಕದಲ್ಲಿ ಸಿಲಿಂಡರ್ ತೂಕವನ್ನು ಪರೀಕ್ಷಿಸಿಕೊಳ್ಳಬಹುದು. ಅಧಿಕೃತ ಸೀಲ್ ಹಾಗೂ ವಾಲ್ವ್ ಕ್ಯಾಪ್ ಇಲ್ಲದ ಯಾವುದೇ ಸಿಲಿಂಡರ್ ಸ್ವೀಕರಿಸಬಾರದು.'
                  : 'Customers may inspect the tare weight and net content of each cylinder on our vehicle\'s calibrated digital scale upon delivery. Do not accept cylinders with broken security seals.'}
              </p>
            </div>

            {/* Rule 2: Payment & Credit Terms */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <h3>{lang === 'kn' ? '2. ಪಾವತಿ ನಿಯಮಗಳು & ಜಿಎಸ್‌ಟಿ ಬಿಲ್' : '2. Payment Terms & GST Invoicing'}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'kn'
                  ? 'ಪ್ರತಿ ಸರಬರಾಜಿಗೂ ಅಧಿಕೃತ ಜಿಎಸ್‌ಟಿ ಇನ್‌ವಾಯ್ಸ್ (GSTIN: 29ESYPS6864C1Z0) ನೀಡಲಾಗುತ್ತದೆ. ಯುಪಿಐ, ನೆಫ್ಟ್ ಅಥವಾ ಅಧಿಕೃತ ಚೆಕ್ ಮೂಲಕ ಪಾವತಿ ಮಾಡಬಹುದು. ನಗದು ಪಾವತಿಗೆ ತ್ವರಿತ ರಸೀದಿ ಕಡ್ಡಾಯ.'
                  : 'Every commercial dispatch is accompanied by an official GST tax invoice. We accept UPI, NEFT, commercial account-payee cheques, or cash with instant digital acknowledgment.'}
              </p>
            </div>

            {/* Rule 3: Storage & Safety Compliance */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3>{lang === 'kn' ? '3. ಸಿಲಿಂಡರ್ ಸಂಗ್ರಹಣೆ & ಸುರಕ್ಷತೆ' : '3. Cylinder Storage & Safety Norms'}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'kn'
                  ? 'ಸಿಲಿಂಡರ್‌ಗಳನ್ನು ಯಾವಾಗಲೂ ನೇರ ಸ್ಥಿತಿಯಲ್ಲಿ (Upright position) ಗಾಳಿಯಾಡುವ ಕೋಣೆಯಲ್ಲಿ ಇಡಬೇಕು. ಯಾವುದೇ ಶಾಖ ಅಥವಾ ಎಲೆಕ್ಟ್ರಿಕಲ್ ಪ್ಯಾನೆಲ್ ಬಳಿ ಇಡಬಾರದು. ಬಳಕೆಯಾಗದ ಸಿಲಿಂಡರ್‌ಗಳಿಗೆ ರಕ್ಷಣಾತ್ಮಕ ಕ್ಯಾಪ್ ಧರಿಸಿರಬೇಕು.'
                  : 'Cylinders must always be stored in an upright position in well-ventilated areas away from heat sources or open electrical switches. Safety caps must remain fastened when not in manifold use.'}
              </p>
            </div>

            {/* Rule 4: Empty Cylinder Return Policy */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Scale className="w-4 h-4 text-blue-600" />
                <h3>{lang === 'kn' ? '4. ಖಾಲಿ ಸಿಲಿಂಡರ್ ವಿನಿಮಯ ನೀತಿ' : '4. Empty Cylinder Return Policy'}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'kn'
                  ? 'ರೀಫಿಲ್ ಪಡೆಯಲು ಸಮಾನ ಪ್ರಮಾಣದ ಮಾನ್ಯತೆ ಪಡೆದ ಖಾಲಿ ಸಿಲಿಂಡರ್‌ಗಳನ್ನು ಹಿಂತಿರುಗಿಸಬೇಕು. ಬಾಕಿ ಸಿಲಿಂಡರ್‌ಗಳ ಲೆಕ್ಕಾಚಾರವನ್ನು ಗ್ರಾಹಕರ ಡಿಜಿಟಲ್ ಲೆಡ್ಜರ್‌ನಲ್ಲಿ ದಾಖಲಿಸಲಾಗುತ್ತದೆ.'
                  : 'A valid empty cylinder of the corresponding brand and capacity must be exchanged for each refilled cylinder dispatched. Empty cylinder tallies are tracked in your account ledger.'}
              </p>
            </div>
          </div>

          {/* Quick CTA to Booking */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-black uppercase">
                {lang === 'kn' ? 'ಈಗಲೇ ಸಿಲಿಂಡರ್ ಬುಕ್ ಮಾಡಲು ಸಿದ್ಧರಿದ್ದೀರಾ?' : 'Ready to Book Your Cylinder?'}
              </h3>
              <p className="text-xs text-orange-100">
                {lang === 'kn'
                  ? 'ಲೈವ್ ಟ್ರ್ಯಾಕಿಂಗ್‌ನೊಂದಿಗೆ ಆನ್‌ಲೈನ್ ಬುಕಿಂಗ್ ಮಾಡಿ ಅಥವಾ ಗೂಗಲ್ ಫಾರ್ಮ್ ಬಳಸಿ.'
                  : 'Fast dispatch across Nelamangala and Tumkur Road within 2 to 4 hours.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/booking"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-1.5"
              >
                <span>{lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಬುಕ್ ಮಾಡಿ' : 'Book Cylinder'}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                to="/"
                className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>{lang === 'kn' ? 'ಮುಖಪುಟ' : 'Back to Home'}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
