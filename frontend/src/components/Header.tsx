'use client';

import React from 'react';
import { Activity, ShieldCheck, Database, FileText, Cpu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-cyanGlow/20 to-tealGlow/10 border border-cyanGlow/30 shadow-lg shadow-cyanGlow/10">
            <Activity className="w-6 h-6 text-cyanGlow animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyanGlow tracking-tight">
              MedInsight AI
            </h1>
            <p className="text-xs text-slate-400">Multimodal Healthcare Report Analysis Assistant</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-xs text-slate-300">
          <div className="flex items-center space-x-2 bg-obsidian-800 px-3 py-1.5 rounded-full border border-white/5">
            <Cpu className="w-3.5 h-3.5 text-cyanGlow" />
            <span>Gemini Agent Runtime</span>
          </div>
          <div className="flex items-center space-x-2 bg-obsidian-800 px-3 py-1.5 rounded-full border border-white/5">
            <Database className="w-3.5 h-3.5 text-emeraldGlow" />
            <span>Vertex AI RAG Engine</span>
          </div>
          <div className="flex items-center space-x-2 bg-obsidian-800 px-3 py-1.5 rounded-full border border-emeraldGlow/20 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emeraldGlow" />
            <span>HIPAA-Ready Architecture</span>
          </div>
        </div>
      </div>
    </header>
  );
};
