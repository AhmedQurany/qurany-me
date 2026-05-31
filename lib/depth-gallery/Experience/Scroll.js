import * as THREE from 'three'

class Scroll {
  constructor(camera, gallery, debug = null) {
    this.isInitialized = false
    this.isDebugBound = false
    this.camera = camera
    this.gallery = gallery
    this.debug = debug

    // Element that receives wheel/touch input. Defaults to window if not set
    // (mirrors original Codrops behavior); the React wrapper passes the
    // section/canvas so scroll input is scoped to the gallery.
    this.inputElement = null

    // Scroll state
    this.scrollTarget = 0
    this.scrollCurrent = 0
    this.scrollSmoothing = 0.08
    this.scrollToWorldFactor = 0.01
    this.wheelScrollSpeed = 1
    this.touchScrollSpeed = 1.8
    this.previousScrollCurrent = 0
    this.invertScroll = false

    // Velocity
    this.rawVelocity = 0
    this.velocity = 0
    this.velocityDamping = 0.12
    this.velocityMax = 1.5
    this.velocityStopThreshold = 0.0001

    // Bounds
    this.useScrollBounds = true
    this.firstPlaneViewOffset = 5
    this.lastPlaneViewOffset = 5
    this.minCameraZ = -Infinity
    this.maxCameraZ = Infinity
    this.cameraStartZ = this.camera.position.z

    // Debug UI — disabled in the Next.js port.
    this.showVelocityVisualizer = false
    this.debugUiVisible = false
    this.touchY = 0
    this.velocityVisualizerElement = null
    this.velocityVisualizerFillElement = null
    this.velocityVisualizerValueElement = null

    // Input events
    this.onWheel = (event) => {
      event.preventDefault()
      const normalizedWheelDelta = this.normalizeWheelDelta(event) * this.wheelScrollSpeed
      this.addScrollInput(normalizedWheelDelta)
    }
    this.onTouchStart = (event) => {
      this.touchY = event.touches[0]?.clientY ?? 0
    }
    this.onTouchMove = (event) => {
      event.preventDefault()
      const currentTouchY = event.touches[0]?.clientY ?? this.touchY
      const deltaY = this.touchY - currentTouchY
      this.addScrollInput(deltaY * this.touchScrollSpeed)
      this.touchY = currentTouchY
    }
  }

  setInputElement(element) {
    this.inputElement = element || null
  }

  init() {
    if (this.isInitialized) return

    this.updateCameraBounds()
    this.cameraStartZ = this.maxCameraZ
    this.camera.position.z = this.cameraStartZ
    this.scrollTarget = 0
    this.scrollCurrent = 0
    this.previousScrollCurrent = this.scrollCurrent
    this.rawVelocity = 0
    this.velocity = 0
    this.bindDebug()

    this.isInitialized = true
  }

  bindEvents() {
    if (typeof window === 'undefined') return
    const target = this.inputElement || window
    this.boundTarget = target
    target.addEventListener('wheel', this.onWheel, { passive: false })
    target.addEventListener('touchstart', this.onTouchStart, { passive: true })
    target.addEventListener('touchmove', this.onTouchMove, { passive: false })
  }

  // Disable the engine's own wheel/touch handling so an external driver
  // (e.g. GSAP ScrollTrigger off page scroll) can own the scrollTarget.
  unbindEvents() {
    const target = this.boundTarget
    if (!target) return
    target.removeEventListener('wheel', this.onWheel)
    target.removeEventListener('touchstart', this.onTouchStart)
    target.removeEventListener('touchmove', this.onTouchMove)
    this.boundTarget = null
  }

  getScrollBounds() {
    this.updateCameraBounds()
    const min = this.scrollFromCameraZ(this.maxCameraZ)
    const max = this.scrollFromCameraZ(this.minCameraZ)
    return { min, max }
  }

  updateCameraBounds() {
    const depthRange = this.gallery.getDepthRange()
    this.maxCameraZ = depthRange.nearestZ + this.firstPlaneViewOffset
    this.minCameraZ = depthRange.deepestZ + this.lastPlaneViewOffset

    if (this.minCameraZ > this.maxCameraZ) {
      this.minCameraZ = this.maxCameraZ
    }
  }

  cameraZFromScroll(scrollAmount) {
    return this.cameraStartZ - scrollAmount * this.scrollToWorldFactor
  }

  scrollFromCameraZ(cameraZ) {
    if (this.scrollToWorldFactor === 0) return 0
    return (this.cameraStartZ - cameraZ) / this.scrollToWorldFactor
  }

  normalizeWheelDelta(event) {
    if (event.deltaMode === 1) return event.deltaY * 16
    if (event.deltaMode === 2) {
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
      return event.deltaY * viewportHeight
    }
    return event.deltaY
  }

  addScrollInput(deltaY) {
    const scrollDirection = this.invertScroll ? -1 : 1
    this.scrollTarget += deltaY * scrollDirection
  }

  updateVelocity() {
    this.rawVelocity = this.scrollCurrent - this.previousScrollCurrent
    this.velocity = THREE.MathUtils.lerp(this.velocity, this.rawVelocity, this.velocityDamping)
    this.velocity = THREE.MathUtils.clamp(this.velocity, -this.velocityMax, this.velocityMax)

    if (Math.abs(this.velocity) < this.velocityStopThreshold) {
      this.velocity = 0
    }

    this.previousScrollCurrent = this.scrollCurrent
  }

  setVelocityVisualizerVisible() {
    // No-op in Next.js port.
  }

  setDebugUiVisible(isVisible) {
    this.debugUiVisible = Boolean(isVisible)
  }

  updateVelocityVisualizer() {
    // No-op in Next.js port.
  }

  update() {
    this.updateCameraBounds()
    this.scrollCurrent = THREE.MathUtils.lerp(
      this.scrollCurrent,
      this.scrollTarget,
      this.scrollSmoothing
    )

    if (this.useScrollBounds) {
      const minimumScroll = this.scrollFromCameraZ(this.maxCameraZ)
      const maximumScroll = this.scrollFromCameraZ(this.minCameraZ)

      this.scrollTarget = THREE.MathUtils.clamp(this.scrollTarget, minimumScroll, maximumScroll)
      this.scrollCurrent = THREE.MathUtils.clamp(this.scrollCurrent, minimumScroll, maximumScroll)
    }

    this.updateVelocity()

    const nextCameraZ = this.cameraZFromScroll(this.scrollCurrent)
    if (this.useScrollBounds) {
      this.camera.position.z = THREE.MathUtils.clamp(nextCameraZ, this.minCameraZ, this.maxCameraZ)
      return
    }

    this.camera.position.z = nextCameraZ
  }

  bindDebug() {
    // Debug pane disabled in the Next.js port.
    this.isDebugBound = true
  }

  dispose() {
    if (typeof window !== 'undefined') {
      const target = this.inputElement || window
      target.removeEventListener('wheel', this.onWheel)
      target.removeEventListener('touchstart', this.onTouchStart)
      target.removeEventListener('touchmove', this.onTouchMove)
    }
  }
}

export { Scroll }
