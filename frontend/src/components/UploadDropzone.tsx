'use client';

import React, { useState } from 'react';
import { Upload, FileText, Image as ImageIcon, Video, Disc, CheckCircle, Loader2 } from 'lucide-react';

interface UploadDropzoneProps {
  onFileProcessed: (fileData: any) => void;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({ onFileProcessed }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleSimulatedUpload = (fileType: string) => {
    setIsUploading(true);
    setUploadStatus(`Generating short-lived signed URL for ${fileType}...`);

    setTimeout(() => {
      setUploadStatus("Classifying document & indexing in Vertex AI RAG Engine...");
      setTimeout(() => {
        setIsUploading(false);
        setUploadStatus(null);
        
        let demoSnippet = "Solitary 6mm x 5mm subpleural nodule in right upper lobe CT chest.";
        let docType = "radiology_report";

        if (fileType === "DICOM") {
          docType = "dicom_image_file";
          demoSnippet = "DICOM CT Chest Series 3, Slice 42. Modality: CT, Body Part: CHEST, Slice: 2.5mm";
        } else if (fileType === "Video") {
          docType = "medical_video";
          demoSnippet = "Post-consultation video review: Dr. Jenkins explaining Fleischner Society guidelines for lung nodule.";
        } else if (fileType === "Image") {
          docType = "radiology_report_image";
          demoSnippet = "Scanned Pathology / X-ray document page image.";
        }

        onFileProcessed({
          file_id: `file_${Date.now()}`,
          filename: `sample_${fileType.toLowerCase()}_patient_record.${fileType === 'DICOM' ? 'dcm' : fileType === 'Video' ? 'mp4' : 'pdf'}`,
          doc_type: docType,
          snippet: demoSnippet,
          upload_timestamp: new Date().toISOString()
        });
      }, 1000);
    }, 1200);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Upload className="w-5 h-5 text-cyanGlow" />
            <span>Secure Medical Media & Report Ingestion</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Supported: PDF, DICOM (.dcm), MP4, MOV, WAV, MP3, JPG, PNG, WEBP, TXT, DOCX, PPTX, JSON, CSV
          </p>
        </div>
        <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-cyanGlow/10 text-cyanGlow border border-cyanGlow/20">
          GCS Signed URL & Pub/Sub
        </span>
      </div>

      <div className="border-2 border-dashed border-cyanGlow/30 hover:border-cyanGlow/60 transition-all rounded-xl p-8 text-center bg-obsidian-900/40 relative">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-3">
            <Loader2 className="w-10 h-10 text-cyanGlow animate-spin" />
            <p className="text-sm font-medium text-cyan-200">{uploadStatus}</p>
          </div>
        ) : (
          <div>
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => handleSimulatedUpload("Report")}
                className="flex items-center space-x-2 bg-obsidian-800 hover:bg-cyanGlow/20 border border-white/10 hover:border-cyanGlow/50 px-4 py-2.5 rounded-lg text-xs font-medium transition-all text-slate-200 hover:text-white"
              >
                <FileText className="w-4 h-4 text-cyanGlow" />
                <span>Upload Report</span>
              </button>

              <button
                onClick={() => handleSimulatedUpload("DICOM")}
                className="flex items-center space-x-2 bg-obsidian-800 hover:bg-emeraldGlow/20 border border-white/10 hover:border-emeraldGlow/50 px-4 py-2.5 rounded-lg text-xs font-medium transition-all text-slate-200 hover:text-white"
              >
                <Disc className="w-4 h-4 text-emeraldGlow" />
                <span>Upload DICOM (.dcm)</span>
              </button>

              <button
                onClick={() => handleSimulatedUpload("Video")}
                className="flex items-center space-x-2 bg-obsidian-800 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 px-4 py-2.5 rounded-lg text-xs font-medium transition-all text-slate-200 hover:text-white"
              >
                <Video className="w-4 h-4 text-purple-400" />
                <span>Upload Video/Audio</span>
              </button>

              <button
                onClick={() => handleSimulatedUpload("Image")}
                className="flex items-center space-x-2 bg-obsidian-800 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/50 px-4 py-2.5 rounded-lg text-xs font-medium transition-all text-slate-200 hover:text-white"
              >
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>Upload Image</span>
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Drag and drop files here or click any button above for synthetic demo ingestion.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
