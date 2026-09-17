import express from 'express';
import cors from 'cors';
import { loadConfig } from './config.js';
import { connectToMongo, closeMongo } from './database/mongo.js';
import { healthRouter } from './routes/health.js';
import { createEngineRoomRouter } from './routes/engineRoom.js';

async function main() {
  let config;
  try {
    config = loadConfig();
  } catch (err) {
    console.error('\n[server] Cannot start.');
    console.error('[server]', err instanceof Error ? err.message : err);
    process.exit(1);
    return;
  }

  // The connection is opened here. Nothing is ever written to it yet.
  await connectToMongo(config.mongoUri, config.mongoDbName);

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api/health', healthRouter);
  app.use('/api/engine-room', createEngineRoomRouter(config.mongoDbName));

  const server = app.listen(config.port, () => {
    console.log(`[server] listening on http://localhost:${config.port}`);
  });

  const shutdown = async () => {
    server.close();
    await closeMongo();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main();
