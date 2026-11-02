import Link from "next/link";
import { lessons, lessonsInPart, parts } from "@/lib/curriculum";

export default function LearnPage() {
  return (
      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">Learning roadmap</h1>
        <p className="mt-2 text-[var(--muted)]">
          {lessons.length} topics covering the Grokking Modern System Design syllabus and{" "}
          <a
            className="text-[var(--accent)] underline"
            href="https://github.com/ashishps1/awesome-system-design-resources"
          >
            awesome-system-design-resources
          </a>
          . Lessons are original notes, not copied course text.
        </p>
        <div className="mt-10 space-y-10">
          {parts.map((part) => {
            const items = lessonsInPart(part.id);
            return (
              <section key={part.id}>
                <h2 className="text-lg font-semibold">{part.title}</h2>
                <p className="text-sm text-[var(--muted)]">
                  {part.description} · {items.length} topics
                </p>
                <ul className="mt-4 space-y-2">
                  {items.map((lesson) => (
                    <li key={lesson.slug}>
                      <Link
                        href={`/learn/${lesson.slug}`}
                        className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 hover:border-[var(--accent)]/50"
                      >
                        <span>{lesson.title}</span>
                        <span className="shrink-0 text-xs text-[var(--muted)]">
                          {lesson.level} · {lesson.minutes}m
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
  );
}
