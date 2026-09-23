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
  Radio,
  Home
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();

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

  // Primary Header Nav Links (Top Level)
  const primaryNavLinks = [
    {
      to: '/',
      id: 'home',
      labelEn: 'Home',
      labelKn: 'ಮುಖ್ಯ ಪುಟ',
      icon: Home,
      highlight: false
    },
    {
      to: '/booking',
      id: 'booking',
      labelEn: 'Cylinder Booking',
      labelKn: 'ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್',
      icon: Flame,
      highlight: 'orange'
    },
    {
      to: '/track-order',
      id: 'track-order',
      labelEn: 'Track Order',
      labelKn: 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್',
      icon: Truck,
      highlight: 'amber'
    },
    {
      to: '/brands',
      id: 'brands',
      labelEn: 'Gas Brands',
      labelKn: 'ಗ್ಯಾಸ್ ಬ್ರ್ಯಾಂಡ್ಸ್',
      icon: Flame,
      highlight: false
    },
    {
      to: '/customer',
      id: 'customer',
      labelEn: 'Customer Login',
      labelKn: 'ಗ್ರಾಹಕರ ಲಾಗಿನ್',
      icon: User,
      highlight: 'emerald'
    },
    {
      to: '/distributor',
      id: 'distributor',
      labelEn: 'Delivery Partner',
      labelKn: 'ಡೆಲಿವರಿ ಪಾರ್ಟ್ನರ್',
      icon: Truck,
      highlight: 'blue'
    }
  ];

  // Secondary Home Hub Section Links
  const sectionLinks = [
    { to: '/brands', id: 'brands', labelEn: 'Gas Brands', labelKn: 'ಗ್ಯಾಸ್ ಬ್ರ್ಯಾಂಡ್‌ಗಳು', icon: Flame },
    { to: '/services', id: 'services', labelEn: 'Services', labelKn: 'ಸೇವೆಗಳು', icon: Wrench },
    { to: '/customers', id: 'customers', labelEn: 'Who We Serve', labelKn: 'ಗ್ರಾಹಕರು', icon: Users },
    { to: '/calculator', id: 'calculator', labelEn: 'Rate & Booking', labelKn: 'ಬುಕಿಂಗ್ & ದರ', icon: Calculator },
    { to: '/accessories', id: 'accessories', labelEn: 'Accessories', labelKn: 'ಉಪಕರಣಗಳು', icon: UtensilsCrossed },
    { to: '/safety', id: 'safety', labelEn: 'Safety (Customer Portal)', labelKn: 'ಸುರಕ್ಷತೆ (ಗ್ರಾಹಕರಿಗೆ)', icon: ShieldAlert },
    { to: '/contact', id: 'contact', labelEn: 'Agency Location', labelKn: 'ಏಜೆನ್ಸಿ ವಿಳಾಸ', icon: MapPin }
  ];

  const portalItems = [
    {
      to: '/customer',
      id: 'customer' as ActivePortalTab,
      nameEn: 'Customer Portal & Login',
      nameKn: 'ಗ್ರಾಹಕರ ಪೋರ್ಟಲ್ & ಲಾಗಿನ್',
      descEn: 'Cylinder refill booking, digital GST receipts & ledger',
      descKn: 'ರೀಫಿಲ್ ಬುಕಿಂಗ್, ಜಿಎಸ್‌ಟಿ ರಸೀದಿಗಳು ಮತ್ತು ಲೆಡ್ಜರ್',
      icon: User,
      color: 'bg-orange-600 text-white',
      badge: 'Public Login'
    },
    {
      to: '/distributor',
      id: 'distributor' as ActivePortalTab,
      nameEn: 'Distributor & Delivery Desk',
      nameKn: 'ವಿತರಕರ ಕಾರ್ಯಾಚರಣೆ & ಡೆಲಿವರಿ ಡೆಸ್ಕ್',
      descEn: 'Delivery partner dispatch, route tracking & cylinder tally',
      descKn: 'ಡೆಲಿವರಿ ಪಾರ್ಟ್ನರ್ ಡಿಸ್ಪ್ಯಾಚ್ & ಸಿಲಿಂಡರ್ ಲೆಕ್ಕ',
      icon: Truck,
      color: 'bg-blue-600 text-white',
      badge: 'Staff Auth'
    },
    {
      to: '/admin',
      id: 'admin' as ActivePortalTab,
      nameEn: 'Admin Command Center',
      nameKn: 'ಅಡ್ಮಿನ್ ಕಮಾಂಡ್ ಸೆಂಟರ್',
      descEn: 'Master cylinder rate revisions, audits & credentials',
      descKn: 'ಮಾಸ್ಟರ್ ದರ ಪರಿಷ್ಕರಣೆ, ಆಡಿಟ್ & ಸಿಸ್ಟಮ್ ಕಂಟ್ರೋಲ್',
      icon: Shield,
      color: 'bg-purple-600 text-white',
      badge: 'Admin Only'
    },
    {
      to: '/gmail',
      id: 'gmail' as ActivePortalTab,
      nameEn: 'Official Mail & Invoicing',
      nameKn: 'ಅಧಿಕೃತ ಜಿಮೇಲ್ & ಇನ್‌ವಾಯ್ಸ್ ಡೆಸ್ಕ್',
      descEn: 'Verified company communications & dispatch emails',
      descKn: 'ಕಂಪನಿ ಇಮೇಲ್ ಸಂವಹನ & ಟ್ಯಾಕ್ಸ್ ಇನ್‌ವಾಯ್ಸ್ ಡೆಸ್ಕ್',
      icon: Mail,
      color: 'bg-red-600 text-white',
      badge: 'Gmail API'
    }
  ];

  const currentPath = location.pathname;

  const isLinkActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const handlePortalNavigate = (to: string, tabId: ActivePortalTab) => {
    setPortalDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigatePortal) {
      onNavigatePortal(tabId);
    }
    navigate(to);
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
          {/* Brand Logo with Link to Home */}
          <Link
            to="/"
            className="flex items-center group focus:outline-none"
            onClick={() => {
              if (onNavigatePortal) onNavigatePortal('website');
            }}
          >
            <SandhyaLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {primaryNavLinks.map((link) => {
              const active = isLinkActive(link.to);
              const Icon = link.icon;

              return (
                <Link
                  key={link.id}
                  to={link.to}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 relative ${
                    active
                      ? link.highlight === 'orange'
                        ? 'bg-orange-600 text-white shadow-xs'
                        : link.highlight === 'amber'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : link.highlight === 'emerald'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : link.highlight === 'blue'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-700 hover:text-orange-600 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      active
                        ? 'text-white'
                        : link.highlight === 'orange'
                        ? 'text-orange-600'
                        : link.highlight === 'amber'
                        ? 'text-amber-500'
                        : link.highlight === 'emerald'
                        ? 'text-emerald-600'
                        : link.highlight === 'blue'
                        ? 'text-blue-600'
                        : 'text-slate-500'
                    }`}
                  />
                  <span>{lang === 'kn' ? link.labelKn : link.labelEn}</span>

                  {link.id === 'track-order' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
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
            <div className="hidden 2xl:flex items-center gap-2 pr-1 text-right">
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
            <div className="relative hidden md:block" ref={dropdownRef}>
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
                <span>{lang === 'kn' ? 'ಪೋರ್ಟಲ್‌ಗಳು' : 'Portals'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
                    portalDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
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
                      🔒 Verified
                    </span>
                  </div>

                  <div className="space-y-1 mt-1.5">
                    {portalItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handlePortalNavigate(item.to, item.id)}
                          className="w-full flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 transition-colors group cursor-pointer"
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

            {/* Quick Cylinder Booking Action Button */}
            <Link
              to="/booking"
              className="bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-3.5 py-2 rounded-lg font-black text-xs uppercase tracking-wider shadow-xs transition-colors active:scale-95 flex items-center gap-1.5 shrink-0"
            >
              <Flame className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್' : 'BOOK NOW'}</span>
              <span className="sm:hidden">{lang === 'kn' ? 'ಬುಕ್' : 'BOOK'}</span>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg lg:hidden border border-slate-200 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER: COMPLETE, RESPONSIVE & HIGHLY FUNCTIONAL */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-1 duration-150 max-h-[85vh] overflow-y-auto">
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

            {/* PRIMARY QUICK ACTION LINKS ON MOBILE */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 text-white font-black text-xs uppercase tracking-wider flex flex-col items-start gap-1 shadow-md"
              >
                <Flame className="w-5 h-5 text-amber-200" />
                <span>{lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್' : 'Cylinder Booking'}</span>
                <span className="text-[10px] text-orange-100 font-normal">Fast 45-Min Refill</span>
              </Link>

              <Link
                to="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-black text-xs uppercase tracking-wider flex flex-col items-start gap-1 shadow-md border border-slate-700"
              >
                <div className="flex items-center justify-between w-full">
                  <Truck className="w-5 h-5 text-amber-400" />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                </div>
                <span>{lang === 'kn' ? 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್' : 'Track Order'}</span>
                <span className="text-[10px] text-amber-300 font-normal">Live GPS Status</span>
              </Link>
            </div>

            {/* OFFICIAL PORTALS CARD ON MOBILE */}
            <div className="p-3 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    {lang === 'kn' ? 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗಳು' : 'Official Portals'}
                  </span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-bold border border-slate-700">
                  Secure Access
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {portalItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      to={item.to}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onNavigatePortal) onNavigatePortal(item.id);
                      }}
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
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* All Section Pages Navigation Links */}
            <div className="space-y-1 pt-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center justify-between">
                <span>{lang === 'kn' ? 'ಪುಟಗಳು & ವಿಭಾಗಗಳು' : 'PAGES & SECTIONS'}</span>
                <span className="text-[9px] text-orange-600 font-bold">1-Click Open</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all border text-left bg-white border-slate-200 text-slate-800 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200"
                >
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-orange-600" />
                    <span>{lang === 'kn' ? 'ಮುಖ್ಯ ಪುಟ (ಮುಖಪುಟ)' : 'Home Page'}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                {sectionLinks.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <Link
                      key={link.id}
                      to={link.to}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (link.id === 'safety') {
                          if (onNavigatePortal) onNavigatePortal('customer');
                        } else if (onSelectHomeSection) {
                          onSelectHomeSection(link.id as any);
                        }
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all border text-left bg-white border-slate-200 text-slate-800 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200"
                    >
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-orange-600" />
                        <span>{lang === 'kn' ? link.labelKn : link.labelEn}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
