import type { Perspective, Project } from './types';

const BEHANCE_URL = 'https://www.behance.net/ahmedqurany';

export const projects: Project[] = Array.from({ length: 12 }, (_, i) => ({
  image: `https://picsum.photos/seed/qurany-work-${i + 1}/1024/1024`,
  behanceUrl: BEHANCE_URL,
  title: `Project ${i + 1}`,
}));

// Back-compat: existing carousel code uses `images` (array of strings).
export const images: string[] = projects.map((p) => p.image);

export const perspectives: Perspective[] = [
  {
    title: 'Selected Work',
    description: 'Twelve recent calls.',
    position: 'top',
  },
  {
    title: 'Click an image',
    description: 'to open the project on Behance.',
    position: 'center',
  },
  {
    title: 'Built to last',
    description: 'Brands, products, stories.',
    position: 'center',
  },
  {
    title: 'qurany.me — Featured Work',
    position: 'bottom',
  },
];

const isWide = typeof window !== 'undefined' ? window.innerWidth > 768 : true;

export const cylinderConfig = {
  radius: isWide ? 2.5 : 2.2,
  height: isWide ? 2 : 1.2,
  radialSegments: 64,
  heightSegments: 1,
};

export const particleConfig = {
  numParticles: 12,
  particleRadius: 3.3, // cylinderRadius + 0.8
  segments: 20,
  angleSpan: 0.3,
};

export const imageConfig = {
  width: 1024,
  height: 1024,
};
