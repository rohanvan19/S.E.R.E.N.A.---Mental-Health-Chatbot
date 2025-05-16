# S.E.R.E.N.A. - Mental Health Chatbot

**Supporting Empathy, Reassurance, and Emotional Nurturing Assistant**

---

## 🧠 Problem Statement

Millions of people worldwide struggle with depression, anxiety, and loneliness. Many have no one to talk to, and the lack of support can lead to devastating outcomes. S.E.R.E.N.A. aims to provide a safe, anonymous, and supportive space for anyone to share their thoughts and receive empathetic, motivational responses—24/7.

---

## 💡 Motivation & Purpose

- **Empathy at Scale:** Make mental health support accessible to everyone, anytime.
- **Privacy-First:** No accounts, no tracking, fully anonymous.
- **Positive Impact:** Encourage, motivate, and support users in a gentle, non-judgmental way.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Next.js (Node.js), SQLite
- **AI Model:** Local LLMs (Gemma via Ollama)
- **Deployment:** Docker, Vercel/Netlify (frontend), Render/Heroku (backend)

---

## 🚀 Features

- Anonymous, supportive chat with an AI mental health companion
- Modern, calming UI with a focus on user comfort
- Motivational, positive, and empathetic responses
- Suggestions for articles, meditation, and support groups
- Persistent chat history and multi-chat support
- Fast, local AI inference (no cloud API required)

---

## 🖥️ How to Run Locally

### **Requirements**
- Node.js (v18+ recommended)
- npm
- [Ollama](https://ollama.com/) (for local LLMs)
- Git

### **Setup Steps**

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YOUR_USERNAME/S.E.R.E.N.A.-Mental-Health-Chatbot.git
   cd S.E.R.E.N.A.-Mental-Health-Chatbot
   ```

2. **Install dependencies:**
   ```sh
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up Ollama:**
   ```sh
   # Install Ollama from https://ollama.com/
   # Pull the Gemma model
   ollama pull gemma3
   ```

4. **Initialize the database:**
   ```sh
   cd backend
   npm run build
   ```

### **Running the Application**

1. **Start Ollama (Port: 11434)**
   ```sh
   ollama serve
   ```
   - This will start the Ollama server at http://localhost:11434
   - Keep this terminal window open

2. **Start the Backend (Port: 3001)**
   ```sh
   cd backend
   $env:PORT=3001; npm run dev
   ```
   - This will start the Next.js server at http://localhost:3001
   - Keep this terminal window open

3. **Start the Frontend (Port: 3000)**
   ```sh
   cd frontend
   npm start
   ```
   - This will start the React app at http://localhost:3000
   - The application will automatically open in your default browser

### **Port Configuration**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Ollama: http://localhost:11434

### **Troubleshooting**

If you encounter port conflicts:
1. Check if any process is using port 3000:
   ```sh
   netstat -ano | findstr :3000
   ```
2. Kill the process if needed:
   ```sh
   taskkill /F /PID <process_id>
   ```

If Ollama shows "port already in use":
1. Check if Ollama is already running
2. Kill any existing Ollama processes
3. Restart Ollama

---

## 📝 Future Improvements

- Persistent chat history and multi-chat support
- More personalized suggestions and resources
- Mobile-friendly UI
- Cloud deployment options

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Please open an issue to discuss your ideas.

---

## 📄 License

MIT

---

## 🙏 Acknowledgements

- [Ollama](https://ollama.com/)
- [Gemma LLM](https://ai.google.dev/gemma)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

> If you or someone you know is struggling, please reach out to a mental health professional or helpline in your country. S.E.R.E.N.A. is not a substitute for professional help.
