import { topic, parts, type Topic } from "./topic";
import { introAndCore } from "./topics/intro-and-core";
import { networkingAndData } from "./topics/networking-data";
import { blocksAndSystems } from "./topics/blocks-and-systems";
import { aiTradeoffsAndCases } from "./topics/ai-tradeoffs-cases";
import { gameCases } from "./topics/game-cases";
import { umlEntries } from "./uml-catalog";

const consistentHashing = topic(
  "fundamentals",
  "Consistent hashing",
  "Intermediate",
  14,
  "both",
  "Consistent hashing places keys on a ring so adding a node moves only a fraction of the keys.",
  [
    "Hash the node and the key onto the same circle; the key belongs to the next node clockwise.",
    "Virtual nodes spread uneven machine sizes and avoid big gaps.",
    "Used by caches, KV stores, and some load balancers.",
    "It does not fix a hot key: one popular key still lands on one node.",
  ],
  "Sketch the ring when you talk about rebalancing a cache or a Dynamo-style store.",
);

const lldLessons: Topic[] = umlEntries.map((entry) => ({
  slug: entry.slug,
  title: entry.title.replace(/^Designing (an |a )?/i, "LLD: "),
  part: "lld",
  minutes: 20,
  level: entry.level,
  source: "awesome" as const,
  summary: entry.requirements[0] ?? entry.title,
  points: entry.classes.length
    ? entry.classes.map((item) => `${item.name}: ${item.role}`)
    : ["The class diagram is the object model for this problem."],
  tip: "Start at the entry-point class, then follow the arrow to the object that changes state.",
}));

export const lessons: Topic[] = [
  ...introAndCore,
  consistentHashing,
  ...networkingAndData,
  ...blocksAndSystems,
  ...gameCases,
  ...aiTradeoffsAndCases,
  ...lldLessons,
];

const slugs = new Set<string>();
for (const lesson of lessons) {
  if (slugs.has(lesson.slug)) {
    throw new Error(`Duplicate lesson slug: ${lesson.slug}`);
  }
  slugs.add(lesson.slug);
}

export { parts };
export type { Topic };

export function getLesson(slug: string): Topic | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function lessonsInPart(partId: string): Topic[] {
  return lessons.filter((lesson) => lesson.part === partId);
}

export const lessonCount = lessons.length;
export const caseCount = lessons.filter((lesson) => lesson.part === "cases").length;
