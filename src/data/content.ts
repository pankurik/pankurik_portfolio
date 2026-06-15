export type RichTextPart = {
  text: string;
  emphasis?: boolean;
};

export type ProjectDescriptionPart = RichTextPart;

export type Project = {
  title: string;
  description: ProjectDescriptionPart[];
  tagPills: string[];
  role: string;
  period: string;
  tags: string[];
  link: string;
  whatIBuilt: string;
  type: "Professional" | "Personal" | "Team";
  featured?: boolean;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  employmentType?: string;
  latest?: boolean;
  bullets: RichTextPart[][];
};

export type Leadership = {
  title: string;
  organization: string;
  period: string;
  description: RichTextPart[];
};

export type About = {
  name: string;
  title: string;
  location: string;
  bio: string;
  shortBio: string;
  bioStrip: RichTextPart[];
  bioPills: {
    green: string[];
    muted: string[][];
  };
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  availability: string;
  initials: string;
  year: string;
};

export type HeroListItem = {
  title: string;
  tags: string[];
};

export type Skill = {
  name: string;
  context: string;
  primary?: boolean;
};

export type SkillCategory = {
  id: string;
  label: string;
  skills: Skill[];
};

export type Tool = {
  name: string;
  description: string;
};

export type ToolCategory = {
  id: string;
  label: string;
  tools: Tool[];
};

export const about: About = {
  name: "Pankuri Khare",
  title: "Full-stack engineer",
  location: "San Francisco",
  shortBio:
    "Full-stack engineer based in SF. I build backends, AI pipelines, and iOS apps — and I care about systems that hold up under failure.",
  bio: "I studied Computer Science and Comparative World Literature at San Francisco State University — an unusual mix, but it shaped how I think: part logical, part creative. Give me an ambiguous problem and I'll figure it out. That shows up in how I debug systems I've never seen, how I navigate infrastructure without a playbook, and how I keep going when the answer isn't obvious. I'm most energized by early-stage teams where engineers are close to the problem and ownership is real.",
  bioStrip: [
    { text: "I studied CS and Comparative World Literature at SF State — an unusual mix, but it shaped how I think: " },
    { text: "part logical, part creative", emphasis: true },
    { text: ". Give me an ambiguous problem and " },
    { text: "I'll figure it out", emphasis: true },
    { text: ". That shows up in how I debug systems I've never seen, navigate infrastructure without a playbook, and keep going when the answer isn't obvious. I'm most energized by " },
    { text: "early-stage teams", emphasis: true },
    { text: " where engineers are close to the problem and " },
    { text: "ownership is real", emphasis: true },
    { text: "." },
  ],
  bioPills: {
    green: ["Open to work", "SF-based", "Full-time"],
    muted: [
      ["1-2 yrs experience", "Full-stack"],
      ["Startups preferred", "AI systems"],
    ],
  },
  email: "pankurikhare17@gmail.com",
  github: "https://github.com/pankurik",
  linkedin: "https://www.linkedin.com/in/pankuri-khare-27151a146",
  resume: "/resume.pdf",
  availability: "Open to work",
  initials: "PK",
  year: "2026",
};

