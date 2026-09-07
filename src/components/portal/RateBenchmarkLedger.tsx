import React, { useState } from 'react';
import {
  FileText,
  TrendingUp,
  Percent,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Search,
  Building2,
  HelpCircle
} from 'lucide-react';
import { Language } from '../../types';

interface RateBenchmarkLedgerProps {
  lang: Language;
  onTransferToAi: (prompt: string) => void;
  onOpenOrderModal?: () => void;
}

export const RateBenchmarkLedger: React.FC<RateBenchmarkLedgerProps> = ({
  lang,
  onTransferToAi,
  onOpenOrderModal
}) => {
  const [monthlyCylinders, setMonthlyCylinders] = useState<number>(15);

  const PRICE_19KG = 1850;
  const basePricePerCyl = Math.round((PRICE_19KG / 1.18) * 100) / 100;
  const gstPerCyl = Math.round((PRICE_19KG - basePricePerCyl) * 100) / 100;

  const totalMonthlyGross = monthlyCylinders * PRICE_19KG;
  const totalMonthlyGst = Math.round(monthlyCylinders * gstPerCyl);
  const totalAnnualGstSaved = totalMonthlyGst * 12;

  const handleCheckCurrentRatesWithAi = () => {
    const prompt = lang === 'kn'
      ? 'ಕರ್ನಾಟಕದ ನೆಲಮಂಗಲ, ತುಮಕೂರು ಮತ್ತು ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರದಲ್ಲಿ ಇಂದಿನ ಅಧಿಕೃತ ಕಮರ್ಷಿಯಲ್ 19kg ಸಿಲಿಂಡರ್ ಬೆಲೆ ಎಷ್ಟು? ತೈಲ ಕಂಪನಿಗಳ (OMC) ಇತ್ತೀಚಿನ ದರ ಪರಿಷ್ಕರಣೆ ವಿವರ ನೀಡಿ.'
      : 'What is the current prevailing OMC commercial 19kg LPG cylinder benchmark price in Karnataka (Nelamangala, Tumkur, Bangalore Rural)? Please check recent monthly price revisions with Google Search.';

    onTransferToAi(prompt);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden p-4 sm:p-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-orange-50 text-orange-600">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {lang === 'kn'
                ? 'ಅಧಿಕೃತ ಕಮರ್ಷಿಯಲ್ ದರ & 18% ಜಿಎಸ್‌ಟಿ ಕ್ರೆಡಿಟ್ ವಿವರ'
                : 'Commercial Price Benchmarks & 18% GST Input Credit Ledger'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'kn'
              ? 'HSN ಕೋಡ್ 27111900 ಅನ್ವಯ 18% ಜಿಎಸ್‌ಟಿ ಇನ್‌ಪುಟ್ ಟ್ಯಾಕ್ಸ್ ಕ್ರೆಡಿಟ್ (ITC) ಮೂಲಕ ಹೋಟೆಲ್‌ಗಳು ಪಡೆಯುವ ನೇರ ತೆರಿಗೆ ಉಳಿತಾಯ.'
              : 'Official HSN 27111900 commercial benchmark with 100% GSTR-2B Input Tax Credit computation for registered food enterprises.'}
          </p>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
          <Percent className="w-3.5 h-3.5" />
          <span>{lang === 'kn' ? '18% ಜಿಎಸ್‌ಟಿ ಮರುಪಾವತಿ' : '18% GST ITC Eligible'}</span>
        </span>
      </div>

      {/* Official Cylinders Benchmark Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Bharat Gas 19kg Commercial */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
              BPCL Official
            </span>
            <span className="text-[10px] text-slate-500 font-mono">19.0 kg Net</span>
          </div>
          <div className="text-sm font-black text-slate-900 mt-2">
            {lang === 'kn' ? 'ಭಾರತ್ ಗ್ಯಾಸ್ 19kg ಕಮರ್ಷಿಯಲ್' : 'Bharat Gas 19kg Commercial'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {lang === 'kn' ? 'ಹೋಟೆಲ್ & ರೆಸ್ಟೋರೆಂಟ್ ಲೈನ್' : 'Hotels, Catering & Cafes'}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200 flex items-baseline justify-between">
            <span className="text-lg font-black text-slate-900">~₹1,850</span>
            <span className="text-[10px] text-emerald-600 font-bold">₹282 GST ITC</span>
          </div>
        </div>

        {/* Bharat Gas 47.5kg Industrial */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
              Industrial Bulk
            </span>
            <span className="text-[10px] text-slate-500 font-mono">47.5 kg Net</span>
          </div>
          <div className="text-sm font-black text-slate-900 mt-2">
            {lang === 'kn' ? '47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್ ಬಲ್ಕ್' : 'Bharat Gas 47.5kg Bulk'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {lang === 'kn' ? 'ದೊಡ್ಡ ಅಡುಗೆಮನೆ & ಫ್ಯಾಕ್ಟರಿ' : 'Heavy Cauldrons & Bakeries'}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200 flex items-baseline justify-between">
            <span className="text-lg font-black text-slate-900">~₹4,625</span>
            <span className="text-[10px] text-emerald-600 font-bold">₹705 GST ITC</span>
          </div>
        </div>

        {/* Go Gas 21kg / 33kg LOT */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-100 px-2 py-0.5 rounded">
              Confidence LOT
            </span>
            <span className="text-[10px] text-slate-500 font-mono">21kg / 33kg</span>
          </div>
          <div className="text-sm font-black text-slate-900 mt-2">
            {lang === 'kn' ? 'ಗೋ ಗ್ಯಾಸ್ LOT ಸಿಸ್ಟಂ' : 'Go Gas LOT Systems'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {lang === 'kn' ? 'ಲಿಕ್ವಿಡ್ ಆಫ್-ಟೇಕ್ (Zero Freezing)' : 'Liquid Off-Take (No Frost)'}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200 flex items-baseline justify-between">
            <span className="text-lg font-black text-slate-900">Discounted</span>
            <span className="text-[10px] text-emerald-600 font-bold">Fast Turnaround</span>
          </div>
        </div>

        {/* Power Gas Refill */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
              Commercial
            </span>
            <span className="text-[10px] text-slate-500 font-mono">High BTU</span>
          </div>
          <div className="text-sm font-black text-slate-900 mt-2">
            {lang === 'kn' ? 'ಪವರ್ ಗ್ಯಾಸ್ ಕಮರ್ಷಿಯಲ್' : 'Power Gas Commercial'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {lang === 'kn' ? 'ಫಾಸ್ಟ್ ಫುಡ್ & ಸ್ವೀಟ್ ಶಾಪ್' : 'Fast Food & Dhabas'}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200 flex items-baseline justify-between">
            <span className="text-lg font-black text-slate-900">Competitive</span>
            <span className="text-[10px] text-emerald-600 font-bold">100% Computerized</span>
          </div>
        </div>
      </div>

      {/* Interactive 18% GST Input Credit Calculator */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span className="font-black uppercase tracking-wider text-xs text-slate-300">
              {lang === 'kn' ? 'ಜಿಎಸ್‌ಟಿ ಇನ್‌ಪುಟ್ ಟ್ಯಾಕ್ಸ್ ಕ್ರೆಡಿಟ್ (ITC) ಲೆಡ್ಜರ್' : 'GST Input Tax Credit (ITC) Calculator'}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400">
            HSN: 27111900 • 18% GST (9% CGST + 9% SGST)
          </span>
        </div>

        {/* Slider for monthly cylinders */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">
              {lang === 'kn' ? 'ತಿಂಗಳಿಗೆ ಬಳಸುವ 19kg ಸಿಲಿಂಡರ್‌ಗಳ ಸಂಖ್ಯೆ:' : 'Monthly 19kg Cylinders Procured:'}
            </span>
            <span className="px-3 py-1 rounded bg-orange-600 text-white font-mono text-sm">
              {monthlyCylinders} {lang === 'kn' ? 'ಸಿಲಿಂಡರ್‌ಗಳು' : 'Cylinders'}
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="150"
            step="1"
            value={monthlyCylinders}
            onChange={(e) => setMonthlyCylinders(parseInt(e.target.value, 10))}
            className="w-full accent-orange-600 cursor-pointer"
          />
        </div>

        {/* Breakdown output */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'kn' ? 'ಮಾಸಿಕ ಒಟ್ಟು ಖರೀದಿ ವೆಚ್ಚ' : 'Gross Monthly Spend'}
            </span>
            <div className="text-2xl font-black text-white mt-1">
              ₹{totalMonthlyGross.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Includes 18% GST
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'kn' ? 'ಮೂಲ ಇಂಧನ ಬೆಲೆ (Base Price)' : 'Net Base Fuel Value'}
            </span>
            <div className="text-2xl font-black text-white mt-1">
              ₹{Math.round(monthlyCylinders * basePricePerCyl).toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Excluding GST
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800 border border-emerald-500/40">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
              {lang === 'kn' ? 'ಮಾಸಿಕ ಜಿಎಸ್‌ಟಿ ಮರುಪಾವತಿ (ITC)' : 'Monthly Claimable ITC'}
            </span>
            <div className="text-2xl font-black text-emerald-300 mt-1">
              ₹{totalMonthlyGst.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-400/80 mt-1 block">
              Offset against food bills
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800 border border-emerald-500/40">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
              {lang === 'kn' ? 'ವಾರ್ಷಿಕ ತೆರಿಗೆ ಉಳಿತಾಯ' : 'Annual Tax Savings'}
            </span>
            <div className="text-2xl font-black text-emerald-300 mt-1">
              ₹{totalAnnualGstSaved.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-400/80 mt-1 block">
              Direct cash saved per year
            </span>
          </div>
        </div>

        {/* Statutory Compliance Note */}
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>
            {lang === 'kn'
              ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ನೀಡುವ ಪ್ರತಿಯೊಂದು ಬಿಲ್ ಕೂಡ ಅಧಿಕೃತ GSTIN ಮತ್ತು HSN 27111900 ನೊಂದಿಗೆ ಕಂಪ್ಯೂಟರೀಕೃತವಾಗಿದ್ದು, ನಿಮ್ಮ GSTR-2B ನಲ್ಲಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪ್ರತಿಫಲಿಸುತ್ತದೆ.'
              : 'Every Sandhya Enterprises invoice features an authorized supplier GSTIN and verified HSN 27111900 barcode, syncing directly to your monthly GSTR-2B filing.'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleCheckCurrentRatesWithAi}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <Search className="w-4 h-4 text-blue-400" />
          <span>{lang === 'kn' ? 'ಕರ್ನಾಟಕದ ಇಂದಿನ ಲೈವ್ ದರ ಕೇಳಿ (AI + Google Search)' : 'Check Today Live OMC Rates (AI + Google Search)'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {onOpenOrderModal && (
          <button
            type="button"
            onClick={onOpenOrderModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Flame className="w-4 h-4" />
            <span>{lang === 'kn' ? 'ಜಿಎಸ್‌ಟಿ ಇನ್‌ವಾಯ್ಸ್ ಬುಕ್ಕಿಂಗ್' : 'Book with GST Tax Invoice'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
