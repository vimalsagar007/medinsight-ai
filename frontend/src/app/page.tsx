'use client';

import React, { useState } from 'react';
import { Sparkles, FileText, GitCompare, MessageSquare, Database, Activity, Disc, Video, FileSearch } from 'lucide-react';
import { UploadDropzone } from '@/components/UploadDropzone';
import { ReportAnalysisView } from '@/components/ReportAnalysisView';
import { CompareReportsView } from '@/components/CompareReportsView';
import { ChatStream } from '@/components/ChatStream';
import { EvidenceDrawer } from '@/components/EvidenceDrawer';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'analysis' | 'compare' | 'chat' | 'evidence'>('analysis');
  const [activeReportData, setActiveReportData] = useState<any>({
    executive_summary: "The chest CT scan shows a small solitary 6mm subpleural nodule in the right upper lobe. Follow-up low-dose CT in 6-12 months is recommended by the radiologist per Fleischner guidelines.",
    patient_information: "Patient ID: DEMO-PT-88391 | Age: 54 | Sex: Female",
    examination: "CT Chest with Contrast",
    clinical_indication: "54-year-old patient with persistent cough and mild dyspnea for 3 weeks.",
    findings: "Trachea and mainstem bronchi clear. Solitary 6mm x 5mm subpleural nodule in right upper lobe (Series 3, Image 42). No consolidation, pneumothorax, or pleural effusion.",
    measurements: "Right Upper Lobe Nodule: 6.0 mm x 5.0 mm; Subcarinal Lymph Node: 7.0 mm",
    impression: "1. Solitary 6 mm subpleural nodule in right upper lobe; recommend follow-up low-dose CT in 6-12 months. 2. No acute pulmonary infiltrate or effusion.",
    abnormal_findings: ["Solitary 6mm x 5mm subpleural nodule in right upper lobe"],
    normal_findings: ["Clear mainstem bronchi", "Normal heart size", "No pleural effusion", "No acute osseous abnormality"],
    important_terminology: [
      { term: "Subpleural Nodule", explanation: "A small round growth located just beneath the outer lining of the lung tissue." },
      { term: "Fleischner Guidelines", explanation: "Standardized clinical guidelines for managing lung nodules on CT scans." }
    ],
    questions_to_discuss_with_physician: [
      "What specific symptoms should I watch for before my recommended 6 to 12 month follow-up CT scan?",
      "Should I schedule a pulmonary function test (PFT) in addition to the follow-up scan?"
    ],
    comparison_with_previous_reports: "First detection on CT scan. Prior X-Ray (2025-05-10) showed clear lungs.",
    uncertainty: "Stability requires comparison with future low-dose CT scan.",
    safety_notice: "NOTICE: MedInsight AI provides document-grounded explanations. It does NOT independently diagnose medical images. Please consult a qualified physician."
  });

  const handleFileProcessed = (fileData: any) => {
    setActiveTab('analysis');
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="text-center py-6 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyanGlow/10 via-tealGlow/10 to-transparent border border-cyanGlow/30 px-4 py-1.5 rounded-full text-xs text-cyanGlow font-mono mb-2">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Multimodal Healthcare Assistant on Google Cloud</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyanGlow">
          MedInsight AI
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
          Understand your healthcare reports and medical records with grounded AI assistance.
        </p>
      </div>

      {/* Upload Dropzone */}
      <UploadDropzone onFileProcessed={handleFileProcessed} />

      {/* Main Navigation Tabs */}
      <div className="flex items-center justify-center space-x-2 md:space-x-4 border-b border-white/10 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'analysis'
              ? 'bg-cyanGlow text-obsidian-900 shadow-lg shadow-cyanGlow/20'
              : 'bg-obsidian-800 hover:bg-obsidian-700 text-slate-300 border border-white/5'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Analyze Medical Report</span>
        </button>

        <button
          onClick={() => setActiveTab('compare')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'compare'
              ? 'bg-cyanGlow text-obsidian-900 shadow-lg shadow-cyanGlow/20'
              : 'bg-obsidian-800 hover:bg-obsidian-700 text-slate-300 border border-white/5'
          }`}
        >
          <GitCompare className="w-4 h-4" />
          <span>Compare Reports</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'chat'
              ? 'bg-cyanGlow text-obsidian-900 shadow-lg shadow-cyanGlow/20'
              : 'bg-obsidian-800 hover:bg-obsidian-700 text-slate-300 border border-white/5'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask Questions Chat</span>
        </button>

        <button
          onClick={() => setActiveTab('evidence')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'evidence'
              ? 'bg-cyanGlow text-obsidian-900 shadow-lg shadow-cyanGlow/20'
              : 'bg-obsidian-800 hover:bg-obsidian-700 text-slate-300 border border-white/5'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Evidence & Citations</span>
        </button>
      </div>

      {/* Active Tab View Rendering */}
      <div>
        {activeTab === 'analysis' && <ReportAnalysisView reportData={activeReportData} />}
        {activeTab === 'compare' && <CompareReportsView />}
        {activeTab === 'chat' && <ChatStream />}
        {activeTab === 'evidence' && <EvidenceDrawer />}
      </div>
    </div>
  );
}
