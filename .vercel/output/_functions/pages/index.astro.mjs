import { e as createComponent, m as maybeRenderHead, k as renderComponent, r as renderTemplate, l as renderScript } from '../chunks/astro/server_DRRAQrBC.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C6TTfXoC.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import 'clsx';
export { renderers } from '../renderers.mjs';

function AudioDemoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration * 100);
      }
    };
    const handleLoaded = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);
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
  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audio.currentTime = pct * audio.duration;
  };
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20", children: [
    /* @__PURE__ */ jsx("audio", { ref: audioRef, src: "/audio/demo-preview.mp3", preload: "metadata" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-white text-sm mb-1", children: [
      /* @__PURE__ */ jsx("span", { className: "text-emerald-300 font-medium text-xs uppercase tracking-wider", children: "Preview" }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Session 1 — Foundational Relaxation" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: togglePlay,
          className: "w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 transition flex items-center justify-center shrink-0",
          "aria-label": isPlaying ? "Pause" : "Play",
          children: isPlaying ? /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("rect", { x: "6", y: "4", width: "4", height: "16" }),
            /* @__PURE__ */ jsx("rect", { x: "14", y: "4", width: "4", height: "16" })
          ] }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-white ml-0.5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("polygon", { points: "5,3 19,12 5,21" }) })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer group",
            onClick: handleProgressClick,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "h-full bg-emerald-400 rounded-full relative transition-all",
                style: { width: `${progress}%` },
                children: /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition" })
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs tabular-nums w-8", children: duration ? formatTime(progress / 100 * duration) : "0:00" })
      ] })
    ] })
  ] });
}

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden"> <!-- Background image with overlay --> <div class="absolute inset-0 bg-[url('/images/hero-trail.jpg')] bg-cover bg-center"></div> <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80"></div> <!-- Nav --> <nav class="absolute w-full z-20 top-0 left-0 px-6 py-5"> <div class="max-w-7xl mx-auto flex justify-between items-center"> <div class="text-white font-bold text-2xl tracking-tight flex items-center gap-2"> <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M8 3l4 8 5-5 2 8H2L8 3z" stroke-linecap="round" stroke-linejoin="round"></path> </svg>
MindTrail
</div> <div class="flex items-center gap-6"> <a href="#method" class="text-gray-200 hover:text-white transition hidden md:inline-block text-sm">How It Works</a> <a href="#sessions" class="text-gray-200 hover:text-white transition hidden md:inline-block text-sm">Sessions</a> <a href="#pricing" class="text-gray-200 hover:text-white transition hidden md:inline-block text-sm">Pricing</a> <a href="#faq" class="text-gray-200 hover:text-white transition hidden md:inline-block text-sm">FAQ</a> <a href="#pricing" class="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full font-semibold transition text-sm shadow-lg">
Get Access
</a> </div> </div> </nav> <!-- Hero content --> <div class="relative z-10 max-w-4xl mx-auto pt-20"> <span class="inline-block py-1.5 px-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm font-medium mb-8 backdrop-blur-sm">
Audio Mental Training for Trail Runners
</span> <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
Run the Race in Your Mind<br> <span class="text-emerald-400">Before You Run It with Your Legs</span> </h1> <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
7 progressive audio visualization sessions based on the PETTLEP framework — the same science that made non-runners 5x more likely to complete an ultramarathon.
</p> <!-- Audio demo player --> <div class="max-w-md mx-auto mb-8"> ${renderComponent($$result, "AudioDemoPlayer", AudioDemoPlayer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/renaud/Documents/workspace/mindtrailweb/src/components/AudioDemoPlayer", "client:component-export": "default" })} </div> <a href="#pricing" class="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-4 rounded-xl font-bold transition shadow-xl shadow-emerald-500/20">
$67 — Get All 7 Sessions
<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> <p class="text-gray-400 text-sm mt-4">One-time payment. Lifetime access.</p> </div> <!-- Scroll indicator --> <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"> <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path> </svg> </div> </header>`;
}, "/Users/renaud/Documents/workspace/mindtrailweb/src/components/Hero.astro", void 0);

