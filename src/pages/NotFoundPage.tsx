import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, FolderGit2, ArrowRight } from 'lucide-react';
import { CustomCursor } from '../components/CustomCursor';

export const NotFoundPage: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [outputLines, setOutputLines] = useState<string[]>([
    'NAVADEEP OS [Version 8.3.4 - Production Kernel]',
    '(c) 2026 Navadeep Justin. All rights reserved.',
    '',
    '[FATAL]: HTTP 404 - Memory address unresolved in route catalog.',
    'System fault: Attempted lookup at non-existent route location.',
    '',
    'Type "help" or select a verified destination below:',
  ]);
  const navigate = useNavigate();

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'cd /' || cmd === 'home') {
      navigate('/');
    } else if (cmd === 'cd /projects' || cmd === 'projects') {
      navigate('/projects');
    } else if (cmd === 'cd /resume' || cmd === 'resume') {
      navigate('/resume');
    } else if (cmd === 'cd /about' || cmd === 'about') {
      navigate('/about');
    } else if (cmd === 'cd /lab' || cmd === 'lab') {
      navigate('/lab');
    } else if (cmd === 'clear') {
      setOutputLines([]);
    } else if (cmd === 'help') {
      setOutputLines((prev) => [
        ...prev,
        `guest@navadeep:~$ ${cmd}`,
        'Available commands:',
        '  cd /          - Return to portfolio overview',
        '  cd /projects  - Explore campus case studies',
        '  cd /about     - View engineering background',
        '  cd /resume    - View ATS resume spec',
        '  cd /lab       - Launch in-browser ML lab',
        '  clear         - Clear terminal log buffer',
      ]);
    } else {
      setOutputLines((prev) => [
        ...prev,
        `guest@navadeep:~$ ${cmd}`,
        `bash: command not found: "${cmd}". Type "help" for valid destinations.`,
      ]);
    }
    setInputVal('');
  };

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] selection:bg-[#C6FF00] selection:text-[#080A0D] bg-grid-cyber flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden font-mono">
      <CustomCursor />

      {/* Top Header */}
      <div className="flex items-center justify-between text-xs text-[#929BA6] border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FF5555] animate-pulse" />
          <span className="text-[#F4F6F8] font-bold">TERMINAL // ROUTE FAULT (404)</span>
        </div>
        <span>TTY-01 · 17.54°N, 78.43°E</span>
      </div>

      {/* Main Terminal Window Frame */}
      <main className="max-w-3xl w-full mx-auto my-auto p-4 sm:p-6 bg-[#0D1117] border border-white/15 shadow-2xl space-y-4">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#FF5555] rounded-full inline-block" />
            <span className="w-3 h-3 bg-[#FFB800] rounded-full inline-block" />
            <span className="w-3 h-3 bg-[#00E5FF] rounded-full inline-block" />
            <span className="text-[#929BA6] ml-2 text-[11px]">guest@navadeep: ~/404-unresolved</span>
          </div>
          <span className="text-[10px] text-[#C6FF00] uppercase">STATUS: 404 FAULT</span>
        </div>

        {/* Terminal Text Buffer */}
        <div className="space-y-1.5 text-xs text-[#929BA6] min-h-[180px] max-h-[300px] overflow-y-auto font-mono leading-relaxed">
          {outputLines.map((line, idx) => (
            <div
              key={idx}
              className={line.includes('[FATAL]') ? 'text-[#FF5555] font-bold' : line.startsWith('guest@') ? 'text-[#C6FF00]' : ''}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Interactive Command Prompt Form */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-3 border-t border-white/10 text-xs">
          <span className="text-[#C6FF00] font-bold">guest@navadeep:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'cd /' or 'help'..."
            className="flex-1 bg-transparent text-[#F4F6F8] outline-none font-mono text-xs focus:ring-0 placeholder:text-white/20"
            autoFocus
          />
          <button
            type="submit"
            className="px-2.5 py-1 bg-[#171D24] text-[#C6FF00] border border-white/10 hover:border-[#C6FF00] text-[11px] uppercase"
          >
            EXEC
          </button>
        </form>

        {/* Quick Clickable Shortcuts */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs">
          <Link
            to="/"
            className="px-3 py-1.5 bg-[#C6FF00] text-[#080A0D] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#b2e600] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>cd / (Home)</span>
          </Link>
          <Link
            to="/projects"
            className="px-3 py-1.5 bg-[#171D24] text-[#F4F6F8] hover:text-[#C6FF00] border border-white/10 flex items-center gap-1.5 uppercase transition-colors"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#C6FF00]" />
            <span>cd /projects</span>
          </Link>
          <Link
            to="/resume"
            className="px-3 py-1.5 bg-[#171D24] text-[#F4F6F8] hover:text-[#C6FF00] border border-white/10 flex items-center gap-1.5 uppercase transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5 text-[#C6FF00]" />
            <span>cd /resume</span>
          </Link>
        </div>
      </main>

      {/* Footer Status */}
      <div className="flex items-center justify-between text-[11px] text-[#929BA6] border-t border-white/10 pt-4">
        <span>AIML ENGINEERING · MLRIT HYDERABAD</span>
        <span className="text-[#C6FF00]">RECOVERY BUFFER OPERATIONAL</span>
      </div>
    </div>
  );
};
