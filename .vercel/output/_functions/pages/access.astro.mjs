import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_DRRAQrBC.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C6TTfXoC.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useMemo } from 'react';
export { renderers } from '../renderers.mjs';

const sessions = [
  { id: 1, title: "Foundational Relaxation & Trail Senses", duration: "10 min", slug: "session-1" },
  { id: 2, title: "Technical Descent Mastery", duration: "12 min", slug: "session-2" },
  { id: 3, title: "Climb Resilience & Mental Toughness", duration: "12 min", slug: "session-3" },
  { id: 4, title: "Night Running Confidence", duration: "10 min", slug: "session-4" },
  { id: 5, title: "Aid Station Transitions & Fueling", duration: "12 min", slug: "session-5" },
  { id: 6, title: "DNF Prevention & Race Resilience", duration: "15 min", slug: "session-6" },
  { id: 7, title: "Full Race Day Simulation", duration: "15 min", slug: "session-7" },
  { id: 8, title: "Bonus: Race Week Quick Protocol", duration: "8 min", slug: "bonus" }
];
function SessionPlayer() {
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mindtrail_email") || "";
    }
    return "";
  });
  const [currentSession, setCurrentSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  useEffect(() => {
    const handleAuth = (e) => {
      const detail = e.detail;
      if (detail?.email) setEmail(detail.email);
    };
    window.addEventListener("mindtrail:auth", handleAuth);
    return () => window.removeEventListener("mindtrail:auth", handleAuth);
  }, []);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration * 100);
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);
  const loadSession = async (session) => {
    setCurrentSession(session);
    setLoading(true);
    setError(null);
    setIsPlaying(false);
    setProgress(0);
    try {
      const res = await fetch("/api/get-audio-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sessionSlug: session.slug })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load audio");
      setAudioUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load audio");
    } finally {
      setLoading(false);
    }
  };
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Your Sessions" }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-3 mb-8", children: sessions.map((session) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => loadSession(session),
        className: `w-full text-left p-4 rounded-xl border transition flex items-center gap-4 ${currentSession?.id === session.id ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-white hover:border-emerald-300"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${currentSession?.id === session.id ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600"}`, children: session.id <= 7 ? session.id : "★" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 text-sm", children: session.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs", children: session.duration })
          ] }),
          currentSession?.id === session.id && isPlaying && /* @__PURE__ */ jsx("div", { className: "flex gap-0.5 items-end h-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-1 bg-emerald-500 rounded-full animate-pulse",
              style: { height: `${8 + i * 4}px`, animationDelay: `${i * 0.15}s` }
            },
            i
          )) })
        ]
      },
      session.id
    )) }),
    currentSession && /* @__PURE__ */ jsxs("div", { className: "sticky bottom-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4", children: [
      audioUrl && /* @__PURE__ */ jsx("audio", { ref: audioRef, src: audioUrl, preload: "metadata" }),
      error && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mb-3", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900 flex-1", children: currentSession.title }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: duration ? `${formatTime(progress / 100 * duration)} / ${formatTime(duration)}` : currentSession.duration })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: togglePlay,
            disabled: loading || !!error,
            className: "w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 transition flex items-center justify-center shrink-0",
            children: loading ? /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 text-white animate-spin", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
              /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
            ] }) : isPlaying ? /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("rect", { x: "6", y: "4", width: "4", height: "16" }),
              /* @__PURE__ */ jsx("rect", { x: "14", y: "4", width: "4", height: "16" })
            ] }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-white ml-0.5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("polygon", { points: "5,3 19,12 5,21" }) })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex-1 h-2 bg-gray-200 rounded-full cursor-pointer group",
            onClick: handleSeek,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "h-full bg-emerald-500 rounded-full relative",
                style: { width: `${progress}%` },
                children: /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition" })
              }
            )
          }
        )
      ] })
    ] })
  ] });
}

