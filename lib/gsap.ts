// Centralized GSAP setup. Import from here, never from "gsap" directly,
// so plugin registration happens exactly once.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, CustomEase);

  // Award-grade easing curves — register once, reuse everywhere by name.
  if (!CustomEase.get("cinematic")) {
    CustomEase.create("cinematic", "M0,0 C0.25,0.1 0.25,1 1,1");
  }
  if (!CustomEase.get("magnetic")) {
    CustomEase.create("magnetic", "M0,0 C0.2,0 0.2,1 1,1");
  }
}

export { gsap, ScrollTrigger, SplitText, Flip, CustomEase };
