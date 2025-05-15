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
- **AI Model:** Local LLMs (e.g., Gemma via Ollama)
- **Deployment:** Docker, Vercel/Netlify (frontend), Render/Heroku (backend)

---

## 🚀 Features

- Anonymous, supportive chat with an AI mental health companion
- Modern, calming UI with a focus on user comfort
- Motivational, positive, and empathetic responses
- Suggestions for articles, meditation, and support groups
- Persistent chat history and multi-chat support (in progress)
- Fast, local AI inference (no cloud API required)

---

## 🖥️ How to Run Locally

### **Requirements**
- Node.js (v18+ recommended)
- npm
- [Ollama](https://ollama.com/) (for local LLMs, e.g., Gemma)
- Docker (optional, for full-stack deployment)

### **Setup**

1. **Clone the repo:**
   ```sh
   git clone https://github.com/YOUR_USERNAME/S.E.R.E.N.A.-Mental-Health-Chatbot.git
   cd S.E.R.E.N.A.-Mental-Health-Chatbot
   ```

2. **Install dependencies:**
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Set up the database:**
   ```sh
   cd ../database
   npm install
   node init.js
   ```

4. **Start Ollama and pull the Gemma model:**
   ```sh
   ollama pull gemma3
   ollama serve
   ```

5. **Start the backend:**
   ```sh
   cd ../backend
   npm run dev
   # Or, to run on a different port:
   # $env:PORT=3001; npm run dev   (on Windows PowerShell)
   ```

6. **Start the frontend:**
   ```sh
   cd ../frontend
   npm start
   ```

7. **Open your browser and go to:**
   ```
   http://localhost:3000
   ```

---

## 📝 Future Improvements

- Persistent chat history and multi-chat support (like ChatGPT)
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
