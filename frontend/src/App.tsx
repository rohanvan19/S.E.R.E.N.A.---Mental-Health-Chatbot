import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Sidebar from './components/Sidebar';
import './App.css';

interface Message {
  sender: 'user' | 'bot';
  content: string;
  created_at?: string;
}

interface Suggestion {
  type: string;
  title: string;
  url: string;
}

const Suggestions = ({ suggestions, onSuggestionClick }: { suggestions: Suggestion[], onSuggestionClick: (s: Suggestion) => void }) => (
  <div className="bg-calmGray p-4 rounded-2xl shadow mt-4 flex gap-4">
    {suggestions.map((s, i) => (
      <div
        key={i}
        className="flex-1 bg-white rounded-2xl p-3 shadow hover:shadow-md transition cursor-pointer"
        onClick={() => onSuggestionClick(s)}
      >
        <h4 className={`font-semibold ${s.type === 'article' ? 'text-calmBlue' : s.type === 'exercise' ? 'text-calmGreen' : 'text-calmPurple'}`}>{s.title}</h4>
        <p className="text-xs text-gray-500">{s.type.charAt(0).toUpperCase() + s.type.slice(1)}</p>
      </div>
    ))}
  </div>
);

const LoadingDots = () => (
  <span className="inline-flex gap-1">
    <span className="w-2 h-2 bg-calmPurple rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
    <span className="w-2 h-2 bg-calmPurple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
    <span className="w-2 h-2 bg-calmPurple rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
  </span>
);

function formatTime(dateStr: string | undefined) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const suffix = (d => (d > 3 && d < 21) ? 'th' : ['th', 'st', 'nd', 'rd', 'th'][Math.min(d % 10, 4)])(day);
  return `${day}${suffix} ${month}, ${year}`;
}

