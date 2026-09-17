import type { GameEvent } from '../game/types';

export function ActivityFeed({ events }: { events: GameEvent[] }) {
  if (events.length === 0) {
    return <p className="muted">Nothing has happened yet.</p>;
  }

  return (
    <ul className="feed">
      {events.map((event) => (
        <li key={event.id}>
          <span className="feed-time">{new Date(event.time).toLocaleTimeString()}</span>
          {event.text}
        </li>
      ))}
    </ul>
  );
}
