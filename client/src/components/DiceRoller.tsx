import type { GameState } from '../game/types';

interface DiceRollerProps {
  state: GameState;
  onRoll: () => void;
  onNewGame: () => void;
}

export function DiceRoller({ state, onRoll, onNewGame }: DiceRollerProps) {
  return (
    <div className="dice-roller">
      <button onClick={onNewGame}>New game</button>
      <button onClick={onRoll} disabled={state.status !== 'playing'}>
        Roll dice
      </button>
      <span className="dice-value">{state.lastRoll ?? '-'}</span>
    </div>
  );
}
