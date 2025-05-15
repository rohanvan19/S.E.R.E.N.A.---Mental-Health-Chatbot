import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../lib/db';
import { v4 as uuidv4 } from 'uuid';
import { getGemmaResponse } from '../../lib/ollama';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // --- GET: fetch chat history without generating a new message ---
  if (req.method === 'GET') {
    const { sessionId, chatId } = req.query;
    if (!sessionId || !chatId) {
      return res.status(400).json({ error: 'Missing sessionId or chatId' });
    }
    const db = await getDb();
    const history = await db.all('SELECT sender, content, created_at FROM messages WHERE chat_id = ? ORDER BY id ASC', chatId);
    // Optionally fetch suggestions for this chat
    const suggestions = await db.all('SELECT type, title, url FROM suggestions WHERE chat_id = ? ORDER BY id ASC', chatId);
    return res.status(200).json({ history, suggestions });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const db = await getDb();
  let { sessionId, chatId, message } = req.body;

  // Create session if not provided
  if (!sessionId) {
    sessionId = uuidv4();
    await db.run('INSERT INTO sessions (id) VALUES (?)', sessionId);
  }

  // Define a pool of possible suggestions
  const suggestionsPool = [
    { type: 'article', title: 'Coping with Stress', url: '#' },
    { type: 'exercise', title: '5-Minute Meditation', url: '#' },
    { type: 'community', title: 'Support Group', url: '#' },
    { type: 'article', title: 'Building Resilience', url: '#' },
    { type: 'exercise', title: 'Gratitude Journaling', url: '#' },
    { type: 'community', title: 'Peer Chat', url: '#' },
    { type: 'article', title: 'Mindful Breathing', url: '#' },
    { type: 'exercise', title: 'Body Scan Relaxation', url: '#' },
    { type: 'community', title: 'Therapist Q&A', url: '#' },
    { type: 'article', title: 'Positive Self-Talk', url: '#' },
    { type: 'exercise', title: 'Progressive Muscle Relaxation', url: '#' },
    { type: 'community', title: 'Daily Check-In', url: '#' },
  ];

  // Create chat if not provided
  if (!chatId) {
    const result = await db.run('INSERT INTO chats (session_id) VALUES (?)', sessionId);
    chatId = result.lastID;
    // Insert initial 6 random suggestions for a new chat
    const shuffled = suggestionsPool.sort(() => 0.5 - Math.random());
    const suggestions = shuffled.slice(0, 6);
    for (const s of suggestions) {
      await db.run('INSERT INTO suggestions (chat_id, type, title, url) VALUES (?, ?, ?, ?)', chatId, s.type, s.title, s.url);
    }
  }

  // Remove old suggestions for this chat to prevent duplicates
  await db.run('DELETE FROM suggestions WHERE chat_id = ?', chatId);
  // Insert 6 random suggestions after each message or for new chat
  const shuffled = suggestionsPool.sort(() => 0.5 - Math.random());
  const suggestions = shuffled.slice(0, 6);
  for (const s of suggestions) {
    await db.run('INSERT INTO suggestions (chat_id, type, title, url) VALUES (?, ?, ?, ?)', chatId, s.type, s.title, s.url);
  }
  // Always keep only the latest 6 suggestions for this chat
  await db.run(`DELETE FROM suggestions WHERE chat_id = ? AND id NOT IN (SELECT id FROM suggestions WHERE chat_id = ? ORDER BY id DESC LIMIT 6)`, chatId, chatId);

  // If message is empty, only create chat and suggestions, do not store message or generate bot response
  if (!message) {
    // Get chat history (should be empty)
    const history = await db.all('SELECT sender, content, created_at FROM messages WHERE chat_id = ? ORDER BY id ASC', chatId);
    return res.status(200).json({
      sessionId,
      chatId,
      response: '',
      history,
      suggestions,
    });
  }

  // Store user message
  await db.run('INSERT INTO messages (chat_id, sender, content) VALUES (?, ?, ?)', chatId, 'user', message);

  // Build conversation history for context
  const historyRows = await db.all('SELECT sender, content FROM messages WHERE chat_id = ? ORDER BY id ASC', chatId);
  const gemmaMessages = historyRows.map((row: any) => ({
    role: row.sender === 'user' ? 'user' as const : 'assistant' as const,
    content: row.content as string,
  }));

  // Get AI response from Gemma
  let botResponse = '';
  try {
    botResponse = await getGemmaResponse(gemmaMessages);
  } catch (e) {
    console.error('Ollama error:', e);
    botResponse = 'Sorry, I am having trouble responding right now.';
  }
  await db.run('INSERT INTO messages (chat_id, sender, content) VALUES (?, ?, ?)', chatId, 'bot', botResponse);

  // Get chat history
  const history = await db.all('SELECT sender, content, created_at FROM messages WHERE chat_id = ? ORDER BY id ASC', chatId);

  res.status(200).json({
    sessionId,
    chatId,
    response: botResponse,
    history,
    suggestions,
  });
} 