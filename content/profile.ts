// Single source of truth for everything the site says about Ahmed.
// Copy follows the "Qurany Branding" positioning: client-first, systems
// thinking, no "all / everything / ultimate". Edit here, not in components.

export const contact = {
  // Primary CTA target. Swap for a WhatsApp / booking link once decided.
  cta: "mailto:hello@qurany.me?subject=Project%20enquiry",
  email: "hello@qurany.me",
  location: "Cairo, Egypt",
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmedqurany" },
  { label: "Behance", href: "https://www.behance.net/Qurany" },
  { label: "Dribbble", href: "https://dribbble.com/Qurany" },
  { label: "UDL", href: "https://udl.qurany.me" },
];

export const hero = {
  eyebrow: "Creative Experience Architect — Cairo",
  headline: "One designer who sees the whole system —",
  headlineAccent: "strategy, interface, and build.",
  body: "So you're not stitching together three freelancers and hoping the pieces fit.",
  now: "Now leading digital experience at IT‑RANKS. Building UDL and WorkWiz on the side.",
};

export const stats = [
  { value: "11+", label: "Years at the seam of strategy, design and code" },
  { value: "500+", label: "Projects shipped across brand, product and web" },
  { value: "3", label: "Products founded and built" },
];

export const problem = {
  headline: "You don't need more designers. You need fewer moving parts.",
  body: [
    "Most projects break in the gaps — the brand says one thing, the interface says another, and the developer builds a third. Every handoff is a place for the vision to leak.",
    "I close those gaps by owning the whole line: strategy, design, and build stay one decision.",
  ],
};

export const process = {
  headline: "One connected process, one person accountable.",
  steps: [
    {
      name: "Frame",
      title: "Brand strategy",
      body: "The logic and positioning everything else rests on. Decided once, so it doesn't get re-argued at every screen.",
    },
    {
      name: "Connect",
      title: "Interface & product design",
      body: "Decisions carry straight from strategy into the screen — through tokens, components and flows, not a PDF nobody opens.",
    },
    {
      name: "Ship",
      title: "Working build",
      body: "Designed to actually ship, not just look good in a mockup. Front-end I can build myself, or hand to engineers who can build on it directly.",
    },
  ],
};

export const edge = {
  headline: "Why one person, not three.",
  body: "11+ years working the seam between strategy, design, and code — the space most people avoid because it needs all three at once. That's where I work best, and it's why the pieces come out connected instead of stitched.",
  kicker: "You're paying for the size of the problem I take off your plate.",
  problems: [
    "Brand says one thing",
    "Interface says another",
    "Developer builds a third",
    "Intent lost in handoff",
    "Buttons rebuilt every sprint",
    "Deck doesn't match the product",
    "No design system",
    "Site never shipped",
  ],
};

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

export interface Project {
  client: string;
  problem: string;
  answer: string;
  tags: string[];
}

// Written as problems solved, not tasks done.
export const projects: Project[] = [
  {
    client: "IT-RANKS",
    problem: "An enterprise ERP and cloud suite where every product spoke a slightly different visual language.",
    answer: "One design system underneath all of it: a 20-file DMP HTML suite, a shared icon library, and tokens engineering builds on directly.",
    tags: ["Design system", "Product", "Front-end"],
  },
  {
    client: "Sajilni",
    problem: "An event-ticketing platform whose business goals had to become shipped product — without losing the founders along the way.",
    answer: "Two years leading the product design team end to end, and carrying every design decision back to founders and stakeholders.",
    tags: ["Product leadership", "UX/UI"],
  },
  {
    client: "Solean",
    problem: "A wellness brand that needed one coherent identity across every touchpoint.",
    answer: "A brand system — positioning, identity, and the rules for applying it — so every touchpoint reads as the same company.",
    tags: ["Brand identity"],
  },
  {
    client: "Galaxy Racer",
    problem: "A fast-moving esports and entertainment brand that needed a consistent creative direction.",
    answer: "Art direction across campaigns and brand output, so volume didn't dilute the identity.",
    tags: ["Art direction", "Brand"],
  },
];

export const ventures = [
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

export const udl = {
  headline: "Not just how I work — how I think.",
  body: [
    "The systems thinking behind my work isn't a trick. It's a discipline I've spent years refining — enough that I built UDL, a community where designers learn to think in systems and stay ahead of AI instead of being replaced by it.",
    "When you work with me, you're not getting someone who just does the work. You're getting someone who has studied why it works deeply enough to teach it.",
  ],
  facts: [
    { value: "25", label: "Learning spaces" },
    { value: "800+", label: "Curated resources" },
  ],
  href: "https://udl.qurany.me",
};

export const clients = [
  "IT-RANKS",
  "Sajilni",
  "appetito",
  "Galaxy Racer",
  "Solean",
  "GOSHEN",
  "Digital Mind",
  "Eventafy",
];

export const finalCta = {
  headline: "Have a project that keeps slipping through the cracks?",
  accent: "Let's make it one system.",
};
