export type ArchetypeId =
  | "magician"
  | "architect"
  | "navigator"
  | "strategist"
  | "storyteller"
  | "builder";

export interface Archetype {
  id: ArchetypeId;
  number: string;
  glyph: string;
  discipline: string;
  roleWord: string;
  color: string;
  colorRgb: string;
  image: string;
  card: string;
  subtitle: string;
}

export const ARCHETYPES: Archetype[] = [
  {
    id: "magician",
    number: "01",
    glyph: "M",
    discipline: "Branding",
    roleWord: "Brands that feel inevitable.",
    color: "#FF6B9D",
    colorRgb: "255 107 157",
    image: "/images/archetype-magician.png",
    card: "/images/cards/card-magician.png",
    subtitle:
      "I shape perception. Brands become unforgettable not because they look right — but because they feel inevitable.",
  },
  {
    id: "architect",
    number: "02",
    glyph: "A",
    discipline: "Systems",
    roleWord: "Systems that survive scale.",
    color: "#00F0FF",
    colorRgb: "0 240 255",
    image: "/images/archetype-architect.png",
    card: "/images/cards/card-architect.png",
    subtitle:
      "I build design systems that survive growth — not pretty token libraries, but living infrastructure teams actually use.",
  },
  {
    id: "navigator",
    number: "03",
    glyph: "N",
    discipline: "Product / UX",
    roleWord: "Paths users actually walk.",
    color: "#00C896",
    colorRgb: "0 200 150",
    image: "/images/archetype-navigator.png",
    card: "/images/cards/card-navigator.png",
    subtitle:
      "I chart the path users walk before they know they're walking. Flows, screens, decisions — designed end to end.",
  },
  {
    id: "strategist",
    number: "04",
    glyph: "S",
    discipline: "Strategy",
    roleWord: "The plan before the pixels.",
    color: "#FF3D33",
    colorRgb: "255 61 51",
    image: "/images/archetype-strategist.png",
    card: "/images/cards/card-strategist.png",
    subtitle:
      "Before the pixels, the plan. I read the board, find the gap, and design the game you're actually playing.",
  },
  {
    id: "storyteller",
    number: "05",
    glyph: "T",
    discipline: "Presentation",
    roleWord: "Decks that move rooms.",
    color: "#FFB800",
    colorRgb: "255 184 0",
    image: "/images/archetype-storyteller.png",
    card: "/images/cards/card-storyteller.png",
    subtitle:
      "Decks that move rooms, not just slides that fill them. I turn data into arguments people can't ignore.",
  },
  {
    id: "builder",
    number: "06",
    glyph: "B",
    discipline: "WordPress / Dev",
    roleWord: "Strategy that ships.",
    color: "#7B5EFF",
    colorRgb: "123 94 255",
    image: "/images/archetype-builder.png",
    card: "/images/cards/card-builder.png",
    subtitle:
      "Strategy means nothing if it doesn't ship. I close the loop — from idea to live site — without handoff loss.",
  },
];

export const ARCHETYPE_BY_ID = Object.fromEntries(
  ARCHETYPES.map((a) => [a.id, a])
) as Record<ArchetypeId, Archetype>;
