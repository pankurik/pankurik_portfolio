export type ProjectDescriptionPart = {
  text: string;
  emphasis?: boolean;
};

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
  bullets: string[];
};

export type Leadership = {
  title: string;
  organization: string;
  period: string;
  description: string;
};

export type About = {
  name: string;
  title: string;
  location: string;
  bio: string;
  shortBio: string;
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
  email: "pankuri@email.com",
  github: "https://github.com/pankurik",
  linkedin: "#",
  resume: "#",
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
    location: "San Francisco, CA",
    bullets: [
      "Built LangGraph multi-agent pipelines and ETL systems unifying data from 8 advertising and commerce sources.",
      "Shipped a campaign recommendation engine and real-time analytics dashboard with i18n across 7 languages.",
      "Owned AWS deployments, Docker containerization, and CI/CD pipelines for production reliability.",
    ],
  },
  {
    company: "City College of San Francisco",
    role: "CS Tutor",
    period: "Aug 2024 – May 2025",
    location: "San Francisco, CA",
    bullets: [
      "Tutored students in data structures, algorithms, and introductory programming courses.",
      "Helped learners debug code and develop problem-solving approaches for technical interviews.",
      "Adapted explanations to different learning styles across a diverse student body.",
    ],
  },
  {
    company: "SpeEdLabs",
    role: "Web Developer",
    period: "Apr 2021 – Mar 2023",
    location: "Remote",
    bullets: [
      "Built and maintained web applications for an ed-tech platform serving learners and educators.",
      "Collaborated on frontend features, API integrations, and responsive UI improvements.",
      "Contributed to deployment workflows and cross-browser compatibility fixes.",
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
    title: "President",
    organization: "Indian Student Association, SF State",
    period: "2025 – Present",
    description:
      "Lead campus programming, community events, and advocacy for international students at San Francisco State University.",
  },
  {
    title: "Peer Mentor",
    organization: "San Francisco State University",
    period: "2024 – 2025",
    description:
      "Mentored incoming students on academic planning, campus resources, and adjusting to university life in the US.",
  },
  {
    title: "Orientation Leader",
    organization: "San Francisco State University",
    period: "2024",
    description:
      "Guided new student cohorts through orientation week, campus tours, and onboarding programming.",
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
    title: "About Me",
    badges: ["1-2 yrs exp", "SF Based"],
  },
  experience: {
    title: "Experience",
  },
  leadership: {
    title: "Leadership",
  },
  contact: {
    title: "Let's Work Together",
    subtitle:
      "I'm actively looking for the right full-time role. If you're building something interesting, I'd love to hear about it.",
    cta: "Get in Touch →",
  },
  footer: {
    builtBy: (name: string) =>
      `Built by ${name} · Powered by Claude API + pgvector · ${about.year}`,
    stack:
      "Next.js, Supabase, pgvector, OpenAI embeddings, Claude Haiku, Vercel",
  },
  nav: {
    links: [
      { label: "Projects", href: "projects" },
      { label: "Skills", href: "skills" },
      { label: "About", href: "about" },
      { label: "Contact", href: "contact" },
    ],
  },
};
