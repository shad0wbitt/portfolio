import { privateProjects } from "./private-projects";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  tag: string; // short category shown on cards and detail pages
  description: string[];
  role: string;
  year: string;
  stack: string[];
  features: string[];
  repoUrl?: string; // omitted when the work is private — no source link is rendered
  liveUrl?: string;
  accent: string; // gradient used for the card/hero visual
  image?: string; // thumbnail in /public/projects; the gradient is the fallback
  featured?: boolean;
  private?: boolean; // NDA work: card is public, code and repo are not
};

export const profile = {
  name: "Abdul Rehman",
  role: "Software Developer",
  location: "Lahore, Pakistan",
  bio: "I build web applications and AI systems — Flask and FastAPI backends, React frontends, RAG pipelines over private docs, and MCP tool servers that let LLM clients drive real systems.",
  email: "nomi66623@gmail.com",
  github: "https://github.com/shad0wbitt",
  githubHandle: "shad0wbitt",
  avatar: "/github-avatar.jpg",
  heroArt: "/purple-swirl.jpg",
};

export const skills = [
  { name: "Python", level: 90 },
  { name: "Flask", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 80 },
  { name: "TypeScript", level: 70 },
  { name: "HTML / CSS", level: 90 },
  { name: "SQL / SQLite", level: 75 },
  { name: "Tailwind CSS", level: 85 },
  { name: "RAG / Vector Search", level: 82 },
  { name: "MCP Tool Servers", level: 78 },
];

const publicProjects: Project[] = [
  {
    slug: "roomkit",
    title: "Roomkit",
    tag: "AI, product",
    tagline: "Drop a colour on a wall and get the room back, repainted",
    description: [
      "Roomkit takes a photo of a room and repaints the walls you pick. Drop a colour on a wall, press Render, and roughly a minute later the same room comes back in that colour — furniture, window light, perspective and shadows untouched.",
      "The backend is FastAPI calling an image model through OpenRouter (ByteDance Seedream 5.0 Flash). Every colour the user marked travels in a single request with the original photo, so a room costs one billed image instead of one per wall, and the prompt pins the exact hex values while forbidding changes to anything that is not a named wall.",
      "History is a SQLite file with the before and after images stored beside it, so past renders survive restarts and open straight from a URL. A cache keyed on the photo and its paints answers a repeat render for free, an access-key gate keeps the billed endpoint behind a cookie, and the Next.js frontend reaches Python through a same-origin /api rewrite — no CORS, and no key in the browser.",
      "It runs on a VPS as two systemd services behind nginx and Cloudflare, with the Python API bound to loopback so only the frontend can reach it.",
    ],
    role: "Solo developer",
    year: "2026",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "OpenRouter",
      "SQLite",
    ],
    features: [
      "Drop-in colour marking on the photo, mouse and touch, with undo and an eight-wall cap",
      "One billed image per room: every chosen hex travels in a single model call",
      "Render history in SQLite with both images, cost, and elapsed time per generation",
      "Cache keyed on photo plus paints, so the same room renders again for free",
      "Access-key gate with a 30-day cookie on the endpoint that costs money",
      "Same-origin /api rewrite keeps the Python origin out of the browser",
    ],
    repoUrl: "https://github.com/shad0wbitt/Roomkit",
    liveUrl: "https://roomkit.scriptro.com",
    accent: "from-orange-400/40 via-rose-500/20 to-amber-300/30",
    image: "/images/roomkit.jpg",
    featured: true,
  },
  {
    slug: "voice-engine",
    title: "Voice Engine",
    tag: "AI, audio",
    tagline: "Turn a script into natural speech, straight from the browser",
    description: [
      "A text-to-speech app: paste a script, press Generate, and the audio plays in the page a few seconds later. Every generation is kept in a local history you can replay or delete.",
      "The backend is FastAPI calling OpenRouter's speech endpoint (Fish Audio s2.1-pro), which returns raw mp3 bytes that get written to disk and streamed back to the browser as a blob.",
      "History lives in SQLite through Python's standard library — no ORM, no migration tooling, and no build step for the frontend. Every API route requires the access key from .env, and failed generations are stored too, with the provider's error message, so breakage stays visible instead of silent.",
    ],
    role: "Solo developer",
    year: "2026",
    stack: ["Python", "FastAPI", "OpenRouter", "SQLite", "JavaScript"],
    features: [
      "Script-to-speech generation through OpenRouter's text-to-speech endpoint",
      "Built-in player that plays the fresh mp3 as a blob — no file juggling",
      "Generation history with timestamp, size, and round-trip time",
      "Failed runs kept with the provider's error message for real debugging",
      "Access-key gate on every route; the app refuses to start without it",
    ],
    repoUrl: "https://github.com/shad0wbitt/VOICE-ENGINE",
    accent: "from-emerald-400/40 via-teal-500/20 to-cyan-300/30",
    image: "/images/voice-engine.jpg",
    featured: true,
  },
  {
    slug: "ai-studio-site",
    title: "AI Studio Site",
    tag: "Website, design",
    tagline: "This portfolio — an editorial React build",
    description: [
      "The site you're looking at: a multi-page portfolio rebuilt around an editorial design system — oversized type, a rotating portrait aperture, and surfaces that shift from near-black to lavender as you scroll.",
      "Every page shares one language: Gabarito for display, Onest for body, a single purple accent, 28px surfaces and badges, and hairline rules instead of borders. The design follows the free Onda template by 8B, rebuilt in React, Vite and Tailwind.",
      "Motion is deliberately light: a CSS-only hero entrance, an IntersectionObserver reveal pass, and a scroll-driven progress ring that makes the process legible instead of decorative.",
    ],
    role: "Solo developer",
    year: "2026",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Router"],
    features: [
      "Multi-page routing with project detail pages",
      "Editorial type system and lavender surfaces",
      "Scroll-reveal motion with reduced-motion fallbacks",
      "Rotating hero and footer portrait apertures",
      "Sticky method ring driven by scroll progress",
    ],
    accent: "from-violet-400/40 via-fuchsia-500/20 to-pink-300/30",
    image: "/images/ai-studio-site.jpg",
    featured: true,
  },
];

