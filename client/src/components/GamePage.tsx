import { Link } from 'react-router-dom';
import { useGameContext } from '../game/GameContext';
import { Board } from './Board';
import { DiceRoller } from './DiceRoller';
import { TurnIndicator } from './TurnIndicator';
import { ActivityFeed } from './ActivityFeed';

export function GamePage() {
  const { state, newGame, roll } = useGameContext();

  return (
    <div className="page">
      <header className="page-header">
        <h1>Workshop Game</h1>
        <Link to="/engine-room">Engine Room</Link>
      </header>

      <TurnIndicator state={state} />
      <DiceRoller state={state} onRoll={roll} onNewGame={newGame} />
      <Board players={state.players} />

      <section>
        <h2>Activity</h2>
        <ActivityFeed events={state.events} />
      </section>
    </div>
  );
}
