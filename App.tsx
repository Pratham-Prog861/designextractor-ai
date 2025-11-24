import React, { useState } from 'react';
import { UrlInput } from './components/UrlInput';
import { ExtractionView } from './components/ExtractionView';
import { PromptModal } from './components/PromptModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { extractDesignFromUrl, generateCodePrompt } from './services/geminiService';
import { ExtractedDesign, AppStep } from './types';

export default function App() {
  const [step, setStep] = useState<AppStep>('input');
  const [designData, setDesignData] = useState<ExtractedDesign | null>(null);
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([]);
  const [generatedMarkdown, setGeneratedMarkdown] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle URL Submission
  const handleAnalyze = async (url: string) => {
    setStep('extracting');
    window.scrollTo(0, 0); // Reset scroll when starting
    try {
      const data = await extractDesignFromUrl(url);
      setDesignData(data);
      // Pre-select all sections by default
      setSelectedSectionIds(data.sections.map(s => s.id));
      setStep('preview');
      window.scrollTo(0, 0); // Ensure top of results is seen
    } catch (error) {
      console.error(error);
      setStep('input'); // Should show toast error here ideally
      alert("Failed to analyze. Please check the URL and try again.");
    }
  };

  // Handle Selection Toggles
  const toggleSelection = (id: string) => {
    setSelectedSectionIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Handle Final Prompt Generation
  const handleGeneratePrompt = async () => {
    if (!designData) return;
    setIsGenerating(true);
    try {
      const markdown = await generateCodePrompt(designData, selectedSectionIds);
      setGeneratedMarkdown(markdown);
      setIsModalOpen(true);
    } catch (error) {
      alert("Failed to generate prompt.");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetApp = () => {
    // Explicitly reset all state to initial values
    setStep('input');
    setDesignData(null);
    setSelectedSectionIds([]);
    setGeneratedMarkdown('');
    setIsModalOpen(false);
    // Smoothly return to top for a fresh start
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex flex-col">
      
      <Navbar 
        onLogoClick={resetApp} 
        onGetStarted={() => {
            resetApp();
            setTimeout(() => {
                document.getElementById('url-input')?.focus();
            }, 100);
        }} 
      />

      <main className="relative z-0 flex-1">
        {step === 'input' && (
          <UrlInput onAnalyze={handleAnalyze} isAnalyzing={false} />
        )}

        {(step === 'extracting' || step === 'preview') && (
          <ExtractionView 
            data={designData}
            isLoading={step === 'extracting'}
            isGenerating={isGenerating}
            selectedIds={selectedSectionIds}
            onToggleSelection={toggleSelection}
            onGenerate={handleGeneratePrompt}
            onReset={resetApp}
          />
        )}
      </main>

      {/* Only show Footer on the Landing Page for a cleaner app experience, or conditionally if desired */}
      {step === 'input' && <Footer />}

      <PromptModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        markdown={generatedMarkdown} 
      />
    </div>
  );
}