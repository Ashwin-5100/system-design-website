export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Source = "educative" | "awesome" | "both";

export type Topic = {
  slug: string;
  title: string;
  part: string;
  minutes: number;
  level: Level;
  source: Source;
  summary: string;
  points: string[];
  tip: string;
};

export function topic(
  part: string,
  title: string,
  level: Level,
  minutes: number,
  source: Source,
  summary: string,
  points: string[],
  tip: string,
): Topic {
  const slug = title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return { slug, title, part, minutes, level, source, summary, points, tip };
}

export const parts = [
  {
    id: "intro",
    title: "Introduction and interviews",
    description: "How system design interviews work and how to prepare",
  },
  {
    id: "fundamentals",
    title: "Core concepts",
    description: "Abstractions, non-functional requirements, estimation, CAP",
  },
  {
    id: "networking",
    title: "Networking",
    description: "DNS, HTTP, TCP, proxies, and load balancing",
  },
  {
    id: "api",
    title: "APIs",
    description: "Contracts, gateways, realtime, and idempotency",
  },
  {
    id: "data",
    title: "Databases and storage",
    description: "SQL, NoSQL, replication, sharding, and indexes",
  },
  {
    id: "blocks",
    title: "Building blocks",
    description: "Caches, queues, CDNs, blob stores, search, and schedulers",
  },
  {
    id: "distributed",
    title: "Distributed systems",
    description: "Consensus, locks, discovery, tracing, and failure isolation",
  },
  {
    id: "patterns",
    title: "Architecture patterns",
    description: "Microservices, events, serverless, and client-server",
  },
  {
    id: "ai",
    title: "AI system design",
    description: "Serving, retrieval, RAG, and evaluation",
  },
  {
    id: "tradeoffs",
    title: "Trade-offs",
    description: "The comparisons interviewers expect you to defend",
  },
  {
    id: "cases",
    title: "Design problems",
    description: "End-to-end systems from both curricula",
  },
  {
    id: "lld",
    title: "Low-level design and UML",
    description: "Class diagrams for object-oriented interview problems",
  },
  {
    id: "failures",
    title: "Failures and production stories",
    description: "Outages and engineering write-ups",
  },
  {
    id: "papers",
    title: "Classic papers",
    description: "The distributed-systems papers behind modern infra",
  },
  {
    id: "close",
    title: "Wrap-up",
    description: "How to reuse the framework on unseen problems",
  },
] as const;

export type PartId = (typeof parts)[number]["id"];
