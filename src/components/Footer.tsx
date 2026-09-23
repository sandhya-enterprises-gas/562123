import React from 'react';
import {
  Flame,
  PhoneCall,
  MessageCircle,
  MapPin,
  Mail,
  ShieldCheck,
  Building,
  Award,
  ShieldAlert,
  Globe,
  Instagram,
  Facebook,
  Truck,
  User,
  Calculator
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';
import { SandhyaLogo } from './SandhyaLogo';

interface FooterProps {
  lang: Language;
  onOpenInquiryModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenInquiryModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-3.5">
            <Link to="/" className="inline-block">
              <SandhyaLogo size="lg" />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'kn'
                ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ - ನೆಲಮಂಗಲ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಹೋಟೆಲ್, ಕ್ಯಾಟರಿಂಗ್, ಮತ್ತು ಕೈಗಾರಿಕೆಗಳಿಗೆ ಅಧಿಕೃತ ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್ ವಿತರಕರು. 100% ನಿಖರ ತೂಕ ಮತ್ತು ವೇಗದ ಡೋರ್‌ಸ್ಟೆಪ್ ಸೇವೆ.'
                : 'Sandhya Enterprises - Authorized Commercial LPG Gas Cylinders & Manifold Pipeline Solutions in Nelamangala (562123). Verified net weight, tamper-proof seals & dedicated express delivery fleet.'}
            </p>

            {/* Official Registrations */}
            <div className="space-y-1 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">GSTIN:</span>
                <span className="text-white font-mono font-bold bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                  {BUSINESS_INFO.gstin}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">UDYAM:</span>
                <span className="text-white font-bold bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                  {BUSINESS_INFO.udyam}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              {lang === 'kn' ? 'ತ್ವರಿತ ಪುಟಗಳು' : 'DIRECT NAVIGATION'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>•</span>
                  <span>{lang === 'kn' ? 'ಮುಖ್ಯ ಪುಟ (ಮುಖಪುಟ)' : 'Home Page'}</span>
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-amber-400 text-orange-400 font-bold transition-colors flex items-center gap-1.5">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span>{lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್' : 'Cylinder Booking'}</span>
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-amber-400 text-amber-300 font-bold transition-colors flex items-center gap-1.5">
                  <Truck className="w-3 h-3 text-amber-400" />
                  <span>{lang === 'kn' ? 'ಲೈವ್ ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್' : 'Track Order (Live)'}</span>
                </Link>
              </li>
              <li>
                <Link to="/customer" className="hover:text-amber-400 text-emerald-400 font-bold transition-colors flex items-center gap-1.5">
                  <User className="w-3 h-3 text-emerald-400" />
                  <span>{lang === 'kn' ? 'ಗ್ರಾಹಕರ ಪೋರ್ಟಲ್ & ಲಾಗಿನ್' : 'Customer Portal & Login'}</span>
                </Link>
              </li>
              <li>
                <Link to="/distributor" className="hover:text-amber-400 text-blue-400 font-bold transition-colors flex items-center gap-1.5">
                  <Truck className="w-3 h-3 text-blue-400" />
                  <span>{lang === 'kn' ? 'ಡೆಲಿವರಿ ಪಾರ್ಟ್ನರ್ ಡೆಸ್ಕ್' : 'Delivery Partner Desk'}</span>
                </Link>
              </li>
              <li>
                <Link to="/brands" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>•</span>
                  <span>{lang === 'kn' ? 'ಗ್ಯಾಸ್ ಬ್ರ್ಯಾಂಡ್‌ಗಳು' : 'Gas Brands Range'}</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>•</span>
                  <span>{lang === 'kn' ? 'ನಮ್ಮ ಸೇವೆಗಳು & ಪೈಪ್‌ಲೈನ್' : 'Commercial Services'}</span>
                </Link>
              </li>
              <li>
                <Link to="/customers" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>•</span>
                  <span>{lang === 'kn' ? 'ಯಾರಿಗೆಲ್ಲ ಲಭ್ಯ?' : 'Who We Serve'}</span>
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>•</span>
                  <span>{lang === 'kn' ? 'ಕಮರ್ಷಿಯಲ್ ಬರ್ನರ್ & ಉಪಕರಣಗಳು' : 'Burners & Fittings'}</span>
                </Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ShieldAlert className="w-3 h-3 text-red-500" />
                  <span>{lang === 'kn' ? 'ತುರ್ತು ಸುರಕ್ಷತಾ ಮಾರ್ಗದರ್ಶಿ' : 'Safety Protocols'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Brands & Hubs */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">
              {lang === 'kn' ? 'ಬ್ರ್ಯಾಂಡ್‌ಗಳು & ಪ್ರದೇಶಗಳು' : 'BRANDS & CORRIDORS'}
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                <strong className="text-white">Bharat Gas</strong>: 19kg & 47.5kg
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <strong className="text-white">GoGas</strong>: 17kg, 21kg & 33kg
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <strong className="text-white">Power Gas</strong>: Commercial & Domestic
              </div>
              <div className="pt-1.5 text-slate-400 text-[11px] leading-relaxed">
                <strong className="text-orange-400">Coverage:</strong> Nelamangala (562123), Dobbaspet, Tumkur Road, Bangalore Rural.
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
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {lang === 'kn' ? 'ದರ ವಿಚಾರಣೆ:' : 'Rate Enquiry:'}
                  </span>
                  <a href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`} className="text-white hover:text-orange-400 font-bold ml-auto font-mono">
                    +91 {BUSINESS_INFO.phoneRateEnquiry}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    WhatsApp:
                  </span>
                  <a
                    href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-bold ml-auto font-mono"
                  >
                    +91 {BUSINESS_INFO.phoneWhatsApp}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {lang === 'kn' ? 'ಸಹಾಯವಾಣಿ:' : 'Helpline:'}
                  </span>
                  <a href={`tel:${BUSINESS_INFO.phoneHelpline}`} className="text-white hover:text-red-400 font-bold ml-auto font-mono">
                    +91 {BUSINESS_INFO.phoneHelpline}
                  </a>
                </div>
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
          <div className="space-y-0.5 text-center sm:text-left">
            <div>
              © {new Date().getFullYear()} {BUSINESS_INFO.name}. All Rights Reserved.
            </div>
            <div className="text-[11px] text-slate-400">
              <span className="text-amber-400 font-semibold">
                {lang === 'kn' ? `ಪ್ರೊ: ${BUSINESS_INFO.proprietorKn}` : `Pro: ${BUSINESS_INFO.proprietor}`}
              </span>
              {' • '}
              <span>GSTIN: <strong className="text-slate-300 font-mono">{BUSINESS_INFO.gstin}</strong></span>
              {' • '}
              <span>UDYAM: <strong className="text-slate-300 font-mono">{BUSINESS_INFO.udyam}</strong></span>
            </div>
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
