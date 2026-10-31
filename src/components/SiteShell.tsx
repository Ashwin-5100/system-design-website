import Link from "next/link";
import { lessons, parts } from "@/lib/curriculum";

export function SiteShell({
  children,
  activeSlug,
}: {
  children: React.ReactNode;
  activeSlug?: string;
}) {
  return (
    <div className="flex min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <aside className="hidden w-72 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] lg:flex lg:flex-col">
        <div className="border-b border-[var(--border)] p-5">
          <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--accent)]">
            ScalePrep
          </Link>
          <p className="mt-1 text-xs text-[var(--muted)]">System design interview course</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          {parts.map((part) => (
            <div key={part.id} className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Part {part.id} · {part.title}
              </p>
              <ul className="space-y-1">
                {lessons
                  .filter((l) => l.part === part.id)
                  .map((lesson) => (
                    <li key={lesson.slug}>
                      <Link
                        href={`/learn/${lesson.slug}`}
                        className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                          activeSlug === lesson.slug
                            ? "bg-[var(--accent-muted)] text-[var(--accent)]"
                            : "text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                        }`}
                      >
                        {lesson.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-[var(--border)] p-4 text-xs text-[var(--muted)]">
          Progress saved in browser (coming soon)
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 lg:px-8">
          <Link href="/learn" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] lg:hidden">
            ← Learn
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/learn" className="text-[var(--muted)] hover:text-[var(--foreground)]">
              Roadmap
            </Link>
            <Link href="/practice" className="text-[var(--muted)] hover:text-[var(--foreground)]">
              Practice
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
