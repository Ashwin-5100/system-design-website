import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonBody } from "@/components/LessonBody";
import { getLesson, lessons } from "@/lib/curriculum";
import { parts } from "@/lib/topic";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const index = lessons.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? lessons[index - 1] : null;
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;
  const part = parts.find((item) => item.id === lesson.part);

  return (
    <>
      <div className="border-b border-[var(--border)] px-4 py-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          {part?.title} · {lesson.level} · ~{lesson.minutes} min
        </p>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{lesson.title}</h1>
      </div>
      <LessonBody lesson={lesson} />
      <nav className="mx-auto flex max-w-2xl justify-between gap-4 border-t border-[var(--border)] px-4 py-8 lg:px-8">
        {prev ? (
          <Link href={`/learn/${prev.slug}`} className="text-sm text-[var(--accent)] hover:underline">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${next.slug}`} className="text-right text-sm text-[var(--accent)] hover:underline">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
