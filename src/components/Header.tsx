import React, { useState, useRef, useEffect } from 'react';
import {
  PhoneCall,
  MessageCircle,
  Menu,
  X,
  MapPin,
  Flame,
  User,
  Truck,
  Shield,
  ShieldAlert,
  Mail,
  Lock,
  ChevronDown,
  ArrowRight,
  Wrench,
  Users,
  Calculator,
  UtensilsCrossed,
  ChevronRight
} from 'lucide-react';
import { Language, ActivePortalTab } from '../types';
import { SandhyaLogo } from './SandhyaLogo';
import { BUSINESS_INFO } from '../data/content';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenInquiryModal: () => void;
  activePortalTab?: ActivePortalTab;
  onNavigatePortal?: (tab: ActivePortalTab) => void;
  onSelectHomeSection?: (sectionId: 'brands' | 'services' | 'customers' | 'calculator' | 'accessories' | 'contact') => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenInquiryModal,
  activePortalTab = 'website',
  onNavigatePortal,
  onSelectHomeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPortalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'brands', labelEn: 'Gas Brands', labelKn: 'ಗ್ಯಾಸ್ ಬ್ರ್ಯಾಂಡ್‌ಗಳು', icon: Flame, isSafetyGuide: false },
    { id: 'services', labelEn: 'Services', labelKn: 'ಸೇವೆಗಳು', icon: Wrench, isSafetyGuide: false },
    { id: 'customers', labelEn: 'Who We Serve', labelKn: 'ಗ್ರಾಹಕರು', icon: Users, isSafetyGuide: false },
    { id: 'calculator', labelEn: 'Rate & Booking', labelKn: 'ಬುಕಿಂಗ್ & ದರ', icon: Calculator, isSafetyGuide: false },
    { id: 'accessories', labelEn: 'Accessories', labelKn: 'ಉಪಕರಣಗಳು', icon: UtensilsCrossed, isSafetyGuide: false },
    { id: 'safety', labelEn: 'Safety (Customer Portal)', labelKn: 'ಸುರಕ್ಷತೆ (ಗ್ರಾಹಕರಿಗೆ ಮಾತ್ರ)', icon: ShieldAlert, isSafetyGuide: true },
    { id: 'contact', labelEn: 'Agency Location', labelKn: 'ಏಜೆನ್ಸಿ ವಿಳಾಸ', icon: MapPin, isSafetyGuide: false },
  ];

  const portalItems = [
    {
      id: 'customer' as ActivePortalTab,
      nameEn: 'Customer Portal',
      nameKn: 'ಗ್ರಾಹಕರ ಪೋರ್ಟಲ್',
      descEn: 'Cylinder refill booking, digital GST receipts & ledger',
      descKn: 'ರೀಫಿಲ್ ಬುಕಿಂಗ್, ಜಿಎಸ್‌ಟಿ ರಸೀದಿಗಳು ಮತ್ತು ಲೆಡ್ಜರ್',
      icon: User,
      color: 'bg-orange-600 text-white',
      badge: 'Public Login'
    },
    {
      id: 'distributor' as ActivePortalTab,
      nameEn: 'Distributor Desk',
      nameKn: 'ವಿತರಕರ ಡೆಸ್ಕ್',
      descEn: 'Delivery partner dispatch, route tracking & cylinder tally',
      descKn: 'ಡೆಲಿವರಿ ಪಾರ್ಟ್ನರ್ ಡಿಸ್ಪ್ಯಾಚ್ & ಸಿಲಿಂಡರ್ ಲೆಕ್ಕ',
      icon: Truck,
      color: 'bg-blue-600 text-white',
      badge: 'Staff Auth'
    },
    {
      id: 'admin' as ActivePortalTab,
      nameEn: 'Admin Command',
      nameKn: 'ಅಡ್ಮಿನ್ ಪ್ಯಾನೆಲ್',
      descEn: 'Master cylinder rate revisions, audits & credentials',
      descKn: 'ಮಾಸ್ಟರ್ ದರ ಪರಿಷ್ಕರಣೆ, ಆಡಿಟ್ & ಸಿಸ್ಟಮ್ ಕಂಟ್ರೋಲ್',
      icon: Shield,
      color: 'bg-purple-600 text-white',
      badge: 'Admin Only'
    },
    {
      id: 'gmail' as ActivePortalTab,
      nameEn: 'Official Mail Desk',
      nameKn: 'ಅಧಿಕೃತ ಜಿಮೇಲ್ ಡೆಸ್ಕ್',
      descEn: 'Verified company communications & dispatch emails',
      descKn: 'ಕಂಪನಿ ಇಮೇಲ್ ಸಂವಹನ & ಟ್ಯಾಕ್ಸ್ ಇನ್‌ವಾಯ್ಸ್ ಡೆಸ್ಕ್',
      icon: Mail,
      color: 'bg-red-600 text-white',
      badge: 'Gmail API'
    }
  ];

  const handlePortalSelect = (tab: ActivePortalTab) => {
    setPortalDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigatePortal) {
      onNavigatePortal(tab);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top High-Density micro bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            <span className="flex items-center gap-1 text-orange-400 font-bold uppercase tracking-wider text-[10px]">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span>{lang === 'kn' ? 'ಶರಾಪುರಪಾಳ್ಯ, ನೆಲಮಂಗಲ - 562123' : 'Sharapurapalya, Nelamangala - 562123'}</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-300 font-black text-[10px] uppercase tracking-wider bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
              {lang === 'kn' ? `ಪ್ರೊ: ${BUSINESS_INFO.proprietorKn}` : `Pro: ${BUSINESS_INFO.proprietor}`}
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-300 text-[10px] hidden md:inline font-mono">
              GSTIN: <strong className="text-white font-bold">{BUSINESS_INFO.gstin}</strong>
            </span>
            <span className="text-slate-600 hidden lg:inline">|</span>
            <span className="text-slate-300 text-[10px] hidden lg:inline font-mono">
              UDYAM: <strong className="text-white font-bold">{BUSINESS_INFO.udyam}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] flex-shrink-0">
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider hidden sm:inline">
              {lang === 'kn' ? 'ದರ ವಿಚಾರಣೆ:' : 'Rate Enquiry:'}
            </span>
            <a
              href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
              className="text-orange-400 hover:text-white font-extrabold tracking-wide transition-colors"
            >
              +91 {BUSINESS_INFO.phoneRateEnquiry}
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider hidden md:inline">
              {lang === 'kn' ? 'ಸಹಾಯವಾಣಿ:' : 'Helpline:'}
            </span>
            <a
              href={`tel:${BUSINESS_INFO.phoneHelpline}`}
              className="text-white hover:text-orange-400 font-extrabold tracking-wide transition-colors hidden md:inline"
            >
              +91 {BUSINESS_INFO.phoneHelpline}
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a
              href={`mailto:${BUSINESS_INFO.emailOfficial}`}
              className="text-slate-300 hover:text-white transition-colors hidden sm:inline"
            >
              {BUSINESS_INFO.emailOfficial}
            </a>
          </div>
        </div>
      </div>

      {/* Main Executive Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <a href="#" className="flex items-center">
            <SandhyaLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  if (link.isSafetyGuide) {
                    if (onNavigatePortal) onNavigatePortal('customer');
                  } else if (onSelectHomeSection) {
                    if (activePortalTab !== 'website' && onNavigatePortal) {
                      onNavigatePortal('website');
                    }
                    onSelectHomeSection(link.id as any);
                    const el = document.getElementById('home-sections-hub');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`text-xs font-bold uppercase tracking-wider transition-colors py-1 relative group flex items-center gap-1.5 cursor-pointer ${
                  link.isSafetyGuide
                    ? 'text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md border border-red-200'
                    : 'text-slate-700 hover:text-orange-600'
                }`}
              >
                <span>{lang === 'kn' ? link.labelKn : link.labelEn}</span>
                {!link.isSafetyGuide && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-150 group-hover:w-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="inline-flex p-0.5 bg-slate-100 rounded-lg border border-slate-200">
              <button
                id="lang-btn-en"
                type="button"
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
                type="button"
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

            {/* Quick Call Action (Desktop) */}
            <div className="hidden lg:flex items-center gap-2.5 pr-1 text-right">
              <div>
                <p className="text-[9px] uppercase font-bold tracking-widest text-orange-600">
                  {lang === 'kn' ? 'ದರ ವಿಚಾರಣೆ' : 'Rate Enquiry'}
                </p>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
                  className="text-xs sm:text-sm font-black text-slate-900 hover:text-orange-600 transition-colors"
                >
                  {BUSINESS_INFO.phoneRateEnquiry}
                </a>
              </div>
            </div>

            {/* SMART UNIFIED PORTAL SELECTOR DROPDOWN (Desktop) */}
            {onNavigatePortal && (
              <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                  type="button"
                  id="header-portals-menu-btn"
                  onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all border ${
                    portalDropdownOpen
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-900 text-white hover:bg-slate-800 border-slate-800 shadow-xs'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'kn' ? 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್' : 'Portals'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${portalDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Elegant Dropdown Card */}
                {portalDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {lang === 'kn' ? 'ಅಧಿಕೃತ ಪ್ರವೇಶ' : 'RESTRICTED WORKSPACES'}
                        </div>
                        <div className="text-xs font-black text-slate-900">
                          {lang === 'kn' ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಪೋರ್ಟಲ್‌ಗಳು' : 'Sandhya Enterprises Portals'}
                        </div>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        🔒 RBAC
                      </span>
                    </div>

                    <div className="space-y-1 mt-1.5">
                      {portalItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handlePortalSelect(item.id)}
                            className="w-full flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 transition-colors group"
                          >
                            <div className={`p-2 rounded-lg ${item.color} shrink-0 mt-0.5 shadow-xs`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                                  {lang === 'kn' ? item.nameKn : item.nameEn}
                                </span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                  {item.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {lang === 'kn' ? item.descKn : item.descEn}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Book Now Button */}
            <button
              id="header-inquire-modal-btn"
              type="button"
              onClick={onOpenInquiryModal}
              className="bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-4 py-2 rounded-lg font-black text-xs uppercase tracking-wider shadow-xs transition-colors active:scale-95 flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಬುಕಿಂಗ್ / ದರ' : 'BOOK NOW'}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg xl:hidden border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER: CLEAN, SMART & HIGHLY ORGANIZED */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-1 duration-150 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {/* Quick Contact Action Bar on Mobile */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
                className="flex items-center justify-center gap-1.5 p-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold text-center shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{lang === 'kn' ? 'ದರ: 7676398782' : 'Rate: 7676398782'}</span>
              </a>
              <a
                href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold text-center shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 8073407706</span>
              </a>
            </div>

            {/* SMART OFFICIAL PORTALS CARD ON MOBILE */}
            {onNavigatePortal && (
              <div className="p-3 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      {lang === 'kn' ? 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗಳು' : 'Official Portals'}
                    </span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-bold border border-slate-700">
                    Secure Login
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {portalItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handlePortalSelect(item.id)}
                        className="flex flex-col items-start p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition-colors"
                      >
                        <div className={`p-1.5 rounded-lg ${item.color} mb-1.5 shadow-2xs`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-white leading-tight">
                          {lang === 'kn' ? item.nameKn : item.nameEn}
                        </span>
                        <span className="text-[9px] text-slate-400 mt-0.5">
                          {item.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Page Anchor Links */}
            <div className="space-y-1 pt-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center justify-between">
                <span>{lang === 'kn' ? 'ಪುಟಗಳು (ವಿಭಾಗಗಳು)' : 'MENU PAGES'}</span>
                <span className="text-[9px] text-orange-600 font-bold">{lang === 'kn' ? 'ತ್ವರಿತ ವೀಕ್ಷಣೆ' : 'Direct View'}</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (link.isSafetyGuide) {
                          if (onNavigatePortal) onNavigatePortal('customer');
                        } else if (onSelectHomeSection) {
                          if (activePortalTab !== 'website' && onNavigatePortal) {
                            onNavigatePortal('website');
                          }
                          onSelectHomeSection(link.id as any);
                          const el = document.getElementById('home-sections-hub');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all border text-left cursor-pointer ${
                        link.isSafetyGuide
                          ? 'bg-red-50/70 border-red-200 text-red-900 hover:bg-red-100'
                          : 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            link.isSafetyGuide
                              ? 'bg-red-100 text-red-600'
                              : 'bg-orange-100/80 text-orange-600'
                          }`}
                        >
                          <LinkIcon className="w-3.5 h-3.5" />
                        </div>
                        <span>{lang === 'kn' ? link.labelKn : link.labelEn}</span>
                      </div>

                      {link.isSafetyGuide ? (
                        <span className="text-[9px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">
                          {lang === 'kn' ? 'ಗ್ರಾಹಕರ ಲಾಗಿನ್' : 'Customer Login'}
                        </span>
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Helpline Emergency Bar */}
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span className="text-red-950 font-bold text-[11px]">
                  {lang === 'kn' ? '24/7 ತುರ್ತು ಸಹಾಯವಾಣಿ:' : '24/7 Helpline:'}
                </span>
              </div>
              <a
                href={`tel:${BUSINESS_INFO.phoneHelpline}`}
                className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1 shadow-xs transition-colors"
              >
                <PhoneCall className="w-3 h-3" />
                <span>{lang === 'kn' ? 'ತುರ್ತು ಕರೆ' : 'CALL'}</span>
              </a>
            </div>

            {/* Official Registration & GSTIN Badge */}
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 text-[10px] space-y-1 border border-slate-200">
              <div className="flex items-center justify-between font-black text-slate-900 uppercase">
                <span>{lang === 'kn' ? `ಪ್ರೊ: ${BUSINESS_INFO.proprietorKn}` : `Pro: ${BUSINESS_INFO.proprietor}`}</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  ✓ VERIFIED
                </span>
              </div>
              <div className="font-mono text-slate-500">
                GSTIN: <span className="text-slate-900 font-bold">{BUSINESS_INFO.gstin}</span>
              </div>
              <div className="font-mono text-slate-500">
                Address: <span className="text-slate-900 font-semibold">{BUSINESS_INFO.address.fullAddressEn}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
