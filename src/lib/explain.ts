import { gameSections } from "./game-sections";
import type { Topic } from "./topic";
import { umlEntries } from "./uml-catalog";

export type LessonSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  steps?: string[];
  dialogue?: { who: "you" | "interviewer"; text: string }[];
  code?: { title: string; body: string }[];
};

function hit(text: string, words: string[]): boolean {
  const hay = text.toLowerCase();
  return words.some((word) => hay.includes(word));
}

function mechanism(point: string, title: string): string[] {
  const p = point;
  if (hit(p, ["quorum", "n, r", "replication factor"])) {
    return [
      `In ${title}, a quorum is a set of replicas that must agree before the operation returns. If you keep N copies and wait for W acknowledgements on write and R on read, choosing W + R > N means the read set and the write set overlap, so you cannot miss the latest write unless clocks or sloppy quorums interfere.`,
      "The cost is latency: the request waits for the slowest replica inside the quorum, not the fastest one. During a failure you either drop the quorum (and refuse) or accept a sloppy quorum on temporary nodes and repair later. Say which one you picked, because they produce different user-visible bugs.",
      "Operators watch replica lag, quorum failure rate, and how often hinted handoff is still holding data that never made it home.",
    ];
  }
  if (hit(p, ["cache-aside", "read-through", "write-through", "write-back", "cache"])) {
    return [
      `A cache in ${title} sits on the read path. Cache-aside means the application looks up the key, and on a miss it loads the database and fills the cache. The database remains the source of truth. Write-through updates the cache and the database together, so reads are warm but writes wait twice. Write-back acknowledges from the cache and flushes later, which is fast and loses the write if that cache node dies before the flush.`,
      "TTL bounds how long a wrong value can live. Invalidation on write bounds it more tightly but races: a stale fill can land after the invalidation and resurrect old data. The usual fix is a short TTL plus delete-on-write, or a version checked on fill.",
      "When a hot key expires, every waiter misses at once. Coalesce those fills (one loader, the rest wait) or refresh before expiry. A cache that cannot be rebuilt from the database is not a cache, it is a store, and it needs replication.",
    ];
  }
  if (hit(p, ["shard", "partition", "consistent hash", "geohash"])) {
    return [
      `Partitioning in ${title} exists so one machine does not hold every key. The partition key decides the home of a row. Hashing spreads random keys. Ranges keep scans cheap and create hot spots when everyone writes 'now' or the same city. After you pick the key, name the query that no longer hits a single partition: that query becomes a scatter-gather or a precomputed view.`,
      "Resharding is the painful part. Consistent hashing moves only the keys that belonged to the new node. A directory service can move one range at a time with dual writes. Either way, reads during the move must not skip the key or return two conflicting copies without a version.",
      "A hot key ignores your even hash. Celebrity users, flash-sale SKUs, and the last ticket need a different treatment: split the key, cache it, or serialize through a single partition on purpose and protect it with a queue.",
    ];
  }
  if (hit(p, ["idempoten", "retry", "at-least-once", "exactly-once", "double"])) {
    return [
      `Networks duplicate requests. ${title} must treat a timeout as 'maybe it happened'. An idempotency key stored with the result makes the second attempt return the first result instead of charging, booking, or sending again.`,
      "At-least-once delivery plus an idempotent consumer is the practical version of exactly-once. The consumer records the key in the same transaction as the side effect. If the process crashes after the side effect and before the ack, the retry sees the key and skips.",
      "Keys need a retention window longer than the client's retry budget. A key that expires too soon will allow a late duplicate through.",
    ];
  }
  if (hit(p, ["queue", "kafka", "partition", "consumer", "backpressure", "dead-letter"])) {
    return [
      `A queue in ${title} decouples a fast accept path from slow work. The producer commits 'work exists' and returns. Consumers pull when they have capacity. Order usually holds inside one partition, not across the topic. If you need order for a user, key by that user and accept that one partition is the ceiling for that user's throughput.`,
      "Consumers crash. Visibility timeouts or leases return abandoned work. The handler must be safe to run twice. Poison messages go to a dead-letter queue after N attempts so one bad payload cannot block the partition.",
      "If consumers fall behind, the backlog grows and latency grows with it. Backpressure slows producers, sheds low-priority work, or scales consumers. An unbounded queue is a memory leak with extra steps.",
    ];
  }
  if (hit(p, ["websocket", "socket", "presence", "long poll", "sse", "connection"])) {
    return [
      `Live delivery in ${title} holds a connection so the server can push. The connection lives on one gateway process. A registry maps user id to that gateway. When a message arrives, the service looks up the gateway and forwards. If the lookup is stale, the message waits in a durable inbox until the client reconnects and sends its cursor.`,
      "Deploys and network blips drop sockets constantly. Clients reconnect with jitter, resume from the last acked id, and dedupe. Sticky load balancing is a convenience, not the source of truth; the inbox is.",
      "Fan-out for a large group multiplies writes by group size. Past a threshold, store the message once and notify members, or split super-groups into a pull model.",
    ];
  }
  if (hit(p, ["cdn", "edge", "origin", "ttl", "purge"])) {
    return [
      `A CDN for ${title} copies bytes to points of presence near users. The first request in a city is a miss: the edge fetches the origin and stores the object under a cache key (URL plus the headers you actually vary on). Later requests in that city never touch your data center.`,
      "You do not get instant global purge. Invalidation fans out and some edges stay stale until TTL. Immutable URLs (a content hash in the path) make this a non-issue: you publish a new URL instead of mutating the old one.",
      "The origin must survive the miss rate. An origin shield (one cache in front of the origin) collapses thousands of edge misses into one origin fetch. Personalized responses and cookies usually bypass the cache; if you forget, you leak one user's page to another.",
    ];
  }
  if (hit(p, ["index", "b-tree", "lsm", "search", "ranking"])) {
    return [
      `An index in ${title} is a second data structure that answers one access pattern. A B-tree supports point lookups and ranges and makes writes a bit more expensive. An LSM tree batches writes into sequential flushes and pays later in compaction and in reads that check several levels. A search inverted index maps tokens to document ids and is rebuilt or updated asynchronously, so search lags the source of truth.`,
      "Every extra index slows the write path and consumes disk. Add the index that serves the hottest read, and name the query that is still a scan.",
      "Ranking is a second stage. Retrieve a few hundred candidates cheaply, then score those. Do not run a heavy model over the entire corpus on the request.",
    ];
  }
  if (hit(p, ["transaction", "acid", "isolation", "ledger", "atomic"])) {
    return [
      `A transaction in ${title} draws a boundary: either all the writes inside it commit, or none do. That boundary is one database. The moment a second service is involved, you no longer have ACID unless you add a saga and accept intermediate states.`,
      "Isolation decides which anomalies you allow. Read committed stops dirty reads. Repeatable read or a unique constraint stops two buyers from taking the last seat. Pick the anomaly you refuse to show a user, then the isolation or the conditional update that prevents it.",
      "A ledger stores immutable entries (debit and credit) instead of only updating a balance cell. The balance is the sum. That gives you an audit trail and makes retries easier to reconcile.",
    ];
  }
  if (hit(p, ["fan-out", "fanout", "timeline", "feed", "push", "pull"])) {
    return [
      `Feed construction in ${title} is a choice about when the work happens. Push writes the new post into each follower's timeline at publish time, so reads are a single lookup and writes explode for a celebrity. Pull stores the post once and merges follower posts at read time, so writes stay cheap and reads get heavier as the follow graph grows.`,
      "The hybrid everyone ends up with: push for normal accounts, pull (or a separate cache) for accounts above a follower threshold. Precompute the home timeline for the first page only.",
      "Ranking can reorder that candidate list. Do it on tens or hundreds of posts, not by scanning a user's entire history on every refresh.",
    ];
  }
  if (hit(p, ["token bucket", "leaky", "sliding", "rate"])) {
    return [
      `Rate limiting in ${title} counts actions per key per window. A token bucket refills at a steady rate and allows a burst up to the bucket size. A fixed window is easy and unfair at the boundary: a client can send the full budget just before the window flips and again just after. A sliding window remembers recent timestamps or approximate counters and avoids that cliff.`,
      "With many app servers, local memory limits disagree. A shared store (often Redis) holds the counter, and the check-and-increment should be atomic. Approximate local limits are acceptable only if slight over-admission is fine.",
      "Return a clear rejection and a retry delay. Limits without a client behavior just create retry storms.",
    ];
  }
  if (hit(p, ["replicat", "primary", "leader", "follower", "lag"])) {
    return [
      `Replication in ${title} copies data so a dead disk is not data loss and so reads can scale. With one leader, writes go to the leader and followers apply the log. Synchronous followers are in the commit path: slower, and a dead follower can stall writes if you wait for it. Asynchronous followers are fast and can lose the last seconds of writes on failover.`,
      "Read-your-writes breaks if you send the user to a random follower. Pin that user to the leader for a moment, or read from a follower only when lag is below a threshold.",
      "Failover needs a fence so the old leader cannot accept writes after it wakes up. A generation number or a lease does that. Two leaders at once is split brain and corrupts data.",
    ];
  }
  if (hit(p, ["dns", "ttl", "record"])) {
    return [
      `DNS for ${title} is a cached, eventually consistent lookup. The recursive resolver walks root, TLD, and authoritative servers, then caches the answer for the TTL. Browsers and operating systems cache again. A failover that changes an A record does nothing for clients still holding the old address.`,
      "Low TTLs shorten that window and increase query load. Some resolvers ignore very low TTLs. Do not use DNS as a lock or as a strongly consistent service registry.",
      "Health-based DNS removes a dead region only after health checks fail and caches expire. Pair it with a faster data-plane mechanism (anycast or a global load balancer) if you need minute-level failover.",
    ];
  }
  if (hit(p, ["load balanc", "round robin", "least connection", "health"])) {
    return [
      `A load balancer in ${title} is a reverse proxy with a membership list. It should only send traffic to targets whose health check matches the real ready condition (dependencies up, not merely 'process started'). During deploys, connection draining lets in-flight requests finish while new ones go elsewhere.`,
      "Round robin is fair when requests cost the same. Least connections is better when some requests are slow. Consistent hashing sticks a key to a backend. None of these help if the backends keep session state that was not replicated.",
      "The balancer itself must be redundant. One box in front of twenty app servers is the outage.",
    ];
  }
  if (hit(p, ["timeout", "circuit", "bulkhead", "fallback", "cascade"])) {
    return [
      `Failure isolation in ${title} assumes dependencies get slow, not just down. A timeout shorter than the user budget stops a thread from waiting forever. A circuit breaker opens after repeated failures and fails fast, then lets a trial request through. A bulkhead limits how many concurrent calls one dependency can occupy so the rest of the process survives.`,
      "Retries need a budget and jitter. Retrying every failure immediately turns a small outage into a self-inflicted flood.",
      "Decide the fallback before the incident: cached data, a smaller result, or a clear error. A fallback that calls the same dead dependency is not a fallback.",
    ];
  }
  if (hit(p, ["encrypt", "auth", "token", "password", "session"])) {
    return [
      `Authentication in ${title} proves identity. Passwords are stored as slow hashes. Sessions or refresh tokens live in a store you can revoke. Short-lived access tokens can be stateless only if you accept that revocation waits until expiry, or you keep a denylist.`,
      "Authorization is a separate question: what this identity may touch. Check it on every read of private data, not only at login.",
      "Login and reset endpoints are abuse magnets. Rate-limit them and do not reveal whether an account exists if that helps attackers.",
    ];
  }
  if (hit(p, ["gpu", "token", "model", "embed", "rag", "prompt"])) {
    return [
      `Model work in ${title} is capacity-constrained and billed in tokens or GPU-seconds. The online path should do as little as possible: assemble a prompt, retrieve a few chunks if you need facts, call the model, stream tokens back. Training, evaluation, and index builds happen offline.`,
      "Context windows are finite. Summarize or drop history, and say what you drop. Streaming hides some latency because the user sees the first token before the last.",
      "Put a queue in front of the GPU pool and a cheaper fallback model when the queue is deep. Cap agent tool loops so one request cannot run forever. Log enough to debug quality without storing secrets.",
    ];
  }
  if (hit(p, ["consensus", "paxos", "raft", "majority", "lease", "fencing"])) {
    return [
      `Consensus in ${title} lets a small group agree on one history despite crashes. A majority must accept a decision, which is why a partition can freeze the side that lost quorum. That is intentional: the alternative is two leaders.`,
      "Use it for membership, configuration, and who holds a lock. Do not put every user write through a global consensus group if a partitioned database already gives you a leader per shard.",
      "Locks need leases so a dead holder expires, and fencing tokens so a paused holder cannot write after it lost leadership. A lock without fencing is a false sense of safety.",
    ];
  }
  return [
    `In ${title}, treat this as a concrete constraint on the request path, not as a vocabulary word: ${p}`,
    "Walk it on a single request. The client sends the call, a stateless front service validates it, the system of record commits the state that must not be lost, and anything slow or optional is handed to a worker. If you cannot point at which component enforces this constraint, the design does not actually include it.",
    "Define the failure you refuse. Kill the process after it has done the side effect but before it has answered the client. Replay the same request. The user-visible outcome should match one successful execution. Add a metric for how often that replay path runs, because a replay path nobody watches will rot.",
  ];
}

