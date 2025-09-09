import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapBanner = (selector: string) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(selector, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: selector,
          start: "top top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [selector]);
};
