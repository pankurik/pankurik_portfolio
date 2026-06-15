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

export const about: About = {
  name: "Pankuri Khare",
  title: "Full-stack engineer",
  location: "San Francisco",
  shortBio:
    "Full-stack engineer based in SF. I build backends, AI pipelines, and iOS apps — and I care about systems that hold up under failure.",
  bio: "I studied Computer Science and Comparative World Literature at San Francisco State University — an unusual mix, but it shaped how I think: part logical, part creative. I like understanding whole systems, not just my piece of them. That curiosity shows up in how I debug, how I architect, and how I communicate. Outside of code I'm reading, exploring ideas across disciplines, and occasionally convincing myself a side project is a good idea. I'm most energized by early-stage teams building things that matter — where engineers are close to the problem and ownership is real.",
  bioStrip: [
    { text: "I studied CS and Comparative World Literature at SF State — an unusual mix, but it shaped how I think: " },
    { text: "part logical, part creative", emphasis: true },
    { text: ". I like understanding " },
    { text: "whole systems", emphasis: true },
    { text: ", not just my piece of them. That shows up in how I debug, how I architect, and how I communicate. I'm most energized by " },
    { text: "early-stage teams", emphasis: true },
    { text: " building things that matter — where engineers are close to the problem and " },
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
      { text: "AI-driven marketing automation platform with " },
      { text: "LangGraph multi-agent pipelines", emphasis: true },
      { text: ", ETL across 8 sources, and a " },
      { text: "real-time analytics dashboard", emphasis: true },
      { text: " — i18n in 7 languages on AWS/Docker/CI-CD." },
    ],
    tags: [
      "LangGraph",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "AWS",
      "Docker",
      "CI/CD",
    ],
    link: "https://github.com/pankurik",
    whatIBuilt:
      "LangGraph multi-agent pipelines for campaign workflows, ETL across 8 ad and commerce sources, a campaign recommendation engine, real-time analytics dashboard, and i18n support for 7 languages — deployed on AWS with Docker and CI/CD.",
  },
  {
    title: "CardMind iOS",
    type: "Personal",
    tagPills: ["Personal", "iOS"],
    role: "Solo Developer",
    period: "Shipped in one week",
    description: [
      { text: "Solo iOS app for " },
      { text: "credit card payment tracking", emphasis: true },
      { text: " with SwiftUI, SwiftData, WidgetKit, and " },
      { text: "escalating smart notifications", emphasis: true },
      { text: "." },
    ],
    tags: ["SwiftUI", "SwiftData", "WidgetKit", "Swift Charts"],
    link: "https://github.com/pankurik",
    whatIBuilt:
      "End-to-end iOS app with SwiftUI and SwiftData for payment tracking, home screen widgets via WidgetKit, spending visualizations with Swift Charts, and escalating smart notifications so due dates never slip.",
  },
  {
    title: "Recipe App",
    type: "Personal",
    tagPills: ["Personal", "iOS"],
    role: "Solo Developer",
    period: "SwiftUI · AVFoundation",
    description: [
      { text: "SwiftUI cooking app with " },
      { text: "cooking mode", emphasis: true },
      { text: ", step-by-step timers, and " },
      { text: "text-to-speech", emphasis: true },
      { text: " for hands-free use mid-recipe." },
    ],
    tags: ["Swift", "SwiftUI", "AVFoundation"],
    link: "https://github.com/pankurik",
    whatIBuilt:
      "Cooking mode with step-by-step navigation, per-step timers, and text-to-speech via AVFoundation so instructions can be followed without constantly touching the phone.",
  },
  {
    title: "Discord Finance Bot",
    type: "Personal",
    tagPills: ["Personal", "Side Project"],
    role: "Solo Developer",
    period: "Python · MySQL",
    description: [
      { text: "Chat-first " },
      { text: "budget tracking", emphasis: true },
      { text: " bot for Discord — log expenses, view summaries, and set budgets via " },
      { text: "Discord API", emphasis: true },
      { text: " commands." },
    ],
    tags: ["Python", "MySQL", "Discord API"],
    link: "https://github.com/pankurik",
    whatIBuilt:
      "Python-based Discord bot with MySQL-backed budget tracking, category-based expense logging, spending summaries, and simple budget enforcement through chat commands.",
  },
  {
    title: "EduBridge",
    type: "Team",
    tagPills: ["Team", "Ed-tech"],
    role: "Frontend Developer",
    period: "Team Project",
    description: [
      { text: "Team-built mentor discovery platform with " },
      { text: "role-based access", emphasis: true },
      { text: ", React frontend, and flows for connecting students with " },
      { text: "mentors", emphasis: true },
      { text: "." },
    ],
    tags: ["React", "REST APIs", "Role-Based Access"],
    link: "https://github.com/pankurik",
    whatIBuilt:
      "React frontend with role-based access control, mentor discovery and matching flows, and collaborative team delivery across frontend and API integration.",
  },
];

