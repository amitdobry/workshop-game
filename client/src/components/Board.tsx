import { BOARD_SQUARES, FINISH_POSITION, START_POSITION } from '../game/config';
import type { Player } from '../game/types';

interface BoardProps {
  players: Player[];
}

export function Board({ players }: BoardProps) {
  const squares = [];
  for (let i = START_POSITION; i <= FINISH_POSITION; i++) {
    squares.push(i);
  }

  return (
    <div className="board">
      {squares.map((square) => {
        const isStart = square === START_POSITION;
        const isFinish = square === FINISH_POSITION;
        const here = players.filter((p) => p.position === square);

        return (
          <div
            key={square}
            className={`square${isStart ? ' square-start' : ''}${isFinish ? ' square-finish' : ''}`}
          >
            <span className="square-label">
              {isStart ? 'Start' : isFinish ? 'Finish' : square}
            </span>
            <span className="square-pawns">
              {here.map((p) => (
                <span key={p.id} className="pawn" style={{ background: p.color }} title={p.name} />
              ))}
            </span>
          </div>
        );
      })}
      <p className="board-note">
        {BOARD_SQUARES} ordinary squares. None of them do anything yet.
      </p>
    </div>
  );
}
