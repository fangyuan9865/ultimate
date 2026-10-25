"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


const practices = [
  {
    title: "A Gentle Morning Flow",
    category: "YOGA",
    duration: "12 min",
    description: "Ease into your day with gentle movement and mindful stretching.",
    slug: "a-gentle-morning-flow",
    number: "01",
    tone: "sage",
  },
  {
    title: "A Moment of Stillness",
    category: "MEDITATION",
    duration: "8 min",
    description: "Create a little space between the noise and your next thought.",
    slug: "a-moment-of-stillness",
    number: "02",
    tone: "sand",
  },
  {
    title: "Relaxing Breath Practice",
    category: "BREATHING",
    duration: "5 min",
    description: "Slow down, reconnect with your breath, and settle into the present.",
    slug: "relaxing-breath-practice",
    number: "03",
    tone: "clay",
  },
];

const dailyTips = [
  {
    title: "Give yourself permission to pause.",
    text: "You do not have to fill every moment with productivity. A quiet moment can be meaningful, too.",
  },
  {
    title: "Come back to the present.",
    text: "Notice one thing you can see, one sound you can hear, and one sensation you can feel. Let this moment be enough.",
  },
  {
    title: "Small steps still count.",
    text: "You do not need a perfect routine. Choose one small, kind thing you can do for yourself today.",
  },
  {
    title: "Let your breath be an anchor.",
    text: "When your day feels busy, take a comfortable breath and gently bring your attention back to where you are.",
  },
  {
    title: "Rest is part of the journey.",
    text: "You are allowed to slow down. Give yourself the same patience you would offer someone you care about.",
  },
  {
    title: "Notice what is already good.",
    text: "Take a moment to appreciate something ordinary: warm sunlight, a familiar song, or a conversation that made you smile.",
  },
  {
    title: "Begin again, whenever you need.",
    text: "Every moment offers a fresh opportunity to choose a gentler pace and return to what matters to you.",
  },
];

