'use client';

import React from 'react';
import { GitCompare, ArrowRight, Check, AlertCircle, HelpCircle } from 'lucide-react';

export const CompareReportsView: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyanGlow flex items-center space-x-1.5">
            <GitCompare className="w-4 h-4 text-cyanGlow" />
            <span>Multi-Report Temporal Analysis</span>
          </span>
          <h2 className="text-xl font-bold text-white mt-1">Report A vs Report B Longitudinal Comparison</h2>
        </div>

        <span className="text-xs font-mono bg-obsidian-800 border border-cyanGlow/30 px-3 py-1.5 rounded-lg text-cyanGlow">
          Compare Mode: ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Report A */}
        <div className="bg-obsidian-900/60 p-5 rounded-xl border border-white/10">
          <div className="text-xs font-mono text-slate-400 mb-1">REPORT A (PREVIOUS)</div>
          <h3 className="text-sm font-bold text-white mb-2">Chest X-Ray (2025-05-10)</h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-obsidian-800/60 p-3 rounded-lg border border-white/5">
            &quot;Lungs are clear. No focal consolidation, pleural effusion, or pneumothorax. Heart size is normal.&quot;
          </p>
        </div>

        {/* Report B */}
        <div className="bg-obsidian-900/60 p-5 rounded-xl border border-cyanGlow/30">
          <div className="text-xs font-mono text-cyanGlow mb-1">REPORT B (CURRENT)</div>
          <h3 className="text-sm font-bold text-white mb-2">CT Chest W Contrast (2026-08-14)</h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-obsidian-800/60 p-3 rounded-lg border border-cyanGlow/20">
            &quot;Solitary 6mm x 5mm subpleural nodule in right upper lobe. No lymphadenopathy or effusion.&quot;
          </p>
        </div>
      </div>

      {/* Changes Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-cyan-950/20 p-4 rounded-xl border border-cyan-500/20">
          <h4 className="font-semibold text-cyan-300 mb-2 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4 text-cyanGlow" />
            <span>Newly Mentioned Findings</span>
          </h4>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Solitary 6mm subpleural nodule in right upper lobe</li>
            <li>High-resolution CT modality detail</li>
          </ul>
        </div>

        <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20">
          <h4 className="font-semibold text-emerald-300 mb-2 flex items-center space-x-1">
            <Check className="w-4 h-4 text-emeraldGlow" />
            <span>Unchanged Findings</span>
          </h4>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Normal heart size & pericardium</li>
            <li>No pleural effusion or pneumothorax</li>
            <li>No mediastinal lymphadenopathy</li>
          </ul>
        </div>

        <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-500/20">
          <h4 className="font-semibold text-amber-300 mb-2 flex items-center space-x-1">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Measurement Shifts</span>
          </h4>
          <p className="text-slate-300">
            Nodule noted at 6.0 mm x 5.0 mm. (First detection on CT; prior X-Ray was below spatial resolution limit).
          </p>
        </div>
      </div>

      <div className="bg-obsidian-900 p-4 rounded-xl border border-white/5 text-xs text-slate-400">
        <span className="font-semibold text-slate-200">NON-DIAGNOSTIC NOTICE: </span>
        Changes noted reflect differences documented in the written medical reports. Clinical significance must be determined by a qualified radiologist or treating physician.
      </div>
    </div>
  );
};
