import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  markdown: string;
}

export const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose, markdown }) => {
  const [copied, setCopied] = useState(false);

  // Lock body scroll when modal is open to prevent double scrollbars
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border w-full max-w-3xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up">
        
        {/* Header */}
        <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20 rounded-t-xl">
            <div>
                <h3 className="text-xl font-bold">Generated AI Prompt</h3>
                <p className="text-sm text-muted-foreground">Ready for Copilot, Cursor, or Gemini</p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        {/* Content */}
        <div className="p-0 overflow-y-auto flex-1 bg-[#0d1117]">
            <pre className="p-6 text-sm font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                {markdown}
            </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-card rounded-b-xl flex justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>Close</Button>
            <Button onClick={handleCopy} className={copied ? "bg-green-600 hover:bg-green-700" : ""}>
                {copied ? (
                    <span className="flex items-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                         Copied!
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        Copy as Markdown
                    </span>
                )}
            </Button>
        </div>
      </div>
    </div>
  );
};