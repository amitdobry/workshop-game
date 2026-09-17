/**
 * Everything the client asks the server for goes through this file.
 */

export interface DatabaseReport {
  connection: 'connected' | 'disconnected' | 'error';
  databaseName: string | null;
  connectedAt: string | null;
  error: string | null;
  collectionsUsedByGame: string[];
  documentCounts: Record<string, number>;
  gamesSaved: number;
  playersSaved: number;
  whatDoesMongoRemember: string;
}

export interface ServerFunctionEntry {
  name: string;
  purpose: string;
  triggeredBy: string;
  changesOrReturns: string;
  livesIn: string;
  introducedIn: string;
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} answered ${response.status}`);
  return (await response.json()) as T;
}

export const fetchDatabaseReport = () =>
  getJson<DatabaseReport>('/api/engine-room/database');

export const fetchServerFunctions = () =>
  getJson<{ functions: ServerFunctionEntry[] }>('/api/engine-room/functions');

export interface TestRun {
  startTime?: number;
  numTotalTests?: number;
  numPassedTests?: number;
  numFailedTests?: number;
  success?: boolean;
}

/**
 * Reads the report written by `npm run test:report`.
 * If nobody has run the tests, this file does not exist - and the Engine Room
 * must say so instead of inventing a result.
 */
export async function fetchTestRun(): Promise<TestRun | null> {
  try {
    const response = await fetch('/test-results.json');
    if (!response.ok) return null;
    return (await response.json()) as TestRun;
  } catch {
    return null;
  }
}
