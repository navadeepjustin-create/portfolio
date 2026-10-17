import React from 'react';

interface ArchitectureDiagramProps {
  projectId: string;
  className?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ projectId, className = '' }) => {
  if (projectId === 'statio-mlr') {
    return (
      <div className={`p-6 bg-[#080A0D] border border-white/10 relative overflow-hidden ${className}`}>
        {/* Header Telemetry */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono mb-6">
          <span className="flex items-center gap-2 text-[#C6FF00]">
            <span className="w-2 h-2 bg-[#C6FF00] animate-pulse" />
            <span>SYSTEM TOPOLOGY // STATIO-MLR ARCHITECTURE</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="sm:hidden text-[#C6FF00] text-[10px] font-mono px-1.5 py-0.5 bg-[#171D24] border border-[#C6FF00]/30 animate-pulse">
              ← SWIPE NODES →
            </span>
            <span className="hidden sm:inline text-[#929BA6] text-[10px]">DECOUPLED VERIFICATION PROTOCOL</span>
          </div>
        </div>

        {/* Vector SVG Diagram */}
        <div
          className="overflow-x-auto py-2 touch-pan-x touch-pan-y overscroll-x-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <svg
            viewBox="0 0 800 360"
            role="region"
            aria-label="Statio-MLR System Architecture Diagram (swipe to view all 5 nodes)"
            tabIndex={0}
            className="w-full min-w-[700px] h-auto font-mono text-[11px] select-none focus:outline-none"
          >
            <defs>
              <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C6FF00" stopOpacity="0.2" />
              </linearGradient>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#C6FF00" />
              </marker>
            </defs>

            {/* Grid background lines */}
            <pattern id="diagGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#diagGrid)" />

            {/* Connecting Flow Lines */}
            <path
              d="M 180 90 L 260 90"
              stroke="#C6FF00"
              strokeWidth="2"
              markerEnd="url(#arrow)"
              strokeDasharray="4 2"
            />
            <path
              d="M 440 90 L 520 90"
              stroke="#C6FF00"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 350 140 L 350 210"
              stroke="#C6FF00"
              strokeWidth="2"
              markerEnd="url(#arrow)"
              strokeDasharray="4 2"
            />
            <path
              d="M 610 140 L 610 210"
              stroke="#C6FF00"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 440 260 L 520 260"
              stroke="#C6FF00"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />

            {/* NODE 1: Student Client */}
            <g transform="translate(20, 40)">
              <rect width="160" height="100" fill="#11151A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="0" y="0" width="160" height="20" fill="#171D24" />
              <text x="10" y="14" fill="#929BA6" fontSize="9" fontWeight="bold">CLIENT TIER</text>
              <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">STUDENT SPA</text>
              <text x="10" y="65" fill="#929BA6" fontSize="10">React 19 / TypeScript</text>
              <text x="10" y="82" fill="#C6FF00" fontSize="9">Document Ingestion</text>
            </g>

            {/* NODE 2: Calculation & Validation Engine */}
            <g transform="translate(260, 40)">
              <rect width="180" height="100" fill="#11151A" stroke="#C6FF00" strokeWidth="1.5" />
              <rect x="0" y="0" width="180" height="20" fill="#171D24" />
              <text x="10" y="14" fill="#C6FF00" fontSize="9" fontWeight="bold">CLIENT ENGINE</text>
              <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">PRICE & SPEC ENGINE</text>
              <text x="10" y="65" fill="#929BA6" fontSize="10">Duplex / Color Matrix</text>
              <text x="10" y="82" fill="#C6FF00" fontSize="9">Slot Allocator (15m)</text>
            </g>

            {/* NODE 3: Decoupled QR Token Generator */}
            <g transform="translate(520, 40)">
              <rect width="180" height="100" fill="#11151A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="0" y="0" width="180" height="20" fill="#171D24" />
              <text x="10" y="14" fill="#929BA6" fontSize="9" fontWeight="bold">VERIFICATION TIER</text>
              <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">QR TOKEN CRYPTO</text>
              <text x="10" y="65" fill="#929BA6" fontSize="10">Decoupled from Payment</text>
              <text x="10" y="82" fill="#C6FF00" fontSize="9">ID: #ST-TOKEN-HASH</text>
            </g>

            {/* NODE 4: Offline-Resilient Local Cache */}
            <g transform="translate(260, 210)">
              <rect width="180" height="100" fill="#11151A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="0" y="0" width="180" height="20" fill="#171D24" />
              <text x="10" y="14" fill="#929BA6" fontSize="9" fontWeight="bold">STORAGE / CACHE</text>
              <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">TOKEN STORE</text>
              <text x="10" y="65" fill="#929BA6" fontSize="10">IndexedDB / LocalStorage</text>
              <text x="10" y="82" fill="#929BA6" fontSize="9">Offline Basement Ready</text>
            </g>

            {/* NODE 5: Counter Operator Terminal */}
            <g transform="translate(520, 210)">
              <rect width="180" height="100" fill="#11151A" stroke="#C6FF00" strokeWidth="1.5" />
              <rect x="0" y="0" width="180" height="20" fill="#171D24" />
              <text x="10" y="14" fill="#C6FF00" fontSize="9" fontWeight="bold">COUNTER TIER</text>
              <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">OPERATOR SCANNER</text>
              <text x="10" y="65" fill="#929BA6" fontSize="10">1-Scan Token Lookup</text>
              <text x="10" y="82" fill="#C6FF00" fontSize="9">&lt; 3s Physical Handoff</text>
            </g>
          </svg>
        </div>

        {/* Legend */}
        <div className="pt-4 mt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#929BA6]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#C6FF00]" />
              <span>Direct Verification Pipeline</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t border-dashed border-[#C6FF00]" />
              <span>Asynchronous Token Cache</span>
            </span>
          </div>
          <span className="text-[#C6FF00] uppercase">STRICT SPECIFICATION: ZERO GATEWAY BLOCKING</span>
        </div>
      </div>
    );
  }

  if (projectId === 'fast-bite') {
    return (
      <div className={`p-6 bg-[#080A0D] border border-white/10 relative overflow-hidden ${className}`}>
        {/* Header Telemetry */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono mb-6">
          <span className="flex items-center gap-2 text-[#C6FF00]">
            <span className="w-2 h-2 bg-[#C6FF00] animate-pulse" />
            <span>SYSTEM TOPOLOGY // FAST BITE CANTEEN DISPATCH</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="sm:hidden text-[#C6FF00] text-[10px] font-mono px-1.5 py-0.5 bg-[#171D24] border border-[#C6FF00]/30 animate-pulse">
              ← SWIPE NODES →
            </span>
            <span className="hidden sm:inline text-[#929BA6] text-[10px]">TIME-WINDOW BATCH SCHEDULER</span>
          </div>
        </div>

        {/* Vector SVG Diagram */}
        <div
          className="overflow-x-auto py-2 touch-pan-x touch-pan-y overscroll-x-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <svg
            viewBox="0 0 800 360"
            role="region"
            aria-label="Fast Bite Architecture Diagram (swipe to view all 5 nodes)"
            tabIndex={0}
            className="w-full min-w-[700px] h-auto font-mono text-[11px] select-none focus:outline-none"
          >
            <defs>
              <marker
                id="arrow-fast"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#C6FF00" />
              </marker>
            </defs>

            <pattern id="diagGrid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#diagGrid2)" />

            {/* Connecting lines */}
            <path d="M 180 90 L 260 90" stroke="#C6FF00" strokeWidth="2" markerEnd="url(#arrow-fast)" />
            <path d="M 440 90 L 520 90" stroke="#C6FF00" strokeWidth="2" markerEnd="url(#arrow-fast)" />
            <path d="M 350 140 L 350 210" stroke="#C6FF00" strokeWidth="2" markerEnd="url(#arrow-fast)" strokeDasharray="4 2" />
            <path d="M 440 260 L 520 260" stroke="#C6FF00" strokeWidth="2" markerEnd="url(#arrow-fast)" />

            {/* NODE 1: Mobile Client */}
            <g transform="translate(20, 40)">
              <rect width="160" height="100" fill="#11151A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="0" y="0" width="160" height="20" fill="#171D24" />
              <text x="10" y="14" fill="#929BA6" fontSize="9" fontWeight="bold">STUDENT MOBILE</text>
              <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">ORDER SELECTION</text>
              <text x="10" y="65" fill="#929BA6" fontSize="10">Menu Customization</text>
              <text x="10" y="82" fill="#C6FF00" fontSize="9">Pickup Slot Picker</text>
            </g>

            {/* NODE 2: Batch Scheduling Engine */}
            <g transform="translate(260, 40)">
              <rect width="180" height="100" fill="#11151A" stroke="#C6FF00" strokeWidth="1.5" />
              <rect x="0" y="0" width="180" height="20" fill="#171D24" />
              <text x="10" y="14" fill="#C6FF00" fontSize="9" fontWeight="bold">CORE LOGIC</text>
              <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">TIME-WINDOW SLOTS</text>
              <text x="10" y="65" fill="#929BA6" fontSize="10">Break Hour Sync</text>
              <text x="10" y="82" fill="#C6FF00" fontSize="9">Kitchen Load Balancer</text>
            </g>

            {/* NODE 3: Kitchen Display System (KDS) */}
            <g transform="translate(520, 40)">
              <rect width="180" height="100" fill="#11151A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="0" y="0" width="180" height="20" fill="#171D24" />
              <text x="10" y="14" fill="#929BA6" fontSize="9" fontWeight="bold">KITCHEN TIER</text>
              <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">PREP QUEUE (KDS)</text>
              <text x="10" y="65" fill="#929BA6" fontSize="10">Placed → Prep → Ready</text>
              <text x="10" y="82" fill="#C6FF00" fontSize="9">Batch Assembly</text>
            </g>

            {/* NODE 4: Rewards & Token Engine */}
            <g transform="translate(260, 210)">
              <rect width="180" height="100" fill="#11151A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="0" y="0" width="180" height="20" fill="#171D24" />
              <text x="10" y="14" fill="#929BA6" fontSize="9" fontWeight="bold">LOYALTY ENGINE</text>
              <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">REWARD CREDITS</text>
              <text x="10" y="65" fill="#929BA6" fontSize="10">Student Meal Points</text>
              <text x="10" y="82" fill="#929BA6" fontSize="9">Dynamic Token Code</text>
            </g>

            {/* NODE 5: Counter Pickup Scanner */}
            <g transform="translate(520, 210)">
              <rect width="180" height="100" fill="#11151A" stroke="#C6FF00" strokeWidth="1.5" />
              <rect x="0" y="0" width="180" height="20" fill="#171D24" />
              <text x="10" y="14" fill="#C6FF00" fontSize="9" fontWeight="bold">COUNTER TIER</text>
              <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">QR PICKUP VERIFIER</text>
              <text x="10" y="65" fill="#929BA6" fontSize="10">Instant Order Token Check</text>
              <text x="10" y="82" fill="#C6FF00" fontSize="9">Zero-Wait Counter Exit</text>
            </g>
          </svg>
        </div>

        <div className="pt-4 mt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#929BA6]">
          <span>SURGE LOAD MITIGATION: PRE-SORTED KITCHEN BATCHES</span>
          <span className="text-[#C6FF00] uppercase">STATUS: ARCHITECTURE PROTOTYPE</span>
        </div>
      </div>
    );
  }

  // Portfolio Website Architecture
  return (
    <div className={`p-6 bg-[#080A0D] border border-white/10 relative overflow-hidden ${className}`}>
      <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono mb-6">
        <span className="flex items-center gap-2 text-[#C6FF00]">
          <span className="w-2 h-2 bg-[#C6FF00] animate-pulse" />
          <span>SYSTEM TOPOLOGY // CREATIVE PORTFOLIO ENGINE</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="sm:hidden text-[#C6FF00] text-[10px] font-mono px-1.5 py-0.5 bg-[#171D24] border border-[#C6FF00]/30 animate-pulse">
            ← SWIPE NODES →
          </span>
          <span className="hidden sm:inline text-[#929BA6] text-[10px]">VITE 8 + REACT 19 + MOTION + LENIS</span>
        </div>
      </div>

      <div
        className="overflow-x-auto py-2 touch-pan-x touch-pan-y overscroll-x-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <svg
          viewBox="0 0 800 240"
          role="region"
          aria-label="Portfolio Architecture Diagram (swipe to view all nodes)"
          tabIndex={0}
          className="w-full min-w-[700px] h-auto font-mono text-[11px] select-none focus:outline-none"
        >
          <defs>
            <marker id="arrow-pf" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#C6FF00" />
            </marker>
          </defs>

          <path d="M 180 80 L 260 80" stroke="#C6FF00" strokeWidth="2" markerEnd="url(#arrow-pf)" />
          <path d="M 440 80 L 520 80" stroke="#C6FF00" strokeWidth="2" markerEnd="url(#arrow-pf)" />

          <g transform="translate(20, 30)">
            <rect width="160" height="100" fill="#11151A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <rect x="0" y="0" width="160" height="20" fill="#171D24" />
            <text x="10" y="14" fill="#929BA6" fontSize="9" fontWeight="bold">INPUT & STATE</text>
            <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">HARDWARE INPUTS</text>
            <text x="10" y="65" fill="#929BA6" fontSize="10">Cursor, Pointer, Touch</text>
            <text x="10" y="82" fill="#C6FF00" fontSize="9">prefers-reduced-motion</text>
          </g>

          <g transform="translate(260, 30)">
            <rect width="180" height="100" fill="#11151A" stroke="#C6FF00" strokeWidth="1.5" />
            <rect x="0" y="0" width="180" height="20" fill="#171D24" />
            <text x="10" y="14" fill="#C6FF00" fontSize="9" fontWeight="bold">RENDER ENGINE</text>
            <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">REACT 19 + MOTION</text>
            <text x="10" y="65" fill="#929BA6" fontSize="10">Lenis Smooth Scroll</text>
            <text x="10" y="82" fill="#C6FF00" fontSize="9">OGL WebGL Shader</text>
          </g>

          <g transform="translate(520, 30)">
            <rect width="180" height="100" fill="#11151A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <rect x="0" y="0" width="180" height="20" fill="#171D24" />
            <text x="10" y="14" fill="#929BA6" fontSize="9" fontWeight="bold">OUTPUT</text>
            <text x="10" y="45" fill="#F4F6F8" fontSize="12" fontWeight="bold">60FPS CANVASES</text>
            <text x="10" y="65" fill="#929BA6" fontSize="10">WCAG AA Contrast</text>
            <text x="10" y="82" fill="#C6FF00" fontSize="9">Static Fallbacks</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
