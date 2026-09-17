import { Router } from 'express';
import { buildDatabaseReport } from '../database/mongo.js';
import { serverFunctions } from '../services/functionRegistry.js';

export function createEngineRoomRouter(dbName: string): Router {
  const router = Router();

  // What does the database really hold at this moment?
  router.get('/database', async (_req, res) => {
    const report = await buildDatabaseReport(dbName);
    res.json(report);
  });

  // Which server-side functions matter, in plain language?
  router.get('/functions', (_req, res) => {
    res.json({ functions: serverFunctions });
  });

  return router;
}
