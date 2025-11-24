import React from 'react';
import { Button } from './ui/Button';

interface NavbarProps {
  onLogoClick: () => void;
  onGetStarted: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogoClick, onGetStarted }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={onLogoClick}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/20 flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform duration-200">
          DE
        </div>
        <span className="font-bold text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">DesignExtractor</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
        <a href="#examples" className="hover:text-primary transition-colors">Examples</a>
        <a href="#features" className="hover:text-primary transition-colors">Features</a>
      </div>

      <div className="flex items-center gap-4">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors">
           <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        </a>
        <Button size="sm" onClick={onGetStarted} className="bg-white text-black hover:bg-gray-200">Get Started</Button>
      </div>
    </nav>
  );
};