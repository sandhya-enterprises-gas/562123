import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, Clock, CreditCard, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../types';

interface HomeFaqAccordionProps {
  lang: Language;
}

export const HomeFaqAccordion: React.FC<HomeFaqAccordionProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const quickFaqs = [
    {
      id: 'del-time',
      icon: Clock,
      qKn: 'ನೆಲಮಂಗಲ ಮತ್ತು ತುಮಕೂರು ಹೆದ್ದಾರಿ ಪ್ರದೇಶಗಳಿಗೆ ಡೆಲಿವರಿ ಸಮಯ ಎಷ್ಟು?',
      qEn: 'What is the standard delivery timeline for Nelamangala & Tumkur Road?',
      aKn: 'ಮಧ್ಯಾಹ್ನ 2:00 ಗಂಟೆಯೊಳಗೆ ಬರುವ ಎಲ್ಲಾ ವಾಣಿಜ್ಯ ಸಿಲಿಂಡರ್ ಆರ್ಡರ್‌ಗಳನ್ನು ಅದೇ ದಿನ 2 ರಿಂದ 4 ಗಂಟೆಗಳಲ್ಲಿ ನೇರವಾಗಿ ನಿಮ್ಮ ಹೋಟೆಲ್ ಅಥವಾ ಫ್ಯಾಕ್ಟರಿಗೆ ತಲುಪಿಸಲಾಗುತ್ತದೆ. ತುರ್ತು ಅಡುಗೆಮನೆಗಳಿಗೆ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಡೆಲಿವರಿ ಲಭ್ಯವಿದೆ.',
      aEn: 'Commercial LPG orders booked before 2:00 PM are delivered same-day within 2 to 4 hours across Nelamangala Town, Sondekoppa Road, Boodihal, and nearby industrial zones with express kitchen priority.'
    },
    {
      id: 'payment',
      icon: CreditCard,
      qKn: 'ಸಿಲಿಂಡರ್ ರೀಫಿಲ್‌ಗೆ ಯಾವ ಪಾವತಿ ವಿಧಾನಗಳನ್ನು ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ?',
      qEn: 'What payment modes are accepted for commercial cylinder refills?',
      aKn: 'ನಾವು ಯುಪಿಐ (Google Pay, PhonePe, Paytm), ನೆಫ್ಟ್ / ಆರ್‌ಟಿಜಿಎಸ್ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ, ಕಮರ್ಷಿಯಲ್ ಗ್ರಾಹಕರಿಗೆ ಅಧಿಕೃತ ಚೆಕ್ ಹಾಗೂ ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ (COD) ಸ್ವೀಕರಿಸುತ್ತೇವೆ. ಪ್ರತಿ ಆರ್ಡರ್‌ಗೂ 100% ಜಿಎಸ್‌ಟಿ ಬಿಲ್ ನೀಡಲಾಗುತ್ತದೆ.',
      aEn: 'We accept UPI (GPay, PhonePe, Paytm), NEFT / RTGS, commercial account cheques for contracted clients, and Cash on Delivery. Every order includes an official GST tax invoice.'
    },
    {
      id: 'safety',
      icon: AlertTriangle,
      qKn: 'ಗ್ಯಾಸ್ ಸೋರಿಕೆ ಅಥವಾ ತೂಕದ ವ್ಯತ್ಯಾಸ ಕಂಡುಬಂದರೆ ಏನು ಮಾಡಬೇಕು?',
      qEn: 'What should we do in case of gas leak or cylinder tare weight doubt?',
      aKn: 'ಡೆಲಿವರಿ ಸಮಯದಲ್ಲಿ ಸಿಬ್ಬಂದಿಯ ಡಿಜಿಟಲ್ ಸ್ಕೇಲ್‌ನಲ್ಲಿ ತೂಕವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಬಹುದು. ಗ್ಯಾಸ್ ಸೋರಿಕೆಯ ಸಂದರ್ಭದಲ್ಲಿ ಕೂಡಲೇ ರೆಗ್ಯುಲೇಟರ್ ಆಫ್ ಮಾಡಿ, ಕಿಟಕಿಗಳನ್ನು ತೆರೆದು ನಮ್ಮ 24/7 ತುರ್ತು ಸಹಾಯವಾಣಿ +91 8073407706 ಗೆ ಕರೆ ಮಾಡಿ.',
      aEn: 'You can verify tare and net weight on our calibrated digital scale upon delivery. In case of any smell, turn off the cylinder valve immediately, ventilate the area, and call our 24/7 emergency response desk at +91 8073407706.'
    }
  ];

  return (
    <section id="faq-section" className="py-8 bg-slate-100 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Accordion Toggle Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-600">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{lang === 'kn' ? 'ಪ್ರಶ್ನೆಗಳಿವೆಯೇ?' : 'NEED CLARIFICATION?'}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {lang === 'kn'
                  ? 'ಡೆಲಿವರಿ, ಪಾವತಿ & ಸುರಕ್ಷತಾ ನಿಯಮಗಳು (FAQ & Rules)'
                  : 'Delivery Timelines, Payments & Safety Guidelines'}
              </h2>
              <p className="text-xs text-slate-600">
                {lang === 'kn'
                  ? 'ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ ಮತ್ತು ಸುರಕ್ಷತೆಯ ಪ್ರಮುಖ ನಿಯಮಗಳನ್ನು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ ವೀಕ್ಷಿಸಿ.'
                  : 'Quick answers on cylinder dispatch, payment terms, and PESO safety compliance.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{isOpen ? (lang === 'kn' ? 'ಮುಚ್ಚಿ' : 'Hide FAQ') : (lang === 'kn' ? 'FAQ ವೀಕ್ಷಿಸಿ' : 'View FAQ')}</span>
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <Link
                to="/faq-rules"
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>{lang === 'kn' ? 'ಪೂರ್ಣ ನಿಯಮಗಳು' : 'All Rules'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Expandable Content Area */}
          {isOpen && (
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-3 animate-in fade-in duration-200">
              {quickFaqs.map((faq) => {
                const isExpanded = expandedId === faq.id;
                const Icon = faq.icon;

                return (
                  <div
                    key={faq.id}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-slate-900 hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-orange-600 shrink-0" />
                        <span>{lang === 'kn' ? faq.qKn : faq.qEn}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-slate-700 leading-relaxed bg-white border-t border-slate-200">
                        {lang === 'kn' ? faq.aKn : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-3 text-center">
                <Link
                  to="/faq-rules"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-600 hover:text-orange-700 underline underline-offset-4"
                >
                  <span>
                    {lang === 'kn'
                      ? 'ಎಲ್ಲಾ ಪ್ರಶ್ನೋತ್ತರಗಳು ಮತ್ತು ಸುರಕ್ಷತಾ ನಿಯಮಗಳ ಪೂರ್ಣ ಪುಟ ತೆರೆಯಿರಿ'
                      : 'View Complete FAQ & Statutory Safety Guidelines Page'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
