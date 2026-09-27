import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { MedicalDisclaimerBanner } from '@/components/MedicalDisclaimerBanner';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'MedInsight AI — Multimodal Healthcare Report Analysis Assistant',
  description: 'Understand your healthcare reports and medical records with grounded AI assistance on Google Cloud.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-obsidian-900 text-slate-100 flex flex-col min-h-screen antialiased">
        <Header />
        <MedicalDisclaimerBanner />
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
