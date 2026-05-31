import * as THREE from 'three'
import { Experience } from './index.js'
import { Scroll } from './Scroll.js'

class Engine {
  constructor(canvas, experience = null) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Engine requires a valid canvas element')
    }

    // Initialization. Always build a fresh Experience per Engine instance to
    // avoid leaking state across React re-mounts.
    this.canvas = canvas
    this.experience = experience || new Experience()
    this.debug = this.experience.debug
    this.isInitialized = false
    this.isRunning = false
    this.isDebugBound = false
    this.animationFrameRequestId = null
    this.preloadedTextures = new Map()
    this.resizeObserver = null
    this.scene = new THREE.Scene()

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    this.camera.position.set(0, 0, 6)

    // Scroll — scoped to the canvas's parent (the section).
    this.scroll = new Scroll(this.camera, this.experience.gallery, this.debug)
    const sectionElement = this.canvas.parentElement || this.canvas
    this.scroll.setInputElement(sectionElement)
    this.experience.gallery.setPointerElement(sectionElement)
    this.experience.label.setHost(sectionElement)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    })
    this.renderer.setPixelRatio(
      Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)
    )
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.autoClear = false

    this.onResize = () => {
      this.resize()
    }

    this.animate = this.update.bind(this)
  }

  async init() {
    if (this.isInitialized) return

    if (typeof document !== 'undefined') {
      document.body.classList.add('loading')
    }

    try {
      this.preloadedTextures = await this.preloadTextures()
      this.experience.gallery.setPreloadedTextures(this.preloadedTextures)

      await this.experience.init(this.scene, this.camera)
      this.scroll.init()

      this.resize()
      this.bindResizeObserver()
      this.scroll.bindEvents()

      this.isInitialized = true
      this.start()
    } finally {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('loading')
      }
    }
  }

  start() {
    if (!this.isInitialized || this.isRunning) return

    this.isRunning = true
    this.update()
  }

  bindResizeObserver() {
    const target = this.canvas.parentElement || this.canvas
    if (typeof ResizeObserver === 'undefined') {
      // Fallback to window resize if ResizeObserver is unavailable.
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this.onResize)
      }
      return
    }
    this.resizeObserver = new ResizeObserver(this.onResize)
    this.resizeObserver.observe(target)
  }

  resize() {
    const container = this.canvas.parentElement
    const width = container?.clientWidth || this.canvas.clientWidth || 1
    const height = container?.clientHeight || this.canvas.clientHeight || 1
    if (width <= 0 || height <= 0) return

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height, false)
    this.experience.gallery.updatePlaneScale()
    this.experience.gallery.layoutPlanes()
    this.experience.label.resize(width, height)
  }

  async preloadTextures() {
    const textureSources = this.experience.gallery.getTextureSources()
    if (!textureSources.length) return new Map()

    const textureLoader = new THREE.TextureLoader()
    // picsum.photos requires CORS to be permissive — it is for hotlinking.
    textureLoader.setCrossOrigin('anonymous')
    const loadedTextures = new Map()

    await Promise.all(
      textureSources.map(async (textureSource) => {
        try {
          const texture = await textureLoader.loadAsync(textureSource)
          texture.colorSpace = THREE.SRGBColorSpace
          loadedTextures.set(textureSource, texture)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(`Texture failed to load: ${textureSource}`, error)
        }
      })
    )

    return loadedTextures
  }

  update() {
    if (!this.isRunning) return

    this.animationFrameRequestId = requestAnimationFrame(this.animate)

    const time = performance.now()

    this.scroll.update()
    this.experience.update(time, this.camera, this.scroll)

    this.renderer.clear(true, true, true)
    this.experience.background.render(this.renderer)
    this.renderer.clearDepth()
    this.renderer.render(this.scene, this.camera)
    this.experience.label.render()
  }

  dispose() {
    this.isRunning = false

    if (this.animationFrameRequestId !== null) {
      cancelAnimationFrame(this.animationFrameRequestId)
      this.animationFrameRequestId = null
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    } else if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize)
    }

    this.scroll.dispose()

    this.preloadedTextures.forEach((texture) => {
      texture.dispose()
    })
    this.preloadedTextures.clear()

    this.experience.dispose?.()
    this.renderer.dispose()
  }
}

export { Engine }
