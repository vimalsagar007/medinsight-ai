'use client';

import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export const MedicalDisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-obsidian-800 border-y border-amber-500/20 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-start space-x-3 text-xs text-amber-200/90">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-300">IMPORTANT MEDICAL SAFETY DISCLAIMER: </span>
          MedInsight AI provides document summarization, medical terminology explanations, metadata extraction, and educational guidance. 
          It does <strong className="text-white underline underline-offset-2">NOT</strong> independently diagnose medical images (CT scans, X-rays, MRIs, Ultrasound) or formulate clinical treatment plans. 
          All healthcare decisions and medical image evaluations require consultation with a qualified physician.
        </div>
      </div>
    </div>
  );
};
