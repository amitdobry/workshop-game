/**
 * A human-readable registry of the meaningful functions that live on the SERVER.
 * When you add a function that matters to the game, add it here too.
 * This is documentation for people, not a dump of source code.
 */

export interface FunctionEntry {
  name: string;
  purpose: string;
  triggeredBy: string;
  changesOrReturns: string;
  livesIn: string;
  introducedIn: string;
}

export const serverFunctions: FunctionEntry[] = [
  {
    name: 'loadConfig()',
    purpose: 'Reads configuration from environment variables and refuses to start without the required ones.',
    triggeredBy: 'Server startup',
    changesOrReturns: 'Returns port, Mongo URI and database name',
    livesIn: 'server/src/config.ts',
    introducedIn: '0.1',
  },
  {
    name: 'connectToMongo()',
    purpose: 'Opens the connection to MongoDB and pings it once to prove it really works.',
    triggeredBy: 'Server startup',
    changesOrReturns: 'Sets the connection state to connected or error',
    livesIn: 'server/src/database/mongo.ts',
    introducedIn: '0.1',
  },
  {
    name: 'buildDatabaseReport()',
    purpose: 'Answers the question "what does our database actually remember right now?" by counting documents in the collections the game uses.',
    triggeredBy: 'GET /api/engine-room/database',
    changesOrReturns: 'Returns connection state, collection names and document counts',
    livesIn: 'server/src/database/mongo.ts',
    introducedIn: '0.1',
  },
];
