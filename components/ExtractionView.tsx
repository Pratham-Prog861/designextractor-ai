import React from 'react';
import { ExtractedDesign, Section } from '../types';
import { Button } from './ui/Button';
import { Skeleton } from './ui/Skeleton';

interface ExtractionViewProps {
  data: ExtractedDesign | null;
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  isLoading?: boolean;
  isGenerating?: boolean;
}

const ColorChip: React.FC<{ color: { hex: string, name: string } }> = ({ color }) => (
  <div className="flex flex-col items-center group cursor-pointer">
    <div 
      className="w-12 h-12 rounded-full shadow-md border-2 border-transparent group-hover:border-white/20 transition-all group-hover:scale-110 relative" 
      style={{ backgroundColor: color.hex }}
    >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
    </div>
    <span className="text-[10px] mt-2 text-muted-foreground uppercase tracking-wider font-mono opacity-70 group-hover:opacity-100">{color.hex}</span>
  </div>
);

export const ExtractionView: React.FC<ExtractionViewProps> = ({ 
  data, 
  selectedIds, 
  onToggleSelection, 
  onGenerate, 
  onReset,
  isLoading,
  isGenerating = false
}) => {

  if (isLoading || !data) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8 pt-20">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-slide-up pb-32 pt-20">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary uppercase tracking-widest border border-primary/20">Extraction Successful</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white">{data.name}</h2>
          <p className="text-muted-foreground mt-2 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
            {data.sections.length} Components Detected
          </p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onReset} disabled={isGenerating}>Extract Another</Button>
            <Button 
                onClick={onGenerate} 
                disabled={selectedIds.length === 0 || isGenerating}
                isLoading={isGenerating}
                className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] min-w-[160px]"
            >
                {isGenerating ? 'Generating...' : `Generate Prompt (${selectedIds.length})`}
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Component Grid */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Detected Sections</h3>
                <span className="text-xs text-muted-foreground">Select components to include</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.sections.map((section) => {
                    const isSelected = selectedIds.includes(section.id);
                    return (
                        <div 
                            key={section.id}
                            onClick={() => onToggleSelection(section.id)}
                            className={`
                                relative p-6 rounded-xl border cursor-pointer transition-all duration-300 group
                                ${isSelected 
                                    ? 'border-primary bg-primary/5 ring-1 ring-primary/50 shadow-lg shadow-primary/5' 
                                    : 'border-white/10 bg-card hover:border-white/20 hover:bg-accent/5 hover:-translate-y-1'
                                }
                            `}
                        >
                            {/* Selection Checkbox */}
                            <div className="absolute top-4 right-4">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary scale-110' : 'border-muted-foreground/50 bg-transparent'}`}>
                                    {isSelected && (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start mb-4">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-secondary text-secondary-foreground uppercase tracking-wider border border-white/5">
                                    {section.type}
                                </span>
                            </div>
                            
                            <h4 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{section.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">{section.description}</p>
                            
                            {/* Visual Hint */}
                            <div className="pt-3 border-t border-dashed border-white/10">
                                <p className="text-[11px] text-muted-foreground/70 font-mono">
                                    <span className="text-primary/70">specs: </span> {section.visualDetail.substring(0, 60)}...
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Sidebar: Design System */}
        <div className="space-y-6">
            
            {/* Colors */}
            <div className="bg-card border border-white/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-widest">Color Palette</h3>
                <div className="flex flex-wrap gap-4">
                    {data.colors.map((c, i) => <ColorChip key={i} color={c} />)}
                </div>
            </div>

            {/* Typography */}
            <div className="bg-card border border-white/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-widest">Typography</h3>
                <div className="space-y-3">
                    {data.fonts.map((f, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-white/5">
                            <span className="font-medium text-sm">{f.name}</span>
                            <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 bg-black/20 rounded border border-white/5">{f.weight}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Layout Info */}
            <div className="bg-gradient-to-br from-card to-secondary/30 border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-widest">Layout Strategy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Identified <span className="text-white font-medium">"{data.layoutType}"</span> structure. 
                    The generated prompt will enforce responsive behavior using CSS Grid/Flexbox appropriate for this layout.
                </p>
            </div>
        </div>

      </div>

      {/* Sticky Mobile Action */}
      <div className="fixed bottom-6 left-0 right-0 p-4 flex justify-center lg:hidden pointer-events-none z-50">
          <Button 
            onClick={onGenerate} 
            disabled={selectedIds.length === 0 || isGenerating}
            isLoading={isGenerating}
            className="pointer-events-auto shadow-2xl w-full max-w-xs bg-primary text-white"
            size="lg"
          >
            {isGenerating ? 'Generating...' : `Generate Prompt (${selectedIds.length})`}
          </Button>
      </div>
    </div>
  );
};