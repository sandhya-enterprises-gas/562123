import React, { useState, useEffect } from 'react';
import {
  Flame,
  Zap,
  RotateCcw,
  IndianRupee,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  AlertTriangle,
  UserPlus,
  LogIn,
  KeyRound,
  LogOut,
  Send,
  Building2,
  Phone,
  MapPin,
  Shield,
  ShieldAlert,
  PhoneCall,
  Eye,
  EyeOff,
  Lock,
  Printer,
  FileSpreadsheet,
  ExternalLink
} from 'lucide-react';
import { Language, CustomerAccount, OrderRecord, LedgerEntry } from '../../types';
import { portalStore, PortalState } from '../../data/portalStore';
import { portalAuth } from '../../lib/portalAuth';
import { BUSINESS_INFO, SAFETY_GUIDELINES } from '../../data/content';
import { OfficialLogoWatermark, OfficialLogoBadge } from '../common/OfficialLogoWatermark';
import { ThermalLedgerReceipt } from './ThermalLedgerReceipt';

interface CustomerPortalProps {
  lang: Language;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({ lang }) => {
  const [storeState, setStoreState] = useState<PortalState>(portalStore.getState());
  // Default to appsheet: Opens AppSheet Gas Booking Form directly upon login
  const [activeTab, setActiveTab] = useState<'appsheet' | 'dashboard' | 'reorder' | 'ledger' | 'safety'>('appsheet');
  const [showThermalReceipt, setShowThermalReceipt] = useState(false);

  // Sync with portalAuth session on load
  useEffect(() => {
    const session = portalAuth.getSession();
    if (session && session.role === 'customer' && !storeState.currentCustomerId) {
      const match = storeState.customers.find(
        (c) => c.email === session.email || c.phone === session.phone || c.id === session.uid
      );
      if (match) {
        portalStore.setCurrentCustomer(match.id);
      } else if (storeState.customers.length > 0) {
        portalStore.setCurrentCustomer(storeState.customers[0].id);
      }
    }
  }, [storeState.currentCustomerId, storeState.customers]);

  // Auth Forms State
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Register Form State
  const [regBusinessName, setRegBusinessName] = useState('');
  const [regContactPerson, setRegContactPerson] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regBusinessType, setRegBusinessType] = useState<CustomerAccount['businessType']>('Restaurant / Hotel');
  const [regArea, setRegArea] = useState('Nelamangala Town (562123)');
  const [regPincode, setRegPincode] = useState('562123');
  const [regPreferredBrand, setRegPreferredBrand] = useState<CustomerAccount['preferredBrand']>('Bharat Gas 19kg');
  const [regPassword, setRegPassword] = useState('');

  // Forgot Password State
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');

