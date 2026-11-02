import { explainTopic } from "@/lib/explain";
import type { Topic } from "@/lib/topic";
import { umlBySlug } from "@/lib/uml-catalog";

function anchor(heading: string, index: number): string {
  return `s-${index}-${heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)}`;
}

export function LessonBody({ lesson }: { lesson: Topic }) {
  const sections = explainTopic(lesson);
  const words = sections.reduce((count, section) => {
    const text = [
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.steps ?? []),
      ...(section.dialogue?.map((line) => line.text) ?? []),
      ...(section.code?.map((block) => block.body) ?? []),
    ].join(" ");
    return count + text.split(/\s+/).length;
  }, 0);
  const minutes = Math.max(lesson.minutes, Math.round(words / 180));

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
      <aside className="hidden lg:block">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          On this page
        </p>
        <ol className="mt-3 space-y-2 text-sm">
          {sections.map((section, index) => (
            <li key={section.heading}>
              <a
                href={`#${anchor(section.heading, index)}`}
                className="line-clamp-2 text-[var(--muted)] hover:text-[var(--accent)]"
              >
                {section.heading.replace(/^\d+\.\s/, "")}
              </a>
            </li>
          ))}
        </ol>
      </aside>
      <article className="min-w-0 max-w-3xl">
        {umlBySlug[lesson.slug] ? (
          <figure className="mb-8">
            {/* Diagrams are wide local PNGs; the browser should show them at full width. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={umlBySlug[lesson.slug]}
              alt={`UML class diagram for ${lesson.title}`}
              className="w-full rounded-xl border border-[var(--border)] bg-white"
            />
            <figcaption className="mt-2 text-xs text-[var(--muted)]">
              UML class diagram. Adapted from the diagrams in{" "}
              <a
                className="text-[var(--accent)] underline"
                href="https://github.com/ashishps1/awesome-low-level-design"
              >
                awesome-low-level-design
              </a>{" "}
              (GPL-3.0).
            </figcaption>
          </figure>
        ) : null}
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          {lesson.source === "both"
            ? "Educative syllabus and awesome-system-design-resources"
            : lesson.source === "educative"
              ? "Grokking-style syllabus"
              : "awesome-system-design-resources"}
          {" · "}
          about {minutes} min read · {words.toLocaleString()} words
        </p>
        {sections.map((section, index) => (
          <section key={section.heading} id={anchor(section.heading, index)} className="mb-10 scroll-mt-6">
            <h2 className="mb-4 text-xl font-semibold leading-snug">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 80)} className="mb-4 text-[15px] leading-7 text-[var(--foreground)]">
                {paragraph}
              </p>
            ))}
            {section.steps ? (
              <ol className="mb-4 list-decimal space-y-2 pl-5 leading-7">
                {section.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            ) : null}
            {section.bullets ? (
              <ul className="mb-4 list-disc space-y-2 pl-5 leading-7">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.dialogue ? (
              <div className="mb-6 space-y-3">
                {section.dialogue.map((line) => (
                  <div
                    key={`${line.who}-${line.text.slice(0, 48)}`}
                    className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                      line.who === "you"
                        ? "border-[var(--accent)]/30 bg-[var(--accent-muted)]"
                        : "border-[var(--border)] bg-[var(--surface)]"
                    }`}
                  >
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                      {line.who === "you" ? "You" : "Interviewer"}
                    </p>
                    <p>{line.text}</p>
                  </div>
                ))}
              </div>
            ) : null}
            {section.code?.map((block) => (
              <div key={block.title} className="mb-4 overflow-hidden rounded-xl border border-[var(--border)]">
                <p className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--muted)]">
                  {block.title}
                </p>
                <pre className="overflow-x-auto p-4 text-[13px] leading-6">
                  <code>{block.body}</code>
                </pre>
              </div>
            ))}
          </section>
        ))}
      </article>
    </div>
  );
}
