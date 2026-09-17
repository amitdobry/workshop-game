import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './game/GameContext';
import { GamePage } from './components/GamePage';
import { EngineRoom } from './engine-room/EngineRoom';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <GameProvider>
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="/engine-room" element={<EngineRoom />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}
