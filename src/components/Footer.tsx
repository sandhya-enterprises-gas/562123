import React from 'react';
import { Flame, PhoneCall, MessageCircle, Mail, MapPin, Globe, Instagram, Facebook, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { SandhyaLogo } from './SandhyaLogo';
import { BUSINESS_INFO } from '../data/content';

interface FooterProps {
  lang: Language;
  onOpenInquiryModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenInquiryModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-10 pb-8 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-8 border-b border-slate-800">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-3">
            <SandhyaLogo size="md" inverted />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {lang === 'kn'
                ? '೨೦೧೦ ರಿಂದ ನೆಲಮಂಗಲ, ತುಮಕೂರು, ಶಿರಾ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಹೋಟೆಲ್‌ಗಳು, ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು ಮತ್ತು ಕೈಗಾರಿಕೆಗಳಿಗೆ ಅತ್ಯುತ್ತಮ ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್ ಪೂರೈಕೆ ಹಾಗೂ ಗ್ಯಾಸ್ ಪೈಪ್‌ಲೈನ್ ಸೇವೆ.'
                : 'Premier authorized distributor for Bharat Gas, Go Gas, and Power Gas commercial & domestic cylinders with 24/7 pipeline and leakage support across Karnataka.'}
            </p>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-orange-400">
                {lang === 'kn' ? 'ಮುಖ್ಯ ಸೂಚನೆ: ' : 'Pricing Policy: '}
              </span>
              {lang === 'kn'
                ? 'ಪ್ರತಿ ತಿಂಗಳು ಗ್ಯಾಸ್ ದರ ಪರಿಷ್ಕರಣೆಯಾಗುವುದರಿಂದ, ಇಂದಿನ ದರಕ್ಕಾಗಿ 8152889500 ಗೆ ಕರೆ ಮಾಡಿ.'
                : 'Rates revise every month. Call 8152889500 to get today\'s best wholesale price.'}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">
              {lang === 'kn' ? 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು' : 'NAVIGATION'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#brands" className="hover:text-orange-400 transition-colors">
                  {lang === 'kn' ? 'ಗ್ಯಾಸ್ ಬ್ರ್ಯಾಂಡ್‌ಗಳು' : 'Gas Brands Range'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  {lang === 'kn' ? 'ನಮ್ಮ ಸೇವೆಗಳು' : 'Commercial Services'}
                </a>
              </li>
              <li>
                <a href="#customers" className="hover:text-orange-400 transition-colors">
                  {lang === 'kn' ? 'ಯಾರಿಗೆಲ್ಲ ಲಭ್ಯ?' : 'Who We Serve'}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-orange-400 transition-colors">
                  {lang === 'kn' ? 'ದರ & ಬುಕಿಂಗ್' : 'Rate Calculator'}
                </a>
              </li>
              <li>
                <a href="#accessories" className="hover:text-orange-400 transition-colors">
                  {lang === 'kn' ? 'ಕಮರ್ಷಿಯಲ್ ಸ್ಟೌಗಳು' : 'Burners & Fittings'}
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-orange-400 transition-colors">
                  {lang === 'kn' ? '24/7 ತುರ್ತು ಸುರಕ್ಷತೆ' : 'Safety Protocols'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Brands & Hubs */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">
              {lang === 'kn' ? 'ಬ್ರ್ಯಾಂಡ್‌ಗಳು & ಪ್ರದೇಶಗಳು' : 'BRANDS & CORRIDORS'}
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span><strong className="text-white">Bharat Gas</strong>: 19kg & 47.5kg Industrial</div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span><strong className="text-white">GoGas</strong>: 17kg, 21kg & 33kg Commercial & Elite</div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span><strong className="text-white">Power Gas</strong>: Commercial & Domestic LPG</div>
              <div className="pt-1.5 text-slate-400 text-[11px] leading-relaxed">
                <strong className="text-orange-400">Coverage:</strong> Nelamangala Rural/Town, Tumkur Road, Sira, Dobbaspet, Bangalore Rural.
              </div>
            </div>
          </div>

          {/* Col 4: Contact Matrix */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">
              {lang === 'kn' ? 'ಸಂಪರ್ಕ & ವಿಳಾಸ' : 'CONTACT & DESK'}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{BUSINESS_INFO.address.fullAddressEn}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phonePrimary}`} className="text-white hover:text-orange-400 font-bold">
                  +91 {BUSINESS_INFO.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}`} className="text-white hover:text-emerald-400 font-bold">
                  +91 {BUSINESS_INFO.phoneWhatsApp} (WhatsApp)
                </a>
              </div>
              <div className="flex items-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${BUSINESS_INFO.emailOfficial}`} className="text-slate-300 hover:text-white break-all text-[11px]">
                  {BUSINESS_INFO.emailOfficial}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and social row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All Rights Reserved. Official Commercial Distributor.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={BUSINESS_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-pink-400 transition-colors p-1"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={BUSINESS_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors p-1"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={BUSINESS_INFO.socials.indiamart}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-colors p-1"
              aria-label="IndiaMART"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href={BUSINESS_INFO.socials.google}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-orange-400 transition-colors p-1"
              aria-label="Google Map"
            >
              <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
