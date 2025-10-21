import { initDb } from './db';
import { ensureIndex } from './indexer/esClient';

export async function startup() {
  await initDb();
  await ensureIndex();
  console.log('DB and ES ready');
}