export const projects: Project[] = [
  {
    title: "AdsGency AI",
    type: "Professional",
    featured: true,
    tagPills: ["Professional", "AI Platform"],
    role: "Software Engineer",
    period: "Aug 2025 – Jan 2026",
    description: [
      { text: "AI-driven marketing automation platform — built the " },
      { text: "DataValidationAgent from scratch", emphasis: true },
      { text: ", normalized data across 8 enterprise sources, owned end-to-end i18n in 7 languages, and shipped the " },
      { text: "real-time analytics dashboard", emphasis: true },
      { text: " (frontend + backend) pulling live from Facebook, Google, TikTok, and LinkedIn." },
    ],
    tags: [
      "LangGraph",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Next.js",
      "TypeScript",
      "pgvector",
    ],
    link: "https://github.com/pankurik",
    whatIBuilt:
      "DataValidationAgent (schema validation, anomaly detection, freshness checks, exponential backoff retry logic, 1,382 lines of unit tests). Data normalization across Databricks, Redshift, Snowflake, BigQuery, PostgreSQL, Shopify, Salesforce, and MondayCRM. End-to-end i18n across frontend and backend — Babel translation infrastructure, 11 backend controllers, 7 languages. Real-time analytics dashboard (frontend + backend) pulling live from Facebook, Google, TikTok, and LinkedIn. Reduced planning page load from 5s to 2s, measured via PostHog. Top contributor to the frontend codebase: 991 of 2,068 commits.",
  },
  {
    title: "Portfolio AI Agent",
    type: "Personal",
    featured: true,
    tagPills: ["Personal", "AI"],
    role: "Solo Developer",
    period: "Next.js · Supabase · Claude",
    description: [
      { text: "RAG-powered AI agent built into this portfolio — user question → " },
      { text: "OpenAI embedding → pgvector similarity search", emphasis: true },
      { text: " → Claude Haiku with persona prompt + retrieved chunks → " },
      { text: "logged to Supabase", emphasis: true },
      { text: " for live stats." },
    ],
    tags: ["Next.js", "TypeScript", "Claude Haiku", "OpenAI", "pgvector", "Supabase", "RAG"],
    link: "https://github.com/pankurik",
    whatIBuilt:
      "Full RAG pipeline: knowledge base chunked by section headings, embedded via OpenAI text-embedding-3-small (1536 dimensions), stored in Supabase with pgvector. Per-query: embed → cosine similarity search (top 5, threshold 0.3) → Claude Haiku with system prompt + retrieved context. Q&A logged to Supabase; live stats panel shows real questions asked. Designed the persona prompt so the agent answers as me — warm, direct, no hallucinating facts not in the knowledge base.",
  },
  {
    title: "CardMind iOS",
    type: "Personal",
    tagPills: ["Personal", "iOS"],
    role: "Solo Developer",
    period: "Shipped in one week",
    description: [
      { text: "iOS app that solves a real problem: " },
      { text: "multiple credit cards, different due dates, reminders you ignore", emphasis: true },
      { text: ". CardMind sends escalating notifications that keep coming back until you actually pay — with one-tap " },
      { text: "\"Paid\" to cancel all future reminders", emphasis: true },
      { text: " for that card." },
    ],
    tags: ["SwiftUI", "SwiftData", "WidgetKit", "Swift Charts", "App Groups"],
    link: "https://github.com/pankurik",
    whatIBuilt:
      "Card-first UI with SwiftUI and SwiftData. Escalating notification system: automatic reminders at 5 days, 3 days, 2 days, 1 day, and due date — each with 'Paid' (cancels all future reminders instantly) and 'Remind me later' (snooze 1, 24, or 48 hours). Home screen widgets via WidgetKit — hardest part was sharing SwiftData between the main app and widget process using App Groups, shared container URLs, and manual WidgetCenter timeline reloads. Spending visualizations with Swift Charts. Validated with 10 people before building. Submitting to App Store soon.",
  },
  {
    title: "EduBridge",
    type: "Team",
    tagPills: ["Team", "Ed-tech"],
    role: "Frontend Lead",
    period: "Senior Capstone · 5-person team",
    description: [
      { text: "Senior capstone — mentorship platform with " },
      { text: "role-based dashboards", emphasis: true },
      { text: " for students, mentors, and admins. I led the frontend: auth, JWT-protected routes, " },
      { text: "mentor discovery flows, forums, and file uploads", emphasis: true },
      { text: " — deployed to AWS EC2 and Netlify." },
    ],
    tags: ["React", "React Query", "Context API", "JWT", "AWS EC2", "Netlify"],
    link: "https://github.com/pankurik",
    whatIBuilt:
      "Frontend architecture on a 5-person capstone team. Login flows, JWT authentication, protected routes, and role-based access control — students, mentors, and admins each saw different dashboards and data. Mentor discovery and matching flows. Forum and community features. File upload functionality. State management with React Context API and React Query. Deployed to AWS EC2 and Netlify — not just localhost.",
  },
  {
    title: "Recipe App",
    type: "Personal",
    tagPills: ["Personal", "iOS"],
    role: "Solo Developer",
    period: "SwiftUI · AVFoundation",
    description: [
      { text: "iOS cooking app built around one insight: most recipe apps are optimized for " },
      { text: "discovering recipes, not actually cooking them", emphasis: true },
      { text: ". Cooking Mode guides you step by step with integrated timers and " },
      { text: "voice-guided instructions", emphasis: true },
      { text: " so you never have to touch your phone mid-recipe." },
    ],
    tags: ["Swift", "SwiftUI", "AVFoundation"],
    link: "https://github.com/pankurik",
    whatIBuilt:
      "Cooking Mode with step-by-step navigation and per-step timers. Text-to-speech via AVFoundation reads each instruction aloud as you advance — hands-light by design. Interesting engineering challenge: keeping AVSpeechSynthesizer synchronized with SwiftUI state as users navigate between steps, avoiding overlapping speech when steps change quickly, and managing speech lifecycle correctly when leaving and returning to the screen. Built for iPhone and iPad.",
  },
  {
    title: "Discord Finance Bot",
    type: "Personal",
    tagPills: ["Personal", "Side Project"],
    role: "Solo Developer",
    period: "Python · MySQL",
    description: [
      { text: "Budget tracker that lives in Discord — because " },
      { text: "logging an expense in 30 seconds means you'll actually do it", emphasis: true },
      { text: ". Commands for expenses, budgets, savings goals, and summaries. Backed by a " },
      { text: "normalized schema with 10+ entities", emphasis: true },
      { text: " and SQL aggregation for real spending analytics." },
    ],
    tags: ["Python", "MySQL", "Discord API"],
    link: "https://github.com/pankurik",
    whatIBuilt:
      "Python Discord bot with commands for logging expenses, setting budgets, creating savings goals, and viewing spending summaries and category breakdowns. MySQL backend with a normalized relational schema covering 10+ entities — users, transactions, categories, budgets, goals, alerts, and summaries — with proper multi-user data isolation. SQL aggregation queries answered real questions: how much did I spend this month, which category is over budget, how close am I to a savings goal. Tested with real users and submitted as a database systems course project.",
  },
];

