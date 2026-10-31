import { SiteShell } from "@/components/SiteShell";

export default function PracticePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <h1 className="text-2xl font-semibold">Practice</h1>
        <p className="mt-4 text-[var(--muted)]">
          Mock interview timer and quizzes — planned in Phase 1. Verify the app locally with{" "}
          <code className="text-[var(--accent)]">npm run dev</code> before any git push.
        </p>
      </div>
    </SiteShell>
  );
}
