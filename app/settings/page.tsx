
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

type Profile = {
  name: string;
  bio: string;
  goal: string;
  favoriteActivity: string;
  experience: string;
  avatar: string;
};

type Personalization = {
  categories: string[];
  sessionLength: string;
  dailyReminders: boolean;
};

const PROFILE_KEY = "ultimate-profile";
const PERSONALIZATION_KEY = "ultimate-personalization";

const defaults: Profile = {
  name: "Wellness Explorer",
  bio: "Making space for a calmer, healthier me.",
  goal: "Build a consistent wellness routine",
  favoriteActivity: "Meditation",
  experience: "Beginner",
  avatar: "🌿",
};

const defaultPersonalization: Personalization = {
  categories: ["Yoga", "Meditation"],
  sessionLength: "10–15 minutes",
  dailyReminders: false,
};

const avatars = ["🌿", "🌸", "☀️", "🌊", "🌱", "🦋", "🍃", "🌻"];

const activities = [
  "Yoga",
  "Meditation",
  "Breathing",
  "Mindfulness",
  "Walking",
  "Journaling",
];

const goals = [
  "Build a consistent wellness routine",
  "Reduce everyday stress",
  "Improve focus and mindfulness",
  "Become more active",
  "Make time for myself",
  "Sleep and rest better",
];

const categories = [
  { name: "Yoga", description: "Movement, balance and flexibility", icon: "🧘" },
  { name: "Meditation", description: "Quiet moments and inner calm", icon: "🪷" },
  { name: "Breathing", description: "Gentle breathing exercises", icon: "🌬️" },
  { name: "Mindfulness", description: "Be present in everyday life", icon: "🌱" },
  { name: "Walking", description: "Mindful movement outdoors", icon: "🚶" },
  { name: "Journaling", description: "Reflection and gratitude", icon: "📔" },
];

