import React, { useState } from 'react';
import { FileText, CheckCircle2, Clock, QrCode, Sliders, Layers } from 'lucide-react';

export const StatioMockup: React.FC = () => {
  const [printType, setPrintType] = useState<'bw' | 'color'>('bw');
  const [binding, setBinding] = useState<boolean>(true);
  const [slot, setSlot] = useState<string>('11:30 AM');

  const pageCount = 28;
  const pageRate = printType === 'bw' ? 1.5 : 5.0;
  const bindingCost = binding ? 30 : 0;
  const totalCost = pageCount * pageRate + bindingCost;

  return (
    <div className="w-full bg-[#080A0D] text-[#F4F6F8] border border-white/10 p-5 sm:p-6 rounded-none font-sans text-xs sm:text-sm shadow-2xl relative overflow-hidden">
      {/* Top Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#C6FF00] rounded-none animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#F4F6F8]">
            STATIO-MLR // WORKFLOW DEMO
          </span>
        </div>
        <span className="font-mono text-[11px] px-2 py-0.5 bg-[#11151A] border border-[#C6FF00]/40 text-[#C6FF00]">
          PICKUP VERIFIED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-5">
        {/* Left Column: Upload & Configuration */}
        <div className="md:col-span-7 space-y-4">
          {/* File Card */}
          <div className="p-3 bg-[#11151A] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-[#171D24] border border-white/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-[#C6FF00]" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs text-[#F4F6F8] truncate">ML_Lab_Manual_Final.pdf</p>
                <p className="text-[11px] text-[#929BA6]">{pageCount} pages · 4.2 MB · Verified format</p>
              </div>
            </div>
            <span className="font-mono text-[10px] text-[#C6FF00] bg-[#C6FF00]/10 px-2 py-0.5 border border-[#C6FF00]/30 shrink-0">
              UPLOADED
            </span>
          </div>

          {/* Configuration Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-[#929BA6] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#C6FF00]" /> Output Color
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setPrintType('bw')}
                  className={`px-3 py-1 font-mono text-xs border transition-all ${
                    printType === 'bw'
                      ? 'bg-[#C6FF00] text-[#080A0D] border-[#C6FF00] font-semibold shadow-[0_0_10px_rgba(198,255,0,0.2)]'
                      : 'bg-[#11151A] text-[#929BA6] border-white/10 hover:text-[#F4F6F8]'
                  }`}
                >
                  B&W (₹1.50)
                </button>
                <button
                  type="button"
                  onClick={() => setPrintType('color')}
                  className={`px-3 py-1 font-mono text-xs border transition-all ${
                    printType === 'color'
                      ? 'bg-[#C6FF00] text-[#080A0D] border-[#C6FF00] font-semibold shadow-[0_0_10px_rgba(198,255,0,0.2)]'
                      : 'bg-[#11151A] text-[#929BA6] border-white/10 hover:text-[#F4F6F8]'
                  }`}
                >
                  Color (₹5.00)
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-[#929BA6] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#C6FF00]" /> Spiral Binding
              </span>
              <button
                type="button"
                onClick={() => setBinding(!binding)}
                className={`px-3 py-1 font-mono text-xs border transition-all ${
                  binding
                    ? 'bg-[#C6FF00] text-[#080A0D] border-[#C6FF00] font-semibold'
                    : 'bg-[#11151A] text-[#929BA6] border-white/10'
                }`}
              >
                {binding ? 'Yes (+₹30)' : 'No (Loose)'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-[#929BA6] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C6FF00]" /> Pickup Slot
              </span>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="bg-[#11151A] border border-white/10 text-xs font-mono px-2.5 py-1 text-[#F4F6F8] focus:border-[#C6FF00] outline-none"
              >
                <option value="11:30 AM">11:30 AM (Morning Break)</option>
                <option value="1:15 PM">1:15 PM (Lunch Break)</option>
                <option value="3:45 PM">3:45 PM (Post-Lab)</option>
              </select>
            </div>
          </div>

          {/* Pricing Calculation Breakdown */}
          <div className="p-3 bg-[#11151A] border border-white/10 space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-[#929BA6]">
              <span>
                Printing ({pageCount} pages × ₹{pageRate.toFixed(2)})
              </span>
              <span>₹{(pageCount * pageRate).toFixed(2)}</span>
            </div>
            {binding && (
              <div className="flex justify-between text-[#929BA6]">
                <span>Spiral Binding & Protective Cover</span>
                <span>₹30.00</span>
              </div>
            )}
            <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-[#F4F6F8]">
              <span>ESTIMATED TOTAL:</span>
              <span className="text-[#C6FF00]">₹{totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order QR & Verification Flow */}
        <div className="md:col-span-5 bg-[#11151A] border border-white/10 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] text-[#929BA6] uppercase tracking-wider">
                Pickup Token
              </span>
              <span className="font-mono text-xs font-semibold text-[#F4F6F8]">#ST-094</span>
            </div>

            {/* Visual Token Representation */}
            <div className="bg-[#080A0D] border border-white/10 p-4 flex flex-col items-center justify-center space-y-2">
              <div className="w-24 h-24 bg-[#171D24] border border-[#C6FF00]/40 flex items-center justify-center p-2 relative group/qr">
                <QrCode className="w-20 h-20 text-[#C6FF00]" />
              </div>
              <p className="font-mono text-[10px] text-[#929BA6] text-center">
                Scan at College Stationary Counter
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 space-y-2 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-[#C6FF00]">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Token Authenticated</span>
            </div>
            <div className="flex items-center justify-between text-[#929BA6] text-[10px]">
              <span>SLOT: {slot}</span>
              <span className="text-[#F4F6F8]">READY IN ~12 MIN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
