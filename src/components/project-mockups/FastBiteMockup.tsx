import React, { useState } from 'react';
import { Utensils, QrCode, CheckCircle, Clock, Sparkles } from 'lucide-react';

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
    <div className="w-full bg-[#080A0D] text-[#F4F6F8] border border-white/10 p-5 sm:p-6 rounded-none font-sans text-xs sm:text-sm shadow-2xl relative overflow-hidden">
      {/* Top Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Utensils className="w-3.5 h-3.5 text-[#C6FF00]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#F4F6F8]">
            FAST BITE // CAMPUS CANTEEN HUB
          </span>
        </div>
        <span className="font-mono text-[11px] px-2 py-0.5 bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-[#C6FF00] flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> +{rewardPoints} PTS REWARD
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-5">
        {/* Left Column: Meal Selection */}
        <div className="md:col-span-7 space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-[#929BA6] block">
              Quick Menu Customizer (Tap to toggle)
            </span>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`w-full p-2.5 border text-left flex items-center justify-between transition-all ${
                  item.selected
                    ? 'bg-[#171D24] border-[#C6FF00] text-[#F4F6F8]'
                    : 'bg-[#11151A] border-white/10 text-[#929BA6]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-3.5 h-3.5 rounded-none border flex items-center justify-center ${
                      item.selected
                        ? 'border-[#C6FF00] bg-[#C6FF00]'
                        : 'border-white/20 bg-transparent'
                    }`}
                  >
                    {item.selected && <CheckCircle className="w-3 h-3 text-[#080A0D]" />}
                  </div>
                  <span className="font-mono text-xs font-medium">{item.name}</span>
                </div>
                <span className="font-mono text-xs font-semibold">₹{item.price}.00</span>
              </button>
            ))}
          </div>

          {/* Pickup Window Selection */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-mono uppercase text-[#929BA6] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C6FF00]" /> Scheduled Collection Window
            </label>
            <select
              value={pickupSlot}
              onChange={(e) => setPickupSlot(e.target.value)}
              className="w-full bg-[#11151A] border border-white/10 text-xs font-mono px-3 py-1.5 text-[#F4F6F8] focus:border-[#C6FF00] outline-none"
            >
              <option value="1:00 PM - 1:15 PM">1:00 PM - 1:15 PM (Early Break)</option>
              <option value="1:20 PM - 1:35 PM">1:20 PM - 1:35 PM (Peak Lunch)</option>
              <option value="1:40 PM - 1:55 PM">1:40 PM - 1:55 PM (Late Break)</option>
            </select>
          </div>

          {/* Pricing Summary */}
          <div className="p-3 bg-[#11151A] border border-white/10 space-y-1 font-mono text-xs">
            <div className="flex justify-between text-[#929BA6]">
              <span>Items Selected ({selectedItems.length})</span>
              <span>₹{subtotal}.00</span>
            </div>
            <div className="flex justify-between text-[#929BA6]">
              <span>Campus Digital Convenience Fee</span>
              <span className="text-[#C6FF00]">₹0.00 (WAIVED)</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-[#F4F6F8]">
              <span>TOTAL ORDER:</span>
              <span className="text-[#C6FF00]">₹{subtotal}.00</span>
            </div>
          </div>
        </div>

        {/* Right Column: Counter Verification Token */}
        <div className="md:col-span-5 bg-[#11151A] border border-white/10 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] text-[#929BA6] uppercase tracking-wider">
                Order Verification
              </span>
              <span className="font-mono text-xs font-semibold text-[#F4F6F8]">#FB-204</span>
            </div>

            <div className="bg-[#080A0D] border border-white/10 p-4 flex flex-col items-center justify-center space-y-2">
              <div className="w-24 h-24 bg-[#171D24] border border-[#C6FF00]/40 flex items-center justify-center p-2 relative">
                <QrCode className="w-20 h-20 text-[#C6FF00]" />
              </div>
              <p className="font-mono text-[10px] text-[#929BA6] text-center">
                Scan at Canteen Express Lane
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 space-y-2 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-[#C6FF00]">
              <span className="w-2 h-2 bg-[#C6FF00] rounded-none animate-pulse" />
              <span>Kitchen Prepping (Queue #03)</span>
            </div>
            <div className="flex items-center justify-between text-[#929BA6] text-[10px]">
              <span>SLOT: {pickupSlot.split(' ')[0]}</span>
              <span className="text-[#F4F6F8]">EST: ~8 MIN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
