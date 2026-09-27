'use client';

import React from 'react';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-white/10 px-6 py-6 mt-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyanGlow" />
          <span className="font-semibold text-white">MedInsight AI</span>
          <span>— Multimodal Healthcare Report & Medical Media Analysis Assistant</span>
        </div>

        <div className="flex items-center space-x-6 text-[11px]">
          <span>Built with Gemini & Google Cloud</span>
          <span>•</span>
          <span>Vertex AI RAG Engine</span>
          <span>•</span>
          <span>Cloud Healthcare API</span>
        </div>
      </div>
    </footer>
  );
};
