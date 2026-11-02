import type { LessonSection } from "./explain";

const ticTacToe: LessonSection[] = [
  {
    heading: "Understanding the system",
    paragraphs: [
      "Tic-tac-toe is a two-player game on a 3×3 board. X and O take turns claiming an empty cell. Three marks in a row, column, or diagonal wins. A full board with no line is a draw. The interview is not about drawing nine squares. It is about who is allowed to decide that a move is legal, how two devices see the same board, and what happens when a tap is retried or a phone sleeps.",
    ],
  },
  {
    heading: "Requirements gathering",
    paragraphs: [
      "The interviewer usually says only “design tic-tac-toe” and waits. Drive the scope. The conversation below is the one you want to have before any class or diagram.",
    ],
    dialogue: [
      {
        who: "you",
        text: "Are we designing pass-and-play on one device, or two people on two devices over the network?",
      },
      {
        who: "interviewer",
        text: "Both. Start with the rules, then show the online game. Offline should still work with no server.",
      },
      {
        who: "you",
        text: "For online, who decides the move is legal? Can the client send “I placed X and I won”?",
      },
      {
        who: "interviewer",
        text: "No. The client proposes a cell. Something else accepts or rejects it.",
      },
      {
        who: "you",
        text: "If the network drops after the server saved the move but before the response, and the user taps again, do we place a second mark?",
      },
      {
        who: "interviewer",
        text: "No. One tap, one mark.",
      },
      {
        who: "you",
        text: "If a player refreshes or the app is killed, do they rejoin the same game?",
      },
      {
        who: "interviewer",
        text: "Yes. The board must match what the server committed.",
      },
      {
        who: "you",
        text: "Should I include ranked matchmaking, chat, and an AI opponent?",
      },
      {
        who: "interviewer",
        text: "Matchmaking as a simple queue is in scope. Chat is out. An AI can be a later strategy, but it must go through the same rules as a human.",
      },
      {
        who: "you",
        text: "Do you want class design plus the move and locking logic in pseudocode?",
      },
      {
        who: "interviewer",
        text: "Yes. Classes for the model, and real logic for applying a move.",
      },
    ],
  },
  {
    heading: "Requirements",
    paragraphs: [
      "Written out from that conversation. User-facing items and system-facing items are separate on purpose. Extensibility (“a new opponent type”) is a system requirement, which is why the opponent is a strategy instead of an if-statement inside the board.",
    ],
    bullets: [
      "Core 1. Two players alternate. X starts. A cell holds at most one mark.",
      "Core 2. Three in a row wins. A full board without a line is a draw.",
      "Core 3. Online: create a game, join it, submit a cell, see the opponent’s mark, resume after refresh.",
      "Core 4. Offline pass-and-play uses the same rules with no network.",
      "Concurrency 5. Two requests must not fill the same cell or move out of turn.",
      "Concurrency 6. A retried request with the same key returns the first result.",
      "Extensibility 7. A human and a minimax opponent both call the same applyMove. The board does not know which one it is talking to.",
    ],
  },
  {
    heading: "Scale, latency, consistency",
    paragraphs: [
      "This is a small-state, correctness-sensitive system. Do not invent a billion-user story unless they ask. Give numbers so the storage choice is justified.",
    ],
    bullets: [
      "Scale. 100k concurrent games is still one primary. A game document is under 1 KB. 100k games is about 100 MB, plus a short move log.",
      "Latency. A move should be visible to the other player in under 200 ms on a healthy network. The rules check itself is microseconds.",
      "Consistency. The board is strongly consistent per game. Two players must not observe different cells. Analytics (“games finished today”) can be eventual.",
      "Availability. Losing the game row loses the match. The socket process must not be the only copy of the board.",
    ],
  },
  {
    heading: "Core entities",
    paragraphs: [
      "Scan the requirements and write the nouns. The insight that keeps the design clean: a Game is the match, a Move is an immutable fact in the log, and the nine cells are a snapshot rebuilt from that log. The client is never an entity that owns truth.",
    ],
    bullets: [
      "Game. id, status (WAITING, ACTIVE, WON, DRAW), nextTurn (X or O), winner, moveNumber, playerX, playerO.",
      "Cell. index 0–8 and an optional mark. This is a value inside the snapshot, not a row you update from the client.",
      "Move. gameId, moveNumber, player, cell, createdAt. Append-only. The source of truth.",
      "Player. id and display name. A seat in the game, not the board.",
      "MoveResult. accepted or rejected, plus the snapshot the client must render.",
    ],
  },
  {
    heading: "Class design",
    paragraphs: [
      "Satisfy the requirements in order. The rules class has no HTTP in it. Online and offline both call it. That split is the whole design.",
    ],
    code: [
      {
        title: "Mark, status, and the board snapshot",
        body: `enum Mark { X, O }

enum GameStatus { WAITING, ACTIVE, WON, DRAW }

class Board {
  // length 9, null means empty
  private final Mark[] cells = new Mark[9];

  boolean isEmpty(int cell) {
    return cells[cell] == null;
  }

  void place(int cell, Mark mark) {
    cells[cell] = mark;
  }

  Mark winner() {
    int[][] lines = {
      {0,1,2},{3,4,5},{6,7,8},
      {0,3,6},{1,4,7},{2,5,8},
      {0,4,8},{2,4,6}
    };
    for (int[] line : lines) {
      Mark m = cells[line[0]];
      if (m != null && m == cells[line[1]] && m == cells[line[2]]) return m;
    }
    return null;
  }

  boolean isFull() {
    for (Mark c : cells) if (c == null) return false;
    return true;
  }
}`,
      },
      {
        title: "Game is the match. Board never stores who won.",
        body: `class Game {
  String id;
  GameStatus status;
  Mark nextTurn;       // X starts
  Mark winner;         // null until WON
  int moveNumber;      // next expected move, starts at 1
  String playerX;
  String playerO;
  Board board;
}`,
      },
      {
        title: "RulesEngine.apply — the only place a mark is born",
        body: `class RulesEngine {
  // returns the new status after a legal mark
  GameStatus apply(Game game, String playerId, int cell) {
    if (game.status != GameStatus.ACTIVE) {
      throw new IllegalState("game not active");
    }
    Mark mark = playerId.equals(game.playerX) ? Mark.X
              : playerId.equals(game.playerO) ? Mark.O
              : null;
    if (mark == null) throw new Forbidden("not a player");
    if (mark != game.nextTurn) throw new Conflict("not your turn");
    if (cell < 0 || cell > 8 || !game.board.isEmpty(cell)) {
      throw new Conflict("cell taken or invalid");
    }

    game.board.place(cell, mark);
    game.moveNumber++;
    Mark winner = game.board.winner();
    if (winner != null) {
      game.winner = winner;
      game.status = GameStatus.WON;
    } else if (game.board.isFull()) {
      game.status = GameStatus.DRAW;
    } else {
      game.nextTurn = mark == Mark.X ? Mark.O : Mark.X;
    }
    return game.status;
  }
}`,
      },
      {
        title: "Opponent is a strategy. The board does not grow an if (ai).",
        body: `interface Opponent {
  // null means "a human will send the move"
  Integer chooseCell(Game game);
}

class HumanOpponent implements Opponent {
  public Integer chooseCell(Game game) { return null; }
}

class MinimaxOpponent implements Opponent {
  public Integer chooseCell(Game game) {
    // search the same Board model; return a legal index
    return bestCell(game.board, game.nextTurn);
  }
}`,
      },
    ],
  },
  {
    heading: "API",
    paragraphs: [
      "The client never sends a winner and never sends the whole board. It sends a cell and the move number it thinks is next. The response is always the snapshot the UI must draw, so a stale optimistic mark gets overwritten.",
    ],
    code: [
      {
        title: "Create, join, move, read",
        body: `POST /games
{ "mode": "ONLINE" }
→ 201 { "gameId": "g_41", "joinCode": "K7Q", "status": "WAITING", "you": "X" }

POST /games/g_41/join
{ "joinCode": "K7Q" }
→ 200 { "you": "O", "status": "ACTIVE", "nextTurn": "X" }

POST /games/g_41/moves
{
  "cell": 4,
  "expectedMoveNumber": 1,
  "idempotencyKey": "8f1c-tap"
}
→ 200 {
  "accepted": true,
  "moveNumber": 2,
  "nextTurn": "O",
  "cells": ["", "", "", "", "X", "", "", "", ""],
  "status": "ACTIVE"
}

POST /games/g_41/moves
{ "cell": 4, "expectedMoveNumber": 1, "idempotencyKey": "8f1c-tap" }
→ 200 { "accepted": true, "moveNumber": 2, ... }   // same body, no second mark

POST /games/g_41/moves
{ "cell": 0, "expectedMoveNumber": 1, "idempotencyKey": "other" }
→ 409 { "accepted": false, "reason": "STALE", "moveNumber": 2, "cells": [...] }

GET /games/g_41
→ 200 { "status", "nextTurn", "moveNumber", "cells", "winner" }`,
      },
    ],
  },
  {
    heading: "Move path and the lock",
    paragraphs: [
      "A common mistake is checking “is the cell empty?” in the app and then writing, with a gap in between. Two requests can both see empty and both write. The check and the write are one conditional update, keyed by game id and the expected move number.",
    ],
    steps: [
      "Load the game row inside a transaction, or issue a conditional update: WHERE id = ? AND move_number = ? AND status = 'ACTIVE'.",
      "If zero rows change, the move number moved or the game ended. Return 409 with the current snapshot. Do not write.",
      "If the idempotency key is already stored for this game, return the stored response and do not apply again.",
      "Run RulesEngine.apply. Append the Move row. Save the new snapshot and the idempotency key in the same transaction.",
      "Commit, then notify the other player. Notification is after the commit. If notify fails, GET on reconnect still shows the mark.",
    ],
    code: [
      {
        title: "GameService.move — one transaction",
        body: `MoveResponse move(String gameId, String playerId, MoveCommand cmd) {
  return db.tx(() -> {
    StoredResponse prior = idempotency.find(gameId, cmd.idempotencyKey);
    if (prior != null) return prior.body;

    Game game = games.lockById(gameId); // SELECT ... FOR UPDATE
    if (game.moveNumber != cmd.expectedMoveNumber) {
      return MoveResponse.stale(game);
    }
    rules.apply(game, playerId, cmd.cell); // throws Conflict → 409
    moves.append(new Move(gameId, cmd.expectedMoveNumber, playerId, cmd.cell));
    games.save(game);
    idempotency.save(gameId, cmd.idempotencyKey, snapshot(game));
    return MoveResponse.accepted(game);
  });
}`,
      },
    ],
  },
  {
    heading: "Online sync and offline mode",
    paragraphs: [
      "Online, a WebSocket or a one-second poll is only a hint that something changed. The board the UI keeps is whatever GET or the move response last returned. On reconnect the client sends the last moveNumber it rendered. The server returns the snapshot if the client is behind.",
      "Offline pass-and-play constructs a Game in memory and calls the same RulesEngine. There is no idempotency key because there is one device and one thread. If you later upload that game, upload the move list and recompute the board on the server. Do not trust a client-sent winner.",
    ],
  },
  {
    heading: "Schema",
    paragraphs: [
      "One row per game is enough at this size. The move log is what you audit. A unique constraint on (game_id, move_number) is the backstop if the application lock is wrong.",
    ],
    code: [
      {
        title: "games, moves, idempotency_keys",
        body: `CREATE TABLE games (
  id            text PRIMARY KEY,
  status        text NOT NULL,
  next_turn     text NOT NULL,
  winner        text,
  move_number   int  NOT NULL,
  player_x      text,
  player_o      text,
  cells         text NOT NULL, -- 9 marks, e.g. '....X....'
  version       int  NOT NULL
);

CREATE TABLE moves (
  game_id      text NOT NULL,
  move_number  int  NOT NULL,
  player_id    text NOT NULL,
  cell         int  NOT NULL,
  created_at   timestamptz NOT NULL,
  PRIMARY KEY (game_id, move_number)
);

CREATE TABLE idempotency_keys (
  game_id   text NOT NULL,
  key       text NOT NULL,
  response  jsonb NOT NULL,
  PRIMARY KEY (game_id, key)
);`,
      },
    ],
  },
  {
    heading: "What you say at the end",
    paragraphs: [
      "The client is a view. RulesEngine is the referee, shared by offline play, the human online path, and the AI. A move is one transaction: lock the game, reject a stale move number, apply the mark, append the log, store the idempotency key. The socket can drop. The row cannot.",
    ],
  },
];