const $$BenefitsSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Problem Section -->${maybeRenderHead()}<section class="py-20 bg-gray-50"> <div class="max-w-7xl mx-auto px-6"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
Your Body Is Ready.<br> <span class="text-emerald-600">Is Your Mind?</span> </h2> <p class="text-gray-500 text-lg max-w-2xl mx-auto">
You train twenty-plus hours per week. Your legs are ready. But the race will be decided between your ears.
</p> </div> <div class="grid md:grid-cols-3 gap-8 mb-16"> <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"> <div class="text-5xl font-bold text-red-500 mb-3">67%</div> <p class="text-gray-600">of ultra-trail DNFs are mental, not physical</p> </div> <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"> <div class="text-5xl font-bold text-amber-500 mb-3">0h</div> <p class="text-gray-600">per week most runners spend on mental training</p> </div> <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"> <div class="text-5xl font-bold text-emerald-500 mb-3">5x</div> <p class="text-gray-600">more likely to finish an ultra with Functional Imagery Training</p> </div> </div> <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 max-w-3xl mx-auto"> <p class="text-gray-500 text-sm uppercase tracking-wider mb-4 font-medium">The Science</p> <p class="text-gray-700 text-lg leading-relaxed">
In 2021, the University of Plymouth studied non-runners trained with <strong>Functional Imagery Training (FIT)</strong>.
        The result? They were <strong class="text-emerald-600">five times more likely to complete an ultramarathon</strong> than a control group.
        MindTrail brings this same methodology to experienced trail runners — combining multi-sensory visualization with trail-specific scenarios
        you actually face on race day.
</p> </div> </div> </section> <!-- Method Section --> <section id="method" class="py-20 bg-white"> <div class="max-w-7xl mx-auto px-6"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built on the PETTLEP Framework</h2> <p class="text-gray-500 text-lg max-w-2xl mx-auto">
The gold standard in sport psychology, adapted specifically for trail and ultra-trail challenges.
</p> </div> <div class="grid md:grid-cols-3 gap-8"> <div class="relative p-8 rounded-2xl border border-emerald-100 bg-emerald-50/50"> <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-5"> <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path> </svg> </div> <h3 class="text-xl font-bold text-gray-900 mb-3">Multi-Sensory</h3> <p class="text-gray-600">Every session engages all five senses — sight, sound, touch, smell, and taste. Your brain can't tell the difference between vivid imagery and reality.</p> </div> <div class="relative p-8 rounded-2xl border border-emerald-100 bg-emerald-50/50"> <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-5"> <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path> </svg> </div> <h3 class="text-xl font-bold text-gray-900 mb-3">Progressive</h3> <p class="text-gray-600">Seven sessions that build on each other — from basic relaxation to full race-day simulation. Like a training plan for your mind.</p> </div> <div class="relative p-8 rounded-2xl border border-emerald-100 bg-emerald-50/50"> <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-5"> <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path> </svg> </div> <h3 class="text-xl font-bold text-gray-900 mb-3">Trail-Specific</h3> <p class="text-gray-600">Technical descents, night running, aid station transitions, DNF prevention — real scenarios from trail and ultra-trail races, not generic meditation.</p> </div> </div> </div> </section>`;
}, "/Users/renaud/Documents/workspace/mindtrailweb/src/components/BenefitsSection.astro", void 0);

