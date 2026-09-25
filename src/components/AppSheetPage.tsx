import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowLeft, MessageCircle, Truck } from 'lucide-react';
import { Language } from '../types';
import { AppSheetEmbed } from './AppSheetEmbed';
import { OfficialLogoWatermark } from './common/OfficialLogoWatermark';

interface AppSheetPageProps {
  lang: Language;
}

export const AppSheetPage: React.FC<AppSheetPageProps> = ({ lang }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <OfficialLogoWatermark opacity={0.035} />

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <Link to="/" className="hover:text-amber-400 transition-colors">
                {lang === 'kn' ? 'ಮುಖ್ಯ ಪುಟ' : 'Home'}
              </Link>
              <span>/</span>
              <Link to="/booking" className="hover:text-amber-400 transition-colors">
                {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್' : 'Cylinder Booking'}
              </Link>
              <span>/</span>
              <span className="text-amber-400">AppSheet</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Flame className="w-7 h-7 text-orange-500 shrink-0" />
              <span>
                {lang === 'kn' ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಅಧಿಕೃತ AppSheet ಫಾರ್ಮ್' : 'Sandhya Enterprises AppSheet Portal'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'kn'
                ? 'ಗ್ರಾಹಕರ ಬುಕಿಂಗ್, ಆರ್ಡರ್ ವಿವರಗಳು ಮತ್ತು ವಿತರಕರ ಪೋರ್ಟಲ್ (ಗೂಗಲ್ AppSheet)'
                : 'Commercial order management and distributor dispatch powered by AppSheet'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/booking"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition border border-slate-700 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'WhatsApp ಬುಕಿಂಗ್' : 'Quick Booking'}</span>
            </Link>
            <Link
              to="/track-order"
              className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-wider transition shadow-md flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್' : 'Track Order'}</span>
            </Link>
          </div>
        </div>

        {/* Embedded AppSheet Form */}
        <div className="py-2">
          <AppSheetEmbed lang={lang} height="700px" showCardWrapper={true} />
        </div>

        {/* Direct WhatsApp Fallback */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-white">
              {lang === 'kn' ? 'ಫಾರ್ಮ್ ಲೋಡ್ ಆಗುತ್ತಿಲ್ಲವೇ ಅಥವಾ ತುರ್ತು ಆರ್ಡರ್ ಬೇಕೇ?' : 'Need direct urgent cylinder booking?'}
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'kn'
                ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ವಾಟ್ಸಾಪ್ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ನೇರ ಸಂದೇಶ ಕಳುಹಿಸಿ'
                : 'Contact Sandhya Enterprises dispatch desk directly on WhatsApp'}
            </p>
          </div>
          <a
            href="https://wa.me/918073407706?text=ಹಲೋ%2C%20ನನಗೆ%20ವಾಣಿಜ್ಯ%20ಸಿಲಿಂಡರ್%20ಬುಕಿಂಗ್%20ಮಾಡಬೇಕಾಗಿದೆ"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-md shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: 8073407706</span>
          </a>
        </div>
      </div>
    </div>
  );
};