const testimonials = [
  {
    quote:
      "I used to think wellness needed to be a big commitment. Now I appreciate the little moments I can make for myself.",
    name: "A gentler routine",
    detail: "A reminder for everyday life",
  },
  {
    quote:
      "Having a quiet space to pause helps me approach my day with a little more intention and patience.",
    name: "A moment of calm",
    detail: "One breath at a time",
  },
  {
    quote:
      "I love the idea of starting small. A few mindful minutes can be a lovely way to reconnect with myself.",
    name: "Small steps forward",
    detail: "Progress without pressure",
  },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={diagonal ? "arrow-diagonal" : ""}
    >
      {diagonal ? (
        <path
          d="M7 17 17 7M7 7h10v10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4 12h15m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      aria-hidden="true"
      width="25"
      height="25"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M25.5 5.5C14 5.5 6 10 6 19a7.5 7.5 0 0 0 7.5 7.5C23 26.5 27 16 25.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 28c4-7 9-11 16-15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlowerIcon() {
  return (
    <svg
      aria-hidden="true"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="24" cy="14" rx="6" ry="9" />
        <ellipse cx="24" cy="34" rx="6" ry="9" />
        <ellipse cx="14" cy="24" rx="9" ry="6" />
        <ellipse cx="34" cy="24" rx="9" ry="6" />
        <ellipse
          cx="17"
          cy="17"
          rx="6"
          ry="8"
          transform="rotate(-45 17 17)"
        />
        <ellipse
          cx="31"
          cy="17"
          rx="6"
          ry="8"
          transform="rotate(45 31 17)"
        />
        <ellipse
          cx="17"
          cy="31"
          rx="6"
          ry="8"
          transform="rotate(45 17 31)"
        />
        <ellipse
          cx="31"
          cy="31"
          rx="6"
          ry="8"
          transform="rotate(-45 31 31)"
        />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
      </g>
    </svg>
  );
}

export default function Home() {
  // Keep the initial render deterministic so Next.js can prerender the page.
  // The current daily tip and year are calculated after the page mounts.
  const [dailyTip, setDailyTip] = useState(dailyTips[0]);
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
        Date.UTC(today.getFullYear(), 0, 0)) /
        86400000
    );

    setDailyTip(dailyTips[dayOfYear % dailyTips.length]);
    setCurrentYear(today.getFullYear());
  }, []);

  return (
    <main className="ultimate-home">
      <style>{`
        .ultimate-home {
          --cream: #f8f7f1;
          --paper: #fffefb;
          --green: #244b3a;
          --green-dark: #18382b;
          --sage: #e7ece2;
          --sage-text: #536b57;
          --muted: #77796f;
          --line: #e7e6dc;
          background: var(--cream);
          color: var(--green-dark);
          min-height: 100vh;
          overflow: hidden;
          font-family: Arial, Helvetica, sans-serif;
        }

        .ultimate-home * {
          box-sizing: border-box;
        }

        .ultimate-home a {
          -webkit-tap-highlight-color: transparent;
        }

        .ultimate-home .serif {
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 400;
          letter-spacing: -0.055em;
        }

        .ultimate-home .eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          line-height: 1.7;
        }

        .ultimate-home .section-shell {
          width: min(1160px, calc(100% - 64px));
          margin-inline: auto;
        }

        .ultimate-home .soft-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: gap 220ms ease, opacity 220ms ease;
        }

        .ultimate-home .soft-link:hover {
          gap: 16px;
        }

        .ultimate-home .primary-link {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          min-height: 52px;
          padding: 0 23px;
          border: 1px solid var(--green);
          border-radius: 3px;
          background: var(--green);
          color: #fffefb;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          transition: background 220ms ease, transform 220ms ease;
        }

        .ultimate-home .primary-link:hover {
          background: var(--green-dark);
          transform: translateY(-2px);
        }

        .ultimate-home .outline-link {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          min-height: 52px;
          padding: 0 23px;
          border: 1px solid #d8d9ce;
          border-radius: 3px;
          color: var(--green-dark);
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          transition: border-color 220ms ease, background 220ms ease;
        }

        .ultimate-home .outline-link:hover {
          background: #fffefb;
          border-color: var(--green);
        }

        .ultimate-home .hero {
          display: grid;
          grid-template-columns: 1.03fr 0.97fr;
          align-items: center;
          gap: 55px;
          padding-top: 70px;
          padding-bottom: 88px;
        }

        .ultimate-home .hero-copy {
          animation: ultimate-rise 800ms ease both;
        }

        .ultimate-home .hero h1 {
          max-width: 590px;
          margin: 24px 0 23px;
          font-size: clamp(52px, 6.3vw, 82px);
          line-height: 0.99;
        }

        .ultimate-home .hero h1 em {
          color: #71856a;
          font-weight: 400;
        }

        .ultimate-home .hero-description {
          max-width: 405px;
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.95;
        }

        .ultimate-home .hero-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 31px;
        }

        .ultimate-home .hero-note {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 36px;
          color: var(--muted);
          font-size: 10px;
          letter-spacing: 0.04em;
        }

        .ultimate-home .hero-note-mark {
          display: grid;
          width: 26px;
          height: 26px;
          place-items: center;
          border: 1px solid #d9dfd2;
          border-radius: 50%;
          color: #647d61;
        }

        .ultimate-home .hero-art {
          position: relative;
          min-height: 490px;
          display: grid;
          place-items: center;
          animation: ultimate-rise 900ms 100ms ease both;
        }

        .ultimate-home .hero-art-frame {
          position: relative;
          width: 100%;
          max-width: 475px;
          min-height: 445px;
          overflow: hidden;
          border-radius: 47% 47% 4px 4px;
          background:
            radial-gradient(ellipse at 50% 35%, #f4f1df 0%, transparent 52%),
            linear-gradient(145deg, #dbe3d2, #c6d3bf 55%, #e6e5d7);
        }

        .ultimate-home .sun-disc {
          position: absolute;
          top: 54px;
          left: 50%;
          width: 205px;
          height: 205px;
          border-radius: 50%;
          background: #f2e8ca;
          transform: translateX(-50%);
        }

        .ultimate-home .art-hill {
          position: absolute;
          right: -15%;
          bottom: -5%;
          left: -15%;
          height: 43%;
          border-radius: 50% 50% 0 0;
          background: #a5b89b;
          transform: rotate(-7deg);
        }

        .ultimate-home .art-hill-two {
          position: absolute;
          right: -18%;
          bottom: -15%;
          left: 20%;
          height: 45%;
          border-radius: 50% 50% 0 0;
          background: #718c73;
          transform: rotate(10deg);
        }

        .ultimate-home .art-plant {
          position: absolute;
          z-index: 2;
          right: 10%;
          bottom: 7%;
          color: #385d45;
          transform: rotate(11deg);
        }

        .ultimate-home .art-label {
          position: absolute;
          z-index: 3;
          bottom: 25px;
          left: 24px;
          color: #fffef7;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 21px;
          letter-spacing: -0.025em;
        }

        .ultimate-home .floating-note {
          position: absolute;
          z-index: 4;
          top: 80px;
          left: -24px;
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 205px;
          padding: 15px 17px;
          border: 1px solid #eeece1;
          background: #fffefb;
          box-shadow: 0 12px 36px #243c2b0b;
          animation: ultimate-float 5s ease-in-out infinite;
        }

        .ultimate-home .floating-note-icon {
          display: grid;
          flex: 0 0 35px;
          width: 35px;
          height: 35px;
          place-items: center;
          border-radius: 50%;
          background: var(--sage);
          color: var(--green);
        }

        .ultimate-home .floating-note p {
          margin: 0;
          font-size: 10px;
          line-height: 1.6;
        }

        .ultimate-home .floating-note strong {
          display: block;
          margin-bottom: 2px;
          font-size: 11px;
        }

        .ultimate-home .marquee-band {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: #f4f4ec;
        }

        .ultimate-home .marquee-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          min-height: 75px;
          color: #687567;
          font-size: 10px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .ultimate-home .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          white-space: nowrap;
        }

        .ultimate-home .tiny-flower {
          color: #83947a;
          font-size: 16px;
        }

        .ultimate-home .section {
          padding-top: 104px;
          padding-bottom: 104px;
        }

        .ultimate-home .section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 28px;
          margin-bottom: 40px;
        }

        .ultimate-home .section-heading h2 {
          max-width: 550px;
          margin: 12px 0 0;
          font-size: clamp(36px, 4.3vw, 53px);
          line-height: 1.09;
        }

        .ultimate-home .section-heading > p {
          max-width: 290px;
          margin: 0 0 5px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .ultimate-home .practice-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 19px;
        }

        .ultimate-home .practice-card {
          min-width: 0;
          border: 1px solid #e8e7dd;
          background: var(--paper);
          transition: transform 260ms ease, box-shadow 260ms ease;
        }

        .ultimate-home .practice-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px #283c2b0b;
        }

        .ultimate-home .practice-art {
          position: relative;
          display: grid;
          min-height: 225px;
          overflow: hidden;
          place-items: center;
        }

        .ultimate-home .practice-art.sage {
          background: #e3e9dd;
          color: #567254;
        }

        .ultimate-home .practice-art.sand {
          background: #eee8d9;
          color: #897d5c;
        }

        .ultimate-home .practice-art.clay {
          background: #eadfd6;
          color: #947362;
        }

        .ultimate-home .practice-art::before {
          position: absolute;
          width: 150px;
          height: 150px;
          border: 1px solid currentColor;
          border-radius: 50%;
          content: "";
          opacity: 0.25;
          transition: transform 400ms ease;
        }

        .ultimate-home .practice-card:hover .practice-art::before {
          transform: scale(1.13);
        }

        .ultimate-home .practice-art::after {
          position: absolute;
          width: 112px;
          height: 112px;
          border: 1px solid currentColor;
          border-radius: 50%;
          content: "";
          opacity: 0.35;
        }

        .ultimate-home .practice-symbol {
          z-index: 1;
          display: grid;
          width: 86px;
          height: 86px;
          place-items: center;
          border: 1px solid currentColor;
          border-radius: 50%;
          background: #ffffff29;
        }

        .ultimate-home .practice-number {
          position: absolute;
          top: 17px;
          left: 18px;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 14px;
          opacity: 0.8;
        }

        .ultimate-home .practice-duration {
          position: absolute;
          right: 14px;
          bottom: 14px;
          padding: 7px 10px;
          border: 1px solid #ffffff70;
          background: #fffefb9c;
          color: #394b39;
          font-size: 10px;
        }

        .ultimate-home .practice-content {
          padding: 23px 21px 22px;
        }

        .ultimate-home .practice-category {
          color: #75806e;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .ultimate-home .practice-content h3 {
          margin: 12px 0 10px;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 24px;
          font-weight: 400;
          letter-spacing: -0.035em;
          line-height: 1.17;
        }

        .ultimate-home .practice-content p {
          min-height: 47px;
          margin: 0;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .ultimate-home .practice-content .soft-link {
          margin-top: 21px;
          color: var(--green);
          font-size: 11px;
        }

        .ultimate-home .daily-section {
          padding: 0 0 100px;
        }

        .ultimate-home .daily-card {
          position: relative;
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 45px;
          align-items: center;
          min-height: 300px;
          padding: 50px 7%;
          overflow: hidden;
          background: #e7ebe0;
        }

        .ultimate-home .daily-decoration {
          position: absolute;
          top: -60px;
          left: -40px;
          color: #bdcbb4;
          opacity: 0.5;
          transform: rotate(-18deg);
        }

        .ultimate-home .daily-label {
          position: relative;
          z-index: 1;
        }

        .ultimate-home .daily-label h2 {
          max-width: 290px;
          margin: 15px 0 0;
          font-size: clamp(34px, 4vw, 46px);
          line-height: 1.08;
        }

        .ultimate-home .daily-copy {
          position: relative;
          z-index: 1;
          max-width: 510px;
        }

        .ultimate-home .daily-copy blockquote {
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(24px, 3vw, 36px);
          letter-spacing: -0.04em;
          line-height: 1.3;
        }

        .ultimate-home .daily-copy p {
          margin: 17px 0 0;
          color: #657263;
          font-size: 12px;
          line-height: 1.9;
        }

        .ultimate-home .daily-copy .soft-link {
          margin-top: 23px;
          color: var(--green);
        }

        .ultimate-home .community-section {
          padding-top: 10px;
          padding-bottom: 105px;
        }

        .ultimate-home .community-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .ultimate-home .quote-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 250px;
          padding: 26px 24px;
          border: 1px solid var(--line);
          background: #fffefb;
          transition: transform 240ms ease, border-color 240ms ease;
        }

        .ultimate-home .quote-card:hover {
          transform: translateY(-4px);
          border-color: #cdd5c6;
        }

        .ultimate-home .quote-mark {
          color: #8c9a80;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 38px;
          line-height: 1;
        }

        .ultimate-home .quote-card blockquote {
          margin: 15px 0 27px;
          color: #475448;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 19px;
          letter-spacing: -0.02em;
          line-height: 1.55;
        }

        .ultimate-home .quote-name {
          margin: 0;
          font-size: 11px;
          font-weight: 700;
        }

        .ultimate-home .quote-detail {
          margin: 5px 0 0;
          color: var(--muted);
          font-size: 10px;
        }

        .ultimate-home .closing {
          position: relative;
          padding: 78px 24px 82px;
          background: var(--green);
          color: #fffef7;
          text-align: center;
        }

        .ultimate-home .closing h2 {
          max-width: 690px;
          margin: 17px auto 16px;
          font-size: clamp(39px, 5.5vw, 65px);
          line-height: 1.05;
        }

        .ultimate-home .closing > p {
          max-width: 425px;
          margin: 0 auto;
          color: #d2ddd0;
          font-size: 12px;
          line-height: 1.9;
        }

        .ultimate-home .closing .primary-link {
          margin-top: 28px;
          border-color: #f7f6ed;
          background: #f7f6ed;
          color: var(--green);
        }

        .ultimate-home .closing .primary-link:hover {
          background: white;
        }

        .ultimate-home .closing-flower {
          display: grid;
          margin: 0 auto 15px;
          place-items: center;
          color: #cbd7c1;
        }

        .ultimate-home .footer {
          padding: 28px 0;
          border-top: 1px solid #ffffff25;
          background: var(--green);
          color: #dce4d7;
        }

        .ultimate-home .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding-top: 22px;
          border-top: 1px solid #ffffff25;
        }

        .ultimate-home .footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #fffef7;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 21px;
          text-decoration: none;
        }

        .ultimate-home .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 23px;
        }

        .ultimate-home .footer-links a {
          color: #dce4d7;
          font-size: 10px;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .ultimate-home .footer-links a:hover {
          color: white;
        }

        .ultimate-home .footer-small {
          margin: 16px 0 0;
          color: #c2d0c1;
          font-size: 10px;
          line-height: 1.8;
        }

        @keyframes ultimate-rise {
          from { opacity: 0; transform: translateY(17px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes ultimate-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @media (min-width: 1100px) {
          .ultimate-home .hero {
            padding-top: 83px;
          }
        }

        @media (max-width: 800px) {
          .ultimate-home .section-shell {
            width: min(100% - 40px, 600px);
          }

          .ultimate-home .hero {
            grid-template-columns: 1fr;
            gap: 25px;
            padding-top: 55px;
            padding-bottom: 55px;
          }

          .ultimate-home .hero h1 {
            max-width: 540px;
            font-size: clamp(54px, 11vw, 76px);
          }

          .ultimate-home .hero-art {
            min-height: 410px;
          }

          .ultimate-home .hero-art-frame {
            max-width: 440px;
            min-height: 390px;
          }

          .ultimate-home .floating-note {
            left: 0;
          }

          .ultimate-home .marquee-inner {
            justify-content: center;
            flex-wrap: wrap;
            padding: 21px 0;
          }

          .ultimate-home .marquee-item {
            margin: 0 8px;
          }

          .ultimate-home .section {
            padding-top: 75px;
            padding-bottom: 75px;
          }

          .ultimate-home .practice-grid,
          .ultimate-home .community-grid {
            grid-template-columns: 1fr 1fr;
          }

          .ultimate-home .practice-card:last-child,
          .ultimate-home .quote-card:last-child {
            grid-column: 1 / -1;
          }

          .ultimate-home .daily-card {
            grid-template-columns: 1fr;
            gap: 25px;
            padding: 40px 30px;
          }

          .ultimate-home .daily-label h2 {
            max-width: 440px;
          }
        }

        @media (max-width: 520px) {
          .ultimate-home .section-shell {
            width: calc(100% - 36px);
          }

          .ultimate-home .hero {
            padding-top: 45px;
          }

          .ultimate-home .hero h1 {
            font-size: clamp(48px, 13vw, 65px);
          }

          .ultimate-home .hero-description {
            font-size: 13px;
          }

          .ultimate-home .hero-actions {
            align-items: stretch;
          }

          .ultimate-home .hero-actions a {
            flex: 1 1 145px;
          }

          .ultimate-home .hero-art {
            min-height: 360px;
          }

          .ultimate-home .hero-art-frame {
            min-height: 340px;
          }

          .ultimate-home .sun-disc {
            top: 38px;
            width: 165px;
            height: 165px;
          }

          .ultimate-home .floating-note {
            top: 45px;
            left: -4px;
            max-width: 190px;
            padding: 11px;
          }

          .ultimate-home .section-heading {
            align-items: start;
            flex-direction: column;
            gap: 16px;
          }

          .ultimate-home .section-heading h2 {
            font-size: 40px;
          }

          .ultimate-home .practice-grid,
          .ultimate-home .community-grid {
            grid-template-columns: 1fr;
          }

          .ultimate-home .practice-card:last-child,
          .ultimate-home .quote-card:last-child {
            grid-column: auto;
          }

          .ultimate-home .practice-art {
            min-height: 200px;
          }

          .ultimate-home .practice-content p {
            min-height: 0;
          }

          .ultimate-home .daily-card {
            padding: 35px 24px;
          }

          .ultimate-home .daily-copy blockquote {
            font-size: 27px;
          }

          .ultimate-home .quote-card {
            min-height: 215px;
          }

          .ultimate-home .closing {
            padding: 64px 20px;
          }

          .ultimate-home .footer-inner {
            align-items: flex-start;
            flex-direction: column;
          }

          .ultimate-home .footer-links {
            gap: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ultimate-home *,
          .ultimate-home *::before,
          .ultimate-home *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Navigation */}
      <header>
        <nav
          aria-label="Main navigation"
          className="section-shell"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: 82,
            gap: 20,
            borderBottom: "1px solid var(--line)",
          }}
        >
          <Link
            href="/"
            aria-label="ULTIMATE home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              color: "var(--green)",
              textDecoration: "none",
            }}
          >
            <LeafIcon />
            <span
              className="serif"
              style={{ fontSize: 27, letterSpacing: "-0.06em" }}
            >
              ULTIMATE
            </span>
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: "clamp(13px, 3vw, 31px)",
            }}
          >
            <Link
              href="/explore"
              style={navLinkStyle}
            >
              Explore
            </Link>
            <Link href="/progress" style={navLinkStyle}>
              Progress
            </Link>
            <Link href="/favorites" style={navLinkStyle}>
              Favorites
            </Link>
            <Link href="/explore" className="primary-link">
              Begin your journey <ArrowIcon />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="section-shell hero">
        <div className="hero-copy">
          <div
            className="eyebrow"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              color: "#74836d",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 25,
                height: 1,
                background: "#8a9a80",
              }}
            />
            YOUR SPACE TO SLOW DOWN
          </div>

          <h1 className="serif">
            A little more
            <br />
            <em>you,</em> every day.
          </h1>

          <p className="hero-description">
            A calmer life doesn’t happen all at once. Find your rhythm through
            mindful movement, quiet moments, and simple practices that meet you
            where you are.
          </p>

          <div className="hero-actions">
            <Link href="/explore" className="primary-link">
              Explore practices <ArrowIcon />
            </Link>
            <Link href="/progress" className="outline-link">
              View your progress <ArrowIcon diagonal />
            </Link>
          </div>

          <div className="hero-note">
            <span className="hero-note-mark">
              <LeafIcon />
            </span>
            A gentle reminder: you can start right where you are.
          </div>
        </div>

        <div className="hero-art" aria-label="Illustration of a peaceful landscape">
          <div className="floating-note">
            <span className="floating-note-icon">
              <FlowerIcon />
            </span>
            <p>
              <strong>Make room for calm.</strong>
              One small moment at a time.
            </p>
          </div>

          <div className="hero-art-frame">
            <div className="sun-disc" />
            <div className="art-hill" />
            <div className="art-hill-two" />

            <svg
              aria-hidden="true"
              className="art-plant"
              width="145"
              height="225"
              viewBox="0 0 145 225"
              fill="none"
            >
              <path
                d="M72 225C72 172 74 111 91 42"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M77 175C34 170 19 140 19 119C48 119 73 140 77 175Z"
                fill="#91A98B"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M82 146C113 135 125 111 123 88C96 95 82 116 82 146Z"
                fill="#AFC0A2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M84 100C48 93 37 68 41 47C65 54 83 75 84 100Z"
                fill="#B9C9AE"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M91 63C112 54 118 35 113 19C96 28 89 43 91 63Z"
                fill="#91A98B"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M72 224C57 204 43 197 22 196"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <div className="art-label">Find your own pace.</div>
          </div>
        </div>
      </section>

      {/* Brand values */}
      <div className="marquee-band">
        <div className="section-shell marquee-inner">
          <span className="marquee-item">
            <span className="tiny-flower">✳</span> Mindful movement
          </span>
          <span className="marquee-item">
            <span className="tiny-flower">✳</span> Everyday stillness
          </span>
          <span className="marquee-item">
            <span className="tiny-flower">✳</span> Intentional breathing
          </span>
          <span className="marquee-item">
            <span className="tiny-flower">✳</span> Progress without pressure
          </span>
        </div>
      </div>

      {/* Featured practices */}
      <section className="section section-shell" id="practices">
        <div className="section-heading">
          <div>
            <div className="eyebrow" style={{ color: "#7b8973" }}>
              A PLACE TO BEGIN
            </div>
            <h2 className="serif">
              Small practices.
              <br />
              Meaningful moments.
            </h2>
          </div>
          <div>
            <p>
              No perfect routine required. Choose a practice that feels right
              for you today.
            </p>
            <Link
              href="/explore"
              className="soft-link"
              style={{ marginTop: 17, color: "var(--green)" }}
            >
              Discover all practices <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="practice-grid">
          {practices.map((practice) => (
            <article className="practice-card" key={practice.slug}>
              <Link
                href={`/practice/${practice.slug}`}
                style={{ color: "inherit", textDecoration: "none" }}
                aria-label={`Start ${practice.title}`}
              >
                <div className={`practice-art ${practice.tone}`}>
                  <span className="practice-number">{practice.number}</span>
                  <div className="practice-symbol">
                    {practice.tone === "sage" ? (
                      <svg
                        aria-hidden="true"
                        width="45"
                        height="45"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="17"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M13 29c4-9 18-12 23-7M19 35c-2-7 0-14 7-20"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                        <circle cx="24" cy="24" r="3" fill="currentColor" />
                      </svg>
                    ) : practice.tone === "sand" ? (
                      <FlowerIcon />
                    ) : (
                      <svg
                        aria-hidden="true"
                        width="45"
                        height="45"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <path
                          d="M24 40V8M24 18C15 18 10 12 10 7c9 0 14 5 14 11ZM24 28c9 0 14-6 14-11-9 0-14 5-14 11Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 40h18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="practice-duration">
                    {practice.duration}
                  </span>
                </div>
              </Link>

              <div className="practice-content">
                <div className="practice-category">{practice.category}</div>
                <h3>{practice.title}</h3>
                <p>{practice.description}</p>
                <Link
                  href={`/practice/${practice.slug}`}
                  className="soft-link"
                >
                  Begin practice <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Daily wellness tip */}
      <section className="section-shell daily-section">
        <div className="daily-card">
          <div className="daily-decoration" aria-hidden="true">
            <FlowerIcon />
          </div>

          <div className="daily-label">
            <div className="eyebrow" style={{ color: "#6c8067" }}>
              A NOTE FOR TODAY
            </div>
            <h2 className="serif">
              A moment
              <br />
              just for you.
            </h2>
          </div>

          <div className="daily-copy">
            <blockquote>“{dailyTip.title}”</blockquote>
            <p>{dailyTip.text}</p>
            <Link href="/explore" className="soft-link">
              Take a mindful pause <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="section-shell community-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow" style={{ color: "#7b8973" }}>
              A GENTLER WAY FORWARD
            </div>
            <h2 className="serif">
              Wellness is personal.
              <br />
              So is your journey.
            </h2>
          </div>
          <p>
            There is no single way to feel well. Let your journey be your own,
            one ordinary day at a time.
          </p>
        </div>

        <div className="community-grid">
          {testimonials.map((item) => (
            <article className="quote-card" key={item.name}>
              <div>
                <div className="quote-mark" aria-hidden="true">
                  “
                </div>
                <blockquote>{item.quote}</blockquote>
              </div>
              <div>
                <p className="quote-name">{item.name}</p>
                <p className="quote-detail">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <p
          style={{
            margin: "18px 0 0",
            color: "var(--muted)",
            fontSize: 10,
            lineHeight: 1.8,
          }}
        >
          These are illustrative reflections, not verified customer
          testimonials.
        </p>
      </section>

      {/* Closing call to action */}
      <section className="closing">
        <div className="closing-flower">
          <FlowerIcon />
        </div>
        <div className="eyebrow" style={{ color: "#cbd7c1" }}>
          YOUR JOURNEY STARTS HERE
        </div>
        <h2 className="serif">
          You don’t have to change everything.
          <br />
          Just begin.
        </h2>
        <p>
          Make a little space for yourself today. Your next mindful moment is
          closer than you think.
        </p>
        <Link href="/explore" className="primary-link">
          Find your first practice <ArrowIcon />
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="section-shell">
          <div className="footer-inner">
            <Link href="/" className="footer-brand">
              <LeafIcon />
              ULTIMATE
            </Link>

            <nav aria-label="Footer navigation" className="footer-links">
              <Link href="/explore">Explore</Link>
              <Link href="/progress">Progress</Link>
              <Link href="/favorites">Favorites</Link>
              <Link href="/explore">Start a practice</Link>
            </nav>
          </div>

          <p className="footer-small">
            Make space for what matters. Take your time. Begin again.
            <br />
            © {currentYear} ULTIMATE. A little more you, every day.
          </p>
        </div>
      </footer>
    </main>
  );
}

const navLinkStyle = {
  color: "#586456",
  fontSize: 11,
  textDecoration: "none",
} as const;
