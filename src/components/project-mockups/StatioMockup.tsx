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
    <div className="w-full bg-[#111111] text-[#F5F5F0] border border-[#333333] p-5 sm:p-6 rounded-none font-sans text-xs sm:text-sm shadow-2xl relative overflow-hidden">
      {/* Top Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#D1FF00] rounded-none animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#F5F5F0]">
            STATIO-MLR // WORKFLOW DEMO
          </span>
        </div>
        <span className="font-mono text-[11px] px-2 py-0.5 bg-[#1F1F1F] border border-[#333333] text-[#D1FF00]">
          PICKUP VERIFIED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-5">
        {/* Left Column: Upload & Configuration */}
        <div className="md:col-span-7 space-y-4">
          {/* File Card */}
          <div className="p-3 bg-[#171717] border border-[#2B2B2B] flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-[#222222] border border-[#333333] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-[#D1FF00]" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs text-[#F5F5F0] truncate">ML_Lab_Manual_Final.pdf</p>
                <p className="text-[11px] text-[#777777]">{pageCount} pages · 4.2 MB · Verified format</p>
              </div>
            </div>
            <span className="font-mono text-[10px] text-[#D1FF00] bg-[#D1FF00]/10 px-2 py-0.5 border border-[#D1FF00]/30 shrink-0">
              UPLOADED
            </span>
          </div>

          {/* Configuration Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-[#777777] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Output Color
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setPrintType('bw')}
                  className={`px-3 py-1 font-mono text-xs border transition-all ${
                    printType === 'bw'
                      ? 'bg-[#D1FF00] text-[#111111] border-[#D1FF00] font-semibold'
                      : 'bg-transparent text-[#999999] border-[#333333] hover:border-[#666666]'
                  }`}
                >
                  B&W (₹1.5/p)
                </button>
                <button
                  type="button"
                  onClick={() => setPrintType('color')}
                  className={`px-3 py-1 font-mono text-xs border transition-all ${
                    printType === 'color'
                      ? 'bg-[#D1FF00] text-[#111111] border-[#D1FF00] font-semibold'
                      : 'bg-transparent text-[#999999] border-[#333333] hover:border-[#666666]'
                  }`}
                >
                  Color (₹5/p)
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-[#777777] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Spiral Binding
              </span>
              <button
                type="button"
                onClick={() => setBinding(!binding)}
                className={`px-3 py-1 font-mono text-xs border transition-all ${
                  binding
                    ? 'bg-[#222222] text-[#D1FF00] border-[#D1FF00]'
                    : 'bg-transparent text-[#777777] border-[#333333]'
                }`}
              >
                {binding ? 'Included (+₹30)' : 'None'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-[#777777] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Pickup Slot
              </span>
              <div className="flex gap-1">
                {['11:30 AM', '1:15 PM', '3:45 PM'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    className={`px-2 py-0.5 font-mono text-[11px] border ${
                      slot === s
                        ? 'border-[#D1FF00] text-[#D1FF00] bg-[#D1FF00]/10'
                        : 'border-[#2B2B2B] text-[#777777]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Calculation Pill */}
          <div className="p-3 bg-[#0A0A0A] border border-[#2B2B2B] flex items-center justify-between">
            <span className="font-mono text-xs text-[#999999]">Auto Cost Breakdown</span>
            <div className="text-right">
              <span className="font-mono text-lg font-bold text-[#D1FF00]">₹{totalCost.toFixed(2)}</span>
              <span className="text-[10px] text-[#777777] block font-mono">
                {pageCount}p × ₹{pageRate} {binding && '+ ₹30 binding'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Order QR & Verification Flow */}
        <div className="md:col-span-5 bg-[#0E0E0E] border border-[#2B2B2B] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] text-[#777777] uppercase tracking-wider">
                Pickup Token
              </span>
              <span className="font-mono text-xs font-semibold text-[#F5F5F0]">#ST-094</span>
            </div>

            {/* Visual QR Code Display */}
            <div className="bg-[#FFFFFF] p-3 text-center rounded-none my-2 flex flex-col items-center justify-center">
              <QrCode className="w-20 h-20 text-[#111111]" strokeWidth={1.75} />
              <p className="font-mono text-[10px] text-[#111111] mt-1 font-bold tracking-widest">
                VERIFY-MLRIT-ST094
              </p>
            </div>

            <div className="mt-3 space-y-1 text-center">
              <p className="font-mono text-[11px] text-[#D1FF00] flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Staff Pickup Scanner Ready
              </p>
              <p className="text-[10px] text-[#777777] leading-relaxed">
                QR is presented to shop operator solely for order identification & batch collection.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#222222] mt-3">
            <div className="flex justify-between text-[11px] font-mono text-[#888888]">
              <span>Slot: {slot}</span>
              <span className="text-[#D1FF00]">Ready in Queue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
