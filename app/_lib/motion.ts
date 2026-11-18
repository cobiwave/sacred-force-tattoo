import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export const motion = {
  duration: 1.1,
  ease: "expo.out",
  y: 24,
  maskOffset: 120,
  stagger: { words: 0.08, items: 0.1 },
} as const;

type MotionOptions = {
  full: () => void;
  reduced?: () => void;
};

export function useMotion(scope: RefObject<HTMLElement | null>, { full, reduced }: MotionOptions) {
  useGSAP(() => {
    const reveal = () => gsap.set(scope.current, { autoAlpha: 1 });
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      full();
      reveal();
    });
    media.add("(prefers-reduced-motion: reduce)", () => {
      reduced?.();
      reveal();
    });
    return () => media.revert();
  }, { scope });
}

export function splitWords(target: HTMLElement | null) {
  if (!target) return null;
  return SplitText.create(target, { type: "words", mask: "words", wordsClass: "split-word" });
}

export function revealTimeline(trigger?: Element | null) {
  return gsap.timeline({
    defaults: { duration: motion.duration, ease: motion.ease },
		scrollTrigger: trigger ? { trigger, start: "top 62%", once: true } : undefined,
  });
}

export function childrenOf(element: Element | null) {
  return gsap.utils.toArray<HTMLElement>(element?.children ?? []);
}

export const clampProgress = gsap.utils.clamp(0, 1);
export const snapToGrid = gsap.utils.snap(1 / 12);
export const mapProgress = gsap.utils.pipe(clampProgress, gsap.utils.mapRange(0, 1, 0, 100));

export { gsap };
