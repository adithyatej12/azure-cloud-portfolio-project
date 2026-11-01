"use client";

import { useLayoutEffect, useRef } from "react";

interface ParallaxBackgroundProps {
  speed?: number;
}
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function ParallaxBackground({
  speed = 0.4,
}: ParallaxBackgroundProps) {
  const elRef = useRef(null);

  useLayoutEffect(() => {
    if (!elRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(elRef.current, {
        y: () => (1 - speed) * ScrollTrigger.maxScroll(window),
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0,
          invalidateOnRefresh: true,
        },
      });
    }, elRef);

    return () => ctx.revert();
  }, [speed]);

  return <div ref={elRef} id="imageBackground" className="image-background" />;
}
