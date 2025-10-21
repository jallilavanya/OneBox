import config from '../config';
import axios from 'axios';

export async function getEmbedding(text: string) {
  if (!config.openaiKey) return null;
  const resp = await axios.post('https://api.openai.com/v1/embeddings', {
    model: 'text-embedding-3-large',
    input: text
  }, { headers: { Authorization: `Bearer ${config.openaiKey}` }});
  return resp.data.data[0].embedding as number[];
}
