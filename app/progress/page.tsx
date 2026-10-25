"use client";

import { useEffect, useState } from "react";

type PracticeEntry = {
  slug: string;
  title: string;
  category: string;
  duration: number;
  completedAt: string;
};

type ChartDay = {
  day: string;
  date: Date | null;
  minutes: number;
};

const STORAGE_KEY = "ultimate-progress";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getMonday(date: Date): Date {
  const result = startOfDay(date);
  const day = result.getDay();
  result.setDate(result.getDate() + (day === 0 ? -6 : 1 - day));
  return result;
}

function readProgress(): PracticeEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item: unknown): item is PracticeEntry => {
        if (typeof item !== "object" || item === null) {
          return false;
        }

        const entry = item as Record<string, unknown>;

        return (
          typeof entry.slug === "string" &&
          typeof entry.title === "string" &&
          typeof entry.category === "string" &&
          typeof entry.duration === "number" &&
          typeof entry.completedAt === "string"
        );
      }
    );
  } catch {
    return [];
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getActivityIcon(category: string): string {
  switch (category.toLowerCase()) {
    case "yoga":
      return "◉";
    case "meditation":
      return "☼";
    case "breathing":
      return "≈";
    case "mindfulness":
      return "✳";
    default:
      return "✦";
  }
}

function StatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#E8E8DF] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="text-sm text-[#899184]">{label}</span>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDF1E9] text-lg text-[#526653]">
          {icon}
        </span>
      </div>

      <p className="text-3xl font-semibold tracking-tight">{value}</p>

      <p className="mt-2 text-xs text-[#899184]">{detail}</p>
    </div>
  );
}

