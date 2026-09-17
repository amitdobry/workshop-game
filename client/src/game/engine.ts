import { DICE_SIDES, FINISH_POSITION, PLAYER_COLORS, PLAYER_COUNT, START_POSITION } from './config';
import type { GameEvent, GameState, Player } from './types';

/**
 * The rules of the game. Every function here is pure:
 * it takes a state, and returns a NEW state. It never touches the screen,
 * the server or the database.
 */

let nextEventId = 1;

function addEvent(state: GameState, kind: GameEvent['kind'], text: string): GameState {
  const event: GameEvent = {
    id: nextEventId++,
    time: new Date().toISOString(),
    kind,
    text,
  };
  return { ...state, events: [event, ...state.events].slice(0, 50) };
}

/** Creates the very first state of a game. Everyone stands on Start. */
export function startGame(playerCount: number = PLAYER_COUNT): GameState {
  const players: Player[] = [];
  for (let i = 0; i < playerCount; i++) {
    players.push({
      id: `p${i + 1}`,
      name: `Player ${i + 1}`,
      color: PLAYER_COLORS[i % PLAYER_COLORS.length],
      position: START_POSITION,
    });
  }

  const fresh: GameState = {
    status: 'playing',
    players,
    currentPlayerIndex: 0,
    turnNumber: 1,
    lastRoll: null,
    winnerId: null,
    events: [],
  };

  return addEvent(fresh, 'game', `A new game started with ${playerCount} players.`);
}

/** Produces a number from 1 to DICE_SIDES. */
export function rollDice(sides: number = DICE_SIDES): number {
  return Math.floor(Math.random() * sides) + 1;
}

/** Moves the current pawn forward. It never goes past Finish. */
export function movePlayer(state: GameState, steps: number): GameState {
  if (state.status !== 'playing') return state;

  const player = state.players[state.currentPlayerIndex];
  const target = Math.min(player.position + steps, FINISH_POSITION);

  const players = state.players.map((p, i) =>
    i === state.currentPlayerIndex ? { ...p, position: target } : p
  );

  let next: GameState = { ...state, players, lastRoll: steps };
  next = addEvent(next, 'move', `${player.name} moved ${steps} to square ${target}.`);
  return next;
}

/** Has this player reached Finish? */
export function checkFinish(position: number): boolean {
  return position >= FINISH_POSITION;
}

/** Passes control to the next player. */
export function nextTurn(state: GameState): GameState {
  if (state.status !== 'playing') return state;

  const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
  const next: GameState = {
    ...state,
    currentPlayerIndex: nextIndex,
    turnNumber: state.turnNumber + 1,
  };
  return addEvent(next, 'turn', `It is now ${state.players[nextIndex].name}'s turn.`);
}

/**
 * One complete turn: roll, move, check for a winner, and hand over the dice.
 * This is the function the Roll button calls.
 */
export function takeTurn(state: GameState, roll: number = rollDice()): GameState {
  if (state.status !== 'playing') return state;

  const player = state.players[state.currentPlayerIndex];
  let next = addEvent(state, 'roll', `${player.name} rolled ${roll}.`);
  next = movePlayer(next, roll);

  const movedPlayer = next.players[next.currentPlayerIndex];
  if (checkFinish(movedPlayer.position)) {
    next = { ...next, status: 'finished', winnerId: movedPlayer.id };
    return addEvent(next, 'win', `${movedPlayer.name} reached Finish and won.`);
  }

  return nextTurn(next);
}