const $$SessionList = createComponent(($$result, $$props, $$slots) => {
  const sessions = [
    {
      number: 1,
      title: "Foundational Relaxation & Trail Senses",
      duration: "10 min",
      description: "Build your visualization ability from zero. Create your trail safe space with progressive sensory layering across all five senses.",
      hasPreview: true
    },
    {
      number: 2,
      title: "Technical Descent Mastery",
      duration: "12 min",
      description: "Develop proprioceptive imagery for downhill running. Move from slow-motion foot placement to flowing, instinctive descent confidence."
    },
    {
      number: 3,
      title: "Climb Resilience & Mental Toughness",
      duration: "12 min",
      description: "Synchronize breathing with effort, install self-talk patterns, and build the mental framework to welcome every climb."
    },
    {
      number: 4,
      title: "Night Running Confidence",
      duration: "10 min",
      description: "Transform darkness from fear to comfort. Build auditory navigation skills and the mental anchors for 2 AM ultra sections."
    },
    {
      number: 5,
      title: "Aid Station Transitions & Fueling",
      duration: "12 min",
      description: "Visualize efficient stops and build fueling discipline. Practice the crisis decision tree when your body says stop."
    },
    {
      number: 6,
      title: "DNF Prevention & Race Resilience",
      duration: "15 min",
      description: "Build emotional resilience for your lowest points. Develop your personal 'why' anchor and the three-question framework that keeps you moving."
    },
    {
      number: 7,
      title: "Full Race Day Simulation",
      duration: "15 min",
      description: "Complete race rehearsal from 4 AM alarm to finish line. Integrates every skill from Sessions 1\u20136 into one powerful experience."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="sessions" class="py-20 bg-gray-50"> <div class="max-w-7xl mx-auto px-6"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">7 Progressive Sessions</h2> <p class="text-gray-500 text-lg max-w-2xl mx-auto">
Each session builds on the last. From basic relaxation to full race-day simulation — like a periodized training plan for your mind.
</p> </div> <div class="grid gap-4 max-w-4xl mx-auto"> ${sessions.map((session) => renderTemplate`<div class="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition group"> <div class="flex items-start gap-5"> <div class="shrink-0 w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-lg flex items-center justify-center"> ${session.number} </div> <div class="flex-1 min-w-0"> <div class="flex items-center gap-3 mb-1"> <h3 class="text-lg font-bold text-gray-900">${session.title}</h3> ${session.hasPreview && renderTemplate`<span class="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Preview available</span>`} </div> <p class="text-gray-500 text-sm mb-2">${session.duration}</p> <p class="text-gray-600">${session.description}</p> </div> <div class="shrink-0 hidden md:flex items-center text-gray-300 group-hover:text-emerald-500 transition"> ${!session.hasPreview ? renderTemplate`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5zm3 10v8H9v-8h6zm-1-2h-4V7a2 2 0 114 0v3z"></path> </svg>` : renderTemplate`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <polygon points="5,3 19,12 5,21"></polygon> </svg>`} </div> </div> </div>`)} <!-- Bonus --> <div class="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-6 md:p-8 text-white mt-2"> <div class="flex items-start gap-5"> <div class="shrink-0 w-12 h-12 rounded-xl bg-white/10 text-emerald-300 font-bold text-sm flex items-center justify-center"> <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path> </svg> </div> <div class="flex-1"> <div class="flex items-center gap-3 mb-1"> <h3 class="text-lg font-bold">Bonus: Race Week Quick Protocol</h3> <span class="text-xs font-medium text-emerald-300 bg-emerald-700/50 px-2 py-0.5 rounded-full">Included free</span> </div> <p class="text-emerald-200 text-sm mb-2">8 min</p> <p class="text-emerald-100/80">Condensed session combining key anchors from all 7 sessions. Designed for the night before your race — one final confidence activation.</p> </div> </div> </div> </div> <div class="text-center mt-8"> <p class="text-gray-400 text-sm">Total programme: ~94 minutes of audio across 8 sessions</p> </div> </div> </section>`;
}, "/Users/renaud/Documents/workspace/mindtrailweb/src/components/SessionList.astro", void 0);

const $$Testimonials = createComponent(($$result, $$props, $$slots) => {
  const testimonials = [
    {
      quote: "I used MindTrail during my UTMB prep. When I hit the Col du Bonhomme at 2 AM, I felt like I'd already been there. The night running session was a game changer.",
      name: "Marc D.",
      detail: "Finisher UTMB 2024",
      initials: "MD"
    },
    {
      quote: "I almost DNF'd my first 100-miler at mile 65. This time, I had the three-question framework in my head. Mental problem, mental solution. I finished with a smile.",
      name: "Sarah L.",
      detail: "Western States qualifier",
      initials: "SL"
    },
    {
      quote: "I was skeptical about visualization. Ten minutes a day for six weeks completely changed how I handle technical descents. My Strava downhill times dropped without extra training.",
      name: "Thomas R.",
      detail: "Trail runner, 4 ultras completed",
      initials: "TR"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="py-20 bg-emerald-950 text-white"> <div class="max-w-7xl mx-auto px-6"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold mb-4">What Trail Runners Say</h2> <p class="text-emerald-300/70 text-lg">From first-time ultra finishers to experienced mountain runners.</p> </div> <div class="grid md:grid-cols-3 gap-8"> ${testimonials.map((t) => renderTemplate`<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"> <svg class="w-8 h-8 text-emerald-500 mb-4" fill="currentColor" viewBox="0 0 24 24"> <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path> </svg> <p class="text-gray-200 leading-relaxed mb-6">${t.quote}</p> <div class="flex items-center gap-3"> <div class="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center"> ${t.initials} </div> <div> <p class="font-semibold text-white text-sm">${t.name}</p> <p class="text-emerald-400/70 text-sm">${t.detail}</p> </div> </div> </div>`)} </div> </div> </section>`;
}, "/Users/renaud/Documents/workspace/mindtrailweb/src/components/Testimonials.astro", void 0);

const $$PricingCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="pricing" class="py-20 bg-white"> <div class="max-w-7xl mx-auto px-6"> <div class="text-center mb-12"> <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">One Price. Everything Included.</h2> <p class="text-gray-500 text-lg">No subscription. No recurring fees. Train your mind once, benefit forever.</p> </div> <div class="max-w-lg mx-auto"> <div class="bg-white rounded-3xl shadow-xl border-2 border-emerald-500 p-8 md:p-10 relative overflow-hidden"> <!-- Badge --> <div class="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
BEST VALUE
</div> <h3 class="text-2xl font-bold text-gray-900 mb-2">Complete MindTrail Programme</h3> <p class="text-gray-500 mb-6">Everything you need to train your mind for trail racing.</p> <div class="flex items-baseline gap-2 mb-8"> <span class="text-5xl font-bold text-gray-900">$67</span> <span class="text-gray-400">one-time payment</span> </div> <ul class="space-y-3 mb-8"> ${[
    "7 progressive visualization sessions (86 min)",
    "Bonus: Race Week Quick Protocol (8 min)",
    "Personalized training schedule based on your race date",
    "Lifetime access \u2014 listen on any device",
    "Download for offline listening"
  ].map((item) => renderTemplate`<li class="flex items-start gap-3"> <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path> </svg> <span class="text-gray-700">${item}</span> </li>`)} </ul> <button id="checkout-button" class="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-emerald-500/20">
Get Instant Access — $67
</button> <div class="flex items-center justify-center gap-4 mt-4 text-sm text-gray-400"> <span class="flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg>
Secure checkout
</span> <span>Powered by Lemon Squeezy</span> </div> </div> </div> </div> </section> ${renderScript($$result, "/Users/renaud/Documents/workspace/mindtrailweb/src/components/PricingCard.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/renaud/Documents/workspace/mindtrailweb/src/components/PricingCard.astro", void 0);

const $$FAQ = createComponent(($$result, $$props, $$slots) => {
  const faqs = [
    {
      question: "Is this meditation?",
      answer: "No. MindTrail uses sport-specific visualization based on the PETTLEP framework from sport psychology \u2014 not meditation. You're actively building neural pathways for trail running scenarios: technical descents, climbs, night sections, and race-day decisions. Think of it as mental rehearsal, not mindfulness."
    },
    {
      question: "I've never done visualization before. Will this work for me?",
      answer: "Session 1 is specifically designed for complete beginners. It teaches you how to visualize from scratch with progressive sensory layering. Most people are surprised by how vivid their imagery becomes after just two or three sessions."
    },
    {
      question: "I'm training for a specific race. Will this help?",
      answer: "Yes. The sessions cover universal trail running scenarios \u2014 descents, climbs, night running, aid stations, and low points \u2014 that apply to any trail or ultra-trail race. Session 7 is a full race-day simulation that you'll mentally map to your specific event."
    },
    {
      question: "What format are the sessions? Can I listen offline?",
      answer: "All sessions are high-quality MP3 audio files. You can stream them from any device with a browser, or download them for offline listening during travel, taper weeks, or pre-race nights when you might not have Wi-Fi."
    },
    {
      question: "When should I listen? How often?",
      answer: "After purchase, you'll get a personalized training schedule based on your race date. The recommended programme is 3 sessions per week for 6-8 weeks. Best times are before sleep, during rest days, or during your cool-down after a training run."
    },
    {
      question: "What is the PETTLEP framework?",
      answer: "PETTLEP stands for Physical, Environment, Task, Timing, Learning, Emotion, and Perspective. It's the gold standard in sport psychology for motor imagery. Unlike generic guided meditation, PETTLEP-based visualization activates the same brain regions as actually performing the movement \u2014 which is why it's so effective for sport performance."
    },
    {
      question: "What's the science behind this?",
      answer: "A 2021 University of Plymouth study found that non-runners trained with Functional Imagery Training were 5x more likely to complete an ultramarathon. Dozens of meta-analyses confirm that mental imagery improves motor performance, reduces anxiety, and increases resilience. MindTrail applies these principles specifically to trail running."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="faq" class="py-20 bg-gray-50"> <div class="max-w-3xl mx-auto px-6"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2> </div> <div class="space-y-4"> ${faqs.map((faq, i) => renderTemplate`<details class="group bg-white rounded-2xl border border-gray-100 shadow-sm"> <summary class="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900 list-none"> <span>${faq.question}</span> <svg class="w-5 h-5 text-gray-400 shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path> </svg> </summary> <div class="px-6 pb-6 text-gray-600 leading-relaxed -mt-2"> ${faq.answer} </div> </details>`)} </div> </div> </section>`;
}, "/Users/renaud/Documents/workspace/mindtrailweb/src/components/FAQ.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Final CTA -->${maybeRenderHead()}<section class="py-20 bg-gray-900 text-center px-6"> <div class="max-w-3xl mx-auto"> <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
Your Next Race Starts<br> <span class="text-emerald-400">in Your Mind</span> </h2> <p class="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
The start line is weeks away. Your mental preparation starts today. Ten minutes a day is all it takes.
</p> <a href="#pricing" class="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-4 rounded-xl font-bold transition shadow-xl shadow-emerald-500/20">
Get All 7 Sessions — $67
<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </section> <!-- Footer --> <footer class="bg-gray-950 text-gray-400 py-12 px-6"> <div class="max-w-7xl mx-auto"> <div class="flex flex-col md:flex-row justify-between items-center gap-6"> <div class="flex items-center gap-2 text-white font-bold text-xl"> <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M8 3l4 8 5-5 2 8H2L8 3z" stroke-linecap="round" stroke-linejoin="round"></path> </svg>
MindTrail
</div> <div class="flex items-center gap-6 text-sm"> <a href="/privacy" class="hover:text-emerald-400 transition">Privacy Policy</a> <a href="/terms" class="hover:text-emerald-400 transition">Terms of Service</a> <a href="mailto:hello@mindtrail.co" class="hover:text-emerald-400 transition">Contact</a> </div> </div> <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} MindTrail. All rights reserved.
</div> </div> </footer>`;
}, "/Users/renaud/Documents/workspace/mindtrailweb/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "MindTrail \u2014 Audio Mental Training for Trail Runners" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", " ", " ", " ", " ", " ", " ", '  <script src="https://assets.lemonsqueezy.com/lemon.js" defer><\/script> '])), renderComponent($$result2, "Hero", $$Hero, {}), renderComponent($$result2, "BenefitsSection", $$BenefitsSection, {}), renderComponent($$result2, "SessionList", $$SessionList, {}), renderComponent($$result2, "Testimonials", $$Testimonials, {}), renderComponent($$result2, "PricingCard", $$PricingCard, {}), renderComponent($$result2, "FAQ", $$FAQ, {}), renderComponent($$result2, "Footer", $$Footer, {})) })}`;
}, "/Users/renaud/Documents/workspace/mindtrailweb/src/pages/index.astro", void 0);

const $$file = "/Users/renaud/Documents/workspace/mindtrailweb/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
