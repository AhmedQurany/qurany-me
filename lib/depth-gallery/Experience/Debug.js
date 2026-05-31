// No-op Debug shim. The original Codrops project used tweakpane for live tuning;
// in the Next.js port we strip the debug UI entirely. Methods still exist so
// callers (Engine, Gallery, Background, Scroll, TrailController) don't need to
// know it's disabled.

class Debug {
  constructor() {
    this.pane = null
    this.folders = new Map()
    this.isVisible = false
  }

  init() {
    return null
  }

  setVisible(isVisible) {
    this.isVisible = Boolean(isVisible)
  }

  getFolder() {
    return null
  }

  addBinding() {
    return { on: () => {}, dispose: () => {} }
  }

  dispose() {
    this.folders.clear()
  }
}

export { Debug }
