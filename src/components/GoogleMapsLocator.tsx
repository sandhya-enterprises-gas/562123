import React from 'react';
import {
  MapPin,
  Navigation,
  PhoneCall,
  Clock,
  ShieldCheck,
  Truck,
  MessageCircle,
  ShieldAlert
} from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';

export interface AgencyLocation {
  id: string;
  nameEn: string;
  nameKn: string;
  typeEn: string;
  typeKn: string;
  position: { lat: number; lng: number };
  addressEn: string;
  addressKn: string;
  pincode: string;
  ratePhone: string;
  helplinePhone: string;
  otherPhone: string;
  hoursEn: string;
  hoursKn: string;
  stockEn: string;
  stockKn: string;
  coverageEn: string;
  coverageKn: string;
  mapsUrl: string;
}

export const AGENCY_LOCATION: AgencyLocation = {
  id: 'sharapurapalya-nelamangala',
  nameEn: 'Sandhya Enterprises - Commercial LPG Gas Agency',
  nameKn: 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ - ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ಗ್ಯಾಸ್ ಏಜೆನ್ಸಿ',
  typeEn: 'Registered Commercial LPG Supply Depot',
  typeKn: 'ಅಧಿಕೃತ ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ ಪೂರೈಕೆ ಏಜೆನ್ಸಿ & ಡಿಪೋ',
  position: { lat: 13.1025, lng: 77.3870 },
  addressEn: 'Sharapurapalya, Nelamangala, Bengaluru Rural, Karnataka - 562123',
  addressKn: 'ಶರಾಪುರಪಾಳ್ಯ, ನೆಲಮಂಗಲ, ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ, ಕರ್ನಾಟಕ - 562123',
  pincode: '562123',
  ratePhone: BUSINESS_INFO.phoneRateEnquiry,
  helplinePhone: BUSINESS_INFO.phoneHelpline,
  otherPhone: BUSINESS_INFO.phoneOtherEnquiry,
  hoursEn: 'Open All 7 Days | 24/7 Helpline: 8152889500 (Delivery: 7:00 AM - 9:00 PM)',
  hoursKn: 'ವಾರದ ಎಲ್ಲಾ ದಿನವೂ ಲಭ್ಯ | 24/7 ಸಹಾಯವಾಣಿ: 8152889500 (ಡೆಲಿವರಿ: ಬೆಳಿಗ್ಗೆ 7 - ರಾತ್ರಿ 9)',
  stockEn: 'Bharat Gas 19kg & 47.5kg, Go Gas 21kg & Elite, Power Gas 19kg',
  stockKn: 'ಭಾರತ್ ಗ್ಯಾಸ್ 19ಕೆಜಿ & 47.5ಕೆಜಿ, ಗೋ ಗ್ಯಾಸ್ 21ಕೆಜಿ & ಎಲೈಟ್, ಪವರ್ ಗ್ಯಾಸ್ 19ಕೆಜಿ',
  coverageEn: 'Nelamangala, Nelamangala Rural, Bengaluru Rural, Industrial Zones & Surrounding Areas',
  coverageKn: 'ನೆಲಮಂಗಲ, ನೆಲಮಂಗಲ ಗ್ರಾಮಾಂತರ, ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಕೈಗಾರಿಕಾ ವಲಯ',
  mapsUrl: 'https://maps.google.com/?q=Sharapurapalya,+Nelamangala,+Bengaluru+Rural+-+562123'
};

interface GoogleMapsLocatorProps {
  lang: Language;
}

