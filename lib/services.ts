import type { ArchetypeId } from "./archetypes";

export interface Service {
  id: ArchetypeId;
  index: string;
  discipline: string;
  archetype: string;
  headline: string;
  body: string;
  deliverables: string[];
  // Demo image (portrait, ~3:4) shown as the centerpiece in Section 2.
  // Replace with real work artifacts when ready.
  image: string;
  // Short label rendered on the left column of Section 2.
  title: string;
}

// Service data — drafted in Ahmed's voice. Demo copy; can be replaced.
export const SERVICES: Service[] = [
  {
    id: "magician",
    index: "01",
    discipline: "Branding",
    archetype: "The Magician",
    title: "Branding",
    headline: "Brands that feel inevitable.",
    body: "Positioning narrative, identity system, and the voice that ties them together. Built so the brand stops feeling like a logo and starts feeling like a stance.",
    deliverables: [
      "Brand strategy + positioning",
      "Identity system: logo, type, color",
      "Voice + tone guidelines",
      "Delivered as code, Figma, and a brand book that's actually used",
    ],
    image: "https://picsum.photos/seed/qurany-magician/720/1080",
  },
  {
    id: "architect",
    index: "02",
    discipline: "Systems",
    archetype: "The Architect",
    title: "Systems",
    headline: "Systems that survive scale.",
    body: "Design tokens, component libraries, and the governance to keep them honest a year from now. Built so teams stop reinventing buttons every sprint.",
    deliverables: [
      "Design tokens + theme architecture",
      "Component library (Figma + code)",
      "Documentation + contribution model",
      "Audit + roadmap for legacy debt",
    ],
    image: "https://picsum.photos/seed/qurany-architect/720/1080",
  },
  {
    id: "navigator",
    index: "03",
    discipline: "Product / UX",
    archetype: "The Navigator",
    title: "Product",
    headline: "Paths users actually walk.",
    body: "User flows, journey maps, and the screens that hold them up. End-to-end product thinking, not just pretty mockups handed over to engineering.",
    deliverables: [
      "Discovery + journey mapping",
      "Information architecture + flows",
      "High-fidelity screens + prototypes",
      "Specs ready for engineering handoff",
    ],
    image: "https://picsum.photos/seed/qurany-navigator/720/1080",
  },
  {
    id: "strategist",
    index: "04",
    discipline: "Strategy",
    archetype: "The Strategist",
    title: "Strategy",
    headline: "The plan before the pixels.",
    body: "Audit, reframe, and the strategic plan that explains every design decision after it. The grown-up part of the engagement.",
    deliverables: [
      "Competitive + market audit",
      "Positioning + opportunity reframe",
      "Roadmap with trade-offs visible",
      "Board-ready strategy deck",
    ],
    image: "https://picsum.photos/seed/qurany-strategist/720/1080",
  },
  {
    id: "storyteller",
    index: "05",
    discipline: "Presentation",
    archetype: "The Storyteller",
    title: "Decks",
    headline: "Decks that move rooms.",
    body: "Pitch decks, investor materials, and the narrative spine they hang off. Built to win the room, not fill it.",
    deliverables: [
      "Narrative + story arc",
      "Pitch / investor / board deck",
      "Custom slide system in Figma",
      "Speaker notes + delivery coaching",
    ],
    image: "https://picsum.photos/seed/qurany-storyteller/720/1080",
  },
  {
    id: "builder",
    index: "06",
    discipline: "WordPress / Dev",
    archetype: "The Builder",
    title: "Dev",
    headline: "Strategy that ships.",
    body: "From idea to live site without handoff loss. Next.js for the ambitious work, WordPress / Webflow for the rest. I close the loop.",
    deliverables: [
      "Site architecture + tech selection",
      "Build in Next.js / WordPress / Webflow",
      "CMS configuration + content model",
      "Deploy, measure, iterate",
    ],
    image: "https://picsum.photos/seed/qurany-builder/720/1080",
  },
];