const snake: LessonSection[] = [
  {
    heading: "Understanding the system",
    paragraphs: [
      "Snake and Ladder is a race along numbered squares. On your turn you roll 1–6, walk forward, and if you land on a snake head or a ladder foot the token finishes on the other end. First player to reach the last square wins. The design problem is that every phone must show the same token positions, and no phone is allowed to choose the die.",
    ],
  },
  {
    heading: "Requirements gathering",
    paragraphs: ["Narrow the prompt before drawing a board."],
    dialogue: [
      {
        who: "you",
        text: "How many players, and is the board always 100 squares with a fixed set of snakes?",
      },
      {
        who: "interviewer",
        text: "Two to four players. The board is configurable. Don’t hardcode snakes in the client.",
      },
      {
        who: "you",
        text: "Who rolls the die online? If the client sends the number 6, is that accepted?",
      },
      {
        who: "interviewer",
        text: "No. The server rolls. The client only says “I take my turn”.",
      },
      {
        who: "you",
        text: "If I land on a snake, is the stored position the head or the tail?",
      },
      {
        who: "interviewer",
        text: "The tail. One transition. Don’t make each client apply the snake itself.",
      },
      {
        who: "you",
        text: "What if it isn’t your turn, or you tap roll twice?",
      },
      {
        who: "interviewer",
        text: "Second tap does not roll again. Wrong turn is rejected.",
      },
      {
        who: "you",
        text: "Must the same game work offline on one device?",
      },
      {
        who: "interviewer",
        text: "Yes. Same rules. Offline may use a seed so the rolls can be replayed. Online rolls stay unpredictable.",
      },
      {
        who: "you",
        text: "Exact finish, or can you bounce if the roll would pass the last square?",
      },
      {
        who: "interviewer",
        text: "Exact finish. A roll that would pass 100 does not move you.",
      },
    ],
  },
  {
    heading: "Requirements",
    bullets: [
      "Core 1. A room of 2–4 players starts on square 1. Turns cycle in seat order.",
      "Core 2. A roll adds the die to the current square, then applies at most one snake or one ladder.",
      "Core 3. You must land exactly on the last square to win. A roll past the end is a no-move, and the turn still advances.",
      "Core 4. Online, the server generates the die. Every client sees the same from-square, to-square, and reason.",
      "Core 5. Reconnect rebuilds positions from the roll log.",
      "Core 6. Offline pass-and-play runs the same transition locally.",
      "Concurrency 7. Only the player whose turn it is can roll, and a double tap is one roll.",
      "Extensibility 8. New board layouts are data. Adding a snake does not change RollService.",
    ],
    paragraphs: [
      "Requirement 8 is why snakes are a map, not branches inside the service. Requirement 7 is why the roll is a conditional update on the roll number, the same shape as tic-tac-toe’s move number.",
    ],
  },
  {
    heading: "Scale, latency, consistency",
    bullets: [
      "Scale. A live room is a few integers. 50k concurrent rooms is tens of megabytes. Fan-out is at most 4 connections, not a celebrity feed.",
      "Latency. After a roll, other players should see the hop in under 200 ms. The transition itself does not touch the network.",
      "Consistency. One room has a single writer: the roll transaction. Players never merge two different dice.",
      "Availability. Positions live in the database. If the notifier dies, the next GET with the room code restores the table.",
    ],
    paragraphs: [],
  },
  {
    heading: "Core entities",
    paragraphs: [
      "The insight: a BoardDefinition is permanent content. A Room is one play of that board. A Roll is an immutable event. Positions are a function of the rolls, not four phones editing a shared integer.",
    ],
    bullets: [
      "BoardDefinition. version, size (100), map of snake head to tail, map of ladder bottom to top, exactFinish flag.",
      "Room. id, code, boardVersion, status (LOBBY, RUNNING, FINISHED), seat order, turn index, nextRollNumber.",
      "Seat. playerId, square. Square is the snapshot after the last roll.",
      "Roll. roomId, rollNumber, playerId, die, fromSquare, toSquare, reason (WALK, SNAKE, LADDER, NO_MOVE, WIN, TIMEOUT).",
    ],
  },
  {
    heading: "Class design",
    paragraphs: [
      "BoardRules is pure. It does not generate randomness. The caller passes the die in, which is how tests, offline replay, and the server all share one implementation.",
    ],
    code: [
      {
        title: "Board definition and one transition",
        body: `class BoardDefinition {
  int size;                         // 100
  Map<Integer,Integer> snakes;      // head -> tail
  Map<Integer,Integer> ladders;     // bottom -> top
  boolean exactFinish;
}

enum Hop { WALK, SNAKE, LADDER, NO_MOVE, WIN }

class Step {
  int from;
  int to;
  Hop hop;
  boolean won;
}

class BoardRules {
  Step apply(BoardDefinition board, int from, int die) {
    int landed = from + die;
    if (landed > board.size) {
      return new Step(from, from, Hop.NO_MOVE, false);
    }
    if (landed == board.size) {
      return new Step(from, landed, Hop.WIN, true);
    }
    if (board.snakes.containsKey(landed)) {
      return new Step(from, board.snakes.get(landed), Hop.SNAKE, false);
    }
    if (board.ladders.containsKey(landed)) {
      return new Step(from, board.ladders.get(landed), Hop.LADDER, false);
    }
    return new Step(from, landed, Hop.WALK, false);
  }
}`,
      },
      {
        title: "RoomService.roll — server owns the die",
        body: `RollResponse roll(String roomId, String playerId, String idempotencyKey) {
  return db.tx(() -> {
    RollResponse prior = idempotency.find(roomId, idempotencyKey);
    if (prior != null) return prior;

    Room room = rooms.lock(roomId);
    String expected = room.seats.get(room.turnIndex).playerId;
    if (!expected.equals(playerId)) throw new Conflict("not your turn");

    int die = random.nextInt(6) + 1;          // never from the client
    Seat seat = room.seatOf(playerId);
    Step step = rules.apply(room.board, seat.square, die);

    rolls.append(new Roll(roomId, room.nextRollNumber, playerId,
                          die, step.from, step.to, step.hop));
    seat.square = step.to;
    room.nextRollNumber++;
    if (step.won) room.status = FINISHED;
    else room.turnIndex = (room.turnIndex + 1) % room.seats.size();

    rooms.save(room);
    RollResponse body = RollResponse.of(room, die, step);
    idempotency.save(roomId, idempotencyKey, body);
    return body;
  });
}`,
      },
    ],
  },
  {
    heading: "API",
    code: [
      {
        title: "Create a room, start, roll",
        body: `POST /rooms
{ "boardVersion": "classic-100" }
→ 201 { "roomId": "r_9", "code": "SNA4", "status": "LOBBY" }

POST /rooms/r_9/join
→ 200 { "seat": 2, "players": ["p1", "p2"] }

POST /rooms/r_9/start
→ 200 { "status": "RUNNING", "turn": "p1", "squares": {"p1": 1, "p2": 1} }

POST /rooms/r_9/rolls
{ "idempotencyKey": "tap-22" }
→ 200 {
  "rollNumber": 1,
  "playerId": "p1",
  "die": 4,
  "from": 1,
  "to": 5,
  "hop": "WALK",
  "nextTurn": "p2",
  "squares": {"p1": 5, "p2": 1}
}

POST /rooms/r_9/rolls
{ "idempotencyKey": "tap-22" }
→ 200 { "rollNumber": 1, "die": 4, ... }   // not a second roll

GET /rooms/r_9?afterRoll=3
→ 200 { "squares", "nextTurn", "rolls": [ /* 4..n */ ] }`,
      },
    ],
    paragraphs: [
      "A roll that lands on a snake comes back with hop SNAKE and to equal to the tail, never the head. The client animates from → to. It does not look up the snake table to decide the final square. If two clients had different board files, they would still agree, because the server already resolved the hop.",
    ],
  },
  {
    heading: "Offline play",
    paragraphs: [
      "Offline imports BoardRules and passes a seeded die: die = seedSequence.next(). The seed is stored with the local game so “replay” walks the same rolls. There is no opponent to cheat, so a seed is acceptable. Online must not send the upcoming dice to the clients, and must not use a seed the players can read.",
      "If an offline game is later uploaded, send the board version and the list of dice, not a claimed winner. The server recomputes every Step. If the client’s winner does not match, store the recomputed result.",
    ],
  },
  {
    heading: "Schema",
    code: [
      {
        title: "rooms and rolls",
        body: `CREATE TABLE rooms (
  id            text PRIMARY KEY,
  code          text UNIQUE NOT NULL,
  board_version text NOT NULL,
  status        text NOT NULL,
  turn_index    int  NOT NULL,
  next_roll     int  NOT NULL,
  seats         jsonb NOT NULL  -- [{playerId, square}]
);

CREATE TABLE rolls (
  room_id     text NOT NULL,
  roll_number int  NOT NULL,
  player_id   text NOT NULL,
  die         int  NOT NULL,
  from_sq     int  NOT NULL,
  to_sq       int  NOT NULL,
  hop         text NOT NULL,
  PRIMARY KEY (room_id, roll_number)
);`,
      },
    ],
    paragraphs: [
      "The primary key on (room_id, roll_number) makes a double roll a database error even if the application check is skipped. Timeout auto-roll uses the same method with hop TIMEOUT and a server-generated die, still under the lock, so a late tap and a timer cannot both roll.",
    ],
  },
  {
    heading: "What you say at the end",
    paragraphs: [
      "The board is data. The die is a server number. One function turns (square, die, board) into the next square, including the snake or the ladder. Clients render the event. They do not invent it. Offline is that function plus a seed. Online is that function inside a transaction keyed by roll number.",
    ],
  },
];

