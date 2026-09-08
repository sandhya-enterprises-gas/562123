import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Inbox,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Truck,
  Shield,
  LogOut,
  User as UserIcon,
  Clock,
  ChevronRight,
  ExternalLink,
  Info,
  Building,
  DollarSign
} from 'lucide-react';
import { Language } from '../../types';
import {
  initAuth,
  googleSignInWithGmail,
  logout,
  getAccessToken
} from '../../lib/firebaseAuth';
import {
  fetchGmailMessages,
  sendGmailMessage,
  GmailMessageItem,
  SendEmailPayload
} from '../../lib/gmailService';
import type { User } from 'firebase/auth';

interface GmailHubProps {
  lang: Language;
}

export const GmailHub: React.FC<GmailHubProps> = ({ lang }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Messages state
  const [messages, setMessages] = useState<GmailMessageItem[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<GmailMessageItem | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Tab & Compose State
  const [activeTab, setActiveTab] = useState<'inbox' | 'compose'>('inbox');
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [composeCategory, setComposeCategory] = useState<'order_confirmation' | 'tax_invoice' | 'safety_certificate' | 'general'>('order_confirmation');

  // Confirmation Modal State (MANDATORY per Workspace Skill)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [sendSuccessNotice, setSendSuccessNotice] = useState<string | null>(null);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsub = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
        if (token) {
          loadMessages(token);
        }
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
        setMessages([]);
      }
    );
    return () => unsub();
  }, []);

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setErrorMsg(null);
    try {
      const result = await googleSignInWithGmail();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
        await loadMessages(result.accessToken);
      }
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setErrorMsg(err.message || 'Failed to authenticate with Google. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setCurrentUser(null);
    setAccessToken(null);
    setMessages([]);
    setSelectedMessage(null);
  };

  const loadMessages = async (token: string, query = '') => {
    setLoadingMessages(true);
    setErrorMsg(null);
    try {
      const list = await fetchGmailMessages(token, 15, query);
      setMessages(list);
      if (list.length > 0 && !selectedMessage) {
        setSelectedMessage(list[0]);
      }
    } catch (err: any) {
      console.error('Error fetching messages:', err);
      setErrorMsg(err.message || 'Failed to load messages from Gmail.');
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleRefresh = async () => {
    const token = accessToken || (await getAccessToken());
    if (token) {
      loadMessages(token, searchQuery);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken) {
      loadMessages(accessToken, searchQuery);
    }
  };

  // Pre-fill Commercial LPG Email Templates
  const applyTemplate = (type: 'order_confirmation' | 'tax_invoice' | 'safety_certificate') => {
    setComposeCategory(type);
    if (type === 'order_confirmation') {
      setComposeSubject('Commercial LPG Cylinder Dispatch Confirmation - Sandhya Enterprises [Nelamangala]');
      setComposeBody(
`Dear Customer / Store Manager,

Greetings from Sandhya Enterprises (Official Commercial LPG Gas Agency, Nelamangala Hub).

This is to confirm that your commercial LPG cylinder order has been processed and scheduled for express dispatch.

ORDER DETAILS:
------------------------------------------
Agency: Sandhya Enterprises (Nelamangala / Dobbaspet Corridor)
Cylinder Brand: Bharat Gas 19kg Commercial
Quantity: 10 Cylinders
Billing Rate: As per today's official commercial rate
Empty Cylinders to Return (MT): 10 Empties
Delivery Vehicle / Truck: KA-52 Express Dispatch
Estimated Arrival: Within 2 hours
Helpline / Urgent Support: +91 8152889500 / +91 9902641042

SAFETY CHECKLIST AT DELIVERY:
1. Ensure O-Ring leak test is conducted with soap solution.
2. Verify tare weight and net weight seal integrity.

Thank you for choosing Sandhya Enterprises for your commercial kitchen energy needs.

Warm regards,
Sandhya Enterprises Dispatch Desk
Nelamangala Town, Bangalore Rural - 562123
Phone: 8152889500 / 9902641042`
      );
    } else if (type === 'tax_invoice') {
      setComposeSubject('GST Tax Invoice & Monthly Cylinder Account Statement - Sandhya Enterprises');
      setComposeBody(
`Dear Accounts / Finance Team,

Please find below the billing statement for Commercial LPG Cylinders supplied by Sandhya Enterprises for the current billing cycle.

INVOICE SUMMARY:
------------------------------------------
Supplier: Sandhya Enterprises (Commercial LPG Gas Agency)
Proprietor: Ramakrishnaiah
GSTIN: 29CJXPR4809J1Z6
UDYAM Reg: UDYAM-KR-02-0049972
Customer Business: Commercial Establishment
SAC / HSN Code: 27111200 (Liquified Petroleum Gas)
Total Cylinders Supplied: 25 x 19kg Bharat Gas Commercial
Total Amount Billed: ₹ 46,250.00
Empty Cylinders Reconciled: 25 Returned / 0 Pending
Payment Terms: Within 7 Days via NEFT/RTGS/UPI

Bank Transfer Details:
Account Name: Sandhya Enterprises (Pro: Ramakrishnaiah)
Bank: State Bank of India, Nelamangala Branch
UPI ID: 8152889500@upi

For billing ledger reconciliation, reply directly to this email or call our accounts desk at 8152889500.

Sincerely,
Accounts & Billing Department (Pro: Ramakrishnaiah)
Sandhya Enterprises
GSTIN: 29CJXPR4809J1Z6 | UDYAM: UDYAM-KR-02-0049972`
      );
    } else if (type === 'safety_certificate') {
      setComposeSubject('VOT/LOT Commercial Pipeline Manifold Safety Compliance Certificate');
      setComposeBody(
`Dear Facility Operations Manager,

This email certifies that the Commercial LPG Pipeline, VOT/LOT Manifold Cylinder Bank, and high-pressure copper pig-tails installed at your premises have been inspected by certified technicians from Sandhya Enterprises.

INSPECTION SUMMARY:
------------------------------------------
Premises Inspected: Commercial Kitchen & Manifold Bank
Inspection Date: ${new Date().toLocaleDateString('en-IN')}
Manifold Bank Type: 4+4 Cylinder VOT/LOT System
Pressure Regulators: Dual-Stage PESO Approved
Pigtail Integrity: Zero Leaks Detected (Soap & Hydrostatic Checked)
Emergency Shut-off Valve: Accessible & Tested Functional
Fire Safety & Distance Norms: Compliant with Gas Cylinders Rules 2016
Next Scheduled Safety Audit: 6 Months from today

In case of any odor of gas or emergency, immediately close all manifold valves and dial our 24/7 technical hotline: 8152889500.

Safety Officer & Technical Lead
Sandhya Enterprises Commercial LPG Solutions`
      );
    }
  };

  // Initiate Send Flow -> Triggers Mandatory Confirmation Dialog
  const handleInitiateSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()) {
      setErrorMsg('Please complete recipient email, subject, and message text.');
      return;
    }
    setErrorMsg(null);
    setIsConfirmModalOpen(true);
  };

  // Confirmed Send Operation
  const handleConfirmSend = async () => {
    const token = accessToken || (await getAccessToken());
    if (!token) {
      setErrorMsg('Google OAuth token is missing. Please sign in again.');
      setIsConfirmModalOpen(false);
      return;
    }

    setIsSendingEmail(true);
    setErrorMsg(null);
    try {
      const payload: SendEmailPayload = {
        to: composeTo.trim(),
        subject: composeSubject.trim(),
        bodyText: composeBody.trim(),
        category: composeCategory
      };

      await sendGmailMessage(token, payload);
      setIsConfirmModalOpen(false);
      setSendSuccessNotice(`Email successfully sent to ${composeTo}!`);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      setTimeout(() => {
        setSendSuccessNotice(null);
        setActiveTab('inbox');
        loadMessages(token);
      }, 2500);
    } catch (err: any) {
      console.error('Error sending message via Gmail:', err);
      setErrorMsg(err.message || 'Failed to send email. Please check your Gmail connection.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-100 text-red-950 text-[10px] font-black uppercase tracking-wider border border-red-200">
              <Mail className="w-3.5 h-3.5 text-red-600" />
              <span>{lang === 'kn' ? 'ಅಧಿಕೃತ ಜಿಮೇಲ್ ಕೇಂದ್ರ' : 'OFFICIAL GMAIL COMMUNICATIONS DESK'}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              {lang === 'kn' ? (
                <>
                  ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್{' '}
                  <span className="text-red-600">ಜಿಮೇಲ್ & ಇನ್‌ವಾಯ್ಸ್ ಕೇಂದ್ರ</span>
                </>
              ) : (
                <>
                  Sandhya Enterprises{' '}
                  <span className="text-red-600">Gmail Dispatch & Correspondence</span>
                </>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {lang === 'kn'
                ? 'ಗ್ರಾಹಕರ ಆರ್ಡರ್ ದೃಢೀಕರಣ, ಜಿಎಸ್‌ಟಿ ಟ್ಯಾಕ್ಸ್ ಇನ್‌ವಾಯ್ಸ್‌ಗಳು ಮತ್ತು ಗ್ಯಾಸ್ ಪೈಪ್‌ಲೈನ್ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ನಿಮ್ಮ ಅಧಿಕೃತ ಗೂಗಲ್ ಖಾತೆಯ ಮೂಲಕ ನೇರವಾಗಿ ಕಳುಹಿಸಿ ಮತ್ತು ಇನ್‌ಬಾಕ್ಸ್ ಸಂದೇಶಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
                : 'Directly manage customer order confirmations, GST tax invoices, and pipeline safety certificates using your authenticated Google Workspace Gmail account.'}
            </p>
          </div>

          {/* Google Auth Status / Actions */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-9 h-9 rounded-full border border-slate-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-black text-xs">
                    {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                  </div>
                )}
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 truncate max-w-[160px]">
                    {currentUser.displayName || 'Connected Account'}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[160px]">
                    {currentUser.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // Official "Sign in with Google" button per Workspace Skill Specification
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 shadow-xs font-semibold text-xs transition-all disabled:opacity-60"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
                <span>{isLoggingIn ? 'Connecting...' : 'Sign in with Google to Connect Gmail'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Notices & Alerts */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {sendSuccessNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-bold animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{sendSuccessNotice}</span>
          </div>
        )}

        {!currentUser ? (
          // Unauthenticated Landing state with clear benefit highlights
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center mx-auto shadow-xs">
              <Mail className="w-8 h-8" />
            </div>
            <div className="max-w-xl mx-auto space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                {lang === 'kn'
                  ? 'ನಿಮ್ಮ ಜಿಮೇಲ್ ಖಾತೆಯೊಂದಿಗೆ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಪರ್ಕಿಸಿ'
                  : 'Connect Your Google Account with Gmail Permissions'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'kn'
                  ? 'ಗ್ರಾಹಕರ ವಾಣಿಜ್ಯ ಸಿಲಿಂಡರ್ ಆರ್ಡರ್‌ಗಳಿಗೆ ತ್ವರಿತ ಇಮೇಲ್ ರಶೀದಿಗಳನ್ನು ಕಳುಹಿಸಲು ಮತ್ತು ಇನ್‌ವಾಯ್ಸ್‌ಗಳನ್ನು ರವಾನಿಸಲು ಗೂಗಲ್ ಮೂಲಕ ಲಾಗಿನ್ ಆಗಿ. ಇದು ಅಧಿಕೃತ Google OAuth 2.0 ಸುರಕ್ಷಿತ ಸಂಪರ್ಕವನ್ನು ಬಳಸುತ್ತದೆ.'
                  : 'Send real booking confirmations, dispatch GST invoices, and read business inquiries directly from your Gmail account with official OAuth permission.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <Truck className="w-5 h-5 text-orange-600" />
                <div className="text-xs font-black text-slate-900 uppercase">Dispatch Receipts</div>
                <div className="text-[11px] text-slate-600">Send instant delivery notices to hotels and industrial canteens.</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <div className="text-xs font-black text-slate-900 uppercase">GST Tax Invoices</div>
                <div className="text-[11px] text-slate-600">Mail monthly ledger statements and bank transfer receipts.</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <Shield className="w-5 h-5 text-blue-600" />
                <div className="text-xs font-black text-slate-900 uppercase">Safety Compliance</div>
                <div className="text-[11px] text-slate-600">Share VOT/LOT manifold inspection reports with clients.</div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-60"
              >
                <Mail className="w-4 h-4 text-red-400" />
                <span>{isLoggingIn ? 'Authorizing in Google...' : 'Sign In with Google to Activate'}</span>
              </button>
            </div>
          </div>
        ) : (
          // Authenticated Gmail Workspace Area
          <div className="space-y-4">
            {/* View Selector Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('inbox')}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
                    activeTab === 'inbox'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5 text-red-500" />
                  <span>Inbox & Messages ({messages.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('compose')}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
                    activeTab === 'compose'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Compose Official Email</span>
                </button>
              </div>

              {activeTab === 'inbox' && (
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={loadingMessages}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin text-orange-600' : ''}`} />
                  <span>Refresh</span>
                </button>
              )}
            </div>

            {/* TAB 1: INBOX & MESSAGES */}
            {activeTab === 'inbox' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Message List (Left 5 Cols) */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
                  {/* Search Bar */}
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search messages, e.g. LPG, Order..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-hidden focus:border-red-500 text-slate-900"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  </form>

                  {/* Messages Scrollable List */}
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 no-scrollbar">
                    {loadingMessages ? (
                      <div className="py-12 text-center text-xs text-slate-500 space-y-2">
                        <RefreshCw className="w-5 h-5 text-red-500 animate-spin mx-auto" />
                        <div>Loading recent Gmail messages...</div>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="py-12 text-center text-xs text-slate-500 space-y-1">
                        <Inbox className="w-6 h-6 text-slate-300 mx-auto" />
                        <div className="font-bold">No messages found</div>
                        <div>Try clearing the search or refresh your mailbox.</div>
                      </div>
                    ) : (
                      messages.map((msg) => {
                        const isSelected = selectedMessage?.id === msg.id;
                        return (
                          <div
                            key={msg.id}
                            onClick={() => setSelectedMessage(msg)}
                            className={`p-3 rounded-xl cursor-pointer border transition-all ${
                              isSelected
                                ? 'bg-red-50/70 border-red-300 shadow-xs'
                                : 'bg-slate-50/50 hover:bg-slate-100 border-slate-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-black text-xs text-slate-900 truncate">
                                {msg.from.replace(/<.*>/, '').trim() || msg.from}
                              </span>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">
                                {msg.date ? new Date(msg.date).toLocaleDateString() : ''}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-slate-800 truncate mt-0.5">
                              {msg.subject}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                              {msg.snippet}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Message Detail Viewer (Right 7 Cols) */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs min-h-[500px] flex flex-col justify-between">
                  {selectedMessage ? (
                    <div className="space-y-4">
                      {/* Message Header */}
                      <div className="pb-4 border-b border-slate-100 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="text-base font-black text-slate-900 leading-snug">
                            {selectedMessage.subject}
                          </h2>
                          <div className="flex flex-wrap gap-1">
                            {selectedMessage.labels.map((lbl) => (
                              <span
                                key={lbl}
                                className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold uppercase"
                              >
                                {lbl}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-xs text-slate-600 space-y-0.5">
                          <div>
                            <span className="font-bold text-slate-800">From:</span> {selectedMessage.from}
                          </div>
                          {selectedMessage.to && (
                            <div>
                              <span className="font-bold text-slate-800">To:</span> {selectedMessage.to}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-slate-800">Date:</span> {selectedMessage.date}
                          </div>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="py-2 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-sans bg-slate-50 p-4 rounded-xl border border-slate-200">
                        {selectedMessage.bodyText || selectedMessage.snippet}
                      </div>

                      {/* Fast Action: Reply or Pre-fill Dispatch */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const match = selectedMessage.from.match(/<([^>]+)>/);
                            const replyTo = match ? match[1] : selectedMessage.from;
                            setComposeTo(replyTo);
                            setComposeSubject(`Re: ${selectedMessage.subject}`);
                            setActiveTab('compose');
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                        >
                          <Send className="w-3 h-3 text-red-400" />
                          <span>Reply to Sender</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-24 text-center text-slate-400 text-xs space-y-2">
                      <Mail className="w-8 h-8 mx-auto text-slate-300" />
                      <div>Select a message from the left list to view details</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: COMPOSE OFFICIAL EMAIL */}
            {activeTab === 'compose' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-black text-slate-900 uppercase">
                    Compose Commercial Dispatch Email
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select a ready-made commercial template or compose a direct message.
                  </p>
                </div>

                {/* Ready Templates Selector */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Quick LPG Templates:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => applyTemplate('order_confirmation')}
                      className="px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-900 text-xs font-bold border border-orange-200 flex items-center gap-1.5 transition-colors"
                    >
                      <Truck className="w-3.5 h-3.5 text-orange-600" />
                      <span>Commercial Cylinder Dispatch</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => applyTemplate('tax_invoice')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 transition-colors"
                    >
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>GST Tax Invoice & Statement</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => applyTemplate('safety_certificate')}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 flex items-center gap-1.5 transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5 text-blue-600" />
                      <span>Manifold Safety Certificate</span>
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleInitiateSend} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1">
                        Recipient Email (Customer / Business) *
                      </label>
                      <input
                        type="email"
                        required
                        value={composeTo}
                        onChange={(e) => setComposeTo(e.target.value)}
                        placeholder="manager@hotelbangalore.com"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1">
                        Subject Line *
                      </label>
                      <input
                        type="text"
                        required
                        value={composeSubject}
                        onChange={(e) => setComposeSubject(e.target.value)}
                        placeholder="Cylinder Delivery Confirmation - Sandhya Enterprises"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1">
                      Email Body Content *
                    </label>
                    <textarea
                      required
                      rows={12}
                      value={composeBody}
                      onChange={(e) => setComposeBody(e.target.value)}
                      placeholder="Write email contents or click a quick template above..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-red-500 font-mono leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>A confirmation step will appear before the email is sent.</span>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Review & Send Email</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MANDATORY USER CONFIRMATION MODAL (Workspace Skill Constraint) */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-100 text-red-600 flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900 uppercase">
                  Confirm Email Dispatch via Gmail
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You are about to send an official commercial email from your authenticated Google account (<strong>{currentUser?.email}</strong>).
                </p>
              </div>
            </div>

            {/* Email Spec Review Card */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Recipient To:
                </span>
                <span className="font-bold text-slate-900">{composeTo}</span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Subject:
                </span>
                <span className="font-bold text-slate-900">{composeSubject}</span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Preview (First 150 chars):
                </span>
                <span className="text-slate-600 italic block mt-0.5 line-clamp-2 font-mono">
                  {composeBody.slice(0, 150)}...
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isSendingEmail}
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSendingEmail}
                onClick={handleConfirmSend}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
              >
                {isSendingEmail ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending via Gmail API...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm & Send Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
