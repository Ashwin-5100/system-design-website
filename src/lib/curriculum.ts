export type Lesson = {
  slug: string;
  title: string;
  part: string;
  minutes: number;
  level: "Beginner" | "Intermediate" | "Advanced";
};

export const parts = [
  { id: "A", title: "Start here", description: "Interview prep & frameworks" },
  { id: "B", title: "Fundamentals", description: "NFRs, estimation, networking" },
  { id: "F", title: "Case studies", description: "End-to-end designs" },
] as const;

export const lessons: Lesson[] = [
  {
    slug: "what-is-system-design",
    title: "What is system design?",
    part: "A",
    minutes: 14,
    level: "Beginner",
  },
  {
    slug: "the-45-minute-framework",
    title: "The 45-minute interview framework",
    part: "A",
    minutes: 15,
    level: "Beginner",
  },
  {
    slug: "back-of-envelope-estimation",
    title: "Back-of-the-envelope estimation",
    part: "B",
    minutes: 16,
    level: "Beginner",
  },
  {
    slug: "design-url-shortener",
    title: "Design a URL shortener (TinyURL)",
    part: "F",
    minutes: 40,
    level: "Beginner",
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}
