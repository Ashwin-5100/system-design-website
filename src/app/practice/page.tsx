import Link from "next/link";
import { lessonsInPart } from "@/lib/curriculum";

export default function PracticePage() {
  const cases = lessonsInPart("cases");
  return (
      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
        <h1 className="text-3xl font-semibold">Practice</h1>
        <p className="mt-2 text-[var(--muted)]">
          {cases.length} design problems. Time-box one to 45 minutes: requirements, estimate,
          API, diagram, one deep dive, trade-off.
        </p>
        <ul className="mt-8 space-y-2">
          {cases.map((lesson) => (
            <li key={lesson.slug}>
              <Link
                href={`/learn/${lesson.slug}`}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 hover:border-[var(--accent)]/50"
              >
                <span>{lesson.title}</span>
                <span className="text-xs text-[var(--muted)]">
                  {lesson.level} · {lesson.minutes}m
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
  );
}
