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

export type SkillSize = "xl" | "lg" | "md" | "sm";
export type SkillFlyDirection = "left" | "right" | "top" | "bottom";

export type SkillItem = {
  name: string;
  size: SkillSize;
  green?: boolean;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  direction: SkillFlyDirection;
  tooltip: string;
  rotation: number;
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

export const skillItems: SkillItem[] = [
  {
    name: "Python",
    size: "xl",
    green: true,
    position: { top: "6%", left: "2%" },
    direction: "left",
    tooltip: "AdsGency · ETL pipelines",
    rotation: -1.4,
  },
  {
    name: "LangGraph",
    size: "xl",
    green: true,
    position: { top: "3%", left: "34%" },
    direction: "top",
    tooltip: "Multi-agent pipelines",
    rotation: 1.1,
  },
  {
    name: "AWS",
    size: "xl",
    green: true,
    position: { top: "8%", right: "4%" },
    direction: "right",
    tooltip: "EC2 · S3 · Lambda · RDS · ECR",
    rotation: -0.6,
  },
  {
    name: "React",
    size: "xl",
    green: true,
    position: { top: "22%", left: "18%" },
    direction: "left",
    tooltip: "AdsGency dashboard · EduBridge",
    rotation: 1.8,
  },
  {
    name: "TypeScript",
    size: "xl",
    green: true,
    position: { top: "18%", right: "22%" },
    direction: "right",
    tooltip: "AdsGency · This portfolio",
    rotation: -1.1,
  },
  {
    name: "Next.js",
    size: "xl",
    green: true,
    position: { top: "28%", left: "4%" },
    direction: "left",
    tooltip: "This portfolio",
    rotation: 0.5,
  },
  {
    name: "FastAPI",
    size: "lg",
    green: true,
    position: { top: "24%", left: "48%" },
    direction: "top",
    tooltip: "AdsGency AI APIs",
    rotation: -1.7,
  },
  {
    name: "PostgreSQL",
    size: "lg",
    position: { top: "34%", right: "6%" },
    direction: "right",
    tooltip: "AdsGency · portfolio",
    rotation: 1.3,
  },
  {
    name: "Swift",
    size: "lg",
    green: true,
    position: { top: "38%", left: "10%" },
    direction: "left",
    tooltip: "CardMind · Recipe App",
    rotation: -0.9,
  },
  {
    name: "SwiftUI",
    size: "lg",
    green: true,
    position: { top: "42%", left: "36%" },
    direction: "bottom",
    tooltip: "CardMind · Recipe App",
    rotation: 1.6,
  },
  {
    name: "REST APIs",
    size: "lg",
    position: { top: "46%", right: "28%" },
    direction: "right",
    tooltip: "Shopify · Meta · Google",
    rotation: -1.2,
  },
  {
    name: "Docker",
    size: "lg",
    position: { top: "52%", left: "22%" },
    direction: "bottom",
    tooltip: "AdsGency deployments",
    rotation: 0.8,
  },
  {
    name: "RAG Pipelines",
    size: "lg",
    green: true,
    position: { top: "50%", right: "3%" },
    direction: "right",
    tooltip: "This portfolio",
    rotation: -1.5,
  },
  {
    name: "SQL",
    size: "lg",
    position: { top: "58%", left: "5%" },
    direction: "left",
    tooltip: "PostgreSQL · MySQL · Supabase",
    rotation: 1.0,
  },
  {
    name: "OpenAI",
    size: "lg",
    position: { top: "56%", left: "52%" },
    direction: "bottom",
    tooltip: "Embeddings · AdsGency",
    rotation: -0.7,
  },
  {
    name: "Node.js",
    size: "md",
    position: { top: "62%", right: "18%" },
    direction: "right",
    tooltip: "Portfolio API routes",
    rotation: 1.4,
  },
  {
    name: "Tailwind",
    size: "md",
    position: { top: "68%", left: "28%" },
    direction: "bottom",
    tooltip: "This portfolio",
    rotation: -1.0,
  },
  {
    name: "Supabase",
    size: "md",
    position: { top: "64%", right: "38%" },
    direction: "bottom",
    tooltip: "This portfolio · pgvector",
    rotation: 0.6,
  },
  {
    name: "MySQL",
    size: "md",
    position: { top: "72%", left: "8%" },
    direction: "left",
    tooltip: "SpeEdLabs · Finance bot",
    rotation: -1.8,
  },
  {
    name: "GitHub Actions",
    size: "md",
    position: { top: "70%", left: "44%" },
    direction: "bottom",
    tooltip: "CI/CD pipelines",
    rotation: 1.2,
  },
  {
    name: "Claude API",
    size: "md",
    position: { top: "74%", right: "8%" },
    direction: "right",
    tooltip: "This portfolio AI agent",
    rotation: -0.4,
  },
  {
    name: "Databricks",
    size: "md",
    position: { top: "78%", left: "62%" },
    direction: "bottom",
    tooltip: "AdsGency data layer",
    rotation: 1.7,
  },
  {
    name: "Shopify API",
    size: "md",
    position: { top: "12%", right: "30%" },
    direction: "top",
    tooltip: "AdsGency integrations",
    rotation: -1.3,
  },
  {
    name: "Java",
    size: "md",
    position: { top: "32%", right: "42%" },
    direction: "top",
    tooltip: "Finance tracker alerting",
    rotation: 0.9,
  },
  {
    name: "Material UI",
    size: "sm",
    position: { top: "82%", left: "18%" },
    direction: "bottom",
    tooltip: "EduBridge platform",
    rotation: -1.6,
  },
  {
    name: "NestJS",
    size: "sm",
    position: { top: "84%", left: "38%" },
    direction: "bottom",
    tooltip: "SpeEdLabs backend",
    rotation: 1.5,
  },
  {
    name: "Redis",
    size: "sm",
    position: { top: "80%", right: "24%" },
    direction: "right",
    tooltip: "SpeEdLabs quiz state",
    rotation: -0.5,
  },
  {
    name: "Vercel",
    size: "sm",
    position: { top: "86%", right: "12%" },
    direction: "bottom",
    tooltip: "This portfolio",
    rotation: 1.1,
  },
  {
    name: "pgvector",
    size: "sm",
    position: { top: "88%", left: "52%" },
    direction: "bottom",
    tooltip: "RAG embeddings",
    rotation: -1.9,
  },
  {
    name: "Snowflake",
    size: "sm",
    position: { top: "16%", left: "58%" },
    direction: "top",
    tooltip: "AdsGency data layer",
    rotation: 0.3,
  },
  {
    name: "C / C++",
    size: "sm",
    position: { top: "76%", left: "72%" },
    direction: "right",
    tooltip: "CCSF tutoring · coursework",
    rotation: -1.1,
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
    hoverHint: "Hover any skill to see where I've used it.",
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
      { label: "About", href: "about" },
      { label: "Chat", href: "chat" },
      { label: "Contact", href: "contact" },
    ],
  },
};
