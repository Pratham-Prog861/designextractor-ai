import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; desc: string; delay?: string }> = ({ icon, title, desc, delay }) => (
  <div className="flex gap-4 animate-fade-in hover:bg-white/5 p-4 rounded-xl transition-colors duration-300" style={{ animationDelay: delay }}>
    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_-3px_rgba(124,58,237,0.3)]">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const MockBrowserWindow = () => {
  const [phase, setPhase] = useState<'idle' | 'typing' | 'scanning' | 'detected'>('idle');
  const [typedUrl, setTypedUrl] = useState('');
  const fullUrl = "https://saas-landing.com";

  useEffect(() => {
    let isMounted = true;
    
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const runSequence = async () => {
      if (!isMounted) return;

      // Phase 1: Typing
      setPhase('typing');
      for (let i = 0; i <= fullUrl.length; i++) {
        if (!isMounted) return;
        setTypedUrl(fullUrl.slice(0, i));
        await wait(50);
      }
      
      if (!isMounted) return;
      await wait(500);
      
      // Phase 2: Scanning
      if (!isMounted) return;
      setPhase('scanning');
      await wait(2000);
      
      // Phase 3: Detected
      if (!isMounted) return;
      setPhase('detected');
      await wait(3000);
      
      // Reset
      if (!isMounted) return;
      setPhase('idle');
      setTypedUrl('');
      await wait(500);
      
      // Loop
      if (isMounted) runSequence();
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
        <div className="bg-card border border-white/10 rounded-xl shadow-2xl overflow-hidden transform rotate-y-12 rotate-x-6 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
            {/* Browser Header */}
            <div className="bg-muted/50 border-b border-white/5 p-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 bg-black/20 rounded text-[10px] text-muted-foreground px-2 py-1 font-mono truncate h-6 flex items-center">
                    {typedUrl}<span className={`w-0.5 h-3 bg-primary ml-0.5 ${phase === 'typing' ? 'animate-pulse' : 'opacity-0'}`} />
                </div>
            </div>

            {/* Viewport */}
            <div className="relative h-64 bg-[#0f172a] p-4 space-y-4 overflow-hidden">
                
                {/* Scanning Laser Overlay */}
                {phase === 'scanning' && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_20px_5px_rgba(124,58,237,0.5)] z-20 animate-scan pointer-events-none" />
                )}

                {/* Content Blocks */}
                <div className={`space-y-4 transition-all duration-500 ${phase === 'idle' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    
                    {/* Hero Block */}
                    <div className="relative group">
                        <div className={`h-24 w-full rounded-lg transition-all duration-700 ${phase === 'detected' ? 'bg-secondary/30 border border-primary/50' : 'bg-white/5 border border-transparent'}`}>
                             {/* Skeleton Content */}
                             <div className="p-3 space-y-2 opacity-30">
                                <div className="h-2 w-1/3 bg-white/20 rounded" />
                                <div className="h-2 w-2/3 bg-white/10 rounded" />
                             </div>
                        </div>
                        
                        {/* Detection Badge */}
                        <div className={`absolute top-2 right-2 flex items-center gap-1 bg-primary text-white text-[9px] px-1.5 py-0.5 rounded shadow-lg transition-all duration-300 ${phase === 'detected' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                            <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                            HERO
                        </div>
                    </div>

                    {/* Grid Block */}
                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3].map((i) => (
                             <div key={i} className="relative">
                                <div className={`h-16 w-full rounded-lg transition-all duration-700 delay-${i * 100} ${phase === 'detected' ? 'bg-secondary/30 border border-primary/50' : 'bg-white/5 border border-transparent'}`} />
                                <div className={`absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[8px] text-white transition-all duration-300 delay-${i * 100 + 200} ${phase === 'detected' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                                    {i}
                                </div>
                             </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[60px] -z-10 rounded-full opacity-50" />
    </div>
  );
};

const ExamplePromptSection = () => {
    const [activeTab, setActiveTab] = useState<'saas' | 'ecom'>('saas');

    const prompts = {
        saas: `## Component Specifications
- **Type**: Analytics Dashboard
- **Theme**: Dark Modern (#0f172a background)
- **Structure**: Sidebar Left, Header Top, Grid Content

### Implementation Steps
1. Create a \`Sidebar\` component with collapsible navigation items.
2. Implement \`StatsCard\` using CSS Grid for the 4-column layout.
3. Use \`recharts\` for the 'Revenue Over Time' area chart.
4. Ensure the main content area has \`overflow-y-auto\` for independent scrolling.`,
        ecom: `## Component Specifications
- **Type**: Product Listing Page
- **Theme**: Clean Minimalist (#ffffff background)
- **Structure**: Filter Sidebar, Product Grid, Pagination

### Implementation Steps
1. Build \`ProductCard\` with hover state revealing 'Add to Cart'.
2. Create a \`FilterGroup\` component supporting multi-select checkboxes.
3. Use \`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))\` for responsiveness.
4. Implement a sticky header for the sort controls.`
    };

    return (
        <div id="examples" className="w-full py-24 px-4 bg-black/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
             
             <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">See the Magic</h2>
                    <p className="text-muted-foreground">We translate visual designs into technical instructions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 bg-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Left: Interactive Menu */}
                    <div className="p-6 md:p-8 bg-muted/20 flex flex-col justify-center border-r border-white/5">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">Select a Use Case</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={() => setActiveTab('saas')}
                                className={`w-full text-left p-4 rounded-xl transition-all border ${activeTab === 'saas' ? 'bg-primary/10 border-primary text-primary' : 'bg-transparent border-transparent hover:bg-white/5 text-muted-foreground'}`}
                            >
                                <div className="font-bold">SaaS Dashboard</div>
                                <div className="text-xs opacity-70 mt-1">Complex layouts & data viz</div>
                            </button>
                            <button 
                                onClick={() => setActiveTab('ecom')}
                                className={`w-full text-left p-4 rounded-xl transition-all border ${activeTab === 'ecom' ? 'bg-primary/10 border-primary text-primary' : 'bg-transparent border-transparent hover:bg-white/5 text-muted-foreground'}`}
                            >
                                <div className="font-bold">E-commerce Store</div>
                                <div className="text-xs opacity-70 mt-1">Grids, cards & filters</div>
                            </button>
                        </div>
                    </div>

                    {/* Right: Code Preview */}
                    <div className="relative bg-[#0d1117] min-h-[400px]">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                             <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                             </div>
                             <div className="ml-2 text-xs text-muted-foreground font-mono">generated-prompt.md</div>
                        </div>
                        <div className="p-6 overflow-auto h-[350px]">
                            <pre className="font-mono text-xs md:text-sm text-blue-100 leading-relaxed whitespace-pre-wrap">
                                {prompts[activeTab]}
                            </pre>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0d1117] to-transparent" />
                    </div>
                </div>
             </div>
        </div>
    );
};

export const UrlInput: React.FC<UrlInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) onAnalyze(url);
  };

  return (
    <div className="flex flex-col w-full min-h-screen animate-fade-in relative">
      
      {/* Background Decor - Fixed to prevent layout overflow/scrollbars */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center max-w-5xl mx-auto pt-28">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6 animate-slide-up">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            AI-Powered Design Extraction v2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Turn any website <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                into clean code.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Paste a URL. Our AI extracts structure, colors, and typography, 
            generating production-ready prompts for <span className="text-white font-semibold">Cursor</span>, <span className="text-white font-semibold">Copilot</span>, and <span className="text-white font-semibold">Gemini</span>.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-lg relative group z-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative flex items-center p-2 bg-background border border-border rounded-lg shadow-2xl">
                <div className="pl-3 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="https://example.com"
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 h-12 px-4 text-lg text-foreground placeholder:text-muted-foreground/50"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isAnalyzing}
                  id="url-input"
                />
                <Button type="submit" disabled={!url || isAnalyzing} isLoading={isAnalyzing} className="shrink-0 h-10 px-6 font-semibold shadow-lg">
                  {isAnalyzing ? 'Scanning...' : 'Extract'}
                </Button>
            </div>
          </form>

          {/* Supported Tools */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-muted-foreground/60 animate-slide-up" style={{ animationDelay: '0.4s' }}>
             <span className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors"><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> Global Reach</span>
             <span className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors"><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg> Semantic Code</span>
             <span className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors"><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> User Auth Ready</span>
          </div>
      </div>

      {/* "How it Works" & Demo Section */}
      <div id="how-it-works" className="w-full bg-secondary/20 border-t border-white/5 py-24 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Explanation */}
            <div className="space-y-10">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">How it works</h2>
                    <p className="text-muted-foreground">From URL to deployed component in three steps.</p>
                </div>
                
                <div className="space-y-8">
                    <FeatureItem 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
                        title="1. Enter URL"
                        desc="Paste the link of the landing page or dashboard you want to clone. We support most modern websites."
                        delay="0s"
                    />
                    <FeatureItem 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        title="2. AI Extraction"
                        desc="Our Gemini models scan the layout, detecting design tokens, component structures, and responsive patterns."
                        delay="0.1s"
                    />
                     <FeatureItem 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                        title="3. Generate & Code"
                        desc="Receive a professionally engineered prompt. Paste it into Cursor or Copilot to get the exact React/Tailwind code."
                        delay="0.2s"
                    />
                </div>
            </div>

            {/* Right: Interactive Mock */}
            <div className="relative">
                <MockBrowserWindow />
            </div>

        </div>
      </div>

      {/* Example Prompts Showcase */}
      <ExamplePromptSection />

      {/* Examples Section */}
      <div id="features" className="w-full bg-background border-t border-white/5 py-24 px-4 bg-background/50 backdrop-blur-sm scroll-mt-20">
          <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Optimized for Every Stack</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Whether you are building a dashboard or a storefront, our AI understands the nuances of different web architectures.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureItem
                  delay="0s"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                  title="SaaS Dashboards"
                  desc="Generates grid layouts, sidebar navigation logic, and data visualization container structures."
                />
                <FeatureItem
                  delay="0.1s"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                  title="E-commerce"
                  desc="Extracts product card grids, pricing variants, and cart drawer interactions ready for state management."
                />
                <FeatureItem
                  delay="0.2s"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
                  title="Modern Blogs"
                  desc="Focuses on typography scales, readability constraints, and semantic HTML article structures."
                />
             </div>
          </div>
       </div>

       {/* CTA Section */}
       <div className="w-full py-32 px-4 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 -z-10" />
           <div className="max-w-4xl mx-auto text-center space-y-8">
               <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Ready to speed up your workflow?</h2>
               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                   Stop recreating wheels. Start generating component-rich code that mimics the world's best designs.
               </p>
               <div className="flex justify-center gap-4">
                   <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)]" onClick={() => document.getElementById('url-input')?.focus()}>
                       Start Extracting Now
                   </Button>
               </div>
           </div>
       </div>

    </div>
  );
};