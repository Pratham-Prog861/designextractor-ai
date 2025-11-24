# DesignExtractor AI

DesignExtractor AI is a powerful tool that allows developers to extract design elements from any website URL and instantly generate AI-ready code prompts. It simplifies the process of replicating or drawing inspiration from existing web designs by converting them into structured, actionable prompts for AI coding assistants.

## 🚀 Features

- **URL Analysis:** Simply paste a URL to analyze its design structure.
- **Smart Extraction:** Automatically identifies and extracts key design sections (headers, heroes, features, footers, etc.).
- **Selective Generation:** Choose exactly which sections you want to include in your prompt.
- **AI Prompt Generation:** Creates detailed, context-aware markdown prompts optimized for AI coding agents.
- **Visual Preview:** Preview extracted sections before generating the code prompt.

## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Integration:** [Google GenAI SDK](https://ai.google.dev/)
- **Styling:** CSS (Tailwind CSS likely used based on class names in code)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/pratham-prog861/designextractor-ai.git
    cd designextractor-ai
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**

    Create a `.env.local` file in the root directory and add your API keys (if required by the `services/geminiService.ts`).

    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  **Open the app:**

    Visit `http://localhost:5173` in your browser.

## 📖 Usage

1.  Enter the URL of the website you want to analyze.
2.  Click **"Analyze"** to start the extraction process.
3.  Review the extracted design sections.
4.  Select the sections you want to convert into code.
5.  Click **"Generate Prompt"** to get your AI-ready markdown prompt.
6.  Copy the prompt and use it with your favorite AI coding assistant (e.g., ChatGPT, Claude, Gemini).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
