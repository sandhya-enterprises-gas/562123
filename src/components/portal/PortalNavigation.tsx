import React, { useState, useEffect } from 'react';
import { Globe, User, Truck, Shield, Lock, Unlock, LogOut, CheckCircle2, Mail, Key } from 'lucide-react';
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

  return (
    <div className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between h-14">
        {/* Left: Official Logo + Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 text-xs no-scrollbar">
          {/* Official Brand Mini-Seal */}
          <div className="hidden sm:flex items-center mr-1">
            <OfficialLogoBadge size={32} />
          </div>

          {/* Main Website / Public Information */}
          <button
            type="button"
            onClick={() => onSelectTab('website')}
            className={`px-3 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'website'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಮುಖ್ಯ ವೆಬ್‌ಸೈಟ್' : 'Public Portal'}</span>
          </button>

          {/* Customer Portal (Private Account Gate) */}
          <button
            type="button"
            onClick={() => onSelectTab('customer')}
            className={`px-3 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'customer'
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
          </button>

          {/* Distributor Desk (Private Staff Gate) */}
          <button
            type="button"
            onClick={() => onSelectTab('distributor')}
            className={`px-3 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'distributor'
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
          </button>

          {/* Admin Command Center (Private Management Gate) */}
          <button
            type="button"
            onClick={() => onSelectTab('admin')}
            className={`px-3 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'admin'
                ? 'bg-purple-600 text-white shadow-xs ring-1 ring-purple-400/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Shield className={`w-3.5 h-3.5 ${isAdminAuth ? 'text-emerald-400' : 'text-purple-400'}`} />
            <span>
              {lang === 'kn' ? 'ಅಡ್ಮಿನ್ ಪ್ಯಾನೆಲ್' : 'Admin Command'}
            </span>
            {isAdminAuth && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </button>

          {/* Gmail Communications Desk */}
          <button
            type="button"
            onClick={() => onSelectTab('gmail')}
            className={`px-3 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'gmail'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-red-400" />
            <span>
              {lang === 'kn' ? 'ಜಿಮೇಲ್ ಡೆಸ್ಕ್' : 'Official Mail'}
            </span>
          </button>
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
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-red-400 transition"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-slate-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider text-slate-300">
                {lang === 'kn' ? '🔒 ಅಧಿಕೃತ RBAC ಎನ್‌ಕ್ರಿಪ್ಶನ್' : '🔒 Official Role-Based Portals'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
