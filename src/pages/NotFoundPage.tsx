import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, FolderGit2 } from 'lucide-react';
import { CustomCursor } from '../components/CustomCursor';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] selection:bg-[#C6FF00] selection:text-[#080A0D] bg-grid-cyber flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      <CustomCursor />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C6FF00]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between font-mono text-xs text-[#929BA6] relative z-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FF5555] animate-pulse" />
          <span className="text-[#F4F6F8] font-bold">NAVADEEP.SYS // ERROR ROUTING</span>
        </div>
        <span>CODE 404 // ROUTE_NOT_FOUND</span>
      </div>

      {/* Center Hero */}
      <div className="max-w-2xl mx-auto my-auto text-center space-y-6 relative z-10 py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11151A] text-[#FF5555] border border-[#FF5555]/30 font-mono text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-[#FF5555]" />
          <span>ADDRESS SPACE UNMAPPED</span>
        </div>

        <h1 className="font-display text-6xl sm:text-8xl font-black uppercase tracking-tight text-[#F4F6F8]">
          404 <span className="text-[#C6FF00]">NULL</span>
        </h1>

        <p className="font-mono text-xs sm:text-sm text-[#929BA6] max-w-md mx-auto leading-relaxed">
          The requested route does not exist within the active system architecture.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <Link
            to="/"
            data-cursor-label="HOME"
            className="px-6 py-3.5 bg-[#C6FF00] text-[#080A0D] hover:bg-[#b2e600] font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(198,255,0,0.25)]"
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO BASE</span>
          </Link>

          <Link
            to="/projects"
            data-cursor-label="PROJECTS"
            className="px-6 py-3.5 bg-[#11151A] hover:bg-[#171D24] text-[#F4F6F8] font-bold uppercase tracking-widest transition-all border border-white/15 flex items-center gap-2"
          >
            <FolderGit2 className="w-4 h-4 text-[#C6FF00]" />
            <span>PROJECTS INDEX</span>
          </Link>
        </div>
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between font-mono text-[11px] text-[#929BA6] relative z-10 border-t border-white/10 pt-4">
        <span>AIML ENGINEERING // MLRIT HYDERABAD</span>
        <span>STATUS: RESILIENT FALLBACK ACTIVE</span>
      </div>
    </div>
  );
};
