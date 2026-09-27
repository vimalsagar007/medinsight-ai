'use client';

import React from 'react';
import { Database, ExternalLink, ShieldCheck } from 'lucide-react';

export const EvidenceDrawer: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
          <Database className="w-4 h-4 text-emeraldGlow" />
          <span>Evidence & Grounded Citations</span>
        </h3>
        <span className="text-[10px] font-mono text-cyanGlow bg-cyanGlow/10 px-2 py-0.5 rounded border border-cyanGlow/20">
          3 Partitioned RAG Namespaces
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {/* Patient Context */}
        <div className="bg-obsidian-900/60 p-3 rounded-xl border border-cyanGlow/30">
          <div className="flex items-center justify-between font-mono text-[11px] text-cyanGlow mb-1">
            <span>[PATIENT_CONTEXT]</span>
            <span className="text-slate-400">Similarity: 0.96</span>
          </div>
          <p className="text-slate-300 italic">
            &quot;Solitary 6mm x 5mm subpleural nodule in right upper lobe CT chest scan (Series 3, Image 42).&quot;
          </p>
        </div>

        {/* Medical Knowledge */}
        <div className="bg-obsidian-900/60 p-3 rounded-xl border border-emeraldGlow/30">
          <div className="flex items-center justify-between font-mono text-[11px] text-emeraldGlow mb-1">
            <span>[MEDICAL_KNOWLEDGE]</span>
            <span className="text-slate-400">Fleischner Guidelines</span>
          </div>
          <p className="text-slate-300">
            Solid nodule &lt; 6mm in low-risk patient: optional CT at 12 months. In high-risk / 6mm solid: low-dose CT follow-up at 6-12 months.
          </p>
        </div>

        {/* Public Web Literature */}
        <div className="bg-obsidian-900/60 p-3 rounded-xl border border-purple-500/30">
          <div className="flex items-center justify-between font-mono text-[11px] text-purple-400 mb-1">
            <span>[PUBLIC_WEB_KNOWLEDGE]</span>
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/28240563/"
              target="_blank"
              rel="noreferrer"
              className="text-cyanGlow underline flex items-center space-x-1"
            >
              <span>PubMed PMID 28240563</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <p className="text-slate-300">
            Guidelines for Management of Incidental Pulmonary Nodules Detected on CT Images (RSNA 2017).
          </p>
        </div>
      </div>
    </div>
  );
};
