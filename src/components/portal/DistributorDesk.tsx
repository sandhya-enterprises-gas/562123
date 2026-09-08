import React, { useState, useEffect } from 'react';
import {
  Truck,
  CheckCircle2,
  Clock,
  IndianRupee,
  RotateCcw,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  FileCheck,
  Calendar,
  Building2,
  Phone,
  Shield,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Language, OrderRecord, PaymentMode, OrderStatus, CustomerAccount } from '../../types';
import { portalStore, PortalState } from '../../data/portalStore';
import { BUSINESS_INFO } from '../../data/content';

interface DistributorDeskProps {
  lang: Language;
}

export const DistributorDesk: React.FC<DistributorDeskProps> = ({ lang }) => {
  const [storeState, setStoreState] = useState<PortalState>(portalStore.getState());
  const [distributorStaffName, setDistributorStaffName] = useState('Kumar (Dispatch Incharge)');
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  // Security Auth Gate State
  const [accessCode, setAccessCode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Delivery Modal State
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [modalBilledAmount, setModalBilledAmount] = useState(0);
  const [modalAmountPaid, setModalAmountPaid] = useState(0);
  const [modalPaymentMode, setModalPaymentMode] = useState<PaymentMode>('cash');
  const [modalMtCollected, setModalMtCollected] = useState(0);
  const [modalNotes, setModalNotes] = useState('');

  // Direct Collection Modal State
  const [showDirectCollectionModal, setShowDirectCollectionModal] = useState(false);
  const [directCustId, setDirectCustId] = useState('');
  const [directAmount, setDirectAmount] = useState(0);
  const [directMode, setDirectMode] = useState<'cash' | 'online'>('cash');
  const [directMt, setDirectMt] = useState(0);

  // Search & Filters
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setStoreState({ ...portalStore.getState() });
    });
    return unsub;
  }, []);

  const handleUnlockDesk = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = portalStore.authenticateDistributor(accessCode);
    if (!res.success) {
      setAuthError(res.message);
    } else {
      setAuthSuccess(res.message);
      setAccessCode('');
    }
  };

  const handleQuickDemoUnlock = () => {
    portalStore.authenticateDistributor('DIST2026');
  };

  const handleLockDesk = () => {
    portalStore.lockDistributor();
  };

  // If not authorized, show official private staff gate
  if (!storeState.isDistributorAuth) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-white space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
              <Truck className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-black uppercase tracking-widest border border-slate-700">
              <Shield className="w-3 h-3 text-blue-400" />
              <span>{lang === 'kn' ? 'ಖಾಸಗಿ ಸಿಬ್ಬಂದಿ ದೃಢೀಕರಣ' : 'Staff Private Access Gate'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              {lang === 'kn' ? 'ವಿತರಕರ ಕಾರ್ಯಾಚರಣೆ ಡೆಸ್ಕ್' : 'Distributor Desk'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'kn'
                ? 'ಗ್ರಾಹಕರ ಖಾಸಗಿ ಲೆಕ್ಕ, ಲೈವ್ ಆರ್ಡರ್ ಡಿಸ್ಪ್ಯಾಚ್ ಮತ್ತು ಹಣ ಸಂಗ್ರಹಣಾ ಡೇಟಾ ರಕ್ಷಣೆಗಾಗಿ ಅಧಿಕೃತ ಸಿಬ್ಬಂದಿ ಪಾಸ್‌ಕೋಡ್ ನಮೂದಿಸಿ.'
                : 'Enter your Sandhya authorized staff passcode to access live dispatch queue, customer balances, and collections.'}
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleUnlockDesk} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                {lang === 'kn' ? 'ಸಿಬ್ಬಂದಿ ಪಾಸ್‌ಕೋಡ್ (Staff Passcode)' : 'Authorized Staff Passcode'}
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  required
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 pr-10 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white tracking-widest focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  title={showPasscode ? 'Hide Passcode' : 'Show Passcode'}
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider shadow-lg transition-all"
            >
              {lang === 'kn' ? 'ಡೆಸ್ಕ್ ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರವೇಶಿಸಿ' : 'Authorized Desk Login'}
            </button>
          </form>

          {/* Secure Staff Verification Preset */}
          <div className="pt-4 border-t border-slate-800 text-center space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
              {lang === 'kn' ? 'ಅಧಿಕೃತ ಸಿಬ್ಬಂದಿ ಪರಿಶೀಲನೆ:' : 'Authorized Dispatch In-Charge Check:'}
            </span>
            <button
              type="button"
              onClick={handleQuickDemoUnlock}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'kn' ? 'ಅಧಿಕೃತ ಸಿಬ್ಬಂದಿ ಡೆಸ್ಕ್ ಪ್ರವೇಶ' : 'Authorize Official Dispatch Session'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const orders = storeState.orders.filter((ord) => {
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    const matchesSearch =
      ord.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.phone.includes(searchQuery) ||
      ord.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = storeState.orders.filter((o) => o.status === 'placed').length;
  const transitCount = storeState.orders.filter((o) => o.status === 'out_for_delivery').length;
  const deliveredCount = storeState.orders.filter((o) => o.status === 'delivered').length;

  const handleOpenDeliveryModal = (ord: OrderRecord) => {
    setSelectedOrder(ord);
    setModalBilledAmount(ord.totalAmount);
    setModalAmountPaid(ord.totalAmount);
    setModalPaymentMode('cash');
    setModalMtCollected(ord.quantity);
    setModalNotes('');
    setShowDeliveryModal(true);
  };

  const handleConfirmDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    portalStore.completeDeliveryWithLedger(selectedOrder.id, {
      distributorName: distributorStaffName,
      amountPaid: Number(modalAmountPaid),
      paymentMode: modalPaymentMode,
      emptyCylindersCollected: Number(modalMtCollected),
      actualBilledAmount: Number(modalBilledAmount),
      notes: modalNotes
    });

    setShowDeliveryModal(false);
    setSelectedOrder(null);
  };

  const handleQuickStatusChange = (orderId: string, newStatus: OrderStatus) => {
    portalStore.updateOrderStatus(orderId, newStatus, distributorStaffName);
  };

  const handleDirectCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directCustId || directAmount <= 0) return;

    portalStore.recordDirectPayment(
      directCustId,
      Number(directAmount),
      directMode,
      Number(directMt),
      distributorStaffName
    );

    setShowDirectCollectionModal(false);
    setDirectCustId('');
    setDirectAmount(0);
    setDirectMt(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-blue-600">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
              DISTRIBUTOR DISPATCH & BILLING DESK • ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್ ಪ್ಯಾನೆಲ್
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1">
            {lang === 'kn' ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ವಿತರಕರ ನಿರ್ವಹಣಾ ವೇದಿಕೆ' : 'Distributor Operations & Delivery Console'}
          </h1>
          <p className="text-xs text-slate-300">
            {lang === 'kn'
              ? 'ಆರ್ಡರ್‌ಗಳ ಸ್ವೀಕಾರ, ಡೆಲಿವರಿ ಸ್ಥಿತಿ ಬದಲಾವಣೆ, ನಗದು/ಆನ್‌ಲೈನ್ ಪಾವತಿ ದಾಖಲಿಸುವಿಕೆ & MT ಖಾಲಿ ಸಿಲಿಂಡರ್ ಸಂಗ್ರಹ'
              : 'Dispatch management, status updates, live Cash/UPI receipt logging, and MT Cylinder reconciliation'}
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

        {/* Staff Identifier & Direct Payment Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400 font-bold text-[11px]">Staff:</span>
            <input
              type="text"
              value={distributorStaffName}
              onChange={(e) => setDistributorStaffName(e.target.value)}
              className="bg-transparent text-white font-black text-xs focus:outline-none w-32 sm:w-44"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowDirectCollectionModal(true)}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? '+ ಪಾವತಿ / MT ಸ್ವೀಕರಿಸಿ' : '+ Collect Cash / UPI'}</span>
          </button>

          <button
            type="button"
            onClick={handleLockDesk}
            className="px-3 py-1.5 bg-slate-800 hover:bg-red-800 text-slate-300 hover:text-white rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-slate-700"
            title="Lock Distributor Desk"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಲಾಕ್ ಡೆಸ್ಕ್' : 'Lock Desk'}</span>
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              {lang === 'kn' ? 'ಹೊಸದಾಗಿ ಬಂದ ಆರ್ಡರ್' : 'NEW PENDING ORDERS'}
            </span>
            <div className="text-2xl font-black text-amber-600">{pendingCount}</div>
            <span className="text-[10px] text-amber-700 font-bold">Requires dispatch vehicle assignment</span>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              {lang === 'kn' ? 'ವಾಹನದಲ್ಲಿ ರವಾನೆಯಾಗಿರುವುದು' : 'OUT FOR DELIVERY'}
            </span>
            <div className="text-2xl font-black text-blue-600">{transitCount}</div>
            <span className="text-[10px] text-blue-700 font-bold">On road in Nelamangala & rural routes</span>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              {lang === 'kn' ? 'ಡೆಲಿವರಿ ಪೂರ್ಣಗೊಂಡಿದೆ' : 'COMPLETED DELIVERIES'}
            </span>
            <div className="text-2xl font-black text-emerald-600">{deliveredCount}</div>
            <span className="text-[10px] text-emerald-700 font-bold">Billed & Ledgers updated</span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'kn'
                ? 'ಹೋಟೆಲ್ ಹೆಸರು, ಆರ್ಡರ್ ನಂಬರ್, ಫೋನ್ ಅಥವಾ ಏರಿಯಾ ಹುಡುಕಿ...'
                : 'Search by client business name, order #, phone, or route...'
            }
            className="w-full pl-9 pr-3 py-1.5 text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[10px] font-black uppercase text-slate-400 mr-1">Status:</span>
          {(['all', 'placed', 'out_for_delivery', 'delivered'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Order Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {orders.map((ord) => {
          const customer = storeState.customers.find((c) => c.id === ord.customerId);

          return (
            <div
              key={ord.id}
              className={`p-4 rounded-xl bg-white border transition-all shadow-2xs space-y-3 ${
                ord.status === 'placed'
                  ? 'border-amber-300 bg-amber-50/20'
                  : ord.status === 'out_for_delivery'
                  ? 'border-blue-300 bg-blue-50/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900 tracking-tight">{ord.orderNumber}</span>
                    {ord.isOneClick && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-orange-100 text-orange-700 border border-orange-200">
                        ⚡ 1-CLICK INSTANT
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mt-0.5">{ord.businessName}</h3>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>👤 {ord.customerName}</span>
                    <span>•</span>
                    <span>📞 {ord.phone}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      ord.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ord.status === 'out_for_delivery'
                        ? 'bg-blue-100 text-blue-800 animate-pulse'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {ord.status.replace('_', ' ')}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {new Date(ord.orderedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {/* Order Specifics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black block">Cylinders</span>
                  <span className="font-black text-slate-800 text-sm">
                    {ord.quantity}x <span className="text-xs font-bold text-slate-600">{ord.cylinderBrand}</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black block">Est. Bill</span>
                  <span className="font-black text-slate-900 text-sm">₹{ord.totalAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black block">Paid So Far</span>
                  <span className={`font-black text-sm ${ord.amountPaid > 0 ? 'text-emerald-700' : 'text-slate-500'}`}>
                    ₹{ord.amountPaid.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black block">MT Cyl Ret.</span>
                  <span className="font-black text-sm text-slate-700">
                    {ord.emptyCylindersReturned} / {ord.quantity}
                  </span>
                </div>
              </div>

              {/* Customer Balance Status */}
              {customer && (
                <div className="flex items-center justify-between text-[11px] px-2 py-1 bg-amber-500/10 rounded text-slate-700 font-bold border border-amber-500/20">
                  <span>Customer Prev Balance: ₹{customer.balanceAmount.toLocaleString()}</span>
                  <span>MT Cylinders Owed: {customer.emptyCylindersDue}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="text-[11px] text-slate-500 font-bold truncate">
                  📍 {ord.area}
                </div>

                <div className="flex items-center gap-1.5">
                  {ord.status === 'placed' && (
                    <button
                      type="button"
                      onClick={() => handleQuickStatusChange(ord.id, 'out_for_delivery')}
                      className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[11px] font-black uppercase tracking-wider transition-colors flex items-center gap-1"
                    >
                      <Truck className="w-3 h-3" />
                      <span>Dispatch</span>
                    </button>
                  )}

                  {ord.status !== 'delivered' && (
                    <button
                      type="button"
                      onClick={() => handleOpenDeliveryModal(ord)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[11px] font-black uppercase tracking-wider transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Record Delivery</span>
                    </button>
                  )}

                  {ord.status === 'delivered' && (
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      ✓ Completed by {ord.paymentMode.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Record Delivery & Payment */}
      {showDeliveryModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-start justify-between border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  COMPLETE DELIVERY & UPDATE LEDGER
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  {selectedOrder.businessName} ({selectedOrder.orderNumber})
                </h3>
              </div>
              <button
                onClick={() => setShowDeliveryModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmDelivery} className="space-y-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg text-slate-700 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Cylinders Delivered:</span>
                  <span>{selectedOrder.quantity}x {selectedOrder.cylinderBrand} ({selectedOrder.cylinderType})</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Client Contact:</span>
                  <span>{selectedOrder.customerName} ({selectedOrder.phone})</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    Total Billed Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={modalBilledAmount}
                    onChange={(e) => setModalBilledAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    Amount Paid Today (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={modalAmountPaid}
                    onChange={(e) => setModalAmountPaid(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={modalPaymentMode}
                    onChange={(e) => setModalPaymentMode(e.target.value as PaymentMode)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="cash">Cash on Delivery (ನಗದು)</option>
                    <option value="online">Online UPI / GPay / PhonePe</option>
                    <option value="credit">Credit / Full Pending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    Empty (MT) Cylinders Collected
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={selectedOrder.quantity * 2}
                    required
                    value={modalMtCollected}
                    onChange={(e) => setModalMtCollected(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-amber-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  Delivery Notes / UPI Reference
                </label>
                <input
                  type="text"
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="e.g. UPI ref 948291 / Cash given to boy / 2 MT loaded on truck"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div className="p-2 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                ⚠️ Updating this will automatically adjust client balance & MT dues, post to client passbook, and log an audit entry for the Admin!
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeliveryModal(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-black uppercase tracking-wider shadow-xs"
                >
                  Submit & Update Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Direct Collection / MT Return */}
      {showDirectCollectionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-xl max-w-md w-full p-5 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-start justify-between border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                  DIRECT PAYMENT & MT COLLECTION
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  Record Standalone Cash / UPI Receipt
                </h3>
              </div>
              <button
                onClick={() => setShowDirectCollectionModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDirectCollection} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  Select Customer
                </label>
                <select
                  required
                  value={directCustId}
                  onChange={(e) => setDirectCustId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none"
                >
                  <option value="">-- Choose Hotel / Business --</option>
                  {storeState.customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.businessName} (Balance: ₹{c.balanceAmount} | MT: {c.emptyCylindersDue})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    Amount Received (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={directAmount || ''}
                    onChange={(e) => setDirectAmount(Number(e.target.value))}
                    placeholder="₹ Received"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-emerald-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={directMode}
                    onChange={(e) => setDirectMode(e.target.value as any)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="cash">Cash (ನಗದು)</option>
                    <option value="online">Online UPI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  Empty (MT) Cylinders Collected
                </label>
                <input
                  type="number"
                  min="0"
                  value={directMt}
                  onChange={(e) => setDirectMt(Number(e.target.value))}
                  placeholder="Count of MT cylinders"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-amber-700 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDirectCollectionModal(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-black uppercase tracking-wider shadow-xs"
                >
                  Record Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
