# Mini Code Copilot

A lightweight AI-like code generator built with **React + Vite + TailwindCSS** on the frontend and a **mock Express backend**.  
This project simulates a simple AI code assistant for generating language-specific code snippets based on prompts.

---

## 🚀 Setup Instructions

### 1. Clone and install backend
```bash
cd backend
npm install
npm start

Backend runs by default at:

http://localhost:5000

2. Setup frontend
cd frontend
npm install
cp .env.example .env
npm run dev


Frontend runs at:

http://localhost:5173


If deploying the backend, update VITE_API_BASE_URL inside frontend/.env.

🧠 Architecture / Design Decisions
1.Frontend

Built using React + Vite for fast compilation and HMR.
TailwindCSS chosen for fast UI iteration and responsive layout.
Code highlight powered by react-syntax-highlighter (Prism theme).
Clean separation using:
/components — UI components
/hooks — custom logic (API calls, history management)
/styles — global Tailwind entry

2.Backend

Mock backend using Express.js for simplicity.
/generate endpoint simulates AI:
Accepts prompt + language
Returns random predefined code snippet
Easy to replace with a real AI API later.

3.State Management
Local React state (no Redux required).
History is persisted using localStorage (prompt + code + language + timestamp).

4.UI Layout
Two-column responsive layout:
Left → prompt, language selection, controls
Right → generated code + history
Mobile layout: stacked panels.

✅ List of Implemented Features

--Core Features
Natural language prompt input
Generate button with loading spinner
Code output window with syntax highlighting
Two-column responsive layout
Fully working Express backend
POST /generate mock AI endpoint


--Bonus Features (Implemented)

Language selector (Python, JavaScript, C++)
Prompt & code history panel
LocalStorage persistence
Search + filter history
Copy code to clipboard
Download code as .js, .py, .cpp
Adjustable code font size
Dark/Light theme toggle
Keyboard shortcuts:
Ctrl + Enter → Generate code
/ → Focus prompt
Skeleton loader for code panel

🌟 If I Had More Time (Potential Improvements)

Replace mock backend with real AI API (OpenAI / Anthropic / Replit).
Add Monaco Editor (VSCode-like) for better code editing.
Add tabs for multiple generated sessions.
Add “Improve Code” or “Explain Code” AI buttons.
Add rating system for each generated snippet.
Implement user auth + cloud synced history.
Deploy auto-scaling backend + optimized frontend build.

📡 Example API Payload (Backend)
--Endpoint
POST /generate

Request Body
{
  "prompt": "Write a Python function to reverse a string",
  "language": "python"
}

Response
{
  "code": "def reverse_string(s):\n    return s[::-1]"
}