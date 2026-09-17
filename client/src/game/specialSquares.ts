/**
 * Special squares invented by the class live here.
 *
 * The list is empty on purpose. Every square on our board behaves the same way:
 * you land on it, and nothing happens.
 */

export interface SpecialSquare {
  square: number;
  name: string;
  whatHappens: string;
}

export const specialSquares: SpecialSquare[] = [];