export const experience: Experience[] = [
  {
    company: "AdsGency AI",
    role: "Software Engineer",
    period: "Aug 2025 – Jan 2026",
    location: "San Francisco",
    employmentType: "Full-time",
    latest: true,
    bullets: [
      [
        { text: "Built " },
        { text: "LangGraph multi-agent pipelines", emphasis: true },
        { text: " for budget forecasting, SEO analysis, and content generation — integrated with OpenAI, LangChain, and PGVector" },
      ],
      [
        { text: "Unified data layer across " },
        { text: "8 enterprise sources", emphasis: true },
        { text: " — Databricks, Snowflake, Redshift, BigQuery, PostgreSQL, Shopify, Salesforce, Monday CRM" },
      ],
      [
        { text: "Wired " },
        { text: "DataValidationAgent", emphasis: true },
        { text: " into every ETL job — schema validation, anomaly detection, retry logic — improving pipeline efficiency by " },
        { text: "60%", emphasis: true },
      ],
      [
        { text: "Built " },
        { text: "real-time analytics dashboard", emphasis: true },
        { text: " pulling live from Facebook, Google, TikTok, and LinkedIn into one view" },
      ],
      [
        { text: "Led " },
        { text: "i18n", emphasis: true },
        { text: " across frontend and backend supporting 7 languages — Korea, Japan, Europe, India" },
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
        { text: "Taught C, C++, and data structures to 5 students — " },
        { text: "pointers, memory management, linked lists, trees, sorting algorithms", emphasis: true },
      ],
      [
        { text: "Tracked individual progress and adjusted explanations to match each student's " },
        { text: "learning pace", emphasis: true },
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
        { text: "Built quiz infrastructure end-to-end — " },
        { text: "incremental saves", emphasis: true },
        { text: " that persisted responses continuously so no work was lost on refresh or disconnection" },
      ],
      [
        { text: "React + TypeScript frontend, " },
        { text: "NestJS backend APIs", emphasis: true },
        { text: ", PostgreSQL + Redis for persistence and active quiz state" },
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
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    skills: [
      { name: "Python", context: "AdsGency ETL, FastAPI services, data pipelines", primary: true },
      { name: "FastAPI", context: "AdsGency AI platform APIs", primary: true },
      { name: "Node.js", context: "Portfolio API routes and server logic" },
      { name: "REST APIs", context: "Shopify, Meta, and Google integrations" },
      { name: "NestJS", context: "SpeEdLabs backend services" },
    ],
  },
  {
    id: "data",
    label: "Data & Storage",
    skills: [
      { name: "PostgreSQL", context: "AdsGency analytics and portfolio submissions", primary: true },
      { name: "SQL", context: "PostgreSQL, MySQL, and Supabase queries", primary: true },
      { name: "Supabase", context: "Portfolio chat logs and pgvector embeddings" },
      { name: "MySQL", context: "SpeEdLabs and finance tracker alerting" },
      { name: "pgvector", context: "RAG embedding storage for portfolio chat" },
      { name: "Databricks", context: "AdsGency data layer" },
      { name: "Snowflake", context: "AdsGency data warehouse" },
      { name: "Redis", context: "SpeEdLabs quiz state caching" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", context: "AdsGency dashboard and EduBridge platform", primary: true },
      { name: "TypeScript", context: "AdsGency and this portfolio", primary: true },
      { name: "Next.js", context: "This portfolio — App Router, API routes", primary: true },
      { name: "Tailwind", context: "This portfolio styling system" },
      { name: "Material UI", context: "EduBridge platform UI" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: [
      { name: "Swift", context: "CardMind iOS and Recipe App", primary: true },
      { name: "SwiftUI", context: "CardMind payment tracking and Recipe App UI", primary: true },
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
      { name: "Java", context: "Finance tracker alerting system" },
      { name: "C / C++", context: "CCSF tutoring and coursework" },
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
      { text: ", SF State's largest Diwali celebration with " },
      { text: "180+ attendees", emphasis: true },
      { text: ", and drove " },
      { text: "30% membership growth", emphasis: true },
      { text: "." },
    ],
  },
  {
    title: "Peer Mentor",
    organization: "San Francisco State University",
    period: "Aug 2022 – May 2025",
    description: [
      { text: "Advised " },
      { text: "300+ first-year students", emphasis: true },
      { text: " on academic planning, class registration, and navigating university life." },
    ],
  },
  {
    title: "Orientation Leader",
    organization: "San Francisco State University",
    period: "Feb 2022 – Aug 2022",
    description: [
      { text: "Led groups of " },
      { text: "150+ students and parents per day", emphasis: true },
      { text: " through orientation — registration, academics, housing, financial aid." },
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
  ],
  currentlyInto: [
    { title: "AI in production", tags: ["latency", "cost", "trust"] },
    { title: "Clean architecture", tags: ["predictable systems"] },
    { title: "Ed-tech for educators", tags: ["someday"] },
    { title: "Dark Japanese lit", tags: ["Yoko Ogawa"] },
    { title: "Craft beer", tags: ["lowkey bars only"] },
  ] satisfies HeroListItem[],
  selectedWork: [
    { title: "AdsGency AI", tags: ["LangGraph", "Multi-Agent"] },
    { title: "CardMind iOS", tags: ["SwiftUI", "shipped in a week"] },
    { title: "Recipe App", tags: ["iOS", "AVFoundation"] },
    { title: "Discord Finance Bot", tags: ["Python", "MySQL"] },
    { title: "This portfolio", tags: ["RAG", "Claude"] },
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
      { label: "Projects", href: "projects" },
      { label: "Skills", href: "skills" },
      { label: "GitHub", href: "github" },
      { label: "Chat", href: "chat" },
      { label: "About", href: "about" },
      { label: "Contact", href: "contact" },
    ],
  },
};
