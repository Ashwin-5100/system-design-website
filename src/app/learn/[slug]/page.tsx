import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonBody } from "@/components/LessonBody";
import { SiteShell } from "@/components/SiteShell";
import { getLesson, lessons } from "@/lib/curriculum";
import { lessonBodies } from "@/lib/lesson-content";

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const blocks = lessonBodies[slug];
  const index = lessons.findIndex((l) => l.slug === slug);
  const prev = index > 0 ? lessons[index - 1] : null;
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;

  return (
    <SiteShell activeSlug={slug}>
      <div className="border-b border-[var(--border)] px-4 py-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          Part {lesson.part} · {lesson.level} · ~{lesson.minutes} min
        </p>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{lesson.title}</h1>
      </div>
      {blocks ? <LessonBody blocks={blocks} /> : <p className="p-8 text-[var(--muted)]">Content coming soon.</p>}
      <nav className="mx-auto flex max-w-2xl justify-between border-t border-[var(--border)] px-4 py-8 lg:px-8">
        {prev ? (
          <Link href={`/learn/${prev.slug}`} className="text-sm text-[var(--accent)] hover:underline">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${next.slug}`} className="text-sm text-[var(--accent)] hover:underline">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </SiteShell>
  );
}
