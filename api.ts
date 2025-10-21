import axios from 'axios';

// Change this line from port 4000 to use relative path for proxy:
const api = axios.create({ baseURL: '/api' }); // Remove 'http://localhost:4000'

export async function searchEmails(q = '', accountId) {
  const params = { q };
  if (accountId) params['accountId'] = accountId;
  const r = await api.get('/emails', { params });
  return r.data;
}

export async function getEmail(id) {
  const r = await api.get(`/emails/${id}`);
  return r.data;
}

export async function suggestReply(emailId) {
  const r = await api.post(`/rag/suggest/${emailId}`);
  return r.data.suggestion;
}