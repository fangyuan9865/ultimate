
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Profile = {
  name: string;
  bio: string;
  goal: string;
  favoriteActivity: string;
  experience: string;
  avatar: string;
};

type Session = {
  slug: string;
  title: string;
  category: string;
  duration: number;
  completedAt: string;
};

const defaultProfile: Profile = {
  name: "Wellness Explorer",
  bio: "Making space for a calmer, healthier me.",
  goal: "Build a consistent wellness routine",
  favoriteActivity: "Meditation",
  experience: "Beginner",
  avatar: "🌿",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("ultimate-profile");
      const savedProgress = localStorage.getItem("ultimate-progress");

      if (savedProfile) {
        setProfile({ ...defaultProfile, ...JSON.parse(savedProfile) });
      }

      if (savedProgress) {
        const parsed: unknown = JSON.parse(savedProgress);
        if (Array.isArray(parsed)) setSessions(parsed);
      }
    } catch {
      console.warn("Unable to read saved ULTIMATE data.");
    }

    setLoaded(true);
  }, []);

  const minutes = sessions.reduce(
    (sum, session) => sum + (Number(session.duration) || 0),
    0
  );

  const recentSessions = [...sessions]
    .filter((session) => session?.title)
    .sort(
      (a, b) =>
        new Date(b.completedAt).getTime() -
        new Date(a.completedAt).getTime()
    )
    .slice(0, 3);

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f7f1] text-[#526b53]">
        Loading your profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#263b2c]">
      <header className="border-b border-[#e7e8dc] bg-[#fdfcf8]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-[#355740]">
            ultimate<span className="text-[#b0b98c]">.</span>
          </Link>

          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-2 text-sm sm:gap-3">
            <Link href="/explore" className="rounded-full px-4 py-2 text-[#647464] transition hover:bg-[#eef0e6] hover:text-[#355740]">
              Explore
            </Link>
            <Link href="/favorites" className="rounded-full px-4 py-2 text-[#647464] transition hover:bg-[#eef0e6] hover:text-[#355740]">
              Favorites
            </Link>
            <Link href="/progress" className="rounded-full px-4 py-2 text-[#647464] transition hover:bg-[#eef0e6] hover:text-[#355740]">
              Progress
            </Link>
            <Link href="/profile" aria-current="page" className="rounded-full bg-[#e7ecdf] px-4 py-2 font-medium text-[#355740]">
              Profile
            </Link>
            <Link href="/settings" className="rounded-full px-4 py-2 text-[#647464] transition hover:bg-[#eef0e6] hover:text-[#355740]">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8 sm:py-14">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#e7ecdf] p-7 sm:p-11">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-white/40 blur-2xl" />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-white/80 bg-[#f8f7f1] text-5xl shadow-sm">
              {profile.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#72836a]">
                Your personal space
              </p>
              <h1 className="mt-2 break-words text-4xl font-medium tracking-tight text-[#2f4935] sm:text-5xl">
                {profile.name || "Wellness Explorer"}
              </h1>
              <p className="mt-3 max-w-2xl whitespace-pre-wrap text-sm leading-7 text-[#62745f] sm:text-base">
                {profile.bio || "Making space for your wellbeing, one day at a time."}
              </p>
              <p className="mt-4 inline-flex rounded-full border border-[#cbd5c0] bg-white/50 px-4 py-2 text-sm text-[#536c50]">
                {profile.experience} · {profile.favoriteActivity}
              </p>
            </div>
            <Link
              href="/settings"
              className="inline-flex shrink-0 items-center rounded-full bg-[#46694b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#355740] focus:outline-none focus:ring-4 focus:ring-[#cbd9c3]"
            >
              Edit in Settings ↗
            </Link>
          </div>
        </section>

        <section className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Sessions completed", value: String(sessions.length), icon: "🌱" },
            { label: "Practice minutes", value: String(minutes), icon: "☀️" },
            { label: "Favorite activity", value: profile.favoriteActivity, icon: "🌸" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-[#e9e8de] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-[#7b8877]">{item.label}</span>
                <span className="text-xl">{item.icon}</span>
              </div>
              <p className="mt-4 break-words text-3xl font-medium tracking-tight text-[#355740]">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-8 grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-[#e9e8de] bg-white p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a987e]">
              Your direction
            </p>
            <h2 className="mt-3 text-2xl font-medium text-[#355740]">
              Your wellness goal
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#60745c]">
              {profile.goal}
            </p>
            <div className="mt-7 rounded-2xl bg-[#f5f6ef] p-5">
              <p className="text-sm leading-7 text-[#788573]">
                You do not need to do everything at once. Small, consistent
                steps can make room for a more mindful routine.
              </p>
            </div>
            <Link href="/explore" className="mt-6 inline-flex rounded-full border border-[#dce2d4] px-5 py-3 text-sm font-medium text-[#466448] transition hover:bg-[#f5f6ef]">
              Explore activities →
            </Link>
          </section>

          <section className="rounded-[2rem] border border-[#e9e8de] bg-white p-7 sm:p-9">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a987e]">
                  Looking back
                </p>
                <h2 className="mt-2 text-xl font-medium text-[#355740]">
                  Recent practices
                </h2>
              </div>
              <Link href="/progress" className="text-sm font-medium text-[#668361] hover:text-[#355740]">
                View all →
              </Link>
            </div>

            {recentSessions.length ? (
              <div className="mt-6 space-y-3">
                {recentSessions.map((session, index) => (
                  <div key={`${session.slug}-${session.completedAt}-${index}`} className="flex items-center gap-4 rounded-2xl bg-[#faf9f5] p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8eddf] text-xl">
                      {session.category === "Yoga" ? "🧘" : session.category === "Meditation" ? "🌿" : session.category === "Breathing" ? "🌬️" : "☀️"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#405640]">{session.title}</p>
                      <p className="mt-1 text-xs text-[#899184]">
                        {Number(session.duration) || 0} minutes
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl bg-[#faf9f5] px-5 py-8 text-center">
                <div className="text-3xl">🍃</div>
                <p className="mt-3 text-sm font-medium text-[#53674f]">
                  Your journey starts here
                </p>
                <p className="mt-2 text-sm leading-6 text-[#8b9385]">
                  Complete a practice and your recent activity will appear here.
                </p>
                <Link href="/explore" className="mt-4 inline-block text-sm font-medium text-[#55764f] hover:underline">
                  Find your first practice →
                </Link>
              </div>
            )}
          </section>
        </div>

        <footer className="pt-12 text-center text-xs tracking-wide text-[#9aa092]">
          ULTIMATE · YOUR WELLNESS, YOUR WAY
        </footer>
      </div>
    </main>
  );
}
