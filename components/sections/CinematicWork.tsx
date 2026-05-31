'use client';

import { useEffect, useRef, useState } from 'react';
import { Renderer, Camera, Transform, Texture, Program, Mesh } from 'ogl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

import type { CameraAnimation, ParticleMesh } from '@/lib/cinematic/types';
import {
  images,
  projects,
  perspectives,
  cylinderConfig,
  particleConfig,
  imageConfig,
} from '@/lib/cinematic/data';
import {
  drawImageCover,
  getPositionClasses,
  createCylinderGeometry,
  createParticleGeometry,
} from '@/lib/cinematic/utils';
import {
  cylinderVertex,
  cylinderFragment,
  particleVertex,
  particleFragment,
} from '@/lib/cinematic/shaders';
import CinematicLoader from './CinematicWork.loader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  if (!CustomEase.get('cinematicSilk')) {
    CustomEase.create('cinematicSilk', '0.45, 0.05, 0.55, 0.95');
    CustomEase.create('cinematicSmooth', '0.25, 0.1, 0.25, 1');
    CustomEase.create('cinematicFlow', '0.33, 0, 0.2, 1');
    CustomEase.create('cinematicLinear', '0.4, 0, 0.6, 1');
  }
}

export function CinematicWork() {
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const cylinderRef = useRef<Mesh | null>(null);
  const cameraAnimRef = useRef<CameraAnimation>({ x: 0, y: 0, z: 8, rotY: 0 });
  const particlesRef = useRef<ParticleMesh[]>([]);
  const lastRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumRef = useRef(0);

  // Track current centered image index so the click handler always opens the
  // right project.
  const centerIndexRef = useRef(0);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const sectionEl = sectionRef.current;
    if (!canvasEl || !sectionEl) return;

    const renderer = new Renderer({
      canvas: canvasEl,
      width: window.innerWidth,
      height: window.innerHeight,
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);
    gl.disable(gl.CULL_FACE);
    rendererRef.current = renderer;

    const getResponsiveDimensions = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      const maxRadius = isMobile ? 1.8 : isTablet ? 2.2 : 2.5;
      const cylinderHeight = isMobile ? 0.8 : isTablet ? 1.0 : 1.2;
      const cameraZ = isMobile ? 6 : isTablet ? 7 : 8;
      const fov = isMobile ? 50 : 45;

      return {
        cylinderScale: maxRadius / cylinderConfig.radius,
        cylinderHeight,
        cameraZ,
        fov,
        isMobile,
      };
    };

    const dimensions = getResponsiveDimensions();

    const cameraOptions: { fov: number; aspect?: number } = {
      fov: dimensions.fov,
    };
    if (dimensions.isMobile) {
      cameraOptions.aspect = window.innerWidth / window.innerHeight;
    }
    const camera = new Camera(gl, cameraOptions as any);
    camera.position.set(0, 0, dimensions.cameraZ);
    cameraRef.current = camera;

    const scene = new Transform();
    sceneRef.current = scene;

    const geometry = createCylinderGeometry(gl as unknown as WebGLRenderingContext, cylinderConfig);

    const hardwareLimit = gl.getParameter(gl.MAX_TEXTURE_SIZE);

    const isMobileDevice = window.innerWidth < 768;
    const safeLimit = isMobileDevice ? 2048 : Math.min(hardwareLimit, 8192);

    const offscreen = document.createElement('canvas');
    const ctx = offscreen.getContext('2d', {
      willReadFrequently: false,
      alpha: false,
    });
    if (!ctx) return;
    const numImages = images.length;

    const totalWidthOriginal = imageConfig.width * numImages;
    const heightOriginal = imageConfig.height;

    const scale = Math.min(1, safeLimit / totalWidthOriginal);

    offscreen.width = Math.floor(totalWidthOriginal * scale);
    offscreen.height = Math.floor(heightOriginal * scale);

    let loadedImages = 0;
    const imageElements: HTMLImageElement[] = [];

    const circumference = 2 * Math.PI * cylinderConfig.radius;
    const textureAspectRatio =
      imageConfig.height / (imageConfig.width * images.length);
    const idealHeight = circumference * textureAspectRatio;
    const heightCorrection = idealHeight / cylinderConfig.height;

    let lastWidth = window.innerWidth;

    const handleResize = () => {
      if (rendererRef.current && cameraRef.current && cylinderRef.current) {
        const currentWidth = window.innerWidth;
        const newDimensions = getResponsiveDimensions();

        if (newDimensions.isMobile && currentWidth === lastWidth) {
          return;
        }
        lastWidth = currentWidth;

        rendererRef.current.setSize(currentWidth, window.innerHeight);

        cameraRef.current.perspective({
          fov: newDimensions.fov,
          aspect: currentWidth / window.innerHeight,
        });

        if (newDimensions.isMobile) {
          cylinderRef.current.scale.set(
            newDimensions.cylinderScale,
            newDimensions.cylinderScale * heightCorrection,
            newDimensions.cylinderScale
          );
        } else {
          cylinderRef.current.scale.set(
            newDimensions.cylinderScale,
            newDimensions.cylinderScale,
            newDimensions.cylinderScale
          );
        }

        if (
          cameraAnimRef.current.z === 8 ||
          cameraAnimRef.current.z === 7 ||
          cameraAnimRef.current.z === 6
        ) {
          cameraAnimRef.current.z = newDimensions.cameraZ;
        }
      }
    };

    // Click handler: open the centered image's behanceUrl in a new tab.
    const handleCanvasClick = () => {
      const idx = centerIndexRef.current;
      const project = projects[idx];
      if (project && typeof window !== 'undefined') {
        window.open(project.behanceUrl, '_blank', 'noopener');
      }
    };

    canvasEl.addEventListener('click', handleCanvasClick);

    const createdTriggers: ScrollTrigger[] = [];
    let rafId = 0;
    let disposed = false;

    images.forEach((imageSrc, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imageElements[index] = img;
        loadedImages++;

        const totalCanvasWidth = offscreen.width;
        const canvasHeight = offscreen.height;

        if (loadedImages === numImages) {
          imageElements.forEach((loadedImg, i) => {
            const xStartExact = (i / numImages) * totalCanvasWidth;
            const xEndExact = ((i + 1) / numImages) * totalCanvasWidth;

            const xPos = Math.floor(xStartExact);
            const xEnd = Math.floor(xEndExact);

            const drawWidthActual = xEnd - xPos;
            drawImageCover(ctx, loadedImg, xPos, 0, drawWidthActual, canvasHeight);
          });

          const texture = new Texture(gl, {
            wrapS: gl.CLAMP_TO_EDGE,
            wrapT: gl.CLAMP_TO_EDGE,
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR,
            generateMipmaps: false,
          });

          texture.image = offscreen;
          (texture as any).needsUpdate = true;

          const program = new Program(gl, {
            vertex: cylinderVertex,
            fragment: cylinderFragment,
            uniforms: {
              tMap: { value: texture },
              uDarkness: { value: 0.3 },
            },
            cullFace: null as any,
          });

          const cylinder = new Mesh(gl, { geometry, program });
          cylinder.setParent(scene);
          cylinder.rotation.y = 0.5;
          cylinder.scale.set(
            dimensions.cylinderScale,
            dimensions.cylinderScale,
            dimensions.cylinderScale
          );
          cylinderRef.current = cylinder;

          setIsLoading(false);

          // Camera + rotation timeline driven by section scroll. We pin the
          // sticky inner div for the full scroll span of the section so the
          // cylinder visibly rotates as the user scrolls through.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            },
          });
          if (tl.scrollTrigger) createdTriggers.push(tl.scrollTrigger);

          tl.to(cameraAnimRef.current, {
            x: 0,
            y: 0,
            z: dimensions.cameraZ,
            duration: 1,
            ease: 'cinematicSilk',
          })
            .to(cameraAnimRef.current, {
              x: 0,
              y: 5,
              z: 5,
              duration: 1,
              ease: 'cinematicFlow',
            })
            .to(cameraAnimRef.current, {
              x: 1.5,
              y: 2,
              z: 2,
              duration: 2,
              ease: 'cinematicLinear',
            })
            .to(cameraAnimRef.current, {
              x: 0.5,
              y: 0,
              z: 0.8,
              duration: 3.5,
              ease: 'power1.inOut',
            })
            .to(cameraAnimRef.current, {
              x: -6,
              y: -1,
              z: dimensions.cameraZ,
              duration: 1,
              ease: 'cinematicSmooth',
            });

          tl.to(
            cylinder.rotation,
            {
              y: '+=28.27',
              duration: 8.5,
              ease: 'none',
            },
            0
          );

          textRefs.current.forEach((textEl, i) => {
            if (!textEl) return;

            const sectionDuration = 100 / perspectives.length;
            const start = i * sectionDuration;
            const end = (i + 1) * sectionDuration;

            const textTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: sectionEl,
                start: `${start}% top`,
                end: `${end}% top`,
                scrub: 0.8,
              },
            });
            if (textTimeline.scrollTrigger) {
              createdTriggers.push(textTimeline.scrollTrigger);
            }

            textTimeline
              .fromTo(
                textEl,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 0.2,
                  ease: 'cinematicSmooth',
                }
              )
              .to(textEl, {
                opacity: 1,
                duration: 0.6,
                ease: 'none',
              })
              .to(textEl, {
                opacity: 0,
                duration: 0.2,
                ease: 'cinematicSmooth',
              });
          });

          for (let i = 0; i < particleConfig.numParticles; i++) {
            const { geometry: lineGeometry, userData } = createParticleGeometry(
              gl as unknown as WebGLRenderingContext,
              particleConfig,
              i,
              cylinderConfig.height
            );

            const lineProgram = new Program(gl, {
              vertex: particleVertex,
              fragment: particleFragment,
              uniforms: {
                uColor: { value: [1.0, 1.0, 1.0] },
                uOpacity: { value: 0.0 },
              },
              transparent: true,
              depthTest: true,
            });

            const particle = new Mesh(gl, {
              geometry: lineGeometry,
              program: lineProgram,
              mode: gl.LINE_STRIP,
            }) as ParticleMesh;

            particle.userData = userData;
            particle.setParent(scene);
            particlesRef.current.push(particle);
          }

          window.addEventListener('resize', handleResize);

          const animate = () => {
            if (disposed) return;
            rafId = requestAnimationFrame(animate);

            camera.position.set(
              cameraAnimRef.current.x,
              cameraAnimRef.current.y,
              cameraAnimRef.current.z
            );
            camera.lookAt([0, 0, 0]);

            if (cylinderRef.current) {
              const currentRotation = cylinderRef.current.rotation.y;
              velocityRef.current = currentRotation - lastRotationRef.current;
              lastRotationRef.current = currentRotation;

              const inertiaFactor = 0.15;
              const decayFactor = 0.92;

              momentumRef.current =
                momentumRef.current * decayFactor +
                velocityRef.current * inertiaFactor;

              const speed = Math.abs(velocityRef.current) * 100;

              const isRotating = Math.abs(velocityRef.current) > 0.0001;

              // Compute which image is currently centered (facing the camera).
              // Each image spans 2*PI / numImages radians around the cylinder.
              // Image 0 is centered when the cylinder's rotation aligns its
              // initial UV anchor with the camera-facing side. We pick the
              // image whose angle (relative to camera at +Z) is smallest.
              const n = images.length;
              // The cylinder spins around Y, the camera generally sits at +Z
              // looking toward origin. The angle of each image's center in
              // world space is: (i + 0.5) * (2*PI / n) - cylinder.rotation.y.
              // We want the angle that's closest to PI/2 (facing +Z direction)
              // wrapped to [-PI, PI].
              const sliceAngle = (2 * Math.PI) / n;
              let bestIdx = 0;
              let bestDiff = Infinity;
              for (let i = 0; i < n; i++) {
                // Center of image i on the cylinder surface, in local frame.
                const localAngle = (i + 0.5) * sliceAngle;
                // World-space angle after rotation.
                const worldAngle = localAngle + cylinderRef.current.rotation.y;
                // We want the image facing camera (+Z), i.e. world angle = PI/2.
                let diff = worldAngle - Math.PI / 2;
                // Wrap to [-PI, PI].
                diff = Math.atan2(Math.sin(diff), Math.cos(diff));
                const absDiff = Math.abs(diff);
                if (absDiff < bestDiff) {
                  bestDiff = absDiff;
                  bestIdx = i;
                }
              }
              centerIndexRef.current = bestIdx;

              particlesRef.current.forEach((particle) => {
                const userData = particle.userData;

                const targetOpacity = isRotating
                  ? Math.min(speed * 3, 0.95)
                  : 0;
                const currentOpacity = particle.program.uniforms.uOpacity
                  .value as number;
                particle.program.uniforms.uOpacity.value =
                  currentOpacity + (targetOpacity - currentOpacity) * 0.15;

                if (isRotating) {
                  const rotationOffset =
                    velocityRef.current * userData.speed * 1.5;
                  const newBaseAngle = userData.baseAngle + rotationOffset;
                  userData.baseAngle = newBaseAngle;

                  const segments = particleConfig.segments;
                  const positions = particle.geometry.attributes.position
                    .data as Float32Array;

                  for (let j = 0; j <= segments; j++) {
                    const t = j / segments;
                    const angle = newBaseAngle + userData.angleSpan * t;
                    const radiusWithSpeed = userData.radius;

                    positions[j * 3] = Math.cos(angle) * radiusWithSpeed;
                    positions[j * 3 + 1] = userData.baseY;
                    positions[j * 3 + 2] = Math.sin(angle) * radiusWithSpeed;
                  }

                  particle.geometry.attributes.position.needsUpdate = true;
                }
              });
            }

            renderer.render({ scene, camera });
          };
          animate();
        }
      };
      img.onerror = () => {
        console.error('Failed to load image:', imageSrc);
        setIsLoading(false);
      };
      img.src = imageSrc;
    });

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('click', handleCanvasClick);
      createdTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ height: '400vh' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <CinematicLoader isLoading={isLoading} />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer"
          style={{ display: 'block' }}
        />

        <div className="absolute inset-0 pointer-events-none z-10 text-white">
          {perspectives.map((perspective, index) => (
            <div
              key={index}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className={`absolute text-center opacity-0 max-md:w-full ${getPositionClasses(
                perspective.position
              )}`}
            >
              <h2 className="text-7xl font-[300] max-md:text-3xl leading-[0.8]">
                {perspective.title}
              </h2>
              {perspective.description && (
                <p className="text-2xl font-[300] max-md:text-base opacity-50 mt-2">
                  {perspective.description}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 right-8 z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-white/60"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <span className="text-sm text-white/40">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CinematicWork;
