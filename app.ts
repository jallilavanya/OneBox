import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import accounts from './routes/accounts';
import emails from './routes/emails';
import health from './routes/health';
import rag from './routes/rag';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api/accounts', accounts);
app.use('/api/emails', emails);
app.use('/api/health', health);
app.use('/api/rag', rag);

export default app;
