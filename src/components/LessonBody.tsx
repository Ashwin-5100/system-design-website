import type { LessonBlock } from "@/lib/lesson-content";

export function LessonBody({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <article className="prose-custom mx-auto max-w-2xl px-4 py-10 lg:px-8">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="mb-4 leading-7 text-[var(--foreground)]">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="mb-3 mt-8 text-xl font-semibold text-[var(--foreground)]">
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={i} className="mb-4 list-disc space-y-2 pl-6 text-[var(--foreground)]">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div
                key={i}
                className={`mb-4 rounded-xl border px-4 py-3 text-sm leading-6 ${
                  block.variant === "tip"
                    ? "border-[var(--accent)]/40 bg-[var(--accent-muted)]"
                    : "border-amber-500/40 bg-amber-500/10"
                }`}
              >
                <span className="font-semibold uppercase tracking-wide text-xs text-[var(--muted)]">
                  {block.variant === "tip" ? "Interview tip" : "Trade-off"}
                </span>
                <p className="mt-1">{block.text}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}
