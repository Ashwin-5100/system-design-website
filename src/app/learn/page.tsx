import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { lessons, parts } from "@/lib/curriculum";

export default function LearnPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">Learning roadmap</h1>
        <p className="mt-2 text-[var(--muted)]">
          MVP shell — more modules from{" "}
          <code className="text-sm text-[var(--accent)]">system-design-website-plan/</code> will
          land here next.
        </p>
        <div className="mt-10 space-y-8">
          {parts.map((part) => (
            <section key={part.id}>
              <h2 className="text-lg font-semibold">
                Part {part.id}: {part.title}
              </h2>
              <p className="text-sm text-[var(--muted)]">{part.description}</p>
              <ul className="mt-4 space-y-2">
                {lessons
                  .filter((l) => l.part === part.id)
                  .map((lesson) => (
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
            </section>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