function exampleFor(topic: Topic): string[] {
  if (topic.part === "cases") {
    return [
      `Put rough numbers on ${topic.title} before you draw. Suppose 50 million daily active users and 20 actions each, which is about 10 billion actions a day. Divided by 100,000 seconds, that is on the order of 10,000 average requests per second, and a peak several times higher. If each persisted record is 1 KB and you keep it for a year with three replicas, you are in the tens of terabytes, not a single disk and not an exabyte. The point of the arithmetic is to reject designs: a single primary that does 10,000 writes per second of contested rows will not survive, while a cacheable read of a few kilobytes will.`,
      "Say the read/write ratio out loud. A short-link redirect or a video play is read-heavy, so cache and CDN dominate. A payment or a seat purchase is write-heavy and contested, so a cache in front of the write does not fix correctness.",
      `Then trace one successful request and one failure through ${topic.title}. Success: authenticate, write the system of record, ack the user, enqueue side effects. Failure: the write commits, the response is lost, the client retries, the idempotency key returns the original result. If you cannot tell that story, the diagram is still a poster.`,
    ];
  }
  if (topic.part === "papers") {
    return [
      `${topic.title} is worth reading for the mechanism, not for the 1990s hardware numbers. Extract the invariant the authors refused to break, the placement of metadata versus bytes, and what they explicitly did not try to solve.`,
      "In an interview you do not recite the paper. You say which modern component inherited the idea (object storage, a log, a coordination service, a wide-column store) and which limitation still applies.",
    ];
  }
  if (topic.part === "tradeoffs") {
    return [
      `Apply ${topic.title} to a product you already know. State the requirement that forces one side, the requirement that forces the other, and the hybrid people actually ship. A one-word answer ('we'll use microservices', 'we'll be eventually consistent') is not a trade-off.`,
      "Quantify something. Fan-out cost, extra latency from a quorum, stale seconds on a replica, or dollars of GPU. Order of magnitude is enough.",
    ];
  }
  return [
    `A small numeric picture keeps ${topic.title} honest. Use powers of ten: 10^5 seconds in a day, a millisecond inside a data center, tens of milliseconds across a continent, and a disk or a cross-region hop that dominates a chain of calls. If the design needs five sequential slow hops, add the latencies before you promise a 100 ms page.`,
    `Pick one concrete key, user, or request and walk it through ${topic.title}. Name the component that owns the source of truth, the component that is allowed to be stale, and the component that can disappear without losing acknowledged data. That walk is the whole concept.`,
  ];
}