const dino: LessonSection[] = [
  {
    heading: "Understanding the system",
    paragraphs: [
      "The offline dinosaur is the runner shown when the browser cannot load a page. A character runs. Obstacles approach. You jump or duck. A hit ends the run. The score is distance. The product exists precisely when there is no network, so any design that needs a server to jump is the wrong design.",
    ],
  },
  {
    heading: "Requirements gathering",
    dialogue: [
      {
        who: "you",
        text: "Should a jump work with the network cable unplugged, including the first frame?",
      },
      {
        who: "interviewer",
        text: "Yes. If it cannot start offline, it is not this product.",
      },
      {
        who: "you",
        text: "Is the high score only on this device, or do we sync it to an account later?",
      },
      {
        who: "interviewer",
        text: "Save it locally at game over. Sync is optional, and only when the browser is back online. Sync must never block a jump.",
      },
      {
        who: "you",
        text: "Do we need to stop someone editing local storage to fake a score?",
      },
      {
        who: "interviewer",
        text: "No. Be honest that an offline score is not a fair global leaderboard. If I ask for a fair board, that is a different, online mode.",
      },
      {
        who: "you",
        text: "Should two players share one run?",
      },
      {
        who: "interviewer",
        text: "Out of scope. Don’t draw a multiplayer server unless I add it.",
      },
      {
        who: "you",
        text: "Frame rate and input lag?",
      },
      {
        who: "interviewer",
        text: "Aim for 60 frames a second. The jump should show up on the next frame, not after a round trip.",
      },
    ],
    paragraphs: [
      "That conversation kills the load-balancer diagram. What remains is a cached shell, a game loop, a world, local persistence, and a dotted line for score sync.",
    ],
  },
  {
    heading: "Requirements",
    bullets: [
      "Core 1. Start a run, jump, duck, spawn obstacles, collide, end the run, show the score.",
      "Core 2. The game boots and plays with the network disabled.",
      "Core 3. On game over, if the score beats the saved high score, persist it before the handler returns.",
      "Core 4. When online later, upload the local best. The server keeps the maximum, never a lower value.",
      "Latency 5. Input to a visible jump is one frame, about 16 ms. No server is on that path.",
      "Out of scope. Shared runs, anti-cheat leaderboards, accounts required to press space.",
    ],
    paragraphs: [],
  },
  {
    heading: "Scale and what “scale” means here",
    paragraphs: [
      "There is no QPS for a jump. The budget is the frame. At 60 Hz you have about 16 ms to read input, move the world, test collisions, and draw. A hitch longer than that is a missed cactus, which the player feels as unfair.",
      "The only server number is the optional sync. If 10 million browsers come back online after an outage and each posts one integer, that is a small write burst of idempotent max updates, not a game server. Say that number so it is obvious the backend is not the product.",
    ],
  },
  {
    heading: "Core entities",
    paragraphs: [
      "These are in-memory objects, not tables. The only durable local entity is the high score. Treating obstacles as rows in a database is the mistake this prompt is designed to catch.",
    ],
    bullets: [
      "Dino. y, vertical velocity, state (RUN, JUMP, DUCK, DEAD), width and height for the hit box.",
      "Obstacle. type (CACTUS_SMALL, CACTUS_LARGE, BIRD_HIGH, BIRD_LOW), x, width, height. Spawned ahead of the dino, moved left each frame, removed once off screen.",
      "World. speed, distance, score, list of live obstacles, rng state, phase (PLAYING, DEAD).",
      "HighScore. value in local storage. Optional cloud copy is max(local, server).",
      "RunSeed. optional. If present, obstacle gaps are a pure function of the seed and the frame, so a death can be replayed.",
    ],
  },
  {
    heading: "Class design — the loop",
    paragraphs: [
      "Input sets a flag. The loop consumes it. Physics does not run inside the key listener, or jump height depends on how the browser batches events.",
    ],
    code: [
      {
        title: "World.step — one frame, no I/O",
        body: `class World {
  Dino dino;
  Obstacle[] obstacles;
  double speed;
  double distance;
  boolean dead;
  Rng rng;

  void step(double dtMillis, Input input) {
    if (dead) return;
    double dt = Math.min(dtMillis, 50); // slept tabs must not tunnel
    speed = baseSpeed + distance * acceleration;

    if (input.jump) dino.jump();
    if (input.duck) dino.duck();
    dino.integrate(dt);

    for (Obstacle o : obstacles) o.x -= speed * dt;
    obstacles.removeIf(o -> o.x + o.width < 0);
    maybeSpawn();

    for (Obstacle o : obstacles) {
      if (dino.hits(o)) { dead = true; return; }
    }
    distance += speed * dt;
  }

  void maybeSpawn() {
    Obstacle last = obstacles.isEmpty() ? null : obstacles.getLast();
    double gap = last == null ? 0 : last.x;
    if (gap < widthPx - rng.between(minGap, maxGap)) return;
    obstacles.add(Obstacle.of(rng.nextType(), widthPx + 20));
  }
}`,
      },
      {
        title: "Loop and game over — high score is synchronous",
        body: `class Game {
  World world = new World();
  HighScoreStore scores;
  double last = 0;

  void frame(double now) {
    double dt = last == 0 ? 16 : now - last;
    last = now;
    world.step(dt, input.consume());
    renderer.draw(world);
    if (world.dead) {
      scores.commitIfHigher((int) world.distance);
      return; // do not schedule another frame
    }
    requestAnimationFrame(this::frame);
  }
}

class LocalHighScore implements HighScoreStore {
  int read() { return intOrZero(localStorage.getItem("dino-hi")); }

  void commitIfHigher(int score) {
    try {
      if (score > read()) localStorage.setItem("dino-hi", String.valueOf(score));
    } catch (Exception ignored) {
      // private mode / quota: the run still ended, the score is just not kept
    }
  }
}`,
      },
    ],
  },
  {
    heading: "Booting with no network",
    paragraphs: [
      "The HTML, the script, the sprite sheet, and the sounds must already be on disk. On the web that is a service worker that precached them during an earlier online visit, or assets packed in the browser binary the way Chrome does. The runner does not fetch a config before the first frame. If a live-ops file fails to load, the baked-in speeds and sprites are used.",
      "A service worker update swaps the cache version between runs, not during one. Half-updated sprites in the middle of a jump is a broken hit box.",
    ],
    code: [
      {
        title: "What is cached before the outage",
        body: `// precache, not a network call during play
const SHELL = [
  "/dino/index.html",
  "/dino/game.js",
  "/dino/sprites.png",
  "/dino/hit.wav"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("dino-v3").then((c) => c.addAll(SHELL)));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((hit) => hit || fetch(event.request))
  );
});`,
      },
    ],
  },
  {
    heading: "Optional sync — max, not last write",
    paragraphs: [
      "When the browser fires online, post the local integer if it is dirty. The handler on the server stores the greater of the stored score and the incoming score. Two devices cannot lower each other. The game loop does not await this request. A failure leaves the dirty flag set and retries with backoff.",
      "Say the limitation out loud: anyone can edit local storage. This endpoint is a convenience sync, not a contest. A fair leaderboard would require an online run with a server clock, which is a different product.",
    ],
    code: [
      {
        title: "POST /scores/me — idempotent max",
        body: `POST /scores/me
{ "score": 1840, "clientId": "browser-9" }

→ 200 { "best": 1902 }   // server already had 1902; 1840 did not lower it

UPDATE scores
SET best = GREATEST(best, :incoming),
    updated_at = now()
WHERE user_id = :user;

-- first time:
INSERT INTO scores (user_id, best) VALUES (:user, :incoming)
ON CONFLICT (user_id)
DO UPDATE SET best = GREATEST(scores.best, EXCLUDED.best);`,
      },
    ],
  },
  {
    heading: "What fails",
    bullets: [
      "A frame takes 40 ms because a sprite decode or a storage write ran inside step. The dino tunnels into a cactus. Keep I/O out of step. Decode sprites at boot. Write the high score only on death.",
      "A background tab wakes with dt = 10 seconds. Without the cap, one step skips every obstacle. Cap dt.",
      "Sync is on the critical path. The jump waits on a timeout and the game feels dead offline. The POST stays off the frame loop.",
      "The only cactus PNG lives on a CDN. Offline, the hit box exists and the picture does not. Precache the sheet.",
    ],
    paragraphs: [],
  },
  {
    heading: "What you say at the end",
    paragraphs: [
      "Two boxes. A cached shell, and a runtime inside it: input flag, frame loop, world, renderer, local high score. A dotted arrow to a score service that stores a max and is never awaited by the loop. If they ask for multiplayer, stop and say that leaves the offline product: both players would need a shared obstacle schedule and a referee, and jump would no longer be local.",
    ],
  },
];

export const gameSections: Record<string, LessonSection[]> = {
  "design-tic-tac-toe": ticTacToe,
  "design-snake-and-ladder": snake,
  "design-an-offline-dinosaur-game": dino,
};
