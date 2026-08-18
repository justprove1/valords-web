import Lenis from 'lenis';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
export const getLenis = () => lenis;

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    /* lerp rather than duration: the page keeps chasing the target every frame
       instead of restarting a 1.35s tween on each wheel tick, which is what made
       fast scrolling feel like it was catching up in steps. */
    lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
      syncTouch: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis && lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis && lenis.destroy();
      lenis = null;
    };
  }, []);
}

export const scrollTop = (immediate = true) => {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
};