function failuresFor(topic: Topic): string[] {
  return [
    `The outage pattern for ${topic.title} is almost always one of these: a hot key the hash did not spread, a retry storm with no jitter, a cache expiry that stampedes the database, a failover that created two writers, or a queue nobody bounded.`,
    "Write the user-visible symptom next to the mechanism. 'Followers lag' is an internal phrase. 'The user did not see their own comment' is the bug. 'We lost the last five seconds of payments on failover' is the bug if replication was asynchronous and you still acknowledged early.",
    "Detection belongs in the design. Count errors and latency on the exact operation you care about, break them down by version, and alert on burn rate. A dashboard that only shows CPU will stay green while this feature is down.",
    topic.tip,
  ];
}

function explainLld(topic: Topic): LessonSection[] {
  const entry = umlEntries.find((item) => item.slug === topic.slug);
  return [
    {
      heading: "UML class diagram",
      paragraphs: [
        "The diagram below is the object model: classes, enums, interfaces, and who owns whom. Read it from the entry point (the demo or system class) toward the object whose method actually changes state.",
        "These diagrams come from the awesome-low-level-design collection (GPL-3.0). The class list under the picture is the same model in words.",
      ],
    },
    {
      heading: "Requirements",
      paragraphs: entry?.requirements.length
        ? ["Each line is a behavior the classes have to cover. If a requirement has no class, the diagram is incomplete."]
        : ["This problem is included for its class diagram."],
      bullets: entry?.requirements,
    },
    {
      heading: "Classes",
      paragraphs: entry?.classes.length
        ? ["Use these names when you talk through the diagram. The first class you mention should be the one the caller constructs."]
        : ["Read the boxes in the figure. A solid arrow is ownership. A dashed arrow is a dependency or an interface implementation."],
      bullets: entry?.classes.map((item) => `${item.name} — ${item.role}`),
    },
    {
      heading: "How to walk it in the interview",
      paragraphs: [
        topic.tip,
        "Pick one user action, name the method on the entry class, then the method on the child that mutates state, then the check that rejects an illegal action. That is the whole low-level answer.",
      ],
    },
  ];
}