export const experience: Experience[] = [
  {
    company: "AdsGency AI",
    role: "Software Engineer",
    period: "Aug 2025 – Current",
    location: "San Francisco",
    employmentType: "Full-time",
    latest: true,
    bullets: [
      [
        { text: "Promoted to " },
        { text: "primary technical owner within the first month", emphasis: true },
        { text: " — full architecture authority, and de facto PM responsibilities; became the person holding the product together across a distributed engineering team" },
      ],
      [
        { text: "Designed and built " },
        { text: "LangGraph multi-agent pipelines", emphasis: true },
        { text: " for customer segmentation and multi-platform ad generation — orchestrated OpenAI, LangChain, and PGVector into automated workflows that ran continuously against live customer data across Facebook, Instagram, Google, TikTok, Twitter, Pinterest, and LinkedIn" },
      ],
      [
        { text: "Built the " },
        { text: "DataValidationAgent from scratch", emphasis: true },
        { text: " — a 366-line service wired into every ETL job with schema validation, anomaly detection, data freshness checks, exponential backoff retry logic, degradation tracking, and QA escalation; caught bad data before it reached customers and drove a " },
        { text: "60% pipeline efficiency improvement", emphasis: true },
        { text: "; backed by 1,382 lines of unit tests covering edge cases, timezone handling, and retry behavior" },
      ],
      [
        { text: "Designed and built the " },
        { text: "campaign recommendation engine solo", emphasis: true },
        { text: " — ingested performance data, audience segments, and budget signals across ad platforms; scored and ranked recommendations using a keyword-matching engine; cached results in S3 with a campaign recommendation UI that let users view, refresh, and act on suggestions with generated reasoning" },
      ],
      [
        { text: "Built a unified data layer across " },
        { text: "8 enterprise sources", emphasis: true },
        { text: " (Databricks, Redshift, Snowflake, BigQuery, PostgreSQL, Shopify, Salesforce, MondayCRM) — designed normalization metadata generation per source so the AI layer could analyze customer data consistently regardless of where it lived; full ETL pipeline: ingestion, normalization, validation, and orchestration of long-running jobs" },
      ],
      [
        { text: "Built the " },
        { text: "real-time multi-campaign analytics dashboard end-to-end", emphasis: true },
        { text: " (API design → backend → UI) — replaced the workflow where customers logged into each ad platform separately; unified live data from Facebook, Google, TikTok, and LinkedIn into a single view; reduced planning page load from " },
        { text: "5s → 2s", emphasis: true },
        { text: " measured via PostHog" },
      ],
      [
        { text: "Owned full i18n across the entire product — extracted every hardcoded string from the frontend, built a " },
        { text: "Babel-based translation extraction pipeline", emphasis: true },
        { text: ", updated all API controllers to return localized responses, and shipped 7-language support (EN, AR, DE, ES, FR, HI, ZH) across frontend and backend simultaneously" },
      ],
      [
        { text: "Top contributor across all three repositories — " },
        { text: "1,327 of 4,008 total commits (33%)", emphasis: true },
        { text: ", took initiative to restructure all 3 repos (frontend, backend, AI-agents), provided architectural guidance on the agent codebase, and stayed on-call for live production failures — debugging issues in real time on AWS" },
      ],
    ],
  },
  {
    company: "City College SF",
    role: "CS Tutor",
    period: "Aug 2024 – May 2025",
    location: "San Francisco",
    employmentType: "Part-time",
    bullets: [
      [
        { text: "Taught C, C++, data structures, algorithms, and OS concepts in " },
        { text: "one-on-one scheduled sessions", emphasis: true },
        { text: ", 10 hours weekly — topics included pointers, memory management, linked lists, trees, sorting algorithms, and process scheduling" },
      ],
      [
        { text: "All 5 students passed; " },
        { text: "2 who were struggling at the start", emphasis: true },
        { text: " finished with strong grades — adapted explanations to each student's learning pace and gaps rather than teaching to a fixed script" },
      ],
    ],
  },
  {
    company: "SpeEdLabs",
    role: "Web Developer",
    period: "Apr 2021 – Mar 2023",
    location: "India",
    employmentType: "Remote",
    bullets: [
      [
        { text: "Built core quiz infrastructure end-to-end — question rendering, navigation, answer state management (unanswered / answered / marked for review), and " },
        { text: "incremental save system", emphasis: true },
        { text: " that persisted responses continuously so no work was lost on refresh, tab close, or network interruption" },
      ],
      [
        { text: "Implemented timer system with countdown, automatic submission on timeout, and " },
        { text: "state sync across browser refreshes", emphasis: true },
        { text: " — critical for timed assessments running 1–3 hours with real students" },
      ],
      [
        { text: "React + TypeScript frontend, " },
        { text: "NestJS backend APIs", emphasis: true },
        { text: " for question retrieval, response storage, and submission processing; PostgreSQL for persistence, Redis to cache active quiz state and reduce repeated DB reads during live sessions" },
      ],
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    label: "AI & Agents",
    skills: [
      { name: "LangGraph", context: "Multi-agent pipelines at AdsGency AI", primary: true },
      { name: "RAG Pipelines", context: "Portfolio AI chat with pgvector retrieval", primary: true },
      { name: "OpenAI", context: "Embeddings and generation at AdsGency", primary: true },
      { name: "Claude API", context: "Portfolio AI agent responses" },
      { name: "LangChain", context: "Agent tooling and LLM integration at AdsGency" },
      { name: "Langfuse", context: "LLM observability and tracing at AdsGency" },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    skills: [
      { name: "Python", context: "AdsGency ETL, FastAPI services, data pipelines", primary: true },
      { name: "FastAPI", context: "AdsGency AI platform APIs", primary: true },
      { name: "Node.js", context: "Portfolio API routes and server logic" },
      { name: "NestJS", context: "SpeEdLabs backend services" },
      { name: "REST APIs", context: "Shopify, Meta, Google, and LinkedIn integrations" },
      { name: "Flask", context: "AdsGency AI agents service layer" },
    ],
  },
  {
    id: "data",
    label: "Data & Storage",
    skills: [
      { name: "PostgreSQL", context: "AdsGency analytics and portfolio submissions", primary: true },
      { name: "SQL", context: "PostgreSQL, MySQL, and Supabase queries", primary: true },
      { name: "Supabase", context: "Portfolio chat logs and pgvector embeddings" },
      { name: "pgvector", context: "RAG embedding storage for portfolio chat" },
      { name: "Redis", context: "SpeEdLabs quiz state caching" },
      { name: "MySQL", context: "Discord finance bot database" },
      { name: "Databricks", context: "AdsGency data layer normalization" },
      { name: "Snowflake", context: "AdsGency data warehouse normalization" },
      { name: "BigQuery", context: "AdsGency analytics data source" },
      { name: "Redshift", context: "AdsGency ETL pipeline" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", context: "AdsGency dashboard, EduBridge platform, SpeEdLabs quiz UI", primary: true },
      { name: "TypeScript", context: "AdsGency and this portfolio", primary: true },
      { name: "Next.js", context: "This portfolio — App Router, API routes", primary: true },
      { name: "Tailwind", context: "This portfolio styling system" },
      { name: "React Query", context: "EduBridge data fetching and cache management" },
      { name: "Ant Design", context: "AdsGency frontend component system" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: [
      { name: "Swift", context: "CardMind iOS and Recipe App", primary: true },
      { name: "SwiftUI", context: "CardMind payment tracking and Recipe App UI", primary: true },
      { name: "SwiftData", context: "CardMind local persistence and widget data sharing" },
      { name: "WidgetKit", context: "CardMind home screen widgets with App Groups" },
      { name: "AVFoundation", context: "Recipe App voice-guided cooking instructions" },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    skills: [
      { name: "AWS", context: "EC2, S3, Lambda, RDS, and ECR at AdsGency", primary: true },
      { name: "Docker", context: "AdsGency containerized deployments", primary: true },
      { name: "GitHub Actions", context: "CI/CD pipelines across projects" },
      { name: "Vercel", context: "This portfolio hosting" },
    ],
  },
  {
    id: "integrations",
    label: "Integrations & Other",
    skills: [
      { name: "Shopify API", context: "AdsGency commerce integrations" },
      { name: "Discord API", context: "Finance bot commands and event handling" },
      { name: "Babel", context: "AdsGency backend translation extraction and i18n pipeline" },
      { name: "Java", context: "Finance tracker alerting system" },
      { name: "C / C++", context: "CCSF tutoring and coursework" },
    ],
  },
];

export const toolCategories: ToolCategory[] = [
  {
    id: "dev",
    label: "Dev Tools",
    tools: [
      { name: "Cursor", description: "Primary editor — AI-assisted coding and codebase navigation" },
      { name: "Claude", description: "Architecture reasoning, system design, and writing" },
      { name: "Claude Code", description: "Agentic coding directly from the CLI" },
      { name: "Greptile", description: "AI code review on pull requests" },
      { name: "GitHub Actions", description: "CI/CD pipelines — built and maintained them at AdsGency" },
      { name: "Docker", description: "Containerized deployments on AWS (EC2, ECR)" },
      { name: "AWS CLI", description: "EC2, S3, ECR deployments and production debugging" },
    ],
  },
  {
    id: "productivity",
    label: "Productivity",
    tools: [
      { name: "Notion", description: "Job search system of record — applications, contacts, outreach pipeline" },
      { name: "Google Calendar", description: "Scheduling and time management" },
    ],
  },
  {
    id: "design",
    label: "Design",
    tools: [
      { name: "Excalidraw", description: "Sketching architecture and system design before writing any code" },
      { name: "Antigravity", description: "Frontend UI iteration and component exploration" },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    tools: [
      { name: "Gmail", description: "Primary email" },
      { name: "Slack", description: "Team communication" },
      { name: "Zoom", description: "Meetings and interviews" },
    ],
  },
];

export const leadership: Leadership[] = [
  {
    title: "ISA President",
    organization: "Indian Student Association · SF State",
    period: "Jun 2023 – Jun 2025",
    description: [
      { text: "Led a " },
      { text: "10-person officer team", emphasis: true },
      { text: " and organized SF State's largest Diwali celebration with " },
      { text: "180+ attendees", emphasis: true },
      { text: ". Drove " },
      { text: "30% membership growth", emphasis: true },
      { text: " over two years by expanding programming, building community across international students, and keeping the organization running end-to-end as a full-time student." },
    ],
  },
  {
    title: "Peer Mentor",
    organization: "San Francisco State University",
    period: "Aug 2022 – May 2025",
    description: [
      { text: "Advised " },
      { text: "300+ first-year students", emphasis: true },
      { text: " on academic planning, class registration, and navigating university life — one-on-one and in group settings across three years." },
    ],
  },
  {
    title: "Orientation Leader",
    organization: "San Francisco State University",
    period: "Feb 2022 – Aug 2022",
    description: [
      { text: "Led groups of " },
      { text: "150+ students and parents per day", emphasis: true },
      { text: " through new student orientation — covering registration, academics, housing, and financial aid." },
    ],
  },
];

export const hero = {
  headlineMeta: "backends · AI pipelines · iOS apps",
  marqueeItems: [
    "Python",
    "TypeScript",
    "Next.js",
    "LangGraph",
    "FastAPI",
    "SwiftUI",
    "Supabase",
    "AWS",
    "Docker",
    "Multi-Agent Systems",
    "pgvector",
    "RAG",
  ],
  currentlyInto: [
    { title: "AI in production", tags: ["latency", "cost", "trust"] },
    { title: "Clean architecture", tags: ["predictable systems"] },
    { title: "Dark Japanese lit", tags: ["Yoko Ogawa"] },
    { title: "The God of Small Things", tags: ["Arundhati Roy"] },
    { title: "Mandala art", tags: ["how I reset"] },
  ] satisfies HeroListItem[],
  selectedWork: [
    { title: "AdsGency AI", tags: ["LangGraph", "Multi-Agent"] },
    { title: "Portfolio AI Agent", tags: ["RAG", "Claude Haiku"] },
    { title: "CardMind iOS", tags: ["SwiftUI", "shipped in a week"] },
    { title: "EduBridge", tags: ["Frontend Lead", "capstone"] },
    { title: "Discord Finance Bot", tags: ["Python", "MySQL"] },
  ] satisfies HeroListItem[],
};

export const siteCopy = {
  chat: {
    sectionLabel: "Ask me anything",
    headline: "TALK TO",
    headlineAccent: "MY AI",
    description:
      "An AI trained on my actual experience, projects, and personality. Ask it anything a recruiter or founder would ask me.",
    openingMessage:
      "Hey! I'm Pankuri's AI — ask me about her projects, stack, what she's looking for, or anything else. I'll answer as her.",
    aiLabel: "Pankuri's AI",
    placeholder: "Ask me something...",
    sendLabel: "→ Send",
    poweredBy: "powered by claude haiku + rag",
    statsLabel: "Live from Supabase",
    topicsLabel: "Most asked about",
    recentLabel: "Recent questions",
    noRecentQuestions: "No questions yet — be the first to ask.",
    suggestedPrompts: [
      "What's your stack?",
      "Why startups?",
      "Tell me about CardMind",
      "What are you reading?",
      "What do you want to build?",
    ],
  },
  projects: {
    sectionLabel: "What I've shipped",
    headline: "SELECTED",
    headlineAccent: "WORK",
    dragHint: "Drag to explore",
    cta: "View project →",
  },
  skills: {
    sectionLabel: "What I work with",
    headline: "SKILLS &",
    headlineAccent: "STACK",
    hoverHint: "Hover a skill to see where I've used it.",
  },
  tools: {
    sectionLabel: "What's in my setup",
    headline: "TOOLS I",
    headlineAccent: "USE",
  },
  github: {
    sectionLabel: "What I've been pushing",
    headline: "GITHUB",
    headlineAccent: "ACTIVITY",
    liveLabel: "Live from GitHub API",
    terminalTitle: "pankurik — github activity feed",
    command: "gh activity --user pankurik --limit 6",
    fetching: "fetching from api.github.com...",
    rateLimitError: "✗ rate limit hit — try again shortly",
    currentlyBuildingLabel: "# currently building",
    building: [
      { repo: "cardmind-ios", note: "submitting to App Store" },
      { repo: "pankurik-portfolio", note: "redesign in progress" },
    ],
  },
  about: {
    sectionLabel: "The human behind the code",
    headline: "ABOUT &",
    headlineAccent: "EXPERIENCE",
  },
  experience: {
    label: "Work experience",
    latestTag: "Latest",
  },
  leadership: {
    label: "Leadership",
  },
  contact: {
    label: "Get in touch",
    links: [
      { label: "LinkedIn →", key: "linkedin" as const },
      { label: "GitHub →", key: "github" as const },
      { label: "Resume →", key: "resume" as const },
    ],
  },
  footer: {
    builtWith: "Built with Next.js · Supabase · Claude",
    copyright: (name: string, year: string) => `© ${year} ${name}`,
  },
  nav: {
    links: [
      { label: "About", href: "about" },
      { label: "Projects", href: "projects" },
      { label: "Skills", href: "skills" },
      { label: "Tools", href: "tools" },
      { label: "Chat", href: "chat" },
      { label: "Contact", href: "contact" },
    ],
  },
};