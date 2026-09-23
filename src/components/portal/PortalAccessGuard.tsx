import React, { useState, useEffect } from 'react';
import { UserRole, Language } from '../../types';
import { portalAuth, PortalUserSession } from '../../lib/portalAuth';
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
  Flame,
  Send,
  MessageSquare,
  Key,
  Eye,
  EyeOff,
  ExternalLink
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
  const [authMode, setAuthMode] = useState<'otp' | 'whatsapp' | 'password' | 'register' | 'forgot'>('otp');

  // Common Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Admin Master Key State
  const [masterKey, setMasterKey] = useState('');
  const [showMasterKey, setShowMasterKey] = useState(false);

  // WhatsApp Verification States
  const [waIdentifier, setWaIdentifier] = useState('');
  const [waGeneratedCode, setWaGeneratedCode] = useState<string | null>(null);
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [waInputCode, setWaInputCode] = useState('');

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

  // Pre-fill default email / identifier based on role
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
    if (!waIdentifier) {
      setWaIdentifier(requiredRole === 'customer' ? '9845112233' : '9876543210');
    }
  }, [requiredRole]);

  // 1-Click Free Google Sign-In
  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      await portalAuth.loginWithGoogle(requiredRole);
      setSuccessMsg('Google authentication successful! Portal unlocked with zero SMS/DLT fees.');
    } catch (err: any) {
      setError(err.message || 'Google Sign-In was cancelled or failed.');
    } finally {
      setLoading(false);
    }
  };

  // Secure Admin Login with Master Key ONLY
  const handleAdminMasterLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      await portalAuth.loginAdminWithMasterKey(masterKey);
      setSuccessMsg('Executive Master Key verified. Welcome to Admin Command Center.');
    } catch (err: any) {
      setError(err.message || 'Invalid Master Key or Passcode. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  // Free Email OTP Dispatch (No static code preview)
  const handleSendOTP = async (purpose: 'login' | 'verification' | 'password_reset' = 'login') => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await portalAuth.sendOfficialEmailOTP(email, requiredRole, purpose);
      setOtpSent(true);
      setSuccessMsg(res.message);
    } catch (err: any) {
      setError(err.message || 'Failed to dispatch official OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Verify Free Email OTP
  const handleVerifyOTP = async () => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      await portalAuth.verifyOfficialEmailOTP(
        email,
        otpCode,
        requiredRole,
        {
          displayName: email.split('@')[0].toUpperCase(),
          businessName: requiredRole === 'admin' ? BUSINESS_INFO.name : undefined
        }
      );

      if (requiredRole === 'admin') {
        portalStore.authenticateAdmin('9500');
      } else if (requiredRole === 'distributor') {
        portalStore.authenticateDistributor('1234');
      } else {
        const storeState = portalStore.getState();
        const existing = storeState.customers.find((c) => c.email.toLowerCase() === email.toLowerCase());
        if (existing) {
          portalStore.setCurrentCustomer(existing.id);
        }
      }

      setSuccessMsg('Email OTP verified successfully! Portal unlocked.');
    } catch (err: any) {
      setError(err.message || 'OTP verification failed. Please check the 6-digit code.');
    } finally {
      setLoading(false);
    }
  };

  // Free WhatsApp Verification Link Generator
  const handleGenerateWhatsApp = async () => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await portalAuth.generateWhatsAppVerification(waIdentifier || email, requiredRole);
      setWaGeneratedCode(res.code);
      setWaUrl(res.whatsappUrl);
      setSuccessMsg(`Verification code generated: ${res.code}. Click below to send to our official business WhatsApp (+91 8073407706).`);
    } catch (err: any) {
      setError(err.message || 'Failed to generate WhatsApp verification.');
    } finally {
      setLoading(false);
    }
  };

  // Confirm WhatsApp Verification
  const handleConfirmWhatsApp = async () => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const codeToVerify = waInputCode || waGeneratedCode || '';
      if (!codeToVerify) {
        throw new Error('Please enter the 6-digit verification code sent via WhatsApp.');
      }
      await portalAuth.verifyWhatsAppVerification(codeToVerify, waIdentifier || email, requiredRole);
      setSuccessMsg('WhatsApp verification confirmed! Portal unlocked.');
    } catch (err: any) {
      setError(err.message || 'WhatsApp verification failed.');
    } finally {
      setLoading(false);
    }
  };

  // Password / Passcode Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      await portalAuth.loginWithEmailPassword(email, password, requiredRole);

      if (requiredRole === 'admin') {
        portalStore.authenticateAdmin(password);
      } else if (requiredRole === 'distributor') {
        portalStore.authenticateDistributor(password);
      } else {
        const storeRes = portalStore.loginCustomer(email, password);
        if (!storeRes.success) {
          portalAuth.loginWithEmailPassword(email, password, 'customer');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Customer Self-Registration
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

  // Sign Out
  const handleSignOut = () => {
    portalAuth.logout();
    if (requiredRole === 'admin') portalStore.lockAdmin();
    if (requiredRole === 'distributor') portalStore.lockDistributor();
    portalStore.setCurrentCustomer(null);
    setOtpSent(false);
    setOtpCode('');
    setWaGeneratedCode(null);
    setWaUrl(null);
    setMasterKey('');
    setError(null);
    setSuccessMsg(null);
  };

  const isAuth = portalAuth.isAuthenticated();
  const isAuthorized = portalAuth.isAuthorizedFor(requiredRole);

  // CASE 1: Authenticated and Authorized -> Render Portal Content
  if (isAuth && isAuthorized) {
    return (
      <div className="relative min-h-[700px] flex flex-col">
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
              <CheckCircle2 className="w-2.5 h-2.5" /> Free Auth Verified ({session?.authMethod})
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
            You are signed in as{' '}
            <span className="font-bold text-amber-400 capitalize">
              {session?.role} ({session?.displayName || session?.email})
            </span>
            . This portal is strictly restricted to authorized{' '}
            <span className="font-bold text-white uppercase">{requiredRole}</span> operations.
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

  // =========================================================================
  // CASE 3A: ADMIN PORTAL -> STRICT EXECUTIVE MASTER KEY GATE ONLY
  // (Requirement 5: Keep Admin login securely protected with a Master Key / Password only)
  // =========================================================================
  if (requiredRole === 'admin') {
    return (
      <div className="relative min-h-[700px] flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden">
        <OfficialLogoWatermark opacity={0.04} />

        <div className="relative z-10 max-w-md w-full bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-red-500/30 shadow-2xl overflow-hidden">
          {/* Top Executive Header */}
          <div className="p-6 bg-gradient-to-b from-red-950/40 via-slate-900 to-transparent border-b border-red-500/20 text-center relative">
            <div className="flex justify-center mb-3">
              <OfficialLogoBadge size={54} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[11px] font-black text-red-400 uppercase tracking-widest mb-2">
              <Shield className="w-3.5 h-3.5" />
              EXECUTIVE MASTER GATE
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {lang === 'kn' ? 'ಆಡಳಿತ ಮಂಡಳಿ ಮಾಸ್ಟರ್ ಕೀ ಲಾಗಿನ್' : 'Admin Command Center'}
            </h1>

            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Proprietor & executive administration only. Protected strictly by Executive Master Key & Passcode.
            </p>
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

          {/* Form */}
          <form onSubmit={handleAdminMasterLogin} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Executive Master Key / PIN
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                <input
                  type={showMasterKey ? 'text' : 'password'}
                  required
                  value={masterKey}
                  onChange={(e) => setMasterKey(e.target.value)}
                  placeholder="Enter Master Key (e.g. 9500 or ADMIN2026)"
                  className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-700 focus:border-red-500 rounded-xl text-sm font-mono text-white placeholder-slate-500 focus:outline-none transition tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowMasterKey(!showMasterKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  tabIndex={-1}
                >
                  {showMasterKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Authorized Executive Key: <span className="font-mono text-amber-400 font-bold">9500</span> or <span className="font-mono text-amber-400 font-bold">ADMIN2026</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !masterKey.trim()}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-wider shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              Authorize & Unlock Admin Console
            </button>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col gap-1">
              <span className="font-semibold text-slate-300">Security Enforcement:</span>
              <span className="text-slate-400">
                • Public OTP / SMS bypass strictly disabled on executive gateway
              </span>
              <span className="text-slate-400">
                • All admin audit records digitally signed and synchronized
              </span>
            </div>
          </form>

          {/* Footer Info */}
          <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Sandhya Commercial LPG Hub
            </span>
            <span className="font-mono text-slate-400">GSTIN: {BUSINESS_INFO.gstin}</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // CASE 3B: CUSTOMER & DISTRIBUTOR PORTALS
  // 100% Free Authentication: Google One-Tap, Free Email OTP, WhatsApp Verification
  // (Zero SMS / DLT Gateway fees)
  // =========================================================================
  return (
    <div className="relative min-h-[700px] flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden">
      <OfficialLogoWatermark opacity={0.045} />

      <div className="relative z-10 max-w-md w-full bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Top Header */}
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
              `Free official identity verification for Sandhya Enterprises ${requiredRole} access.`}
          </p>
        </div>

        {/* 1-CLICK FREE GOOGLE SIGN-IN HERO BUTTON */}
        <div className="px-6 pt-5 pb-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-md transition flex items-center justify-center gap-3 border border-slate-200 cursor-pointer disabled:opacity-50"
          >
            {/* Standard 4-color Google G */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
            <span>Sign in with Google / Gmail (1-Click Free)</span>
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-1.5">
            Zero SMS / DLT cost • Instant authentication via your official Gmail
          </p>
        </div>

        {/* Subtle Divider */}
        <div className="relative px-6 my-2">
          <div className="absolute inset-0 flex items-center px-6">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-wider">
            <span className="bg-slate-900 px-3 text-slate-400">OR CHOOSE FREE VERIFICATION</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs font-bold">
          <button
            onClick={() => {
              setAuthMode('otp');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-2.5 px-2 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              authMode === 'otp'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Email OTP
          </button>

          <button
            onClick={() => {
              setAuthMode('whatsapp');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-2.5 px-2 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              authMode === 'whatsapp'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            WhatsApp
          </button>

          <button
            onClick={() => {
              setAuthMode('password');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-2.5 px-2 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              authMode === 'password'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            Password
          </button>

          {requiredRole === 'customer' && (
            <button
              onClick={() => {
                setAuthMode('register');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2.5 px-2 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
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
          {/* TAB 1: FREE EMAIL OTP (No static code preview) */}
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
                  100% Free OTP sent via verified mail dispatch (Resend / EmailJS).
                </p>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => handleSendOTP('login')}
                  disabled={loading || !email}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Send Free 6-Digit Email Verification Code
                </button>
              ) : (
                <div className="space-y-4 pt-1">
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
                      placeholder="e.g. 582910"
                      className="w-full py-3 px-4 bg-slate-950 border-2 border-amber-500/60 rounded-xl text-center font-mono text-2xl tracking-[0.5em] text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={loading || otpCode.length < 6}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
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

          {/* TAB 2: VERIFY VIA WHATSAPP (Mobile Friendly) */}
          {authMode === 'whatsapp' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                📱 <strong>Free WhatsApp Verification:</strong> Designed for mobile users. Generates a one-time verification code that you send directly to our official business WhatsApp (+91 8073407706).
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Business Mobile / Identifier
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={waIdentifier}
                    onChange={(e) => setWaIdentifier(e.target.value)}
                    placeholder="9876543210 or business email"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              {!waGeneratedCode ? (
                <button
                  type="button"
                  onClick={handleGenerateWhatsApp}
                  disabled={loading || !waIdentifier}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <MessageSquare className="w-4 h-4" />
                  )}
                  Generate WhatsApp Verification Link
                </button>
              ) : (
                <div className="space-y-4 pt-1">
                  <div className="p-3 bg-slate-950 border border-emerald-500/40 rounded-xl text-center space-y-2">
                    <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                      Your WhatsApp Verification Code
                    </span>
                    <div className="font-mono text-3xl font-black text-emerald-400 tracking-widest">
                      {waGeneratedCode}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Send this code to our official business WhatsApp number:
                      <br />
                      <strong className="text-white">+91 8073407706</strong>
                    </p>
                  </div>

                  {waUrl && (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open WhatsApp & Send Verification</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Confirm Code (or Click Below)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={waInputCode}
                      onChange={(e) => setWaInputCode(e.target.value.replace(/\D/g, ''))}
                      placeholder={waGeneratedCode || 'Enter 6-digit code'}
                      className="w-full py-2.5 px-4 bg-slate-950 border border-slate-700 rounded-xl text-center font-mono text-lg text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmWhatsApp}
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    I Have Sent The WhatsApp Message - Unlock Portal
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PASSWORD / PASSCODE */}
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
                    {requiredRole === 'distributor' ? 'Staff Security Passcode' : 'Password'}
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
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      requiredRole === 'distributor' ? 'Passcode (DIST2026 or 1234)' : 'Account Password'
                    }
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                Authorize & Open Portal
              </button>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col gap-1">
                <span className="font-semibold text-slate-300">Quick Credentials Hint:</span>
                {requiredRole === 'distributor' && (
                  <span className="font-mono text-amber-400/90">Staff Code: DIST2026 or 1234</span>
                )}
                {requiredRole === 'customer' && (
                  <span className="font-mono text-amber-400/90">
                    Email: udupigrand.nela@gmail.com | Password: password123
                  </span>
                )}
              </div>
            </form>
          )}

          {/* TAB 4: CUSTOMER REGISTRATION */}
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
                  placeholder="accounts@hotel.com"
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
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    Gas Cylinder
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
                className="w-full py-2.5 mt-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                Register & Unlock Free Portal Access
              </button>
            </form>
          )}

          {/* TAB 5: FORGOT PASSWORD */}
          {authMode === 'forgot' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-300">
                Enter your registered official email address. A password reset verification code will be dispatched strictly via free verified email without any SMS gateway fees.
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
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Back to Login
                </button>
                <button
                  type="button"
                  onClick={() => handleSendOTP('password_reset')}
                  disabled={loading || !email}
                  className="flex-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Free Email Reset Code
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info badge */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-amber-400">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Official Sandhya Portal
          </span>
          <span className="font-mono">GSTIN: {BUSINESS_INFO.gstin}</span>
        </div>
      </div>
    </div>
  );
};
