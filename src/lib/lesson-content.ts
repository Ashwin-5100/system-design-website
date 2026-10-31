export type LessonBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "callout"; variant: "tip" | "tradeoff"; text: string }
  | { type: "list"; items: string[] };

export const lessonBodies: Record<string, LessonBlock[]> = {
  "what-is-system-design": [
    {
      type: "p",
      text: "System design is how you define architecture, data, and interfaces so a product meets functional needs and non-functional goals like scale, reliability, and latency.",
    },
    {
      type: "h2",
      text: "What interviews measure",
    },
    {
      type: "list",
      items: [
        "Clarifying ambiguous requirements under time pressure",
        "Estimating scale with simple arithmetic",
        "Choosing components and defending trade-offs",
        "Communicating a coherent story on a whiteboard or diagram",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Interviewers care less about memorized boxes and more about whether your design matches the requirements you agreed on.",
    },
  ],
  "the-45-minute-framework": [
    {
      type: "p",
      text: "Use a repeatable roadmap so you never stall: requirements, estimation, high-level design, APIs, deep dives, evaluation, and problem-specific extras.",
    },
    {
      type: "h2",
      text: "Suggested timing",
    },
    {
      type: "list",
      items: [
        "Requirements — ~5–10 min",
        "Estimation — ~5 min",
        "High-level design — ~10 min",
        "APIs & data model — ~5 min",
        "Deep dives & trade-offs — ~15 min",
      ],
    },
    {
      type: "callout",
      variant: "tradeoff",
      text: "Skip optional steps (e.g. detailed schema) when the prompt is narrow — adapt the framework, do not recite it.",
    },
  ],
  "back-of-envelope-estimation": [
    {
      type: "p",
      text: "Turn vague scale into numbers: daily active users, requests per second, storage per object, and bandwidth. Round aggressively; order of magnitude is enough.",
    },
    {
      type: "h2",
      text: "Example",
    },
    {
      type: "p",
      text: "100M DAU, each user 10 reads/day → ~1B reads/day → ~12k reads/s average (higher at peak). If each URL mapping is 500 bytes, 10B mappings ≈ 5 TB before replication.",
    },
  ],
  "design-url-shortener": [
    {
      type: "p",
      text: "TinyURL-style services are read-heavy: create short codes on write, resolve redirects on read. Optimize for availability and low latency on GET.",
    },
    {
      type: "h2",
      text: "Core requirements",
    },
    {
      type: "list",
      items: [
        "Functional: shorten URL, redirect, optional custom alias & expiry",
        "Non-functional: high read QPS, low redirect latency, unguessable codes",
      ],
    },
    {
      type: "h2",
      text: "High-level pieces",
    },
    {
      type: "list",
      items: [
        "API tier (stateless) behind load balancer",
        "Cache for hot mappings",
        "Primary store for URL ↔ code with sharding by code",
        "Optional analytics queue (async)",
      ],
    },
    {
      type: "callout",
      variant: "tradeoff",
      text: "Base62 auto IDs are simple; custom aliases need uniqueness checks and abuse controls.",
    },
  ],
};
