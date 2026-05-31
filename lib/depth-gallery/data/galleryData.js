// Qurany.me archetype palette — the only colors the depth gallery is allowed to use.
// Each gallery slide maps to one service / archetype.
//
// Archetype hexes:
//   Magician     #FF6B9D
//   Architect    #00F0FF
//   Navigator    #00C896
//   Strategist   #FF3D33
//   Storyteller  #FFB800
//   Builder      #7B5EFF
//
// `backgroundColor`, `blob1Color`, `blob2Color` drive the atmosphere shader.
// `accentColor` and `fallbackColor` drive the plane material + label chip.
// `textureSrc` is the picsum demo image (swap later).

const galleryPlaneData = [
  {
    fallbackColor: '#FF6B9D',
    accentColor: '#FF6B9D',
    textureSrc: 'https://picsum.photos/seed/qurany-1/1200/1500',
    position: { x: -0.9, y: 0 },
    // Magician atmosphere — pink wash, warmed by Storyteller, cooled by Builder.
    backgroundColor: '#FF6B9D',
    blob1Color: '#FFB800',
    blob2Color: '#7B5EFF',
    label: {
      word: 'Branding',
      title: 'Brands that feel inevitable.',
      body: 'Positioning narrative, identity system, and the voice that ties them together. The brand stops feeling like a logo and starts feeling like a stance.',
    },
  },
  {
    fallbackColor: '#00F0FF',
    accentColor: '#00F0FF',
    textureSrc: 'https://picsum.photos/seed/qurany-2/1200/1500',
    position: { x: 0.8, y: 0 },
    // Architect atmosphere — electric cyan, lifted by Navigator green, cut by Builder violet.
    backgroundColor: '#00F0FF',
    blob1Color: '#00C896',
    blob2Color: '#7B5EFF',
    label: {
      word: 'Systems',
      title: 'Systems that survive scale.',
      body: 'Design tokens, component libraries, and the governance to keep them honest. Living infrastructure teams actually use, not pretty token libraries.',
    },
  },
  {
    fallbackColor: '#00C896',
    accentColor: '#00C896',
    textureSrc: 'https://picsum.photos/seed/qurany-3/1200/1500',
    position: { x: -0.7, y: 0 },
    // Navigator atmosphere — green, paired with Architect cyan + Storyteller amber.
    backgroundColor: '#00C896',
    blob1Color: '#00F0FF',
    blob2Color: '#FFB800',
    label: {
      word: 'Product / UX',
      title: 'Paths users actually walk.',
      body: 'User flows, journey maps, and the screens that hold them up. End-to-end product thinking, not just pretty mockups handed over to engineering.',
    },
  },
  {
    fallbackColor: '#FF3D33',
    accentColor: '#FF3D33',
    textureSrc: 'https://picsum.photos/seed/qurany-4/1200/1500',
    position: { x: 1, y: 0 },
    // Strategist atmosphere — red, contrasted with Magician pink + Storyteller amber.
    backgroundColor: '#FF3D33',
    blob1Color: '#FF6B9D',
    blob2Color: '#FFB800',
    label: {
      word: 'Strategy',
      title: 'The plan before the pixels.',
      body: 'Audit, reframe, and the strategic plan that explains every design decision after it. The grown-up part of the engagement.',
    },
  },
  {
    fallbackColor: '#FFB800',
    accentColor: '#FFB800',
    textureSrc: 'https://picsum.photos/seed/qurany-5/1200/1500',
    position: { x: -0.7, y: 0 },
    // Storyteller atmosphere — amber, warmed by Strategist + cooled by Builder.
    backgroundColor: '#FFB800',
    blob1Color: '#FF3D33',
    blob2Color: '#7B5EFF',
    label: {
      word: 'Presentation',
      title: 'Decks that move rooms.',
      body: 'Pitch decks, investor materials, and the narrative spine they hang off. Built to win the room, not fill it.',
    },
  },
  {
    fallbackColor: '#7B5EFF',
    accentColor: '#7B5EFF',
    textureSrc: 'https://picsum.photos/seed/qurany-6/1200/1500',
    position: { x: 0.9, y: 0 },
    // Builder atmosphere — violet, lifted with Architect cyan + Magician pink.
    backgroundColor: '#7B5EFF',
    blob1Color: '#00F0FF',
    blob2Color: '#FF6B9D',
    label: {
      word: 'Dev',
      title: 'Strategy that ships.',
      body: 'From idea to live site without handoff loss. Next.js for the ambitious work, WordPress / Webflow for the rest. I close the loop.',
    },
  },
]

// Full service slides — used by the Label overlay (headline) and the Gallery card.
// Index-aligned with galleryPlaneData above.
const galleryServiceSlides = [
  {
    id: 'branding',
    discipline: 'Branding',
    title: 'Brands that feel inevitable.',
    color: '#FF6B9D',
    imageUrl: 'https://picsum.photos/seed/qurany-1/1200/1500',
  },
  {
    id: 'systems',
    discipline: 'Systems',
    title: 'Systems that survive scale.',
    color: '#00F0FF',
    imageUrl: 'https://picsum.photos/seed/qurany-2/1200/1500',
  },
  {
    id: 'product-ux',
    discipline: 'Product / UX',
    title: 'Paths users actually walk.',
    color: '#00C896',
    imageUrl: 'https://picsum.photos/seed/qurany-3/1200/1500',
  },
  {
    id: 'strategy',
    discipline: 'Strategy',
    title: 'The plan before the pixels.',
    color: '#FF3D33',
    imageUrl: 'https://picsum.photos/seed/qurany-4/1200/1500',
  },
  {
    id: 'presentation',
    discipline: 'Presentation',
    title: 'Decks that move rooms.',
    color: '#FFB800',
    imageUrl: 'https://picsum.photos/seed/qurany-5/1200/1500',
  },
  {
    id: 'dev',
    discipline: 'Dev',
    title: 'Strategy that ships.',
    color: '#7B5EFF',
    imageUrl: 'https://picsum.photos/seed/qurany-6/1200/1500',
  },
]

export { galleryPlaneData, galleryServiceSlides }
