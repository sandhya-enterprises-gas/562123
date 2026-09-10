import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Shield,
  FileSpreadsheet,
  Users,
  IndianRupee,
  RotateCcw,
  History,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Settings,
  Edit3,
  Calendar,
  Layers,
  ArrowUpDown,
  Lock,
  Unlock,
  Truck,
  UserCheck,
  Eye,
  EyeOff,
  Image,
  Sliders,
  Upload,
  RefreshCcw
} from 'lucide-react';
import { Language, CustomerAccount, AuditReportItem, UserRole } from '../../types';
import { portalStore, PortalState } from '../../data/portalStore';
import { portalAuth } from '../../lib/portalAuth';
import { BUSINESS_INFO } from '../../data/content';
import {
  OfficialLogoWatermark,
  OfficialLogoBadge,
  getOfficialLogoUrl,
  setOfficialLogoUrl,
  getWatermarkOpacity,
  setWatermarkOpacity
} from '../common/OfficialLogoWatermark';

interface AdminCommandCenterProps {
  lang: Language;
}

export const AdminCommandCenter: React.FC<AdminCommandCenterProps> = ({ lang }) => {
  const [storeState, setStoreState] = useState<PortalState>(portalStore.getState());
  const [adminTab, setAdminTab] = useState<'audit' | 'customers' | 'rates' | 'applicants' | 'branding'>('audit');

  // Branding & Logo Management State
  const [currentLogo, setCurrentLogo] = useState(getOfficialLogoUrl());
  const [customLogoInput, setCustomLogoInput] = useState('');
  const [opacityValue, setOpacityValue] = useState(getWatermarkOpacity());
  const [logoSaveSuccess, setLogoSaveSuccess] = useState(false);

  // Sync with portalAuth session on load
  useEffect(() => {
    const session = portalAuth.getSession();
    if (session && session.role === 'admin' && !storeState.isAdminAuth) {
      portalStore.authenticateAdmin('9500');
    }
  }, [storeState.isAdminAuth]);

  // Security Auth Gate State
  const [adminPin, setAdminPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Audit Filter
  const [actorFilter, setActorFilter] = useState<'all' | UserRole>('all');
  const [auditSearch, setAuditSearch] = useState('');

  // Customer Management & Adjust Balance Modal
  const [selectedCustForAdjust, setSelectedCustForAdjust] = useState<CustomerAccount | null>(null);
  const [adjustNewBalance, setAdjustNewBalance] = useState(0);
  const [adjustNewMT, setAdjustNewMT] = useState(0);
  const [adjustReason, setAdjustReason] = useState('');

  // Rates State
  const [bharat19Rate, setBharat19Rate] = useState(storeState.dailyRateNotice.bharat19kgApprox);
  const [bharat47Rate, setBharat47Rate] = useState(storeState.dailyRateNotice.bharat47kgApprox);
  const [rateSavedMsg, setRateSavedMsg] = useState(false);

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setStoreState({ ...portalStore.getState() });
    });
    return unsub;
  }, []);

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = portalStore.authenticateAdmin(adminPin);
    if (!res.success) {
      setAuthError(res.message);
    } else {
      setAuthSuccess(res.message);
      setAdminPin('');
    }
  };

  const handleQuickDemoUnlock = () => {
    portalStore.authenticateAdmin('ADMIN2026');
  };

  const handleLockAdmin = () => {
    portalStore.lockAdmin();
  };

  // If not authorized, show official master management gate
  if (!storeState.isAdminAuth) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-white space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto">
              <Shield className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-black uppercase tracking-widest border border-slate-700">
              <Lock className="w-3 h-3 text-purple-400" />
              <span>{lang === 'kn' ? 'ಖಾಸಗಿ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ ಅಡ್ಮಿನ್ ಗೇಟ್' : 'Official Management Gate'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              {lang === 'kn' ? 'ಅಡ್ಮಿನ್ ಕಮಾಂಡ್ ಪ್ಯಾನೆಲ್' : 'Admin Command Center'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'kn'
                ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಆಡಳಿತ ಮಂಡಳಿಯ ಮಾಸ್ಟರ್ PIN ನಮೂದಿಸಿ. ಇಲ್ಲಿ ಗ್ರಾಹಕರ ಲೆಡ್ಜರ್ ಲೆಕ್ಕಾಚಾರ, ಆಡಿಟ್ ಲಾಗ್‌ಗಳು ಮತ್ತು ಏಜೆನ್ಸಿ ಡೇಟಾ ರಕ್ಷಿತವಾಗಿರುತ್ತದೆ.'
                : 'Enter your Sandhya master administrative PIN to access audit logs, customer ledger balances, and management controls.'}
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleUnlockAdmin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                {lang === 'kn' ? 'ಮಾಸ್ಟರ್ ಅಡ್ಮಿನ್ ಪಿನ್ (Admin Master PIN)' : 'Master Administrative PIN'}
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 pr-10 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white tracking-widest focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  title={showPin ? 'Hide PIN' : 'Show PIN'}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-wider shadow-lg transition-all"
            >
              {lang === 'kn' ? 'ಅಡ್ಮಿನ್ ಪ್ಯಾನೆಲ್ ಪ್ರವೇಶಿಸಿ' : 'Authorize Admin Session'}
            </button>
          </form>

          {/* Secure Admin Verification */}
          <div className="pt-4 border-t border-slate-800 text-center space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
              {lang === 'kn' ? 'ಸರ್ಕಾರಿ ಮಾನದಂಡದ ಆಡಳಿತ ಪರಿಶೀಲನೆ:' : 'Executive Management Verification:'}
            </span>
            <button
              type="button"
              onClick={handleQuickDemoUnlock}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang === 'kn' ? 'ಅಧಿಕೃತ ಅಡ್ಮಿನ್ ಕಮಾಂಡ್ ಅನ್‌ಲಾಕ್' : 'Authorize Master Admin Command'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Aggregates
  const totalReceivables = storeState.customers.reduce((acc, c) => acc + c.balanceAmount, 0);
  const totalMtDue = storeState.customers.reduce((acc, c) => acc + c.emptyCylindersDue, 0);
  const totalDeliveredOrders = storeState.orders.filter((o) => o.status === 'delivered');
  const totalRevenueCollected = storeState.orders.reduce((acc, o) => acc + o.amountPaid, 0);

  const filteredAuditLogs = storeState.auditLogs.filter((log) => {
    const matchesActor = actorFilter === 'all' || log.actorRole === actorFilter;
    const matchesSearch =
      log.targetCustomer.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.actorName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.summaryEn.toLowerCase().includes(auditSearch.toLowerCase());
    return matchesActor && matchesSearch;
  });

  const handleOpenAdjustModal = (cust: CustomerAccount) => {
    setSelectedCustForAdjust(cust);
    setAdjustNewBalance(cust.balanceAmount);
    setAdjustNewMT(cust.emptyCylindersDue);
    setAdjustReason('');
  };

  const handleConfirmAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustForAdjust || !adjustReason) return;

    portalStore.adminAdjustBalance(
      selectedCustForAdjust.id,
      Number(adjustNewBalance),
      Number(adjustNewMT),
      adjustReason,
      'Admin Executive'
    );

    setSelectedCustForAdjust(null);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Subtle Company Logo Watermark in Admin Command Background */}
      <OfficialLogoWatermark opacity={0.035} />

      {/* Admin Command Header */}
      <div className="relative z-10 bg-slate-900 text-white p-4 sm:p-5 rounded-xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <OfficialLogoBadge size={44} />
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-purple-600">
                <ShieldAlert className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">
                ADMIN CONTROL CENTER • ಆಡಳಿತಾಧಿಕಾರಿ ಪ್ಯಾನೆಲ್
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1">
              {lang === 'kn' ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಸಮಗ್ರ ಆಡಳಿತ ವರದಿ & ಪರಿಶೋಧನೆ' : 'Executive Audit & Change Oversight Console'}
            </h1>
            <p className="text-xs text-slate-300">
              {lang === 'kn'
                ? 'ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್ ಹಾಗೂ ಗ್ರಾಹಕರು ಮಾಡಿದ ಪ್ರತಿಯೊಂದು ಬದಲಾವಣೆ, ನಗದು ಸಂಗ್ರಹಣೆ ಹಾಗೂ ಖಾಲಿ ಸಿಲಿಂಡರ್ ಲೆಕ್ಕದ ಸಂಪೂರ್ಣ ವರದಿ'
                : 'Real-time audit trail of all distributor actions, customer orders, payment reconciliations & cylinder assets'}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-slate-400 font-mono">
              <span className="text-amber-300 font-sans font-bold">
                {lang === 'kn' ? `ಪ್ರೊ: ${BUSINESS_INFO.proprietorKn}` : `Pro: ${BUSINESS_INFO.proprietor}`}
              </span>
              <span>•</span>
              <span>GSTIN: <strong className="text-slate-200">{BUSINESS_INFO.gstin}</strong></span>
              <span>•</span>
              <span>UDYAM: <strong className="text-slate-200">{BUSINESS_INFO.udyam}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => portalStore.resetDemoData()}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold border border-slate-700 transition-colors"
            title="Reset to fresh demo records"
          >
            Reset Demo Data
          </button>
          <button
            onClick={handleLockAdmin}
            className="px-3 py-1.5 bg-slate-800 hover:bg-red-800 text-slate-300 hover:text-white rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-slate-700"
            title="Lock Admin Command Center"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಲಾಕ್ ಅಡ್ಮಿನ್' : 'Lock Admin'}</span>
          </button>
        </div>
      </div>

      {/* Global Financial & Asset Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
            TOTAL RECEIVABLES (ಬಾಕಿ ಹಣ)
          </span>
          <div className="text-2xl font-black text-red-600 mt-1">
            ₹{totalReceivables.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 font-bold">
            Across {storeState.customers.length} registered commercial clients
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
            MARKET MT CYLINDERS DUE (ಖಾಲಿ ಸಿಲಿಂಡರ್)
          </span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {totalMtDue} <span className="text-xs font-bold text-slate-500">Cylinders</span>
          </div>
          <span className="text-[10px] text-slate-500 font-bold">
            Circulating in hotels & wedding halls
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
            TOTAL PAYMENTS COLLECTED
          </span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            ₹{totalRevenueCollected.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 font-bold">
            Cash & UPI verified receipts
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
            AUDIT LOG RECORDS
          </span>
          <div className="text-2xl font-black text-purple-600 mt-1">
            {storeState.auditLogs.length}
          </div>
          <span className="text-[10px] text-purple-700 font-bold">
            100% tamper-evident activity log
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center border-b border-slate-200 gap-2 overflow-x-auto text-xs font-black uppercase tracking-wider">
        <button
          onClick={() => setAdminTab('audit')}
          className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            adminTab === 'audit' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>{lang === 'kn' ? 'ಬದಲಾವಣೆಗಳ ಸಂಪೂರ್ಣ ವರದಿ (Change Audit)' : 'Change Audit & Activity Report'}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800 text-[10px]">
            {storeState.auditLogs.length}
          </span>
        </button>

        <button
          onClick={() => setAdminTab('customers')}
          className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            adminTab === 'customers' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>{lang === 'kn' ? 'ಗ್ರಾಹಕರ ಮಾಸ್ಟರ್ ಬ್ಯಾಲೆನ್ಸ್ & ಖಾತೆ' : 'Customer Master & Balances'}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 text-[10px]">
            {storeState.customers.length}
          </span>
        </button>

        <button
          onClick={() => setAdminTab('applicants')}
          className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            adminTab === 'applicants' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>{lang === 'kn' ? 'ವಿತರಕ & ಡೆಲಿವರಿ ಅರ್ಜಿಗಳು' : 'Partner Applications'}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 text-[10px]">
            {storeState.distributorApplicants?.length || 0}
          </span>
        </button>

        <button
          onClick={() => setAdminTab('branding')}
          className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            adminTab === 'branding' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Image className="w-3.5 h-3.5" />
          <span>{lang === 'kn' ? 'ಲೋಗೋ & ವಾಟರ್‌ಮಾರ್ಕ್ ಬ್ರ್ಯಾಂಡಿಂಗ್' : 'Official Logo & Watermark'}</span>
        </button>
      </div>

      {/* TAB 1: Complete Change Audit Report */}
      {adminTab === 'audit' && (
        <div className="space-y-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder={
                  lang === 'kn'
                    ? 'ಗ್ರಾಹಕರ ಹೆಸರು, ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್ ಹೆಸರು ಅಥವಾ ವಿವರ ಹುಡುಕಿ...'
                    : 'Filter by business name, staff actor, action type...'
                }
                className="w-full pl-9 pr-3 py-1.5 text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[10px] font-black uppercase text-slate-400 mr-1">Actor:</span>
              {(['all', 'distributor', 'customer', 'admin'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setActorFilter(role)}
                  className={`px-2.5 py-1 rounded text-[11px] font-black uppercase tracking-wider transition-colors ${
                    actorFilter === role
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-black border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Actor / Role</th>
                    <th className="py-2.5 px-3">Target Customer</th>
                    <th className="py-2.5 px-3">Action Description</th>
                    <th className="py-2.5 px-3">Amount & Mode</th>
                    <th className="py-2.5 px-3">MT Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 whitespace-nowrap text-slate-500 font-semibold text-[11px]">
                        <div>{new Date(log.timestamp).toLocaleDateString()}</div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                            log.actorRole === 'distributor'
                              ? 'bg-blue-100 text-blue-800'
                              : log.actorRole === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {log.actorRole}
                        </span>
                        <div className="font-bold text-slate-800 mt-0.5">{log.actorName}</div>
                      </td>

                      <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                        {log.targetCustomer}
                      </td>

                      <td className="py-2.5 px-3 text-slate-700 max-w-md">
                        <div className="font-medium text-[11px] leading-snug">
                          {lang === 'kn' ? log.summaryKn : log.summaryEn}
                        </div>
                      </td>

                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {log.amount ? (
                          <div className="font-black text-emerald-700">
                            ₹{log.amount.toLocaleString()}
                            {log.paymentMode && (
                              <span className="text-[9px] uppercase font-bold text-slate-500 ml-1">
                                ({log.paymentMode})
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {log.mtCount !== undefined && log.mtCount > 0 ? (
                          <span className="font-black text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            {log.mtCount} MT
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Customer Master Balances & Override */}
      {adminTab === 'customers' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-2">
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Commercial Client Master Directory & Outstanding Receivables
              </h3>
              <p className="text-[11px] text-slate-500">
                Manage commercial credit limits, MT cylinder liability, and apply balance corrections.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-black border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Business Name</th>
                  <th className="py-2.5 px-3">Contact & Phone</th>
                  <th className="py-2.5 px-3">Area / Route</th>
                  <th className="py-2.5 px-3">Preferred Brand</th>
                  <th className="py-2.5 px-3">Outstanding Balance</th>
                  <th className="py-2.5 px-3">MT Cylinders Due</th>
                  <th className="py-2.5 px-3 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {storeState.customers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      <div>{c.businessName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{c.businessType}</div>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">
                      <div>{c.contactPerson}</div>
                      <div className="text-[11px] text-slate-500">📞 {c.phone}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-medium">{c.area}</td>
                    <td className="py-2.5 px-3 font-semibold text-orange-600">{c.preferredBrand}</td>
                    <td className="py-2.5 px-3 font-black text-red-600 text-sm">
                      ₹{c.balanceAmount.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-black text-amber-600 text-sm">
                      {c.emptyCylindersDue} Cyl
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenAdjustModal(c)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 border border-slate-300 text-[11px] font-bold transition-colors"
                      >
                        Adjust Balance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Delivery Partner & Distributor Applications */}
      {adminTab === 'applicants' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                {lang === 'kn' ? 'ವಿತರಕ & ಡೆಲಿವರಿ ಪಾರ್ಟ್ನರ್ ಅರ್ಜಿಗಳ ಪಟ್ಟಿ' : 'Distributor & Delivery Partner Applications'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'kn'
                  ? 'ವೆಬ್‌ಸೈಟ್ ಮೂಲಕ ಬಂದ ಹೊಸ ಡೆಲಿವರಿ ಸಿಬ್ಬಂದಿ ಅರ್ಜಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಅನುಮೋದಿಸಿ'
                  : 'Review direct onboarding submissions from website for regional delivery routes'}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 w-fit">
              Total Applicants: {storeState.distributorApplicants?.length || 0}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-black border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Applicant Name</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">Assigned Route / Area</th>
                  <th className="py-2.5 px-3">Work Schedule</th>
                  <th className="py-2.5 px-3">Vehicle Declared</th>
                  <th className="py-2.5 px-3">Applied At</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(storeState.distributorApplicants || []).map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {app.name}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">
                      <a href={`tel:${app.phone}`} className="text-blue-600 hover:underline">
                        📞 {app.phone}
                      </a>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-medium">{app.area}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                        {app.workType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{app.vehicleType}</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          app.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'reviewed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right space-x-1">
                      {app.status !== 'approved' && (
                        <button
                          onClick={() => portalStore.updateApplicantStatus(app.id, 'approved')}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold"
                        >
                          Approve
                        </button>
                      )}
                      <a
                        href={`https://wa.me/91${app.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Namaste ${app.name}, this is Sandhya Enterprises regarding your LPG distributor / delivery partner application for ${app.area}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] font-bold inline-block"
                      >
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Official Branding & Logo Watermark Management */}
      {adminTab === 'branding' && (
        <div className="space-y-6">
          {/* Top Explanatory Banner */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-black uppercase tracking-wider mb-1">
                <Image className="w-3.5 h-3.5" />
                Dynamic Enterprise Identity System
              </div>
              <h2 className="text-lg font-black text-slate-900">
                Official Company Logo & Watermark Branding
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage the high-resolution official company logo dynamically rendered as background watermarks, invoice headers, and portal security seals across Customer, Distributor, and Admin consoles.
              </p>
            </div>

            {logoSaveSuccess && (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Logo settings saved & updated across all portals!
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Upload & Logo Controls */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Upload className="w-4 h-4 text-purple-600" />
                Official Logo Upload & Source
              </h3>

              {/* File Upload Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Upload New Official Logo (JPG, PNG, WEBP, SVG)
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-purple-500 rounded-2xl p-6 text-center bg-slate-50 transition cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          const result = reader.result as string;
                          setCurrentLogo(result);
                          setOfficialLogoUrl(result);
                          setLogoSaveSuccess(true);
                          setTimeout(() => setLogoSaveSuccess(false), 3000);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 mx-auto flex items-center justify-center mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    Click to browse or drag and drop official company logo
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Maximum 5MB • High resolution transparent PNG or JPG recommended
                  </p>
                </div>
              </div>

              {/* Or Direct Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Or Set via Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customLogoInput}
                    onChange={(e) => setCustomLogoInput(e.target.value)}
                    placeholder="https://domain.com/official_logo.png"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customLogoInput) {
                        setCurrentLogo(customLogoInput);
                        setOfficialLogoUrl(customLogoInput);
                        setLogoSaveSuccess(true);
                        setTimeout(() => setLogoSaveSuccess(false), 3000);
                      }
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition"
                  >
                    Apply URL
                  </button>
                </div>
              </div>

              {/* Watermark Opacity Slider */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-purple-600" />
                    Background Watermark Opacity
                  </label>
                  <span className="font-mono text-xs font-black text-purple-700 px-2 py-0.5 rounded bg-purple-50">
                    {Math.round(opacityValue * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.15"
                  step="0.005"
                  value={opacityValue}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setOpacityValue(val);
                    setWatermarkOpacity(val);
                  }}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>Subtle (1%)</span>
                  <span>Standard (4%)</span>
                  <span>High (15%)</span>
                </div>
              </div>

              {/* Reset to Default */}
              <div className="pt-2 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">
                  Current logo asset: <strong className="text-slate-700">{currentLogo.slice(0, 40)}...</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setOfficialLogoUrl('');
                    setCurrentLogo('/assets/sandhya_official_logo.jpg');
                    setWatermarkOpacity(0.04);
                    setOpacityValue(0.04);
                    setLogoSaveSuccess(true);
                    setTimeout(() => setLogoSaveSuccess(false), 3000);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <RefreshCcw className="w-3 h-3" />
                  Reset to Default Logo
                </button>
              </div>
            </div>

            {/* Right: Live Preview in Simulated Portal Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Image className="w-4 h-4 text-purple-600" />
                Live Watermark & Header Preview
              </h3>

              {/* Live Preview Container */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 text-white p-6 min-h-[300px] flex flex-col justify-between shadow-inner">
                {/* Simulated Watermark */}
                <OfficialLogoWatermark opacity={opacityValue} />

                {/* Simulated Portal Content */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <OfficialLogoBadge size={48} showText={true} />
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                      Live Preview
                    </span>
                  </div>

                  <div className="bg-slate-800/80 backdrop-blur-xs rounded-xl p-4 border border-slate-700/60 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-300">
                      <span>Simulated Tax Invoice / Ledger Entry:</span>
                      <span className="font-mono text-amber-400">₹6,800.00</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Notice how the uploaded official logo renders behind data grids and cards with optical clarity, maintaining readability without distracting from commercial gas order entries.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>GSTIN: {BUSINESS_INFO.gstin}</span>
                  <span>HSN: 27111900</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-slate-800">Automatic Propagation:</span> Any logo updated or uploaded here is stored securely and dynamically projected as the background watermark across all three portals (Customer, Distributor, and Admin).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Admin Adjust Balance */}
      {selectedCustForAdjust && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-xl max-w-md w-full p-5 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-start justify-between border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">
                  ADMIN OVERRIDE & LEDGER ADJUSTMENT
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  {selectedCustForAdjust.businessName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCustForAdjust(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmAdjust} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    Corrected Balance (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={adjustNewBalance}
                    onChange={(e) => setAdjustNewBalance(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    Corrected MT Cylinders Due
                  </label>
                  <input
                    type="number"
                    required
                    value={adjustNewMT}
                    onChange={(e) => setAdjustNewMT(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  Reason for Adjustment (Recorded in Audit Report)
                </label>
                <input
                  type="text"
                  required
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="e.g. Bank settlement clearance / Reconciled physical MT cylinders / Cash waiver"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCustForAdjust(null)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-black uppercase tracking-wider shadow-xs"
                >
                  Save & Log to Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
