import dotenv from 'dotenv';
dotenv.config();
export default {
  port: process.env.PORT || 4000,
  esUrl: process.env.ES_URL || 'http://localhost:9200',
  dbUrl: process.env.DATABASE_URL || '',
  openaiKey: process.env.OPENAI_API_KEY || '',
  slackWebhook: process.env.SLACK_INCOMING_WEBHOOK || '',
  webhookSite: process.env.WEBHOOK_SITE_URL || ''
};
