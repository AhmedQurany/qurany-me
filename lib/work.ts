// Visual configuration for the Selected Work cards.
// Strings (client name, title, tag) live in messages/{locale}.json;
// these are the visual mappings that go alongside.

import type { ArchetypeId } from "./archetypes";

export interface WorkVisual {
  archetypes: [ArchetypeId, ArchetypeId];
  gradient: string;
}

export const WORK_VISUALS: WorkVisual[] = [
  // Eventafy → Navigator + Builder
  {
    archetypes: ["navigator", "builder"],
    gradient: "linear-gradient(135deg, #00C896 0%, #7B5EFF 100%)",
  },
  // UDL → Magician + Navigator
  {
    archetypes: ["magician", "navigator"],
    gradient: "linear-gradient(135deg, #FF6B9D 0%, #00C896 100%)",
  },
  // Sajilni → Magician + Strategist
  {
    archetypes: ["magician", "strategist"],
    gradient: "linear-gradient(135deg, #FF6B9D 0%, #FF3D33 100%)",
  },
];

// Subtle SVG noise overlay, encoded as a data URI for the gradient grain.
export const NOISE_DATA_URI =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";
