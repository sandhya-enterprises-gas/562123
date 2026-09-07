import React, { useState } from 'react';
import { Calculator, MessageCircle, PhoneCall, CheckCircle2, Flame, MapPin, Building, Sparkles, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface OrderQuoteCalculatorProps {
  lang: Language;
}

export const OrderQuoteCalculator: React.FC<OrderQuoteCalculatorProps> = ({ lang }) => {
  const [businessType, setBusinessType] = useState('Hotel / Restaurant');
  const [brand, setBrand] = useState('Bharat Gas');
  const [cylinderType, setCylinderType] = useState('19kg Commercial');
  const [quantity, setQuantity] = useState(4);
  const [location, setLocation] = useState('Nelamangala Town');
  const [needPipeline, setNeedPipeline] = useState(false);
  const [needStoveAccessories, setNeedStoveAccessories] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const businessTypes = [
    { en: 'Hotel / Restaurant / Cafe', kn: 'ಹೋಟೆಲ್ / ರೆಸ್ಟೋರೆಂಟ್ / ಕೆಫೆ 🍔' },
    { en: 'Highway Dhaba / Fast Food', kn: 'ಹೈವೇ ದಾಬಾ / ಫಾಸ್ಟ್ ಫುಡ್ 🍛' },
    { en: 'Bakery / Sweet Stall', kn: 'ಬೇಕರಿ / ಸ್ವೀಟ್ ಸ್ಟಾಲ್ 🍞' },
    { en: 'Catering Service / Events', kn: 'ಕ್ಯಾಟರಿಂಗ್ / ಸಮಾರಂಭಗಳು 🍲' },
    { en: 'Marriage Hall (Kalyana Mantapa)', kn: 'ಕಲ್ಯಾಣ ಮಂಟಪ / ಪಾರ್ಟಿ ಹಾಲ್ 🏢' },
    { en: 'Industrial / Factory Bulk Supply', kn: 'ಕೈಗಾರಿಕೆ / ಫ್ಯಾಕ್ಟರಿ ಬಲ್ಕ್ 🏭' },
    { en: 'Domestic Residential / PG', kn: 'ಗೃಹ ಬಳಕೆ / ಪಿಜಿ (PG) 🏠' }
  ];

  const brands = [
    { name: 'Bharat Gas', value: 'Bharat Gas' },
    { name: 'GoGas (Commercial LPG)', value: 'Go Gas' },
    { name: 'Power Gas (Commercial)', value: 'Power Gas Commercial' },
    { name: 'Power Gas (Domestic)', value: 'Power Gas Domestic' }
  ];

  const cylinderOptions = [
    { label: '19 KG Commercial VOT (Standard)', value: '19kg Commercial' },
    { label: '33 KG Commercial LOT/VOT (High Load)', value: '33kg Commercial' },
    { label: '47.5 KG Industrial Cylinder (Bulk)', value: '47.5kg Industrial' },
    { label: '17 KG / 21 KG Go Gas Private Cylinder', value: '17kg/21kg Go Gas' },
    { label: '14.2 KG Domestic Cylinder', value: '14.2kg Domestic' }
  ];

  const locations = [
    { en: 'Nelamangala Town (Daily Delivery - 562123)', kn: 'ನೆಲಮಂಗಲ ಟೌನ್ (ದೈನಂದಿನ ಡೆಲಿವರಿ - 562123)' },
    { en: 'Nelamangala Rural (562123)', kn: 'ನೆಲಮಂಗಲ ಗ್ರಾಮಾಂತರ (562123)' },
    { en: 'Bengaluru Rural Commercial Hub', kn: 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ ವಾಣಿಜ್ಯ ವಲಯ' },
    { en: 'Tumkur Town & Highway (Bulk Orders 10-15+ Cylinders Only)', kn: 'ತುಮಕೂರು (ಕೇವಲ 10-15+ ಬಲ್ಕ್ ಆರ್ಡರ್ ಮಾತ್ರ)' },
    { en: 'Sira Region (Bulk Orders 10-15+ Cylinders Only)', kn: 'ಶಿರಾ ಭಾಗ (ಕೇವಲ 10-15+ ಬಲ್ಕ್ ಆರ್ಡರ್ ಮಾತ್ರ)' },
    { en: 'Dobbaspet / Dabaspet Industrial Belt', kn: 'ದಾಬಾಸ್‌ಪೇಟೆ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಏರಿಯಾ' },
    { en: 'Other Location in Karnataka (Bulk)', kn: 'ಇತರ ಪ್ರದೇಶ (ಬಲ್ಕ್ ಆರ್ಡರ್)' }
  ];

  const generateWhatsAppMessage = () => {
    let msg = `🔥 *SANDHYA ENTERPRISES - COMMERCIAL LPG INQUIRY*\n\n`;
    if (customerName) msg += `👤 *Client Name:* ${customerName}\n`;
    if (customerPhone) msg += `📱 *Contact Phone:* ${customerPhone}\n`;
    msg += `🏢 *Business Category:* ${businessType}\n`;
    msg += `*Selected Gas Brand:* ${brand}\n`;
    msg += `📦 *Cylinder Size:* ${cylinderType}\n`;
    msg += `🔢 *Quantity Required:* ${quantity} Cylinders\n`;
    msg += `📍 *Delivery Area:* ${location}\n`;
    if (needPipeline) msg += `🔧 *Requirement:* Commercial Pipeline Installation / Manifold Setup Needed\n`;
    if (needStoveAccessories) msg += `🍳 *Requirement:* Commercial Burners / High Pressure Regulators Needed\n`;
    msg += `\n💬 *Request:* Please provide today's best discounted monthly rate, delivery schedule, and billing details. Thank you!`;

    return encodeURIComponent(msg);
  };

  return (
    <section id="calculator" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-orange-100 text-orange-900 text-[10px] font-black uppercase tracking-widest border border-orange-200">
            <Calculator className="w-3 h-3 text-orange-700" />
            <span>{lang === 'kn' ? 'ತ್ವರಿತ ದರ & ಬುಕಿಂಗ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್' : 'INSTANT RATE & ORDER ESTIMATOR'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            {lang === 'kn' ? (
              <>
                ನಿಮ್ಮ ಅಗತ್ಯ ತಿಳಿಸಿ,{' '}
                <span className="text-orange-600">ಇಂದಿನ ಅತ್ಯುತ್ತಮ ದರ ಪಡೆಯಿರಿ</span>
              </>
            ) : (
              <>
                Select Your Requirements &{' '}
                <span className="text-orange-600">Get Today's Best Bulk Quote</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm">
            {lang === 'kn'
              ? 'ಕೆಳಗಿನ ವಿವರಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕಳುಹಿಸಿ, ನಮ್ಮ ತಂಡವು ತಕ್ಷಣವೇ ಇಂದಿನ ರಿಯಾಯಿತಿ ದರ ಮತ್ತು ಡೆಲಿವರಿ ಸಮಯವನ್ನು ತಿಳಿಸುತ್ತದೆ.'
              : 'Select your business category, cylinders, and area. Generates an instant quote inquiry sent directly to our dispatch desk.'}
          </p>
        </div>

        {/* Form Container Card in High Density Style */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden p-5 sm:p-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Left Column: Selections */}
            <div className="space-y-4">
              {/* Business Type */}
              <div>
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  1. {lang === 'kn' ? 'ವ್ಯವಹಾರದ ವಿಧ (Business Category)' : 'Business Category'}
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  {businessTypes.map((b, idx) => (
                    <option key={idx} value={b.en}>
                      {lang === 'kn' ? b.kn : b.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gas Brand */}
              <div>
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  2. {lang === 'kn' ? 'ಗ್ಯಾಸ್ ಬ್ರ್ಯಾಂಡ್ (Brand Choice)' : 'Gas Brand'}
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  {brands.map((br, idx) => (
                    <option key={idx} value={br.value}>
                      {br.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cylinder Size */}
              <div>
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  3. {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ತೂಕ / ವಿಧ (Cylinder Size)' : 'Cylinder Size / Type'}
                </label>
                <select
                  value={cylinderType}
                  onChange={(e) => setCylinderType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  {cylinderOptions.map((c, idx) => (
                    <option key={idx} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Counter */}
              <div>
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  4. {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಸಂಖ್ಯೆ (Quantity)' : 'Quantity Required'}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-slate-100 text-slate-900 font-black text-lg hover:bg-slate-200 flex items-center justify-center border border-slate-200 transition-colors"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg font-black text-sm text-slate-900">
                    {quantity} {lang === 'kn' ? 'ಸಿಲಿಂಡರ್‌ಗಳು' : 'Cylinders'}
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-orange-600 text-white font-black text-lg hover:bg-orange-700 flex items-center justify-center transition-colors shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Location, Addons & Contact */}
            <div className="space-y-4">
              {/* Location */}
              <div>
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  5. {lang === 'kn' ? 'ಡೆಲಿವರಿ ವಿಳಾಸ / ವಲಯ (Delivery Area)' : 'Delivery Area'}
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc.en}>
                      {lang === 'kn' ? loc.kn : loc.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Services Checkboxes */}
              <div>
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  6. {lang === 'kn' ? 'ಹೆಚ್ಚುವರಿ ಸೇವೆಗಳು (Add-ons)' : 'Add-on Requirements'}
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:bg-orange-50/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={needPipeline}
                      onChange={(e) => setNeedPipeline(e.target.checked)}
                      className="w-3.5 h-3.5 text-orange-600 rounded border-slate-300 focus:ring-orange-500"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      {lang === 'kn'
                        ? 'ಗ್ಯಾಸ್ ಪೈಪ್‌ಲೈನ್ ಇನ್‌ಸ್ಟಾಲೇಶನ್ & ಮ್ಯಾನಿಫೋಲ್ಡ್ ಫಿಟ್ಟಿಂಗ್'
                        : 'Gas Pipeline Installation & Manifold Fitting'}
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:bg-orange-50/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={needStoveAccessories}
                      onChange={(e) => setNeedStoveAccessories(e.target.checked)}
                      className="w-3.5 h-3.5 text-orange-600 rounded border-slate-300 focus:ring-orange-500"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      {lang === 'kn'
                        ? 'ಕಮರ್ಷಿಯಲ್ ಬರ್ನರ್‌ಗಳು / ಹೈ ಪ್ರೆಶರ್ ರೆಗ್ಯುಲೇಟರ್'
                        : 'Commercial Burners / High Pressure Regulators'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">
                    {lang === 'kn' ? 'ನಿಮ್ಮ ಹೆಸರು / ಸಂಸ್ಥೆ' : 'Your Business Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'kn' ? 'ಉದಾ: ಶ್ರೀ ಬಾಲಾಜಿ ಹೋಟೆಲ್' : 'e.g. Balaji Restaurant'}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">
                    {lang === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    placeholder="8152889500"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Rate Warning Highlight Inside Calculator */}
          <div className="mt-5 p-3 rounded-lg bg-orange-50 border-l-4 border-orange-600 border border-orange-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-orange-950">
              <span className="font-black text-orange-900 uppercase">
                {lang === 'kn' ? 'ಪ್ರಮುಖ ಸೂಚನೆ: ' : 'MONTHLY RATE REVISION: '}
              </span>
              {lang === 'kn'
                ? 'ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ದರಗಳು ಪ್ರತಿ ತಿಂಗಳು ಸರ್ಕಾರ ಮತ್ತು ತೈಲ ಕಂಪನಿಗಳಿಂದ ಪರಿಷ್ಕರಣೆಯಾಗುತ್ತವೆ. ಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿ ಇಂದಿನ ರಿಯಾಯಿತಿ ದರ ಪಡೆಯಿರಿ.'
                : 'Commercial gas rates change on 1st of every month. Submit your request below to receive today\'s exact bulk rate from Sandhya Enterprises.'}
            </div>
          </div>

          {/* Action CTAs in High Density Style */}
          <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-2.5">
            <a
              id="calc-whatsapp-submit-btn"
              href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs uppercase tracking-wider shadow-xs transition-colors text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'kn' ? 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಇಂದಿನ ದರ ಪಡೆಯಿರಿ' : 'SEND WHATSAPP INQUIRY FOR TODAY\'S RATE'}</span>
            </a>

            <a
              id="calc-call-submit-btn"
              href={`tel:${BUSINESS_INFO.phonePrimary}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-xs transition-colors text-center"
            >
              <PhoneCall className="w-4 h-4 text-orange-400" />
              <span>{lang === 'kn' ? 'ಕರೆ: 8152889500' : 'CALL 8152889500'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