function generateSchedule(raceDate) {
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const race = new Date(raceDate);
  race.setHours(0, 0, 0, 0);
  const msPerDay = 864e5;
  const daysUntilRace = Math.floor((race.getTime() - today.getTime()) / msPerDay);
  if (daysUntilRace < 7) return [];
  const weeksAvailable = Math.floor(daysUntilRace / 7);
  const schedule = [];
  const fullPhases = [
    { weeks: 2, phase: "Foundation", sessions: [1], frequency: 3 },
    { weeks: 2, phase: "Technical", sessions: [2, 3], frequency: 3 },
    { weeks: 2, phase: "Race Scenarios", sessions: [4, 5], frequency: 3 },
    { weeks: 1, phase: "Mental Armor", sessions: [6], frequency: 3 },
    { weeks: 1, phase: "Race Simulation", sessions: [7], frequency: 2, includeBonus: true }
  ];
  const totalPhaseWeeks = fullPhases.reduce((sum, p) => sum + p.weeks, 0);
  const availableWeeks = Math.min(weeksAvailable, totalPhaseWeeks);
  const ratio = availableWeeks / totalPhaseWeeks;
  let currentDate = new Date(today);
  for (const phase of fullPhases) {
    const phaseWeeks = Math.max(1, Math.round(phase.weeks * ratio));
    const phaseDays = phaseWeeks * 7;
    const totalSessions = phase.frequency * phaseWeeks;
    const gap = Math.floor(phaseDays / totalSessions);
    for (let i = 0; i < totalSessions; i++) {
      const dayOffset = i * gap;
      const sessionDate = new Date(currentDate.getTime() + dayOffset * msPerDay);
      if (sessionDate >= race) break;
      const sessionIdx = i % phase.sessions.length;
      const sessionNum = phase.sessions[sessionIdx];
      schedule.push({
        date: sessionDate,
        session: getSessionTitle(sessionNum),
        sessionNumber: sessionNum,
        phase: phase.phase
      });
    }
    if (phase.includeBonus) {
      const bonusDate1 = new Date(race.getTime() - 3 * msPerDay);
      const bonusDate2 = new Date(race.getTime() - 1 * msPerDay);
      if (bonusDate1 > currentDate) {
        schedule.push({
          date: bonusDate1,
          session: "Race Week Quick Protocol",
          sessionNumber: "bonus",
          phase: "Race Simulation"
        });
      }
      schedule.push({
        date: bonusDate2,
        session: "Race Week Quick Protocol",
        sessionNumber: "bonus",
        phase: "Final Prep"
      });
    }
    currentDate = new Date(currentDate.getTime() + phaseDays * msPerDay);
  }
  return schedule.filter((s) => s.date < race).sort((a, b) => a.date.getTime() - b.date.getTime());
}
function getSessionTitle(num) {
  const titles = {
    1: "Foundational Relaxation & Trail Senses",
    2: "Technical Descent Mastery",
    3: "Climb Resilience & Mental Toughness",
    4: "Night Running Confidence",
    5: "Aid Station Transitions & Fueling",
    6: "DNF Prevention & Race Resilience",
    7: "Full Race Day Simulation"
  };
  return titles[num] || `Session ${num}`;
}
const phaseColors = {
  "Foundation": "bg-blue-100 text-blue-700",
  "Technical": "bg-purple-100 text-purple-700",
  "Race Scenarios": "bg-amber-100 text-amber-700",
  "Mental Armor": "bg-red-100 text-red-700",
  "Race Simulation": "bg-emerald-100 text-emerald-700",
  "Final Prep": "bg-emerald-200 text-emerald-800"
};
function formatDate(date) {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
function TrainingProgramme() {
  const [raceDate, setRaceDate] = useState("");
  const [raceName, setRaceName] = useState("");
  const schedule = useMemo(() => {
    if (!raceDate) return [];
    return generateSchedule(new Date(raceDate));
  }, [raceDate]);
  const minDate = /* @__PURE__ */ new Date();
  minDate.setDate(minDate.getDate() + 7);
  const minDateStr = minDate.toISOString().split("T")[0];
  const phases = useMemo(() => {
    const grouped = {};
    for (const day of schedule) {
      if (!grouped[day.phase]) grouped[day.phase] = [];
      grouped[day.phase].push(day);
    }
    return grouped;
  }, [schedule]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Your Training Programme" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6", children: "Enter your race date to get a personalized listening schedule." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Race name (optional)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: raceName,
            onChange: (e) => setRaceName(e.target.value),
            placeholder: "e.g., UTMB, Western States",
            className: "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Race date" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "date",
            value: raceDate,
            onChange: (e) => setRaceDate(e.target.value),
            min: minDateStr,
            className: "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          }
        )
      ] })
    ] }),
    schedule.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: raceName ? `${raceName} Preparation` : "Your Schedule" }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-400", children: [
          schedule.length,
          " sessions over ",
          Math.ceil((new Date(raceDate).getTime() - Date.now()) / 864e5 / 7),
          " weeks"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: Object.entries(phases).map(([phase, days]) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold px-2.5 py-1 rounded-full ${phaseColors[phase] || "bg-gray-100 text-gray-600"}`, children: phase }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400", children: [
            days.length,
            " sessions"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-2", children: days.map((day, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-20 shrink-0 text-sm text-gray-500 font-medium", children: formatDate(day.date) }),
              /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${day.sessionNumber === "bonus" ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-600"}`, children: day.sessionNumber === "bonus" ? "★" : day.sessionNumber }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700", children: day.session })
            ]
          },
          `${phase}-${i}`
        )) })
      ] }, phase)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-emerald-800", children: [
        /* @__PURE__ */ jsx("strong", { children: "Tip:" }),
        " Screenshot or print this schedule. Best times to listen: before sleep, during rest days, or during your cool-down after training."
      ] }) })
    ] }),
    raceDate && schedule.length === 0 && /* @__PURE__ */ jsx("div", { className: "p-4 bg-amber-50 rounded-xl border border-amber-100", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-800", children: "Your race is very soon! We need at least one week to build a meaningful programme. Consider using the Bonus Race Week Protocol for immediate benefit." }) })
  ] });
}

