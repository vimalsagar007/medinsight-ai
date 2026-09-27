'use client';

import React, { useState } from 'react';
import { Send, Bot, User, ShieldAlert, BookOpen, ExternalLink, Activity } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  groundingStatus?: string;
  citations?: any[];
  timestamp: string;
}

export const ChatStream: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Hello! I am MedInsight AI. I can explain the findings in your uploaded medical reports, break down medical terms, and retrieve clinical literature. How can I assist you with your report today?',
      groundingStatus: 'FULLY_GROUNDED',
      timestamp: '10:30 AM'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      let grounding = 'FULLY_GROUNDED';
      let citations = [
        {
          title: 'Fleischner Society Guidelines 2017',
          source: 'Radiology Journal',
          url: 'https://pubmed.ncbi.nlm.nih.gov/28240563/'
        }
      ];

      if (currentInput.toLowerCase().includes('diagnose') || currentInput.toLowerCase().includes('cancer')) {
        botResponse = 'I can explain the information documented in your written medical report, extract metadata, and help you prepare questions for your physician, but I cannot independently diagnose medical images, CT scans, MRIs, or X-rays. Medical image interpretation requires evaluation by a qualified healthcare professional.\n\nMEDICAL SAFETY NOTICE: MedInsight AI provides document-grounded explanations and educational guidance only.';
        grounding = 'SAFETY_BLOCKED';
        citations = [];
      } else {
        botResponse = `Based on your uploaded CT Chest report, the radiologist documented a solitary 6mm subpleural nodule in your right upper lobe. \n\nPer the Fleischner Society Guidelines, a follow-up low-dose CT scan in 6 to 12 months is standard protocol to check for stability. No acute lung consolidation or pleural effusion was present.`;
      }

      const botMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: botResponse,
        groundingStatus: grounding,
        citations: citations,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/10 flex flex-col h-[520px]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-cyanGlow" />
          <span className="text-sm font-semibold text-white">Grounded Healthcare Assistant Chat</span>
        </div>
        <span className="text-[11px] font-mono text-emeraldGlow bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-full">
          RAG & MCP Online
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'bot' && (
              <div className="p-2 rounded-xl bg-cyanGlow/10 border border-cyanGlow/30 shrink-0">
                <Activity className="w-4 h-4 text-cyanGlow" />
              </div>
            )}

            <div
              className={`max-w-lg rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg'
                  : 'bg-obsidian-800 border border-white/10 text-slate-200'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Grounding & Citations Tag */}
              {msg.groundingStatus && (
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span
                    className={`font-semibold ${
                      msg.groundingStatus === 'SAFETY_BLOCKED'
                        ? 'text-amber-400'
                        : 'text-cyanGlow'
                    }`}
                  >
                    Status: {msg.groundingStatus}
                  </span>

                  {msg.citations && msg.citations.length > 0 && (
                    <div className="flex items-center space-x-1.5 text-slate-300">
                      <BookOpen className="w-3 h-3 text-cyanGlow" />
                      <a
                        href={msg.citations[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-cyanGlow flex items-center space-x-1"
                      >
                        <span>{msg.citations[0].title}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="p-2 rounded-xl bg-slate-800 border border-white/10 shrink-0">
                <User className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-cyanGlow font-mono animate-pulse">
            <Bot className="w-4 h-4" />
            <span>HealthcareOrchestratorAgent is reasoning...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-obsidian-900/60 flex items-center space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question about your report (e.g. 'Explain what a 6mm subpleural nodule means')..."
          className="flex-1 bg-obsidian-800 border border-white/10 focus:border-cyanGlow rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none transition-all"
        />
        <button
          onClick={handleSend}
          className="p-3 bg-cyanGlow hover:bg-cyan-400 text-obsidian-900 rounded-xl transition-all shadow-lg shadow-cyanGlow/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
