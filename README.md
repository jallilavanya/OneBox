# ReachInbox Assignment - Full Implementation Scaffold (RAG included)

This scaffold implements the full assignment features:
1. Real-time IMAP sync (IDLE) for multiple accounts (using imapflow).
2. Fetches last 30 days of emails on initial sync.
3. Elasticsearch indexing (Docker Compose included).
4. Postgres storage with `pgvector` support for embeddings.
5. AI categorization using OpenAI (chat completions).
6. Slack + webhook.site notifications for "Interested" emails.
7. Frontend (React + Vite) for search, filtering, and labels.
8. RAG-powered suggested replies using OpenAI embeddings + pgvector retrieval.

**Important:** This is a scaffold with ready-to-run code. You still need to:
- Run `docker-compose up -d` to start Elasticsearch and Postgres.
- Install backend and frontend dependencies (`npm install` in each folder).
- Create `.env` files with your credentials (OpenAI key, Slack webhook, webhook.site URL).

Preview the backend README at `backend/README.md` for full commands and Postman info.
