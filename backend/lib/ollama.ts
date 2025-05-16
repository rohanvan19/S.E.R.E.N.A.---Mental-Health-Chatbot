import fetch from 'node-fetch';

const GEMMA_SYSTEM_PROMPT = `You are Serena, a compassionate, positive, and motivational mental health assistant. Always acknowledge what the user says before responding. Your tone is gentle, supportive, and encouraging. Use emojis to soften your tone and make the user feel safe and cared for. Suggest helpful resources when appropriate.`;

export async function getGemmaResponse(messages: { role: 'user' | 'assistant' | 'system', content: string }[]) {
  const response = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gemma3',
      messages: [
        { role: 'system', content: GEMMA_SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true
    })
  });
  if (!response.ok || !response.body) {
    throw new Error('Failed to get response from Gemma');
  }

  // Node.js stream version
  let result = '';
  const body = response.body as NodeJS.ReadableStream;
  return new Promise<string>((resolve, reject) => {
    body.on('data', (chunk: Buffer) => {
      const lines = chunk.toString('utf8').split('\n').filter(Boolean);
      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.message && json.message.content) {
            result += json.message.content;
          }
        } catch {}
      }
    });
    body.on('end', () => resolve(result.trim()));
    body.on('error', reject);
  });
} 