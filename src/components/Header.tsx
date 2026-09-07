import React, { useState } from 'react';
import { PhoneCall, MessageCircle, Globe, Menu, X, MapPin, Flame, User, Truck, ShieldAlert, Mail, Bot, Sparkles } from 'lucide-react';
import { Language, ActivePortalTab } from '../types';
import { SandhyaLogo } from './SandhyaLogo';
import { BUSINESS_INFO } from '../data/content';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenInquiryModal: () => void;
  onOpenAiAdvisor?: () => void;
  activePortalTab?: ActivePortalTab;
  onNavigatePortal?: (tab: ActivePortalTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenInquiryModal,
  onOpenAiAdvisor,
  activePortalTab = 'website',
  onNavigatePortal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'brands', labelEn: 'Gas Brands', labelKn: 'ಗ್ಯಾಸ್ ಬ್ರ್ಯಾಂಡ್‌ಗಳು', href: '#brands' },
    { id: 'services', labelEn: 'Services', labelKn: 'ಸೇವೆಗಳು', href: '#services' },
    { id: 'customers', labelEn: 'Who We Serve', labelKn: 'ಗ್ರಾಹಕರು', href: '#customers' },
    { id: 'calculator', labelEn: 'Rate & Booking', labelKn: 'ಬುಕಿಂಗ್ & ದರ', href: '#calculator' },
    { id: 'accessories', labelEn: 'Accessories', labelKn: 'ಉಪಕರಣಗಳು', href: '#accessories' },
    { id: 'safety', labelEn: '24/7 Safety', labelKn: 'ಸುರಕ್ಷತೆ', href: '#safety' },
    { id: 'contact', labelEn: 'Depots & Map', labelKn: 'ಡಿಪೋಗಳು & ಮ್ಯಾಪ್', href: '#depot-locations-map' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top High-Density micro bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-orange-400 font-bold uppercase tracking-wider text-[10px]">
              <MapPin className="w-3.5 h-3.5" />
              {lang === 'kn' ? 'ನೆಲಮಂಗಲ ಟೌನ್, ತುಮಕೂರು, ಶಿರಾ, ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ' : 'Nelamangala, Tumkur Highway, Sira & Bangalore Rural'}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 text-[11px]">
              {lang === 'kn' ? 'ಅಧಿಕೃತ ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ವಿತರಕರು • PESO & OMC ಮಾನದಂಡ' : 'Official Commercial LPG Distributor • PESO & OMC Certified'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              {lang === 'kn' ? '24/7 ತುರ್ತು ಸೇವೆ:' : '24/7 Support:'}
            </span>
            <a
              href={`tel:${BUSINESS_INFO.phonePrimary}`}
              className="text-white hover:text-orange-400 font-extrabold tracking-wide transition-colors"
            >
              +91 {BUSINESS_INFO.phonePrimary}
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`mailto:${BUSINESS_INFO.emailOfficial}`}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {BUSINESS_INFO.emailOfficial}
            </a>
          </div>
        </div>
      </div>

      {/* Main High-Density Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <SandhyaLogo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-orange-600 transition-colors py-1 relative group"
              >
                {lang === 'kn' ? link.labelKn : link.labelEn}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-150 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="inline-flex p-0.5 bg-slate-100 rounded-lg border border-slate-200">
              <button
                id="lang-btn-en"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded transition-all ${
                  lang === 'en'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                id="lang-btn-kn"
                onClick={() => onLanguageChange('kn')}
                className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded transition-all ${
                  lang === 'kn'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>

            {/* Quick Call Action */}
            <div className="hidden lg:block text-right pr-1">
              <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400">24/7 Hotline</p>
              <a
                href={`tel:${BUSINESS_INFO.phonePrimary}`}
                className="text-xs sm:text-sm font-black text-slate-900 hover:text-orange-600 transition-colors"
              >
                +91 8152889500
              </a>
            </div>

            {/* AI Advisor Button */}
            {onOpenAiAdvisor && (
              <button
                type="button"
                id="header-ai-advisor-btn"
                onClick={onOpenAiAdvisor}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all border bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 text-orange-950 border-orange-300 shadow-2xs group"
              >
                <Bot className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                <span className="hidden lg:inline">{lang === 'kn' ? 'AI ಸಲಹೆಗಾರ' : 'AI Advisor'}</span>
                <span className="lg:hidden">AI</span>
                <Sparkles className="w-3 h-3 text-amber-500 group-hover:rotate-12 transition-transform" />
              </button>
            )}

            {/* Customer Portal Button */}
            {onNavigatePortal && (
              <button
                type="button"
                id="header-customer-portal-btn"
                onClick={() => onNavigatePortal('customer')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all border ${
                  activePortalTab === 'customer'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                }`}
              >
                <User className="w-3.5 h-3.5 text-orange-600" />
                <span className="hidden md:inline">{lang === 'kn' ? 'ಗ್ರಾಹಕರ ಲಾಗಿನ್' : 'Customer Portal'}</span>
                <span className="md:hidden">{lang === 'kn' ? 'ಲಾಗಿನ್' : 'Portal'}</span>
              </button>
            )}

            {/* Gmail Hub Button */}
            {onNavigatePortal && (
              <button
                type="button"
                id="header-gmail-portal-btn"
                onClick={() => onNavigatePortal('gmail')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all border ${
                  activePortalTab === 'gmail'
                    ? 'bg-red-600 text-white border-red-600 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-red-500" />
                <span className="hidden lg:inline">{lang === 'kn' ? 'ಜಿಮೇಲ್ ಡೆಸ್ಕ್' : 'Gmail Desk'}</span>
                <span className="lg:hidden">Gmail</span>
              </button>
            )}

            {/* Book Now Button */}
            <button
              id="header-inquire-modal-btn"
              onClick={onOpenInquiryModal}
              className="bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-4 py-2 rounded-lg font-black text-xs uppercase tracking-wider shadow-xs transition-colors active:scale-95"
            >
              {lang === 'kn' ? 'ಬುಕಿಂಗ್ / ದರ' : 'BOOK NOW'}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg xl:hidden border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 shadow-lg animate-in slide-in-from-top-1 duration-150">
          <div className="flex flex-col gap-2">
            {/* Direct Mobile Quick Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1 pb-2 border-b border-slate-100">
              <a
                href={`tel:${BUSINESS_INFO.phonePrimary}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
                <span>{lang === 'kn' ? 'ಕರೆ 8152889500' : 'Call 8152889500'}</span>
              </a>
              <a
                href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile Portal Fast Links */}
            {onNavigatePortal && (
              <div className="grid grid-cols-4 gap-1.5 pt-1 pb-2 border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigatePortal('customer');
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                    activePortalTab === 'customer'
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <User className="w-3.5 h-3.5 mb-0.5" />
                  <span>Customer</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigatePortal('distributor');
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                    activePortalTab === 'distributor'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5 mb-0.5" />
                  <span>Distributor</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigatePortal('admin');
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                    activePortalTab === 'admin'
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 mb-0.5" />
                  <span>Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigatePortal('gmail');
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                    activePortalTab === 'gmail'
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 mb-0.5 text-red-500" />
                  <span>Gmail</span>
                </button>
              </div>
            )}

            {/* AI Advisor Mobile Button */}
            {onOpenAiAdvisor && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAdvisor();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-black uppercase tracking-wider shadow-sm"
              >
                <Bot className="w-4 h-4" />
                <span>{lang === 'kn' ? 'ಸಂಧ್ಯಾ AI ಸಲಹೆಗಾರ (Google Search)' : 'Sandhya AI Advisor (Google Search)'}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              </button>
            )}

            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-orange-50 hover:text-orange-700 rounded transition-colors"
              >
                {lang === 'kn' ? link.labelKn : link.labelEn}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiryModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-black text-xs uppercase tracking-wider shadow-xs mt-1"
            >
              <Flame className="w-4 h-4" />
              <span>{lang === 'kn' ? 'ಇಂದಿನ ದರ ವಿಚಾರಿಸಿ' : 'Get Today\'s Rate'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
