// Single source of truth for everything the site says. Copy follows the
// "Qurany Glass website" Figma file; experience comes from the LinkedIn rewrite.

export const contact = {
  // Primary CTA target. Swap for a WhatsApp / booking link once decided.
  cta: "mailto:hello@qurany.me?subject=Project%20enquiry",
  email: "hello@qurany.me",
  location: "Cairo, Egypt",
  timeZone: "Africa/Cairo",
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmedqurany" },
  { label: "Behance", href: "https://www.behance.net/Qurany" },
  { label: "Dribbble", href: "https://dribbble.com/Qurany" },
  { label: "UDL", href: "https://udl.qurany.me" },
];

export const menu = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#experience", label: "Experience" },
  { href: "/cv", label: "CV" },
  { href: "https://udl.qurany.me", label: "UDL" },
];

export const hero = {
  headline: "One designer who sees the whole system: strategy, interface, and build.",
  body: "So you're not stitching together three freelancers and hoping the pieces fit.",
};

export const problem = {
  label: "The problem",
  headline: "You don't need more designers. You need fewer moving parts.",
  body: "Most projects break in the gaps — the brand says one thing, the interface says another, and the developer builds a third. Every handoff is a place for the vision to leak.",
  close: "I close those gaps by owning the whole line: strategy, design, and build stay one decision.",
};

export const process = {
  label: "The process",
  headline: "One connected process, one person accountable.",
  steps: [
    {
      name: "Frame",
      body: "Define the real problem, the audience, and what success looks like before any pixels.",
      video: "/videos/liquid-1.mp4",
    },
    {
      name: "Connect",
      body: "Tie strategy, design, and build into one system where every part agrees with the next.",
      video: "/videos/liquid-2.mp4",
    },
    {
      name: "Ship",
      body: "Deliver work that's built to run. Not a mockup, but something ready to go live.",
      video: "/videos/liquid-3.mp4",
    },
  ],
};

export const edge = {
  label: "The edge",
  headline: "Why one person, not three.",
  body: "11+ years working the seam between strategy, design, and code, the space most people avoid because it needs all three at once. That's exactly where I work best, and it's why the pieces come out connected instead of stitched.",
  kicker: ["You're not paying for hours. You're paying for the ", "size of the problem", " I take off your plate."],
  problems: [
    "Brand says one thing",
    "Interface says another",
    "Dev builds a third",
    "Lost in handoff",
    "No design system",
    "Deck ≠ product",
    "Buttons rebuilt",
    "Never shipped",
    "Three freelancers",
  ],
};

export interface Project {
  name: string;
  summary: string;
  image: string;
  hover: string;
}

export const work = {
  label: "Selected work",
  headline: "Problems, solved.",
  projects: [
    { name: "LEARN", summary: "Event website · Riyadh", image: "/images/work/learn.jpg", hover: "/images/work/learn-hover.jpg" },
    { name: "LSI", summary: "Security integrator website", image: "/images/work/lsi.jpg", hover: "/images/work/lsi-hover.jpg" },
    { name: "Moveris", summary: "Biometrics ad-tech platform", image: "/images/work/moveris.jpg", hover: "/images/work/moveris-hover.jpg" },
    { name: "Optimal", summary: "Health lab storefront", image: "/images/work/optimal.jpg", hover: "/images/work/optimal-hover.jpg" },
    { name: "PacTrack", summary: "Logistics platform", image: "/images/work/pactrack.jpg", hover: "/images/work/pactrack-hover.jpg" },
  ] satisfies Project[],
};

export const udl = {
  label: "Beyond the work",
  headline: "Not just how I work. How I think.",
  body: [
    "The systems thinking behind my work isn't a trick — it's a discipline I've spent years refining. So much that I built UDL, a community where designers learn to think in systems and stay ahead of AI, instead of being replaced by it.",
    "When you work with me, you're not getting someone who just does the work. You're getting someone who's studied why it works deeply enough to teach it.",
  ],
  cta: "Learn about UDL",
  href: "https://udl.qurany.me",
};

