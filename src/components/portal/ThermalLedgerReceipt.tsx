import React, { useState } from 'react';
import {
  Printer,
  X,
  FileText,
  CheckCircle2,
  Calendar,
  Building2,
  Phone,
  Receipt,
  Download,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { CustomerAccount, LedgerEntry, Language } from '../../types';
import { BUSINESS_INFO } from '../../data/content';

interface ThermalLedgerReceiptProps {
  customer: CustomerAccount;
  ledgers: LedgerEntry[];
  lang: Language;
  onClose?: () => void;
  initialPaperSize?: '80mm' | '58mm';
}

export const ThermalLedgerReceipt: React.FC<ThermalLedgerReceiptProps> = ({
  customer,
  ledgers,
  lang,
  onClose,
  initialPaperSize = '80mm'
}) => {
  const [paperSize, setPaperSize] = useState<'80mm' | '58mm'>(initialPaperSize);
  const [filterRange, setFilterRange] = useState<'all' | '5' | '10' | '30days'>('all');

  // Filter ledgers based on range selection
  const filteredLedgers = React.useMemo(() => {
    let list = [...ledgers];
    if (filterRange === '5') {
      list = list.slice(-5);
    } else if (filterRange === '10') {
      list = list.slice(-10);
    } else if (filterRange === '30days') {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 30);
      list = list.filter((e) => new Date(e.date) >= cutoff);
    }
    return list;
  }, [ledgers, filterRange]);

  // Aggregate stats
  const totals = React.useMemo(() => {
    return filteredLedgers.reduce(
      (acc, curr) => {
        acc.cylindersDelivered += curr.cylindersDelivered || 0;
        acc.emptyCollected += curr.emptyCollected || 0;
        acc.amountBilled += curr.amountBilled || 0;
        acc.amountPaid += curr.amountPaid || 0;
        return acc;
      },
      { cylindersDelivered: 0, emptyCollected: 0, amountBilled: 0, amountPaid: 0 }
    );
  }, [filteredLedgers]);

  const handlePrint = () => {
    window.print();
  };

  const printDateStr = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[94vh]">
        {/* Top Modal Controls Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between flex-shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-orange-400">
                  Thermal POS Roll Format
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-slate-300 font-bold">
                  {paperSize === '80mm' ? '80mm (3.15" Standard)' : '58mm (2.28" Mini POS)'}
                </span>
              </div>
              <h2 className="text-sm font-bold text-white">
                {lang === 'kn' ? 'ಥರ್ಮಲ್ ಪ್ರಿಂಟರ್ ಪಾಸ್‌ಬುಕ್ ರಸೀದಿ' : 'Customer Ledger Thermal Receipt'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="btn-trigger-print"
              className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಪ್ರಿಂಟ್ ಮಾಡಿ' : 'Print Receipt'}</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Action bar: Paper width selector & entries filter */}
        <div className="px-5 py-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
          {/* Paper Size selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
              {lang === 'kn' ? 'ಪೇಪರ್ ಗಾತ್ರ:' : 'Paper Size:'}
            </span>
            <div className="inline-flex rounded-lg p-0.5 bg-slate-200 border border-slate-300">
              <button
                type="button"
                onClick={() => setPaperSize('80mm')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-black transition-all ${
                  paperSize === '80mm'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                80mm (Standard POS)
              </button>
              <button
                type="button"
                onClick={() => setPaperSize('58mm')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-black transition-all ${
                  paperSize === '58mm'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                58mm (Handheld POS)
              </button>
            </div>
          </div>

          {/* Filter Range */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
              {lang === 'kn' ? 'ನಮೂದುಗಳು:' : 'Entries:'}
            </span>
            <select
              value={filterRange}
              onChange={(e) => setFilterRange(e.target.value as any)}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-[11px] font-bold text-slate-800 focus:outline-none"
            >
              <option value="all">All Entries ({ledgers.length})</option>
              <option value="5">Last 5 Transactions</option>
              <option value="10">Last 10 Transactions</option>
              <option value="30days">Past 30 Days</option>
            </select>
          </div>
        </div>

        {/* Scrollable Receipt Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-200 flex justify-center items-start">
          {/* Simulated Thermal Paper Roll with realistic paper edges */}
          <div
            id="thermal-ledger-print-root"
            className={`bg-white text-slate-900 font-mono text-[11px] leading-tight shadow-xl rounded-sm transition-all relative border border-slate-300 ${
              paperSize === '80mm' ? 'w-[320px] max-w-[320px] p-3' : 'paper-58mm w-[240px] max-w-[240px] p-2 text-[9.5px]'
            }`}
            style={{
              fontFamily: '"Courier New", Courier, monospace, system-ui'
            }}
          >
            {/* Top jagged tear edge effect */}
            <div className="print:hidden border-b-2 border-dashed border-slate-300 pb-2 mb-2 text-center text-[9px] text-slate-600 uppercase tracking-widest">
              --- THERMAL PAPER ROLL ---
            </div>

            {/* HEADER */}
            <div className="text-center space-y-0.5">
              <div className="font-black text-sm uppercase tracking-tight text-black">
                {BUSINESS_INFO.name}
              </div>
              <div className="text-[10px] font-bold text-black uppercase">
                {BUSINESS_INFO.taglineEn}
              </div>
              <div className="text-[9.5px] text-black">
                Sharapurapalya, Nelamangala - 562123
              </div>
              <div className="text-[9.5px] text-black">
                GSTIN: {BUSINESS_INFO.gstin}
              </div>
              <div className="text-[9.5px] text-black">
                Tel: +91 {BUSINESS_INFO.phonePrimary} / {BUSINESS_INFO.phoneSecondary}
              </div>
              <div className="text-[9px] text-black">
                24/7 Helpline: +91 {BUSINESS_INFO.phoneHelpline}
              </div>
            </div>

            {/* Double Rule */}
            <div className="my-1.5 text-center text-black font-bold tracking-tighter select-none">
              ================================
            </div>

            {/* DOCUMENT TITLE */}
            <div className="text-center space-y-0.5">
              <div className="font-black text-xs uppercase tracking-wider text-black">
                CUSTOMER PASSBOOK & LEDGER
              </div>
              <div className="text-[9px] text-black">
                Print Date: {printDateStr}
              </div>
            </div>

            {/* Single Rule */}
            <div className="my-1 text-center text-black font-bold tracking-tighter select-none">
              --------------------------------
            </div>

            {/* CUSTOMER PROFILE */}
            <div className="space-y-0.5 text-black">
              <div className="flex justify-between">
                <span className="font-bold">Cust ID:</span>
                <span className="font-mono">{customer.id}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Account:</span>
                <span className="text-right max-w-[180px] truncate">{customer.businessName}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact:</span>
                <span>{customer.contactPerson}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span>+91 {customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Area:</span>
                <span className="text-right max-w-[170px] truncate">{customer.area}</span>
              </div>
              <div className="flex justify-between">
                <span>Brand:</span>
                <span>{customer.preferredBrand}</span>
              </div>
            </div>

            {/* Double Rule */}
            <div className="my-1.5 text-center text-black font-bold tracking-tighter select-none">
              ================================
            </div>

            {/* CURRENT POSITION SUMMARY (HIGHLIGHTED) */}
            <div className="border border-black p-1.5 rounded-none bg-slate-50 print:bg-transparent space-y-1">
              <div className="flex justify-between items-center text-black font-black text-xs">
                <span>OUTSTANDING DUE:</span>
                <span>₹{customer.balanceAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-black font-bold text-[10px]">
                <span>EMPTY (MT) OWED:</span>
                <span>{customer.emptyCylindersDue} Cylinders</span>
              </div>
            </div>

            {/* Single Rule */}
            <div className="my-1 text-center text-black font-bold tracking-tighter select-none">
              --------------------------------
            </div>

            {/* STATEMENT PERIOD & ENTRY COUNT */}
            <div className="flex justify-between text-[9px] text-black font-bold pb-1">
              <span>LEDGER ENTRIES: {filteredLedgers.length}</span>
              <span>
                {filteredLedgers.length > 0
                  ? `${filteredLedgers[0].date} to ${filteredLedgers[filteredLedgers.length - 1].date}`
                  : 'No entries'}
              </span>
            </div>

            {/* TRANSACTION ROWS */}
            {filteredLedgers.length === 0 ? (
              <div className="py-3 text-center text-[10px] text-black italic">
                -- No transaction records in selected range --
              </div>
            ) : (
              <div className="space-y-2 pt-1 border-t border-dashed border-black">
                {filteredLedgers.map((entry, idx) => (
                  <div key={entry.id || idx} className="text-black space-y-0.5">
                    {/* Line 1: Date & Description */}
                    <div className="flex justify-between font-black text-[10px]">
                      <span>{entry.date}</span>
                      <span className="max-w-[150px] truncate text-right">{entry.description}</span>
                    </div>

                    {/* Line 2: Quantities */}
                    <div className="flex justify-between text-[9.5px]">
                      <span>
                        Deliv: <strong className="font-bold">{entry.cylindersDelivered ? `+${entry.cylindersDelivered}` : '0'}</strong> Cyl
                      </span>
                      <span>
                        MT Ret: <strong className="font-bold">{entry.emptyCollected ? `${entry.emptyCollected}` : '0'}</strong> MT
                      </span>
                    </div>

                    {/* Line 3: Amounts */}
                    <div className="flex justify-between text-[9.5px]">
                      <span>
                        Bill: ₹{entry.amountBilled ? entry.amountBilled.toLocaleString() : '0'}
                      </span>
                      <span>
                        Paid: <strong className="font-bold">₹{entry.amountPaid ? entry.amountPaid.toLocaleString() : '0'}</strong>
                        {entry.paymentMode ? ` (${entry.paymentMode.toUpperCase()})` : ''}
                      </span>
                    </div>

                    {/* Line 4: Running Balance */}
                    <div className="flex justify-between text-[9.5px] border-b border-dotted border-black pb-1">
                      <span>Run Bal:</span>
                      <span className="font-black">₹{entry.balanceAfter.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Single Rule */}
            <div className="my-1.5 text-center text-black font-bold tracking-tighter select-none">
              --------------------------------
            </div>

            {/* STATEMENT TOTALS */}
            <div className="space-y-0.5 text-black font-bold text-[9.5px]">
              <div className="flex justify-between">
                <span>Total Cylinders Delivered:</span>
                <span>{totals.cylindersDelivered} Cyl</span>
              </div>
              <div className="flex justify-between">
                <span>Total Empty MT Returned:</span>
                <span>{totals.emptyCollected} MT</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount Billed:</span>
                <span>₹{totals.amountBilled.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount Paid:</span>
                <span>₹{totals.amountPaid.toLocaleString()}</span>
              </div>
            </div>

            {/* Double Rule */}
            <div className="my-1.5 text-center text-black font-bold tracking-tighter select-none">
              ================================
            </div>

            {/* NET CLOSING POSITION */}
            <div className="text-black space-y-0.5">
              <div className="flex justify-between font-black text-xs">
                <span>CLOSING BALANCE:</span>
                <span>₹{customer.balanceAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-[10px]">
                <span>EMPTY (MT) OWED:</span>
                <span>{customer.emptyCylindersDue} Cyl</span>
              </div>
            </div>

            {/* Double Rule */}
            <div className="my-1.5 text-center text-black font-bold tracking-tighter select-none">
              ================================
            </div>

            {/* OFFICIAL VERIFICATION & SAFETY */}
            <div className="text-center space-y-1 text-black text-[9px]">
              <div className="font-bold uppercase">
                *** OFFICIAL PASSBOOK STATEMENT ***
              </div>
              <div>PESO Approved Commercial LPG Supply</div>
              <div>Mandatory O-Ring Leak Tested at Delivery</div>
              <div>Keep Empty Cylinders Ready for Exchange</div>
            </div>

            {/* SIGNATURE SECTIONS */}
            <div className="mt-5 pt-3 border-t border-dashed border-black grid grid-cols-2 gap-3 text-[9px] text-center text-black">
              <div>
                <div className="h-6"></div>
                <div className="border-t border-black pt-0.5 font-bold">
                  Customer Signature
                </div>
              </div>
              <div>
                <div className="h-6"></div>
                <div className="border-t border-black pt-0.5 font-bold">
                  Sandhya Enterprises
                </div>
              </div>
            </div>

            {/* FOOTER THANK YOU */}
            <div className="mt-3 pt-2 text-center text-[9px] text-black border-t border-black">
              <div className="font-bold">THANK YOU FOR YOUR PARTNERSHIP</div>
              <div>For Immediate Refill Booking WhatsApp:</div>
              <div className="font-black text-[10px]">+91 {BUSINESS_INFO.phoneWhatsApp}</div>
            </div>

            {/* Bottom serrated cut indicator */}
            <div className="print:hidden border-t-2 border-dashed border-slate-300 pt-2 mt-3 text-center text-[9px] text-slate-600 uppercase tracking-widest">
              --- TEAR HERE ---
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-500">
            <span className="font-bold text-slate-700">Thermal Tip:</span> Fits 80mm & 58mm POS receipt printers with zero margin clipping.
          </div>
          <div className="flex items-center gap-2">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                {lang === 'kn' ? 'ಮುಚ್ಚಿ' : 'Close'}
              </button>
            )}
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'kn' ? 'ರಸೀದಿ ಪ್ರಿಂಟ್ ಮಾಡಿ' : 'Print Thermal Receipt'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
