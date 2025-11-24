export interface Font {
  name: string;
  weight: string;
}

export interface Color {
  hex: string;
  name: string;
}

export interface Section {
  id: string;
  title: string;
  type: 'header' | 'hero' | 'features' | 'footer' | 'auth' | 'pricing' | 'content';
  description: string;
  visualDetail: string;
  isSelected?: boolean;
}

export interface ExtractedDesign {
  url: string;
  name: string;
  colors: Color[];
  fonts: Font[];
  sections: Section[];
  layoutType: string;
}

export type AppStep = 'input' | 'extracting' | 'preview' | 'generating';
