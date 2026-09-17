import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGameContext } from '../game/GameContext';
import { clientFunctions, turnSequence } from '../game/functionRegistry';
import { hardCodedChoices } from '../game/config';
import { specialSquares } from '../game/specialSquares';
import { buildJournal } from './buildJournal';
import {
  fetchDatabaseReport,
  fetchServerFunctions,
  fetchTestRun,
  type DatabaseReport,
  type ServerFunctionEntry,
  type TestRun,
} from '../services/api';

/**
 * The Engine Room is an X-ray of this application.
 * It answers one question: what is making our game work right now?
 *
 * Rule: it may only show things that are really true.
 */

export function EngineRoom() {
  const { state } = useGameContext();
  const [database, setDatabase] = useState<DatabaseReport | null>(null);
  const [databaseError, setDatabaseError] = useState<string | null>(null);
  const [serverFunctions, setServerFunctions] = useState<ServerFunctionEntry[]>([]);
  const [testRun, setTestRun] = useState<TestRun | null>(null);

  useEffect(() => {
    fetchDatabaseReport()
      .then(setDatabase)
      .catch((err: Error) => setDatabaseError(err.message));
    fetchServerFunctions()
      .then((result) => setServerFunctions(result.functions))
      .catch(() => setServerFunctions([]));
    fetchTestRun().then(setTestRun);
  }, []);

  const currentPlayer = state.players[state.currentPlayerIndex];
  const transitions = state.events.filter((e) => e.kind === 'turn' || e.kind === 'win').slice(0, 5);

  return (
    <div className="page">
      <header className="page-header">
        <h1>Engine Room</h1>
        <Link to="/">Back to the game</Link>
      </header>
      <p className="muted">What is making our game work right now?</p>

      <section className="panel">
        <h2>1. Live State</h2>
        {state.status === 'not-started' ? (
          <p>No game is running. Nothing to show yet.</p>
        ) : (
          <table>
            <tbody>
              <tr><td>Status</td><td>{state.status}</td></tr>
              <tr><td>Current player</td><td>{currentPlayer ? currentPlayer.name : '-'}</td></tr>
              <tr><td>Last roll</td><td>{state.lastRoll ?? '-'}</td></tr>
              <tr><td>Turn number</td><td>{state.turnNumber}</td></tr>
              {state.players.map((p) => (
                <tr key={p.id}><td>{p.name} position</td><td>{p.position}</td></tr>
              ))}
              <tr>
                <td>Winner</td>
                <td>{state.winnerId ? state.players.find((p) => p.id === state.winnerId)?.name : 'none yet'}</td>
              </tr>
            </tbody>
          </table>
        )}
        <p className="muted">
          This state lives in the browser's memory only. Refresh the page and it is gone.
        </p>
      </section>

      <section className="panel">
        <h2>2. Turn Engine</h2>
        <ol>
          {turnSequence.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <h3>Latest transitions</h3>
        {transitions.length === 0 ? (
          <p className="muted">No turns have been handed over yet.</p>
        ) : (
          <ul>{transitions.map((e) => <li key={e.id}>{e.text}</li>)}</ul>
        )}
      </section>

      <section className="panel">
        <h2>3. Functions</h2>
        <h3>In the client (the part running in your browser)</h3>
        <FunctionTable entries={clientFunctions} />
        <h3>On the server</h3>
        {serverFunctions.length === 0 ? (
          <p className="muted">The server did not answer, so its function list cannot be shown.</p>
        ) : (
          <FunctionTable entries={serverFunctions} />
        )}
      </section>

      <section className="panel">
        <h2>4. Database</h2>
        {databaseError && <p className="bad">Could not reach the server: {databaseError}</p>}
        {!database && !databaseError && <p className="muted">Asking the server...</p>}
        {database && (
          <table>
            <tbody>
              <tr>
                <td>MongoDB connection</td>
                <td className={database.connection === 'connected' ? 'good' : 'bad'}>
                  {database.connection.toUpperCase()}
                </td>
              </tr>
              <tr><td>Database name</td><td>{database.databaseName ?? '-'}</td></tr>
              <tr>
                <td>Collections used by the game</td>
                <td>{database.collectionsUsedByGame.length === 0 ? 'NONE' : database.collectionsUsedByGame.join(', ')}</td>
              </tr>
              <tr><td>Games saved</td><td>{database.gamesSaved}</td></tr>
              <tr><td>Players saved</td><td>{database.playersSaved}</td></tr>
              <tr><td>What does MongoDB currently remember?</td><td>{database.whatDoesMongoRemember}</td></tr>
              {database.error && <tr><td>Connection error</td><td className="bad">{database.error}</td></tr>}
            </tbody>
          </table>
        )}
      </section>

      <section className="panel">
        <h2>5. Configuration</h2>
        <p>
          This application is <strong>not configurable</strong>. Every choice below is written in
          the code. To change one you must edit a file and restart the app.
        </p>
        <table>
          <thead><tr><th>Choice</th><th>Value</th><th>Lives in</th></tr></thead>
          <tbody>
            {hardCodedChoices.map((choice) => (
              <tr key={choice.name}>
                <td>{choice.name}</td>
                <td>{choice.value}</td>
                <td><code>{choice.livesIn}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <h2>6. Special Squares</h2>
        {specialSquares.length === 0 ? (
          <p><strong>None yet. Our board currently has no special behavior.</strong></p>
        ) : (
          <table>
            <thead><tr><th>Square</th><th>Name</th><th>What happens</th></tr></thead>
            <tbody>
              {specialSquares.map((s) => (
                <tr key={s.square}><td>{s.square}</td><td>{s.name}</td><td>{s.whatHappens}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="panel">
        <h2>7. Event History</h2>
        {state.events.length === 0 ? (
          <p className="muted">Nothing has happened yet.</p>
        ) : (
          <ul className="feed">
            {state.events.map((e) => (
              <li key={e.id}>
                <span className="feed-time">{new Date(e.time).toLocaleTimeString()}</span>
                <span className="feed-kind">{e.kind}</span>
                {e.text}
              </li>
            ))}
          </ul>
        )}
        <p className="muted">This history disappears with the page too.</p>
      </section>

      <section className="panel">
        <h2>8. Tests</h2>
        {!testRun ? (
          <p className="muted">
            No test run has been recorded. Run <code>npm run test:report</code> inside{' '}
            <code>client/</code> and reload this page.
          </p>
        ) : (
          <table>
            <tbody>
              <tr>
                <td>Result</td>
                <td className={testRun.success ? 'good' : 'bad'}>
                  {testRun.success ? 'PASSED' : 'FAILED'}
                </td>
              </tr>
              <tr><td>Tests run</td><td>{testRun.numTotalTests ?? '-'}</td></tr>
              <tr><td>Passed</td><td>{testRun.numPassedTests ?? '-'}</td></tr>
              <tr><td>Failed</td><td>{testRun.numFailedTests ?? '-'}</td></tr>
              <tr>
                <td>Last run</td>
                <td>{testRun.startTime ? new Date(testRun.startTime).toLocaleString() : '-'}</td>
              </tr>
            </tbody>
          </table>
        )}
        <p className="muted">
          What is protected: the dice range, movement, the finish check and turn rotation
          (<code>client/src/game/engine.test.ts</code>).
        </p>
      </section>

      <section className="panel">
        <h2>9. Build Journal</h2>
        {buildJournal.map((entry) => (
          <div key={entry.version}>
            <h3>Version {entry.version} &mdash; {entry.title}</h3>
            <ul className="journal">
              {entry.done.map((item) => <li key={item} className="good">done: {item}</li>)}
              {entry.notYet.map((item) => <li key={item} className="muted">not yet: {item}</li>)}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

function FunctionTable({ entries }: { entries: ServerFunctionEntry[] }) {
  return (
    <table>
      <thead>
        <tr><th>Function</th><th>What it does</th><th>What starts it</th><th>What it changes or returns</th><th>Where it lives</th></tr>
      </thead>
      <tbody>
        {entries.map((fn) => (
          <tr key={fn.name}>
            <td><code>{fn.name}</code></td>
            <td>{fn.purpose}</td>
            <td>{fn.triggeredBy}</td>
            <td>{fn.changesOrReturns}</td>
            <td><code>{fn.livesIn}</code></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
