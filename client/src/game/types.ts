export type GameStatus = 'not-started' | 'playing' | 'finished';

export interface Player {
  id: string;
  name: string;
  color: string;
  position: number; // 0 = Start, FINISH_POSITION = Finish
}

export interface GameEvent {
  id: number;
  time: string;      // ISO timestamp
  kind: 'game' | 'roll' | 'move' | 'turn' | 'win';
  text: string;      // written for a human to read
}

export interface GameState {
  status: GameStatus;
  players: Player[];
  currentPlayerIndex: number;
  turnNumber: number;
  lastRoll: number | null;
  winnerId: string | null;
  events: GameEvent[];
}