export const projects: Project[] = [...publicProjects, ...privateProjects];

export const featuredProjects = projects.filter((p) => p.featured);

export type Service = {
  slug: string;
  title: string;
  short: string; // one-liner for cards/teasers
  description: string;
  deliverables: string[];
  tags: string[];
  icon: "workflow" | "chat" | "data" | "agents";
};

export const services: Service[] = [
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    tags: ["Audits", "Scripts", "Integrations", "Alerts"],
    short:
      "Replace the copy-paste routine — scripts and integrations that run your repetitive work for you.",
    description:
      "If your team does the same thing every day by hand — moving data between tools, generating reports, renaming files, sending follow-ups — I map the workflow and rebuild it as reliable automation. Python and Flask on the backend, scheduled jobs, and clean hooks into the SaaS tools you already use.",
    deliverables: [
      "Workflow audit: where the hours actually go",
      "Event- and schedule-driven automation scripts",
      "Integrations with email, sheets, CRMs, and internal APIs",
      "Logging and alerts so failures never fail silently",
      "Handoff docs so your team can maintain it",
    ],
    icon: "workflow",
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots & Assistants",
    tags: ["RAG", "MCP", "Chat UI", "Guardrails"],
    short:
      "Support and internal assistants grounded in your own docs, not generic answers.",
    description:
      "Custom assistants built on LLM APIs and grounded in your own content — product docs, FAQs, tickets, internal wikis. Retrieval-augmented so answers cite real sources, with guardrails for tone and scope. Deploy as a website widget, Slack bot, or standalone page — and expose the same retrieval layer to any MCP-compatible client (Claude, IDE agents, internal tools).",
    deliverables: [
      "RAG pipeline: chunking, embeddings, hybrid search, reranking",
      "MCP server exposing your docs and tools to LLM clients",
      "Chat UI or integration into your existing product",
      "Escalation path to a human when the bot is unsure",
      "Analytics on what users actually ask",
      "Prompt and cost tuning before launch",
    ],
    icon: "chat",
  },
  {
    slug: "data-pipelines",
    title: "Data Collection & Pipelines",
    tags: ["Scrapers", "ETL", "SQL", "Scheduling"],
    short:
      "Scrapers, ETL jobs, and clean datasets delivered on a schedule.",
    description:
      "Recurring data work automated end to end: collecting from APIs and websites, cleaning and deduplicating, then loading into the database or spreadsheet your team uses. Built with Python and SQLAlchemy — the same stack as my Voice Engine backend — with retry logic and validation baked in.",
    deliverables: [
      "Scrapers and API collectors with rate limiting",
      "Cleaning, dedup, and validation rules",
      "Scheduled runs with failure notifications",
      "SQLite or SQL storage with a query-friendly schema",
      "CSV / JSON / webhook exports downstream",
    ],
    icon: "data",
  },
  {
    slug: "ai-agents",
    title: "AI Agents & Internal Tools",
    tags: ["Agents", "Tool use", "Dashboards", "Review"],
    short:
      "Multi-step AI agents paired with small tools your team uses daily.",
    description:
      "When one prompt isn't enough: agents that plan, call tools, and complete multi-step tasks — triaging tickets, drafting replies, summarizing threads, filling forms. Tools are wrapped as MCP servers, so the same integrations work across Claude, ChatGPT, and your own agents instead of being locked to one vendor. Paired with lightweight React frontends so your team drives it from a real interface instead of a terminal.",
    deliverables: [
      "MCP tool servers over your DB, search, email, and internal APIs",
      "Agent with tool access (search, DB, email, your APIs)",
      "Human-in-the-loop review before anything is sent",
      "React dashboard to run and monitor agents",
      "Cost and latency budget agreed up front",
      "Iteration pass on real usage data",
    ],
    icon: "agents",
  },
];

export const serviceProcess = [
  {
    step: "01",
    title: "Audit",
    body: "We map the workflow and count the hours it costs you today.",
  },
  {
    step: "02",
    title: "Prototype",
    body: "A working slice in days, not months — validated on your real data.",
  },
  {
    step: "03",
    title: "Automate",
    body: "Production build with logging, alerts, and failure handling.",
  },
  {
    step: "04",
    title: "Handoff",
    body: "Docs, a walkthrough, and support so your team owns it.",
  },
];
