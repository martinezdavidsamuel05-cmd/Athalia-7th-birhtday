import React, { useState, useEffect, useMemo, useRef } from "react";

/* ============================================================
   HOW TO CUSTOMIZE (read me!)
   1. Change PASSWORD and START_DATE below.
   2. Search "EDIT ME" for names, the letter, plans, and reasons.
   3. Gallery: replace each placeholder <div> with
      <img src="yourphoto.jpg" className="w-full h-full object-cover" />
   4. This file is plain React + Tailwind (core utility classes only,
      no build config needed) — drop it into any Create React App /
      Vite / Next project as a component, or render it directly.
============================================================ */

const PASSWORD = "monthsary"; // EDIT ME
const START_DATE = new Date("2025-01-30T00:00:00"); // EDIT ME (YYYY-MM-DD)

const PARTNER_NAME = "My Love"; // EDIT ME
const YOUR_NAME = "Me"; // EDIT ME

const LETTER = `My love,

Another month with you, and somehow it feels just as exciting as the first day we started this. I could tell you about the big moments, but honestly it's the small ones I keep replaying — the way you laugh at your own jokes before you even finish them, the random texts in the middle of my day that make everything better, the way it just feels easy to be around you.

Thank you for choosing me, again and again, one month at a time. Here's to many, many more.`;

const PLANS = [
  { when: "next month", what: "Try that new ramen place you keep sending me" },
  { when: "this year", what: "A weekend trip somewhere neither of us has been" },
  { when: "someday", what: "Meeting each other's whole worlds — family, friends, everything" },
  { when: "always", what: "Choosing us, one month at a time" },
];

const REASONS = [
  "the way you remember tiny things I mention once",
  "your terrible, wonderful jokes",
  "how safe it feels to just be myself with you",
  "the good morning texts, every single time",
  "how you cheer for me louder than anyone",
  "simply, you being you",
];

function Bouquet() {
  return (
    <svg viewBox="0 0 220 260" width="220" height="260" className="mx-auto">
      <path d="M110 260 L60 150 Q110 190 160 150 Z" fill="#FBEAF0" stroke="#F0997B" strokeWidth="1.5" />
      <g stroke="#8FA97A" strokeWidth="3" fill="none">
        <path d="M110 190 L95 130" />
        <path d="M110 190 L110 120" />
        <path d="M110 190 L125 130" />
        <path d="M110 190 L80 140" />
        <path d="M110 190 L140 140" />
      </g>
      <path d="M100 160 Q80 150 88 135 Q105 140 100 160 Z" fill="#8FA97A" />
      <path d="M125 160 Q145 150 137 135 Q120 140 125 160 Z" fill="#8FA97A" />

      {[
        { cx: 95, cy: 120, petal: "#F0997B", center: "#D9A66C", r: 9, cr: 8, delay: "0.1s" },
        { cx: 110, cy: 105, petal: "#ED93B1", center: "#D9587D", r: 12, cr: 10, delay: "0.3s" },
        { cx: 125, cy: 120, petal: "#F0997B", center: "#D9A66C", r: 9, cr: 8, delay: "0.5s" },
        { cx: 80, cy: 135, petal: "#F4C0D1", center: "#993556", r: 7, cr: 6, delay: "0.7s" },
        { cx: 140, cy: 135, petal: "#F4C0D1", center: "#993556", r: 7, cr: 6, delay: "0.9s" },
      ].map((f, i) => (
        <g
          key={i}
          transform={`translate(${f.cx},${f.cy})`}
          style={{
            transformOrigin: "center",
            transformBox: "fill-box",
            animation: `bloom 1s ease-out ${f.delay} backwards`,
          }}
        >
          <circle cx={-f.r * 0.9} cy={-f.r * 0.65} r={f.r} fill={f.petal} />
          <circle cx={f.r * 0.9} cy={-f.r * 0.65} r={f.r} fill={f.petal} />
          <circle cx={-f.r * 0.9} cy={f.r * 0.85} r={f.r} fill={f.petal} />
          <circle cx={f.r * 0.9} cy={f.r * 0.85} r={f.r} fill={f.petal} />
          <circle cx="0" cy="0" r={f.cr} fill={f.center} />
        </g>
      ))}
      <path d="M95 188 Q110 205 125 188" stroke="#D9A66C" strokeWidth="3" fill="none" />
    </svg>
  );
}

