import React from 'react';
import { MapPin, PhoneCall, MessageCircle, Mail, ExternalLink, Globe, Instagram, Facebook, ShieldCheck, Clock, Navigation } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface ContactAndLocationProps {
  lang: Language;
}

export const ContactAndLocation: React.FC<ContactAndLocationProps> = ({ lang }) => {
  return (
    <section id="contact" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-orange-100 text-orange-900 text-[10px] font-black uppercase tracking-widest border border-orange-200">
            <MapPin className="w-3 h-3 text-orange-700" />
            <span>{lang === 'kn' ? 'ನಮ್ಮ ವಿಳಾಸ ಮತ್ತು ಸಂಪರ್ಕ' : 'DIRECT CONTACTS & DEPOT LOCATION'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            {lang === 'kn' ? (
              <>
                ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್{' '}
                <span className="text-orange-600">ಅಧಿಕೃತ ಸಂಪರ್ಕ ಕೇಂದ್ರ</span>
              </>
            ) : (
              <>
                Sandhya Enterprises{' '}
                <span className="text-orange-600">Commercial Gas Agency Hub</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {lang === 'kn'
              ? 'ನೆಲಮಂಗಲ, ನೆಲಮಂಗಲ ಗ್ರಾಮಾಂತರ ಮತ್ತು ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ (562123) ಅಧಿಕೃತ ಏಜೆನ್ಸಿ ಹಬ್. ತುಮಕೂರು ಮತ್ತು ಶಿರಾ ಭಾಗಗಳಿಗೆ 10-15+ ಸಿಲಿಂಡರ್ ಬಲ್ಕ್ ಆರ್ಡರ್‌ಗಳು ಲಭ್ಯ. ಡೆಲಿವರಿ, ಹೊಸ ಕನೆಕ್ಷನ್ ಮತ್ತು ಪೈಪ್‌ಲೈನ್ ಕಾಮಗಾರಿಗಾಗಿ ಸಂಪರ್ಕಿಸಿ.'
              : 'Official Commercial LPG Hub serving Nelamangala, Nelamangala Rural & Bengaluru Rural (562123). Dedicated bulk delivery (10-15+ cylinders) available for Tumkur and Sira.'}
          </p>
        </div>

        {/* Contact Matrix & Location Grid in High Density Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Address Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {lang === 'kn' ? 'ಮುಖ್ಯ ಕಚೇರಿ & ಗೋದಾಮು' : 'REGISTERED AGENCY & DEPOT'}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 uppercase">
                    {lang === 'kn' ? BUSINESS_INFO.nameKn : BUSINESS_INFO.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {lang === 'kn' ? BUSINESS_INFO.address.fullAddressKn : BUSINESS_INFO.address.fullAddressEn}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-bold text-slate-500">
                  {lang === 'kn' ? 'ಪಿನ್‌ಕೋಡ್: 562123' : 'Pincode: 562123 (Karnataka)'}
                </span>
                <a
                  href={BUSINESS_INFO.socials.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-950 text-xs font-black uppercase tracking-wider transition-colors border border-orange-200"
                >
                  <Navigation className="w-3 h-3 text-orange-600" />
                  <span>{lang === 'kn' ? 'ಗೂಗಲ್ ಮ್ಯಾಪ್' : 'Google Maps'}</span>
                </a>
              </div>
            </div>

            {/* Calling & WhatsApp Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Primary Call */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    <PhoneCall className="w-3.5 h-3.5 text-orange-600" />
                    <span>{lang === 'kn' ? 'ಬುಕಿಂಗ್ & ದರ ವಿಚಾರಣೆ' : 'Direct Booking'}</span>
                  </div>
                  <div className="text-base font-black text-slate-900 mt-1">
                    +91 {BUSINESS_INFO.phonePrimary}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {lang === 'kn' ? 'ಬೆಳಿಗ್ಗೆ 7 - ರಾತ್ರಿ 9' : '7:00 AM - 9:00 PM'}
                  </p>
                </div>
                <a
                  href={`tel:${BUSINESS_INFO.phonePrimary}`}
                  className="mt-3 w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-black uppercase tracking-wider text-center transition-colors"
                >
                  {lang === 'kn' ? 'ಈಗ ಕರೆ ಮಾಡಿ' : 'Call 8152889500'}
                </a>
              </div>

              {/* WhatsApp Support */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-700 uppercase tracking-wider">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{lang === 'kn' ? 'ವಾಟ್ಸಾಪ್ ಸಹಾಯವಾಣಿ' : 'WhatsApp Support'}</span>
                  </div>
                  <div className="text-base font-black text-slate-900 mt-1">
                    +91 {BUSINESS_INFO.phoneWhatsApp}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {lang === 'kn' ? 'ತ್ವರಿತ ಸಂದೇಶ & ದರ ಪಟ್ಟಿ' : 'Instant Chat & Location'}
                  </p>
                </div>
                <a
                  href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-black uppercase tracking-wider text-center transition-colors"
                >
                  {lang === 'kn' ? 'ವಾಟ್ಸಾಪ್ ಚಾಟ್' : 'WhatsApp Chat'}
                </a>
              </div>
            </div>

            {/* Email Channels Card */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-1 overflow-hidden">
                  <span className="font-black text-[10px] text-slate-500 uppercase tracking-wider">
                    {lang === 'kn' ? 'ಅಧಿಕೃತ ಇಮೇಲ್ ವಿಳಾಸಗಳು' : 'OFFICIAL EMAIL DESKS'}
                  </span>
                  <div>
                    <span className="text-slate-500 text-[11px] block">General & Billing:</span>
                    <a
                      href={`mailto:${BUSINESS_INFO.emailOfficial}`}
                      className="font-bold text-xs text-slate-900 hover:text-orange-600 break-all"
                    >
                      {BUSINESS_INFO.emailOfficial}
                    </a>
                  </div>
                  <div className="pt-0.5">
                    <span className="text-red-600 font-bold text-[11px] block">Emergency / Escalations:</span>
                    <a
                      href={`mailto:${BUSINESS_INFO.emailEmergency}`}
                      className="font-bold text-xs text-slate-900 hover:text-red-600 break-all"
                    >
                      {BUSINESS_INFO.emailEmergency}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Social Profiles, Verified Badges & Map Card */}
          <div className="lg:col-span-6 space-y-4">
            {/* Social & Verification Hub */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-white shadow-xs space-y-4 border border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                    {lang === 'kn' ? 'ಅಧಿಕೃತ ಪ್ರೊಫೈಲ್‌ಗಳು & ಪರಿಶೀಲನೆ' : 'VERIFIED ONLINE PORTALS'}
                  </span>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight mt-0.5">
                    {lang === 'kn' ? 'ಆನ್‌ಲೈನ್ ಸಂಪರ್ಕಿಸಿ' : 'Direct Verified Channels'}
                  </h3>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>

              {/* Social Buttons List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Instagram */}
                <a
                  href={BUSINESS_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors group"
                >
                  <div className="p-1.5 rounded-md bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white group-hover:text-pink-400 truncate">
                      @sandhya___enterprises
                    </div>
                    <div className="text-[10px] text-slate-400">Instagram Official</div>
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href={BUSINESS_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors group"
                >
                  <div className="p-1.5 rounded-md bg-blue-600 text-white">
                    <Facebook className="w-3.5 h-3.5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white group-hover:text-blue-400 truncate">
                      Bharat Gas KA-52
                    </div>
                    <div className="text-[10px] text-slate-400">Facebook Page</div>
                  </div>
                </a>

                {/* IndiaMART Verified */}
                <a
                  href={BUSINESS_INFO.socials.indiamart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors group"
                >
                  <div className="p-1.5 rounded-md bg-teal-600 text-white">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white group-hover:text-teal-400 truncate">
                      IndiaMART Verified
                    </div>
                    <div className="text-[10px] text-slate-400">Commercial Catalog</div>
                  </div>
                </a>

                {/* Google Maps / Reviews */}
                <a
                  href={BUSINESS_INFO.socials.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors group"
                >
                  <div className="p-1.5 rounded-md bg-orange-500 text-slate-950">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white group-hover:text-orange-400 truncate">
                      Google Business
                    </div>
                    <div className="text-[10px] text-slate-400">Ratings & Location</div>
                  </div>
                </a>
              </div>

              {/* Linktree Quick Link */}
              <div className="pt-1">
                <a
                  href={BUSINESS_INFO.socials.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black uppercase tracking-wider transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{lang === 'kn' ? 'ಲಿಂಕ್‌ಟ್ರೀ ನೋಡಿ' : 'VISIT OFFICIAL LINKTREE'}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Service Coverage List */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                {lang === 'kn' ? 'ಸೇವಾ ವ್ಯಾಪ್ತಿ (Service Coverage)' : 'Service Coverage Areas'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {BUSINESS_INFO.serviceRegions.map((reg, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200"
                  >
                    {lang === 'kn' ? reg.kn : reg.en}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