export default function ProgressPage() {
  const [entries, setEntries] = useState<PracticeEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [weekStart, setWeekStart] = useState<Date | null>(null);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();

    setWeekStart(getMonday(now));
    setToday(startOfDay(now));
    setEntries(readProgress());
    setLoaded(true);
  }, []);

  const weeklyEntries = entries.filter((entry) => {
    if (!weekStart) {
      return false;
    }

    const completedDate = new Date(entry.completedAt);

    if (Number.isNaN(completedDate.getTime())) {
      return false;
    }

    const nextWeek = new Date(weekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);

    return completedDate >= weekStart && completedDate < nextWeek;
  });

  const weeklyMinutes = weeklyEntries.reduce(
    (total, entry) => total + entry.duration,
    0
  );

  const totalMinutes = entries.reduce(
    (total, entry) => total + entry.duration,
    0
  );

  const todayEntries = entries.filter((entry) => {
    if (!today) {
      return false;
    }

    const completedDate = new Date(entry.completedAt);

    if (Number.isNaN(completedDate.getTime())) {
      return false;
    }

    return startOfDay(completedDate).getTime() === today.getTime();
  });

  const chartData: ChartDay[] = WEEKDAYS.map((day, index) => {
    const date = weekStart ? new Date(weekStart) : null;

    if (date) {
      date.setDate(date.getDate() + index);
    }

    const sessions = weeklyEntries.filter((entry) => {
      if (!date) {
        return false;
      }

      const completedDate = new Date(entry.completedAt);

      if (Number.isNaN(completedDate.getTime())) {
        return false;
      }

      return startOfDay(completedDate).getTime() === date.getTime();
    });

    return {
      day,
      date,
      minutes: sessions.reduce((total, entry) => total + entry.duration, 0),
    };
  });

  const maxMinutes = Math.max(
    10,
    ...chartData.map((item) => item.minutes)
  );

  const recentEntries = [...entries]
    .filter((entry) => !Number.isNaN(new Date(entry.completedAt).getTime()))
    .sort(
      (a, b) =>
        new Date(b.completedAt).getTime() -
        new Date(a.completedAt).getTime()
    )
    .slice(0, 5);

  if (!loaded || !weekStart || !today) {
    return (
      <main className="min-h-screen bg-[#F8F7F2] px-6 py-20 text-center text-[#526653]">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#DCE5D8] border-t-[#526653]" />
        <p className="mt-4 text-sm">Loading your progress...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F2] text-[#263A2D]">
      <header className="sticky top-0 z-20 border-b border-[#E8E8DF] bg-[#F8F7F2]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCE5D8] text-xl text-[#355640]">
              ✳
            </span>

            <span className="text-xl font-semibold tracking-[0.18em]">
              ULTIMATE
            </span>
          </a>

          <nav className="flex flex-wrap items-center justify-end gap-5 text-sm text-[#687568]">
            <a href="/explore" className="transition hover:text-[#263A2D]">
              Explore
            </a>

            <a href="/favorites" className="transition hover:text-[#263A2D]">
              Favorites
            </a>

            <a href="/progress" className="font-semibold text-[#355640]">
              Progress
            </a>

            <a href="/profile" className="transition hover:text-[#263A2D]">
              Profile
            </a>

            <a href="/settings" className="transition hover:text-[#263A2D]">
              Settings
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#80917D]">
            Your wellness journey
          </p>

          <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
            Your progress
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-[#788176]">
            Every little moment counts. Take a look at the time you have
            dedicated to yourself and celebrate the progress you are making.
          </p>
        </div>

        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Today's sessions"
            value={String(todayEntries.length)}
            detail="Moments for yourself"
            icon="☼"
          />

          <StatCard
            label="This week's sessions"
            value={String(weeklyEntries.length)}
            detail="Your weekly practice"
            icon="✳"
          />

          <StatCard
            label="Minutes this week"
            value={String(weeklyMinutes)}
            detail="Time invested in you"
            icon="◷"
          />

          <StatCard
            label="Total minutes"
            value={String(totalMinutes)}
            detail="Every minute matters"
            icon="♡"
          />
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-[28px] border border-[#E8E8DF] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Your weekly rhythm</h2>

                <p className="mt-2 text-sm text-[#899184]">
                  Minutes spent practicing each day
                </p>
              </div>

              <span className="rounded-full bg-[#EDF1E9] px-4 py-2 text-xs font-medium text-[#526653]">
                {formatDate(weekStart)} –{" "}
                {formatDate(
                  new Date(
                    weekStart.getFullYear(),
                    weekStart.getMonth(),
                    weekStart.getDate() + 6
                  )
                )}
              </span>
            </div>

            <div className="flex h-56 items-end justify-between gap-3 border-b border-[#E8E8DF] pb-3">
              {chartData.map((item) => {
                const height =
                  item.minutes > 0
                    ? Math.max((item.minutes / maxMinutes) * 100, 6)
                    : 3;

                const isToday =
                  item.date !== null &&
                  item.date.getTime() === today.getTime();

                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <span className="text-xs font-medium text-[#71806E]">
                      {item.minutes > 0 ? item.minutes : ""}
                    </span>

                    <div className="flex h-36 w-full items-end justify-center">
                      <div
                        title={`${item.minutes} minutes`}
                        className={`w-full max-w-10 rounded-t-xl transition-all duration-500 ${
                          item.minutes > 0
                            ? isToday
                              ? "bg-[#456B50]"
                              : "bg-[#B9CCB4]"
                            : "bg-[#EDF0E9]"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>

                    <span
                      className={`text-xs ${
                        isToday
                          ? "font-semibold text-[#355640]"
                          : "text-[#92998E]"
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm text-[#899184]">
              <span>
                {weeklyEntries.length}{" "}
                {weeklyEntries.length === 1 ? "session" : "sessions"} this week
              </span>

              <span>{weeklyMinutes} minutes total</span>
            </div>
          </section>

          <section className="rounded-[28px] bg-[#E6EDE1] p-7 md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-2xl text-[#526653]">
              ☘
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#71836D]">
              A gentle reminder
            </p>

            <h2 className="text-2xl font-medium leading-snug">
              Progress is not about perfection.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#71806E]">
              Some days you will do more, and some days you will do less.
              Showing up for yourself in whatever way you can is what matters.
            </p>

            <a
              href="/explore"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#355640] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#263F2E]"
            >
              Find your next practice <span className="ml-2">→</span>
            </a>
          </section>
        </div>

        <section className="mt-8 rounded-[28px] border border-[#E8E8DF] bg-white p-6 shadow-sm md:p-8">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Recent practices</h2>

              <p className="mt-2 text-sm text-[#899184]">
                A little collection of moments you have made time for.
              </p>
            </div>

            <a
              href="/explore"
              className="text-sm font-medium text-[#526653] transition hover:text-[#263A2D]"
            >
              Explore practices →
            </a>
          </div>

          {recentEntries.length === 0 ? (
            <div className="rounded-2xl bg-[#F8F7F2] px-6 py-12 text-center">
              <div className="mb-4 text-3xl text-[#80917D]">✳</div>

              <h3 className="text-lg font-medium">
                Your journey starts here
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#899184]">
                Once you complete a practice, it will appear here. Start with
                something small and make a little space for yourself.
              </p>

              <a
                href="/explore"
                className="mt-6 inline-flex rounded-full bg-[#355640] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#263F2E]"
              >
                Explore practices
              </a>
            </div>
          ) : (
            <div className="divide-y divide-[#ECEDE6]">
              {recentEntries.map((entry, index) => (
                <a
                  key={`${entry.slug}-${entry.completedAt}-${index}`}
                  href={`/practice/${entry.slug}`}
                  className="group flex items-center gap-4 py-5 first:pt-0 last:pb-0"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EDF1E9] text-xl text-[#526653]">
                    {getActivityIcon(entry.category)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium transition group-hover:text-[#526653]">
                      {entry.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#899184]">
                      {entry.category} ·{" "}
                      {formatDate(new Date(entry.completedAt))}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-medium">{entry.duration} min</p>

                    <p className="mt-1 text-xs text-[#899184]">Completed</p>
                  </div>

                  <span className="ml-1 text-[#9BA597] transition group-hover:translate-x-1 group-hover:text-[#526653]">
                    →
                  </span>
                </a>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-12 border-t border-[#E8E8DF] pt-6 text-center text-xs text-[#9AA093]">
          Small steps, meaningful change. Keep going at your own pace.
        </footer>
      </section>
    </main>
  );
}