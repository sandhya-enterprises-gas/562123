import React, { useState } from 'react';
import {
  Coins,
  Clock,
  Briefcase,
  UserCheck,
  TrendingUp,
  Truck,
  PhoneCall,
  Send,
  CheckCircle2,
  Lock,
  ArrowRight,
  Shield
} from 'lucide-react';
import { Language } from '../types';
import { OFFICIAL_DISTRIBUTOR_BENEFITS, BUSINESS_INFO } from '../data/content';
import { portalStore } from '../data/portalStore';

interface OfficialDistributorShowcaseProps {
  lang: Language;
  onOpenDistributorDesk: () => void;
}

export const OfficialDistributorShowcase: React.FC<OfficialDistributorShowcaseProps> = ({
  lang,
  onOpenDistributorDesk
}) => {
  const content = OFFICIAL_DISTRIBUTOR_BENEFITS[lang];

  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantArea, setApplicantArea] = useState('Nelamangala Highway');
  const [applicantWorkType, setApplicantWorkType] = useState<'full_time' | 'part_time' | 'agency_franchise'>('full_time');
  const [applicantVehicle, setApplicantVehicle] = useState('3-Wheeler Auto (Piaggio / Bajaj)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const icons = [
    Coins,       // High Profit Margins
    Clock,       // Flexibility
    Briefcase,   // Business Support
    UserCheck,   // Streamlined Onboarding
    TrendingUp   // Bulk Supply Capabilities
  ];

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;

    portalStore.submitDistributorApplication({
      name: applicantName,
      phone: applicantPhone,
      area: applicantArea,
      workType: applicantWorkType,
      vehicleType: applicantVehicle
    });

    setIsSubmitted(true);
    setSubmissionMessage(
      lang === 'kn'
        ? `ಧನ್ಯವಾದಗಳು ${applicantName}! ನಿಮ್ಮ ಅರ್ಜಿಯನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ. ನಮ್ಮ ಅಧಿಕೃತ ತಂಡವು 8152889500 ಮೂಲಕ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲಿದೆ.`
        : `Thank you ${applicantName}! Your partnership application is recorded. Sandhya Onboarding team will call you shortly.`
    );

    // Also trigger WhatsApp message for direct instant outreach
    const waText = encodeURIComponent(
      `Hello Sandhya Enterprises, I am applying to become an Official Distributor / Delivery Partner.\nName: ${applicantName}\nPhone: ${applicantPhone}\nArea: ${applicantArea}\nWork Model: ${applicantWorkType}\nVehicle: ${applicantVehicle}\nPlease approve my onboarding.`
    );
    window.open(`https://wa.me/918152889500?text=${waText}`, '_blank');
  };

  return (
    <section id="distributor-benefits" className="py-12 sm:py-16 bg-slate-900 text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-widest">
            <Truck className="w-3.5 h-3.5" />
            <span>2. FOR DISTRIBUTORS & DELIVERY PARTNERS • ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್ಸ್ ಮತ್ತು ಡೆಲಿವರಿ ಪಾರ್ಟ್ನೆರ್ಗೆ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* 5 Official Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.items.map((item, idx) => {
            const IconComp = icons[idx] || Briefcase;
            const isHighlight = item.id === 'margins' || item.id === 'flexibility';

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isHighlight
                    ? 'bg-gradient-to-br from-slate-800 to-slate-850 border-blue-500/40 shadow-lg shadow-blue-950/20 ring-1 ring-blue-500/20'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${isHighlight ? 'bg-blue-600 text-white' : 'bg-slate-800 text-blue-400 border border-slate-700'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Quick Staff Desk Portal Card */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-orange-400">
                <Lock className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {lang === 'kn' ? 'ಖಾಸಗಿ ಸಿಬ್ಬಂದಿ ಡೆಸ್ಕ್' : 'Staff Private Access'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {lang === 'kn' ? 'ವಿತರಕರ ಕಾರ್ಯಾಚರಣೆ ಡೆಸ್ಕ್' : 'Authorized Dispatch Desk'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'kn'
                  ? 'ಹಾಲಿ ಡೆಲಿವರಿ ಸಿಬ್ಬಂದಿಗಾಗಿ ಲೈವ್ ಆರ್ಡರ್ ಲಿಸ್ಟ್, ಪಾವತಿ ಸಂಗ್ರಹ (Cash/Online), ಮತ್ತು ಖಾಲಿ ಸಿಲಿಂಡರ್ (MT) ಮರಳಿಸುವಿಕೆ.'
                  : 'For authorized personnel to update live delivery status, collect cash/online payments, and record MT empty returns.'}
              </p>
            </div>
            <button
              onClick={onOpenDistributorDesk}
              className="mt-4 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ವಿತರಕರ ಡೆಸ್ಕ್ ಪ್ರವೇಶಿಸಿ' : 'Open Distributor Desk'}</span>
            </button>
          </div>
        </div>

        {/* Official Interactive Partner Application / Onboarding Form */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left pitch */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'kn' ? 'ತ್ವರಿತ ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ' : 'Immediate Onboarding'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {lang === 'kn' ? 'ಇಂದೇ ನಮ್ಮ ಅಧಿಕೃತ ಪಾರ್ಟ್ನರ್ ಆಗಿ' : 'Apply to Become Official Partner Today'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'kn'
                  ? 'ನೆಲಮಂಗಲ, ತುಮಕೂರು ರಸ್ತೆ, ಸಿರಾ ಮತ್ತು ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ ಭಾಗದ ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ಕೈಗಾರಿಕೆಗಳಿಗೆ ಸಿಲಿಂಡರ್ ಸರಬರಾಜು ಮಾಡಿ ಉತ್ತಮ ಕಮಿಷನ್ ಗಳಿಸಿ. ಯಾವುದೇ ಸಂಕೀರ್ಣ ನಿಯಮಗಳಿಲ್ಲ.'
                  : 'Earn top per-cylinder commissions delivering Bharat Gas, GoGas & Power Gas to commercial establishments across highway corridors. Transparent weekly/monthly settlement.'}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{lang === 'kn' ? 'ಫುಲ್-ಟೈಮ್ ಅಥವಾ ಪಾರ್ಟ್-ಟೈಮ್ ಕೆಲಸದ ಸೌಲಭ್ಯ' : 'Flexible Full-Time or Part-Time operating slots'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{lang === 'kn' ? 'ಪ್ರತಿ ಸಿಲಿಂಡರ್ ಮಾರಾಟದ ಮೇಲೆ ಸ್ಪರ್ಧಾತ್ಮಕ ಲಾಭಾಂಶ' : 'Guaranteed per-cylinder margin and payment system'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{lang === 'kn' ? 'ಸುರಕ್ಷತಾ ತರಬೇತಿ ಮತ್ತು ಅಧಿಕೃತ ಐಡಿ ಬೆಂಬಲ' : 'Complete safety training and agency onboarding support'}</span>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-7 bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
              {isSubmitted ? (
                <div className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-white">
                    {lang === 'kn' ? 'ಅರ್ಜಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ!' : 'Application Submitted Successfully!'}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    {submissionMessage}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                  >
                    {lang === 'kn' ? 'ಇನ್ನೊಂದು ಅರ್ಜಿ ಸಲ್ಲಿಸಿ' : 'Submit Another Application'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <h4 className="text-base font-black text-white uppercase tracking-tight border-b border-slate-800 pb-2">
                    {lang === 'kn' ? 'ವಿತರಕ / ಡೆಲಿವರಿ ಪಾರ್ಟ್ನರ್ ನೋಂದಣಿ ಫಾರ್ಮ್' : 'Partner Registration & Onboarding'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        {lang === 'kn' ? 'ನಿಮ್ಮ ಹೆಸರು (Full Name)' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Ex: Ramesh Kumar"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        {lang === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (Phone Number)' : 'Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="Ex: 9845012345"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        {lang === 'kn' ? 'ಕಾರ್ಯಾಚರಣೆ ಪ್ರದೇಶ (Area)' : 'Operating Area / Corridor'}
                      </label>
                      <select
                        value={applicantArea}
                        onChange={(e) => setApplicantArea(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Nelamangala Highway">Nelamangala Highway (562123)</option>
                        <option value="Nelamangala Rural">Nelamangala Rural Corridors</option>
                        <option value="Tumkur Road Corridor">Tumkur Road Corridor</option>
                        <option value="Sira Industrial Corridor">Sira Industrial Corridor</option>
                        <option value="Bengaluru Rural">Bengaluru Rural Hub</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        {lang === 'kn' ? 'ಕೆಲಸದ ಮಾದರಿ (Work Model)' : 'Work Schedule'}
                      </label>
                      <select
                        value={applicantWorkType}
                        onChange={(e) => setApplicantWorkType(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="full_time">{lang === 'kn' ? 'ಫುಲ್-ಟೈಮ್ (Full Time Dedicated)' : 'Full-Time Dedicated'}</option>
                        <option value="part_time">{lang === 'kn' ? 'ಪಾರ್ಟ್-ಟೈಮ್ (Part Time Flexible)' : 'Part-Time Flexible'}</option>
                        <option value="agency_franchise">{lang === 'kn' ? 'ಸಬ್-ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್ ಏಜೆನ್ಸಿ' : 'Sub-Distributor Franchise'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      {lang === 'kn' ? 'ಲಭ್ಯವಿರುವ ವಾಹನ (Vehicle Available)' : 'Vehicle Available for Delivery'}
                    </label>
                    <select
                      value={applicantVehicle}
                      onChange={(e) => setApplicantVehicle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="3-Wheeler Auto (Piaggio / Bajaj)">3-Wheeler Commercial Auto (Piaggio / Bajaj / Ape)</option>
                      <option value="4-Wheeler Pickup (Tata Ace / Bolero)">4-Wheeler Pickup (Tata Ace / Mahindra Bolero)</option>
                      <option value="2-Wheeler with Carrier">2-Wheeler with Heavy Cylinder Carrier</option>
                      <option value="Commercial Driver (No Vehicle)">Experienced Commercial Driver (Need Agency Vehicle)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'kn' ? 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ (WhatsApp & Portal)' : 'Submit Partner Application'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
