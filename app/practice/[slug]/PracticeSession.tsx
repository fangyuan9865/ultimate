
"use client";

import { useState } from "react";

type PracticeSessionProps = {
  slug: string;
  title: string;
  category: string;
  duration: string;
  steps: readonly string[];
};

const STORAGE_KEY = "ultimate-progress";

export default function PracticeSession({
  slug,
  title,
  category,
  duration,
  steps,
}: PracticeSessionProps) {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  const durationMinutes = Number.parseInt(duration, 10) || 0;

  function finishPractice() {
    if (completed) return;

    setError("");

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      let entries: unknown = [];

      if (saved) {
        entries = JSON.parse(saved);
      }

      if (!Array.isArray(entries)) {
        throw new Error("Your saved progress could not be read.");
      }

      const newEntry = {
        slug,
        title,
        category,
        duration: durationMinutes,
        completedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...entries, newEntry])
      );

      setCompleted(true);
    } catch {
      setError(
        "We couldn't save your progress. Please check your browser storage and try again."
      );
    }
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      {!started ? (
        <>
          <h2 className="font-serif text-2xl">
            Ready to begin?
          </h2>

          <p className="mt-4 leading-8 text-[#626960]">
            Find a comfortable space and take this time at your
            own pace. You can move through each step when you
            feel ready.
          </p>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-6 rounded-full bg-[#29483B] px-8 py-4 font-semibold text-white transition hover:scale-[1.02] hover:bg-[#203A30]"
          >
            Start Practice →
          </button>
        </>
      ) : completed ? (
        <div className="py-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9EDE2] text-3xl text-[#29483B]">
            ✓
          </div>

          <h2 className="mt-5 font-serif text-3xl">
            Practice completed!
          </h2>

          <p className="mt-3 leading-7 text-[#626960]">
            Well done for making time for yourself. Your progress
            has been saved in this browser.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/progress"
              className="rounded-full bg-[#29483B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#203A30]"
            >
              View My Progress →
            </a>

            <a
              href="/explore"
              className="rounded-full border border-[#29483B]/20 px-6 py-3 text-sm font-semibold text-[#29483B] transition hover:bg-[#F7F5EF]"
            >
              Explore More
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-widest text-[#68816B]">
                Your practice
              </p>

              <h2 className="mt-2 font-serif text-2xl">
                {title}
              </h2>
            </div>

            <span className="rounded-full bg-[#E9EDE2] px-3 py-1.5 text-sm text-[#29483B]">
              {duration}
            </span>
          </div>

          <p className="mt-4 leading-7 text-[#626960]">
            Move through these steps at a comfortable pace.
            There is no need to rush.
          </p>

          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div
                key={`${index}-${step}`}
                className="flex items-start gap-4 rounded-2xl bg-[#F7F5EF] p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#29483B] text-sm text-white">
                  {index + 1}
                </div>

                <p className="leading-7 text-[#292D2A]">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-[#E9EDE2] p-5">
            <h3 className="font-semibold text-[#29483B]">
              When you're finished
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#526456]">
              Select the button below when you have finished
              the practice. Your session will then be added
              to your progress dashboard.
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-800"
            >
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={finishPractice}
            className="mt-6 w-full rounded-full bg-[#29483B] px-6 py-4 font-semibold text-white transition hover:bg-[#203A30] sm:w-auto"
          >
            Complete Practice ✓
          </button>
        </>
      )}
    </section>
  );
}
