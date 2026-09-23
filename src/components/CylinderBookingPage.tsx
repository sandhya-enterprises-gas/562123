import React, { useState } from 'react';
import {
  Flame,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Building,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Zap,
  ArrowRight,
  Info,
  Calendar,
  IndianRupee,
  FileCheck2,
  Lock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Language, OrderRecord } from '../types';
import { portalStore } from '../data/portalStore';
import { BUSINESS_INFO } from '../data/content';
import { OfficialLogoWatermark, OfficialLogoBadge } from './common/OfficialLogoWatermark';

interface CylinderBookingPageProps {
  lang: Language;
}

export const CylinderBookingPage: React.FC<CylinderBookingPageProps> = ({ lang }) => {
  const navigate = useNavigate();

  // Booking Form State
  const [selectedBrand, setSelectedBrand] = useState<'Bharat Gas' | 'Go Gas' | 'Power Gas'>('Bharat Gas');
  const [selectedCylinder, setSelectedCylinder] = useState('19kg Commercial VOT');
  const [quantity, setQuantity] = useState(2);
  const [urgency, setUrgency] = useState<'express' | 'scheduled'>('express');
  const [deliveryArea, setDeliveryArea] = useState('Nelamangala Town (562123)');
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<'cash' | 'online' | 'credit'>('cash');
  const [emptyCylindersReturn, setEmptyCylindersReturn] = useState(2);

  // Success State
  const [bookedOrder, setBookedOrder] = useState<OrderRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rate estimates
  const getBaseRate = () => {
    if (selectedCylinder.includes('47.5kg')) return 4450;
    if (selectedCylinder.includes('33kg')) return 3100;
    if (selectedBrand === 'Go Gas') return 1880;
    if (selectedBrand === 'Power Gas') return 1850;
    return 1900; // Bharat Gas 19kg
  };

  const unitRate = getBaseRate();
  const subtotal = unitRate * quantity;
  const gstAmount = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + gstAmount;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newOrderNum = `SE-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: OrderRecord = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNum,
      customerId: 'cust-walkin',
      customerName: contactPerson || 'Valued Commercial Client',
      businessName: businessName || 'Commercial Establishment',
      phone: phone || '9845112233',
      area: deliveryArea,
      cylinderBrand: selectedBrand,
      cylinderType: selectedCylinder,
      quantity: quantity,
      totalAmount: totalAmount,
      amountPaid: paymentPreference === 'cash' ? 0 : totalAmount,
      paymentMode: paymentPreference === 'credit' ? 'pending' : paymentPreference,
      emptyCylindersReturned: emptyCylindersReturn,
      emptyCylindersPending: Math.max(0, quantity - emptyCylindersReturn),
      status: 'placed',
      orderedAt: new Date().toISOString(),
      notes: `${urgency === 'express' ? '⚡ EXPRESS 45-MIN DELIVERY REQUEST' : 'Scheduled Delivery'}. Address: ${address}`,
      isOneClick: false
    };

    // Add to real portal store
    portalStore.addOrder(newOrder);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookedOrder(newOrder);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const getWhatsAppBookingUrl = () => {
    const text = `🔥 *SANDHYA ENTERPRISES - COMMERCIAL LPG CYLINDER BOOKING*\n\n` +
      `📦 *Order Ref:* ${bookedOrder?.orderNumber || 'NEW-BOOKING'}\n` +
      `🏢 *Establishment:* ${businessName}\n` +
      `👤 *Contact:* ${contactPerson} (+91 ${phone})\n` +
      `📍 *Location:* ${deliveryArea}\n` +
      `🏠 *Address:* ${address}\n` +
      `*Brand & Spec:* ${selectedBrand} - ${selectedCylinder}\n` +
      `🔢 *Quantity:* ${quantity} Cylinders\n` +
      `⚡ *Urgency:* ${urgency === 'express' ? 'EXPRESS 45-MINUTES' : 'Standard Scheduled'}\n` +
      `💰 *Estimated Bill:* ₹${totalAmount.toLocaleString('en-IN')} (inc. 18% GST)\n` +
      `🔄 *Empty MT Cylinders to Return:* ${emptyCylindersReturn}\n\n` +
      `Please dispatch immediately via Sandhya Express delivery vehicle!`;
    return `https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <OfficialLogoWatermark opacity={0.035} />

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        {/* Breadcrumb & Heading */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <Link to="/" className="hover:text-amber-400 transition-colors">
                {lang === 'kn' ? 'ಮುಖ್ಯ ಪುಟ' : 'Home'}
              </Link>
              <span>/</span>
              <span className="text-amber-400">
                {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್' : 'Cylinder Booking'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Flame className="w-7 h-7 text-orange-500 shrink-0" />
              <span>
                {lang === 'kn' ? 'ವಾಣಿಜ್ಯ ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ ಪೋರ್ಟಲ್' : 'Commercial LPG Cylinder Booking'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'kn'
                ? 'ಭಾರತ್ ಗ್ಯಾಸ್, ಗೋ ಗ್ಯಾಸ್ ಮತ್ತು ಪವರ್ ಗ್ಯಾಸ್ ಅಧಿಕೃತ ಪೂರೈಕೆ • ನೆಲಮಂಗಲದಲ್ಲಿ 45-ನಿಮಿಷಗಳ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಡೆಲಿವರಿ.'
                : 'Direct commercial LPG refilling & bulk order dispatch in Nelamangala (562123) with 100% verified weight.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/track-order"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition border border-slate-700 flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'kn' ? 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ' : 'Track Order'}</span>
            </Link>
            <Link
              to="/customer"
              className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-wider transition shadow-md flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಗ್ರಾಹಕರ ಲಾಗಿನ್' : 'Customer Portal'}</span>
            </Link>
          </div>
        </div>

        {/* Confirmation Banner if Just Booked */}
        {bookedOrder && (
          <div className="p-6 rounded-3xl bg-emerald-950/80 border-2 border-emerald-500/50 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                      {lang === 'kn' ? 'ಬುಕಿಂಗ್ ಯಶಸ್ವಿಯಾಗಿದೆ!' : 'BOOKING CONFIRMED & LOGGED'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-900 border border-emerald-400/40 text-[10px] font-mono text-emerald-200 font-bold">
                      {bookedOrder.orderNumber}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">
                    {bookedOrder.quantity}x {bookedOrder.cylinderType} booked for {bookedOrder.businessName}
                  </h3>
                  <p className="text-xs text-emerald-300">
                    Dispatch notified to Sandhya Express delivery fleet. Scheduled delivery area: {bookedOrder.area}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => navigate('/track-order')}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>{lang === 'kn' ? 'ಈಗಲೇ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ' : 'Track This Order Now'}</span>
                </button>
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Alert</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Main 2-Column Booking Form & Cost Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Interactive Booking Form */}
          <div className="lg:col-span-2 p-5 sm:p-7 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-6">
            <form onSubmit={handleSubmitBooking} className="space-y-5">
              {/* Step 1: Brand Selection */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
                  1. {lang === 'kn' ? 'ಅಧಿಕೃತ ಎಲ್‌ಪಿಜಿ ಬ್ರ್ಯಾಂಡ್ ಆಯ್ಕೆಮಾಡಿ' : 'Select Official LPG Brand'}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'Bharat Gas' as const, label: 'Bharat Gas (BPCL)', desc: 'Official Authorized Commercial' },
                    { id: 'Go Gas' as const, label: 'Go Gas (Private)', desc: 'Rapid 17kg/21kg Commercial' },
                    { id: 'Power Gas' as const, label: 'Power Gas', desc: 'Commercial VOT Standard' }
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBrand(b.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedBrand === b.id
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/30'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-black block text-white">{b.label}</span>
                      <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{b.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Cylinder Capacity & Spec */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
                  2. {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಸಾಮರ್ಥ್ಯ ಆಯ್ಕೆಮಾಡಿ' : 'Cylinder Capacity & Variant'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: '19kg Commercial VOT', label: '19 KG Commercial (VOT)', sub: 'Standard Hotel & Kitchen' },
                    { id: '33kg Commercial LOT/VOT', label: '33 KG Commercial', sub: 'High Volume Burners' },
                    { id: '47.5kg Industrial Bulk', label: '47.5 KG Industrial', sub: 'Factory / Heavy Catering' }
                  ].map((cyl) => (
                    <button
                      key={cyl.id}
                      type="button"
                      onClick={() => setSelectedCylinder(cyl.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedCylinder === cyl.id
                          ? 'bg-orange-600/15 border-orange-500 text-white shadow-lg ring-1 ring-orange-500/30'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-black block text-white">{cyl.label}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{cyl.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Quantity Counter & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
                    3. {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಪ್ರಮಾಣ (ಸಂಖ್ಯೆ)' : 'Number of Cylinders Required'}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-lg flex items-center justify-center border border-slate-700"
                    >
                      -
                    </button>
                    <span className="text-xl font-black font-mono text-white w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-lg flex items-center justify-center border border-slate-700"
                    >
                      +
                    </button>

                    <div className="flex items-center gap-1.5 ml-2">
                      {[2, 4, 6, 10].map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => setQuantity(q)}
                          className={`px-2 py-1 rounded-lg text-xs font-mono font-bold border transition ${
                            quantity === q
                              ? 'bg-amber-500 text-slate-950 border-amber-500 font-black'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {q}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
                    {lang === 'kn' ? 'ಡೆಲಿವರಿ ತುರ್ತು (ವೇಗ)' : 'Delivery Urgency'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setUrgency('express')}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        urgency === 'express'
                          ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 text-xs font-black">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Express 45-Min</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Priority dispatch</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUrgency('scheduled')}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        urgency === 'scheduled'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 text-xs font-black">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>Scheduled</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Regular slot</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 4: Commercial Establishment Details */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                  4. {lang === 'kn' ? 'ವಾಣಿಜ್ಯ ಸಂಸ್ಥೆ ಮತ್ತು ಡೆಲಿವರಿ ವಿಳಾಸ' : 'Commercial Client & Delivery Address'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Business / Restaurant Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Hotel Mayura Grand"
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Contact Person & Phone Number *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="Manager Name"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98XXXXXXXX"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Delivery Zone in Nelamangala *
                    </label>
                    <select
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Nelamangala Town (562123)">Nelamangala Town (562123)</option>
                      <option value="Sharapurapalya (Near Agency - 562123)">Sharapurapalya (562123)</option>
                      <option value="Nelamangala Rural (562123)">Nelamangala Rural (562123)</option>
                      <option value="Dobbaspet / Dabaspet Industrial Belt">Dobbaspet Industrial Belt</option>
                      <option value="Tumkur Highway Corridor">Tumkur Highway Corridor</option>
                      <option value="Bengaluru Rural Commercial Area">Bengaluru Rural Commercial Area</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Empty (MT) Cylinders Ready for Exchange
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={emptyCylindersReturn}
                      onChange={(e) => setEmptyCylindersReturn(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Street Address / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Near BGS Circle / Opposite Highway Fuel Station..."
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all duration-150 flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer active:scale-[0.99]"
              >
                <Flame className="w-5 h-5 text-amber-300" />
                <span>
                  {isSubmitting
                    ? 'Transmitting Booking to Fleet Dispatch...'
                    : lang === 'kn'
                    ? 'ಸಿಲಿಂಡರ್ ಆರ್ಡರ್ ದೃಢೀಕರಿಸಿ (ಬುಕ್ ಮಾಡಿ)'
                    : `CONFIRM & BOOK ${quantity} CYLINDERS`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right 1 Col: Live Estimate & Agency Assurance */}
          <div className="space-y-4">
            {/* Commercial Invoice Estimate Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Estimated Commercial Bill
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  GSTIN: {BUSINESS_INFO.gstin}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>
                    {selectedBrand} {selectedCylinder} (x{quantity})
                  </span>
                  <span className="font-mono text-slate-200">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Commercial GST (18% ITC Eligible)</span>
                  <span className="font-mono text-slate-200">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Nelamangala Express Delivery</span>
                  <span className="text-emerald-400 font-bold uppercase text-[10px]">FREE / INCLUDED</span>
                </div>
                <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-sm font-black">
                  <span className="text-white">Estimated Total</span>
                  <span className="font-mono text-emerald-400 text-lg">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Exact rates vary slightly per daily PSU gazette notification. Official GST tax invoice issued upon delivery.
                </span>
              </div>
            </div>

            {/* Agency Trust Badges */}
            <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-white font-black">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Sandhya Enterprises Quality Assurance</span>
              </div>
              <ul className="space-y-2 text-slate-400 text-[11px]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>100% PESO Certified Net Weight Inspection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Tamper-Proof Holographic Valve Seals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Digital Passbook & Empty Cylinder Tally</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Emergency Leak Response Fleet on Call</span>
                </li>
              </ul>
            </div>

            {/* Helpline Action */}
            <div className="p-4 rounded-2xl bg-orange-600/10 border border-orange-500/30 text-center space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 block">
                Prefer Phone or WhatsApp Booking?
              </span>
              <div className="flex items-center justify-center gap-2">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
                  className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>+91 {BUSINESS_INFO.phoneRateEnquiry}</span>
                </a>
                <a
                  href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(
                    'Hello Sandhya Enterprises! I want to book commercial LPG cylinders in Nelamangala.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
