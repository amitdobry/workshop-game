/**
 * Hard-coded choices.
 *
 * Nothing here can be changed without editing code and restarting the app.
 * That is the point: on Day 5 the class turns some of these into configuration.
 */

export interface HardCodedChoice {
  name: string;
  value: string;
  livesIn: string;
  couldBecomeConfigurable: boolean;
}

export const BOARD_SQUARES = 40;   // ordinary squares between Start and Finish
export const START_POSITION = 0;   // Start
export const FINISH_POSITION = BOARD_SQUARES + 1; // Finish
export const DICE_SIDES = 6;
export const PLAYER_COUNT = 3;     // between 2 and 4

export const PLAYER_COLORS = ['#e4572e', '#2e86ab', '#3fa34d', '#b5179e'];

export const hardCodedChoices: HardCodedChoice[] = [
  { name: 'Ordinary squares', value: String(BOARD_SQUARES), livesIn: 'client/src/game/config.ts', couldBecomeConfigurable: true },
  { name: 'Dice sides', value: String(DICE_SIDES), livesIn: 'client/src/game/config.ts', couldBecomeConfigurable: true },
  { name: 'Number of players', value: String(PLAYER_COUNT), livesIn: 'client/src/game/config.ts', couldBecomeConfigurable: true },
  { name: 'Player names', value: 'Player 1, Player 2, ...', livesIn: 'client/src/game/engine.ts', couldBecomeConfigurable: true },
  { name: 'Winning rule', value: 'Reach or pass Finish', livesIn: 'client/src/game/engine.ts', couldBecomeConfigurable: true },
];
