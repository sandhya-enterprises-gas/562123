import React from 'react';
import { Flame, PhoneCall, MessageCircle, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { RATE_NOTICE, BUSINESS_INFO } from '../data/content';

interface RateAlertBannerProps {
  lang: Language;
  onOpenInquiryModal?: () => void;
}

export const RateAlertBanner: React.FC<RateAlertBannerProps> = ({
  lang,
  onOpenInquiryModal
}) => {
  const content = RATE_NOTICE[lang];

  return (
    <div className="bg-orange-50 border-b border-orange-200 border-l-4 border-l-orange-600 text-orange-950 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-2xs relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Notice content */}
        <div className="flex items-start gap-2.5 flex-1">
          <div className="p-1.5 rounded-lg bg-orange-600 text-white flex-shrink-0 mt-0.5 shadow-2xs">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-widest bg-orange-600 text-white px-2 py-0.5 rounded">
                ⚠️ {content.badge}
              </span>
              <h2 className="text-xs sm:text-sm font-black text-orange-950 uppercase tracking-tight">
                {lang === 'kn' ? 'ಪ್ರತಿ ತಿಂಗಳು ಗ್ಯಾಸ್ ದರ ಬದಲಾವಣೆ ಸೂಚನೆ' : 'Every Month Rates Are Subject to Change'}
              </h2>
            </div>
            <p className="text-xs text-orange-900 mt-0.5 font-medium leading-tight">
              {lang === 'kn'
                ? 'ಪ್ರತಿ ತಿಂಗಳು ಗ್ಯಾಸ್ ದರದಲ್ಲಿ ವ್ಯತ್ಯಾಸವಿರುತ್ತದೆ. ಇಂದಿನ ನಿಖರ ರಿಯಾಯಿತಿ ದರಕ್ಕಾಗಿ ಕರೆ ಮಾಡಿ: '
                : 'Please Call and Confirm Today\'s Discounted Commercial Price: '}
              <a href={`tel:${BUSINESS_INFO.phonePrimary}`} className="font-black text-orange-700 underline hover:text-orange-950">
                8152889500
              </a>
            </p>
          </div>
        </div>

        {/* Action buttons in High Density Style */}
        <div className="flex items-center gap-2 w-full md:w-auto self-end md:self-center flex-shrink-0">
          <a
            id="banner-call-btn"
            href={`tel:${BUSINESS_INFO.phonePrimary}`}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-black text-xs uppercase tracking-wider shadow-2xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>8152889500</span>
          </a>

          <a
            id="banner-whatsapp-btn"
            href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
              lang === 'kn'
                ? 'ನಮಸ್ಕಾರ ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್, ಇಂದಿನ ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ದರ ಮತ್ತು ಡೆಲಿವರಿ ವಿವರಗಳನ್ನು ತಿಳಿಸಿ.'
                : 'Hello Sandhya Enterprises, Please share today\'s best commercial LPG cylinder rate and delivery details.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-black text-xs uppercase tracking-wider shadow-2xs transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {onOpenInquiryModal && (
            <button
              id="banner-quote-modal-btn"
              onClick={onOpenInquiryModal}
              className="hidden lg:inline-flex items-center justify-center px-3 py-1.5 bg-white hover:bg-orange-100 text-orange-900 border border-orange-300 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors"
            >
              {lang === 'kn' ? 'ದರ ಕೇಳಿ' : 'Ask Rate'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