const $$Access = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "MindTrail \u2014 Your Sessions", "description": "Access your MindTrail visualization sessions." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50"> <!-- Header --> <header class="bg-white border-b border-gray-100"> <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between"> <a href="/" class="text-gray-900 font-bold text-xl flex items-center gap-2"> <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M8 3l4 8 5-5 2 8H2L8 3z" stroke-linecap="round" stroke-linejoin="round"></path> </svg>
MindTrail
</a> <button id="logout-btn" class="text-sm text-gray-400 hover:text-gray-600 transition">Sign out</button> </div> </header> <!-- Verification gate --> <div id="verify-section" class="max-w-md mx-auto px-6 py-20 text-center"> <h1 class="text-2xl font-bold text-gray-900 mb-3">Access Your Sessions</h1> <p class="text-gray-500 mb-8">Enter the email you used to purchase MindTrail.</p> <form id="verify-form" class="space-y-4"> <input type="email" id="email-input" placeholder="your@email.com" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center"> <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition">
Access My Sessions
</button> <p id="verify-error" class="text-red-500 text-sm hidden"></p> </form> <p class="text-gray-400 text-sm mt-8">
Don't have access yet? <a href="/#pricing" class="text-emerald-500 hover:text-emerald-600 font-medium">Get all 7 sessions</a> </p> </div> <!-- Content (hidden until verified) --> <div id="content-section" class="hidden"> <div class="max-w-5xl mx-auto px-6 py-12"> <div class="mb-4"> <p class="text-sm text-gray-400">Logged in as <span id="user-email" class="text-gray-600 font-medium"></span></p> </div> <div class="grid lg:grid-cols-2 gap-12"> <!-- Left: Audio Player --> <div> ${renderComponent($$result2, "SessionPlayer", SessionPlayer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/renaud/Documents/workspace/mindtrailweb/src/components/SessionPlayer", "client:component-export": "default" })} </div> <!-- Right: Training Programme --> <div> ${renderComponent($$result2, "TrainingProgramme", TrainingProgramme, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/renaud/Documents/workspace/mindtrailweb/src/components/TrainingProgramme", "client:component-export": "default" })} </div> </div> </div> </div> </div> ${renderScript($$result2, "/Users/renaud/Documents/workspace/mindtrailweb/src/pages/access.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/renaud/Documents/workspace/mindtrailweb/src/pages/access.astro", void 0);

const $$file = "/Users/renaud/Documents/workspace/mindtrailweb/src/pages/access.astro";
const $$url = "/access";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Access,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