const inputClass =
  "w-full rounded-2xl border border-[#e5e7dc] bg-[#fcfbf7] px-4 py-3.5 text-sm text-[#263b2c] outline-none transition focus:border-[#8fa587] focus:ring-4 focus:ring-[#e9efe4]";

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile>(defaults);
  const [preferences, setPreferences] =
    useState<Personalization>(defaultPersonalization);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(PROFILE_KEY);
      if (storedProfile) {
        setProfile({ ...defaults, ...JSON.parse(storedProfile) });
      }

      const storedPreferences = localStorage.getItem(PERSONALIZATION_KEY);
      if (storedPreferences) {
        const parsed = JSON.parse(storedPreferences);

        setPreferences({
          ...defaultPersonalization,
          ...parsed,
          categories: Array.isArray(parsed.categories)
            ? parsed.categories
            : defaultPersonalization.categories,
        });
      }
    } catch {
      console.warn("Unable to load settings.");
    }

    setLoaded(true);
  }, []);

  function updateProfile<K extends keyof Profile>(
    key: K,
    value: Profile[K],
  ) {
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function updatePreferences<K extends keyof Personalization>(
    key: K,
    value: Personalization[K],
  ) {
    setPreferences((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function toggleCategory(category: string) {
    setPreferences((current) => {
      const selected = current.categories.includes(category);

      return {
        ...current,
        categories: selected
          ? current.categories.filter((item) => item !== category)
          : [...current.categories, category],
      };
    });

    setSaved(false);
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      localStorage.setItem(
        PERSONALIZATION_KEY,
        JSON.stringify(preferences),
      );
      setSaved(true);
    } catch {
      window.alert(
        "Could not save your settings. Please check your browser storage.",
      );
    }
  }

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f7f1] text-[#526b53]">
        Loading settings...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#263b2c]">
      <header className="border-b border-[#e7e8dc] bg-[#fdfcf8]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-[#355740]"
          >
            ultimate<span className="text-[#b0b98c]">.</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="flex flex-wrap items-center gap-2 text-sm sm:gap-3"
          >
            <Link
              href="/explore"
              className="rounded-full px-4 py-2 text-[#647464] transition hover:bg-[#eef0e6]"
            >
              Explore
            </Link>
            <Link
              href="/favorites"
              className="rounded-full px-4 py-2 text-[#647464] transition hover:bg-[#eef0e6]"
            >
              Favorites
            </Link>
            <Link
              href="/progress"
              className="rounded-full px-4 py-2 text-[#647464] transition hover:bg-[#eef0e6]"
            >
              Progress
            </Link>
            <Link
              href="/profile"
              className="rounded-full px-4 py-2 text-[#647464] transition hover:bg-[#eef0e6]"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              aria-current="page"
              className="rounded-full bg-[#e7ecdf] px-4 py-2 font-medium text-[#355740]"
            >
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <Link
          href="/profile"
          className="text-sm text-[#668361] hover:underline"
        >
          ← Back to profile
        </Link>

        <section className="mt-5 rounded-[2rem] bg-[#e7ecdf] p-7 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#72836a]">
            Your preferences
          </p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight text-[#2f4935]">
            Settings
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#62745f]">
            Make ULTIMATE feel more personal. Choose your interests,
            preferred session length and wellness goals.
          </p>
        </section>

        <form
          onSubmit={handleSave}
          className="mt-7 space-y-10 rounded-[2rem] border border-[#e9e8de] bg-white p-6 sm:p-9"
        >
          {/* PROFILE */}

          <section className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#89947e]">
                01 — Your profile
              </p>
              <h2 className="mt-2 text-2xl font-medium text-[#2f4935]">
                About you
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#788275]">
                Personalize how your profile appears.
              </p>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-[#465b46]">
                Profile avatar
              </label>
              <div className="flex flex-wrap gap-3">
                {avatars.map((avatar) => (
                  <button
                    key={avatar}
                    type="button"
                    aria-label={`Choose ${avatar} avatar`}
                    aria-pressed={profile.avatar === avatar}
                    onClick={() => updateProfile("avatar", avatar)}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition hover:-translate-y-1 ${
                      profile.avatar === avatar
                        ? "border-2 border-[#668361] bg-[#eaf0e3]"
                        : "border border-[#eeeee5] bg-[#faf9f5]"
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#465b46]"
              >
                Display name
              </label>
              <input
                id="name"
                value={profile.name}
                maxLength={50}
                onChange={(e) => updateProfile("name", e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-medium text-[#465b46]"
              >
                About you
              </label>
              <textarea
                id="bio"
                rows={3}
                maxLength={180}
                value={profile.bio}
                onChange={(e) => updateProfile("bio", e.target.value)}
                className={`${inputClass} leading-6`}
              />
              <p className="mt-1 text-right text-xs text-[#a0a79a]">
                {profile.bio.length}/180
              </p>
            </div>

            <div>
              <label
                htmlFor="goal"
                className="mb-2 block text-sm font-medium text-[#465b46]"
              >
                Wellness goal
              </label>
              <select
                id="goal"
                value={profile.goal}
                onChange={(e) => updateProfile("goal", e.target.value)}
                className={inputClass}
              >
                {goals.map((goal) => (
                  <option key={goal}>{goal}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="activity"
                  className="mb-2 block text-sm font-medium text-[#465b46]"
                >
                  Favorite activity
                </label>
                <select
                  id="activity"
                  value={profile.favoriteActivity}
                  onChange={(e) =>
                    updateProfile("favoriteActivity", e.target.value)
                  }
                  className={inputClass}
                >
                  {activities.map((activity) => (
                    <option key={activity}>{activity}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="experience"
                  className="mb-2 block text-sm font-medium text-[#465b46]"
                >
                  Experience level
                </label>
                <select
                  id="experience"
                  value={profile.experience}
                  onChange={(e) =>
                    updateProfile("experience", e.target.value)
                  }
                  className={inputClass}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
          </section>

          <div className="border-t border-[#eeeee6]" />

          {/* PERSONALIZATION */}

          <section className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#89947e]">
                02 — Personalization
              </p>
              <h2 className="mt-2 text-2xl font-medium text-[#2f4935]">
                Your wellness interests
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#788275]">
                Select the activities you enjoy. You can choose several or
                change them whenever you like.
              </p>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-medium text-[#465b46]">
                Preferred categories
              </legend>

              <div className="grid gap-3 sm:grid-cols-2">
                {categories.map((category) => {
                  const selected = preferences.categories.includes(
                    category.name,
                  );

                  return (
                    <label
                      key={category.name}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition hover:-translate-y-0.5 ${
                        selected
                          ? "border-[#9daf91] bg-[#f0f4eb]"
                          : "border-[#eeeee5] bg-[#fcfbf7] hover:border-[#cbd5c2]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleCategory(category.name)}
                        className="mt-1 h-4 w-4 accent-[#46694b]"
                      />

                      <span className="text-xl" aria-hidden="true">
                        {category.icon}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-[#354b37]">
                          {category.name}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-[#788275]">
                          {category.description}
                        </span>
                      </span>

                      {selected && (
                        <span
                          className="text-sm font-semibold text-[#557c51]"
                          aria-label="Selected"
                        >
                          ✓
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>

              <p className="mt-3 text-xs leading-5 text-[#899184]">
                Selected: {preferences.categories.length}{" "}
                {preferences.categories.length === 1 ? "category" : "categories"}.
              </p>
            </fieldset>

            <div>
              <label
                htmlFor="sessionLength"
                className="mb-2 block text-sm font-medium text-[#465b46]"
              >
                Preferred session length
              </label>
              <select
                id="sessionLength"
                value={preferences.sessionLength}
                onChange={(e) =>
                  updatePreferences("sessionLength", e.target.value)
                }
                className={inputClass}
              >
                <option>Under 5 minutes</option>
                <option>5–10 minutes</option>
                <option>10–15 minutes</option>
                <option>15–20 minutes</option>
                <option>20+ minutes</option>
              </select>
              <p className="mt-2 text-xs leading-5 text-[#899184]">
                This saves your preference. It does not yet filter practice
                recommendations automatically.
              </p>
            </div>
          </section>

          <div className="border-t border-[#eeeee6]" />

          {/* REMINDERS */}

          <section className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#89947e]">
                03 — Your routine
              </p>
              <h2 className="mt-2 text-2xl font-medium text-[#2f4935]">
                Daily reminders
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#788275]">
                Choose whether you would like daily wellness reminders
                enabled in your preferences.
              </p>
            </div>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-[#e9e8de] bg-[#fcfbf7] p-5">
              <span>
                <span className="block text-sm font-medium text-[#354b37]">
                  Daily wellness reminder
                </span>
                <span className="mt-1 block text-xs leading-5 text-[#788275]">
                  Save your reminder preference for future reminder features.
                </span>
              </span>

              <input
                type="checkbox"
                role="switch"
                aria-label="Enable daily wellness reminders"
                checked={preferences.dailyReminders}
                onChange={(e) =>
                  updatePreferences("dailyReminders", e.target.checked)
                }
                className="h-5 w-5 shrink-0 accent-[#46694b]"
              />
            </label>

            <p className="text-xs leading-5 text-[#899184]">
              This switch does not send notifications yet. Browser or device
              notifications can be added separately later.
            </p>
          </section>

          {/* SAVE */}

          <div className="flex flex-wrap items-center gap-4 border-t border-[#eeeee6] pt-6">
            <button
              type="submit"
              className="rounded-full bg-[#46694b] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#355740] focus:outline-none focus:ring-4 focus:ring-[#dfe8d8]"
            >
              Save changes
            </button>

            {saved && (
              <p
                role="status"
                className="text-sm font-medium text-[#557c51]"
              >
                ✓ Your settings have been saved
              </p>
            )}
          </div>
        </form>

        <p className="mt-5 px-2 text-xs leading-6 text-[#899184]">
          Your settings are stored in this browser only. They are not synced
          to other devices or an online account.
        </p>
      </div>
    </main>
  );
}
