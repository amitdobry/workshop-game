import { createContext, useContext, useState, type ReactNode } from 'react';
import { startGame, takeTurn } from './engine';
import type { GameState } from './types';

/**
 * The game state lives HERE, in one place, in the browser's memory.
 * The game screen and the Engine Room both read this same state.
 *
 * Nothing here is sent to a server or written to a database, so a refresh
 * wipes it out completely.
 */

const emptyState: GameState = {
  status: 'not-started',
  players: [],
  currentPlayerIndex: 0,
  turnNumber: 0,
  lastRoll: null,
  winnerId: null,
  events: [],
};

interface GameContextValue {
  state: GameState;
  newGame: () => void;
  roll: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(emptyState);

  const value: GameContextValue = {
    state,
    newGame: () => setState(startGame()),
    roll: () => setState((current) => takeTurn(current)),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext(): GameContextValue {
  const value = useContext(GameContext);
  if (!value) throw new Error('useGameContext must be used inside a GameProvider');
  return value;
}
