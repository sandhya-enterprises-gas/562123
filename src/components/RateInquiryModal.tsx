import React, { useState } from 'react';
import { X, Flame, PhoneCall, MessageCircle, AlertTriangle, Check } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO, CYLINDER_PRODUCTS } from '../data/content';

interface RateInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialBrand?: string;
}

export const RateInquiryModal: React.FC<RateInquiryModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialBrand
}) => {
  const [selectedBrand, setSelectedBrand] = useState(initialBrand || 'Bharat Gas 19kg');
  const [cylCount, setCylCount] = useState(3);
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('Nelamangala');

  if (!isOpen) return null;

  const handleWhatsAppSend = () => {
    let msg = `*SANDHYA ENTERPRISES - COMMERCIAL RATE INQUIRY*\n\n`;
    if (clientName) msg += `*Client / Hotel Name:* ${clientName}\n`;
    msg += `*Product Needed:* ${selectedBrand}\n`;
    msg += `*Quantity:* ${cylCount} Cylinders\n`;
    msg += `*Delivery Area:* ${location}\n\n`;
    msg += `Please provide today's official wholesale commercial LPG rate & doorstep delivery schedule. Thank you!`;

    const url = `https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="bg-slate-900 border-b border-slate-800 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-orange-600">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                {lang === 'kn' ? 'ನೇರ ದರ ವಿಚಾರಣೆ' : 'RATE INQUIRY DESK'}
              </span>
              <h3 className="text-sm font-black text-white uppercase tracking-tight">
                {lang === 'kn' ? 'ಇಂದಿನ ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ದರ ಪಡೆಯಿರಿ' : 'Request Today\'s Commercial Rate'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          {/* Notice Alert */}
          <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200 text-xs space-y-0.5">
            <div className="flex items-center gap-1.5 font-black text-orange-950 text-[11px] uppercase tracking-wide">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
              <span>{lang === 'kn' ? 'ಮಾಸಿಕ ದರ ಬದಲಾವಣೆ ಸೂಚನೆ:' : 'Monthly Rate Revision Notice:'}</span>
            </div>
            <p className="text-orange-900 text-[11px] leading-normal">
              {lang === 'kn'
                ? 'ಪ್ರತಿ ತಿಂಗಳು ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ದರಗಳು ಬದಲಾಗುವುದರಿಂದ, ಇಂದಿನ ಸ್ಪರ್ಧಾತ್ಮಕ ದರ ತಿಳಿಯಲು ನಮ್ಮ ನಂಬರ್‌ಗೆ ಕರೆ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮಾಡಿ.'
                : 'Commercial gas rates revise monthly. Direct inquiry ensures you receive maximum bulk concessions for today.'}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-2.5">
            <div>
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                {lang === 'kn' ? 'ಗ್ಯಾಸ್ ಬ್ರ್ಯಾಂಡ್ & ಸಿಲಿಂಡರ್ ವಿಧ' : 'Gas Brand & Cylinder Type'}
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:border-orange-500 focus:outline-none"
              >
                <option value="Bharat Gas 19kg Commercial">Bharat Gas - 19kg Commercial VOT</option>
                <option value="Bharat Gas 47.5kg Industrial">Bharat Gas - 47.5kg Industrial Bulk</option>
                <option value="Go Gas Commercial (Private LPG)">GoGas - 17kg/21kg/33kg Commercial</option>
                <option value="Power Gas Commercial">Power Gas - Commercial 19kg/33kg</option>
                <option value="Power Gas Domestic (Home)">Power Gas - Domestic LPG Cylinder</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'kn' ? 'ಸಿಲಿಂಡರ್ ಸಂಖ್ಯೆ' : 'Quantity Needed'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={cylCount}
                  onChange={(e) => setCylCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'kn' ? 'ಡೆಲಿವರಿ ಪ್ರದೇಶ' : 'Delivery Area'}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Nelamangala / Tumkur"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                {lang === 'kn' ? 'ನಿಮ್ಮ ಹೆಸರು / ಹೋಟೆಲ್ ಹೆಸರು' : 'Your Name / Restaurant Name (Optional)'}
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Royal Grand Hotel"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={handleWhatsAppSend}
              className="w-full sm:flex-1 py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ವಾಟ್ಸಾಪ್ ದರ ವಿಚಾರಣೆ' : 'Inquire on WhatsApp'}</span>
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phonePrimary}`}
              className="w-full sm:w-auto py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              <span>8152889500</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
