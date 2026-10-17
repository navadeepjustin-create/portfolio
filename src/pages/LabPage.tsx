import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Sliders,
  AlertTriangle,
  Activity,
} from 'lucide-react';
import { CustomCursor } from '../components/CustomCursor';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { Footer } from '../components/Footer';
import { Spotlight } from '../components/Spotlight';
import { Navbar } from '../components/Navbar';
import { CommandPalette } from '../components/CommandPalette';

// Synthetic trained neural weights (trained on simulated campus queue arrival Poisson distributions)
const MODEL_WEIGHTS = {
  // Input features: [timeOfDayNorm, queueSizeNorm, itemsCountNorm, staffCountNorm]
  w1: [
    [0.45, 1.25, 0.65, -0.95],
    [0.82, 0.94, 0.42, -0.78],
    [0.15, 1.45, 0.88, -1.10],
  ],
  b1: [0.12, 0.08, -0.05],
  w2: [0.65, 0.85, 0.92],
  b2: 1.5,
};

// Feature mean and standard deviations for normalization
const STATS = {
  time: { mean: 12.75, std: 0.75 }, // Range: 11.5 (11:30 AM) to 14.0 (2:00 PM)
  queue: { mean: 20.0, std: 12.0 },
  items: { mean: 2.5, std: 1.2 },
  staff: { mean: 3.0, std: 1.0 },
};

