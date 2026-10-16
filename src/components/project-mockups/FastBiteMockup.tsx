import React, { useState } from 'react';
import { Utensils, QrCode, CheckCircle, Clock, Sparkles, AlertCircle } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

export const FastBiteMockup: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([
    { id: '1', name: 'Paneer Tikka Roll', price: 75, selected: true },
    { id: '2', name: 'Artisan Cold Coffee', price: 45, selected: true },
    { id: '3', name: 'Grilled Cheese Sandwich', price: 55, selected: false },
  ]);

  const [pickupSlot, setPickupSlot] = useState<string>('1:20 PM - 1:35 PM');

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const selectedItems = items.filter((i) => i.selected);
  const subtotal = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
  const rewardPoints = Math.round(subtotal * 0.5);

  return (
    <div className="w-full bg-[#111111] text-[#F5F5F0] border border-[#333333] p-5 sm:p-6 rounded-none font-sans text-xs sm:text-sm shadow-2xl relative overflow-hidden">
      {/* Top Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
        <div className="flex items-center gap-2">
          <Utensils className="w-3.5 h-3.5 text-[#D1FF00]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#F5F5F0]">
            FAST BITE // CAMPUS CANTEEN HUB
          </span>
        </div>
        <span className="font-mono text-[11px] px-2 py-0.5 bg-[#D1FF00]/10 border border-[#D1FF00]/30 text-[#D1FF00] flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> +{rewardPoints} PTS EARNED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-5">
        {/* Left Column: Meal Selection */}
        <div className="md:col-span-7 space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-[#777777] block">
              Quick Menu Customizer (Tap to toggle)
            </span>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`w-full p-2.5 border text-left flex items-center justify-between transition-all ${
                  item.selected
                    ? 'bg-[#1C1C1C] border-[#D1FF00] text-[#F5F5F0]'
                    : 'bg-[#141414] border-[#2A2A2A] text-[#666666]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 border flex items-center justify-center ${
                      item.selected
                        ? 'border-[#D1FF00] bg-[#D1FF00] text-[#111111]'
                        : 'border-[#444444] bg-transparent'
                    }`}
                  >
                    {item.selected && <CheckCircle className="w-3.5 h-3.5" />}
                  </div>
                  <span className="font-mono text-xs">{item.name}</span>
                </div>
                <span className="font-mono text-xs">₹{item.price}</span>
              </button>
            ))}
          </div>

          {/* Time Slot Picker */}
          <div className="p-3 bg-[#171717] border border-[#2B2B2B] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#888888] flex items-center gap-1.5 uppercase">
                <Clock className="w-3.5 h-3.5 text-[#D1FF00]" /> Scheduled Pickup Window
              </span>
              <span className="font-mono text-[11px] text-[#D1FF00]">Counter #02</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['1:00 PM - 1:15 PM', '1:20 PM - 1:35 PM'].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setPickupSlot(slot)}
                  className={`py-1 px-2 font-mono text-[10px] sm:text-[11px] border text-center transition-all ${
                    pickupSlot === slot
                      ? 'bg-[#D1FF00] text-[#111111] border-[#D1FF00] font-semibold'
                      : 'bg-transparent text-[#777777] border-[#333333]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary & Anti-Queue Guarantee */}
          <div className="flex items-center justify-between p-3 bg-[#0A0A0A] border border-[#2B2B2B]">
            <div>
              <p className="text-[11px] text-[#777777] font-mono">Total Meal Value</p>
              <p className="font-mono text-lg font-bold text-[#D1FF00]">₹{subtotal}</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-[10px] text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 border border-[#00E5FF]/30 inline-flex items-center gap-1">
                QUEUE SKIPPED
              </span>
              <p className="text-[10px] text-[#777777] mt-0.5">Collect directly at counter</p>
            </div>
          </div>
        </div>

        {/* Right Column: Counter Verification Token & Kitchen Tracker */}
        <div className="md:col-span-5 bg-[#0E0E0E] border border-[#2B2B2B] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] text-[#777777] uppercase tracking-wider">
                Counter Order Token
              </span>
              <span className="font-mono text-xs font-bold text-[#F5F5F0]">#FB-240</span>
            </div>

            {/* QR Card */}
            <div className="bg-[#FFFFFF] p-3 text-center rounded-none my-2 flex flex-col items-center justify-center">
              <QrCode className="w-20 h-20 text-[#111111]" strokeWidth={1.75} />
              <p className="font-mono text-[10px] text-[#111111] mt-1 font-bold tracking-widest">
                FASTBITE-VERIFY-240
              </p>
            </div>

            {/* Order Progression */}
            <div className="mt-3 space-y-1.5 border-t border-[#222222] pt-3">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#666666]">1. Order Placed</span>
                <span className="text-[#D1FF00]">✓</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#F5F5F0]">2. Kitchen Prepping</span>
                <span className="text-[#D1FF00] animate-pulse">● In Progress</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#555555]">3. Counter Ready</span>
                <span className="text-[#555555]">Pending Scan</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#222222] mt-3">
            <p className="text-[10px] text-[#777777] flex items-center gap-1 leading-relaxed">
              <AlertCircle className="w-3 h-3 text-[#D1FF00] shrink-0" />
              Canteen staff scans QR at pickup window to authenticate food token.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
