
import { notFound } from "next/navigation";
import PracticeSession from "./PracticeSession";

export const instant = false;

const practices = {
  "a-gentle-morning-flow": {
    title: "A Gentle Morning Flow",
    category: "Yoga",
    duration: "12 min",
    level: "Beginner",
    symbol: "☀",
    description:
      "Wake up your body with gentle stretches and mindful movement.",
    steps: [
      "Find a comfortable place.",
      "Take three slow breaths.",
      "Move through gentle stretches.",
      "Finish with a moment of gratitude.",
    ],
  },

  "a-moment-of-stillness": {
    title: "A Moment of Stillness",
    category: "Meditation",
    duration: "8 min",
    level: "All levels",
    symbol: "✧",
    description:
      "Take a quiet pause and return your attention to the present.",
    steps: [
      "Sit comfortably.",
      "Close your eyes if comfortable.",
      "Notice your breathing.",
      "Return your attention whenever your mind wanders.",
    ],
  },

  "relaxing-breath-practice": {
    title: "Relaxing Breath Practice",
    category: "Breathing",
    duration: "5 min",
    level: "Beginner",
    symbol: "◉",
    description: "Slow down with gentle breathing.",
    steps: [
      "Inhale slowly and comfortably.",
      "Pause briefly if comfortable.",
      "Exhale without forcing your breath.",
      "Repeat for several comfortable breaths.",
    ],
  },

  "mindful-walking": {
    title: "Mindful Walking",
    category: "Mindfulness",
    duration: "10 min",
    level: "All levels",
    symbol: "❋",
    description: "Notice your surroundings while walking.",
    steps: [
      "Walk at a comfortable pace.",
      "Notice each step.",
      "Observe the sounds and colors around you.",
      "Pause and notice how you feel.",
    ],
  },

  "foundations-of-yoga": {
    title: "Foundations of Yoga",
    category: "Yoga",
    duration: "15 min",
    level: "Beginner",
    symbol: "❀",
    description: "Learn simple yoga poses at your own pace.",
    steps: [
      "Find a comfortable standing position.",
      "Stretch gently within your comfort level.",
      "Move through simple poses without forcing them.",
      "Finish with a quiet moment of relaxation.",
    ],
  },

  "gratitude-and-reflection": {
    title: "Gratitude and Reflection",
    category: "Mindfulness",
    duration: "7 min",
    level: "All levels",
    symbol: "♡",
    description:
      "Take time to appreciate the small things in your day.",
    steps: [
      "Think of one thing you appreciate.",
      "Write it down or reflect on it quietly.",
      "Take a comfortable breath.",
      "Carry that reflection into the rest of your day.",
    ],
  },
} as const;

type PracticeSlug = keyof typeof practices;

export function generateStaticParams() {
  return Object.keys(practices).map((slug) => ({ slug }));
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!Object.prototype.hasOwnProperty.call(practices, slug)) {
    notFound();
  }

  const practice = practices[slug as PracticeSlug];

  return (
    <main className="min-h-screen bg-[#FAF8F2] text-[#292D2A]">
      <header className="border-b border-[#29483B]/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#29483B] text-white">
              ✿
            </span>

            <span className="font-semibold tracking-[0.15em]">
              ULTIMATE
            </span>
          </a>

          <a
            href="/explore"
            className="text-sm text-[#29483B] transition hover:underline"
          >
            ← Back to Explore
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="mb-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#E9EDE2] text-6xl sm:h-28 sm:w-28">
            {practice.symbol}
          </div>

          <div>
            <span className="text-sm uppercase tracking-widest text-[#68816B]">
              {practice.category}
            </span>

            <h1 className="mt-2 font-serif text-3xl sm:text-5xl">
              {practice.title}
            </h1>

            <p className="mt-2 text-[#626960]">
              {practice.duration} · {practice.level}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-serif text-2xl">
            About this practice
          </h2>

          <p className="mt-4 leading-8 text-[#626960]">
            {practice.description}
          </p>
        </div>

        <div className="mt-6">
          <PracticeSession
            slug={slug}
            title={practice.title}
            category={practice.category}
            duration={practice.duration}
            steps={practice.steps}
          />
        </div>

        <div className="mt-8 text-center">
          <a
            href="/explore"
            className="text-sm text-[#29483B] underline underline-offset-4 transition hover:text-[#68816B]"
          >
            Explore more practices
          </a>
        </div>
      </section>

      <footer className="border-t border-[#29483B]/10 px-6 py-8 text-center text-sm text-[#626960]">
        Take your time. Practise at your own pace.
      </footer>
    </main>
  );
}
