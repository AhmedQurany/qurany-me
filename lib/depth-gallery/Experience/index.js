import * as THREE from 'three'
import { Gallery } from './Gallery.js'
import { Background } from './Background/index.js'
import { Debug } from './Debug.js'
import { Label } from './Label.js'
import { TrailController } from './TrailController.js'

class Experience {
  constructor() {
    this.isInitialized = false
    this.isDisposed = false
    this.frameDarkPlaneCount = 2
    this.isFrameTextDark = null
    this.debug = new Debug()
    this.gallery = new Gallery(this.debug)
    this.label = new Label(this.gallery)
    this.background = new Background(this.debug)
    this.trailController = new TrailController({
      gallery: this.gallery,
      debug: this.debug,
    })
  }

  async init(scene, camera) {
    if (this.isInitialized) return

    await this.gallery.init(scene)
    this.label.init()
    this.background.init()
    this.trailController.init(scene, camera)

    const initialPlaneBlendData = this.gallery.getPlaneBlendData(camera.position.z)
    this.updateFrameTextTone(initialPlaneBlendData)

    this.isInitialized = true
  }

  updateFrameTextTone(planeBlendData) {
    if (!planeBlendData) return

    const nearestPlaneIndex =
      planeBlendData.blend >= 0.5 ? planeBlendData.nextPlaneIndex : planeBlendData.currentPlaneIndex
    const shouldUseDarkText = nearestPlaneIndex < this.frameDarkPlaneCount

    if (this.isFrameTextDark === shouldUseDarkText) return

    this.isFrameTextDark = shouldUseDarkText
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('frame-text-dark', shouldUseDarkText)
    }
  }

  // Drive the trail tint from the currently nearest plane's accent color so
  // the trail matches the active archetype atmosphere.
  updateTrailTint(planeBlendData) {
    if (!planeBlendData || !this.gallery.planes.length) return

    const nearestIndex =
      planeBlendData.blend >= 0.5 ? planeBlendData.nextPlaneIndex : planeBlendData.currentPlaneIndex
    const accentColor = this.gallery.planes[nearestIndex]?.userData?.accentColor
    if (accentColor) {
      this.trailController.setActiveColor(accentColor)
    }
  }

  update(time, camera = null, scroll = null) {
    this.trailController.update(camera, scroll, time)

    // Gallery + label
    this.gallery.update(camera, scroll)
    this.label.update(camera)

    // Camera-driven updates
    if (camera) {
      // Frame text tone
      const planeBlendData = this.gallery.getPlaneBlendData(camera.position.z)
      this.updateFrameTextTone(planeBlendData)
      this.updateTrailTint(planeBlendData)

      // Mood colors
      const moodBlendData = this.gallery.getMoodBlendData(camera.position.z)
      if (moodBlendData) {
        this.background.setMoodBlend(moodBlendData)
      }

      // Depth + velocity -> background motion response
      const depthProgress = this.gallery.getDepthProgress(camera.position.z)
      const velocityMax = scroll?.velocityMax || 1
      const velocityIntensity = THREE.MathUtils.clamp(
        Math.abs(scroll?.velocity || 0) / Math.max(velocityMax, 0.0001),
        0,
        1
      )
      const blend = planeBlendData?.blend ?? 0
      const distanceFromBlendCenter = Math.abs(blend - 0.5) * 2
      const transitionStability = THREE.MathUtils.smoothstep(distanceFromBlendCenter, 0.35, 1)
      const stabilizedVelocityIntensity = velocityIntensity * transitionStability

      this.background.setMotionResponse({
        depthProgress,
        velocityIntensity: stabilizedVelocityIntensity,
      })
    }

    // Background tick
    this.background.update(time)
  }

  dispose() {
    if (this.isDisposed) return

    this.trailController.dispose()
    this.gallery.dispose()
    this.label.dispose()
    this.background.dispose()
    this.isDisposed = true
  }
}

// Module-level singleton matches the original Codrops shape — `Engine` looks
// up `world` by default. The Next.js wrapper builds a fresh Experience on each
// mount, so we ALSO export the class for clean re-initialization.
const world = new Experience()
export { Experience, world }
