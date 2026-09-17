# Sprints and Quick Wins

Every change to this project starts as a Quick Win. Copy the template below,
fill in the top half BEFORE building, and the bottom half after.

Cycle: IDEA -> DISCUSS -> DOD -> FIND -> BUILD -> TEST -> EXPLAIN -> ENGINE ROOM

## Parking lot

### Next Sprint
-

### Version 2
-

### Experiment
-

---

## Quick Win template

```md
## Quick Win: [short outcome]

### Problem
[What cannot the user do or understand?]

### Architectural lesson
[The one main concept this exposes]

### DOD
- [ ]
- [ ]

### Where we expect to work
- UI:
- State/logic:
- API/server:
- Database:
- Tests:
- Engine Room:

### What changed
[Completed after implementation]

### How we tested it
[Real evidence]

### Student explanation
[Plain-language trace]
```

---

## Day 2 - candidate Quick Wins (not yet accepted)

These are candidates only. The class discusses, scopes and accepts them in the room.

1. Display the current game state clearly in the Engine Room.
2. Define the shape of a game snapshot.
3. Save one snapshot to MongoDB.
4. Load that snapshot through the server API.
5. Rebuild the board from the loaded snapshot.
6. Update the Database panel and Build Journal truthfully.
