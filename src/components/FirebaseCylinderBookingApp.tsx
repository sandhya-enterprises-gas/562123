import React, { useState, useEffect } from 'react';
import {
  Flame,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Truck,
  IndianRupee,
  RotateCcw,
  LogIn,
  LogOut,
  UserPlus,
  KeyRound,
  FileSpreadsheet,
  Zap,
  Phone,
  MapPin,
  RefreshCw,
  Printer,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { Language } from '../types';
import { auth, googleSignIn, emailSignIn, emailSignUp, resetPassword, logout, initAuth } from '../lib/firebaseAuth';
import {
  saveOrderToFirestore,
  subscribeToCylinderBookings,
  updateCylinderBookingStatus,
  cancelCylinderBooking,
  testFirestoreConnection
} from '../lib/firebase';
import { User } from 'firebase/auth';
import { BUSINESS_INFO } from '../data/content';

interface FirebaseCylinderBookingAppProps {
  lang: Language;
}

export const FirebaseCylinderBookingApp: React.FC<FirebaseCylinderBookingAppProps> = ({ lang }) => {
  // Firebase Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'google' | 'login' | 'signup' | 'reset'>('google');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authDisplayName, setAuthDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Firestore DB status
  const [dbConnected, setDbConnected] = useState<boolean>(true);

  // Booking Form State
  const [brand, setBrand] = useState('Bharat Gas 19kg Commercial VOT');
  const [quantity, setQuantity] = useState(2);
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('Nelamangala Town (562123)');
  const [customAddress, setCustomAddress] = useState('');
  const [pincode, setPincode] = useState('562123');
  const [priority, setPriority] = useState<'standard' | 'express'>('standard');
  const [emptyCylinders, setEmptyCylinders] = useState(2);
  const [paymentMode, setPaymentMode] = useState<'cod' | 'upi' | 'credit'>('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [orderNotice, setOrderNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Firestore Live Bookings State
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled'>('all');

  // Rates reference
  const brandPrices: Record<string, number> = {
    'Bharat Gas 19kg Commercial VOT': 1850,
    'Go Gas Commercial 19kg': 1790,
    'Go Gas 33kg Maxima LOT': 3150,
    'Bharat Gas 47.5kg Industrial': 4450
  };

  const estimatedTotal = (brandPrices[brand] || 1850) * quantity;

  // Listen to Auth State
  useEffect(() => {
    const unsub = initAuth((user) => {
      setCurrentUser(user);
      if (user) {
        if (!contactPerson) setContactPerson(user.displayName || '');
        if (!authEmail) setAuthEmail(user.email || '');
      }
    }, () => {
      setCurrentUser(null);
    });

    // Check Firestore connection
    testFirestoreConnection().then(setDbConnected);

    return () => unsub();
  }, []);

  // Listen to Firestore Cylinder Bookings in real-time
  useEffect(() => {
    setBookingsLoading(true);
    const unsubBookings = subscribeToCylinderBookings((list) => {
      setBookings(list);
      setBookingsLoading(false);
    }, (err) => {
      console.warn('Firestore subscription error:', err);
      setBookingsLoading(false);
    });

    return () => unsubBookings();
  }, []);

  // Auth Handlers
  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    setAuthError('');
    setAuthSuccess('');
    try {
      const res = await googleSignIn();
      if (res?.user) {
        setAuthSuccess(
          lang === 'kn'
            ? `ಸ್ವಾಗತ! ${res.user.displayName || res.user.email} ಗೂಗಲ್ ಮೂಲಕ ಯಶಸ್ವಿಯಾಗಿ ಲಾಗಿನ್ ಆಗಿದೆ.`
            : `Welcome! Successfully signed in via Google as ${res.user.displayName || res.user.email}.`
        );
      }
    } catch (err: any) {
      setAuthError(err.message || 'Google Sign-In failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ.' : 'Please enter email and password.');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    setAuthSuccess('');
    try {
      const user = await emailSignIn(authEmail, authPassword);
      setAuthSuccess(
        lang === 'kn'
          ? `ಸ್ವಾಗತ! ${user.email} ಯಶಸ್ವಿಯಾಗಿ ಲಾಗಿನ್ ಆಗಿದೆ.`
          : `Signed in successfully as ${user.email}.`
      );
    } catch (err: any) {
      setAuthError(err.message || 'Invalid email or password.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ.' : 'Please enter email and password.');
      return;
    }
    if (authPassword.length < 6) {
      setAuthError(lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳಾಗಿರಬೇಕು.' : 'Password must be at least 6 characters.');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    setAuthSuccess('');
    try {
      const user = await emailSignUp(authEmail, authPassword, authDisplayName || businessName);
      setAuthSuccess(
        lang === 'kn'
          ? `ಖಾತೆ ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ! ಸ್ವಾಗತ ${user.email}.`
          : `Account created successfully! Welcome ${user.email}.`
      );
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) {
      setAuthError(lang === 'kn' ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ.' : 'Please enter your registered email.');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    setAuthSuccess('');
    try {
      await resetPassword(authEmail);
      setAuthSuccess(
        lang === 'kn'
          ? 'ಪಾಸ್‌ವರ್ಡ್ ರೀಸೆಟ್ ಲಿಂಕ್ ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.'
          : 'Password reset link sent to your email.'
      );
    } catch (err: any) {
      setAuthError(err.message || 'Failed to send password reset email.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAuthSuccess(lang === 'kn' ? 'ಯಶಸ್ವಿಯಾಗಿ ನಿರ್ಗಮಿಸಲಾಗಿದೆ.' : 'Logged out successfully.');
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  // Cylinder Booking Submission to Firestore
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalContact = contactPerson.trim() || currentUser?.displayName || 'Commercial Partner';
    const finalPhone = phone.trim() || '9845112233';
    const fullAddress = `${customAddress ? `${customAddress.trim()}, ` : ''}${deliveryArea}`;

    if (!deliveryArea) {
      setOrderNotice({
        type: 'error',
        message: lang === 'kn' ? 'ದಯವಿಟ್ಟು ಡೆಲಿವರಿ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ.' : 'Please select delivery area.'
      });
      return;
    }

    setSubmittingOrder(true);
    setOrderNotice(null);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `SE-ORD-${Date.now()}-${randomSuffix}`;
    const orderNumber = `SE-${new Date().getFullYear()}-${randomSuffix}`;

    const orderPayload = {
      id: orderId,
      orderNumber,
      customerId: currentUser?.uid || 'guest-portal',
      businessName: businessName.trim() || 'Sandhya Partner Firm',
      contactPerson: finalContact,
      phone: finalPhone,
      brand,
      cylinderType: brand.includes('47.5kg') ? '47.5kg Industrial' : brand.includes('33kg') ? '33kg LOT' : '19kg Commercial VOT',
      quantity: Number(quantity),
      deliveryArea: fullAddress,
      pincode: pincode || '562123',
      status: 'pending' as const,
      totalAmount: estimatedTotal,
      paymentStatus: (paymentMode === 'credit' ? 'credit' : 'pending') as 'pending' | 'credit' | 'paid' | 'cod',
      emptyCylindersReturned: Number(emptyCylinders),
      notes: `${priority === 'express' ? '[⚡ EXPRESS 2-HOUR PRIORITY] ' : ''}${orderNotes ? orderNotes.trim() : 'Standard commercial supply dispatch'}`,
      createdAt: new Date().toISOString()
    };

    try {
      await saveOrderToFirestore(orderPayload);
      setOrderNotice({
        type: 'success',
        message:
          lang === 'kn'
            ? `ಬುಕಿಂಗ್ ಯಶಸ್ವಿಯಾಗಿದೆ! ಆರ್ಡರ್ ನಂ: ${orderNumber}. ನಿಮ್ಮ ಸಿಲಿಂಡರ್ ಆರ್ಡರ್ Firestore ಡೇಟಾಬೇಸ್‌ಗೆ ತಲುಪಿದೆ.`
            : `Booking confirmed! Order #${orderNumber} securely saved to Firestore Database.`
      });
      // Reset form slightly
      setOrderNotes('');
      setCustomAddress('');
    } catch (err: any) {
      setOrderNotice({
        type: 'error',
        message: err.message || 'Failed to save booking to Firestore. Please try again.'
      });
    } finally {
      setSubmittingOrder(false);
    }
  };

  // Status Update / Cancel in Firestore
  const handleUpdateStatus = async (orderId: string, newStatus: any) => {
    try {
      await updateCylinderBookingStatus(orderId, newStatus);
    } catch (err: any) {
      console.error('Status update failed:', err);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm(lang === 'kn' ? 'ಈ ಸಿಲಿಂಡರ್ ಆರ್ಡರ್ ರದ್ದುಗೊಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?' : 'Are you sure you want to cancel this booking?')) {
      try {
        await cancelCylinderBooking(orderId);
      } catch (err: any) {
        console.error('Cancel order failed:', err);
      }
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.status === statusFilter;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Top Banner: Sandhya Enterprises Firebase Gas Agency System */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 rounded-3xl p-6 sm:p-8 text-white border-2 border-orange-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-600 text-white shadow-md">
                <Flame className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
                <span>Sandhya Enterprises Gas Agency</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Firebase Auth & Firestore Live</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {lang === 'kn'
                ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಗ್ಯಾಸ್ ಏಜೆನ್ಸಿ • ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ & ನಿರ್ವಹಣೆ'
                : 'Sandhya Enterprises Gas Agency • Cylinder Booking & Management'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'kn'
                ? 'Firebase Auth (Gmail / Email Login) ಮತ್ತು Firestore Database ಆಧಾರಿತ ನೇರ ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ ವ್ಯವಸ್ಥೆ. ಎಲ್ಲಾ ಆರ್ಡರ್‌ಗಳು ತಕ್ಷಣವೇ ಲೈವ್ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಅಪ್‌ಡೇಟ್ ಆಗುತ್ತವೆ.'
                : 'Direct commercial LPG cylinder booking platform powered by Firebase Auth (Email/Google login) and Firestore Database for real-time dispatch.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <MapPin className="w-3.5 h-3.5" />
                Nelamangala, Tumkur, Bangalore Rural
              </span>
              <span>•</span>
              <span className="font-mono text-slate-300">GSTIN: {BUSINESS_INFO.gstin}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">Project: project-13dfadf0-78c5-47ec-bca</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[10px] font-black uppercase text-slate-400 block">Total Firestore Bookings</span>
              <span className="text-2xl font-black text-orange-400">{bookings.length}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[10px] font-black uppercase text-slate-400 block">Active In-Transit</span>
              <span className="text-2xl font-black text-emerald-400">
                {bookings.filter((b) => b.status === 'dispatched' || b.status === 'confirmed').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: FIREBASE AUTHENTICATION (EMAIL/PASSWORD & GOOGLE) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600/10 text-orange-600 flex items-center justify-center shrink-0 border border-orange-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {lang === 'kn' ? '1. Firebase ದೃಢೀಕರಣ (Email & Google Login)' : '1. Firebase Authentication (Email & Google)'}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'kn'
                  ? 'ನಿಮ್ಮ ಖಾತೆಗೆ ಇಮೇಲ್ ಅಥವಾ ಗೂಗಲ್ ಮೂಲಕ ಲಾಗಿನ್ ಆಗಿ ನಿಮ್ಮ ಬುಕಿಂಗ್ ಇತಿಹಾಸವನ್ನು ನಿರ್ವಹಿಸಿ.'
                  : 'Authenticate securely using Google or Email/Password to manage your bookings.'}
              </p>
            </div>
          </div>

          {currentUser && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ನಿರ್ಗಮಿಸಿ (Sign Out)' : 'Sign Out'}</span>
            </button>
          )}
        </div>

        {/* Auth State Feedback Alerts */}
        {authError && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {authSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{authSuccess}</span>
          </div>
        )}

        {currentUser ? (
          /* Logged In User Profile Banner */
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
                {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-base text-white">
                    {currentUser.displayName || 'Commercial Client'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ✓ Verified via Firebase
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5 flex flex-wrap items-center gap-2">
                  <span>{currentUser.email}</span>
                  <span>•</span>
                  <span className="font-mono text-[10px] text-slate-400">UID: {currentUser.uid.slice(0, 14)}...</span>
                  <span>•</span>
                  <span className="text-orange-400 font-bold">
                    Provider: {currentUser.providerData[0]?.providerId === 'google.com' ? 'Google Account' : 'Email/Password'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] text-emerald-400 font-bold block">
                {lang === 'kn' ? '✓ ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್‌ಗೆ ಸಿದ್ಧವಾಗಿದೆ' : '✓ Ready for Instant Booking'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Firestore DB Synced</span>
            </div>
          </div>
        ) : (
          /* Unauthenticated Auth Selector */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 5 Cols: 1-Click Google Sign-In */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-center flex flex-col justify-between h-full">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-700">
                  {lang === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ' : 'Recommended'}
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {lang === 'kn' ? 'Google (Gmail) 1-ಕ್ಲಿಕ್ ಲಾಗಿನ್' : '1-Click Google Login'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'kn'
                    ? 'ಯಾವುದೇ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಒಟಿಪಿ ಇಲ್ಲದೆ ನಿಮ್ಮ ಜಿಮೇಲ್ ಮೂಲಕ ತಕ್ಷಣ ಲಾಗಿನ್ ಆಗಿ.'
                    : 'Sign in instantly with your verified Google account with zero passwords needed.'}
                </p>
              </div>

              <div className="py-2">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={authLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-3 border-2 border-slate-200 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>{lang === 'kn' ? 'Google ಮೂಲಕ ನೇರ ಲಾಗಿನ್' : 'Sign In with Google'}</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-400 font-semibold block">
                {lang === 'kn' ? '100% ಸುರಕ್ಷಿತ & ಗೂಗಲ್ ಎನ್‌ಕ್ರಿಪ್ಟ್' : 'Secured by Google Identity Services'}
              </span>
            </div>

            {/* Right 7 Cols: Email / Password Auth Form */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
              {/* Form Mode Selector */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    authMode === 'login' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5 inline mr-1" />
                  {lang === 'kn' ? 'ಇಮೇಲ್ ಲಾಗಿನ್' : 'Email Sign In'}
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    authMode === 'signup' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5 inline mr-1" />
                  {lang === 'kn' ? 'ಹೊಸ ಖಾತೆ ತೆರೆಯಿರಿ' : 'Register / Sign Up'}
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('reset')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    authMode === 'reset' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5 inline mr-1" />
                  {lang === 'kn' ? 'ರೀಸೆಟ್' : 'Reset'}
                </button>
              </div>

              {/* Email Login Form */}
              {authMode === 'login' && (
                <form onSubmit={handleEmailLogin} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      {lang === 'kn' ? 'ಇಮೇಲ್ ವಿಳಾಸ' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="client@sandhyalpg.in"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      {lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್' : 'Password'}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {authLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                    <span>{lang === 'kn' ? 'ಇಮೇಲ್ ಮೂಲಕ ಲಾಗಿನ್' : 'Sign In with Email'}</span>
                  </button>
                </form>
              )}

              {/* Email Sign Up Form */}
              {authMode === 'signup' && (
                <form onSubmit={handleEmailSignUp} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      {lang === 'kn' ? 'ಹೆಸರು / ಸಂಸ್ಥೆಯ ಹೆಸರು' : 'Name / Business Name'}
                    </label>
                    <input
                      type="text"
                      value={authDisplayName}
                      onChange={(e) => setAuthDisplayName(e.target.value)}
                      placeholder="Hotel Udupi / Ramesh"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      {lang === 'kn' ? 'ಇಮೇಲ್ ವಿಳಾಸ' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="client@sandhyalpg.in"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      {lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್ (ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳು)' : 'Password (min. 6 chars)'}
                    </label>
                    <input
                      type="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {authLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                    <span>{lang === 'kn' ? 'ಖಾತೆ ರಚಿಸಿ (Create Account)' : 'Create Firebase Account'}</span>
                  </button>
                </form>
              )}

              {/* Password Reset Form */}
              {authMode === 'reset' && (
                <form onSubmit={handlePasswordReset} className="space-y-3">
                  <p className="text-xs text-slate-400">
                    {lang === 'kn'
                      ? 'ನಿಮ್ಮ ನೋಂದಾಯಿತ ಇಮೇಲ್ ನಮೂದಿಸಿ, ಪಾಸ್‌ವರ್ಡ್ ರೀಸೆಟ್ ಲಿಂಕ್ ಕಳುಹಿಸಲಾಗುವುದು.'
                      : 'Enter your registered email and we will send you a password reset link.'}
                  </p>
                  <div>
                    <input
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="client@sandhyalpg.in"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>{lang === 'kn' ? 'ರೀಸೆಟ್ ಇಮೇಲ್ ಕಳುಹಿಸಿ' : 'Send Reset Link'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: FIRESTORE CYLINDER BOOKING FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Interactive Firestore Booking Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {lang === 'kn' ? '2. ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ ಫಾರ್ಮ್ (Firestore)' : '2. Cylinder Booking Form (Firestore)'}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'kn'
                  ? 'ಸಲ್ಲಿಸಲಾದ ಪ್ರತಿಯೊಂದು ಬುಕಿಂಗ್ ನೇರವಾಗಿ Firestore Database ನ orders ಸಂಗ್ರಹಕ್ಕೆ ದಾಖಲಾಗುತ್ತದೆ.'
                  : 'Submissions are stored directly in Firestore Database `orders` collection.'}
              </p>
            </div>
          </div>

          {orderNotice && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold flex items-start gap-2.5 ${
                orderNotice.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                  : 'bg-red-50 border border-red-300 text-red-800'
              }`}
            >
              {orderNotice.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span>{orderNotice.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {/* Brand Selection */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-2">
                {lang === 'kn' ? 'LPG ಬ್ರಾಂಡ್ & ಸಿಲಿಂಡರ್ ವಿಧ' : 'Select LPG Brand & Type'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Bharat Gas 19kg Commercial VOT', desc: 'Hotel & Restaurant Standard', price: 1850 },
                  { name: 'Go Gas Commercial 19kg', desc: 'Fast Heat Output', price: 1790 },
                  { name: 'Go Gas 33kg Maxima LOT', desc: 'Heavy Catering & Bakery', price: 3150 },
                  { name: 'Bharat Gas 47.5kg Industrial', desc: 'Factory & Heavy Manufacturing', price: 4450 }
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setBrand(item.name)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      brand === item.name
                        ? 'border-orange-600 bg-orange-50/70 ring-2 ring-orange-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-slate-900 block">{item.name}</span>
                      <span className="text-xs font-black text-orange-600">₹{item.price}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and MT Cylinders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಪ್ರಮಾಣ (Quantity)' : 'Cylinder Quantity'}
                </label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-10 flex items-center justify-center font-black text-base text-slate-600 hover:bg-slate-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-sm text-slate-900">{quantity} Cylinders</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(50, quantity + 1))}
                    className="w-12 h-10 flex items-center justify-center font-black text-base text-slate-600 hover:bg-slate-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  {lang === 'kn' ? 'ವಾಪಸಾತಿ ಖಾಲಿ (MT) ಸಿಲಿಂಡರ್‌ಗಳು' : 'Empty (MT) Cylinders to Return'}
                </label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setEmptyCylinders(Math.max(0, emptyCylinders - 1))}
                    className="w-12 h-10 flex items-center justify-center font-black text-base text-slate-600 hover:bg-slate-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-sm text-amber-600">{emptyCylinders} MT</span>
                  <button
                    type="button"
                    onClick={() => setEmptyCylinders(emptyCylinders + 1)}
                    className="w-12 h-10 flex items-center justify-center font-black text-base text-slate-600 hover:bg-slate-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1">
                  {lang === 'kn' ? 'ಸಂಸ್ಥೆ / ಹೋಟೆಲ್ ಹೆಸರು' : 'Business / Hotel Name'}
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Udupi Grand / Factory"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1">
                  {lang === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9845112233"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Delivery Area & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1">
                  {lang === 'kn' ? 'ಡೆಲಿವರಿ ವಲಯ (Zone)' : 'Delivery Zone'}
                </label>
                <select
                  value={deliveryArea}
                  onChange={(e) => setDeliveryArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                >
                  <option value="Nelamangala Town (562123)">Nelamangala Town (562123)</option>
                  <option value="Sondekoppa Road, Nelamangala">Sondekoppa Road, Nelamangala</option>
                  <option value="Binnamangala Industrial Area">Binnamangala Industrial Area</option>
                  <option value="Dobbaspet Industrial Area">Dobbaspet Industrial Area</option>
                  <option value="Tumkur Road Tollway">Tumkur Road Tollway</option>
                  <option value="Sira Town & Rural">Sira Town & Rural</option>
                  <option value="Bangalore Rural District">Bangalore Rural District</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1">
                  {lang === 'kn' ? 'ವಿಳಾಸ / ಲ್ಯಾಂಡ್‌ಮಾರ್ಕ್' : 'Address / Landmark'}
                </label>
                <input
                  type="text"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  placeholder="Near BGS Circle / Opp. Bus Stand"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Delivery Priority & Payment Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1">
                  {lang === 'kn' ? 'ಡೆಲಿವರಿ ಆದ್ಯತೆ' : 'Delivery Priority'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPriority('standard')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
                      priority === 'standard'
                        ? 'border-orange-600 bg-orange-50 text-orange-700 font-black'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{lang === 'kn' ? 'ಸಾಮಾನ್ಯ (Same-Day)' : 'Standard (Same Day)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority('express')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
                      priority === 'express'
                        ? 'border-red-600 bg-red-50 text-red-700 font-black'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Zap className="w-3 h-3 inline mr-1 text-red-600" />
                    <span>{lang === 'kn' ? 'ತುರ್ತು (2 Hours)' : 'Express (2-Hour)'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1">
                  {lang === 'kn' ? 'ಪಾವತಿ ವಿಧಾನ' : 'Payment Method'}
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                >
                  <option value="cod">Cash on Delivery (COD)</option>
                  <option value="upi">UPI on Delivery (GPay / PhonePe)</option>
                  <option value="credit">7-Day Commercial Khata / Credit</option>
                </select>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1">
                {lang === 'kn' ? 'ಸೂಚನೆಗಳು (ಐಚ್ಛಿಕ)' : 'Special Instructions (Optional)'}
              </label>
              <input
                type="text"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="e.g. Call before delivery, unload at kitchen rear"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Price Preview & Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block">Estimated Amount</span>
                <span className="text-2xl font-black text-slate-900">₹{estimatedTotal.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500 block">Inclusive of GST & Doorstep Handling</span>
              </div>

              <button
                type="submit"
                disabled={submittingOrder}
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {submittingOrder ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4" />}
                <span>
                  {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಬುಕ್ ಮಾಡಿ (Save to Firestore)' : 'Confirm Booking to Firestore'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 5 Cols: Agency Guarantee & Direct AppSheet Backup */}
        <div className="lg:col-span-5 space-y-5">
          {/* Firestore Connection Card */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-orange-400">Database Status</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Connected</span>
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Database ID:</span>
                <span className="font-mono text-[11px] text-amber-300">ai-studio-sandhyaenterpris</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Orders Collection:</span>
                <span className="font-mono text-[11px] text-emerald-300">/orders</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Users Collection:</span>
                <span className="font-mono text-[11px] text-emerald-300">/users</span>
              </div>
            </div>
          </div>

          {/* Sandhya Direct Dispatch Hotline */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 text-slate-900 space-y-3 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-600 text-white">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-orange-800 block">24/7 Agency Hotline</span>
                <span className="text-base font-black text-slate-900">+91 {BUSINESS_INFO.phonePrimary}</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'kn'
                ? 'ಯಾವುದೇ ತುರ್ತು ಸಿಲಿಂಡರ್ ಅಗತ್ಯತೆ, ಲೀಕೇಜ್ ಅಥವಾ ಬಲ್ಕ್ ಬುಕಿಂಗ್‌ಗೆ ನೇರವಾಗಿ ನಮ್ಮ ಡೆಲಿವರಿ ಕಂಟ್ರೋಲ್ ರೂಮ್‌ಗೆ ಕರೆ ಮಾಡಿ.'
                : 'For emergency cylinder dispatch, gas leakage support, or bulk inquiries, contact dispatch control directly.'}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: REAL-TIME FIRESTORE BOOKINGS DASHBOARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  {lang === 'kn' ? '3. ಲೈವ್ ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್‌ಗಳ ನಿರ್ವಹಣೆ' : '3. Real-Time Cylinder Bookings Dashboard'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                  Live Firestore
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {lang === 'kn'
                  ? 'Firestore ಡೇಟಾಬೇಸ್‌ನಿಂದ ರಿಯಲ್-ಟೈಮ್‌ನಲ್ಲಿ ಸಿಂಕ್ ಆಗುವ ಎಲ್ಲಾ ಬುಕಿಂಗ್‌ಗಳ ಪಟ್ಟಿ.'
                  : 'Real-time synchronization directly from Firestore database collection.'}
              </p>
            </div>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {(['all', 'pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg capitalize transition cursor-pointer ${
                  statusFilter === st
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {bookingsLoading ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-orange-600" />
            <span className="text-xs font-bold block">Loading orders from Firestore...</span>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
            <Flame className="w-8 h-8 mx-auto text-slate-400" />
            <span className="text-sm font-bold text-slate-700 block">
              {lang === 'kn' ? 'ಯಾವುದೇ ಬುಕಿಂಗ್ ದಾಖಲೆಗಳಿಲ್ಲ.' : 'No cylinder bookings found for this filter.'}
            </span>
            <span className="text-xs text-slate-400 block">
              {lang === 'kn' ? 'ಹೊಸ ಸಿಲಿಂಡರ್ ಬುಕ್ ಮಾಡಲು ಮೇಲಿನ ಫಾರ್ಮ್ ಬಳಸಿ.' : 'Use the booking form above to create your first order.'}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.map((order) => {
              const isPending = order.status === 'pending';
              const isConfirmed = order.status === 'confirmed';
              const isDispatched = order.status === 'dispatched';
              const isDelivered = order.status === 'delivered';
              const isCancelled = order.status === 'cancelled';

              return (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-orange-300 transition shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-mono text-xs font-black text-slate-900">{order.orderNumber}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          isPending
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : isConfirmed
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : isDispatched
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : isDelivered
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-black text-sm text-slate-900">{order.businessName || order.contactPerson}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{order.deliveryArea}</span>
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>{order.brand}</span>
                        <span>x{order.quantity}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>MT Returned: {order.emptyCylindersReturned || 0}</span>
                        <span className="font-black text-slate-900">₹{order.totalAmount?.toLocaleString()}</span>
                      </div>
                    </div>

                    {order.notes && (
                      <p className="text-[11px] text-slate-500 italic bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                        "{order.notes}"
                      </p>
                    )}
                  </div>

                  {/* Order Management Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Today'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isPending && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                            className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[10px] transition"
                            title="Confirm Order"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCancelOrder(order.id)}
                            className="px-2 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-bold text-[10px] transition"
                            title="Cancel Order"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {isConfirmed && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(order.id, 'dispatched')}
                          className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-[10px] transition"
                        >
                          Dispatch
                        </button>
                      )}

                      {isDispatched && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(order.id, 'delivered')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[10px] transition"
                        >
                          Mark Delivered
                        </button>
                      )}

                      {isDelivered && (
                        <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Delivered
                        </span>
                      )}

                      {isCancelled && (
                        <span className="text-red-500 font-bold text-[10px] flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Cancelled
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
