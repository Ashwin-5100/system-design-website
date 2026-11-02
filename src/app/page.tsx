import Link from "next/link";
import { caseCount, lessonCount } from "@/lib/curriculum";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[var(--background)]">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold text-[var(--accent)]">ScalePrep</span>
        <Link href="/learn" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          Open course →
        </Link>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pb-20">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
          System design interview prep
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Every core topic from the Grokking syllabus and the awesome system design list.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
          Fundamentals, building blocks, trade-offs, classic papers, and end-to-end design
          problems — written as original lessons you can practice out loud.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/learn/introduction-to-modern-system-design"
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#0f1419] hover:opacity-90"
          >
            Start at the beginning
          </Link>
          <Link
            href="/learn"
            className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium hover:bg-[var(--surface)]"
          >
            Browse all topics
          </Link>
        </div>
        <dl className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            [String(lessonCount), "Topics"],
            [String(caseCount), "Design problems"],
            ["14", "Course sections"],
            ["45m", "Practice timer target"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <dt className="text-2xl font-semibold text-[var(--accent)]">{value}</dt>
              <dd className="mt-1 text-xs text-[var(--muted)]">{label}</dd>
            </div>
          ))}
        </dl>
      </main>
    </div>
  );
}
