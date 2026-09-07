import React, { useState, useEffect } from 'react';
import { Globe, User, Truck, Shield, Lock, Unlock, LogOut, CheckCircle2, Mail } from 'lucide-react';
import { ActivePortalTab, Language } from '../../types';
import { portalStore, PortalState } from '../../data/portalStore';

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

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setStoreState({ ...portalStore.getState() });
    });
    return unsub;
  }, []);

  const currentCustomer = storeState.customers.find((c) => c.id === storeState.currentCustomerId) || null;
  const isDistributorAuth = storeState.isDistributorAuth;
  const isAdminAuth = storeState.isAdminAuth;

  const handleLogoutCustomer = (e: React.MouseEvent) => {
    e.stopPropagation();
    portalStore.setCurrentCustomer(null);
  };

  const handleLockDistributor = (e: React.MouseEvent) => {
    e.stopPropagation();
    portalStore.lockDistributor();
  };

  const handleLockAdmin = (e: React.MouseEvent) => {
    e.stopPropagation();
    portalStore.lockAdmin();
  };

  return (
    <div className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between h-12">
        {/* Left: Private & Official Navigation Switchers */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 text-xs no-scrollbar">
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
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Lock className={`w-3.5 h-3.5 ${currentCustomer ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>
              {lang === 'kn' ? 'ಗ್ರಾಹಕರ ಪೋರ್ಟಲ್ (ಖಾಸಗಿ)' : 'Customer Portal (Private)'}
            </span>
            {currentCustomer && (
              <span className="flex items-center gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span
                  onClick={handleLogoutCustomer}
                  title="Lock Session / Logout"
                  className="p-0.5 rounded hover:bg-red-800/80 text-slate-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-3 h-3 text-red-300" />
                </span>
              </span>
            )}
          </button>

          {/* Distributor Desk (Private Staff Gate) */}
          <button
            type="button"
            onClick={() => onSelectTab('distributor')}
            className={`px-3 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'distributor'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Truck className={`w-3.5 h-3.5 ${isDistributorAuth ? 'text-emerald-400' : 'text-blue-400'}`} />
            <span>
              {lang === 'kn' ? 'ವಿತರಕರ ಡೆಸ್ಕ್ (ಖಾಸಗಿ)' : 'Distributor Desk (Private)'}
            </span>
            {isDistributorAuth && (
              <span className="flex items-center gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span
                  onClick={handleLockDistributor}
                  title="Lock Distributor Desk"
                  className="p-0.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-3 h-3 text-slate-300" />
                </span>
              </span>
            )}
          </button>

          {/* Admin Command Center (Private Management Gate) */}
          <button
            type="button"
            onClick={() => onSelectTab('admin')}
            className={`px-3 py-1.5 rounded-lg font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'admin'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Shield className={`w-3.5 h-3.5 ${isAdminAuth ? 'text-emerald-400' : 'text-purple-400'}`} />
            <span>
              {lang === 'kn' ? 'ಅಡ್ಮಿನ್ ಪ್ಯಾನೆಲ್ (ಆಫಿಷಿಯಲ್)' : 'Admin Panel (Official)'}
            </span>
            {isAdminAuth && (
              <span className="flex items-center gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span
                  onClick={handleLockAdmin}
                  title="Lock Admin Panel"
                  className="p-0.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-3 h-3 text-slate-300" />
                </span>
              </span>
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
              {lang === 'kn' ? 'ಜಿಮೇಲ್ ಡೆಸ್ಕ್ (Gmail Desk)' : 'Gmail Desk (Official)'}
            </span>
          </button>
        </div>

        {/* Right Info: Confidentiality & Official Verification Seal */}
        <div className="hidden lg:flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-slate-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-slate-300">
              {lang === 'kn' ? '🔒 ಅಧಿಕೃತ & ಗೌಪ್ಯ ಡೇಟಾ • 256-Bit SSL' : '🔒 Official & Confidential Data • 256-Bit SSL'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
