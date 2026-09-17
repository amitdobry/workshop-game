import { MongoClient, Db } from 'mongodb';

/**
 * The game connects to MongoDB, but it does not use it yet.
 *
 * This list is the single source of truth for "which collections does the game
 * actually use?". It is empty on purpose. When the class teaches the game to
 * remember things, a collection name gets added here and the Engine Room
 * Database panel starts reporting real numbers.
 */
export const GAME_COLLECTIONS: string[] = [];

export type ConnectionState = 'connected' | 'disconnected' | 'error';

let client: MongoClient | null = null;
let db: Db | null = null;
let state: ConnectionState = 'disconnected';
let lastError: string | null = null;
let connectedAt: string | null = null;

export async function connectToMongo(uri: string, dbName: string): Promise<void> {
  try {
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    db = client.db(dbName);
    state = 'connected';
    lastError = null;
    connectedAt = new Date().toISOString();
  } catch (err) {
    state = 'error';
    lastError = err instanceof Error ? err.message : String(err);
    db = null;
  }
}

export function getDb(): Db | null {
  return db;
}

export interface DatabaseReport {
  connection: ConnectionState;
  /** Never the URI. Only the database name. */
  databaseName: string | null;
  connectedAt: string | null;
  error: string | null;
  collectionsUsedByGame: string[];
  documentCounts: Record<string, number>;
  gamesSaved: number;
  playersSaved: number;
  whatDoesMongoRemember: string;
}

/**
 * Builds the Database panel from what is really true right now.
 * Because GAME_COLLECTIONS is empty, every count below is genuinely derived
 * from an empty loop - not a hard-coded zero.
 */
export async function buildDatabaseReport(dbName: string): Promise<DatabaseReport> {
  const documentCounts: Record<string, number> = {};

  if (db && state === 'connected') {
    for (const name of GAME_COLLECTIONS) {
      documentCounts[name] = await db.collection(name).countDocuments();
    }
  }

  const gamesSaved = documentCounts['games'] ?? 0;
  const playersSaved = documentCounts['players'] ?? 0;

  return {
    connection: state,
    databaseName: state === 'connected' ? dbName : null,
    connectedAt,
    error: lastError,
    collectionsUsedByGame: GAME_COLLECTIONS,
    documentCounts,
    gamesSaved,
    playersSaved,
    whatDoesMongoRemember:
      GAME_COLLECTIONS.length === 0
        ? 'NOTHING. The connection is open, but the game never writes to it.'
        : `Documents in: ${GAME_COLLECTIONS.join(', ')}`,
  };
}

export async function closeMongo(): Promise<void> {
  await client?.close();
  client = null;
  db = null;
  state = 'disconnected';
}
