"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface MarqueeWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function MarqueeWrapper({
  children,
  className = "",
}: MarqueeWrapperProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<NodeListOf<Element>>(null);
  const tweenRef = useRef<gsap.core.Tween>(null);

  useLayoutEffect(() => {
    if (!marqueeRef.current) return;

    // Setup marquee animation
    const tween = gsap
      .to(marqueeRef.current.querySelectorAll(".marquee__part"), {
        xPercent: -100,
        repeat: -1,
        duration: 5,
        ease: "linear",
      })
      .totalProgress(0.5);

    gsap.set(marqueeRef.current.querySelector(".marquee__inner"), {
      xPercent: -50,
    });

    tweenRef.current = tween;
    starsRef.current = marqueeRef.current.querySelectorAll(".star");
  }, []);

  useEffect(() => {
    let currentScroll = 0;
    let isScrollingDown = true;

    const onScroll = () => {
      const scrolled = window.pageYOffset;

      isScrollingDown = scrolled > currentScroll;

      if (tweenRef.current) {
        gsap.to(tweenRef.current, {
          timeScale: isScrollingDown ? 1 : -1,
        });
      }

      starsRef.current?.forEach((star) => {
        if (isScrollingDown) {
          star.classList.remove("active");
        } else {
          star.classList.add("active");
        }
      });

      currentScroll = scrolled;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={className} ref={marqueeRef}>
      {children}
    </div>
  );
}
