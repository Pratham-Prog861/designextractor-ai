import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ExtractedDesign, Section } from '../types';

// NOTE: In a real environment, always ensure process.env.API_KEY is defined.
// Since we are mocking the browser environment here, we check for it.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const extractDesignSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Name of the website/brand" },
    layoutType: { type: Type.STRING, description: "General layout style (e.g., Single Column, Dashboard, Landing Page)" },
    colors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          hex: { type: Type.STRING },
          name: { type: Type.STRING, description: "Semantic name (e.g., Primary, Background)" }
        }
      }
    },
    fonts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          weight: { type: Type.STRING }
        }
      }
    },
    sections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          type: { type: Type.STRING, enum: ['header', 'hero', 'features', 'footer', 'auth', 'pricing', 'content'] },
          description: { type: Type.STRING, description: "Brief purpose of the section" },
          visualDetail: { type: Type.STRING, description: "Detailed visual description for an AI to recreate it (padding, alignment, shadows)" }
        }
      }
    }
  },
  required: ["name", "colors", "fonts", "sections", "layoutType"]
};

export const extractDesignFromUrl = async (url: string): Promise<ExtractedDesign> => {
  // Simulation: We are asking Gemini to 'hallucinate' the design of a given URL based on its knowledge base.
  // In a real app with backend, we would crawl the HTML/CSS and pass that to Gemini.
  try {
    const prompt = `
      Analyze the likely design system and layout for the website: ${url}.
      If you don't know the specific website, generate a plausible modern design system for a website of this domain name type.
      Provide a comprehensive breakdown of sections, 5-7 distinct sections minimum.
      Ensure color palettes are complete with hex codes.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: extractDesignSchema,
        thinkingConfig: { thinkingBudget: 1024 } // Use a bit of thinking to get a better design breakdown
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text) as ExtractedDesign;
    return { ...data, url };

  } catch (error) {
    console.error("Extraction failed:", error);
    // Fallback mock data if API fails or key is missing
    return {
      url,
      name: "Mock Design System",
      layoutType: "Modern SaaS",
      colors: [
        { hex: "#0f172a", name: "Background" },
        { hex: "#3b82f6", name: "Primary" },
        { hex: "#64748b", name: "Muted" },
        { hex: "#f8fafc", name: "Foreground" }
      ],
      fonts: [{ name: "Inter", weight: "400/700" }],
      sections: [
        { id: "1", title: "Navigation Bar", type: "header", description: "Top sticky nav", visualDetail: "Glassmorphism effect, logo left, links center, CTA right" },
        { id: "2", title: "Hero Section", type: "hero", description: "Main value prop", visualDetail: "Large H1, two buttons, right-aligned 3D illustration" },
        { id: "3", title: "Features Grid", type: "features", description: "Product capabilities", visualDetail: "3x2 grid, icons in circles, hover lift effect" }
      ]
    };
  }
};

export const generateCodePrompt = async (design: ExtractedDesign, selectedSectionIds: string[]): Promise<string> => {
  const selectedSections = design.sections.filter(s => selectedSectionIds.includes(s.id));

  const prompt = `
    You are an expert Frontend Architect.
    Generate a highly detailed Prompt in Markdown format that I can give to an AI code editor (like Copilot or Cursor) to build the following web application parts.

    **Context**:
    Website: ${design.name} (${design.url})
    Style: ${design.layoutType}

    **Design Tokens**:
    - Colors: ${design.colors.map(c => `${c.name}: ${c.hex}`).join(', ')}
    - Fonts: ${design.fonts.map(f => `${f.name} (${f.weight})`).join(', ')}

    **Selected Sections to Implement**:
    ${selectedSections.map(s => `- **${s.title}** (${s.type}): ${s.description}. \n  *Visual Specs*: ${s.visualDetail}`).join('\n')}

    **Instructions for the Target AI**:
    1. Use React, TypeScript, and Tailwind CSS.
    2. Use shadcn/ui component patterns.
    3. Implement smooth micro-interactions and responsive behavior.
    4. Ensure accessibility compliance.

    Output ONLY the valid Markdown prompt content. Do not add conversational filler.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "Failed to generate prompt.";
  } catch (e) {
    return "Error generating prompt. Please check your API key.";
  }
};
