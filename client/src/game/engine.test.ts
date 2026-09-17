import { describe, it, expect } from 'vitest';
import { startGame, rollDice, movePlayer, nextTurn, checkFinish, takeTurn } from './engine';
import { DICE_SIDES, FINISH_POSITION, START_POSITION } from './config';

describe('startGame', () => {
  it('puts every player on Start', () => {
    const state = startGame(3);
    expect(state.players).toHaveLength(3);
    expect(state.players.every((p) => p.position === START_POSITION)).toBe(true);
    expect(state.status).toBe('playing');
  });
});

describe('rollDice', () => {
  it('only ever returns 1 to 6', () => {
    for (let i = 0; i < 500; i++) {
      const roll = rollDice();
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(DICE_SIDES);
    }
  });
});

describe('movePlayer', () => {
  it('moves the current player forward', () => {
    const state = movePlayer(startGame(2), 4);
    expect(state.players[0].position).toBe(4);
    expect(state.players[1].position).toBe(0);
  });

  it('never moves a pawn past Finish', () => {
    const state = movePlayer(startGame(2), FINISH_POSITION + 10);
    expect(state.players[0].position).toBe(FINISH_POSITION);
  });
});

describe('nextTurn', () => {
  it('goes around in order and comes back to the first player', () => {
    let state = startGame(2);
    state = nextTurn(state);
    expect(state.currentPlayerIndex).toBe(1);
    state = nextTurn(state);
    expect(state.currentPlayerIndex).toBe(0);
    expect(state.turnNumber).toBe(3);
  });
});

describe('checkFinish', () => {
  it('is only true at or past Finish', () => {
    expect(checkFinish(FINISH_POSITION - 1)).toBe(false);
    expect(checkFinish(FINISH_POSITION)).toBe(true);
  });
});

describe('takeTurn', () => {
  it('declares a winner when a player reaches Finish', () => {
    let state = startGame(2);
    state = movePlayer(state, FINISH_POSITION - 1);
    state = takeTurn(state, 1);
    expect(state.status).toBe('finished');
    expect(state.winnerId).toBe('p1');
  });

  it('passes the turn on when nobody has won', () => {
    const state = takeTurn(startGame(2), 3);
    expect(state.status).toBe('playing');
    expect(state.currentPlayerIndex).toBe(1);
  });
});