// Logo files go in public/logos/<slug>.png (or .svg). Until a file exists the
// client's name is shown as text.
export const clients = [
  { slug: "add", name: "add" },
  { slug: "sabic", name: "SABIC" },
  { slug: "binzagr", name: "Binzagr" },
  { slug: "gaca", name: "GACA" },
  { slug: "neom", name: "NEOM" },
  { slug: "matarat", name: "Matarat" },
  { slug: "visit-saudi", name: "Visit Saudi" },
  { slug: "sajilni", name: "Sajilni" },
  { slug: "galaxy-racer", name: "Galaxy Racer" },
  { slug: "white-stone", name: "White Stone" },
  { slug: "kaust", name: "KAUST" },
  { slug: "it-ranks", name: "IT-RANKS" },
  { slug: "bexel", name: "Bexel" },
];

export interface Role {
  company: string;
  role: string;
  start: string;
  end: string;
  context: string;
  points: string[];
  engagements?: string[];
}

export const experience: Role[] = [
  {
    company: "IT-RANKS",
    role: "Creative Experience Architect",
    start: "May 2025",
    end: "Present",
    context: "Enterprise ERP & cloud products",
    points: [
      "Built a 20-file Data Management Platform (DMP) HTML suite and a reusable icon library, standardising UI across enterprise ERP and cloud products.",
      "Own brand, product, and design-system direction across the company's digital platforms.",
      "Partner with engineering to ship design tokens and components front-end teams build on directly.",
    ],
  },
  {
    company: "Sajilni",
    role: "Product Design Lead",
    start: "May 2023",
    end: "May 2025",
    context: "Event ticketing platform",
    points: [
      "Led the product design team end to end.",
      "Translated business goals into shipped UI, and carried design decisions to founders and stakeholders.",
    ],
  },
  {
    company: "appetito",
    role: "Senior Product Designer",
    start: "Sep 2022",
    end: "Jun 2023",
    context: "Food delivery",
    points: [
      "Redesigned core flows for the food-delivery platform.",
      "Worked alongside engineers to ship UI that was buildable as designed.",
    ],
  },
  {
    company: "Digital Mind",
    role: "Art Director",
    start: "Jan 2021",
    end: "Dec 2022",
    context: "Agency",
    points: [
      "Developed branding strategies and campaigns for a diverse client roster.",
      "Mentored junior designers.",
    ],
  },
  {
    company: "Qurany Studio",
    role: "Founder & Design Lead",
    start: "Jan 2015",
    end: "Present",
    context: "Independent brand, product & front-end studio (formerly Digiclovers)",
    points: [
      "500+ projects across branding, UX/UI, WordPress, and design systems.",
      "Selected engagements as brand and art director:",
    ],
    engagements: ["Galaxy Racer", "ãN Design", "add", "Three60 Degree", "Pencil Designs"],
  },
];

export const ventures = [
  {
    name: "Ultimate Designers Lab (UDL)",
    role: "Founder",
    body: "A community for designers who refuse to be replaced by AI. Built the full platform — 25 spaces, 800+ curated resources — the sales motion, and the content engine.",
  },
  {
    name: "WorkWiz",
    role: "Founder / Builder",
    body: "Agency and client-management SaaS — CRM, projects, proposals, and billing. Built full-stack, with Stripe billing and a multi-tenant architecture.",
  },
  {
    name: "Eventafy",
    role: "Co-founder",
    body: "Event-management platform, built with a technical co-founder.",
  },
];

export const education = {
  school: "New Cairo Academy",
  degree: "Graphic Design — Faculty of Applied Arts",
};

export const skills = [
  "Design Systems",
  "Design Tokens",
  "Product Design (UX/UI)",
  "Brand Strategy",
  "Art Direction",
  "Front-end (HTML / CSS / JS)",
  "WordPress / Elementor",
  "Figma",
  "Typography",
  "Design Leadership",
  "AI-assisted design workflows",
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Professional working" },
];

export const finalCta = {
  headline: "Have a project that keeps slipping through the cracks?",
  accent: "Let's make it one system.",
};
