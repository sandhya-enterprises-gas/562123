import React, { useState, useEffect } from 'react';
import {
  Folder,
  FileText,
  Upload,
  FolderPlus,
  Trash2,
  ExternalLink,
  Search,
  RefreshCw,
  HardDrive,
  FileSpreadsheet,
  FileImage,
  FileCode,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Download,
  Calendar,
  Layers,
  ChevronRight,
  LogOut,
  Info
} from 'lucide-react';
import { Language } from '../../types';
import {
  listDriveFiles,
  uploadDriveFile,
  createDriveFolder,
  deleteDriveFile,
  getDriveStorageQuota,
  DriveFile,
  DriveStorageInfo
} from '../../lib/driveService';
import {
  initAuth,
  googleSignInWithWorkspace,
  logout,
  getAccessToken
} from '../../lib/firebaseAuth';
import type { User } from 'firebase/auth';
import { BUSINESS_INFO } from '../../data/content';

interface GoogleDriveHubProps {
  lang: Language;
}

export const GoogleDriveHub: React.FC<GoogleDriveHubProps> = ({ lang }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Drive state
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [storageInfo, setStorageInfo] = useState<DriveStorageInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mimeFilter, setMimeFilter] = useState<'all' | 'pdf' | 'spreadsheet' | 'document' | 'image' | 'folder' | 'form'>('all');
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(undefined);
  const [folderHistory, setFolderHistory] = useState<Array<{ id: string; name: string }>>([]);

  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState<'invoice' | 'challan' | 'safety' | 'kyc' | 'general'>('invoice');
  const [uploading, setUploading] = useState(false);

  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);

  // Destructive delete confirmation modal
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Action status message
  const [statusNotice, setStatusNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Check auth state on mount
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

  // Fetch files and storage quota when accessToken or folderId changes
  useEffect(() => {
    if (accessToken) {
      loadDriveData();
    }
  }, [accessToken, currentFolderId, mimeFilter]);

  const loadDriveData = async () => {
    if (!accessToken) return;
    setLoading(true);
    setStatusNotice(null);
    try {
      const [filesResult, storageResult] = await Promise.allSettled([
        listDriveFiles(accessToken, {
          folderId: currentFolderId,
          searchQuery,
          mimeTypeFilter: mimeFilter
        }),
        getDriveStorageQuota(accessToken)
      ]);

      if (filesResult.status === 'fulfilled') {
        setFiles(filesResult.value.files);
      } else {
        console.error('Error fetching files:', filesResult.reason);
        setStatusNotice({
          type: 'error',
          message: lang === 'kn' ? 'ಡ್ರೈವ್ ಫೈಲ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ.' : 'Failed to load Google Drive files. Please re-authenticate.'
        });
      }

      if (storageResult.status === 'fulfilled') {
        setStorageInfo(storageResult.value);
      }
    } catch (err: any) {
      console.error('Drive load error:', err);
      setStatusNotice({
        type: 'error',
        message: err.message || 'Error communicating with Google Drive.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken) {
      loadDriveData();
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
          message: lang === 'kn' ? 'ಗೂಗಲ್ ಡ್ರೈವ್ ಯಶಸ್ವಿಯಾಗಿ ಸಂಪರ್ಕಗೊಂಡಿದೆ!' : 'Google Drive successfully connected!'
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
    setFiles([]);
    setStorageInfo(null);
  };

  const navigateToFolder = (folder: DriveFile) => {
    setFolderHistory(prev => [...prev, { id: folder.id, name: folder.name }]);
    setCurrentFolderId(folder.id);
  };

  const navigateUp = () => {
    if (folderHistory.length <= 1) {
      setFolderHistory([]);
      setCurrentFolderId(undefined);
    } else {
      const nextHistory = [...folderHistory];
      nextHistory.pop();
      setFolderHistory(nextHistory);
      setCurrentFolderId(nextHistory[nextHistory.length - 1].id);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !selectedUploadFile) return;

    setUploading(true);
    setStatusNotice(null);
    try {
      const categoryTag = {
        invoice: 'Commercial GST Invoice (ಇನ್‌ವಾಯ್ಸ್)',
        challan: 'Delivery Challan (ಡೆಲಿವರಿ ಚಲನ್)',
        safety: 'PESO Safety Audit Certificate',
        kyc: 'Customer KYC & Agreement',
        general: 'Official Document'
      }[uploadCategory];

      const uploaded = await uploadDriveFile(
        accessToken,
        selectedUploadFile,
        currentFolderId,
        `Sandhya Enterprises - ${categoryTag}`
      );

      setStatusNotice({
        type: 'success',
        message: lang === 'kn'
          ? `"${uploaded.name}" ಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ಗೂಗಲ್ ಡ್ರೈವ್‌ಗೆ ಅಪ್‌ಲೋಡ್ ಆಗಿದೆ!`
          : `"${uploaded.name}" uploaded successfully to Google Drive!`
      });

      setShowUploadModal(false);
      setSelectedUploadFile(null);
      loadDriveData();
    } catch (err: any) {
      console.error('Upload failed:', err);
      setStatusNotice({
        type: 'error',
        message: err.message || 'File upload failed. Please try again.'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newFolderName.trim()) return;

    setCreatingFolder(true);
    setStatusNotice(null);
    try {
      const folder = await createDriveFolder(accessToken, newFolderName.trim(), currentFolderId);
      setStatusNotice({
        type: 'success',
        message: lang === 'kn'
          ? `"${folder.name}" ಫೋಲ್ಡರ್ ರಚಿಸಲಾಗಿದೆ!`
          : `Folder "${folder.name}" created successfully!`
      });
      setShowCreateFolderModal(false);
      setNewFolderName('');
      loadDriveData();
    } catch (err: any) {
      console.error('Create folder failed:', err);
      setStatusNotice({
        type: 'error',
        message: err.message || 'Failed to create folder.'
      });
    } finally {
      setCreatingFolder(false);
    }
  };

  // Explicit confirmation for destructive file delete
  const confirmDeleteFile = async () => {
    if (!accessToken || !fileToDelete) return;
    setDeleting(true);
    setStatusNotice(null);
    try {
      await deleteDriveFile(accessToken, fileToDelete.id);
      setStatusNotice({
        type: 'success',
        message: lang === 'kn'
          ? `"${fileToDelete.name}" ಡ್ರೈವ್‌ನಿಂದ ಅಳಿಸಲಾಗಿದೆ.`
          : `"${fileToDelete.name}" removed from Google Drive.`
      });
      setFileToDelete(null);
      loadDriveData();
    } catch (err: any) {
      console.error('Delete failed:', err);
      setStatusNotice({
        type: 'error',
        message: err.message || 'Failed to delete file from Google Drive.'
      });
    } finally {
      setDeleting(false);
    }
  };

  const formatFileSize = (bytes?: string) => {
    if (!bytes) return '--';
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return '--';
    if (num < 1024) return `${num} B`;
    if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
    return `${(num / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatStorageUsage = (usage?: string, limit?: string) => {
    if (!usage) return 'Storage details unavailable';
    const usedMB = (parseInt(usage, 10) / (1024 * 1024 * 1024)).toFixed(2);
    if (!limit) return `${usedMB} GB used`;
    const limitMB = (parseInt(limit, 10) / (1024 * 1024 * 1024)).toFixed(0);
    return `${usedMB} GB / ${limitMB} GB`;
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') {
      return <Folder className="w-5 h-5 text-amber-500 fill-amber-100" />;
    }
    if (mimeType.includes('pdf')) {
      return <FileText className="w-5 h-5 text-red-500" />;
    }
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    }
    if (mimeType.includes('image/')) {
      return <FileImage className="w-5 h-5 text-blue-500" />;
    }
    if (mimeType === 'application/vnd.google-apps.form') {
      return <FileCode className="w-5 h-5 text-purple-600" />;
    }
    return <FileText className="w-5 h-5 text-slate-500" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black tracking-wider uppercase">
                  Google Workspace
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Sandhya Enterprises
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {lang === 'kn' ? 'ಗೂಗಲ್ ಡ್ರೈವ್ ಅಧಿಕೃತ ದಾಖಲೆಗಳ ಸಂಗ್ರಹ' : 'Official Google Drive Repository'}
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                {lang === 'kn'
                  ? 'ಜಿಎಸ್‌ಟಿ ಇನ್‌ವಾಯ್ಸ್‌ಗಳು, ಸಿಲಿಂಡರ್ ಡೆಲಿವರಿ ಚಲನ್‌ಗಳು & ಪಿಇಎಸ್‌ಒ ಸುರಕ್ಷತಾ ಪ್ರಮಾಣಪತ್ರಗಳು'
                  : 'Manage GST Invoices, Commercial Cylinder Delivery Challans & PESO Safety Compliance Docs'}
              </p>
            </div>
          </div>

          {/* Authentication State Controls */}
          <div>
            {!currentUser || !accessToken ? (
              <button
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                {/* Official Google Icon */}
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
                    : (lang === 'kn' ? 'ಗೂಗಲ್ ಡ್ರೈವ್ ಕನೆಕ್ಟ್ ಮಾಡಿ' : 'Sign in to Google Drive')}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-black text-slate-900">{currentUser.displayName || currentUser.email}</div>
                  <div className="text-[11px] text-slate-500">{storageInfo ? formatStorageUsage(storageInfo.usage, storageInfo.limit) : 'Connected'}</div>
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
                  title="Disconnect Drive"
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
              {statusNotice.type === 'success' ? (
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-600" />
              )}
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
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <HardDrive className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-black text-slate-900">
              {lang === 'kn' ? 'ನಿಮ್ಮ ಅಧಿಕೃತ ಗೂಗಲ್ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ' : 'Connect Sandhya Enterprises Google Workspace'}
            </h2>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              {lang === 'kn'
                ? 'ಗ್ರಾಹಕರ ಇನ್‌ವಾಯ್ಸ್‌ಗಳು, ರಿಯಾಯಿತಿ ಪಟ್ಟಿಗಳು, ಸುರಕ್ಷತಾ ತಪಾಸಣಾ ವರದಿಗಳು ಮತ್ತು ಡೆಲಿವರಿ ಚಲನ್‌ಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಗೂಗಲ್ ಡ್ರೈವ್‌ನಲ್ಲಿ ನಿರ್ವಹಿಸಲು ದೃಢೀಕರಿಸಿ.'
                : 'Authenticate with Google Drive to view, search, upload, and organize GST invoices, customer delivery challans, and safety compliance audits.'}
            </p>
            <div>
              <button
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer"
              >
                <span>{lang === 'kn' ? 'ಗೂಗಲ್ ಡ್ರೈವ್ ಅನುಮೋದಿಸಿ' : 'Authenticate Google Drive'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Drive Explorer (when authenticated) */}
        {currentUser && accessToken && (
          <div className="space-y-4">
            {/* Action Bar & Quick Filters */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search input */}
              <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'kn' ? 'ಡಾಕ್ಯುಮೆಂಟ್ ಹೆಸರು ಹುಡುಕಿ (Search drive)...' : 'Search files by name (e.g. Invoice, Challan)...'}
                  className="w-full pl-9 pr-20 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold"
                >
                  {lang === 'kn' ? 'ಹುಡುಕು' : 'Search'}
                </button>
              </form>

              {/* Action Buttons: Refresh, New Folder, Upload */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => loadDriveData()}
                  disabled={loading}
                  title="Refresh"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => setShowCreateFolderModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <FolderPlus className="w-3.5 h-3.5 text-blue-600" />
                  <span>{lang === 'kn' ? 'ಹೊಸ ಫೋಲ್ಡರ್' : 'New Folder'}</span>
                </button>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{lang === 'kn' ? 'ಫೈಲ್ ಅಪ್‌ಲೋಡ್' : 'Upload File'}</span>
                </button>
              </div>
            </div>

            {/* Breadcrumbs & Format Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              {/* Folder Breadcrumb */}
              <div className="flex items-center gap-1 text-xs text-slate-600 overflow-x-auto py-1">
                <button
                  onClick={() => {
                    setCurrentFolderId(undefined);
                    setFolderHistory([]);
                  }}
                  className="font-bold hover:text-blue-600 flex items-center gap-1"
                >
                  <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                  <span>My Drive</span>
                </button>
                {folderHistory.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    <button
                      onClick={() => {
                        const newHist = folderHistory.slice(0, idx + 1);
                        setFolderHistory(newHist);
                        setCurrentFolderId(item.id);
                      }}
                      className="font-bold hover:text-blue-600 max-w-[120px] truncate"
                    >
                      {item.name}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              {/* Mime Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { key: 'all', label: lang === 'kn' ? 'ಎಲ್ಲವೂ' : 'All' },
                  { key: 'pdf', label: 'PDFs' },
                  { key: 'spreadsheet', label: 'Sheets' },
                  { key: 'document', label: 'Docs' },
                  { key: 'image', label: 'Images' },
                  { key: 'folder', label: 'Folders' }
                ].map(chip => (
                  <button
                    key={chip.key}
                    onClick={() => setMimeFilter(chip.key as any)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                      mimeFilter === chip.key
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Files List / Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {loading ? (
                <div className="py-16 text-center">
                  <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">{lang === 'kn' ? 'ಫೈಲ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' : 'Fetching Google Drive documents...'}</p>
                </div>
              ) : files.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-700">
                    {lang === 'kn' ? 'ಯಾವುದೇ ಫೈಲ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ' : 'No files found'}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {searchQuery
                      ? (lang === 'kn' ? 'ಹುಡುಕಾಟದ ಹೆಸರನ್ನು ಬದಲಾಯಿಸಿ ಪ್ರಯತ್ನಿಸಿ.' : 'No items match your search query.')
                      : (lang === 'kn' ? 'ಇನ್‌ವಾಯ್ಸ್ ಅಥವಾ ಚಲನ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಮೇಲಿನ ಬಟನ್ ಬಳಸಿ.' : 'Upload an invoice, challan, or compliance document to get started.')}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Size</th>
                        <th className="py-3 px-4">Last Modified</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {files.map(file => {
                        const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                        return (
                          <tr
                            key={file.id}
                            className="hover:bg-slate-50/60 transition-colors group"
                          >
                            <td className="py-3 px-4 font-bold text-slate-900">
                              <div className="flex items-center gap-3">
                                {getFileIcon(file.mimeType)}
                                {isFolder ? (
                                  <button
                                    onClick={() => navigateToFolder(file)}
                                    className="hover:text-blue-600 hover:underline text-left font-black"
                                  >
                                    {file.name}
                                  </button>
                                ) : (
                                  <a
                                    href={file.webViewLink || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600 hover:underline truncate max-w-xs sm:max-w-md"
                                  >
                                    {file.name}
                                  </a>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-500 text-[11px]">
                              {isFolder ? 'Folder' : file.mimeType.split('/').pop()?.toUpperCase() || 'Document'}
                            </td>
                            <td className="py-3 px-4 text-slate-500 text-[11px]">
                              {formatFileSize(file.size)}
                            </td>
                            <td className="py-3 px-4 text-slate-500 text-[11px]">
                              {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : '--'}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                {file.webViewLink && (
                                  <a
                                    href={file.webViewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Open in Google Drive"
                                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-blue-600"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                <button
                                  onClick={() => setFileToDelete(file)}
                                  title="Delete File (Requires Confirmation)"
                                  className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                    {lang === 'kn' ? 'ಡಾಕ್ಯುಮೆಂಟ್ ಅಪ್‌ಲೋಡ್' : 'Upload to Google Drive'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1">
                    {lang === 'kn' ? 'ದಾಖಲೆಯ ವಿಭಾಗ' : 'Document Category'}
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="invoice">GST Commercial Invoice (ಇನ್‌ವಾಯ್ಸ್)</option>
                    <option value="challan">LPG Delivery Challan (ಡೆಲಿವರಿ ಚಲನ್)</option>
                    <option value="safety">PESO Safety Audit & Testing Certificate</option>
                    <option value="kyc">Customer KYC / Hotel Agreement</option>
                    <option value="general">General Commercial Record</option>
                  </select>
                </div>

                {/* File picker */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1">
                    {lang === 'kn' ? 'ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ (PDF, Image, Excel)' : 'Select File'}
                  </label>
                  <input
                    type="file"
                    required
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedUploadFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || !selectedUploadFile}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {uploading ? (lang === 'kn' ? 'ಅಪ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'Uploading...') : (lang === 'kn' ? 'ಅಪ್‌ಲೋಡ್ ಮಾಡಿ' : 'Confirm Upload')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Folder Modal */}
        {showCreateFolderModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                    {lang === 'kn' ? 'ಹೊಸ ಫೋಲ್ಡರ್ ರಚಿಸಿ' : 'New Drive Folder'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowCreateFolderModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateFolder} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1">
                    Folder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="e.g. Invoices 2026, Safety NOCs"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowCreateFolderModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creatingFolder || !newFolderName.trim()}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider disabled:opacity-50"
                  >
                    {creatingFolder ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Destructive Delete Confirmation Modal (MANDATORY PER WORKSPACE SKILL) */}
        {fileToDelete && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-red-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3 text-red-600">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                    {lang === 'kn' ? 'ದಾಖಲೆಯನ್ನು ಅಳಿಸಲು ದೃಢೀಕರಿಸಿ' : 'Confirm File Deletion'}
                  </h3>
                  <p className="text-[11px] text-slate-500">Google Drive Destructive Operation</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="text-xs font-bold text-slate-800 break-all">
                  {fileToDelete.name}
                </p>
                <p className="text-[11px] text-slate-500">
                  Type: {fileToDelete.mimeType} | Size: {formatFileSize(fileToDelete.size)}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'kn'
                  ? 'ಈ ಫೈಲ್ ಅನ್ನು ನಿಮ್ಮ ಗೂಗಲ್ ಡ್ರೈವ್‌ನಿಂದ ಶಾಶ್ವತವಾಗಿ ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ. ನೀವು ಮುಂದುವರಿಯಲು ಖಚಿತವಾಗಿದ್ದೀರಾ?'
                  : 'Are you sure you want to delete this file from Google Drive? This action cannot be undone.'}
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setFileToDelete(null)}
                  disabled={deleting}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel (ರದ್ದುಮಾಡಿ)
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteFile}
                  disabled={deleting}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
                >
                  {deleting ? (lang === 'kn' ? 'ಅಳಿಸಲಾಗುತ್ತಿದೆ...' : 'Deleting...') : (lang === 'kn' ? 'ಹೌದು, ಅಳಿಸಿ' : 'Delete File')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
