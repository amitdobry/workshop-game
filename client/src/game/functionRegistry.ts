/**
 * A human-readable registry of the meaningful functions in the CLIENT.
 * When you add a function that matters to the game, add it here too.
 */

export interface FunctionEntry {
  name: string;
  purpose: string;
  triggeredBy: string;
  changesOrReturns: string;
  livesIn: string;
  introducedIn: string;
}

export const clientFunctions: FunctionEntry[] = [
  {
    name: 'startGame()',
    purpose: 'Creates the initial game state with everyone standing on Start.',
    triggeredBy: 'The "New game" button',
    changesOrReturns: 'Returns a brand new GameState',
    livesIn: 'client/src/game/engine.ts',
    introducedIn: '0.1',
  },
  {
    name: 'rollDice()',
    purpose: 'Produces a number from 1 to 6.',
    triggeredBy: 'takeTurn()',
    changesOrReturns: 'Returns a number',
    livesIn: 'client/src/game/engine.ts',
    introducedIn: '0.1',
  },
  {
    name: 'movePlayer()',
    purpose: 'Moves the current pawn forward, never past Finish.',
    triggeredBy: 'takeTurn()',
    changesOrReturns: 'Returns a new GameState with one pawn in a new place',
    livesIn: 'client/src/game/engine.ts',
    introducedIn: '0.1',
  },
  {
    name: 'checkFinish()',
    purpose: 'Answers: has this pawn reached Finish?',
    triggeredBy: 'takeTurn()',
    changesOrReturns: 'Returns true or false',
    livesIn: 'client/src/game/engine.ts',
    introducedIn: '0.1',
  },
  {
    name: 'nextTurn()',
    purpose: 'Passes control to the next player and counts the turn.',
    triggeredBy: 'takeTurn()',
    changesOrReturns: 'Returns a new GameState with a new current player',
    livesIn: 'client/src/game/engine.ts',
    introducedIn: '0.1',
  },
  {
    name: 'takeTurn()',
    purpose: 'One whole turn: roll, move, check for a winner, hand over the dice.',
    triggeredBy: 'The "Roll dice" button',
    changesOrReturns: 'Returns the game state after the turn',
    livesIn: 'client/src/game/engine.ts',
    introducedIn: '0.1',
  },
];

/**
 * The turn sequence, in plain language, for the Engine Room.
 */
export const turnSequence: string[] = [
  'The current player presses "Roll dice".',
  'rollDice() produces a number from 1 to 6.',
  'movePlayer() moves that pawn forward by that many squares.',
  'checkFinish() asks whether the pawn reached Finish.',
  'If it did, the game is over and that player is the winner.',
  'If it did not, nextTurn() passes the dice to the next player.',
];
