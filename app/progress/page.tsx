
"use client";

import { useEffect, useState } from "react";

type PracticeEntry = {
  slug: string;
  title: string;
  category: string;
  duration: number;
  completedAt: string;
};

const STORAGE_KEY = "ultimate-progress";

const weeklyDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getDayStart(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

function getMonday(date: Date) {
  const result = getDayStart(date);
  const day = result.getDay();
  result.setDate(result.getDate() - (day === 0 ? 6 : day - 1));
  return result;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Recently completed";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function readProgress(): PracticeEntry[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (entry): entry is PracticeEntry =>
        entry !== null &&
        typeof entry === "object" &&
        typeof entry.slug === "string" &&
        typeof entry.title === "string" &&
        typeof entry.category === "string" &&
        typeof entry.duration === "number" &&
        Number.isFinite(entry.duration) &&
        entry.duration >= 0 &&
        typeof entry.completedAt === "string"
    );
  } catch {
    return [];
  }
}

export default function ProgressPage() {
  const [entries, setEntries] = useState<PracticeEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEntries(readProgress());
    setLoaded(true);
  }, []);

  const totalMinutes = entries.reduce(
    (total, entry) => total + entry.duration,
    0
  );

  const weekStart = getMonday(new Date());
  const today = getDayStart(new Date());

  const weeklyEntries = entries.filter((entry) => {
    const date = new Date(entry.completedAt);

    return (
      !Number.isNaN(date.getTime()) &&
      getDayStart(date).getTime() >= weekStart.getTime() &&
      getDayStart(date).getTime() <= today.getTime()
    );
  });

  const weeklyMinutes = weeklyEntries.reduce(
    (total, entry) => total + entry.duration,
    0
  );

  const dailyActivity = weeklyDays.map((day, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);

    const dayEntries = weeklyEntries.filter((entry) => {
      const completedDate = new Date(entry.completedAt);

      return (
        !Number.isNaN(completedDate.getTime()) &&
        getDayStart(completedDate).getTime() === date.getTime()
      );
    });

    return {
      day,
      shortDay: day.slice(0, 3),
      minutes: dayEntries.reduce(
        (total, entry) => total + entry.duration,
        0
      ),
      sessions: dayEntries.length,
      isFuture: date.getTime() > today.getTime(),
    };
  });

  const maxDailyMinutes = Math.max(
    1,
    ...dailyActivity.map((day) => day.minutes)
  );

  const recentEntries = [...entries]
    .sort(
      (a, b) =>
        new Date(b.completedAt).getTime() -
        new Date(a.completedAt).getTime()
    )
    .slice(0, 5);

  const todaySessions = entries.filter((entry) => {
    const date = new Date(entry.completedAt);

    return (
      !Number.isNaN(date.getTime()) &&
      getDayStart(date).getTime() === today.getTime()
    );
  }).length;

  return (
    <main className="min-h-screen bg-[#FAF8F2] text-[#292D2A]">
      <header className="border-b border-[#29483B]/10 bg-[#FAF8F2]/90">
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
              aria-current="page"
              className="font-semibold text-[#29483B]"
            >
              Progress
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#68816B]">
            Your wellness journey
          </p>

          <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Every little step counts.
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#626960]">
            Take a moment to reflect on your practice, celebrate
            your progress, and make space for yourself.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-[#E9EDE2] p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#526456]">
                Practices completed
              </span>
              <span className="text-2xl text-[#29483B]">✧</span>
            </div>

            <p className="mt-5 text-4xl font-semibold text-[#29483B]">
              {loaded ? entries.length : "—"}
            </p>

            <p className="mt-2 text-sm text-[#526456]">
              Every session matters
            </p>
          </div>

          <div className="rounded-3xl bg-[#F3E7E3] p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#765B50]">
                Minutes practised
              </span>
              <span className="text-2xl text-[#765B50]">◷</span>
            </div>

            <p className="mt-5 text-4xl font-semibold text-[#765B50]">
              {loaded ? totalMinutes : "—"}
            </p>

            <p className="mt-2 text-sm text-[#765B50]">
              Time dedicated to you
            </p>
          </div>

          <div className="rounded-3xl bg-[#EAE6F2] p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#625577]">
                This week
              </span>
              <span className="text-2xl text-[#625577]">↗</span>
            </div>

            <p className="mt-5 text-4xl font-semibold text-[#625577]">
              {loaded ? weeklyEntries.length : "—"}
            </p>

            <p className="mt-2 text-sm text-[#625577]">
              Completed sessions this week
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 ring-1 ring-[#29483B]/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#626960]">
                Today
              </span>
              <span className="text-2xl text-[#68816B]">♡</span>
            </div>

            <p className="mt-5 text-4xl font-semibold text-[#29483B]">
              {loaded ? todaySessions : "—"}
            </p>

            <p className="mt-2 text-sm text-[#626960]">
              Sessions completed today
            </p>
          </div>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl">
                  Your weekly rhythm
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#626960]">
                  Your practice minutes, day by day.
                </p>
              </div>

              <span className="rounded-full bg-[#E9EDE2] px-3 py-1.5 text-xs font-medium text-[#29483B]">
                This week
              </span>
            </div>

            <div className="mt-8 flex h-48 items-end gap-2 sm:gap-4">
              {dailyActivity.map((day) => {
                const barHeight =
                  day.minutes === 0
                    ? 4
                    : Math.max(
                        8,
                        (day.minutes / maxDailyMinutes) * 100
                      );

                return (
                  <div
                    key={day.day}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
                  >
                    <span className="text-xs text-[#626960]">
                      {day.minutes > 0 ? `${day.minutes}m` : ""}
                    </span>

                    <div className="flex h-32 w-full items-end">
                      <div
                        title={`${day.day}: ${day.minutes} minutes`}
                        className={`w-full rounded-t-xl transition-all duration-500 ${
                          day.isFuture
                            ? "bg-[#F1EFE8]"
                            : day.minutes > 0
                              ? "bg-[#68816B]"
                              : "bg-[#E9EDE2]"
                        }`}
                        style={{ height: `${barHeight}%` }}
                      />
                    </div>

                    <span className="text-xs text-[#626960]">
                      {day.shortDay}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#29483B]/10 pt-5">
              <span className="text-sm text-[#626960]">
                Weekly practice time
              </span>
              <span className="font-semibold text-[#29483B]">
                {loaded ? `${weeklyMinutes} min` : "—"}
              </span>
            </div>
          </section>

          <section className="rounded-3xl bg-[#29483B] p-6 text-white sm:p-8">
            <span className="text-3xl">✿</span>

            <h2 className="mt-5 font-serif text-2xl">
              A gentle reminder
            </h2>

            <p className="mt-4 leading-7 text-white/80">
              Your wellness journey is your own. You do not
              need to do everything at once. Small, consistent
              moments of care can be meaningful.
            </p>

            <a
              href="/explore"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FAF8F2] px-6 py-3 text-sm font-semibold text-[#29483B] transition hover:bg-white"
            >
              Explore practices
              <span aria-hidden="true">→</span>
            </a>
          </section>
        </div>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl">
                Recent practices
              </h2>
              <p className="mt-2 text-sm text-[#626960]">
                A record of the sessions you have completed.
              </p>
            </div>

            <span className="rounded-full bg-[#F7F5EF] px-3 py-1.5 text-xs text-[#626960]">
              {loaded ? `${entries.length} total` : "Loading"}
            </span>
          </div>

          {!loaded ? (
            <div className="mt-8 rounded-2xl bg-[#F7F5EF] p-8 text-center text-[#626960]">
              Loading your progress...
            </div>
          ) : recentEntries.length === 0 ? (
            <div className="mt-8 rounded-2xl bg-[#F7F5EF] px-5 py-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9EDE2] text-3xl text-[#29483B]">
                ♡
              </div>

              <h3 className="mt-5 font-serif text-xl">
                Your journey starts here
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#626960]">
                Once you complete a practice, it will appear here.
                Your practice history and totals will update
                automatically.
              </p>

              <a
                href="/explore"
                className="mt-6 inline-flex rounded-full bg-[#29483B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#203A30]"
              >
                Find your first practice
              </a>
            </div>
          ) : (
            <div className="mt-6 divide-y divide-[#29483B]/10">
              {recentEntries.map((entry, index) => (
                <a
                  key={`${entry.slug}-${entry.completedAt}-${index}`}
                  href={`/practice/${entry.slug}`}
                  className="flex items-center gap-4 py-5 transition hover:bg-[#FAF8F2]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9EDE2] text-xl text-[#29483B]">
                    {entry.category === "Yoga"
                      ? "☀"
                      : entry.category === "Meditation"
                        ? "✧"
                        : entry.category === "Breathing"
                          ? "◉"
                          : "♡"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium text-[#292D2A]">
                      {entry.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#626960]">
                      {entry.category} · {formatDate(entry.completedAt)}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-semibold text-[#29483B]">
                      {entry.duration} min
                    </p>
                    <p className="mt-1 text-xs text-[#68816B]">
                      Completed
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        <p className="mt-8 text-center text-xs leading-6 text-[#85877F]">
          Your progress is currently stored in this browser on this device.
          It is not yet synced across devices or accounts.
        </p>
      </section>
    </main>
  );
}
