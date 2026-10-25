"use client";

import { useEffect, useMemo, useState } from "react";

const categories = [
  "All",
  "Yoga",
  "Meditation",
  "Breathing",
  "Mindfulness",
] as const;

const FAVORITES_KEY = "ultimate-favorites";
const PERSONALIZATION_KEY = "ultimate-personalization";

const activities = [
  {
    title: "A Gentle Morning Flow",
    slug: "a-gentle-morning-flow",
    category: "Yoga",
    duration: "12 min",
    minutes: 12,
    level: "Beginner",
    description: "Wake up with gentle stretches and mindful movement.",
    symbol: "☀",
    color: "bg-[#E9EDE2]",
  },
  {
    title: "A Moment of Stillness",
    slug: "a-moment-of-stillness",
    category: "Meditation",
    duration: "8 min",
    minutes: 8,
    level: "All levels",
    description:
      "Take a quiet pause and return your attention to the present.",
    symbol: "✧",
    color: "bg-[#EAE6F2]",
  },
  {
    title: "Relaxing Breath Practice",
    slug: "relaxing-breath-practice",
    category: "Breathing",
    duration: "5 min",
    minutes: 5,
    level: "Beginner",
    description:
      "Slow down and practise comfortable, gentle breathing.",
    symbol: "◉",
    color: "bg-[#F3E7E3]",
  },
  {
    title: "Mindful Walking",
    slug: "mindful-walking",
    category: "Mindfulness",
    duration: "10 min",
    minutes: 10,
    level: "All levels",
    description:
      "Notice the sounds, sensations, and details around you.",
    symbol: "❋",
    color: "bg-[#F0EBDD]",
  },
  {
    title: "Foundations of Yoga",
    slug: "foundations-of-yoga",
    category: "Yoga",
    duration: "15 min",
    minutes: 15,
    level: "Beginner",
    description:
      "Explore simple poses and move at your own pace.",
    symbol: "❀",
    color: "bg-[#E9EDE2]",
  },
  {
    title: "Gratitude and Reflection",
    slug: "gratitude-and-reflection",
    category: "Mindfulness",
    duration: "7 min",
    minutes: 7,
    level: "All levels",
    description:
      "Make a little space to reflect on everyday life.",
    symbol: "♡",
    color: "bg-[#F3E7E3]",
  },
];

type Activity = (typeof activities)[number];
type Category = (typeof categories)[number];

type Personalization = {
  categories: string[];
  sessionLength: string;
  dailyReminders: boolean;
};

const defaultPersonalization: Personalization = {
  categories: ["Yoga", "Meditation"],
  sessionLength: "10–15 minutes",
  dailyReminders: false,
};

function readFavorites(): string[] {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (slug): slug is string =>
        typeof slug === "string" &&
        activities.some((activity) => activity.slug === slug)
    );
  } catch {
    return [];
  }
}

function readPersonalization(): Personalization {
  try {
    const saved = localStorage.getItem(PERSONALIZATION_KEY);

    if (!saved) return defaultPersonalization;

    const parsed: unknown = JSON.parse(saved);

    if (!parsed || typeof parsed !== "object") {
      return defaultPersonalization;
    }

    const value = parsed as Partial<Personalization>;

    return {
      categories: Array.isArray(value.categories)
        ? value.categories.filter(
            (category): category is string =>
              typeof category === "string"
          )
        : defaultPersonalization.categories,
      sessionLength:
        typeof value.sessionLength === "string"
          ? value.sessionLength
          : defaultPersonalization.sessionLength,
      dailyReminders:
        typeof value.dailyReminders === "boolean"
          ? value.dailyReminders
          : defaultPersonalization.dailyReminders,
    };
  } catch {
    return defaultPersonalization;
  }
}