function useCountdown(startDate) {
  const [state, setState] = useState({ months: 0, days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    function tick() {
      const now = new Date();
      let diffMs = Math.max(0, now - startDate);
      const totalMinutes = Math.floor(diffMs / 60000);
      const hours = Math.floor(totalMinutes / 60) % 24;
      const mins = totalMinutes % 60;

      let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
      let anchor = new Date(startDate);
      anchor.setMonth(anchor.getMonth() + months);
      if (anchor > now) {
        months -= 1;
        anchor.setMonth(anchor.getMonth() - 1);
      }
      const days = Math.floor((now - anchor) / 86400000);

      setState({ months, days, hours, mins });
    }
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [startDate]);

  return state;
}

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 10,
        scale: 0.6 + Math.random() * 0.8,
        opacity: 0.35 + Math.random() * 0.4,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "-40px",
            left: `${p.left}vw`,
            width: 12,
            height: 12,
            background: "#FFC9D8",
            borderRadius: "0 100% 0 100%",
            opacity: p.opacity,
            transform: `scale(${p.scale})`,
            animation: `fall ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function FlipCard({ text, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="relative h-44 cursor-pointer group"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl bg-white border border-pink-200 flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="font-serif text-rose-800 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>
        <div
          className="absolute inset-0 rounded-2xl bg-rose-400 text-white flex items-center justify-center p-5 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function MonthsaryWebsite() {
  const [unlocked, setUnlocked] = useState(false);
  const [pwValue, setPwValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef(null);
  const { months, days, hours, mins } = useCountdown(START_DATE);

  function handleUnlock() {
    if (pwValue.trim().toLowerCase() === PASSWORD.toLowerCase()) {
      setUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  }

  return (
    <div
      className="relative min-h-screen bg-pink-50 text-rose-900"
      style={{ fontFamily: "'Quicksand', sans-serif", overflowX: "hidden" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Quicksand:wght@400;500;600;700&display=swap');
        @keyframes fall {
          0% { transform: translateY(-5vh) translateX(0) rotate(0deg); }
          100% { transform: translateY(105vh) translateX(40px) rotate(360deg); }
        }
        @keyframes bloom {
          0% { transform: scale(0); }
          70% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
        .bouquet-sway { animation: sway 4s ease-in-out infinite; }
        .shake-anim { animation: shake 0.45s; }
      `}</style>

      <Petals />

      {/* LOCK SCREEN */}
      {!unlocked && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{
            background: "radial-gradient(circle at 50% 20%, #FFE3EB 0%, #FFD3E0 45%, #F9B8CE 100%)",
          }}
        >
          <div className="text-center max-w-md w-full">
            <div className="bouquet-sway mb-4">
              <Bouquet />
            </div>

            <p
              className="italic text-sm tracking-widest uppercase text-rose-600 mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              a little something for
            </p>
            <h1
              className="text-5xl sm:text-6xl text-rose-900 mb-2"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {PARTNER_NAME}
            </h1>
            <p className="italic text-rose-600 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              happy monthsary, this whole page is for you
            </p>

            <div className={`bg-white/70 rounded-2xl border border-rose-200 p-6 shadow-lg ${error ? "shake-anim" : ""}`}>
              <label className="block text-xs uppercase tracking-widest text-rose-700 mb-3 font-semibold">
                Enter our monthsary password to open your gift
              </label>
              <input
                ref={inputRef}
                type="password"
                value={pwValue}
                onChange={(e) => setPwValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                placeholder="hint: something only we'd know"
                className="w-full text-center rounded-full border-2 border-pink-200 focus:border-rose-400 outline-none px-5 py-3 mb-3 text-rose-900 bg-white"
              />
              <button
                onClick={handleUnlock}
                className="w-full bg-rose-500 hover:bg-rose-600 transition text-white font-semibold rounded-full py-3 shadow-md"
              >
                Open my gift
              </button>
              {error && <p className="text-xs text-red-500 mt-3">that's not quite it, try again love</p>}
            </div>

            <p className="text-xs text-rose-600/70 mt-6">
              psst — the person who made this can change the password in the code
            </p>
          </div>
        </div>
      )}

      {/* MAIN SITE */}
      <div className={`relative transition-opacity duration-1000 ${unlocked ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <nav className="fixed top-0 inset-x-0 z-40 bg-pink-50/85 backdrop-blur border-b border-pink-200 px-6 py-3 flex items-center justify-between">
          <span className="text-2xl text-rose-900" style={{ fontFamily: "'Dancing Script', cursive" }}>
            us, still &amp; always
          </span>
          <div className="hidden sm:flex gap-6 text-sm font-medium text-rose-700">
            <a href="#hero" className="hover:text-rose-500">Home</a>
            <a href="#letter" className="hover:text-rose-500">Letter</a>
            <a href="#gallery" className="hover:text-rose-500">Gallery</a>
            <a href="#plans" className="hover:text-rose-500">Future</a>
            <a href="#notes" className="hover:text-rose-500">Sweet notes</a>
          </div>
        </nav>

        {/* HERO */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
          <p className="italic text-rose-600 tracking-widest uppercase text-sm mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            welcome to our little corner of the internet
          </p>
          <h1 className="text-6xl sm:text-8xl text-rose-900 leading-tight" style={{ fontFamily: "'Dancing Script', cursive" }}>
            {YOUR_NAME} &amp; {PARTNER_NAME}
          </h1>
          <p className="text-lg text-rose-700 mt-4 max-w-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            a page just to celebrate loving you, one month at a time.
          </p>

          <div className="mt-10 bg-white/70 rounded-3xl border border-pink-200 px-8 py-6 grid grid-cols-4 gap-6 shadow-md">
            <div>
              <p className="text-3xl text-rose-500 font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{months}</p>
              <p className="text-xs uppercase tracking-widest text-rose-700">months</p>
            </div>
            <div>
              <p className="text-3xl text-rose-500 font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{days}</p>
              <p className="text-xs uppercase tracking-widest text-rose-700">days</p>
            </div>
            <div>
              <p className="text-3xl text-rose-500 font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{hours}</p>
              <p className="text-xs uppercase tracking-widest text-rose-700">hours</p>
            </div>
            <div>
              <p className="text-3xl text-rose-500 font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{mins}</p>
              <p className="text-xs uppercase tracking-widest text-rose-700">mins</p>
            </div>
          </div>

          <div className="mt-16 text-rose-600 text-2xl" style={{ animation: "sway 1.8s ease-in-out infinite" }}>
            ↓
          </div>
        </section>

        {/* LETTER */}
        <section id="letter" className="py-24 px-6 max-w-2xl mx-auto text-center">
          <h2 className="relative inline-block text-5xl text-rose-900 mb-14" style={{ fontFamily: "'Dancing Script', cursive" }}>
            a letter for you
          </h2>
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-left border border-pink-200 shadow-xl">
            <p className="italic text-rose-700 leading-8 whitespace-pre-line" style={{ fontFamily: "'Playfair Display', serif" }}>
              {LETTER}
            </p>
            <p className="mt-6 text-3xl text-right text-rose-500" style={{ fontFamily: "'Dancing Script', cursive" }}>
              {YOUR_NAME}
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="py-24 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-5xl text-rose-900 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
            our little gallery
          </h2>
          <p className="text-rose-700 mb-14 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            a few of my favorite frames of us
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl border-4 border-white shadow-lg flex items-center justify-center hover:-translate-y-1 hover:-rotate-1 transition"
                style={{ background: "linear-gradient(135deg,#FFE1E9,#FFC9D8)" }}
              >
                {/* EDIT ME: replace this span with <img src="yourphoto.jpg" className="w-full h-full object-cover" /> */}
                <span className="text-rose-500 text-3xl">📷</span>
              </div>
            ))}
          </div>
        </section>

        {/* FUTURE PLANS */}
        <section id="plans" className="py-24 px-6 max-w-2xl mx-auto text-center">
          <h2 className="text-5xl text-rose-900 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
            what's next for us
          </h2>
          <p className="text-rose-700 mb-14 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            a few things on our list, together
          </p>

          <div className="relative pl-8 text-left">
            <div
              className="absolute left-2 top-1 bottom-1 w-0.5"
              style={{ background: "repeating-linear-gradient(to bottom, #D9A66C 0 6px, transparent 6px 12px)" }}
            />
            {PLANS.map((p, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow" />
                <p className="text-xs uppercase tracking-widest text-rose-600 font-semibold">{p.when}</p>
                <p className="text-lg text-rose-900" style={{ fontFamily: "'Playfair Display', serif" }}>{p.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SWEET NOTES */}
        <section id="notes" className="py-24 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl text-rose-900 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
            reasons, in no particular order
          </h2>
          <p className="text-rose-700 mb-14 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            tap a card
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {REASONS.map((r, i) => (
              <FlipCard key={i} text={r} index={i} />
            ))}
          </div>
        </section>

        <footer className="py-14 text-center border-t border-pink-200">
          <p className="text-3xl text-rose-900 mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
            happy monthsary, my love
          </p>
          <p className="text-xs text-rose-600">made with love, one month at a time</p>
        </footer>
      </div>
    </div>
  );
}