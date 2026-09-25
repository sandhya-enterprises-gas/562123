import React, { useState } from 'react';
import {
  Flame,
  Truck,
  CheckCircle2,
  MapPin,
  Building,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Info,
  Calendar,
  Lock,
  FileSpreadsheet,
  ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Language, OrderRecord } from '../types';
import { portalStore } from '../data/portalStore';
import { BUSINESS_INFO } from '../data/content';
import { OfficialLogoWatermark } from './common/OfficialLogoWatermark';
import { AppSheetEmbed } from './AppSheetEmbed';

interface CylinderBookingPageProps {
  lang: Language;
}

export const CylinderBookingPage: React.FC<CylinderBookingPageProps> = ({ lang }) => {
  const navigate = useNavigate();

  // Booking Mode: Official AppSheet Form or WhatsApp quick order
  const [bookingMode, setBookingMode] = useState<'whatsapp' | 'appsheet'>('appsheet');

  // Booking Form State
  const [selectedBrand, setSelectedBrand] = useState<'Bharat Gas' | 'Go Gas' | 'Power Gas'>('Bharat Gas');
  const [selectedCylinder, setSelectedCylinder] = useState('19kg Commercial VOT');
  const [quantity, setQuantity] = useState(2);
  const [deliveryArea, setDeliveryArea] = useState('Nelamangala Town (562123)');
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [emptyCylindersReturn, setEmptyCylindersReturn] = useState(2);

  // Success State
  const [bookedOrder, setBookedOrder] = useState<OrderRecord | null>(null);

  const directWhatsAppUrl = 'https://wa.me/918073407706?text=ಹಲೋ%2C%20ನನಗೆ%20ವಾಣಿಜ್ಯ%20ಸಿಲಿಂಡರ್%20ಬುಕಿಂಗ್%20ಮಾಡಬೇಕಾಗಿದೆ';

  const handleLogBooking = () => {
    try {
      const newOrderNum = `SE-2026-${Math.floor(100 + Math.random() * 900)}`;
      const newOrder: OrderRecord = {
        id: `ord-${Date.now()}`,
        orderNumber: newOrderNum,
        customerId: 'cust-walkin',
        customerName: contactPerson || 'Valued Commercial Client',
        businessName: businessName || 'Commercial Establishment',
        phone: phone || '8073407706',
        area: deliveryArea,
        cylinderBrand: selectedBrand,
        cylinderType: selectedCylinder,
        quantity: quantity,
        totalAmount: 0,
        amountPaid: 0,
        paymentMode: 'cash',
        emptyCylindersReturned: emptyCylindersReturn,
        emptyCylindersPending: Math.max(0, quantity - emptyCylindersReturn),
        status: 'placed',
        orderedAt: new Date().toISOString(),
        notes: `Address: ${address}`,
        isOneClick: false
      };

      portalStore.addOrder(newOrder);
      setBookedOrder(newOrder);
    } catch {
      // Handled gracefully
    }
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
                ? 'ಭಾರತ್ ಗ್ಯಾಸ್, ಗೋ ಗ್ಯಾಸ್ ಮತ್ತು ಪವರ್ ಗ್ಯಾಸ್ ಅಧಿಕೃತ ಪೂರೈಕೆ • ನೆಲಮಂಗಲದಲ್ಲಿ ತ್ವರಿತ ಡೆಲಿವರಿ.'
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
                    Dispatch notified to Sandhya Express delivery fleet. Delivery area: {bookedOrder.area}
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
                  href={directWhatsAppUrl}
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

        {/* Booking Method Selector (WhatsApp Quick Order vs Official AppSheet Form) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-auto">
            <button
              type="button"
              id="booking-mode-whatsapp-btn"
              onClick={() => setBookingMode('whatsapp')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                bookingMode === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'WhatsApp ತ್ವರಿತ ಬುಕಿಂಗ್' : 'Quick WhatsApp Order'}</span>
            </button>
            <button
              type="button"
              id="booking-mode-appsheet-btn"
              onClick={() => setBookingMode('appsheet')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                bookingMode === 'appsheet'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಅಧಿಕೃತ AppSheet ಫಾರ್ಮ್' : 'Official AppSheet Form'}</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/20 text-white">
                Online
              </span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 px-2 hidden sm:block">
            {bookingMode === 'whatsapp' ? (
              <span>
                {lang === 'kn' ? 'ನೇರ WhatsApp ಮೆಸೇಜ್ ಮೂಲಕ ಆರ್ಡರ್ ಕನ್ಫರ್ಮ್ ಆಗುತ್ತದೆ (+91 8073407706)' : 'Direct dispatch confirmation to +91 8073407706'}
              </span>
            ) : (
              <span>
                {lang === 'kn' ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಅಧಿಕೃತ AppSheet ಆನ್‌ಲೈನ್ ನಮೂನೆ' : 'Official Sandhya Enterprises AppSheet Portal'}
              </span>
            )}
          </div>
        </div>

        {/* View Mode 1: AppSheet Embedded Form */}
        {bookingMode === 'appsheet' ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Sandhya Enterprises Embedded AppSheet Form */}
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              <iframe 
                src="https://www.appsheet.com/start/789fbccb-644c-4975-a5ab-c345a8a4b5ac?raw=true" 
                width="100%" 
                height="650px" 
                style={{ border: '2px solid #ff5722', borderRadius: '8px' }} 
                allow="geolocation"
                title="Sandhya Enterprises Embedded AppSheet Form"
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setBookingMode('whatsapp')}
                className="text-xs font-bold text-slate-400 hover:text-amber-400 inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>{lang === 'kn' ? '← WhatsApp ತ್ವರಿತ ಬುಕಿಂಗ್ ಫಾರ್ಮ್‌ಗೆ ಹಿಂತಿರುಗಿ' : '← Switch back to WhatsApp Quick Order'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* View Mode 2: Main 2-Column Booking Form & Quality Assurance */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Interactive Booking Form */}
          <div className="lg:col-span-2 p-5 sm:p-7 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-6">
            <div className="space-y-5">
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

              {/* Step 3: Quantity Counter (Full Width, No Express/Scheduled buttons) */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
                  3. {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಪ್ರಮಾಣ (ಸಂಖ್ಯೆ)' : 'Number of Cylinders Required'}
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-lg flex items-center justify-center border border-slate-700 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xl font-black font-mono text-white w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-lg flex items-center justify-center border border-slate-700 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {[2, 4, 6, 10].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setQuantity(q)}
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                          quantity === q
                            ? 'bg-amber-500 text-slate-950 border-amber-500 font-black shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {q}x
                      </button>
                    ))}
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
                      Business / Restaurant Name
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Hotel Mayura Grand"
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Contact Person & Phone Number
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="Manager Name"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="8073407706"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Delivery Zone in Nelamangala
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

              {/* Direct WhatsApp Action Button: ಸಿಲಿಂಡರ್ ಆರ್ಡರ್ ದೃಢೀಕರಿಸಿ */}
              <div className="pt-2">
                <a
                  id="confirm-cylinder-order-whatsapp-btn"
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLogBooking}
                  className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl shadow-xl transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99] text-center group"
                >
                  <MessageCircle className="w-5 h-5 text-white shrink-0" />
                  <span>ಸಿಲಿಂಡರ್ ಆರ್ಡರ್ ದೃಢೀಕರಿಸಿ</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="mt-2 text-center">
                  <span className="text-[11px] text-slate-400">
                    WhatsApp: <strong className="text-emerald-400 font-mono">+91 8073407706</strong> • Instant Dispatch Confirmation
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                  <button
                    type="button"
                    onClick={() => setBookingMode('appsheet')}
                    className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 transition cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>{lang === 'kn' ? 'ಅಧಿಕೃತ AppSheet ಆನ್‌ಲೈನ್ ಫಾರ್ಮ್ ಮೂಲಕ ಸಲ್ಲಿಸಿ →' : 'Switch to Official AppSheet Online Form →'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Agency Trust Badges & Contact */}
          <div className="space-y-4">
            {/* Agency Trust Badges */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-white font-black border-b border-slate-800 pb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm uppercase tracking-wide">Sandhya Enterprises Assurance</span>
              </div>
              <ul className="space-y-2.5 text-slate-300 text-xs">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% PESO Certified Net Weight Inspection on Delivery</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Tamper-Proof Holographic Valve Seals</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Digital Passbook & Empty Cylinder Tally</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Emergency Leak Response Fleet in Nelamangala</span>
                </li>
              </ul>
            </div>

            {/* Helpline Action Card */}
            <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 text-center space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-orange-400 block">
                {lang === 'kn' ? 'ನೇರ ಸಂಪರ್ಕ & ಸಹಾಯವಾಣಿ' : 'Direct Helpline & Assistance'}
              </span>
              <p className="text-xs text-slate-400">
                {lang === 'kn'
                  ? 'ದರ ವಿಚಾರಣೆ ಅಥವಾ ತುರ್ತು ಸಿಲಿಂಡರ್ ಪೂರೈಕೆಗಾಗಿ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ:'
                  : 'For rate inquiries or urgent delivery assistance, contact our desk:'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRateEnquiry}`}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>+91 {BUSINESS_INFO.phoneRateEnquiry}</span>
                </a>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>+91 8073407706</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
