# Workshop Game - Version 0.1, The Skeleton

The shared class game for Days 2-5 of the AI Workshop.

Right now it is deliberately boring: a plain board, pawns, a dice, turns, and a
finish line. It is not the class's game yet. The class invents that on Day 2.

**The incompleteness of this application is intentional. Do not improve it unless
explicitly instructed.** See `WORKSHOP-INSTRUCTIONS.md` in the project for the rules.

---

## What it does

- 40 ordinary squares between Start and Finish
- 3 coloured pawns
- A six-sided dice
- Turn rotation and a current-turn indicator
- An activity feed
- An Engine Room at `/engine-room` that x-rays the whole application
- A live MongoDB connection that **saves nothing**

That last point is the Day 2 lesson: having a database and using a database are
two different things.

## What it deliberately does not do

No saved games, no users, no special squares, no challenges, no configuration,
no admin, no artwork, no multiplayer over the network, no Redis, no AI in the game.

---

## Running it

You need Node.js 20 or newer.

### 1. Get a MongoDB connection string (free Atlas cluster)

1. Create a free account at <https://www.mongodb.com/cloud/atlas>.
2. Create a free **M0** cluster. Any region near you is fine.
3. Under **Database Access**, create a database user with a password.
4. Under **Network Access**, add your current IP address (or `0.0.0.0/0` for a
   classroom, understanding that this opens it to any IP).
5. Press **Connect -> Drivers** and copy the connection string. It looks like
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/`.

### 2. Configure the server

```bash
cp .env.example server/.env
```

Open `server/.env` and paste the connection string into `MONGODB_URI`.
Never commit that file. Never paste a real connection string into chat.

### 3. Install and run

```bash
npm run install:all
npm run dev
```

- Game: <http://localhost:5173>
- Engine Room: <http://localhost:5173/engine-room>
- Server health check: <http://localhost:4000/api/health>

The server refuses to start with a clear message if `MONGODB_URI` is missing.

### 4. Run the tests

```bash
npm test
```

To make the results appear in the Engine Room's Tests panel:

```bash
npm --prefix client run test:report
```

That writes `client/public/test-results.json`. Until you run it, the Tests panel
honestly says no run has been recorded.

---

## Where things live

```text
workshop-game/
├── client/                 the part that runs in the browser
│   └── src/
│       ├── game/           the rules: state, engine, config, registries
│       ├── engine-room/    the x-ray page
│       ├── components/     what you see: board, dice, feed, turn indicator
│       └── services/       how the browser talks to the server
├── server/                 the part that runs on a computer you control
│   └── src/
│       ├── routes/         the addresses the browser can call
│       ├── services/       the server's function registry
│       └── database/       the MongoDB connection
└── docs/
    ├── NORTH-STAR.md       the product contract (the class writes it)
    ├── SPRINTS.md          Quick Wins and the parking lot
    └── DECISIONS.md        what we decided and why
```

### One action, end to end

You press **Roll dice** in `DiceRoller.tsx`. That calls `roll()` from
`GameContext.tsx`, which calls `takeTurn()` in `engine.ts`. `takeTurn()` uses
`rollDice()`, `movePlayer()`, `checkFinish()` and `nextTurn()` to produce a new
game state. React redraws the board from that new state. Nothing is sent to the
server, and nothing is written to MongoDB. Refresh the page and it is all gone.

---

## Deploying it later (Day 5)

Nothing is deployed yet. When the class is ready to ship:

- `npm run build` produces `client/dist` (static files) and `server/dist` (Node code).
- The client is static, so any static host works (Netlify, Vercel, GitHub Pages,
  Azure Static Web Apps). Set the API base URL for production before building.
- The server is a plain Node process (`npm --prefix server start`), so any host
  that runs Node works (Render, Railway, Fly.io, an Azure Web App).
- `MONGODB_URI` goes in the host's environment variables. It never goes in git.
- Add the host's outbound IP to the Atlas Network Access list.

Do not set this up before Day 5. Deployment is that day's lesson.
