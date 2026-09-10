import React, { useState, useEffect } from 'react';
import { UserRole, Language } from '../../types';
import { portalAuth, PortalUserSession, AUTHORIZED_ADMIN_EMAILS } from '../../lib/portalAuth';
import { portalStore } from '../../data/portalStore';
import { BUSINESS_INFO } from '../../data/content';
import { OfficialLogoWatermark, OfficialLogoBadge } from '../common/OfficialLogoWatermark';
import {
  Shield,
  Lock,
  Mail,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  LogOut,
  RefreshCw,
  Building2,
  Phone,
  MapPin,
  Flame,
  Send,
  HelpCircle
} from 'lucide-react';

interface PortalAccessGuardProps {
  requiredRole: UserRole;
  portalTitleEn: string;
  portalTitleKn: string;
  portalSubtitleEn?: string;
  portalSubtitleKn?: string;
  lang?: Language;
  onNavigateToRole?: (role: UserRole) => void;
  children: React.ReactNode;
}

export const PortalAccessGuard: React.FC<PortalAccessGuardProps> = ({
  requiredRole,
  portalTitleEn,
  portalTitleKn,
  portalSubtitleEn,
  portalSubtitleKn,
  lang = 'en',
  onNavigateToRole,
  children
}) => {
  const [session, setSession] = useState<PortalUserSession | null>(portalAuth.getSession());
  const [authMode, setAuthMode] = useState<'otp' | 'password' | 'register' | 'forgot'>('otp');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [simulatedCode, setSimulatedCode] = useState<string | null>(null);

  // Registration states (for Customer portal)
  const [regForm, setRegForm] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    businessType: 'Restaurant / Hotel' as const,
    area: 'Nelamangala Town (562123)',
    pincode: '562123',
    password: '',
    preferredBrand: 'Bharat Gas 19kg' as const
  });

  useEffect(() => {
    const unsub = portalAuth.subscribe(() => {
      setSession(portalAuth.getSession());
    });
    return unsub;
  }, []);

  // Pre-fill suggested email based on target role for streamlined testing
  useEffect(() => {
    if (!email) {
      if (requiredRole === 'admin') {
        setEmail(BUSINESS_INFO.emailOfficial);
      } else if (requiredRole === 'distributor') {
        setEmail('staff.nelamangala@sandhyagas.in');
      } else {
        setEmail('udupigrand.nela@gmail.com');
      }
    }
  }, [requiredRole]);

  // Handle Send Official OTP
  const handleSendOTP = async (purpose: 'login' | 'verification' | 'password_reset' = 'login') => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await portalAuth.sendOfficialEmailOTP(email, requiredRole, purpose);
      setOtpSent(true);
      setSuccessMsg(res.message);
      if (res.simulatedOtp) {
        setSimulatedCode(res.simulatedOtp);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to dispatch official OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP & Sign In
  const handleVerifyOTP = async () => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const newSession = await portalAuth.verifyOfficialEmailOTP(
        email,
        otpCode,
        requiredRole,
        {
          displayName: email.split('@')[0].toUpperCase(),
          businessName: requiredRole === 'admin' ? BUSINESS_INFO.name : undefined
        }
      );

      // Sync with portalStore legacy states
      if (requiredRole === 'admin') {
        portalStore.authenticateAdmin('9500');
      } else if (requiredRole === 'distributor') {
        portalStore.authenticateDistributor('1234');
      } else {
        const storeState = portalStore.getState();
        const existing = storeState.customers.find((c) => c.email === email);
        if (existing) {
          portalStore.setCurrentCustomer(existing.id);
        }
      }

      setSuccessMsg('Official email verification successful! Portal unlocked.');
    } catch (err: any) {
      setError(err.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Password / PIN Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      await portalAuth.loginWithEmailPassword(email, password, requiredRole);

      // Sync with legacy portal store states
      if (requiredRole === 'admin') {
        portalStore.authenticateAdmin(password);
      } else if (requiredRole === 'distributor') {
        portalStore.authenticateDistributor(password);
      } else {
        const storeRes = portalStore.loginCustomer(email, password);
        if (!storeRes.success) {
          // If not found, create or sign in
          portalAuth.loginWithEmailPassword(email, password, 'customer');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Commercial Customer Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      if (!regForm.businessName || !regForm.phone || !regForm.email) {
        throw new Error('Please fill in all mandatory business fields.');
      }

      const created = portalStore.registerCustomer({
        businessName: regForm.businessName,
        contactPerson: regForm.contactPerson || regForm.businessName,
        phone: regForm.phone,
        email: regForm.email,
        businessType: regForm.businessType,
        area: regForm.area,
        pincode: regForm.pincode,
        password: regForm.password || 'password123',
        preferredBrand: regForm.preferredBrand
      });

      portalAuth.setCustomerSession(created);
      setSuccessMsg(`Account created and verified! Welcome, ${created.businessName}.`);
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Out
  const handleSignOut = () => {
    portalAuth.logout();
    if (requiredRole === 'admin') portalStore.lockAdmin();
    if (requiredRole === 'distributor') portalStore.lockDistributor();
    portalStore.setCurrentCustomer(null);
    setOtpSent(false);
    setOtpCode('');
    setError(null);
    setSuccessMsg(null);
  };

  // -------------------------------------------------------------
  // Check Authorization
  // -------------------------------------------------------------
  const isAuth = portalAuth.isAuthenticated();
  const isAuthorized = portalAuth.isAuthorizedFor(requiredRole);

  // CASE 1: Authenticated and Authorized -> Render Portal Content
  if (isAuth && isAuthorized) {
    return (
      <div className="relative min-h-[700px] flex flex-col">
        {/* Subtle Watermark Branding across authenticated portal */}
        <OfficialLogoWatermark opacity={0.03} />

        {/* Security & Role Status Bar */}
        <div className="relative z-10 bg-slate-900 border-b border-slate-800 text-slate-300 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-400">
              <Shield className="w-3.5 h-3.5" />
              {requiredRole.toUpperCase()} ACCESS LEVEL
            </span>
            <span className="text-slate-500">•</span>
            <span className="truncate max-w-[200px] sm:max-w-none text-slate-200 font-medium">
              {session?.displayName || session?.email}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-2.5 h-2.5" /> Official Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </div>
        </div>

        {/* The Actual Portal Content */}
        <div className="relative z-10 flex-1">{children}</div>
      </div>
    );
  }

  // CASE 2: Authenticated, but NOT authorized for this role (Role Mismatch Barrier)
  if (isAuth && !isAuthorized) {
    return (
      <div className="relative min-h-[600px] flex items-center justify-center p-4 sm:p-8 bg-slate-950 text-slate-100">
        <OfficialLogoWatermark opacity={0.05} />

        <div className="relative z-10 max-w-lg w-full bg-slate-900/90 backdrop-blur-md rounded-2xl border border-rose-500/30 shadow-2xl p-6 sm:p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 mx-auto flex items-center justify-center text-rose-400 mb-4 shadow-inner">
            <AlertTriangle className="w-8 h-8 animate-pulse" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2">
            Portal Access Restricted
          </h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            You are currently signed in as{' '}
            <span className="font-bold text-amber-400 capitalize">
              {session?.role} ({session?.displayName || session?.email})
            </span>
            . This portal is strictly restricted to authorized{' '}
            <span className="font-bold text-white uppercase">{requiredRole}</span> personnel.
          </p>

          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 text-xs text-left mb-6 space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Required Role:</span>
              <span className="font-mono font-bold text-rose-400 uppercase">{requiredRole}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Your Active Role:</span>
              <span className="font-mono font-bold text-amber-400 uppercase">{session?.role}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Security Policy:</span>
              <span className="text-slate-300">Mandatory Multi-Portal RBAC</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onNavigateToRole && session?.role && (
              <button
                onClick={() => onNavigateToRole(session.role)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                Go to My {session.role.toUpperCase()} Portal
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleSignOut}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out & Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CASE 3: Not Authenticated -> Show Portal Specific Verification Gate
  return (
    <div className="relative min-h-[700px] flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden">
      {/* Background Watermark */}
      <OfficialLogoWatermark opacity={0.045} />

      <div className="relative z-10 max-w-md w-full bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Top Header with Seal */}
        <div className="p-6 bg-gradient-to-b from-slate-800/80 to-transparent border-b border-slate-800/80 text-center relative">
          <div className="flex justify-center mb-3">
            <OfficialLogoBadge size={54} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-1.5">
            <Lock className="w-3 h-3" />
            {requiredRole.toUpperCase()} SECURITY GATEWAY
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {lang === 'kn' ? portalTitleKn : portalTitleEn}
          </h1>

          <p className="text-xs text-slate-400 mt-1">
            {portalSubtitleEn ||
              `Official email identity verification required for Sandhya Enterprises ${requiredRole} operations.`}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs font-bold">
          <button
            onClick={() => {
              setAuthMode('otp');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 px-3 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              authMode === 'otp'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Official Email OTP
          </button>

          <button
            onClick={() => {
              setAuthMode('password');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 px-3 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              authMode === 'password'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            Password / PIN
          </button>

          {requiredRole === 'customer' && (
            <button
              onClick={() => {
                setAuthMode('register');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-3 px-3 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
                authMode === 'register'
                  ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Register
            </button>
          )}
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6">
          {/* TAB 1: OFFICIAL EMAIL OTP VERIFICATION */}
          {authMode === 'otp' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Official Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@business.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Routed via official sender:{' '}
                  <span className="font-mono text-amber-400">{BUSINESS_INFO.emailOfficial}</span>
                </p>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => handleSendOTP('login')}
                  disabled={loading || !email}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Send Official 6-Digit Verification OTP
                </button>
              ) : (
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Enter 6-Digit OTP Code
                      </label>
                      <button
                        type="button"
                        onClick={() => handleSendOTP('login')}
                        className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Resend
                      </button>
                    </div>

                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 842190"
                      className="w-full py-3 px-4 bg-slate-950 border-2 border-amber-500/60 rounded-xl text-center font-mono text-2xl tracking-[0.5em] text-white focus:outline-none focus:border-amber-400"
                    />

                    {simulatedCode && (
                      <div className="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center justify-between">
                        <span>Instant Verification Code:</span>
                        <button
                          type="button"
                          onClick={() => setOtpCode(simulatedCode)}
                          className="font-mono font-bold underline px-1 py-0.5 bg-amber-500/20 rounded hover:bg-amber-500/30"
                        >
                          Auto-fill {simulatedCode}
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={loading || otpCode.length < 6}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    Verify OTP & Enter {requiredRole.toUpperCase()} Portal
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EMAIL + PASSWORD / PIN */}
          {authMode === 'password' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Official Email / Phone
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domain.com or phone"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    {requiredRole === 'admin' ? 'Master Admin PIN' : requiredRole === 'distributor' ? 'Staff Security Passcode' : 'Password'}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('forgot');
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      requiredRole === 'admin'
                        ? 'Master PIN (ADMIN2026 or 9500)'
                        : requiredRole === 'distributor'
                        ? 'Passcode (DIST2026 or 1234)'
                        : 'Account Password'
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                Authorize & Open Portal
              </button>

              {/* Helpful Quick Credentials Hint */}
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col gap-1">
                <span className="font-semibold text-slate-300">Default Authorized Credentials:</span>
                {requiredRole === 'admin' && (
                  <span className="font-mono text-amber-400/90">
                    Email: {BUSINESS_INFO.emailOfficial} | PIN: 9500 or ADMIN2026
                  </span>
                )}
                {requiredRole === 'distributor' && (
                  <span className="font-mono text-amber-400/90">
                    Code: DIST2026 or 1234
                  </span>
                )}
                {requiredRole === 'customer' && (
                  <span className="font-mono text-amber-400/90">
                    Email: udupigrand.nela@gmail.com | Password: password123
                  </span>
                )}
              </div>
            </form>
          )}

          {/* TAB 3: CUSTOMER REGISTRATION */}
          {authMode === 'register' && requiredRole === 'customer' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                  Business / Establishment Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={regForm.businessName}
                    onChange={(e) => setRegForm({ ...regForm, businessName: e.target.value })}
                    placeholder="e.g. Swathi Delicacy Hotel"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={regForm.contactPerson}
                    onChange={(e) => setRegForm({ ...regForm, contactPerson: e.target.value })}
                    placeholder="Manager / Owner"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  placeholder="accounts@swathi-hotel.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    Delivery Area
                  </label>
                  <select
                    value={regForm.area}
                    onChange={(e) => setRegForm({ ...regForm, area: e.target.value })}
                    className="w-full px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Nelamangala Town (562123)">Nelamangala Town</option>
                    <option value="Nelamangala Rural (562123)">Nelamangala Rural</option>
                    <option value="Dobbaspet KIADB">Dobbaspet KIADB</option>
                    <option value="Tumkur Highway">Tumkur Highway</option>
                    <option value="Sira Commercial Zone">Sira Commercial Zone</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    Primary Gas Cylinder
                  </label>
                  <select
                    value={regForm.preferredBrand}
                    onChange={(e: any) => setRegForm({ ...regForm, preferredBrand: e.target.value })}
                    className="w-full px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Bharat Gas 19kg">Bharat Gas 19kg</option>
                    <option value="Bharat Gas 47.5kg">Bharat Gas 47.5kg Bulk</option>
                    <option value="Go Gas 21kg">Go Gas 21kg</option>
                    <option value="Power Gas 19kg">Power Gas 19kg</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  value={regForm.password}
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  placeholder="Set account password"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 mt-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition disabled:opacity-50"
              >
                Register & Verify Official Email
              </button>
            </form>
          )}

          {/* TAB 4: FORGOT PASSWORD */}
          {authMode === 'forgot' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-300">
                Enter your registered official email address. A password reset link and verification code will be dispatched strictly from our official email address{' '}
                <span className="font-mono text-amber-400">{BUSINESS_INFO.emailOfficial}</span>.
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                  Registered Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="registered@email.com"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('password')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Back to Login
                </button>
                <button
                  type="button"
                  onClick={() => handleSendOTP('password_reset')}
                  disabled={loading || !email}
                  className="flex-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Reset Code
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info badge */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Official Sandhya Portal
          </span>
          <span className="font-mono">GSTIN: {BUSINESS_INFO.gstin}</span>
        </div>
      </div>
    </div>
  );
};