function matchesSessionLength(
  activity: Activity,
  sessionLength: string
): boolean {
  const minutes = activity.minutes;

  switch (sessionLength) {
    case "Under 5 minutes":
      return minutes < 5;

    case "5–10 minutes":
      return minutes >= 5 && minutes < 10;

    case "10–15 minutes":
      return minutes >= 10 && minutes < 15;

    case "15–20 minutes":
      return minutes >= 15 && minutes < 20;

    case "20+ minutes":
      return minutes >= 20;

    default:
      return true;
  }
}

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("All");

  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [storageError, setStorageError] = useState("");

  const [personalization, setPersonalization] =
    useState<Personalization>(defaultPersonalization);

  const [personalizationLoaded, setPersonalizationLoaded] =
    useState(false);

  useEffect(() => {
    setFavorites(readFavorites());
    setPersonalization(readPersonalization());

    setFavoritesLoaded(true);
    setPersonalizationLoaded(true);
  }, []);

  const recommendedActivities = useMemo(() => {
    if (!personalizationLoaded) return [];

    return activities.filter((activity) => {
      const matchesCategory =
        personalization.categories.length === 0 ||
        personalization.categories.includes(activity.category);

      const matchesDuration = matchesSessionLength(
        activity,
        personalization.sessionLength
      );

      return matchesCategory && matchesDuration;
    });
  }, [personalization, personalizationLoaded]);

  const filteredActivities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesCategory =
        selectedCategory === "All" ||
        activity.category === selectedCategory;

      const matchesSearch =
        !query ||
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  function toggleFavorite(activity: Activity) {
    if (!favoritesLoaded) return;

    const alreadySaved = favorites.includes(activity.slug);

    const updated = alreadySaved
      ? favorites.filter((slug) => slug !== activity.slug)
      : [...favorites, activity.slug];

    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      setFavorites(updated);
      setStorageError("");
    } catch {
      setStorageError(
        "Your favorite could not be saved. Check your browser storage and try again."
      );
    }
  }

  function renderActivityCard(activity: Activity) {
    const isFavorite = favorites.includes(activity.slug);

    const isRecommended = recommendedActivities.some(
      (recommended) => recommended.slug === activity.slug
    );

    return (
      <article
        key={activity.slug}
        className="overflow-hidden rounded-3xl border border-[#29483B]/10 bg-white/80 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div
          className={`${activity.color} relative flex h-44 items-center justify-center`}
        >
          <span className="flex h-24 w-24 items-center justify-center rounded-full border border-white/80 bg-white/60 font-serif text-6xl text-[#68816B]">
            {activity.symbol}
          </span>

          <button
            type="button"
            onClick={() => toggleFavorite(activity)}
            disabled={!favoritesLoaded}
            aria-label={
              isFavorite
                ? `Remove ${activity.title} from favorites`
                : `Save ${activity.title} to favorites`
            }
            aria-pressed={isFavorite}
            title={
              isFavorite
                ? "Remove from favorites"
                : "Save to favorites"
            }
            className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition hover:scale-110 disabled:cursor-wait disabled:opacity-60 ${
              isFavorite
                ? "bg-[#29483B] text-white"
                : "border border-[#29483B]/10 bg-white/90 text-[#29483B] hover:bg-white"
            }`}
          >
            <span className="text-xl" aria-hidden="true">
              {isFavorite ? "♥" : "♡"}
            </span>
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-[#E9EDE2] px-3 py-1.5 text-[#29483B]">
              {activity.category}
            </span>

            <span className="rounded-full bg-[#F0EBDD] px-3 py-1.5 text-[#626960]">
              {activity.duration}
            </span>

            {isRecommended && (
              <span className="rounded-full bg-[#29483B] px-3 py-1.5 font-medium text-white">
                ✦ Recommended
              </span>
            )}
          </div>

          <h3 className="mt-4 text-xl font-semibold">
            {activity.title}
          </h3>

          <p className="mt-2 min-h-12 text-sm leading-6 text-[#626960]">
            {activity.description}
          </p>

          <p className="mt-4 text-xs text-[#68816B]">
            {activity.level}
          </p>

          <a
            href={`/practice/${activity.slug}`}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#29483B] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#203A30]"
          >
            View Practice →
          </a>
        </div>
      </article>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F2] text-[#292D2A]">
      <header className="border-b border-[#29483B]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#29483B] text-xl text-white">
              ✿
            </span>

            <span className="text-xl font-semibold tracking-[0.15em]">
              ULTIMATE
            </span>
          </a>

          <nav className="flex items-center gap-3 text-sm sm:gap-5">
            <a
              href="/"
              className="text-[#626960] transition hover:text-[#29483B]"
            >
              Home
            </a>

            <span className="font-semibold text-[#29483B]">
              Explore
            </span>

            <a
              href="/favorites"
              className="flex items-center gap-1.5 text-[#626960] transition hover:text-[#29483B]"
            >
              <span aria-hidden="true">♥</span>
              <span>Favorites</span>

              {favorites.length > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#29483B] px-1 text-xs text-white">
                  {favorites.length}
                </span>
              )}
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-14 md:px-8 md:pb-14 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68816B]">
          Your journey, your pace
        </p>

        <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">
          Explore what feels{" "}
          <span className="italic text-[#68816B]">right.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-[#626960]">
          Discover simple practices for movement, stillness, and everyday
          mindfulness. Find something that suits your mood and take your
          time.
        </p>

        <label htmlFor="activity-search" className="sr-only">
          Search activities
        </label>

        <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-[#29483B]/15 bg-white px-5 py-4 focus-within:border-[#68816B]">
          <span aria-hidden="true" className="text-xl text-[#68816B]">
            ⌕
          </span>

          <input
            id="activity-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search yoga, meditation, breathing..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#93988F]"
          />
        </div>

        <div
          className="mt-7 flex flex-wrap gap-2"
          aria-label="Activity categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`rounded-full px-5 py-3 text-sm transition ${
                selectedCategory === category
                  ? "bg-[#29483B] font-medium text-white"
                  : "border border-[#29483B]/15 bg-white/70 text-[#535B53] hover:bg-[#F0EBDD]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[#626960]">
          <span>
            {favoritesLoaded
              ? `${favorites.length} saved ${
                  favorites.length === 1 ? "favorite" : "favorites"
                }`
              : "Loading favorites..."}
          </span>

          <a
            href="/favorites"
            className="font-medium text-[#29483B] underline underline-offset-4 hover:text-[#68816B]"
          >
            View saved practices →
          </a>
        </div>

        {storageError && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800"
          >
            {storageError}
          </p>
        )}
      </section>

      {/* Personalized recommendations */}
      <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68816B]">
              Made for your preferences
            </p>

            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
              Recommended for you
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#626960]">
              These practices are selected using your preferred categories
              and session length from Personalization in Settings.
            </p>
          </div>

          <a
            href="/settings"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#29483B]/20 px-5 py-3 text-sm font-medium text-[#29483B] transition hover:bg-[#E9EDE2]"
          >
            Edit preferences ↗
          </a>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {personalization.categories.length > 0 ? (
            personalization.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-[#E9EDE2] px-4 py-2 text-xs font-medium text-[#29483B]"
              >
                {category}
              </span>
            ))
          ) : (
            <span className="rounded-full bg-[#E9EDE2] px-4 py-2 text-xs text-[#29483B]">
              All categories
            </span>
          )}

          <span className="rounded-full bg-[#F0EBDD] px-4 py-2 text-xs text-[#626960]">
            ⏱ {personalization.sessionLength}
          </span>
        </div>

        {!personalizationLoaded ? (
          <p className="rounded-2xl border border-[#29483B]/10 bg-white/70 p-8 text-sm text-[#626960]">
            Loading your preferences...
          </p>
        ) : recommendedActivities.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedActivities.map(renderActivityCard)}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#29483B]/20 px-6 py-12 text-center">
            <span className="text-4xl text-[#68816B]">✿</span>

            <h3 className="mt-4 text-xl font-semibold">
              No exact matches yet
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#626960]">
              Your current category and session-length preferences do not
              match any practices in the library. You can adjust them in
              Settings or explore the full library below.
            </p>

            <a
              href="/settings"
              className="mt-5 inline-flex rounded-full bg-[#29483B] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#203A30]"
            >
              Update preferences →
            </a>
          </div>
        )}
      </section>

      {/* Full practice library */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-24">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68816B]">
              The practice library
            </p>

            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
              Find your starting point
            </h2>
          </div>

          <p className="text-sm text-[#626960]">
            {filteredActivities.length}{" "}
            {filteredActivities.length === 1 ? "practice" : "practices"}
          </p>
        </div>

        {filteredActivities.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map(renderActivityCard)}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#29483B]/20 px-6 py-16 text-center">
            <span className="text-4xl text-[#68816B]">✿</span>

            <h3 className="mt-4 text-xl font-semibold">
              No practices found
            </h3>

            <p className="mt-2 text-sm text-[#626960]">
              Try another search or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-5 rounded-full bg-[#29483B] px-5 py-3 text-sm font-medium text-white hover:bg-[#203A30]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <footer className="border-t border-[#29483B]/10 bg-[#F0EBDD]/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[#626960] sm:flex-row sm:items-center sm:justify-between md:px-8">
          <a
            href="/"
            className="font-semibold tracking-[0.15em] text-[#29483B]"
          >
            ✿ ULTIMATE
          </a>

          <p>Move mindfully. Live intentionally. Grow gently.</p>

          <a href="/" className="hover:text-[#29483B]">
            Back to home ↑
          </a>
        </div>
      </footer>
    </main>
  );
}