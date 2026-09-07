import React, { useState } from 'react';
import {
  Flame,
  TrendingDown,
  Gauge,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { Language } from '../../types';

interface KitchenEnergyAuditorProps {
  lang: Language;
  onTransferToAi: (prompt: string) => void;
  onOpenOrderModal?: () => void;
}

export const KitchenEnergyAuditor: React.FC<KitchenEnergyAuditorProps> = ({
  lang,
  onTransferToAi,
  onOpenOrderModal
}) => {
  const [tandoorCount, setTandoorCount] = useState<number>(1);
  const [chineseWokCount, setChineseWokCount] = useState<number>(1);
  const [halwaiBhattiCount, setHalwaiBhattiCount] = useState<number>(1);
  const [dosaPlateCount, setDosaPlateCount] = useState<number>(1);
  const [teaUrnCount, setTeaUrnCount] = useState<number>(1);
  const [operatingHours, setOperatingHours] = useState<number>(8);

  // Standard Commercial Burner Fuel Consumption (kg/hr)
  const TANDOOR_KG = 1.1;
  const CHINESE_KG = 1.8;
  const BHATTI_KG = 2.4;
  const DOSA_KG = 1.2;
  const TEA_KG = 0.7;

  const totalHourlyBurnKg =
    tandoorCount * TANDOOR_KG +
    chineseWokCount * CHINESE_KG +
    halwaiBhattiCount * BHATTI_KG +
    dosaPlateCount * DOSA_KG +
    teaUrnCount * TEA_KG;

  const dailyLpgKg = Math.round(totalHourlyBurnKg * operatingHours * 10) / 10;
  const monthlyLpgKg = Math.round(dailyLpgKg * 30);
  const monthly19kgUnits = Math.ceil(monthlyLpgKg / 19);
  const monthly47kgUnits = Math.ceil(monthlyLpgKg / 47.5);

  const estimatedMonthlyBill = monthly19kgUnits * 1850;
  // 18% fuel waste from yellow soot vs tuned crisp blue cone
  const monthlySavingsFromBlueFlame = Math.round(estimatedMonthlyBill * 0.18);
  const monthlyGstCredit = Math.round(estimatedMonthlyBill * (18 / 118));

  const handleAuditInAi = () => {
    const prompt = lang === 'kn'
      ? `ನಮ್ಮ ಹೋಟೆಲ್ ಕಿಚನ್ ಬರ್ನರ್ ಆಡಿಟ್ ವಿವರ:
- ತಂದೂರ್: ${tandoorCount}, ಚೈನೀಸ್ ವಾಕ್: ${chineseWokCount}, ಭಟ್ಟಿ: ${halwaiBhattiCount}, ದೋಸೆ ತವಾ: ${dosaPlateCount}, ಟೀ ಬಾಯ್ಲರ್: ${teaUrnCount}.
- ದಿನಕ್ಕೆ ${operatingHours} ಗಂಟೆ ಕೆಲಸ.
- ಅಂದಾಜು ಬಳಕೆ: ದಿನಕ್ಕೆ ${dailyLpgKg} ಕೆ.ಜಿ, ತಿಂಗಳಿಗೆ ${monthly19kgUnits} ಸಿಲಿಂಡರ್‌ಗಳು (ವೆಚ್ಚ ಸುಮಾರು ₹${estimatedMonthlyBill.toLocaleString()}).
ನೀಲಿ ಜ್ವಾಲೆಯ ಟ್ಯೂನಿಂಗ್ ಮತ್ತು ಮ್ಯಾನಿಫೋಲ್ಡ್ ಮೂಲಕ ₹${monthlySavingsFromBlueFlame.toLocaleString()} ಉಳಿಸುವುದು ಹೇಗೆ ಎಂದು ಅಧಿಕೃತ ಸಲಹೆ ನೀಡಿ.`
      : `Commercial Kitchen Burner Energy Audit:
- Equipment: ${tandoorCount} Tandoor, ${chineseWokCount} Chinese Wok, ${halwaiBhattiCount} Bhatti, ${dosaPlateCount} Dosa Plate, ${teaUrnCount} Tea Boiler.
- Operating ${operatingHours} hours/day.
- Projected Consumption: ${dailyLpgKg} kg/day -> ~${monthly19kgUnits}x 19kg cylinders/month (Budget: ₹${estimatedMonthlyBill.toLocaleString()}).
- Estimated Fuel Waste with Yellow Flame: ₹${monthlySavingsFromBlueFlame.toLocaleString()}/month.
Please provide engineered recommendations for burner nozzle sizing, air-shutter adjustment to blue flame, and 47.5kg Industrial manifold conversion.`;

    onTransferToAi(prompt);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden p-4 sm:p-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-orange-50 text-orange-600">
              <Gauge className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {lang === 'kn'
                ? 'ಹೋಟೆಲ್ ಕಿಚನ್ ಬರ್ನರ್ & ಎನರ್ಜಿ ಆಡಿಟ್'
                : 'Commercial Kitchen Burner & Energy Audit'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'kn'
              ? 'ನಿಮ್ಮ ಅಡುಗೆಮನೆಯ ಬರ್ನರ್‌ಗಳನ್ನು ನಮೂದಿಸಿ, ಗಂಟೆಯ ಎಲ್‌ಪಿಜಿ ಬಳಕೆ ಮತ್ತು ನೀಲಿ ಜ್ವಾಲೆಯ ಟ್ಯೂನಿಂಗ್ ಉಳಿತಾಯ ಲೆಕ್ಕ ಹಾಕಿ.'
              : 'Calculate hourly LPG consumption across burners and project monthly fuel savings with blue-flame tuning.'}
          </p>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-orange-50 text-orange-700 border border-orange-200">
          <Zap className="w-3.5 h-3.5" />
          <span>{lang === 'kn' ? '15-20% ಉಳಿತಾಯ ತಂತ್ರ' : '15-20% Efficiency Gain'}</span>
        </span>
      </div>

      {/* Burner Equipment Counter Grid */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
          {lang === 'kn' ? 'ನಿಮ್ಮ ಅಡುಗೆಮನೆಯಲ್ಲಿರುವ ಬರ್ನರ್‌ಗಳ ಸಂಖ್ಯೆ:' : 'Kitchen Burner Equipment Count:'}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Halwai Bhatti */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800">
              {lang === 'kn' ? 'ಭಟ್ಟಿ / ಕಡಾಯಿ (Bhatti)' : 'Halwai / Heavy Bhatti'}
            </div>
            <div className="text-[10px] text-slate-500">2.4 kg/hr (Heavy Cauldrons)</div>
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setHalwaiBhattiCount(Math.max(0, halwaiBhattiCount - 1))}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-sm text-slate-700 hover:bg-slate-100"
              >
                -
              </button>
              <span className="text-sm font-black text-slate-900">{halwaiBhattiCount}</span>
              <button
                type="button"
                onClick={() => setHalwaiBhattiCount(halwaiBhattiCount + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-sm text-slate-700 hover:bg-slate-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Chinese Wok */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800">
              {lang === 'kn' ? 'ಚೈನೀಸ್ ವಾಕ್ (Chinese Wok)' : 'High-Heat Chinese Wok'}
            </div>
            <div className="text-[10px] text-slate-500">1.8 kg/hr (V-10 Burner)</div>
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setChineseWokCount(Math.max(0, chineseWokCount - 1))}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-sm text-slate-700 hover:bg-slate-100"
              >
                -
              </button>
              <span className="text-sm font-black text-slate-900">{chineseWokCount}</span>
              <button
                type="button"
                onClick={() => setChineseWokCount(chineseWokCount + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-sm text-slate-700 hover:bg-slate-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Dosa Plate */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800">
              {lang === 'kn' ? 'ದೋಸೆ ತವಾ (Dosa Plate)' : 'Commercial Dosa Tawa'}
            </div>
            <div className="text-[10px] text-slate-500">1.2 kg/hr (Multi-pipe burner)</div>
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setDosaPlateCount(Math.max(0, dosaPlateCount - 1))}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-sm text-slate-700 hover:bg-slate-100"
              >
                -
              </button>
              <span className="text-sm font-black text-slate-900">{dosaPlateCount}</span>
              <button
                type="button"
                onClick={() => setDosaPlateCount(dosaPlateCount + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-sm text-slate-700 hover:bg-slate-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Tandoor */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800">
              {lang === 'kn' ? 'ತಂದೂರ್ ಓವನ್ (Tandoor)' : 'Gas Tandoor Oven'}
            </div>
            <div className="text-[10px] text-slate-500">1.1 kg/hr (Pilot / Pot burner)</div>
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setTandoorCount(Math.max(0, tandoorCount - 1))}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-sm text-slate-700 hover:bg-slate-100"
              >
                -
              </button>
              <span className="text-sm font-black text-slate-900">{tandoorCount}</span>
              <button
                type="button"
                onClick={() => setTandoorCount(tandoorCount + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-sm text-slate-700 hover:bg-slate-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Tea Urn / Milk Boiler */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800">
              {lang === 'kn' ? 'ಟೀ & ಮಿಲ್ಕ್ ಬಾಯ್ಲರ್' : 'Tea / Coffee Boiler'}
            </div>
            <div className="text-[10px] text-slate-500">0.7 kg/hr (Continuous simmer)</div>
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setTeaUrnCount(Math.max(0, teaUrnCount - 1))}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-sm text-slate-700 hover:bg-slate-100"
              >
                -
              </button>
              <span className="text-sm font-black text-slate-900">{teaUrnCount}</span>
              <button
                type="button"
                onClick={() => setTeaUrnCount(teaUrnCount + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-sm text-slate-700 hover:bg-slate-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Operating Hours Slider */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-700 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-orange-600" />
            {lang === 'kn' ? 'ದಿನದ ಸರಾಸರಿ ಅಡುಗೆ ಸಮಯ:' : 'Daily Kitchen Operating Hours:'}
          </span>
          <span className="px-2.5 py-1 rounded bg-orange-600 text-white font-mono text-xs">
            {operatingHours} {lang === 'kn' ? 'ಗಂಟೆಗಳು' : 'Hours/Day'}
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="18"
          step="1"
          value={operatingHours}
          onChange={(e) => setOperatingHours(parseInt(e.target.value, 10))}
          className="w-full accent-orange-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
          <span>2 hrs (Small Tiffin)</span>
          <span>8 hrs (Regular Hotel)</span>
          <span>14+ hrs (Highway Dhaba)</span>
        </div>
      </div>

      {/* Energy Audit Output Dashboard */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="font-black uppercase tracking-wider text-xs text-slate-300">
              {lang === 'kn' ? 'ಇಂಧನ ಬಳಕೆ & ಉಳಿತಾಯ ಮುನ್ನೋಟ' : 'Energy Projection & Monetary Savings'}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-orange-400">
            {Math.round(totalHourlyBurnKg * 10) / 10} kg LPG / hour
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Daily Consumption */}
          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'kn' ? 'ದೈನಂದಿನ ಬಳಕೆ' : 'Daily LPG Burn'}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-white">{dailyLpgKg}</span>
              <span className="text-xs text-slate-300 font-bold">kg / day</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {Math.round((dailyLpgKg / 19) * 10) / 10} cyl/day
            </span>
          </div>

          {/* Monthly Units */}
          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'kn' ? 'ಮಾಸಿಕ 19kg ಸಿಲಿಂಡರ್‌ಗಳು' : 'Monthly 19kg Units'}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-white">{monthly19kgUnits}</span>
              <span className="text-xs text-orange-400 font-bold">Cylinders</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              or {monthly47kgUnits}x 47.5kg Industrial
            </span>
          </div>

          {/* Potential Blue Flame Savings */}
          <div className="p-3.5 rounded-xl bg-slate-800 border border-emerald-500/40">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
              {lang === 'kn' ? 'ನೀಲಿ ಜ್ವಾಲೆ ಟ್ಯೂನಿಂಗ್ ಉಳಿತಾಯ' : 'Blue Flame Tuning Savings'}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-emerald-300">₹{monthlySavingsFromBlueFlame.toLocaleString()}</span>
              <span className="text-[11px] text-emerald-400 font-bold">/month</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 mt-1 block">
              {lang === 'kn' ? '18% ಹಳದಿ ಜ್ವಾಲೆ ನಷ್ಟ ತಡೆ' : 'Eliminates 18% soot loss'}
            </span>
          </div>

          {/* 18% GST Input Credit */}
          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'kn' ? 'ಮಾಸಿಕ ಜಿಎಸ್‌ಟಿ ಕ್ರೆಡಿಟ್' : 'Monthly GST Credit'}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-white">₹{monthlyGstCredit.toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {lang === 'kn' ? 'HSN 27111900 ITC' : '100% GSTR-2B recoverable'}
            </span>
          </div>
        </div>

        {/* Technical Guidance */}
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-start gap-2">
          <Info className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
          <span>
            {lang === 'kn'
              ? `ತಿಂಗಳಿಗೆ ${monthly19kgUnits} ಸಿಲಿಂಡರ್ ಬಳಸುವ ಹೋಟೆಲ್‌ಗಳು 47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಅಳವಡಿಸಿದರೆ ಸಿಲಿಂಡರ್ ಬದಲಾವಣೆ ತಾಪತ್ರಯ ನಿವಾರಣೆಯಾಗಿ ವರ್ಷಕ್ಕೆ ₹${(monthlySavingsFromBlueFlame * 12).toLocaleString()} ವರೆಗೆ ಉಳಿತಾಯವಾಗುತ್ತದೆ.`
              : `At ${monthly19kgUnits} cylinders/month, switching to a Bharat Gas 47.5kg Industrial manifold cuts cylinder handling fatigue, prevents frost drop, and delivers up to ₹${(monthlySavingsFromBlueFlame * 12).toLocaleString()} in annual fuel savings.`}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleAuditInAi}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{lang === 'kn' ? 'AI ಸಲಹೆಗಾರನೊಂದಿಗೆ ಆಡಿಟ್ ಚರ್ಚಿಸಿ' : 'Discuss This Kitchen Audit with AI'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {onOpenOrderModal && (
          <button
            type="button"
            onClick={onOpenOrderModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Flame className="w-4 h-4" />
            <span>{lang === 'kn' ? 'ಕಮರ್ಷಿಯಲ್ ಸಿಲಿಂಡರ್ ಆರ್ಡರ್' : 'Order Commercial Supply'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
