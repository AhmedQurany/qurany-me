// Verbatim port of Anemolo/FoldingDOM js/default.js to TypeScript.
// Only change: scroll source is decoupled from document.body so the
// effect can live inside a section (driven by ScrollTrigger) instead
// of taking over the whole page.
// Source: https://github.com/Anemolo/FoldingDOM/blob/master/js/default.js

export class FoldedDom {
  wrapper: HTMLElement;
  folds: HTMLElement[];
  scrollers: HTMLElement[] = [];

  constructor(wrapper: HTMLElement, folds: HTMLElement[]) {
    this.wrapper = wrapper;
    this.folds = folds;
    this.scrollers = [];
  }

  /**
   * For each fold panel, clone the base content and inject it inside
   * fold-size-fix → fold-scroller. Matches `setContent` in default.js.
   */
  setContent(baseContent: HTMLElement) {
    const folds = this.folds;
    if (!folds) return;

    const scrollers: HTMLElement[] = [];

    for (let i = 0; i < folds.length; i++) {
      const fold = folds[i];
      const copyContent = baseContent.cloneNode(true) as HTMLElement;
      copyContent.id = "";
      // cloneNode copies inline styles too — strip them so the clone
      // shows (the template is hidden via inline display:none).
      copyContent.removeAttribute("style");

      const sizeFixEle = document.createElement("div");
      sizeFixEle.classList.add("fold-size-fix");
      const scroller = document.createElement("div");
      scroller.classList.add("fold-scroller");
      sizeFixEle.append(scroller);
      fold.append(sizeFixEle);

      scroller.append(copyContent);
      scrollers[i] = scroller;
    }

    this.scrollers = scrollers;
  }

  /**
   * Translate the cloned content inside every fold by the same Y offset.
   * Matches `updateStyles` in default.js.
   */
  updateStyles(scroll: number) {
    const folds = this.folds;
    const scrollers = this.scrollers;

    for (let i = 0; i < folds.length; i++) {
      const scroller = scrollers[i];
      const child = scroller?.children[0] as HTMLElement | undefined;
      if (child) {
        child.style.transform = `translateY(${scroll}px)`;
      }
    }
  }

  /**
   * Total content height in any single fold's cloned scroller.
   */
  getContentHeight(): number {
    const child = this.scrollers[0]?.children[0] as HTMLElement | undefined;
    return child?.clientHeight ?? 0;
  }
}

/**
 * Linear interpolation used by default.js to smooth scroll motion.
 */
export function lerp(current: number, target: number, speed = 0.1, limit = 0.001) {
  let change = (target - current) * speed;
  if (Math.abs(change) < limit) {
    change = target - current;
  }
  return change;
}
