
"use client";

import { useEffect, useState } from "react";

type Practice = {
  slug: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  symbol: string;
  description: string;
};

const STORAGE_KEY = "ultimate-favorites";

const practices: Practice[] = [
  {
    slug: "a-gentle-morning-flow",
    title: "A Gentle Morning Flow",
    category: "Yoga",
    duration: "12 min",
    level: "Beginner",
    symbol: "☀",
    description:
      "Wake up your body with gentle stretches and mindful movement.",
  },
  {
    slug: "a-moment-of-stillness",
    title: "A Moment of Stillness",
    category: "Meditation",
    duration: "8 min",
    level: "All levels",
    symbol: "✧",
    description:
      "Take a quiet pause and return your attention to the present.",
  },
  {
    slug: "relaxing-breath-practice",
    title: "Relaxing Breath Practice",
    category: "Breathing",
    duration: "5 min",
    level: "Beginner",
    symbol: "◉",
    description: "Slow down with gentle breathing.",
  },
  {
    slug: "mindful-walking",
    title: "Mindful Walking",
    category: "Mindfulness",
    duration: "10 min",
    level: "All levels",
    symbol: "❋",
    description: "Notice your surroundings while walking.",
  },
  {
    slug: "foundations-of-yoga",
    title: "Foundations of Yoga",
    category: "Yoga",
    duration: "15 min",
    level: "Beginner",
    symbol: "❀",
    description: "Learn simple yoga poses at your own pace.",
  },
  {
    slug: "gratitude-and-reflection",
    title: "Gratitude and Reflection",
    category: "Mindfulness",
    duration: "7 min",
    level: "All levels",
    symbol: "♡",
    description:
      "Take time to appreciate the small things in your day.",
  },
];

function readFavorites(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (slug): slug is string =>
        typeof slug === "string" &&
        practices.some((practice) => practice.slug === slug)
    );
  } catch {
    return [];
  }
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFavorites(readFavorites());
    setLoaded(true);
  }, []);

  function removeFavorite(slug: string) {
    const updated = favorites.filter((item) => item !== slug);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setFavorites(updated);
    } catch {
      // Keep the current list visible if browser storage is unavailable.
    }
  }

  const savedPractices = practices.filter((practice) =>
    favorites.includes(practice.slug)
  );

  return (
    <main className="min-h-screen bg-[#FAF8F2] text-[#292D2A]">
      <header className="border-b border-[#29483B]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#29483B] text-xl text-white">
              ✿
            </span>
            <span className="font-semibold tracking-[0.15em]">
              ULTIMATE
            </span>
          </a>

          <nav className="flex items-center gap-4 text-sm sm:gap-7">
            <a
              href="/explore"
              className="text-[#626960] transition hover:text-[#29483B]"
            >
              Explore
            </a>
            <a
              href="/progress"
              className="text-[#626960] transition hover:text-[#29483B]"
            >
              Progress
            </a>
            <a
              href="/favorites"
              aria-current="page"
              className="font-semibold text-[#29483B]"
            >
              Favorites
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#68816B]">
            Your personal collection
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Practices you love.
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#626960]">
            Keep the practices that feel right for you close at hand.
            Revisit them whenever you need a moment for yourself.
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between rounded-2xl bg-[#E9EDE2] p-5">
          <div>
            <p className="text-sm text-[#526456]">
              Your saved collection
            </p>
            <p className="mt-1 text-2xl font-semibold text-[#29483B]">
              {loaded ? savedPractices.length : "—"}{" "}
              <span className="text-base font-normal">
                {savedPractices.length === 1 ? "practice" : "practices"}
              </span>
            </p>
          </div>

          <span className="text-3xl text-[#29483B]">♡</span>
        </div>

        {!loaded ? (
          <div className="rounded-3xl bg-white p-10 text-center text-[#626960]">
            Loading your favorites...
          </div>
        ) : savedPractices.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9EDE2] text-3xl text-[#29483B]">
              ♡
            </div>

            <h2 className="mt-5 font-serif text-2xl">
              Your collection starts here
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-[#626960]">
              You haven't saved any practices yet. Visit Explore
              and tap the heart on a practice to add it to your
              personal collection.
            </p>

            <a
              href="/explore"
              className="mt-7 inline-flex rounded-full bg-[#29483B] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#203A30]"
            >
              Explore practices →
            </a>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {savedPractices.map((practice) => (
              <article
                key={practice.slug}
                className="flex flex-col rounded-3xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9EDE2] text-3xl">
                    {practice.symbol}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFavorite(practice.slug)}
                    aria-label={`Remove ${practice.title} from favorites`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5EF] text-xl text-[#29483B] transition hover:bg-[#F3E7E3] hover:text-[#765B50]"
                    title="Remove from favorites"
                  >
                    ♥
                  </button>
                </div>

                <p className="mt-6 text-xs font-medium uppercase tracking-[0.15em] text-[#68816B]">
                  {practice.category}
                </p>

                <h2 className="mt-2 font-serif text-2xl">
                  {practice.title}
                </h2>

                <p className="mt-3 flex-1 leading-7 text-[#626960]">
                  {practice.description}
                </p>

                <p className="mt-5 text-sm text-[#626960]">
                  {practice.duration} · {practice.level}
                </p>

                <a
                  href={`/practice/${practice.slug}`}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#29483B] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#203A30]"
                >
                  Start Practice →
                </a>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href="/explore"
            className="text-sm text-[#29483B] underline underline-offset-4 transition hover:text-[#68816B]"
          >
            Discover more practices
          </a>
        </div>
      </section>

      <footer className="border-t border-[#29483B]/10 px-6 py-8 text-center text-sm text-[#626960]">
        Make space for what helps you feel well.
      </footer>
    </main>
  );
}
