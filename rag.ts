import { getEmbedding } from './embeddings';
import { saveEmbedding, querySimilar } from '../db/embeddingsRepo';
import config from '../config';
import axios from 'axios';

// Store a product/outreach doc into vector DB (Postgres pgvector)
export async function addDoc(namespace: string, docId: string, content: string) {
  const emb = await getEmbedding(content);
  if (!emb) throw new Error('no embedding');
  await saveEmbedding(namespace, docId, content, emb);
  return { ok: true };
}

// Generate suggested reply for an email text by retrieving context and asking OpenAI
export async function suggestReplyForEmail(emailText: string, emailId: string) {
  // retrieve top-k docs from embeddings table
  const emb = await getEmbedding(emailText);
  if (!emb) throw new Error('no embedding');
  const neighbors = await querySimilar('product', emb, 5);
  const contexts = neighbors.map(n => n.content).join('\n---\n');
  const prompt = `You are an assistant that crafts a polite, concise reply to the following email using the product/outreach context below when relevant. If the lead looks interested, include the meeting booking link: https://cal.com/example

Email:
${emailText}

Context (retrieved):
${contexts}

Write a single suggested reply.`;
  const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
    max_tokens: 300,
    temperature: 0.2
  }, { headers: { Authorization: `Bearer ${config.openaiKey}` }});
  const reply = resp.data.choices[0].message.content.trim();
  return reply;
}
