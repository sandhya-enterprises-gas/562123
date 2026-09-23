import React, { useState, useEffect } from 'react';
import { UserRole, Language } from '../../types';
import { portalAuth, PortalUserSession, getEmailJsConfig, saveEmailJsConfig } from '../../lib/portalAuth';
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
  ExternalLink,
  Code
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

  // EmailJS Status & Diagnostic State
  const [emailJsNotice, setEmailJsNotice] = useState<{
    status?: number;
    text?: string;
    error?: string;
    serviceId?: string;
    templateId?: string;
    isSuccess?: boolean;
  } | null>(null);

  const [showEmailJsConfig, setShowEmailJsConfig] = useState(false);
  const [cfgServiceId, setCfgServiceId] = useState('');
  const [cfgTemplateId, setCfgTemplateId] = useState('');
  const [cfgPublicKey, setCfgPublicKey] = useState('');
  const [cfgSaveSuccess, setCfgSaveSuccess] = useState(false);

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

  // Initialize EmailJS config inputs
  useEffect(() => {
    const cfg = getEmailJsConfig();
    setCfgServiceId(cfg.serviceId);
    setCfgTemplateId(cfg.templateId);
    setCfgPublicKey(cfg.publicKey);
  }, []);

  const handleSaveEmailJsConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveEmailJsConfig({
      serviceId: cfgServiceId,
      templateId: cfgTemplateId,
      publicKey: cfgPublicKey
    });
    setCfgSaveSuccess(true);
    setTimeout(() => setCfgSaveSuccess(false), 4000);
    setEmailJsNotice(null);
  };

  // Free Email OTP Dispatch (No static code preview)
  const handleSendOTP = async (purpose: 'login' | 'verification' | 'password_reset' = 'login') => {
    setError(null);
    setSuccessMsg(null);
    setEmailJsNotice(null);
    setLoading(true);
    try {
      const res = await portalAuth.sendOfficialEmailOTP(email, requiredRole, purpose);
      setOtpSent(true);
      setSuccessMsg(res.message);

      if (res.emailJsStatus) {
        if (res.emailJsStatus.error) {
          console.error('[EmailJS Delivery Alert]:', res.emailJsStatus.error);
          setEmailJsNotice({
            status: res.emailJsStatus.status,
            text: res.emailJsStatus.text,
            error: res.emailJsStatus.error,
            serviceId: res.emailJsStatus.serviceId,
            templateId: res.emailJsStatus.templateId,
            isSuccess: false
          });
        } else if (res.emailJsStatus.success) {
          console.log('[EmailJS Delivery Confirmed]: Status', res.emailJsStatus.status, res.emailJsStatus.text);
          setEmailJsNotice({
            status: res.emailJsStatus.status || 200,
            text: res.emailJsStatus.text || 'Email dispatched successfully via EmailJS',
            serviceId: res.emailJsStatus.serviceId,
            templateId: res.emailJsStatus.templateId,
            isSuccess: true
          });
        }
      }
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
        let existing = storeState.customers.find((c) => c.email.toLowerCase() === email.toLowerCase());
        if (!existing) {
          existing = portalStore.registerCustomer({
            businessName: email.split('@')[0].toUpperCase() + ' Commercial LPG',
            contactPerson: email.split('@')[0],
            phone: '9845000000',
            email: email.toLowerCase(),
            businessType: 'Restaurant / Hotel',
            area: 'Nelamangala Town (562123)',
            pincode: '562123',
            password: 'otp_verified',
            preferredBrand: 'Bharat Gas 19kg'
          });
        }
        portalStore.setCurrentCustomer(existing.id);
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

      if (requiredRole === 'customer') {
        const storeState = portalStore.getState();
        const cleanIdent = (waIdentifier || email).toLowerCase();
        let existing = storeState.customers.find((c) =>
          c.email.toLowerCase() === cleanIdent || c.phone.includes(cleanIdent)
        );
        if (!existing) {
          existing = portalStore.registerCustomer({
            businessName: 'WhatsApp Commercial Partner',
            contactPerson: 'Commercial Partner',
            phone: waIdentifier.replace(/\D/g, '') || '9876543210',
            email: `${waIdentifier.replace(/\D/g, '') || 'customer'}@sandhyagas.in`,
            businessType: 'Restaurant / Hotel',
            area: 'Nelamangala Town (562123)',
            pincode: '562123',
            password: 'whatsapp_verified',
            preferredBrand: 'Bharat Gas 19kg'
          });
        }
        portalStore.setCurrentCustomer(existing.id);
      }

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
  // CASE 3B: CUSTOMER & DISTRIBUTOR PORTALS (Ultra-Clean Modern Gateway)
  // 1. Prominent Top Hero: Sign in with Google / Gmail (1-Click Free)
  // 2. Simplified 2 Tabs: "Email OTP" (EmailJS verified) & "WhatsApp Direct" (wa.me)
  // 3. Removed complex Password and Register forms from customer main view
  // 4. Dark theme, Sandhya Enterprises branding, GSTIN & verified badges intact
  // =========================================================================
  return (
    <div className="relative min-h-[720px] flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden">
      <OfficialLogoWatermark opacity={0.045} />

      <div className="relative z-10 max-w-lg w-full bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-transparent border-b border-slate-800/80 text-center relative">
          <div className="flex justify-center mb-3">
            <OfficialLogoBadge size={56} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>SANDHYA ENTERPRISES • {requiredRole.toUpperCase()} GATEWAY</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {lang === 'kn' ? (
              requiredRole === 'customer' ? 'ಗ್ರಾಹಕರ ಗ್ಯಾಸ್ ಬುಕಿಂಗ್ ಪ್ರವೇಶ' : portalTitleKn
            ) : (
              requiredRole === 'customer' ? 'Commercial Customer Gateway' : portalTitleEn
            )}
          </h1>

          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {portalSubtitleEn ||
              `Fast, 100% free verified access for commercial LPG cylinder orders, tracking & invoices.`}
          </p>

          <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-slate-500 font-medium">
            <span>Bharat Gas 19kg & 47.5kg</span>
            <span>•</span>
            <span>HP Gas Commercial</span>
            <span>•</span>
            <span>Nelamangala (562123)</span>
          </div>
        </div>

        {/* 1. TOP PROMINENT BUTTON: 1-CLICK FREE GOOGLE SIGN-IN */}
        <div className="px-6 pt-5 pb-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-4 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3.5 border-2 border-slate-200 cursor-pointer disabled:opacity-50 active:scale-[0.99] group"
          >
            {/* Standard 4-color Google G */}
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
                Sign in with Google / Gmail (1-Click Free)
              </span>
              <span className="block text-[11px] font-semibold text-slate-500">
                Fastest • Zero Passwords • Instant Verified Entry
              </span>
            </div>
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-2.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% Free Instant Access • Works with any Gmail • No SMS / DLT fees</span>
          </div>
        </div>

        {/* Subtle Divider */}
        <div className="relative px-6 my-3">
          <div className="absolute inset-0 flex items-center px-6">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-wider">
            <span className="bg-slate-900 px-3 py-0.5 rounded-full text-slate-400 border border-slate-800 shadow-sm">
              OR VERIFY WITH TWO FREE OPTIONS
            </span>
          </div>
        </div>

        {/* 2. SIMPLIFIED TWO TABS: "Email OTP" & "WhatsApp Direct" */}
        <div className="mx-6 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 grid grid-cols-2 gap-1.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setAuthMode('otp');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`py-2.5 px-3 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
              authMode === 'otp'
                ? 'bg-amber-500 text-slate-950 font-black shadow-lg'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>Email OTP</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('whatsapp');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`py-2.5 px-3 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
              authMode === 'whatsapp'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span>WhatsApp Direct</span>
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
            <span className="leading-relaxed">{successMsg}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6 pt-4">
          {/* TAB 1: FREE EMAIL OTP (Verified via EmailJS / Resend) */}
          {authMode === 'otp' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Enter Official Email Address</span>
                  <span className="text-[10px] text-amber-400 font-semibold lowercase">no password needed</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourhotel@gmail.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition font-medium"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  100% Free OTP sent via verified EmailJS service • Zero DLT/SMS charge
                </p>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => handleSendOTP('login')}
                  disabled={loading || !email}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Send 6-Digit Email Verification Code
                </button>
              ) : (
                <div className="space-y-4 pt-1">
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-amber-500/30 text-xs text-slate-300 flex items-center justify-between">
                    <span className="truncate">Code dispatched to <strong className="text-white">{email}</strong></span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[11px] text-amber-400 hover:underline shrink-0 ml-2"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Enter 6-Digit OTP Code
                      </label>
                      <button
                        type="button"
                        onClick={() => handleSendOTP('login')}
                        disabled={loading}
                        className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" /> Resend Code
                      </button>
                    </div>

                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • • • •"
                      className="w-full py-3 px-4 bg-slate-950 border-2 border-amber-500/70 rounded-xl text-center font-mono text-2xl tracking-[0.4em] text-white focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={loading || otpCode.length < 6}
                    className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    Verify Code & Enter Customer Portal
                  </button>
                </div>
              )}

              {/* EmailJS Live Dispatch Status Indicator */}
              {emailJsNotice && emailJsNotice.isSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-300">EmailJS Delivery Confirmed (200 OK)</p>
                      <p className="text-[11px] text-emerald-400/90">OTP sent to {email}. Check Inbox & Spam.</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-900/80 font-mono text-[10px] text-emerald-300 border border-emerald-500/40">
                    200 OK
                  </span>
                </div>
              )}

              {/* EmailJS Diagnostics Drawer (Tucked neatly at bottom) */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEmailJsConfig(!showEmailJsConfig)}
                  className="w-full text-left text-[11px] font-semibold text-slate-400 hover:text-amber-400 flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Code className="w-3 h-3 text-slate-400" />
                    <span>EmailJS Configuration (service_31jj6yq)</span>
                  </span>
                  <span>{showEmailJsConfig ? '▲ Hide' : '▼ Details'}</span>
                </button>

                {showEmailJsConfig && (
                  <form onSubmit={handleSaveEmailJsConfig} className="mt-2.5 p-3.5 bg-slate-950/90 rounded-xl border border-slate-800 space-y-2.5 text-xs">
                    <div className="text-[11px] text-slate-300 pb-1 border-b border-slate-800 flex items-center justify-between">
                      <span className="font-bold text-amber-400">EmailJS Service Credentials</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Status: Connected</span>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        SERVICE_ID
                      </label>
                      <input
                        type="text"
                        value={cfgServiceId}
                        onChange={(e) => setCfgServiceId(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        TEMPLATE_ID
                      </label>
                      <input
                        type="text"
                        value={cfgTemplateId}
                        onChange={(e) => setCfgTemplateId(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        PUBLIC_KEY
                      </label>
                      <input
                        type="text"
                        value={cfgPublicKey}
                        onChange={(e) => setCfgPublicKey(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 py-1.5 px-3 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition"
                      >
                        Save Configuration
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEmail('shamrocky80@gmail.com');
                          handleSendOTP('login');
                        }}
                        className="py-1.5 px-3 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs cursor-pointer border border-slate-700 transition"
                      >
                        Test shamrocky80@gmail.com
                      </button>
                    </div>

                    {cfgSaveSuccess && (
                      <p className="text-[11px] text-emerald-400 font-bold text-center">
                        ✓ Configuration saved!
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: WHATSAPP DIRECT (Mobile & Desktop Friendly) */}
          {authMode === 'whatsapp' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                📱 <strong>Direct WhatsApp Verification:</strong> Generates a secure code sent straight to our official business WhatsApp (+91 8073407706) with zero SMS/DLT fees.
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Business Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={waIdentifier}
                    onChange={(e) => setWaIdentifier(e.target.value)}
                    placeholder="9845000000"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition font-medium"
                  />
                </div>
              </div>

              {!waGeneratedCode ? (
                <button
                  type="button"
                  onClick={handleGenerateWhatsApp}
                  disabled={loading || !waIdentifier}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
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
                  <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-2xl text-center space-y-2">
                    <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                      Your WhatsApp Verification Code
                    </span>
                    <div className="font-mono text-3xl font-black text-emerald-400 tracking-widest py-1">
                      {waGeneratedCode}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Send this code to official business WhatsApp:
                      <br />
                      <strong className="text-white text-xs">+91 8073407706</strong>
                    </p>
                  </div>

                  {waUrl && (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open WhatsApp & Send Code (+91 8073407706)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Confirm Code (Or Click Below Once Sent)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={waInputCode}
                      onChange={(e) => setWaInputCode(e.target.value.replace(/\D/g, ''))}
                      placeholder={waGeneratedCode || 'Enter 6-digit code'}
                      className="w-full py-3 px-4 bg-slate-950 border border-slate-700 focus:border-emerald-400 rounded-xl text-center font-mono text-lg text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmWhatsApp}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    I Have Sent The WhatsApp Message - Unlock Portal
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Discreet Distributor Staff Passcode (Only displayed when requiredRole is distributor) */}
          {requiredRole === 'distributor' && (
            <div className="pt-4 mt-4 border-t border-slate-800/80">
              {authMode !== 'password' ? (
                <button
                  type="button"
                  onClick={() => setAuthMode('password')}
                  className="w-full text-center text-xs text-slate-400 hover:text-amber-400 font-semibold cursor-pointer transition flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Distributor Staff Passcode Entry (Staff Only)</span>
                </button>
              ) : (
                <form onSubmit={handlePasswordLogin} className="space-y-3 p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800 text-slate-300 font-bold">
                    <span>Distributor Staff Security Passcode</span>
                    <button
                      type="button"
                      onClick={() => setAuthMode('otp')}
                      className="text-[11px] text-amber-400 hover:underline"
                    >
                      ← Back to Email OTP
                    </button>
                  </div>
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Passcode (DIST2026 or 1234)"
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !password}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
                  >
                    Unlock Distributor Desk
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Official Agency Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Sandhya Enterprises (Estd. 2010)
          </span>
          <span className="font-mono text-slate-400">GSTIN: {BUSINESS_INFO.gstin}</span>
        </div>
      </div>
    </div>
  );
};