  // 1-Click / Custom Order State
  const [orderBrand, setOrderBrand] = useState('Bharat Gas');
  const [orderType, setOrderType] = useState('19kg Commercial VOT');
  const [orderQty, setOrderQty] = useState(2);
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSuccessMsg, setOrderSuccessMsg] = useState('');

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setStoreState({ ...portalStore.getState() });
    });
    return unsub;
  }, []);

  const currentCustomer = storeState.customers.find((c) => c.id === storeState.currentCustomerId) || null;
  const customerOrders = storeState.orders.filter((o) => o.customerId === currentCustomer?.id);
  const customerLedgers = storeState.ledgers.filter((l) => l.customerId === currentCustomer?.id);

  // Handlers
  const handleGoogleSignIn = async () => {
    setAuthError('');
    setAuthSuccess('');
    try {
      const session = await portalAuth.loginWithGoogle('customer');
      setAuthSuccess(`Welcome, ${session.displayName}! Authenticated via Google.`);
      setActiveTab('appsheet');
    } catch (err: any) {
      setAuthError(err.message || 'Google Sign-In was cancelled or failed.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const res = portalStore.loginCustomer(loginPhone, loginPassword);
    if (!res.success) {
      setAuthError(res.message);
    } else {
      setAuthSuccess(res.message);
      setActiveTab('dashboard');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regBusinessName || !regContactPerson || !regPhone || !regPassword) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    try {
      portalStore.registerCustomer({
        businessName: regBusinessName,
        contactPerson: regContactPerson,
        phone: regPhone,
        email: regEmail,
        businessType: regBusinessType,
        area: regArea,
        pincode: regPincode,
        preferredBrand: regPreferredBrand,
        password: regPassword
      });
      setAuthSuccess('Account registered successfully! Welcome to Sandhya Enterprises.');
      setAuthMode('login');
      setActiveTab('dashboard');
    } catch {
      setAuthError('Registration failed. Please try again.');
    }
  };

  const handleForgotPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPhone || !forgotNewPass) {
      setAuthError('Please enter phone and new password.');
      return;
    }
    const ok = portalStore.resetPassword(forgotPhone, forgotNewPass);
    if (ok) {
      setAuthSuccess('Password updated successfully! You can now log in.');
      setAuthMode('login');
      setLoginPhone(forgotPhone);
      setLoginPassword(forgotNewPass);
    } else {
      setAuthError('No customer account found with this phone number.');
    }
  };

  const handleQuickOneClickOrder = () => {
    if (!currentCustomer) return;
    setOrderSuccessMsg('');

    const brand = currentCustomer.preferredBrand.includes('47.5') ? 'Bharat Gas' : 'Bharat Gas';
    const type = currentCustomer.preferredBrand;
    const qty = 2; // Default quick quota

    portalStore.placeOrder(currentCustomer.id, {
      cylinderBrand: brand,
      cylinderType: type,
      quantity: qty,
      notes: '⚡ 1-Click Instant Express Reorder from Customer Portal',
      isOneClick: true
    });

    setOrderSuccessMsg(
      lang === 'kn'
        ? `⚡ 1-ಕ್ಲಿಕ್ ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿದೆ! 2x ${type} ಗಾಗಿ ನಮ್ಮ ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್ ಡಿಪೋಗೆ ನೋಟಿಫಿಕೇಶನ್ ತಲುಪಿದೆ.`
        : `⚡ 1-Click Reorder Sent! 2x ${type} requested. Sandhya Dispatch Team notified.`
    );
  };

  const handleCustomOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCustomer) return;
    setOrderSuccessMsg('');

    portalStore.placeOrder(currentCustomer.id, {
      cylinderBrand: orderBrand,
      cylinderType: orderType,
      quantity: Number(orderQty),
      notes: orderNotes
    });

    setOrderSuccessMsg(
      lang === 'kn'
        ? `ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ! ${orderQty}x ${orderBrand} (${orderType}) ಗಾಗಿ ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್ ನೋಟಿಫಿಕೇಶನ್ ಕಳುಹಿಸಲಾಗಿದೆ.`
        : `Order Placed! Requested ${orderQty}x ${orderBrand} (${orderType}). Notification sent to Distributor Desk.`
    );
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    portalStore.setCurrentCustomer(null);
    setAuthMode('login');
  };

  const handleFastSwitch = (custId: string) => {
    portalStore.setCurrentCustomer(custId);
    setAuthSuccess('');
    setAuthError('');
  };

  return (
    <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Subtle Company Logo Watermark in Customer Portal Background */}
      <OfficialLogoWatermark opacity={0.035} />

      {/* Customer Portal Brand Header */}
      <div className="relative z-10 bg-slate-900 text-white p-4 sm:p-5 rounded-xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <OfficialLogoBadge size={44} />
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-orange-600">
                <Flame className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                {currentCustomer ? 'VERIFIED CUSTOMER ACCOUNT' : 'COMMERCIAL CUSTOMER ACCESS'} • ಖಾಸಗಿ ಪೋರ್ಟಲ್
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1">
              {currentCustomer ? currentCustomer.businessName : (lang === 'kn' ? 'ಗ್ರಾಹಕರ ಅಧಿಕೃತ ಖಾತೆ ಪ್ರವೇಶ' : 'Commercial Customer Login & Registration')}
            </h1>
            <p className="text-xs text-slate-300">
              {currentCustomer
                ? `${currentCustomer.area} (PIN: ${currentCustomer.pincode}) • Preferred: ${currentCustomer.preferredBrand} • Contact: ${currentCustomer.contactPerson} (${currentCustomer.phone})`
                : (lang === 'kn'
                  ? '1-ಕ್ಲಿಕ್ ಸಿಲಿಂಡರ್ ಆರ್ಡರ್, ಬಾಕಿ ಹಣದ ಲೆಕ್ಕ (Balance), ಖಾಲಿ ಸಿಲಿಂಡರ್ (MT) ಲೆಡ್ಜರ್ ಮತ್ತು ಪಾವತಿ ವಿವರ'
                  : '1-Click Cylinder Request, Balance Outstanding, MT Empty Returns & Cash/Online Payment Ledger')}
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

        {/* Right Action: Logout if logged in, or Security Seal if logged out */}
        {currentCustomer ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:block text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Account Status</div>
              <div className="text-xs font-black text-emerald-400">Active & Verified</div>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-800 text-slate-300 hover:text-white transition-colors text-xs font-bold border border-slate-700 flex items-center gap-1.5"
              title="Lock Session / Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಲಾಕ್ / ನಿರ್ಗಮಿಸಿ' : 'Lock / Sign Out'}</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-bold text-slate-300">
              {lang === 'kn' ? '100% ಸುರಕ್ಷಿತ & ಖಾಸಗಿ ಖಾತೆ' : '100% Confidential & Secure'}
            </span>
          </div>
        )}
      </div>

      {/* If Not Logged In */}
      {!currentCustomer ? (
        <div className="max-w-lg mx-auto bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center mx-auto shadow-inner">
              <Flame className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {lang === 'kn' ? 'ಗ್ರಾಹಕರ ಗ್ಯಾಸ್ ಬುಕಿಂಗ್ ಪ್ರವೇಶ' : 'Commercial Customer Login'}
            </h2>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              {lang === 'kn'
                ? 'ಅಧಿಕೃತ AppSheet ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ ಫಾರ್ಮ್‌ಗೆ ನೇರ ಪ್ರವೇಶ ಪಡೆಯಲು ನಿಮ್ಮ Google (Gmail) ಖಾತೆಯಿಂದ ಲಾಗಿನ್ ಆಗಿ.'
                : 'Sign in with your Google (Gmail) account for direct access to the official AppSheet Gas Booking Form.'}
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* Single Prominent Google (Gmail) Login Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-4 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold shadow-xl transition-all duration-200 flex items-center justify-center gap-3.5 border-2 border-slate-200 cursor-pointer active:scale-[0.99] group"
            >
              <svg className="w-6 h-6 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div className="text-left">
                <span className="block font-black text-slate-900 text-sm sm:text-base leading-tight">
                  {lang === 'kn' ? 'Google (Gmail) ಮೂಲಕ ನೇರ ಲಾಗಿನ್ ಆಗಿ' : 'Sign in with Google / Gmail'}
                </span>
                <span className="block text-[11px] font-semibold text-slate-600 mt-0.5">
                  {lang === 'kn'
                    ? '1-ಕ್ಲಿಕ್ ಉಚಿತ ಪ್ರವೇಶ • ಯಾವುದೇ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಒಟಿಪಿ ಇಲ್ಲ'
                    : '1-Click Free Sign-In • Zero Passwords or OTPs'}
                </span>
              </div>
            </button>
          </div>

          {/* Security & Direct Sync Guarantee Highlights */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <div className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 pb-1 border-b border-slate-800">
              <Shield className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಸುರಕ್ಷತೆ & ನೇರ ಸಿಂಕ್' : 'Security & Direct Sync'}</span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'kn'
                    ? 'ಜಿಮೇಲ್ ಲಾಗಿನ್ ಆದ ತಕ್ಷಣ ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಹಂತಗಳಿಲ್ಲದೆ ನೇರವಾಗಿ AppSheet ಗ್ಯಾಸ್ ಬುಕಿಂಗ್ ಫಾರ್ಮ್ ತೆರೆದುಕೊಳ್ಳುತ್ತದೆ.'
                    : 'Directly opens the AppSheet gas booking form immediately upon Gmail login.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'kn'
                    ? 'ಬುಕಿಂಗ್ ಡೇಟಾ ನೇರವಾಗಿ ಗ್ಯಾಸ್ ಬುಕಿಂಗ್ ಅಡ್ಮಿನ್ ಖಾತೆಗೆ ಮತ್ತು ಅಧಿಕೃತ ಗೂಗಲ್ ಶೀಟ್‌ಗೆ ಸೇರುತ್ತದೆ.'
                    : 'Booking data submits directly to the Gas Booking Admin Account & Google Sheet.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Logged-In Customer Experience */
        <div className="space-y-5">
          {/* Top Metric Cards: Outstanding Balance & MT Cylinders Due */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Balance Amount Due */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  {lang === 'kn' ? 'ಪಾವತಿಸಬೇಕಾದ ಬಾಕಿ ಹಣ' : 'BALANCE AMOUNT DUE'}
                </span>
                <div className="text-2xl font-black text-red-600 flex items-center">
                  ₹{currentCustomer.balanceAmount.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {currentCustomer.balanceAmount === 0
                    ? (lang === 'kn' ? '✓ ಯಾವುದೇ ಬಾಕಿ ಇಲ್ಲ' : '✓ All accounts cleared')
                    : (lang === 'kn' ? 'ನಗದು ಅಥವಾ UPI ಮೂಲಕ ಪಾವತಿಸಿ' : 'Payable via Cash or UPI')}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-red-50 text-red-600">
                <IndianRupee className="w-6 h-6" />
              </div>
            </div>

            {/* Empty MT Cylinders Due */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  {lang === 'kn' ? 'ಮರಳಿಸಬೇಕಾದ ಖಾಲಿ (MT) ಸಿಲಿಂಡರ್' : 'EMPTY (MT) CYLINDERS DUE'}
                </span>
                <div className="text-2xl font-black text-amber-600 flex items-center">
                  {currentCustomer.emptyCylindersDue}{' '}
                  <span className="text-xs font-bold text-slate-500 ml-1.5 uppercase">
                    {lang === 'kn' ? 'ಸಿಲಿಂಡರ್‌ಗಳು' : 'Cylinders'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {lang === 'kn' ? 'ಮುಂದಿನ ಡೆಲಿವರಿಯಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುವುದು' : 'To be collected on next delivery'}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
                <RotateCcw className="w-6 h-6" />
              </div>
            </div>

            {/* Instant 1-Click Cylinder Request Button */}
            <div className="sm:col-span-2 p-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-200 animate-bounce" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-100">
                    {lang === 'kn' ? 'ತ್ವರಿತ 1-ಕ್ಲಿಕ್ ಆರ್ಡರ್' : '1-CLICK REORDER'}
                  </span>
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-white">
                  {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ತುರ್ತು ಬೇಕೆ? ಒಂದೇ ಕ್ಲಿಕ್ ಸಾಕು!' : 'Need Cylinders Right Now? 1-Click!'}
                </h3>
                <p className="text-xs text-orange-100">
                  {lang === 'kn'
                    ? `ನಿಮ್ಮ ಸಾಮಾನ್ಯ ಆರ್ಡರ್ (2x ${currentCustomer.preferredBrand}) ನೇರವಾಗಿ ನೋಟಿಫೈ ಆಗುತ್ತದೆ.`
                    : `Dispatches immediate alert to delivery vehicle for 2x ${currentCustomer.preferredBrand}.`}
                </p>
              </div>

              <button
                type="button"
                onClick={handleQuickOneClickOrder}
                className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-amber-50 text-orange-700 rounded-lg font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-orange-600" />
                <span>{lang === 'kn' ? 'ಈಗಲೇ 1-ಕ್ಲಿಕ್ ಆರ್ಡರ್ ಮಾಡಿ' : 'ORDER 2 CYLINDERS NOW'}</span>
              </button>
            </div>
          </div>

          {orderSuccessMsg && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{orderSuccessMsg}</span>
              </div>
              <button
                onClick={() => setOrderSuccessMsg('')}
                className="text-xs text-emerald-700 hover:text-emerald-900 underline font-bold"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Security & Direct Sync Guarantee Banner */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 text-emerald-200 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-white">
                    {lang === 'kn' ? 'Google ಖಾತೆಯ ಮೂಲಕ ಸುರಕ್ಷಿತವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ' : 'Authenticated via Google Account'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {lang === 'kn' ? '✓ ನೇರ ಅಡ್ಮಿನ್ ಸಿಂಕ್' : '✓ Live Sheet Sync'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {lang === 'kn'
                    ? `ಗ್ರಾಹಕರು: ${currentCustomer.contactPerson || currentCustomer.businessName} (${currentCustomer.email}) • ನಿಮ್ಮ ಬುಕಿಂಗ್ ಡೇಟಾ ನೇರವಾಗಿ ಗ್ಯಾಸ್ ಬುಕಿಂಗ್ ಅಡ್ಮಿನ್ ಖಾತೆ / ಗೂಗಲ್ ಶೀಟ್‌ಗೆ ತಲುಪುತ್ತದೆ.`
                    : `Customer: ${currentCustomer.contactPerson || currentCustomer.businessName} (${currentCustomer.email}) • All booking submissions sync directly to Gas Booking Admin Account & Google Sheet.`}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0 hidden sm:block">
              <span className="text-[10px] text-slate-400 font-mono block">GSTIN: {BUSINESS_INFO.gstin}</span>
              <span className="text-[11px] text-emerald-400 font-bold">100% Verified Weight & Safety</span>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center border-b border-slate-200 gap-2 overflow-x-auto text-xs font-black uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('appsheet')}
              className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'appsheet' ? 'border-orange-600 text-orange-600 font-black' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-orange-500" />
              <span>{lang === 'kn' ? 'ಅಧಿಕೃತ AppSheet ಬುಕಿಂಗ್ (ನೇರ)' : 'Official AppSheet Booking (Direct)'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-orange-100 text-[10px] text-orange-700 font-black">
                Online
              </span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard' ? 'border-orange-600 text-orange-600 font-black' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಸಕ್ರಿಯ ಆರ್ಡರ್‌ಗಳು' : 'Active Orders'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px] text-slate-700">
                {customerOrders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ledger')}
              className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'ledger' ? 'border-orange-600 text-orange-600 font-black' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಪಾಸ್‌ಬುಕ್ & ಲೆಡ್ಜರ್ (ಖಾತೆ)' : 'Passbook & Ledger'}</span>
            </button>

            <button
              onClick={() => setActiveTab('reorder')}
              className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'reorder' ? 'border-orange-600 text-orange-600 font-black' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಕಸ್ಟಮ್ ಆರ್ಡರ್ ಬುಕಿಂಗ್' : 'Custom Booking'}</span>
            </button>

            <button
              onClick={() => setActiveTab('safety')}
              className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'safety' ? 'border-red-600 text-red-600 font-black' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ತುರ್ತು ಸುರಕ್ಷತಾ ನಿಯಮಗಳು' : 'Safety & Emergency Guide'}</span>
              <span className="px-1.5 py-0.2 rounded bg-red-100 text-[10px] text-red-700 font-bold">
                {lang === 'kn' ? 'ನಮ್ಮ ಗ್ರಾಹಕರಿಗೆ' : 'Customer Only'}
              </span>
            </button>
          </div>

          {/* TAB 0: OFFICIAL APPSHEET GAS BOOKING FORM (DIRECT ACCESS ON LOGIN) */}
          {activeTab === 'appsheet' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {lang === 'kn' ? 'ನೇರ AppSheet ಗ್ಯಾಸ್ ಬುಕಿಂಗ್ ಫಾರ್ಮ್' : 'Direct AppSheet Gas Booking Form'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                      {lang === 'kn' ? '✓ ಅಡ್ಮಿನ್ ಶೀಟ್‌ಗೆ ನೇರ ಸಿಂಕ್' : '✓ Live Sheet Sync'}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                    {lang === 'kn' ? 'ವಾಣಿಜ್ಯ ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ ನಮೂನೆ' : 'Commercial LPG Cylinder Booking Form'}
                  </h2>
                  <p className="text-xs text-slate-300">
                    {lang === 'kn'
                      ? 'ಈ ಫಾರ್ಮ್ ಮೂಲಕ ಸಲ್ಲಿಸಲಾದ ಬುಕಿಂಗ್ ಡೇಟಾ ನೇರವಾಗಿ ಗ್ಯಾಸ್ ಬುಕಿಂಗ್ ಅಡ್ಮಿನ್ ಖಾತೆಗೆ ಮತ್ತು ಗೂಗಲ್ ಶೀಟ್‌ಗೆ ಸುರಕ್ಷಿತವಾಗಿ ದಾಖಲಾಗುತ್ತದೆ.'
                      : 'Orders submitted via this form sync immediately & securely to the Gas Booking Admin Account and Google Sheet.'}
                  </p>
                </div>

                <a
                  href="https://www.appsheet.com/start/789fbccb-644c-4975-a5ab-c345a8a4b5ac?raw=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>{lang === 'kn' ? 'ಪೂರ್ಣಸ್ಕ್ರೀನ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ' : 'Open Fullscreen'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Sandhya Enterprises Embedded AppSheet Form */}
              <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                <iframe 
                  src="https://www.appsheet.com/start/789fbccb-644c-4975-a5ab-c345a8a4b5ac?raw=true" 
                  width="100%" 
                  height="650px" 
                  style={{ border: '2px solid #ff5722', borderRadius: '8px' }} 
                  allow="geolocation"
                  title="Sandhya Enterprises Embedded AppSheet Form"
                />
              </div>
            </div>
          )}

          {/* TAB 1: Active Orders */}
          {activeTab === 'dashboard' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  {lang === 'kn' ? 'ನಿಮ್ಮ ಸಿಲಿಂಡರ್ ಆರ್ಡರ್ ಇತಿಹಾಸ' : 'Your Cylinder Delivery Requests'}
                </h3>
                <span className="text-[11px] text-slate-500 font-semibold">
                  {lang === 'kn' ? 'ಕರೆ ಮೂಲಕ ವಿಚಾರಣೆ:' : 'Dispatch Line:'} +91 {BUSINESS_INFO.phonePrimary}
                </span>
              </div>

              {customerOrders.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
                  {lang === 'kn' ? 'ಯಾವುದೇ ಹಿಂದಿನ ಆರ್ಡರ್‌ಗಳು ಇಲ್ಲ. 1-ಕ್ಲಿಕ್ ಬಟನ್ ಒತ್ತಿ ಆರ್ಡರ್ ಮಾಡಿ.' : 'No orders recorded yet. Use the 1-Click order button above.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 hover:border-orange-300 transition-colors"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-1.5">
                          {ord.isOneClick && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-orange-100 text-orange-700 border border-orange-200">
                              ⚡ 1-CLICK
                            </span>
                          )}
                          <span className="text-xs font-black text-slate-900">{ord.orderNumber}</span>
                        </div>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            ord.status === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ord.status === 'out_for_delivery'
                              ? 'bg-blue-100 text-blue-800 animate-pulse'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="flex justify-between text-slate-700 font-bold">
                          <span>{ord.quantity}x {ord.cylinderBrand}</span>
                          <span className="text-slate-900">₹{ord.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">{ord.cylinderType}</div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1 bg-slate-50 p-2 rounded-lg">
                        <div className="flex justify-between">
                          <span>{lang === 'kn' ? 'ಪಾವತಿ ಸ್ಥಿತಿ:' : 'Paid:'}</span>
                          <span className="font-bold text-slate-800">
                            ₹{ord.amountPaid.toLocaleString()} ({ord.paymentMode.toUpperCase()})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>{lang === 'kn' ? 'ಖಾಲಿ MT ಸಿಲಿಂಡರ್ ಮರಳಿಸಿದ್ದು:' : 'MT Cylinders Returned:'}</span>
                          <span className="font-bold text-slate-800">
                            {ord.emptyCylindersReturned} / {ord.quantity}
                          </span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>{new Date(ord.orderedAt).toLocaleDateString()}</span>
                          <span>{new Date(ord.orderedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Passbook & Ledger */}
          {activeTab === 'ledger' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    {lang === 'kn' ? 'ಗ್ರಾಹಕರ ಖಾತೆ & ಸಿಲಿಂಡರ್ ಪಾಸ್‌ಬುಕ್ (Ledger)' : 'Customer Account & Cylinder Ledger'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'kn'
                      ? 'ಪ್ರತಿ ದಿನದ ಡೆಲಿವರಿ, ಪಾವತಿಸಿದ ನಗದು/ಆನ್‌ಲೈನ್ ಹಣ ಹಾಗೂ ಬಾಕಿ ಖಾಲಿ ಸಿಲಿಂಡರ್‌ಗಳ ಸಂಪೂರ್ಣ ವರದಿ'
                      : 'Verified log of cylinder receipts, cash/online payments & empty cylinder returns'}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs flex-wrap sm:flex-nowrap">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">Current Balance</span>
                    <span className="text-xs font-black text-red-600">₹{currentCustomer.balanceAmount.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">MT Owed</span>
                    <span className="text-xs font-black text-amber-600">{currentCustomer.emptyCylindersDue} Cyl</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowThermalReceipt(true)}
                    id="btn-print-ledger-thermal"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                    title={lang === 'kn' ? 'ಥರ್ಮಲ್ ಪ್ರಿಂಟರ್ ಗಾತ್ರದಲ್ಲಿ ಲೆಡ್ಜರ್ ಪ್ರಿಂಟ್ ಮಾಡಿ' : 'Print ledger formatted for thermal receipt printer (80mm / 58mm)'}
                  >
                    <Printer className="w-3.5 h-3.5 text-orange-400" />
                    <span>{lang === 'kn' ? 'ಪ್ರಿಂಟ್' : 'Print'}</span>
                  </button>
                </div>
              </div>

              {customerLedgers.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-xs">
                  {lang === 'kn' ? 'ಯಾವುದೇ ಲೆಡ್ಜರ್ ನಮೂದುಗಳು ಇಲ್ಲ.' : 'No passbook entries recorded yet.'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-black border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-3">Cyl Delivered</th>
                        <th className="py-2.5 px-3">MT Returned</th>
                        <th className="py-2.5 px-3">Billed (₹)</th>
                        <th className="py-2.5 px-3">Paid (₹)</th>
                        <th className="py-2.5 px-3">Mode</th>
                        <th className="py-2.5 px-3">Balance (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {customerLedgers.map((entry) => (
                        <tr key={entry.id} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-3 font-semibold text-slate-700 whitespace-nowrap">{entry.date}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">{entry.description}</td>
                          <td className="py-2.5 px-3 font-bold text-orange-600 text-center">
                            {entry.cylindersDelivered ? `+${entry.cylindersDelivered}` : '-'}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-emerald-600 text-center">
                            {entry.emptyCollected ? `${entry.emptyCollected}` : '-'}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">
                            {entry.amountBilled ? `₹${entry.amountBilled.toLocaleString()}` : '-'}
                          </td>
                          <td className="py-2.5 px-3 font-black text-emerald-700">
                            {entry.amountPaid ? `₹${entry.amountPaid.toLocaleString()}` : '-'}
                          </td>
                          <td className="py-2.5 px-3">
                            {entry.paymentMode && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-200 text-slate-700">
                                {entry.paymentMode}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 font-black text-red-600">
                            ₹{entry.balanceAfter.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Bottom Ledger Thermal Print Toolbar */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Printer className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <span className="text-[11px]">
                    {lang === 'kn'
                      ? 'POS ಥರ್ಮಲ್ ಪ್ರಿಂಟರ್ ಬೆಂಬಲ (80mm ಮತ್ತು 58mm ಪೇಪರ್ ರೋಲ್ ಗಾತ್ರ)'
                      : 'Thermal Printer Paper Ready: Formatted for 80mm & 58mm POS receipt rolls with running balance & MT counts.'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowThermalReceipt(true)}
                  id="btn-print-ledger-thermal-bottom"
                  className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'kn' ? 'ಥರ್ಮಲ್ ರಸೀದಿ ಪ್ರಿಂಟ್' : 'Print Thermal Receipt'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Custom Reorder Booking */}
          {activeTab === 'reorder' && (
            <div className="max-w-xl bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">
                  {lang === 'kn' ? 'ಕಸ್ಟಮ್ ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್' : 'Place Custom Commercial Cylinder Booking'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'kn'
                    ? 'ಬ್ರ್ಯಾಂಡ್ ಮತ್ತು ಸಿಲಿಂಡರ್ ಸಂಖ್ಯೆ ಆಯ್ಕೆಮಾಡಿ ಸಲ್ಲಿಸಿ. ನೇರವಾಗಿ ನೋಟಿಫಿಕೇಶನ್ ತಲುಪುತ್ತದೆ.'
                    : 'Select required brand & quantity for your kitchen or banquet setup.'}
                </p>
              </div>

              <form onSubmit={handleCustomOrder} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    {lang === 'kn' ? 'ಗ್ಯಾಸ್ ಬ್ರ್ಯಾಂಡ್' : 'Gas Brand'}
                  </label>
                  <select
                    value={orderBrand}
                    onChange={(e) => setOrderBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Bharat Gas">Bharat Gas (Official Commercial)</option>
                    <option value="Go Gas">GoGas (Commercial & Elite)</option>
                    <option value="Power Gas">Power Gas</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                      {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ವಿಧ' : 'Cylinder Capacity'}
                    </label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none"
                    >
                      <option value="19kg Commercial VOT">19 KG Commercial VOT</option>
                      <option value="47.5kg Industrial">47.5 KG Industrial Bulk</option>
                      <option value="33kg Commercial">33 KG Commercial</option>
                      <option value="21kg Private">21 KG Private</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                      {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಸಂಖ್ಯೆ' : 'Quantity Required'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      required
                      value={orderQty}
                      onChange={(e) => setOrderQty(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    {lang === 'kn' ? 'ವಿಶೇಷ ಸೂಚನೆಗಳು (ಐಚ್ಛಿಕ)' : 'Special Delivery Instructions (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Deliver before 11 AM lunch rush, gate code, etc."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-black text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'kn' ? 'ಆರ್ಡರ್ ಕಳುಹಿಸಿ' : 'Send Delivery Request'}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: Customer Exclusive Safety Protocols & Emergency Guide */}
          {activeTab === 'safety' && (
            <div className="space-y-4 bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-black uppercase tracking-widest border border-red-500/30 mb-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    <span>{lang === 'kn' ? 'ನಮ್ಮ ಗ್ರಾಹಕರಿಗೆ ಮಾತ್ರ - ತುರ್ತು ಮಾರ್ಗದರ್ಶಿ' : 'CUSTOMER EXCLUSIVE SAFETY GUIDE'}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                    {lang === 'kn' ? (
                      <>
                        ಗ್ಯಾಸ್ ಸೋರಿಕೆ ಅಥವಾ ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ{' '}
                        <span className="text-red-400">ಪಾಲಿಸಬೇಕಾದ ನಿಯಮಗಳು</span>
                      </>
                    ) : (
                      <>
                        Commercial LPG Emergency &{' '}
                        <span className="text-red-400">Leak Safety Protocols</span>
                      </>
                    )}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    {lang === 'kn'
                      ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್‌ನ ಅಧಿಕೃತ ಕಮರ್ಷಿಯಲ್ ಗ್ರಾಹಕರಿಗೆ ತುರ್ತು ತಾಂತ್ರಿಕ ನೆರವು ಮತ್ತು ಲೀಕೇಜ್ ಬೆಂಬಲ ನಿರಂತರವಾಗಿ ಲಭ್ಯವಿರುತ್ತದೆ. ಯಾವುದೇ ಸಂದರ್ಭದಲ್ಲಿ ಆತಂಕಪಡದೆ ಕೆಳಗಿನ ಕ್ರಮಗಳನ್ನು ಅನುಸರಿಸಿ.'
                      : 'Dedicated leak response and safety inspection support exclusively for registered Sandhya Enterprises clients. Follow these steps calmly.'}
                  </p>
                </div>

                <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-right">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    {lang === 'kn' ? 'ಗ್ರಾಹಕರ ಸಂಸ್ಥೆ' : 'Customer Account'}
                  </span>
                  <span className="text-xs font-black text-orange-400">
                    {currentCustomer.businessName}
                  </span>
                </div>
              </div>

              {/* 5 Emergency Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
                {SAFETY_GUIDELINES[lang].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-red-500/60 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-6 h-6 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center font-black text-xs mb-2">
                        {item.step}
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-tight text-white mb-1 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Exclusive Helpline & Technician Dispatch Line */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-red-950/80 to-slate-900 border-l-4 border-l-red-600 border border-red-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-600 text-white flex-shrink-0 shadow-sm">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-red-300">
                      {lang === 'kn' ? '24/7 ತುರ್ತು ಲೀಕೇಜ್ ಸಹಾಯವಾಣಿ' : '24/7 PRIORITY LEAK HELPLINE'}
                    </div>
                    <div className="text-base sm:text-lg font-black text-white font-mono">
                      +91 {BUSINESS_INFO.phoneHelpline}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {lang === 'kn' ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ತುರ್ತು ರಕ್ಷಣಾ ತಂಡ' : 'Sandhya Enterprises Rapid Technical Team'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <a
                    href={`tel:${BUSINESS_INFO.phoneHelpline}`}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{lang === 'kn' ? 'ತಕ್ಷಣ ಕರೆ ಮಾಡಿ' : 'Emergency Call'}</span>
                  </a>
                  <a
                    href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
                      lang === 'kn'
                        ? `ತುರ್ತು: ನನ್ನ ಸಂಸ್ಥೆ ${currentCustomer.businessName} ನಲ್ಲಿ ಗ್ಯಾಸ್ ಸೋರಿಕೆ / ತಾಂತ್ರಿಕ ನೆರವು ತಕ್ಷಣ ಬೇಕಾಗಿದೆ.`
                        : `URGENT: Gas leak / technical safety emergency support required at ${currentCustomer.businessName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    <span>WhatsApp Alert</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Thermal Receipt Print Modal */}
      {showThermalReceipt && currentCustomer && (
        <ThermalLedgerReceipt
          customer={currentCustomer}
          ledgers={customerLedgers}
          lang={lang}
          onClose={() => setShowThermalReceipt(false)}
        />
      )}
    </div>
  );
};
