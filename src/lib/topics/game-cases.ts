import { topic } from "../topic";

export const gameCases = [
  topic(
    "cases",
    "Design Tic-tac-toe",
    "Beginner",
    30,
    "both",
    "Tic-tac-toe is a tiny turn-based game. The hard part is not the board. It is who is allowed to say a move is legal, how two clients stay in sync, and how a dropped connection resumes the same game.",
    [
      "The server owns the board. Clients send a cell index. They never send 'I won'.",
      "A game is a state machine: waiting, in progress, won, or draw.",
      "Each move is idempotent so a retried tap does not place two marks.",
      "Reconnect with a game id and a move cursor. The server replays the authoritative board.",
      "Offline pass-and-play keeps the same rules engine on the device and skips the network.",
    ],
    "Say the client is a view. The server, or the local rules engine in offline mode, is the referee.",
  ),
  topic(
    "cases",
    "Design Snake and Ladder",
    "Beginner",
    35,
    "both",
    "Snake and Ladder is a shared board, a dice roll, and a position per player. Online, the dice and the position updates must be authoritative so a client cannot invent a six.",
    [
      "Store the board as data: size, snakes, and ladders. Do not hardcode the board in the client.",
      "The server rolls the dice and applies snakes and ladders in one transition.",
      "A room holds two to four players, a turn index, and a turn timer.",
      "The same rules engine runs offline on one device. A seed makes the dice replayable.",
      "Late join and reconnect rebuild the board from the event log, not from a client's memory.",
    ],
    "One sentence: the dice is a server-side random number, and the board is a pure function of the rolls.",
  ),
  topic(
    "cases",
    "Design an offline dinosaur game",
    "Beginner",
    30,
    "both",
    "The Chrome dinosaur game must be playable with no network. The loop, physics, obstacles, and score live in the browser. The network is optional and only for syncing a high score later.",
    [
      "A service worker and cached assets let the game boot while offline.",
      "The game loop runs on requestAnimationFrame and never waits on a server to jump.",
      "Obstacles come from a seeded random generator so a run can be replayed.",
      "High score is written to local storage immediately. Cloud sync happens only when the browser is online.",
      "Collision and game-over are computed on the client. There is no referee server in the offline path.",
    ],
    "Split the design in two: the offline game, which must work alone, and the optional score sync, which must not block play.",
  ),
];
