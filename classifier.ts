import config from '../config';
import axios from 'axios';
import { EmailDoc } from '../types';

export const LABELS = ['Interested', 'Meeting Booked', 'Not Interested', 'Spam', 'Out of Office'];

export async function categorizeEmail(email: EmailDoc) {
  if (!config.openaiKey) return 'Unknown';
  const prompt = `Classify the following email into exactly one of these labels: ${LABELS.join(', ')}.
Return only the label.

Subject: ${email.subject}
Body: ${email.raw.slice(0, 2000)}`;

  const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are an email classifier.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0,
    max_tokens: 10
  }, {
    headers: { Authorization: `Bearer ${config.openaiKey}` }
  });

  const labelRaw = resp.data.choices?.[0]?.message?.content?.trim?.();
  if (!labelRaw) return 'Unknown';
  const found = LABELS.find(l => labelRaw.toLowerCase().includes(l.toLowerCase()));
  return found || 'Unknown';
}
