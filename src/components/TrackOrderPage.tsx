import React, { useState, useEffect } from 'react';
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Flame,
  PhoneCall,
  MessageCircle,
  FileText,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Building2,
  Calendar,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language, OrderRecord } from '../types';
import { portalStore, PortalState } from '../data/portalStore';
import { BUSINESS_INFO } from '../data/content';
import { OfficialLogoBadge, OfficialLogoWatermark } from './common/OfficialLogoWatermark';
import { ThermalLedgerReceipt } from './portal/ThermalLedgerReceipt';

interface TrackOrderPageProps {
  lang: Language;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ lang }) => {
  const [storeState, setStoreState] = useState<PortalState>(portalStore.getState());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<OrderRecord | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [showThermalReceipt, setShowThermalReceipt] = useState(false);

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setStoreState({ ...portalStore.getState() });
    });
    return () => unsub();
  }, []);

  // Default to the first active/recent order if none searched yet
  useEffect(() => {
    if (!searchedOrder && storeState.orders.length > 0 && !searchAttempted) {
      setSearchedOrder(storeState.orders[0]);
    }
  }, [storeState.orders, searchedOrder, searchAttempted]);

  const handleSearch = (queryToUse?: string) => {
    const q = (queryToUse !== undefined ? queryToUse : searchQuery).trim().toLowerCase();
    setSearchAttempted(true);

    if (!q) {
      setSearchedOrder(null);
      return;
    }

    const match = storeState.orders.find((o) => {
      const ordNum = (o.orderNumber || o.id).toLowerCase();
      const phone = (o.phone || '').replace(/\D/g, '');
      const cleanQ = q.replace(/\D/g, '');
      const bizName = (o.businessName || '').toLowerCase();
      const custName = (o.customerName || '').toLowerCase();

      return (
        ordNum.includes(q) ||
        (cleanQ.length >= 4 && phone.includes(cleanQ)) ||
        bizName.includes(q) ||
        custName.includes(q)
      );
    });

    setSearchedOrder(match || null);
  };

  const getStepProgress = (status: OrderRecord['status']) => {
    switch (status) {
      case 'placed':
        return 1;
      case 'confirmed':
        return 2;
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  const steps = [
    {
      num: 1,
      titleEn: 'Order Booked & GST Logged',
      titleKn: 'ಆರ್ಡರ್ ಬುಕಿಂಗ್ & ಜಿಎಸ್‌ಟಿ ನೋಂದಣಿ',
      descEn: 'Commercial LPG booking received and entered into agency delivery manifest.',
      descKn: 'ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ ಬುಕಿಂಗ್ ಸ್ವೀಕರಿಸಲಾಗಿದೆ ಮತ್ತು ಡಿಸ್ಪ್ಯಾಚ್ ಪಟ್ಟಿಗೆ ಸೇರಿಸಲಾಗಿದೆ.'
    },
    {
      num: 2,
      titleEn: 'PESO Safety & Net Weight Checked',
      titleKn: 'ಸುರಕ್ಷತೆ ಮತ್ತು ನಿವ್ವಳ ತೂಕ ತಪಾಸಣೆ',
      descEn: '100% PESO inspection passed, valve sealed with holographic tamper-proof seal.',
      descKn: '100% ನಿಖರ ತೂಕ ಮತ್ತು ಕವಾಟ ಸೋರಿಕೆ ಮುಕ್ತ ಮುದ್ರೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.'
    },
    {
      num: 3,
      titleEn: 'Loaded & Out for Express Delivery',
      titleKn: 'ವಾಹನಕ್ಕೆ ಲೋಡ್ & ಡೆಲಿವರಿಗೆ ಹೊರಟಿದೆ',
      descEn: 'On route via Sandhya Fleet (Tata Ace KA-52-LPG-1901). Nelamangala delivery ETA ~35-45 mins.',
      descKn: 'ಸಂಧ್ಯಾ ವಾಹನದಲ್ಲಿ ಡೆಲಿವರಿಗೆ ಹೊರಟಿದೆ. ಅಂದಾಜು ಸಮಯ ~35-45 ನಿಮಿಷಗಳು.'
    },
    {
      num: 4,
      titleEn: 'Delivered & Empty (MT) Cylinders Collected',
      titleKn: 'ಡೆಲಿವರಿ ಪೂರ್ಣ & ಖಾಲಿ ಸಿಲಿಂಡರ್ ಸಂಗ್ರಹ',
      descEn: 'Cylinders connected, physical leak tested, digital receipt & empty ledger recorded.',
      descKn: 'ಸಿಲಿಂಡರ್ ಜೋಡಣೆ, ಸೋರಿಕೆ ಪರೀಕ್ಷೆ ಮತ್ತು ಡಿಜಿಟಲ್ ರಸೀದಿ ಮುಕ್ತಾಯ.'
    }
  ];

  const currentStep = searchedOrder ? getStepProgress(searchedOrder.status) : 1;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <OfficialLogoWatermark opacity={0.035} />

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        {/* Top Header Breadcrumb & Title */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <Link to="/" className="hover:text-amber-400 transition-colors">
                {lang === 'kn' ? 'ಮುಖ್ಯ ಪುಟ' : 'Home'}
              </Link>
              <span>/</span>
              <span className="text-amber-400">{lang === 'kn' ? 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್' : 'Track Order'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Truck className="w-7 h-7 text-amber-500 shrink-0" />
              <span>
                {lang === 'kn' ? 'ಲೈವ್ ಸಿಲಿಂಡರ್ ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್' : 'Live LPG Order Tracking'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'kn'
                ? 'ನೆಲಮಂಗಲ, ದಾಬಾಸ್‌ಪೇಟೆ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಪ್ರದೇಶಗಳ ಲೈವ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಡೆಲಿವರಿ ಸ್ಥಿತಿ.'
                : 'Real-time dispatch, transit & delivery updates for commercial LPG cylinders in Nelamangala (562123).'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/booking"
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-wider transition shadow-md flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಹೊಸ ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್' : 'Book New Cylinder'}</span>
            </Link>
            <Link
              to="/customer"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition border border-slate-700"
            >
              {lang === 'kn' ? 'ಗ್ರಾಹಕರ ಲಾಗಿನ್' : 'Customer Portal'}
            </Link>
          </div>
        </div>

        {/* Search Bar Card */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'kn'
                    ? 'ಆರ್ಡರ್ ಸಂಖ್ಯೆ (ಉದಾ: SE-2026-101) ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ...'
                    : 'Enter Order Number (e.g. SE-2026-101) or Registered Mobile Number...'
                }
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{lang === 'kn' ? 'ಸ್ಥಿತಿ ಹುಡುಕಿ' : 'Track Status'}</span>
            </button>
          </form>

          {/* Quick Click Sample Orders */}
          <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">
              {lang === 'kn' ? 'ಉದಾಹರಣೆ ಆರ್ಡರ್‌ಗಳು:' : 'Quick Sample Orders:'}
            </span>
            {storeState.orders.slice(0, 4).map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => {
                  setSearchQuery(order.orderNumber || order.id);
                  handleSearch(order.orderNumber || order.id);
                }}
                className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition cursor-pointer flex items-center gap-1.5 ${
                  searchedOrder?.id === order.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span>{order.orderNumber || order.id}</span>
                <span className="text-[10px] text-slate-400 font-sans">({order.businessName})</span>
              </button>
            ))}
          </div>
        </div>

        {/* If Order Found: Detailed Live Tracking Display */}
        {searchedOrder ? (
          <div className="space-y-6">
            {/* Order Highlight Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-black tracking-wider">
                      {searchedOrder.orderNumber || searchedOrder.id}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        searchedOrder.status === 'delivered'
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                          : searchedOrder.status === 'out_for_delivery'
                          ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse'
                          : 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                      }`}
                    >
                      {searchedOrder.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                    {searchedOrder.businessName || searchedOrder.customerName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1 font-medium">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {searchedOrder.area || 'Nelamangala (562123)'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(searchedOrder.orderedAt).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-slate-300">
                      Contact: +91 {searchedOrder.phone}
                    </span>
                  </div>
                </div>

                <div className="text-right flex flex-col sm:items-end">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Total Billed Amount (Inc. GST)
                  </span>
                  <span className="text-2xl font-black text-emerald-400">
                    ₹{searchedOrder.totalAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    {searchedOrder.quantity}x {searchedOrder.cylinderType || searchedOrder.cylinderBrand}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowThermalReceipt(true)}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Digital Receipt</span>
                  </button>
                </div>
              </div>

              {/* Visual 4-Step Progress Tracker */}
              <div className="py-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  {steps.map((step) => {
                    const isCompleted = step.num < currentStep || (step.num === 4 && searchedOrder.status === 'delivered');
                    const isCurrent = step.num === currentStep && searchedOrder.status !== 'delivered';
                    const isPending = step.num > currentStep;

                    return (
                      <div
                        key={step.num}
                        className={`p-4 rounded-2xl border transition-all ${
                          isCompleted
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                            : isCurrent
                            ? 'bg-amber-950/40 border-amber-500/60 text-amber-200 shadow-lg ring-1 ring-amber-500/30'
                            : 'bg-slate-900/40 border-slate-800 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center ${
                              isCompleted
                                ? 'bg-emerald-500 text-slate-950'
                                : isCurrent
                                ? 'bg-amber-500 text-slate-950 animate-pulse'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Upcoming'}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold leading-snug text-white mb-1">
                          {lang === 'kn' ? step.titleKn : step.titleEn}
                        </h4>
                        <p className="text-[11px] leading-relaxed text-slate-400">
                          {lang === 'kn' ? step.descKn : step.descEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Express Fleet & Driver Dispatch Card */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                      Assigned Sandhya Express Delivery Fleet
                    </span>
                    <h4 className="text-sm font-black text-white">
                      Tata Ace Vehicle • KA-52-LPG-1901
                    </h4>
                    <p className="text-xs text-slate-400">
                      Route Supervisor: Manjunath • Emergency Radio & Safety Certified
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Driver / Desk</span>
                  </a>
                  <a
                    href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
                      `Hello Sandhya Enterprises! I am tracking my commercial LPG Order #${searchedOrder.orderNumber || searchedOrder.id} for ${searchedOrder.businessName}. Please update delivery ETA.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp ETA</span>
                  </a>
                </div>
              </div>

              {/* MT Cylinders & Payment Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Cylinder Specifications
                  </span>
                  <p className="text-sm font-black text-white mt-1">
                    {searchedOrder.quantity} Cylinders ({searchedOrder.cylinderType || searchedOrder.cylinderBrand})
                  </p>
                  <span className="text-[11px] text-emerald-400 font-semibold">100% Net Weight Verified</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Empty (MT) Cylinder Balance
                  </span>
                  <p className="text-sm font-black text-amber-400 mt-1">
                    {searchedOrder.emptyCylindersPending || 0} MT Due on Exchange
                  </p>
                  <span className="text-[11px] text-slate-400">Recorded on Ledger</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Payment Mode & GST Invoice
                  </span>
                  <p className="text-sm font-black text-white mt-1 uppercase">
                    {searchedOrder.paymentMode} ({BUSINESS_INFO.gstin})
                  </p>
                  <span className="text-[11px] text-slate-400">Digital Tax Invoice Ready</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* If searched and not found */
          <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
            <div>
              <h3 className="text-lg font-black text-white">No Order Found Matching &quot;{searchQuery}&quot;</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Please check the order number or mobile number. Commercial bookings are registered instantly upon call, WhatsApp, or customer portal order.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (storeState.orders.length > 0) {
                    setSearchedOrder(storeState.orders[0]);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition"
              >
                View Latest Live Order
              </button>
              <Link
                to="/booking"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition"
              >
                Book Cylinders Now
              </Link>
            </div>
          </div>
        )}

        {/* Modal Thermal Receipt */}
        {showThermalReceipt && searchedOrder && (
          <ThermalLedgerReceipt
            customer={{
              id: searchedOrder.customerId,
              businessName: searchedOrder.businessName,
              contactPerson: searchedOrder.customerName,
              phone: searchedOrder.phone,
              businessType: 'Restaurant / Hotel',
              area: searchedOrder.area,
              pincode: '562123',
              preferredBrand: searchedOrder.cylinderBrand as any,
              balanceAmount: searchedOrder.totalAmount - (searchedOrder.amountPaid || 0),
              emptyCylindersDue: searchedOrder.emptyCylindersPending || 0,
              createdAt: searchedOrder.orderedAt
            }}
            recentOrders={[searchedOrder]}
            recentLedger={[]}
            onClose={() => setShowThermalReceipt(false)}
            lang={lang}
          />
        )}
      </div>
    </div>
  );
};