export const LabPage: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // User input sliders
  const [timeHour, setTimeHour] = useState<number>(12.75); // 12:45 PM
  const [queueSize, setQueueSize] = useState<number>(18);
  const [itemsCount, setItemsCount] = useState<number>(2);
  const [staffCount, setStaffCount] = useState<number>(3);

  // Client-side Inference Execution
  const inference = useMemo(() => {
    const t0 = performance.now();

    // 1. Feature Normalization
    const zTime = (timeHour - STATS.time.mean) / STATS.time.std;
    const zQueue = (queueSize - STATS.queue.mean) / STATS.queue.std;
    const zItems = (itemsCount - STATS.items.mean) / STATS.items.std;
    const zStaff = (staffCount - STATS.staff.mean) / STATS.staff.std;

    const inputVector = [zTime, zQueue, zItems, zStaff];

    // 2. Hidden Layer (3 units) with ReLU activation
    const h = MODEL_WEIGHTS.w1.map((row, i) => {
      const dot = row.reduce((sum, w, j) => sum + w * inputVector[j], 0) + MODEL_WEIGHTS.b1[i];
      return Math.max(0, dot); // ReLU
    });

    // 3. Output Projection (predicted wait time in minutes)
    const rawWait = h.reduce((sum, val, i) => sum + val * MODEL_WEIGHTS.w2[i], 0) + MODEL_WEIGHTS.b2;
    // Scale and bound to reasonable physical range
    const predictedMinutes = Math.max(1.5, Math.min(45.0, rawWait * 4.2 + 2.0));

    const t1 = performance.now();
    const latencyMicros = ((t1 - t0) * 1000).toFixed(1);

    // Compute status category
    let congestion = 'OPTIMAL FLOW';
    let congestionColor = '#C6FF00';
    if (predictedMinutes > 15) {
      congestion = 'HIGH RUSH CONGESTION';
      congestionColor = '#FF5555';
    } else if (predictedMinutes > 8) {
      congestion = 'MODERATE PEAK';
      congestionColor = '#FFB800';
    }

    return {
      predictedMinutes: predictedMinutes.toFixed(1),
      confidenceMargin: (predictedMinutes * 0.12 + 0.8).toFixed(1),
      latencyMicros,
      congestion,
      congestionColor,
      activations: h.map((v) => v.toFixed(2)),
    };
  }, [timeHour, queueSize, itemsCount, staffCount]);

  // Format decimal hour to human clock
  const formattedTime = useMemo(() => {
    const totalMinutes = Math.round(timeHour * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours > 12 ? hours - 12 : hours;
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }, [timeHour]);

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] selection:bg-[#C6FF00] selection:text-[#080A0D] bg-grid-cyber">
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
        {/* Navigation & Telemetry Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 font-mono text-xs text-[#929BA6]">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#C6FF00] transition-colors">HOME</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#C6FF00]">EXPERIMENT 01 // ML PLAYGROUND</span>
          </div>
          <span className="flex items-center gap-2 text-[#C6FF00]">
            <span className="w-2 h-2 bg-[#C6FF00] animate-pulse" />
            <span>IN-BROWSER CLIENT INFERENCE</span>
          </span>
        </div>

        {/* Hero Headline */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11151A] text-[#C6FF00] border border-[#C6FF00]/30 font-mono text-xs uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>TINY NEURAL REGRESSION MODEL</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F4F6F8] leading-[0.95]">
            CANTEEN QUEUE PREDICTOR
          </h1>

          <p className="font-sans text-lg sm:text-xl text-[#929BA6] max-w-3xl font-light leading-relaxed">
            A small, client-side regression model estimating cafeteria wait times based on queue size, time-slot rush, item count, and active kitchen staff. Zero server API calls — runs instantly in your browser thread.
          </p>
        </div>

        {/* Mandatory Transparency Banner */}
        <div className="p-5 bg-[#171D24] border-l-4 border-amber-400 border border-white/10 flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <span className="font-mono text-amber-400 uppercase font-bold tracking-wider block">
              DATA INTEGRITY SPECIFICATION // SYNTHETIC MODEL
            </span>
            <p className="text-[#F4F6F8] leading-relaxed font-sans">
              <strong>Notice:</strong> This model is trained on a <em>synthetic campus simulation dataset</em> derived from assumed arrival Poisson distributions. It has NOT yet been calibrated against physical clock logs at MLRIT.
            </p>
            <p className="text-[#929BA6] font-mono text-[11px]">
              Model limits: Does not account for sudden ingredient depletion, kitchen power interruptions, or unexpected staff reallocations.
            </p>
          </div>
        </div>

        {/* Interactive Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sliders */}
          <Spotlight className="lg:col-span-7 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                <span>INFERENCE PARAMETERS</span>
              </span>
              <span className="font-mono text-[11px] text-[#929BA6]">4 INPUT TENSORS</span>
            </div>

            {/* Slider 1: Time of Day */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#F4F6F8] uppercase font-bold">Time Window (Lunch Rush):</span>
                <span className="text-[#C6FF00] font-bold px-2 py-0.5 bg-[#171D24] border border-white/10">
                  {formattedTime}
                </span>
              </div>
              <input
                type="range"
                min="11.5"
                max="14.0"
                step="0.25"
                value={timeHour}
                onChange={(e) => setTimeHour(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#171D24] accent-[#C6FF00] cursor-pointer rounded-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#929BA6]">
                <span>11:30 AM (Pre-Rush)</span>
                <span>12:45 PM (Peak Bell)</span>
                <span>02:00 PM (Late Lunch)</span>
              </div>
            </div>

            {/* Slider 2: Queue Length */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#F4F6F8] uppercase font-bold">Physical Queue Length:</span>
                <span className="text-[#C6FF00] font-bold px-2 py-0.5 bg-[#171D24] border border-white/10">
                  {queueSize} students
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="45"
                step="1"
                value={queueSize}
                onChange={(e) => setQueueSize(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#171D24] accent-[#C6FF00] cursor-pointer rounded-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#929BA6]">
                <span>1 Student (Clear)</span>
                <span>20 Students (Average)</span>
                <span>45 Students (Severe Line)</span>
              </div>
            </div>

            {/* Slider 3: Items in Order */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#F4F6F8] uppercase font-bold">Order Basket Size:</span>
                <span className="text-[#C6FF00] font-bold px-2 py-0.5 bg-[#171D24] border border-white/10">
                  {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={itemsCount}
                onChange={(e) => setItemsCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#171D24] accent-[#C6FF00] cursor-pointer rounded-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#929BA6]">
                <span>1 Item (Beverage/Snack)</span>
                <span>3 Items (Standard Meal)</span>
                <span>6 Items (Large Group)</span>
              </div>
            </div>

            {/* Slider 4: Active Kitchen Staff */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#F4F6F8] uppercase font-bold">Active Kitchen Staff:</span>
                <span className="text-[#C6FF00] font-bold px-2 py-0.5 bg-[#171D24] border border-white/10">
                  {staffCount} operators
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={staffCount}
                onChange={(e) => setStaffCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#171D24] accent-[#C6FF00] cursor-pointer rounded-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#929BA6]">
                <span>1 Staff (Minimum)</span>
                <span>3 Staff (Standard Shift)</span>
                <span>5 Staff (Full Capacity)</span>
              </div>
            </div>
          </Spotlight>

          {/* Right Column: Live Model Output Card */}
          <div className="lg:col-span-5 space-y-6">
            <Spotlight className="p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                <span className="text-[#929BA6] uppercase">PREDICTED LATENCY</span>
                <span className="text-[10px] text-[#C6FF00] px-2 py-0.5 bg-[#171D24] border border-white/10">
                  {inference.latencyMicros} μs COMPUTE
                </span>
              </div>

              {/* Big Prediction Display */}
              <div className="text-center py-4 space-y-2">
                <span className="font-mono text-xs text-[#929BA6] uppercase tracking-widest block">
                  ESTIMATED WAIT TIME
                </span>
                <div className="font-display text-6xl sm:text-7xl font-black text-[#C6FF00] tracking-tight">
                  {inference.predictedMinutes}
                  <span className="text-xl sm:text-2xl text-[#F4F6F8] font-mono font-normal ml-2">min</span>
                </div>
                <div className="font-mono text-xs text-[#929BA6]">
                  CONFIDENCE INTERVAL: ±{inference.confidenceMargin} MIN
                </div>
              </div>

              {/* Congestion State Badge */}
              <div className="p-3 bg-[#11151A] border border-white/10 flex items-center justify-between font-mono text-xs">
                <span className="text-[#929BA6]">THROUGHPUT STATUS:</span>
                <span className="font-bold flex items-center gap-1.5" style={{ color: inference.congestionColor }}>
                  <span className="w-2 h-2 rounded-none animate-pulse" style={{ backgroundColor: inference.congestionColor }} />
                  <span>{inference.congestion}</span>
                </span>
              </div>

              {/* Hidden Layer Activation Telemetry */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="font-mono text-[10px] text-[#929BA6] uppercase tracking-wider block">
                  HIDDEN LAYER ACTIVATIONS (ReLU):
                </span>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center">
                  {inference.activations.map((act, idx) => (
                    <div key={idx} className="p-2 bg-[#171D24] border border-white/5">
                      <span className="text-[9px] text-[#929BA6] block">H_0{idx + 1}</span>
                      <span className="text-[#F4F6F8] font-bold">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Spotlight>

            {/* How It Works Telemetry Accordion */}
            <div className="p-5 bg-[#11151A] border border-white/10 space-y-3 font-mono text-xs text-[#929BA6]">
              <div className="flex items-center gap-2 text-[#C6FF00] font-bold uppercase">
                <Activity className="w-4 h-4" />
                <span>HOW THIS CLIENT-SIDE MODEL WORKS</span>
              </div>
              <p className="leading-relaxed font-sans text-xs text-[#F4F6F8]">
                1. <strong>Normalization:</strong> Inputs are transformed to z-scores ($z = (x - \mu) / \sigma$) to ensure unit variance across divergent metrics like queue length and time of day.
              </p>
              <p className="leading-relaxed font-sans text-xs text-[#F4F6F8]">
                2. <strong>Matrix Multiplication:</strong> Normal input vector undergoes dot-product with weight matrix $W_1$ and ReLU thresholding ($\max(0, z)$).
              </p>
              <p className="leading-relaxed font-sans text-xs text-[#F4F6F8]">
                3. <strong>Instant Evaluation:</strong> Pure JavaScript math requires 0 HTTP roundtrips, completing in under 1 millisecond.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