const ChatArea = ({ messages, onSend, input, setInput, suggestions, onSuggestionClick, loading }: any) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Find the date of the first message (or today if none)
  const firstMsgDate = messages.length > 0 && messages[0].created_at ? formatDate(messages[0].created_at) : formatDate(new Date().toISOString());

  let lastDate = '';

  return (
    <main className="chat-bg flex-1 flex flex-col h-full p-8">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 hide-scrollbar">
        {/* Header with logo, date, and developer info */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-accent">
            S.E.R.E.N.A
          </h1>
          <span className="bg-calmGray text-calmPurple px-4 py-1 rounded-xl text-sm font-semibold shadow">{firstMsgDate}</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Developed with ❤️ by <span className="font-bold">Rohan Vanmali</span></span>
            <a href="https://www.linkedin.com/in/vanmalirohan20/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-calmBlue transition">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com/rohanvan19" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-calmPurple transition">
              <FaGithub size={20} />
            </a>
          </div>
        </div>
        {messages.map((msg: Message, i: number) => {
          // Only show date separator if the date changes between two consecutive messages (not for the first message)
          let dateSep = null;
          if (i > 0 && msg.created_at && messages[i - 1].created_at) {
            const prevDate = formatDate(messages[i - 1].created_at);
            const currDate = formatDate(msg.created_at);
            if (currDate !== prevDate) {
              dateSep = (
                <div className="flex justify-center my-4" key={`date-${i}`}> 
                  <span className="bg-calmGray text-calmPurple px-4 py-1 rounded-xl text-sm font-semibold shadow">{currDate}</span>
                </div>
              );
            }
          }
          return (
            <React.Fragment key={i}>
              {dateSep}
              <div className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-2xl ${msg.sender === 'user' ? 'bg-calmGreen' : 'bg-calmPurple'}`}>
                  {msg.sender === 'user' ? 'U' : 'S'}
                </div>
                <div className="flex flex-col justify-center">
                  <div className={`${msg.sender === 'user' ? 'bg-calmGreen/30' : 'bg-white/80'} rounded-2xl p-4 shadow max-w-xl flex flex-col`}>
                    <p className="text-black">{msg.content}</p>
                    <span className="text-[10px] text-gray-400 mt-1 self-end">{formatTime(msg.created_at)}</span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-2xl bg-calmPurple">
              S
            </div>
            <div className="bg-white/80 rounded-2xl p-4 shadow max-w-xl">
              <LoadingDots />
            </div>
          </div>
        )}
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-3xl font-extrabold text-accent mb-2 drop-shadow">Welcome to S.E.R.E.N.A <span>💬🤗🌱</span></div>
            <div className="text-lg text-calmPurple font-medium bg-calmGray/80 px-6 py-3 rounded-2xl shadow mt-2">To start chatting, type something in the text box below. <span>👇✨</span></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Typing box and suggestions container */}
      <div className="w-full flex flex-col items-center mt-4">
        <div className="w-full bg-white/90 shadow-lg rounded-2xl p-4 flex flex-col gap-2">
          <form className="flex gap-2" onSubmit={onSend}>
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-3 rounded-2xl border border-calmGray focus:outline-none focus:ring-2 focus:ring-accent bg-white/80"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="bg-accent text-white px-6 py-3 rounded-2xl font-semibold hover:bg-calmPurple transition flex items-center justify-center" disabled={loading || !input.trim()}>
              {loading ? '...' : <FiSend size={22} />}
            </button>
          </form>
          <Suggestions suggestions={suggestions} onSuggestionClick={onSuggestionClick} />
        </div>
      </div>
    </main>
  );
};

function App() {
  const [sessionId, setSessionId] = useState<string | null>(localStorage.getItem('serena_sessionId'));
  const [chatId, setChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  // On mount, restore sessionId
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('serena_sessionId', sessionId);
    }
  }, [sessionId]);

  // Persist chatId to localStorage
  useEffect(() => {
    if (chatId !== null) {
      localStorage.setItem('serena_chatId', chatId.toString());
    }
  }, [chatId]);

  // Restore chatId and fetch chat history on mount (after sessionId is set)
  useEffect(() => {
    const storedChatId = localStorage.getItem('serena_chatId');
    if (storedChatId && sessionId) {
      setChatId(Number(storedChatId));
      setSuggestions([]); // Clear suggestions before fetching new ones
      axios.get('http://localhost:3001/api/chat', {
        params: { sessionId, chatId: Number(storedChatId) }
      }).then(res => {
        setMessages(res.data.history);
        setSuggestions(res.data.suggestions || []);
      });
    }
  }, [sessionId]);

  // Send message to backend
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const userMsg: Message = { sender: 'user', content: input, created_at: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    try {
      const res = await axios.post('http://localhost:3001/api/chat', {
        sessionId,
        chatId,
        message: input,
      });
      if (res.data.sessionId && !sessionId) setSessionId(res.data.sessionId);
      if (res.data.chatId && !chatId) setChatId(res.data.chatId);
      setMessages(res.data.history);
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot' as const, content: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (s: Suggestion) => {
    setInput(s.title);
  };

  // New chat
  const handleNewChat = async () => {
    setChatId(null);
    setMessages([]);
    setSuggestions([]);
    localStorage.removeItem('serena_chatId');
    // Create a new chat and fetch its suggestions
    if (sessionId) {
      const res = await axios.post('http://localhost:3001/api/chat', {
        sessionId,
        chatId: null,
        message: '', // No message, just want to create chat and get suggestions
      });
      if (res.data.chatId) {
        setChatId(res.data.chatId);
        // Fetch suggestions and history for the new chat
        const getRes = await axios.get('http://localhost:3001/api/chat', {
          params: { sessionId, chatId: res.data.chatId }
        });
        setSuggestions(getRes.data.suggestions || []);
        setMessages(getRes.data.history || []);
      }
    }
  };

  return (
    <div className="flex h-screen font-sans" style={{ fontFamily: 'Inter, Segoe UI, system-ui, sans-serif' }}>
      <Sidebar onNewChat={handleNewChat} />
      <div className="flex flex-col flex-1">
        <ChatArea
          messages={messages}
          onSend={sendMessage}
          input={input}
          setInput={setInput}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
