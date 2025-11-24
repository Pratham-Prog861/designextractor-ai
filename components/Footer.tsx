import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/40 border-t border-white/5 pt-16 pb-8 px-4 mt-auto backdrop-blur-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        <div className="col-span-2 md:col-span-1">
           <div className="flex items-center gap-2 mb-4">
             <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold">DE</div>
             <span className="font-bold text-white">DesignExtractor</span>
           </div>
           <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
             Empowering developers to bridge the gap between design and code with AI-driven analysis.
           </p>
        </div>
        
        <div>
          <h4 className="font-bold text-foreground mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-foreground mb-4">Resources</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-foreground mb-4">Legal</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} DesignExtractor AI. All rights reserved.</p>
        <div className="flex items-center gap-6">
           <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              Made with <span className="text-red-500">♥</span> by Developers
           </span>
        </div>
      </div>
    </footer>
  );
};