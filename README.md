# Backend README (Full)

1. Start services:
   - `docker-compose up -d` (from project root) to start Elasticsearch and Postgres.
2. Prepare Postgres pgvector extension:
   - Connect to Postgres (`psql`) and run: `CREATE EXTENSION IF NOT EXISTS vector;`
3. Install & run backend:
   - `cd backend && npm install`
   - Copy `.env.example` to `.env` and fill values.
   - `npm run dev`

Database schema automatically created on startup (accounts, emails, embeddings).

Key endpoints (Postman friendly):
- POST /api/accounts            -- add account (body includes accountId, host, port, secure, username, password)
- POST /api/accounts/start/:id  -- start IMAP sync for account
- GET  /api/emails?q=&accountId=&folder=  -- search via Elasticsearch
- GET  /api/emails/:id          -- get email from Postgres
- POST /api/emails/:id/label    -- override label
- POST /api/rag/docs            -- add product/outreach doc to vector DB
- POST /api/rag/suggest/:emailId -- suggest reply for given email id using RAG

See code for implementation details.
