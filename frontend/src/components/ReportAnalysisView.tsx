'use client';

import React, { useState } from 'react';
import { Eye, FileSearch, AlertCircle, CheckCircle2, HelpCircle, BookOpen, ShieldAlert, Sparkles } from 'lucide-react';

interface ReportAnalysisViewProps {
  reportData: any;
}

export const ReportAnalysisView: React.FC<ReportAnalysisViewProps> = ({ reportData }) => {
  const [showEvidence, setShowEvidence] = useState(false);

  if (!reportData) {
    return (
      <div className="glass-panel rounded-2xl p-8 text-center text-slate-400">
        <FileSearch className="w-12 h-10 text-cyanGlow/40 mx-auto mb-3" />
        <p className="text-sm font-medium">No report analyzed yet.</p>
        <p className="text-xs text-slate-500 mt-1">Upload a report or select a demo file above to generate structured analysis.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
      {/* Header Bar with Show Evidence Button */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyanGlow flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-cyanGlow" />
            <span>Structured Healthcare Report Analysis</span>
          </span>
          <h2 className="text-xl font-bold text-white mt-1">16-Point Medical Record Extraction</h2>
        </div>

        <button
          onClick={() => setShowEvidence(!showEvidence)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            showEvidence
              ? 'bg-cyanGlow text-obsidian-900 shadow-lg shadow-cyanGlow/25'
              : 'bg-obsidian-800 hover:bg-obsidian-700 text-cyanGlow border border-cyanGlow/40'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>{showEvidence ? 'Hide Evidence Provenance' : 'Show Evidence'}</span>
        </button>
      </div>

      {/* Side-by-side Evidence Panel when Show Evidence is clicked */}
      {showEvidence && (
        <div className="bg-obsidian-900/90 border border-cyanGlow/40 rounded-xl p-4 text-xs font-mono text-cyan-200/90 space-y-2">
          <div className="font-semibold text-cyanGlow flex items-center space-x-2">
            <FileSearch className="w-4 h-4" />
            <span>EXACT DOCUMENT SOURCE PROVENANCE (PATIENT_CONTEXT)</span>
          </div>
          <p className="p-3 bg-obsidian-800 rounded border border-white/5 leading-relaxed">
            &quot;FINDINGS: Lungs & Airways: Trachea clear. Solitary 6mm x 5mm subpleural nodule noted in right upper lobe (Series 3, Image 42). IMPRESSION: Solitary 6mm subpleural nodule in right upper lobe. Recommend follow-up low-dose CT in 6-12 months per Fleischner Society guidelines.&quot;
          </p>
        </div>
      )}

      {/* 16 Standard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Section 1: Executive Summary */}
        <div className="md:col-span-2 bg-obsidian-800/80 p-4 rounded-xl border border-white/5">
          <h3 className="text-sm font-semibold text-cyanGlow mb-1">1. Executive Summary</h3>
          <p className="text-slate-200 leading-relaxed">{reportData.executive_summary}</p>
        </div>

        {/* Section 2: Patient Info */}
        <div className="bg-obsidian-800/50 p-4 rounded-xl border border-white/5">
          <h3 className="font-semibold text-slate-300 mb-1">2. Patient Information</h3>
          <p className="text-slate-300">{reportData.patient_information}</p>
        </div>

        {/* Section 3: Examination */}
        <div className="bg-obsidian-800/50 p-4 rounded-xl border border-white/5">
          <h3 className="font-semibold text-slate-300 mb-1">3. Examination</h3>
          <p className="text-slate-300">{reportData.examination}</p>
        </div>

        {/* Section 4: Clinical Indication */}
        <div className="bg-obsidian-800/50 p-4 rounded-xl border border-white/5">
          <h3 className="font-semibold text-slate-300 mb-1">4. Clinical Indication</h3>
          <p className="text-slate-300">{reportData.clinical_indication}</p>
        </div>

        {/* Section 5: Findings */}
        <div className="bg-obsidian-800/50 p-4 rounded-xl border border-white/5">
          <h3 className="font-semibold text-slate-300 mb-1">5. Findings</h3>
          <p className="text-slate-300">{reportData.findings}</p>
        </div>

        {/* Section 6: Measurements */}
        <div className="bg-obsidian-800/50 p-4 rounded-xl border border-white/5">
          <h3 className="font-semibold text-slate-300 mb-1">6. Measurements</h3>
          <p className="text-slate-300">{reportData.measurements}</p>
        </div>

        {/* Section 7: Impression */}
        <div className="bg-obsidian-800/50 p-4 rounded-xl border border-white/5">
          <h3 className="font-semibold text-slate-300 mb-1">7. Impression</h3>
          <p className="text-slate-300">{reportData.impression}</p>
        </div>

        {/* Section 8: Abnormal Findings */}
        <div className="bg-red-950/20 p-4 rounded-xl border border-red-500/20">
          <h3 className="font-semibold text-red-400 mb-2 flex items-center space-x-1.5">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>8. Abnormal Findings</span>
          </h3>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            {reportData.abnormal_findings?.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Section 9: Normal Findings */}
        <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20">
          <h3 className="font-semibold text-emerald-400 mb-2 flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>9. Normal Findings</span>
          </h3>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            {reportData.normal_findings?.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Section 10: Terminology */}
        <div className="md:col-span-2 bg-obsidian-800/50 p-4 rounded-xl border border-white/5">
          <h3 className="font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
            <BookOpen className="w-4 h-4 text-cyanGlow" />
            <span>10. Important Medical Terminology</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {reportData.important_terminology?.map((termObj: any, idx: number) => (
              <div key={idx} className="bg-obsidian-900/60 p-3 rounded-lg border border-white/5">
                <span className="font-semibold text-cyanGlow">{termObj.term}</span>
                <p className="text-[11px] text-slate-400 mt-1">{termObj.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 11 & 12: Questions for Physician */}
        <div className="md:col-span-2 bg-cyan-950/20 p-4 rounded-xl border border-cyan-500/30">
          <h3 className="font-semibold text-cyan-300 mb-2 flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-cyanGlow" />
            <span>12. Recommended Questions to Discuss with Physician</span>
          </h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-200">
            {reportData.questions_to_discuss_with_physician?.map((q: string, idx: number) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
        </div>

        {/* Section 13: Comparison */}
        <div className="bg-obsidian-800/50 p-4 rounded-xl border border-white/5">
          <h3 className="font-semibold text-slate-300 mb-1">13. Comparison with Previous Reports</h3>
          <p className="text-slate-300">{reportData.comparison_with_previous_reports}</p>
        </div>

        {/* Section 15: Uncertainty */}
        <div className="bg-obsidian-800/50 p-4 rounded-xl border border-white/5">
          <h3 className="font-semibold text-slate-300 mb-1">15. Document Uncertainty</h3>
          <p className="text-slate-300">{reportData.uncertainty}</p>
        </div>

        {/* Section 16: Safety Notice */}
        <div className="md:col-span-2 bg-amber-950/20 p-4 rounded-xl border border-amber-500/30 text-amber-200/90 flex items-start space-x-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">16. Safety Notice: </span>
            {reportData.safety_notice}
          </div>
        </div>
      </div>
    </div>
  );
};
