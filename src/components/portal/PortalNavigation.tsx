import React, { useState, useEffect } from 'react';
import { Globe, User, Truck, Shield, Lock, Unlock, LogOut, CheckCircle2, Mail, Key, ArrowLeft, Flame } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ActivePortalTab, Language } from '../../types';
import { portalStore, PortalState } from '../../data/portalStore';
import { portalAuth, PortalUserSession } from '../../lib/portalAuth';
import { OfficialLogoBadge } from '../common/OfficialLogoWatermark';

interface PortalNavigationProps {
  lang: Language;
  activeTab: ActivePortalTab;
  onSelectTab: (tab: ActivePortalTab) => void;
}

export const PortalNavigation: React.FC<PortalNavigationProps> = ({
  lang,
  activeTab,
  onSelectTab
}) => {
  const [storeState, setStoreState] = useState<PortalState>(portalStore.getState());
  const [authSession, setAuthSession] = useState<PortalUserSession | null>(portalAuth.getSession());
  const location = useLocation();

  useEffect(() => {
    const unsubStore = portalStore.subscribe(() => {
      setStoreState({ ...portalStore.getState() });
    });
    const unsubAuth = portalAuth.subscribe(() => {
      setAuthSession(portalAuth.getSession());
    });
    return () => {
      unsubStore();
      unsubAuth();
    };
  }, []);

  const currentCustomer = storeState.customers.find((c) => c.id === storeState.currentCustomerId) || null;
  const isDistributorAuth = storeState.isDistributorAuth || (authSession?.role === 'distributor' || authSession?.role === 'admin');
  const isAdminAuth = storeState.isAdminAuth || authSession?.role === 'admin';

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    portalAuth.logout();
    portalStore.setCurrentCustomer(null);
    portalStore.lockDistributor();
    portalStore.lockAdmin();
  };

  const currentPath = location.pathname;

  return (
    <div className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between h-14">
        {/* Left: Official Logo + Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 text-xs no-scrollbar">
          {/* Official Brand Logo */}
          <Link
            to="/"
            onClick={() => onSelectTab('website')}
            title={lang === 'kn' ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ - ಮುಖಪುಟ' : 'Sandhya Enterprises - Home'}
            className="flex items-center gap-2 shrink-0 group focus:outline-none transition-transform active:scale-95 text-left"
          >
            <OfficialLogoBadge
              size={36}
              className="transition-all group-hover:ring-2 group-hover:ring-amber-400/50 rounded-full"
            />
            <div className="hidden md:flex flex-col text-left leading-tight pr-1">
              <span className="font-black text-[11px] sm:text-[12px] tracking-tight uppercase text-white group-hover:text-amber-300 transition-colors">
                Sandhya
              </span>
              <span className="text-[8px] sm:text-[9px] font-extrabold text-amber-400 tracking-wider">
                LPG AGENCY
              </span>
            </div>
          </Link>

          <div className="h-5 w-px bg-slate-800 hidden sm:block shrink-0" />

          {/* Main Website / Return Action */}
          <Link
            to="/"
            id="nav-btn-website"
            onClick={() => onSelectTab('website')}
            className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 shadow-xs ring-1 ring-orange-400/40"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಮುಖ್ಯ ವೆಬ್‌ಸೈಟ್' : '← Main Website'}</span>
          </Link>

          {/* Cylinder Booking */}
          <Link
            to="/booking"
            className={`px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              currentPath === '/booking'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'kn' ? 'ಬುಕಿಂಗ್' : 'Booking'}</span>
          </Link>

          {/* Track Order */}
          <Link
            to="/track-order"
            className={`px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              currentPath === '/track-order'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'kn' ? 'ಟ್ರ್ಯಾಕಿಂಗ್' : 'Track Order'}</span>
          </Link>

          {/* Customer Portal (Private Account Gate) */}
          <Link
            to="/customer"
            onClick={() => onSelectTab('customer')}
            className={`px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'customer' || currentPath === '/customer'
                ? 'bg-orange-600 text-white shadow-xs ring-1 ring-orange-400/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Lock className={`w-3.5 h-3.5 ${currentCustomer || authSession?.role === 'customer' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>
              {lang === 'kn' ? 'ಗ್ರಾಹಕರ ಪೋರ್ಟಲ್' : 'Customer Portal'}
            </span>
            {(currentCustomer || authSession?.role === 'customer') && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </Link>

          {/* Distributor Desk (Private Staff Gate) */}
          <Link
            to="/distributor"
            onClick={() => onSelectTab('distributor')}
            className={`px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'distributor' || currentPath === '/distributor'
                ? 'bg-blue-600 text-white shadow-xs ring-1 ring-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Truck className={`w-3.5 h-3.5 ${isDistributorAuth ? 'text-emerald-400' : 'text-blue-400'}`} />
            <span>
              {lang === 'kn' ? 'ವಿತರಕರ ಡೆಸ್ಕ್' : 'Distributor Desk'}
            </span>
            {isDistributorAuth && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </Link>

          {/* Admin Command Center (Private Management Gate) */}
          <Link
            to="/admin"
            onClick={() => onSelectTab('admin')}
            className={`px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'admin' || currentPath === '/admin'
                ? 'bg-purple-600 text-white shadow-xs ring-1 ring-purple-400/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Shield className={`w-3.5 h-3.5 ${isAdminAuth ? 'text-emerald-400' : 'text-purple-400'}`} />
            <span>
              {lang === 'kn' ? 'ಅಡ್ಮಿನ್' : 'Admin'}
            </span>
            {isAdminAuth && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </Link>

          {/* Gmail Communications Desk */}
          <Link
            to="/gmail"
            onClick={() => onSelectTab('gmail')}
            className={`px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'gmail' || currentPath === '/gmail'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-red-400" />
            <span>
              {lang === 'kn' ? 'ಜಿಮೇಲ್' : 'Mail'}
            </span>
          </Link>
        </div>

        {/* Right Info: Authenticated User Status or Security Policy */}
        <div className="flex items-center gap-2 text-xs shrink-0">
          {authSession ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">
                {authSession.role}
              </span>
              <span className="hidden md:inline text-[10px] text-slate-400 truncate max-w-[140px]">
                {authSession.displayName || authSession.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign Out Session"
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-red-400 transition cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-slate-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider text-slate-300">
                {lang === 'kn' ? '🔒 ಅಧಿಕೃತ RBAC ಎನ್‌ಕ್ರಿಪ್ಶನ್' : '🔒 Verified Portals'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
