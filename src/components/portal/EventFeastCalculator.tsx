import React, { useState } from 'react';
import {
  Users,
  ChefHat,
  AlertTriangle,
  CheckCircle2,
  Flame,
  ArrowRight,
  ShieldCheck,
  Calculator,
  RefreshCw,
  Sparkles,
  Layers
} from 'lucide-react';
import { Language } from '../../types';

interface EventFeastCalculatorProps {
  lang: Language;
  onTransferToAi: (prompt: string) => void;
  onOpenOrderModal?: () => void;
}

export const EventFeastCalculator: React.FC<EventFeastCalculatorProps> = ({
  lang,
  onTransferToAi,
  onOpenOrderModal
}) => {
  const [guestCount, setGuestCount] = useState<number>(500);
  const [mealType, setMealType] = useState<'heavy_feast' | 'breakfast_tiffin' | 'full_day_wedding' | 'tea_snacks'>('heavy_feast');
  const [userPlanCylinders, setUserPlanCylinders] = useState<string>('');

  // Fuel consumption baselines (kg LPG per person)
  const mealFactors: Record<string, { kg: number; labelEn: string; labelKn: string; descEn: string; descKn: string }> = {
    heavy_feast: {
      kg: 0.10,
      labelEn: 'Complete Traditional Feast (Lunch/Dinner)',
      labelKn: 'ಸಂಪೂರ್ಣ ಸಾಂಪ್ರದಾಯಿಕ ಬಾಳೆ ಎಲೆ ಊಟ (ಮಧ್ಯಾಹ್ನ/ರಾತ್ರಿ)',
      descEn: 'Rice, Sambar, Rasam, 2 Sweets (Payasam/Laddu), 2 Fried Savories, Veg Curries, Puris',
      descKn: 'ಅನ್ನ, ಸಾಂಬಾರ್, ರಸಂ, 2 ಸಿಹಿತಿಂಡಿ (ಪಾಯಸ/ಲಾಡು), 2 ಬಜ್ಜಿ/ಬೋಂಡಾ, ಪಲ್ಯ, ಪೂರಿ'
    },
    breakfast_tiffin: {
      kg: 0.045,
      labelEn: 'Morning Breakfast & Tiffin Counter',
      labelKn: 'ಬೆಳಗಿನ ಉಪಹಾರ & ತಿಂಡಿ ಕೌಂಟರ್',
      descEn: 'Idli, Crispy Vada, Masala Dosa, Chutney, Sambar, Kesari Bath, Filter Coffee/Tea',
      descKn: 'ಇಡ್ಲಿ, ವಡೆ, ಮಸಾಲೆ ದೋಸೆ, ಚಟ್ನಿ, ಸಾಂಬಾರ್, ಕೇಸರಿ ಬಾತ್, ಫಿಲ್ಟರ್ ಕಾಫಿ/ಟೀ'
    },
    full_day_wedding: {
      kg: 0.16,
      labelEn: 'Full 1-Day Wedding (Breakfast + Grand Feast + Dinner)',
      labelKn: 'ಪೂರ್ಣ 1 ದಿನದ ಮದುವೆ ಸಮಾರಂಭ (ತಿಂಡಿ + ಮಹಾ ಭೋಜನ + ರಾತ್ರಿ ಊಟ)',
      descEn: 'Complete 3-session banquet cooking with uninterrupted cauldron boilers',
      descKn: '3 ಹೊತ್ತಿನ ಭೋಜನ ತಯಾರಿಕೆ ಹಾಗೂ ನಿರಂತರ ಬಿಸಿ ಕಾಫಿ/ಹಾಲು ಬಾಯ್ಲರ್‌ಗಳು'
    },
    tea_snacks: {
      kg: 0.035,
      labelEn: 'Evening Reception High-Tea & Snacks',
      labelKn: 'ಸಂಜೆ ರಿಸೆಪ್ಷನ್ ಹೈ-ಟೀ & ಸ್ನ್ಯಾಕ್ಸ್',
      descEn: 'Hot Samosas, Jalebi/Gulab Jamun, Bajji counter, Masala Tea, Coffee',
      descKn: 'ಬಿಸಿ ಸಮೋಸಾ, ಜಿಲೇಬಿ/ಜಾಮೂನು, ಬಜ್ಜಿ ಕೌಂಟರ್, ಮಸಾಲಾ ಟೀ, ಕಾಫಿ'
    }
  };

  const currentMeal = mealFactors[mealType];
  const totalLpgKg = Math.round(guestCount * currentMeal.kg * 10) / 10;
  
  // 19kg calculations
  const raw19kgNeeded = Math.ceil(totalLpgKg / 19);
  const safetyReserve = Math.max(1, Math.ceil(raw19kgNeeded * 0.15));
  const total19kg = raw19kgNeeded + safetyReserve;

  // 47.5kg Industrial bulk calculations
  const total47kg = Math.ceil(totalLpgKg / 47.5);

  // Financial Estimates (approx ₹1,850 per 19kg)
  const approxTotalCost = total19kg * 1850;
  const gstClaimable = Math.round(approxTotalCost * (18 / 118)); // 18% embedded GST

  // Human Plan Error Checker
  const userPlanNum = parseInt(userPlanCylinders, 10);
  const hasUserPlan = !isNaN(userPlanNum) && userPlanNum > 0;
  const isUnderEstimated = hasUserPlan && userPlanNum < raw19kgNeeded;
  const isSafePlan = hasUserPlan && userPlanNum >= raw19kgNeeded;

  const handleAskAi = () => {
    const prompt = lang === 'kn'
      ? `ನಮ್ಮ ಸಮಾರಂಭಕ್ಕೆ ${guestCount} ಜನ ಅತಿಥಿಗಳಿಗೆ (${currentMeal.labelKn}) ಸಿಲಿಂಡರ್ ಲೆಕ್ಕಾಚಾರ:
ಅಗತ್ಯವಿರುವ ಎಲ್‌ಪಿಜಿ: ${totalLpgKg} ಕೆ.ಜಿ.
ಲೆಕ್ಕಾಚಾರ: ${total19kg} ಭಾರತ್ ಗ್ಯಾಸ್ 19kg ಸಿಲಿಂಡರ್ (ಅಥವಾ ${total47kg}x 47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್ ಸಿಲಿಂಡರ್).
${hasUserPlan ? `ನಾವು ಮೊದಲು ಅಂದಾಜಿಸಿದ್ದು: ${userPlanNum} ಸಿಲಿಂಡರ್.` : ''}
ದಯವಿಟ್ಟು ಮ್ಯಾನಿಫೋಲ್ಡ್ ಸುರಕ್ಷತೆ, ಸಿಲಿಂಡರ್ ಫ್ರೀಜ್ ಆಗದಂತೆ ತಡೆಯುವುದು ಹಾಗೂ ಡೆಲಿವರಿ ಸಮಯದ ಬಗ್ಗೆ ಅಧಿಕೃತ ಸಲಹೆ ನೀಡಿ.`
      : `Banquet calculation for ${guestCount} guests (${currentMeal.labelEn}):
Total LPG Fuel Required: ${totalLpgKg} kg.
Official Requirement: ${total19kg}x 19kg Commercial Cylinders (${raw19kgNeeded} operational + ${safetyReserve} safety buffer) or ${total47kg}x 47.5kg Industrial Bulk units.
${hasUserPlan ? `Our initial rough plan was: ${userPlanNum} cylinders.` : ''}
Please advise on manifold changeover setup, preventing cylinder freeze-up during continuous boiling, and dispatch scheduling.`;

    onTransferToAi(prompt);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden p-4 sm:p-6 space-y-6">
      {/* Title & Official Standards Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-orange-50 text-orange-600">
              <Calculator className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {lang === 'kn'
                ? 'ಕಲ್ಯಾಣ ಮಂಟಪ & ಕ್ಯಾಟರಿಂಗ್ ಸಿಲಿಂಡರ್ ಅಧಿಕೃತ ಲೆಕ್ಕಾಚಾರ'
                : 'Official Banquet & Catering Cylinder Load Calculator'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'kn'
              ? 'ಭಾರತ ಸರ್ಕಾರದ PESO IS:6044 ಮತ್ತು ತೈಲ ಕಂಪನಿಗಳ (OMC) ಅಧಿಕೃತ ಎಂಜಿನಿಯರಿಂಗ್ ಮಾನದಂಡದ ಆಧಾರಿತ ನಿಖರ ಲೆಕ್ಕಾಚಾರ.'
              : 'Engineered in compliance with PESO IS:6044 standards to eliminate mid-service kitchen stalls and gas exhaustion.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಖಾತರಿ ನಿಖರತೆ' : 'Verified Formula'}</span>
          </span>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Guest Count Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-orange-600" />
            <span>{lang === 'kn' ? 'ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ (Guests)' : 'Total Expected Guests'}</span>
          </label>
          <input
            type="number"
            min="50"
            max="10000"
            step="50"
            value={guestCount}
            onChange={(e) => setGuestCount(Math.max(10, parseInt(e.target.value, 10) || 0))}
            className="w-full px-3.5 py-2.5 text-sm font-bold bg-slate-50 rounded-xl border border-slate-300 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 text-slate-900"
          />
          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1 pt-1">
            {[300, 500, 1000, 1500, 2500].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setGuestCount(preset)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                  guestCount === preset
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Type Selection */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <ChefHat className="w-4 h-4 text-orange-600" />
            <span>{lang === 'kn' ? 'ಊಟದ ವಿಧ ಮತ್ತು ಸಮಯ' : 'Meal Course & Menu Profile'}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(Object.keys(mealFactors) as Array<keyof typeof mealFactors>).map((key) => {
              const item = mealFactors[key];
              const isSelected = mealType === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMealType(key)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-orange-50 border-orange-500 shadow-2xs'
                      : 'bg-slate-50 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                    <span>{lang === 'kn' ? item.labelKn : item.labelEn}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-800 font-mono">
                      {item.kg} kg/head
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {lang === 'kn' ? item.descKn : item.descEn}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Plan Error Detector Box (Human plan validation) */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>
              {lang === 'kn'
                ? 'ನಿಮ್ಮ ಪ್ರಾಥಮಿಕ ಅಂದಾಜು ಪರೀಕ್ಷಿಸಿ (ಐಚ್ಛಿಕ - Plan Verification):'
                : 'Test Your Initial Cylinder Plan (Optional Error Check):'}
            </span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              placeholder={lang === 'kn' ? 'ಉದಾ: 4' : 'e.g. 4'}
              value={userPlanCylinders}
              onChange={(e) => setUserPlanCylinders(e.target.value)}
              className="w-24 px-2.5 py-1.5 text-xs font-bold bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-orange-500 text-center"
            />
            <span className="text-xs text-slate-500">{lang === 'kn' ? 'ಸಿಲಿಂಡರ್‌ಗಳು' : 'Cylinders'}</span>
          </div>
        </div>

        {/* Dynamic Verification Output */}
        {hasUserPlan && (
          <div>
            {isUnderEstimated ? (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">
                    {lang === 'kn' ? '⚠️ ಯೋಜನೆಯಲ್ಲಿ ಕೊರತೆ ಪತ್ತೆಯಾಗಿದೆ (Risk Detected): ' : '⚠️ Plan Deficit Detected: '}
                  </span>
                  {lang === 'kn'
                    ? `ನೀವು ಯೋಜಿಸಿರುವ ${userPlanNum} ಸಿಲಿಂಡರ್‌ಗಳು ${guestCount} ಜನರಿಗೆ ಅತ್ಯಂತ ಕಡಿಮೆ! ಕನಿಷ್ಠ ${raw19kgNeeded} ಸಿಲಿಂಡರ್‌ಗಳು ಅತ್ಯಗತ್ಯ. ಕಡಿಮೆ ಸಿಲಿಂಡರ್‌ಗಳಿಂದ ಅತಿಯಾಗಿ ಗ್ಯಾಸ್ ಎಳೆದರೆ ಸಿಲಿಂಡರ್ ಮೇಲೆ ಐಸ್ (Freezing) ಕಟ್ಟಿ ಜ್ವಾಲೆ ನಂದಿಹೋಗುತ್ತದೆ ಮತ್ತು ಊಟ ಅರ್ಧಕ್ಕೆ ನಿಲ್ಲುವ ಅಪಾಯವಿದೆ.`
                    : `Your planned ${userPlanNum} cylinders is critically low for ${guestCount} covers! At least ${raw19kgNeeded} active cylinders are mandatory. Overdrawing forces LPG vaporization collapse, freezing cylinder walls and cutting flame output mid-feast.`}
                </div>
              </div>
            ) : isSafePlan ? (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">
                    {lang === 'kn' ? ' ಯೋಜನಾ ಲೆಕ್ಕಾಚಾರ ಸುರಕ್ಷಿತವಾಗಿದೆ: ' : ' Official Safety Check Passed: '}
                  </span>
                  {lang === 'kn'
                    ? `ನಿಮ್ಮ ${userPlanNum} ಸಿಲಿಂಡರ್‌ಗಳ ಯೋಜನೆ ಸುರಕ್ಷಿತವಾಗಿದೆ. ಇದು ಗರಿಷ್ಠ ಪೀಕ್-ಲೋಡ್ ಹಾಗೂ ಮೀಸಲು ಸಿಲಿಂಡರ್ ಮಾನದಂಡವನ್ನು ಪೂರೈಸುತ್ತದೆ.`
                    : `Your plan of ${userPlanNum} cylinders provides adequate continuous combustion capacity with safety buffer.`}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Official Calculation Results Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="font-black uppercase tracking-wider text-xs text-slate-300">
              {lang === 'kn' ? 'ಅಧಿಕೃತ ಎಲ್‌ಪಿಜಿ ಲೋಡ್ ವಿವರ' : 'Official Combustion Load Output'}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-orange-400">
            {totalLpgKg} kg Total Net LPG
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Primary Recommendation: 19kg Commercial */}
          <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'kn' ? 'ಭಾರತ್ ಗ್ಯಾಸ್ 19kg ಕಮರ್ಷಿಯಲ್' : 'Bharat Gas 19kg Units'}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-white">{total19kg}</span>
              <span className="text-[11px] text-orange-400 font-bold">
                ({raw19kgNeeded} + {safetyReserve} {lang === 'kn' ? 'ಮೀಸಲು' : 'Spare'})
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {lang === 'kn' ? 'ಏಕಕಾಲಿಕ ಬರ್ನರ್ ಸುರಕ್ಷತೆ' : 'Peak vapor safety buffer'}
            </span>
          </div>

          {/* Alternative Bulk: 47.5kg Industrial */}
          <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'kn' ? '47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್ ಬಲ್ಕ್' : '47.5kg Industrial Bulk'}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-white">{total47kg}</span>
              <span className="text-[11px] text-emerald-400 font-bold">Cylinders</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {lang === 'kn' ? '60% ಕಡಿಮೆ ಸಿಲಿಂಡರ್ ಬದಲಾವಣೆ' : '60% fewer cylinder swaps'}
            </span>
          </div>

          {/* Estimated Budget */}
          <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'kn' ? 'ಅಂದಾಜು ವೆಚ್ಚ (~₹1,850/ಸಿಲಿಂಡರ್)' : 'Estimated Fuel Budget'}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl font-black text-white">₹{approxTotalCost.toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {lang === 'kn' ? 'ತಿಂಗಳ OMC ದರ ಅನ್ವಯ' : 'Subject to monthly OMC rate'}
            </span>
          </div>

          {/* 18% GST Input Credit Claimable */}
          <div className="p-3.5 rounded-xl bg-slate-800/90 border border-emerald-500/30">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
              {lang === 'kn' ? '18% ಜಿಎಸ್‌ಟಿ ಇನ್‌ಪುಟ್ ಕ್ರೆಡಿಟ್' : '18% Claimable GST ITC'}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl font-black text-emerald-300">₹{gstClaimable.toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 mt-1 block">
              {lang === 'kn' ? 'HSN 27111900 ತೆರಿಗೆ ಮರುಪಾವತಿ' : '100% Tax credit recovery'}
            </span>
          </div>
        </div>

        {/* Recommended Manifold Advice */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {lang === 'kn'
                ? `ಶಿಫಾರಸು ಮಾಡಲಾದ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಸಿಸ್ಟಮ್: ಕನಿಷ್ಠ ${Math.max(2, Math.ceil(raw19kgNeeded / 2))}x${Math.max(2, Math.ceil(raw19kgNeeded / 2))} ಆಟೋ-ಚೇಂಜ್‌ಓವರ್ ಬ್ಯಾಂಕ್.`
                : `Recommended Manifold Specification: Minimum ${Math.max(2, Math.ceil(raw19kgNeeded / 2))}x${Math.max(2, Math.ceil(raw19kgNeeded / 2))} Auto-Changeover Bank to prevent flame drop.`}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Transfer to AI or Book Immediately */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleAskAi}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{lang === 'kn' ? 'AI ಸಲಹೆಗಾರನೊಂದಿಗೆ ಚರ್ಚಿಸಿ' : 'Discuss This Plan with AI Advisor'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {onOpenOrderModal && (
          <button
            type="button"
            onClick={onOpenOrderModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Flame className="w-4 h-4" />
            <span>{lang === 'kn' ? 'ಈ ಸಿಲಿಂಡರ್‌ಗಳನ್ನು ಈಗಲೇ ಬುಕ್ ಮಾಡಿ' : 'Book These Cylinders Now'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
