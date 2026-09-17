import type { GameState } from '../game/types';

export function TurnIndicator({ state }: { state: GameState }) {
  if (state.status === 'not-started') {
    return <p className="turn-indicator">No game yet. Press "New game".</p>;
  }

  if (state.status === 'finished') {
    const winner = state.players.find((p) => p.id === state.winnerId);
    return (
      <p className="turn-indicator">
        <span className="pawn" style={{ background: winner?.color }} /> {winner?.name} won.
      </p>
    );
  }

  const current = state.players[state.currentPlayerIndex];
  return (
    <p className="turn-indicator">
      Turn {state.turnNumber} &mdash;{' '}
      <span className="pawn" style={{ background: current.color }} /> {current.name}&rsquo;s turn
    </p>
  );
}
