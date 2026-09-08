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
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';
import { Language, CustomerAccount, OrderRecord, LedgerEntry } from '../../types';
import { portalStore, PortalState } from '../../data/portalStore';
import { BUSINESS_INFO } from '../../data/content';

interface CustomerPortalProps {
  lang: Language;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({ lang }) => {
  const [storeState, setStoreState] = useState<PortalState>(portalStore.getState());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reorder' | 'ledger'>('dashboard');

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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Customer Portal Brand Header */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-orange-600">
              <Flame className="w-4 h-4 text-white" />
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
        <div className="max-w-lg mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-lg space-y-4">
          {/* Auth Mode Tabs */}
          <div className="flex items-center border-b border-slate-200 pb-2 gap-2 text-xs font-black uppercase tracking-wider">
            <button
              onClick={() => setAuthMode('login')}
              className={`pb-2 px-3 border-b-2 transition-all ${
                authMode === 'login' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500'
              }`}
            >
              {lang === 'kn' ? 'ಲಾಗಿನ್' : 'Customer Login'}
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`pb-2 px-3 border-b-2 transition-all ${
                authMode === 'register' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500'
              }`}
            >
              {lang === 'kn' ? 'ಖಾತೆ ತೆರೆಯಿರಿ' : 'Create Account'}
            </button>
            <button
              onClick={() => setAuthMode('forgot')}
              className={`pb-2 px-3 border-b-2 transition-all ${
                authMode === 'forgot' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500'
              }`}
            >
              {lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ' : 'Forgot Password'}
            </button>
          </div>

          {authError && (
            <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* Login Form */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  {lang === 'kn' ? 'ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : 'Registered Mobile Number'}
                </label>
                <input
                  type="tel"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="9845112233"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  {lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 pr-10 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-black text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{lang === 'kn' ? 'ಖಾತೆಗೆ ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರವೇಶಿಸಿ' : 'Secure Sign In'}</span>
              </button>
            </form>
          )}

          {/* Register Form */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  {lang === 'kn' ? 'ಹೋಟೆಲ್ / ವ್ಯಾಪಾರ ಸಂಸ್ಥೆಯ ಹೆಸರು' : 'Hotel / Restaurant / Business Name'}
                </label>
                <input
                  type="text"
                  required
                  value={regBusinessName}
                  onChange={(e) => setRegBusinessName(e.target.value)}
                  placeholder="e.g. Udupi Ruchi Grand"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    {lang === 'kn' ? 'ಸಂಪರ್ಕ ವ್ಯಕ್ತಿಯ ಹೆಸರು' : 'Contact Person'}
                  </label>
                  <input
                    type="text"
                    required
                    value={regContactPerson}
                    onChange={(e) => setRegContactPerson(e.target.value)}
                    placeholder="Owner / Manager"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    {lang === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : 'Mobile Number'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    {lang === 'kn' ? 'ವ್ಯವಹಾರ ವಿಧ' : 'Business Type'}
                  </label>
                  <select
                    value={regBusinessType}
                    onChange={(e) => setRegBusinessType(e.target.value as any)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Restaurant / Hotel">Restaurant / Hotel</option>
                    <option value="Bakery / Sweets">Bakery / Sweets</option>
                    <option value="Wedding / Banquet Hall">Wedding / Banquet Hall</option>
                    <option value="Highway Dhaba">Highway Dhaba</option>
                    <option value="Industrial / Factory Canteen">Industrial / Factory Canteen</option>
                    <option value="Other">Other Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    {lang === 'kn' ? 'ಪ್ರದೇಶ' : 'Delivery Area'}
                  </label>
                  <select
                    value={regArea}
                    onChange={(e) => setRegArea(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Nelamangala Town (562123)">Nelamangala Town (562123)</option>
                    <option value="Nelamangala Rural (562123)">Nelamangala Rural (562123)</option>
                    <option value="Bengaluru Rural Hub">Bengaluru Rural Hub</option>
                    <option value="Tumkur Highway (Bulk Orders 10-15+)">Tumkur (Bulk 10-15+)</option>
                    <option value="Sira Region (Bulk Orders 10-15+)">Sira (Bulk 10-15+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  {lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ' : 'Set Password'}
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-black text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{lang === 'kn' ? 'ಖಾತೆ ರಚಿಸಿ' : 'Register Account'}</span>
              </button>
            </form>
          )}

          {/* Forgot Password */}
          {authMode === 'forgot' && (
            <form onSubmit={handleForgotPass} className="space-y-3">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  {lang === 'kn' ? 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : 'Registered Mobile Number'}
                </label>
                <input
                  type="tel"
                  required
                  value={forgotPhone}
                  onChange={(e) => setForgotPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  {lang === 'kn' ? 'ಹೊಸ ಪಾಸ್‌ವರ್ಡ್' : 'New Password'}
                </label>
                <input
                  type="password"
                  required
                  value={forgotNewPass}
                  onChange={(e) => setForgotNewPass(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-black text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>{lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್ ರೀಸೆಟ್ ಮಾಡಿ' : 'Reset Password'}</span>
              </button>
            </form>
          )}
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

          {/* Sub Navigation Tabs */}
          <div className="flex items-center border-b border-slate-200 gap-2 overflow-x-auto text-xs font-black uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'dashboard' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-600 hover:text-slate-900'
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
              className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'ledger' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಪಾಸ್‌ಬುಕ್ & ಲೆಡ್ಜರ್ (ಖಾತೆ)' : 'Passbook & Ledger'}</span>
            </button>

            <button
              onClick={() => setActiveTab('reorder')}
              className={`py-2 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'reorder' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಕಸ್ಟಮ್ ಆರ್ಡರ್ ಬುಕಿಂಗ್' : 'Custom Booking'}</span>
            </button>
          </div>

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

                <div className="flex items-center gap-3 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">Current Balance</span>
                    <span className="text-xs font-black text-red-600">₹{currentCustomer.balanceAmount.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">MT Owed</span>
                    <span className="text-xs font-black text-amber-600">{currentCustomer.emptyCylindersDue} Cyl</span>
                  </div>
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
        </div>
      )}
    </div>
  );
};
