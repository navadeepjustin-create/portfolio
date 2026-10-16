import React, { useEffect, useRef, useState } from 'react';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', handleResize);

    // Nodes for interactive neural mesh
    const numNodes = 24;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      isAccent: boolean;
    }> = [];

    const displayWidth = canvas.offsetWidth;
    const displayHeight = canvas.offsetHeight;

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * displayWidth,
        y: Math.random() * displayHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() > 0.8 ? 3.5 : 2,
        isAccent: Math.random() > 0.7,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Draw subtle grid dots
      ctx.fillStyle = 'rgba(17, 17, 17, 0.08)';
      const step = 32;
      for (let x = 16; x < displayWidth; x += step) {
        for (let y = 16; y < displayHeight; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Bounce on borders
        if (n1.x < 10 || n1.x > displayWidth - 10) n1.vx *= -1;
        if (n1.y < 10 || n1.y > displayHeight - 10) n1.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.22;
            ctx.strokeStyle =
              n1.isAccent || n2.isAccent
                ? `rgba(209, 255, 0, ${alpha * 1.5})`
                : `rgba(17, 17, 17, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        if (n.isAccent) {
          ctx.fillStyle = '#D1FF00';
          ctx.shadowColor = '#D1FF00';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = '#111111';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full aspect-[4/3] sm:aspect-[1/1] max-w-[540px] mx-auto bg-[#FFFFFF] border border-[#DADAD3] p-4 sm:p-6 shadow-xl transition-all duration-300"
    >
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E5DE] font-mono text-[11px] text-[#777777]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#D1FF00] border border-[#111111] animate-lime-pulse" />
          <span className="text-[#111111] font-semibold">AIML.SYS // NODE 01</span>
        </div>
        <span>HYDERABAD [17.54°N, 78.43°E]</span>
      </div>

      {/* Main Interactive Canvas */}
      <div className="relative w-full h-[calc(100%-80px)] mt-3 overflow-hidden bg-[#FBFBFA] border border-[#EEEEEC] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Central Monogram Brand Badge */}
        <div
          className="relative z-10 bg-[#111111] text-[#F5F5F0] border-2 border-[#111111] p-6 sm:p-8 shadow-2xl flex flex-col items-center justify-center select-none transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${(mousePos.x - 0.5) * 16}px, ${(mousePos.y - 0.5) * 16}px)`,
          }}
        >
          {/* Fine Corner Accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#D1FF00]" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#D1FF00]" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#D1FF00]" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#D1FF00]" />

          <div className="text-center">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D1FF00] block mb-1">
              ENGINEERING IDENTITY
            </span>
            <div className="flex items-center justify-center gap-1 my-1">
              <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F5F0]">
                ND
              </span>
              <span className="w-2.5 h-2.5 bg-[#D1FF00] self-end mb-2" />
            </div>
            <p className="font-mono text-[10px] text-[#888888] tracking-widest uppercase mt-1">
              NAVADEEP // MLRIT
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#262626] w-full flex items-center justify-between text-[10px] font-mono text-[#777777]">
            <span className="flex items-center gap-1 text-[#D1FF00]">
              <Zap className="w-3 h-3" /> ACTIVE
            </span>
            <span>AIML · 2026</span>
          </div>
        </div>
      </div>

      {/* Bottom status line */}
      <div className="flex items-center justify-between pt-3 border-t border-[#E5E5DE] font-mono text-[11px] text-[#777777] mt-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#111111]">
            <Cpu className="w-3.5 h-3.5 text-[#D1FF00] bg-[#111111] p-0.5" /> NEURAL MESH
          </span>
          <span className="hidden sm:inline-block">·</span>
          <span className="hidden sm:flex items-center gap-1 text-[#555555]">
            <ShieldCheck className="w-3.5 h-3.5" /> REVERIFIED METRICS
          </span>
        </div>
        <span className="text-[#111111] font-semibold">STANDALONE ARCH</span>
      </div>
    </div>
  );
};
