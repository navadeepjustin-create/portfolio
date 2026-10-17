import React, { useState } from 'react';
import { Wifi, Battery, Signal, Terminal } from 'lucide-react';

interface PhoneFrameProps {
  projectId: string;
  fallbackMockup?: React.ReactNode;
  className?: string;
  activeStepTitle?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  projectId,
  fallbackMockup,
  className = '',
  activeStepTitle,
}) => {
  const [videoError, setVideoError] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);

  return (
    <div
      className={`relative mx-auto w-full max-w-[390px] bg-[#0D1117] border-2 border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-2 rounded-none transition-all duration-300 touch-pan-y ${className}`}
    >
      {/* Corner crosshair accents for cyber aesthetic */}
      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#C6FF00] z-20 pointer-events-none" />
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#C6FF00] z-20 pointer-events-none" />
      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#C6FF00] z-20 pointer-events-none" />
      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#C6FF00] z-20 pointer-events-none" />

      {/* Screen Enclosure */}
      <div className="relative bg-[#080A0D] border border-white/10 overflow-hidden flex flex-col min-h-[580px] max-h-[720px]">
        {/* Device Status Bar */}
        <div className="h-7 bg-[#11151A] px-4 flex items-center justify-between text-[11px] font-mono text-[#929BA6] border-b border-white/5 select-none shrink-0 z-10">
          <span className="font-semibold text-[#F4F6F8]">09:41</span>
          
          {/* Subtle Dynamic Notch / Island */}
          <div className="w-16 h-3 bg-[#080A0D] border border-white/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1F2937] mr-2" />
            <div className="w-1 h-1 rounded-full bg-[#C6FF00] animate-pulse" />
          </div>

          <div className="flex items-center gap-1.5 text-[#F4F6F8]">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3 text-[#C6FF00]" />
          </div>
        </div>

        {/* Telemetry banner if step is active */}
        {activeStepTitle && (
          <div className="px-3 py-1 bg-[#171D24] border-b border-white/10 flex items-center justify-between text-[10px] font-mono shrink-0">
            <span className="text-[#929BA6] uppercase truncate">STAGE // {activeStepTitle}</span>
            <span className="text-[#C6FF00] animate-pulse">LIVE</span>
          </div>
        )}

        {/* Device Screen Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative touch-pan-y overscroll-contain">
          {hasVideo && !videoError ? (
            <video
              src={`/projects/${projectId}.webm`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onError={() => {
                // If .webm is not present in /public/projects/, fallback to interactive mockup
                setVideoError(true);
                setHasVideo(false);
              }}
            >
              {/* Fallback to mp4 */}
              <source src={`/projects/${projectId}.mp4`} type="video/mp4" />
            </video>
          ) : (
            <div className="h-full flex flex-col justify-between">
              {fallbackMockup ? (
                <div className="p-1">
                  {fallbackMockup}
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center p-6 text-center text-[#929BA6]">
                  <Terminal className="w-8 h-8 text-[#C6FF00] mb-2" />
                  <p className="font-mono text-xs uppercase text-[#F4F6F8]">PROTOTYPE SIMULATOR</p>
                  <p className="font-mono text-[10px] mt-1">Interactive mode enabled</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Device Bottom Home Bar */}
        <div className="h-6 bg-[#11151A] border-t border-white/5 flex items-center justify-between px-3 shrink-0">
          <span className="font-mono text-[9px] text-[#929BA6] uppercase">
            {videoError ? 'SIMULATOR ACTIVE' : 'STREAM: 60FPS'}
          </span>
          <div className="w-24 h-1 bg-white/20 rounded-none" />
          <span className="font-mono text-[9px] text-[#C6FF00]">
            ID: {projectId.slice(0, 8)}
          </span>
        </div>
      </div>

      {/* TODO Notice for missing video file (visible developer hint, accessible) */}
      {videoError && (
        <div className="mt-2 text-center">
          <span className="font-mono text-[10px] text-[#929BA6] block">
            {/* TODO FOR NAVADEEP: Add screen recording video at public/projects/{projectId}.webm */}
            [PROTOTYPE SIMULATOR ACTIVE · VIDEO SLOT: /projects/{projectId}.webm]
          </span>
        </div>
      )}
    </div>
  );
};
