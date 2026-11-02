"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { lessons, parts } from "@/lib/curriculum";

const allPartIds = parts.map((part) => part.id);

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const activeSlug = pathname.startsWith("/learn/")
    ? decodeURIComponent(pathname.slice("/learn/".length))
    : undefined;
  const activePart = lessons.find((lesson) => lesson.slug === activeSlug)?.part;

  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openParts, setOpenParts] = useState<string[]>(allPartIds);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  if (activePart && !openParts.includes(activePart)) {
    setOpenParts([...openParts, activePart]);
  }

  useEffect(() => {
    activeLinkRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeSlug]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lessons;
    return lessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(q) ||
        lesson.summary.toLowerCase().includes(q),
    );
  }, [query]);

  const searching = query.trim().length > 0;

  function togglePart(id: string) {
    setOpenParts((current) =>
      current.includes(id) ? current.filter((partId) => partId !== id) : [...current, id],
    );
  }

  const nav = (
    <>
      <div className="shrink-0 border-b border-[var(--border)] p-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--accent)]">
            ScalePrep
          </Link>
          <span className="text-xs text-[var(--muted)]">{lessons.length} topics</span>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topics"
          className="mt-3 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
        />
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
        {parts.map((part) => {
          const items = filtered.filter((lesson) => lesson.part === part.id);
          if (items.length === 0) return null;
          const isOpen = searching || openParts.includes(part.id);
          return (
            <div key={part.id} className="mb-1">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => {
                  if (!searching) togglePart(part.id);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-semibold uppercase tracking-wider hover:bg-[var(--surface-hover)] ${
                  activePart === part.id ? "text-[var(--accent)]" : "text-[var(--muted)]"
                }`}
              >
                <span
                  className={`inline-block w-3 text-[10px] transition-transform ${isOpen ? "rotate-90" : ""}`}
                  aria-hidden
                >
                  ▶
                </span>
                <span className="min-w-0 flex-1 leading-4">{part.title}</span>
                <span className="tabular-nums text-[10px] font-medium text-[var(--muted)]">
                  {items.length}
                </span>
              </button>
              {isOpen ? (
                <ul className="mb-2 ml-3 space-y-0.5 border-l border-[var(--border)] pl-2">
                  {items.map((lesson) => {
                    const selected = activeSlug === lesson.slug;
                    return (
                      <li key={lesson.slug}>
                        <Link
                          href={`/learn/${lesson.slug}`}
                          ref={selected ? activeLinkRef : undefined}
                          onClick={() => setMenuOpen(false)}
                          className={`block rounded-md px-2 py-1.5 text-sm leading-5 ${
                            selected
                              ? "bg-[var(--accent-muted)] font-medium text-[var(--accent)]"
                              : "text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                          }`}
                        >
                          {lesson.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="flex h-dvh overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <aside className="hidden h-full w-80 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] lg:flex">
        {nav}
      </aside>
      {menuOpen ? (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="relative z-10 flex h-full w-80 max-w-[85vw] flex-col bg-[var(--surface)]">
            {nav}
          </aside>
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-4 py-3 lg:px-8">
          <button
            type="button"
            className="text-sm text-[var(--muted)] lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            Topics
          </button>
          <p className="hidden text-sm text-[var(--muted)] lg:block">
            {activePart
              ? parts.find((part) => part.id === activePart)?.title
              : "System design course"}
          </p>
          <div className="flex gap-4 text-sm">
            <Link
              href="/learn"
              className={
                pathname === "/learn"
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }
            >
              Roadmap
            </Link>
            <Link
              href="/practice"
              className={
                pathname === "/practice"
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }
            >
              Practice
            </Link>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
