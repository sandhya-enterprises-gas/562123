import React, { useState, useEffect } from 'react';
import {
  FileCode,
  PlusCircle,
  ExternalLink,
  RefreshCw,
  Eye,
  CheckCircle2,
  Users,
  MessageSquare,
  Sparkles,
  ClipboardList,
  AlertTriangle,
  ArrowRight,
  LogOut,
  Clock,
  Send,
  HelpCircle,
  Flame,
  ChevronRight
} from 'lucide-react';
import { Language } from '../../types';
import {
  listGoogleForms,
  getGoogleForm,
  getGoogleFormResponses,
  createCommercialLpgGoogleForm,
  GoogleFormSummary,
  GoogleFormDetails,
  FormResponseItem,
  FormTemplateType
} from '../../lib/formsService';
import {
  initAuth,
  googleSignInWithWorkspace,
  logout
} from '../../lib/firebaseAuth';
import type { User } from 'firebase/auth';

interface GoogleFormsHubProps {
  lang: Language;
}

export const GoogleFormsHub: React.FC<GoogleFormsHubProps> = ({ lang }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Forms state
  const [formsList, setFormsList] = useState<GoogleFormSummary[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [selectedFormDetails, setSelectedFormDetails] = useState<GoogleFormDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Responses state
  const [responses, setResponses] = useState<FormResponseItem[]>([]);
  const [loadingResponses, setLoadingResponses] = useState(false);

  // Form creation state
  const [creatingTemplate, setCreatingTemplate] = useState<FormTemplateType | null>(null);
  const [statusNotice, setStatusNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Tab: 'list' | 'details' | 'responses'
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'responses'>('details');

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        if (token) {
          setAccessToken(token);
        }
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (accessToken) {
      loadForms();
    }
  }, [accessToken]);

  const loadForms = async () => {
    if (!accessToken) return;
    setLoadingList(true);
    setStatusNotice(null);
    try {
      const forms = await listGoogleForms(accessToken);
      setFormsList(forms);
      if (forms.length > 0 && !selectedFormId) {
        selectForm(forms[0].id);
      }
    } catch (err: any) {
      console.error('Failed to load forms:', err);
      setStatusNotice({
        type: 'error',
        message: err.message || 'Failed to list Google Forms.'
      });
    } finally {
      setLoadingList(false);
    }
  };

  const selectForm = async (formId: string) => {
    if (!accessToken) return;
    setSelectedFormId(formId);
    setLoadingDetails(true);
    setLoadingResponses(true);
    setStatusNotice(null);
    try {
      const [formDetails, respData] = await Promise.allSettled([
        getGoogleForm(accessToken, formId),
        getGoogleFormResponses(accessToken, formId)
      ]);

      if (formDetails.status === 'fulfilled') {
        setSelectedFormDetails(formDetails.value);
      }
      if (respData.status === 'fulfilled') {
        setResponses(respData.value.responses);
      } else {
        setResponses([]);
      }
    } catch (err: any) {
      console.error('Error fetching form details/responses:', err);
    } finally {
      setLoadingDetails(false);
      setLoadingResponses(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const res = await googleSignInWithWorkspace();
      if (res) {
        setCurrentUser(res.user);
        setAccessToken(res.accessToken);
        setStatusNotice({
          type: 'success',
          message: lang === 'kn' ? 'ಗೂಗಲ್ ಫಾರ್ಮ್ಸ್ ಯಶಸ್ವಿಯಾಗಿ ಸಂಪರ್ಕಗೊಂಡಿದೆ!' : 'Google Forms successfully connected!'
        });
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setAuthError(err.message || 'Authentication failed. Please grant required permissions.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setCurrentUser(null);
    setAccessToken(null);
    setFormsList([]);
    setSelectedFormDetails(null);
    setResponses([]);
  };

  const handleCreateTemplateForm = async (templateType: FormTemplateType) => {
    if (!accessToken) return;
    setCreatingTemplate(templateType);
    setStatusNotice(null);
    try {
      const created = await createCommercialLpgGoogleForm(accessToken, templateType);
      setStatusNotice({
        type: 'success',
        message: lang === 'kn'
          ? `"${created.info.title}" ಗೂಗಲ್ ಫಾರ್ಮ್ ಯಶಸ್ವಿಯಾಗಿ ಸೃಷ್ಟಿಯಾಗಿದೆ!`
          : `Google Form "${created.info.title}" created successfully!`
      });
      await loadForms();
      selectForm(created.formId);
    } catch (err: any) {
      console.error('Failed to create form template:', err);
      setStatusNotice({
        type: 'error',
        message: err.message || 'Failed to create Google Form.'
      });
    } finally {
      setCreatingTemplate(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-black tracking-wider uppercase">
                  Google Workspace Forms
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Sandhya Enterprises
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {lang === 'kn' ? 'ಗೂಗಲ್ ಫಾರ್ಮ್ಸ್ & ಪ್ರತಿಕ್ರಿಯೆಗಳ ಹಬ್' : 'Google Forms & Customer Responses'}
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                {lang === 'kn'
                  ? 'ಗ್ರಾಹಕರ ಸಂಪರ್ಕ ಕೋರಿಕೆಗಳು, ಬಲ್ಕ್ ಬುಕಿಂಗ್ & ಸುರಕ್ಷತಾ ತೃಪ್ತಿ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ'
                  : 'Manage Commercial LPG Connection Applications, Refill Orders & Safety Surveys'}
              </p>
            </div>
          </div>

          {/* Auth Controls */}
          <div>
            {!currentUser || !accessToken ? (
              <button
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>
                  {isLoggingIn
                    ? (lang === 'kn' ? 'ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...' : 'Connecting...')
                    : (lang === 'kn' ? 'ಗೂಗಲ್ ಫಾರ್ಮ್ಸ್ ಕನೆಕ್ಟ್ ಮಾಡಿ' : 'Sign in to Google Forms')}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-black text-slate-900">{currentUser.displayName || currentUser.email}</div>
                  <div className="text-[11px] text-purple-600 font-bold">{formsList.length} Forms Available</div>
                </div>
                {currentUser.photoURL && (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || ''}
                    className="w-8 h-8 rounded-full border border-slate-300"
                    referrerPolicy="no-referrer"
                  />
                )}
                <button
                  onClick={handleSignOut}
                  title="Disconnect"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {authError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {statusNotice && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between border ${
              statusNotice.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{statusNotice.message}</span>
            </div>
            <button
              onClick={() => setStatusNotice(null)}
              className="text-xs font-bold underline ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Not authenticated banner */}
        {(!currentUser || !accessToken) && (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <ClipboardList className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-black text-slate-900">
              {lang === 'kn' ? 'ಅಧಿಕೃತ ಗೂಗಲ್ ಫಾರ್ಮ್ಸ್ ಇಂಟಿಗ್ರೇಷನ್' : 'Connect Google Forms Workspace'}
            </h2>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              {lang === 'kn'
                ? 'ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ಕಾರ್ಖಾನೆಗಳಿಂದ ಬರುವ ಸಿಲಿಂಡರ್ ವಿಚಾರಣೆಗಳು, ಹೊಸ ಸಂಪರ್ಕ ಕೋರಿಕೆಗಳು ಮತ್ತು ಗ್ರಾಹಕರ ಸುರಕ್ಷತಾ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ನೈಜ ಸಮಯದಲ್ಲಿ ವೀಕ್ಷಿಸಿ.'
                : 'Authenticate with Google Forms to collect customer refill requests, launch commercial intake surveys, and inspect live responses.'}
            </p>
            <div>
              <button
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer"
              >
                <span>{lang === 'kn' ? 'ಗೂಗಲ್ ಫಾರ್ಮ್ಸ್ ಕನೆಕ್ಟ್ ಮಾಡಿ' : 'Authenticate Google Forms'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* When Authenticated: Form Creator & Forms List + Response Inspector */}
        {currentUser && accessToken && (
          <div className="space-y-6">
            {/* Quick 1-Click Form Generators */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                    {lang === 'kn' ? 'ತ್ವರಿತ ಗೂಗಲ್ ಫಾರ್ಮ್ ರಚನೆ' : '1-Click Official LPG Form Templates'}
                  </h3>
                </div>
                <span className="text-[11px] text-slate-500 font-bold">
                  Powered by Google Forms API
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. New Connection Request */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-purple-300 transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider">
                      Commercial Intake
                    </span>
                    <h4 className="text-xs font-black text-slate-900 mt-2">
                      New LPG Connection Request
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Intake form for hotels, bakeries & factories in Nelamangala with business type, cylinder requirement & GST details.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCreateTemplateForm('new_connection')}
                    disabled={creatingTemplate !== null}
                    className="w-full py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    {creatingTemplate === 'new_connection' ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <PlusCircle className="w-3.5 h-3.5" />
                    )}
                    <span>{lang === 'kn' ? 'ಫಾರ್ಮ್ ರಚಿಸಿ' : 'Create Google Form'}</span>
                  </button>
                </div>

                {/* 2. Safety Feedback Survey */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                      Safety & QA
                    </span>
                    <h4 className="text-xs font-black text-slate-900 mt-2">
                      Delivery & Safety Survey
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Inspect delivery partner O-ring leak check, delivery punctuality & 1-5 star service satisfaction.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCreateTemplateForm('safety_feedback')}
                    disabled={creatingTemplate !== null}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    {creatingTemplate === 'safety_feedback' ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <PlusCircle className="w-3.5 h-3.5" />
                    )}
                    <span>{lang === 'kn' ? 'ಫಾರ್ಮ್ ರಚಿಸಿ' : 'Create Google Form'}</span>
                  </button>
                </div>

                {/* 3. Bulk Refill Booking */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-orange-300 transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 text-[10px] font-black uppercase tracking-wider">
                      Refill Orders
                    </span>
                    <h4 className="text-xs font-black text-slate-900 mt-2">
                      Bulk Refill Booking Form
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Fast booking form for recurring hotel clients with cylinder count, empty returns & peak delivery slot.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCreateTemplateForm('bulk_order')}
                    disabled={creatingTemplate !== null}
                    className="w-full py-2 px-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    {creatingTemplate === 'bulk_order' ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <PlusCircle className="w-3.5 h-3.5" />
                    )}
                    <span>{lang === 'kn' ? 'ಫಾರ್ಮ್ ರಚಿಸಿ' : 'Create Google Form'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Split layout: Form Selector + Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: List of Forms */}
              <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    {lang === 'kn' ? 'ನಿಮ್ಮ ಗೂಗಲ್ ಫಾರ್ಮ್‌ಗಳು' : 'Your Google Forms'}
                  </h3>
                  <button
                    onClick={loadForms}
                    disabled={loadingList}
                    className="p-1 rounded hover:bg-slate-100 text-slate-500"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingList ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {loadingList ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    <RefreshCw className="w-5 h-5 animate-spin text-purple-600 mx-auto mb-2" />
                    Loading Forms...
                  </div>
                ) : formsList.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500 space-y-2">
                    <ClipboardList className="w-6 h-6 text-slate-300 mx-auto" />
                    <p>No Google Forms found in Drive.</p>
                    <p className="text-[11px] text-slate-400">Use the templates above to create your first form.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                    {formsList.map(f => (
                      <button
                        key={f.id}
                        onClick={() => selectForm(f.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          selectedFormId === f.id
                            ? 'bg-purple-50/70 border-purple-300 shadow-2xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                            {f.name}
                          </h4>
                          <FileCode className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                          <span>Modified: {f.modifiedTime ? new Date(f.modifiedTime).toLocaleDateString() : '--'}</span>
                          <span className="font-bold text-purple-700">Select →</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Selected Form Details & Responses */}
              <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                {selectedFormDetails ? (
                  <>
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-black uppercase">
                            Active Form
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            ID: {selectedFormDetails.formId.slice(0, 12)}...
                          </span>
                        </div>
                        <h2 className="text-lg font-black text-slate-900 mt-1">
                          {selectedFormDetails.info.title}
                        </h2>
                        {selectedFormDetails.info.description && (
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                            {selectedFormDetails.info.description}
                          </p>
                        )}
                      </div>

                      {/* Links to Google Forms */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {selectedFormDetails.responderUri && (
                          <a
                            href={selectedFormDetails.responderUri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-2xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Share Link</span>
                          </a>
                        )}
                        <a
                          href={`https://docs.google.com/forms/d/${selectedFormDetails.formId}/edit`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Edit in Forms</span>
                        </a>
                      </div>
                    </div>

                    {/* Sub-tabs: Questions vs Responses */}
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                      <button
                        onClick={() => setActiveSubTab('details')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          activeSubTab === 'details'
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Questions ({selectedFormDetails.items?.length || 0})
                      </button>
                      <button
                        onClick={() => setActiveSubTab('responses')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                          activeSubTab === 'responses'
                            ? 'bg-purple-600 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Live Responses ({responses.length})</span>
                      </button>
                    </div>

                    {/* Tab 1: Questions */}
                    {activeSubTab === 'details' && (
                      <div className="space-y-3 pt-2">
                        {selectedFormDetails.items && selectedFormDetails.items.length > 0 ? (
                          selectedFormDetails.items.map((item, idx) => (
                            <div
                              key={item.itemId || idx}
                              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1"
                            >
                              <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold">
                                <span>Question #{idx + 1}</span>
                                {item.questionItem?.question?.required && (
                                  <span className="text-red-500 font-black">Required *</span>
                                )}
                              </div>
                              <h4 className="text-xs font-black text-slate-900">
                                {item.title}
                              </h4>
                              {item.description && (
                                <p className="text-[11px] text-slate-600">{item.description}</p>
                              )}
                              {item.questionItem?.question?.choiceQuestion && (
                                <div className="pt-1.5 flex flex-wrap gap-1.5">
                                  {item.questionItem.question.choiceQuestion.options.map((opt, oIdx) => (
                                    <span
                                      key={oIdx}
                                      className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-slate-700"
                                    >
                                      • {opt.value}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="py-8 text-center text-xs text-slate-500">
                            No questions added yet. Use "Edit in Forms" above to design questions.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab 2: Responses */}
                    {activeSubTab === 'responses' && (
                      <div className="space-y-3 pt-2">
                        {loadingResponses ? (
                          <div className="py-8 text-center text-xs text-slate-500">
                            <RefreshCw className="w-5 h-5 animate-spin text-purple-600 mx-auto mb-2" />
                            Reading form submissions...
                          </div>
                        ) : responses.length === 0 ? (
                          <div className="py-12 text-center text-xs text-slate-500 space-y-2">
                            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                            <p className="font-bold text-slate-700">No responses recorded yet</p>
                            <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                              Share the responder link above with your commercial clients to start receiving submissions.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                            {responses.map((resp, rIdx) => (
                              <div
                                key={resp.responseId || rIdx}
                                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2"
                              >
                                <div className="flex items-center justify-between text-[11px] border-b border-slate-200 pb-2">
                                  <div className="flex items-center gap-2">
                                    <Users className="w-3.5 h-3.5 text-purple-600" />
                                    <span className="font-bold text-slate-900">
                                      {resp.respondentEmail || `Submission #${rIdx + 1}`}
                                    </span>
                                  </div>
                                  <span className="text-slate-500">
                                    {new Date(resp.lastSubmittedTime || resp.createTime).toLocaleString()}
                                  </span>
                                </div>

                                {resp.answers && Object.entries(resp.answers).length > 0 ? (
                                  <div className="space-y-1.5 text-xs">
                                    {Object.entries(resp.answers).map(([qId, ans]: [string, any]) => (
                                      <div key={qId} className="flex flex-col sm:flex-row sm:items-start gap-1">
                                        <span className="font-bold text-slate-700 min-w-[140px]">
                                          Answer:
                                        </span>
                                        <span className="text-slate-900 font-medium">
                                          {ans?.textAnswers?.answers?.map((a: any) => a.value).join(', ') || '--'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-xs text-slate-500 italic">
                                    Empty response payload
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-16 text-center text-xs text-slate-500 space-y-2">
                    <ClipboardList className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="font-bold text-slate-700">Select a form from the left list</p>
                    <p className="text-[11px] text-slate-400">or generate a new commercial LPG form template above.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