export const GoogleMapsLocator: React.FC<GoogleMapsLocatorProps> = ({ lang }) => {
  return (
    <section id="depot-locations-map" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-orange-100 text-orange-950 text-[10px] font-black uppercase tracking-wider border border-orange-200 mb-2">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              <span>
                {lang === 'kn' ? 'ಏಜೆನ್ಸಿ ಅಧಿಕೃತ ವಿಳಾಸ & ಲೈವ್ ಮ್ಯಾಪ್' : 'OFFICIAL AGENCY LOCATION & LIVE MAP'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              {lang === 'kn' ? (
                <>
                  ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್{' '}
                  <span className="text-orange-600">ಶರಾಪುರಪಾಳ್ಯ, ನೆಲಮಂಗಲ</span>
                </>
              ) : (
                <>
                  Sandhya Enterprises{' '}
                  <span className="text-orange-600">Sharapurapalya, Nelamangala</span>
                </>
              )}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
              {lang === 'kn'
                ? 'ನಮ್ಮ ಅಧಿಕೃತ ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ಗ್ಯಾಸ್ ಏಜೆನ್ಸಿ ಶರಾಪುರಪಾಳ್ಯ, ನೆಲಮಂಗಲ, ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ - 562123 ನಲ್ಲಿದೆ. ನೇರ ಸಂಪರ್ಕ ಮತ್ತು ಲೈವ್ ಗೂಗಲ್ ಮ್ಯಾಪ್ ಮಾರ್ಗ ಇಲ್ಲಿದೆ.'
                : 'Official commercial LPG agency location at Sharapurapalya, Nelamangala, Bengaluru Rural - 562123. Get directions and instant support.'}
            </p>
          </div>

          {/* Quick Verified Status Pill */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-black text-slate-900">
                {lang === 'kn' ? 'ಶರಾಪುರಪಾಳ್ಯ, ನೆಲಮಂಗಲ' : 'Sharapurapalya, Nelamangala'}
              </span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <span className="text-slate-600 font-bold">PIN: 562123</span>
          </div>
        </div>

        {/* Map Stage and Agency Detail Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Interactive Google Map Container */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 relative">
            <div className="w-full h-[440px] min-h-[420px] relative flex flex-col bg-slate-100">
              <iframe
                title="Sandhya Enterprises Sharapurapalya Nelamangala"
                src={`https://maps.google.com/maps?q=${encodeURIComponent('Sharapurapalya, Nelamangala, Bengaluru Rural, Karnataka 562123')}&z=14&output=embed`}
                className="w-full h-full min-h-[420px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer"
              />

              {/* Floating Map Navigation Badge */}
              <div className="absolute top-3 left-3 right-3 sm:right-auto z-10 max-w-sm bg-slate-950/92 backdrop-blur-sm text-white p-3 rounded-xl border border-slate-800 shadow-lg text-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-black text-orange-400 truncate">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">Sharapurapalya, Nelamangala</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 whitespace-nowrap">
                    ● Live Location
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  {lang === 'kn'
                    ? 'ಶರಾಪುರಪಾಳ್ಯ, ನೆಲಮಂಗಲ - 562123. ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಮೂಲಕ ನೇರ ದಾರಿ ಪಡೆಯಿರಿ.'
                    : 'Sharapurapalya, Nelamangala - 562123. Direct route via Google Maps.'}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href={AGENCY_LOCATION.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-black uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>{lang === 'kn' ? 'ಮಾರ್ಗ ಪಡೆಯಿರಿ (Directions)' : 'Get Directions'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Agency Profile & Contacts Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">
                    {lang === 'kn' ? 'ಅಧಿಕೃತ ಕಚೇರಿ & ವಿಳಾಸ' : 'OFFICIAL AGENCY PROFILE'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5 uppercase">
                    {lang === 'kn' ? AGENCY_LOCATION.nameKn : AGENCY_LOCATION.nameEn}
                  </h3>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-800 text-[10px] font-bold">
                    {lang === 'kn' ? AGENCY_LOCATION.typeKn : AGENCY_LOCATION.typeEn}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
              </div>

              {/* Location & Operating Details */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {lang === 'kn' ? 'ಏಜೆನ್ಸಿ ವಿಳಾಸ' : 'Agency Address'}
                  </span>
                  <p className="text-slate-900 font-bold leading-relaxed mt-0.5 text-sm">
                    {lang === 'kn' ? AGENCY_LOCATION.addressKn : AGENCY_LOCATION.addressEn}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {lang === 'kn' ? 'ಕಾರ್ಯಾಚರಣಾ ಸಮಯ' : 'Operating Hours'}
                  </span>
                  <p className="text-slate-800 font-bold mt-0.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    <span>{lang === 'kn' ? AGENCY_LOCATION.hoursKn : AGENCY_LOCATION.hoursEn}</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {lang === 'kn' ? 'ಲಭ್ಯವಿರುವ ಸಿಲಿಂಡರ್ ಬ್ರ್ಯಾಂಡ್‌ಗಳು' : 'Available Brands'}
                  </span>
                  <p className="text-slate-800 font-semibold mt-0.5">
                    {lang === 'kn' ? AGENCY_LOCATION.stockKn : AGENCY_LOCATION.stockEn}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {lang === 'kn' ? 'ಸೇವಾ ವ್ಯಾಪ್ತಿ ಪ್ರದೇಶ' : 'Service Coverage'}
                  </span>
                  <p className="text-slate-600 text-[11px] font-medium mt-0.5">
                    {lang === 'kn' ? AGENCY_LOCATION.coverageKn : AGENCY_LOCATION.coverageEn}
                  </p>
                </div>
              </div>

              {/* Verified Contact Lines */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={`tel:${AGENCY_LOCATION.ratePhone}`}
                    className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>ದರ: {AGENCY_LOCATION.ratePhone}</span>
                  </a>

                  <a
                    href={`https://wa.me/91${AGENCY_LOCATION.otherPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp: {AGENCY_LOCATION.otherPhone}</span>
                  </a>
                </div>

                <a
                  href={`tel:${AGENCY_LOCATION.helplinePhone}`}
                  className="w-full p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5 border border-slate-800"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  <span>24/7 Helpline: +91 {AGENCY_LOCATION.helplinePhone}</span>
                </a>
              </div>
            </div>

            {/* Statutory Compliance Badge */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-slate-900">
                  {lang === 'kn' ? 'ಪೆಸೊ & ಎಕ್ಸ್‌ಪ್ಲೋಸಿವ್ಸ್ ನಿಯಮಾವಳಿ ಅನುಮೋದಿತ' : 'PESO & Explosives Licensed Godown'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {lang === 'kn' ? 'ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ನಿಯಮಗಳು 2016 ಕ್ಕೆ ಸಂಪೂರ್ಣ ಬದ್ಧತೆ' : 'Certified storage under Gas Cylinders Rules 2016'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