export function explainTopic(topic: Topic): LessonSection[] {
  if (topic.part === "lld") return explainLld(topic);
  const custom = gameSections[topic.slug];
  if (custom) return custom;

  const isCase = topic.part === "cases";
  const sections: LessonSection[] = [
    {
      heading: "Why this exists",
      paragraphs: [
        topic.summary,
        isCase
          ? `${topic.title} shows up in interviews because it forces a scope cut. You cannot build the entire company in 45 minutes. You lock a few user-visible actions, put numbers on them, and go deep on the one path that breaks first: fan-out, contention, large bytes, geo lookup, or money movement.`
          : `${topic.title} is a tool you reach for only when a requirement demands it. If you add it by habit, you pay latency, cost, and a new failure mode without a user-facing benefit. The rest of this lesson is the mechanism, the numbers, and the way it fails.`,
        "Keep one sentence you could say in the first minute of an interview, then the longer version for when the interviewer asks you to go deeper. Both are below. The longer version is the one that distinguishes a memorized diagram from someone who has operated the thing.",
      ],
    },
    {
      heading: "How it works, end to end",
      paragraphs: [
        isCase
          ? "Read the constraints below as the spine of the design. Each one should show up as a box, a key, or an explicit rejection. If a constraint has nowhere to live in the diagram, you have not designed it yet."
          : "Each piece below is part of the machinery. Read it as a sequence: what is stored, who is allowed to be stale, what is acknowledged to the client, and what is repaired in the background.",
      ],
    },
  ];

  topic.points.forEach((point, index) => {
    sections.push({
      heading: `${index + 1}. ${point}`,
      paragraphs: mechanism(point, topic.title),
    });
  });

  sections.push(
    {
      heading: isCase ? "A worked scale check" : "A concrete picture",
      paragraphs: exampleFor(topic),
    },
    {
      heading: isCase ? "Request paths you should be able to narrate" : "What you operate day to day",
      paragraphs: isCase
        ? [
            "Happy path, slow path, and retry path. Narrate all three.",
            `Happy path for ${topic.title}: the client hits a nearby edge or load balancer, a stateless service checks auth and validation, the system of record commits the small metadata that must be correct, large bytes go to object storage if there are any, and the response returns. Side effects (notifications, search indexing, analytics, transcoding) leave via a queue so the user is not waiting on them.`,
            "Slow path: a miss, a cross-region read, or a cold model. Say what the user sees (spinner, slightly stale feed, a cheaper fallback) and what the timeout is.",
            "Retry path: the client did not get a response. The same idempotency key hits the same logical operation. You return the stored result. You do not create a second booking, charge, or message.",
          ]
        : [
            `Running ${topic.title} means knowing the one or two graphs that tell you it is sick: error rate and a latency percentile on the operation, saturation of the bottleneck (CPU, connections, queue depth, replica lag, GPU queue), and the age of the oldest unprocessed work.`,
            "Deploys should be canaries. A bad config or a bad hash function shows up as a hot shard or a hit-rate cliff, not as a uniform slowdown. Roll back the version and the config together.",
            "Write down the restore story. If the process dies, does acknowledged data still exist? If a region dies, what is the recovery point (how much data you can lose) and the recovery time (how long users wait)? If you have never answered those, the design is still a diagram.",
          ],
      steps: isCase
        ? [
            "Requirements: list the user actions you will support and two you will not.",
            "Estimate QPS, storage, and bandwidth with round numbers.",
            "API and the few entities those APIs read and write.",
            "High-level diagram of the happy path only.",
            "One deep dive on the constraint that dominates cost or correctness.",
            "Failure: one dependency dies, what still works.",
            "Trade-off: what you gave up, in a sentence a skeptical engineer accepts.",
          ]
        : undefined,
    },
    {
      heading: "How this fails",
      paragraphs: failuresFor(topic),
    },
    {
      heading: "How to explain it in the interview",
      paragraphs: [
        `Short version: "${topic.summary}" Then stop and let the interviewer pull on a thread.`,
        `Long version: walk one request, name the source of truth, name what is allowed to be stale, and close with the trade-off. The line you should be able to say without notes: "${topic.tip}"`,
        "If they change a number (10× traffic, multi-region, stronger consistency, a celebrity user), change the design in response. Repeating the original picture after the constraint changed is the usual way this topic is failed.",
      ],
      bullets: [
        "Do not introduce this component until a requirement needs it.",
        "Do not claim strong consistency, exactly-once, or five nines without saying what you wait for and what you refuse.",
        "Do name the remaining single point of failure.",
        "Do say what the user sees during the failure, not only what the cluster does.",
      ],
    },
  );

  return sections;
}
