"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function InitScroll() {
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".animate-in-up").forEach((el) => {
      const delay = parseFloat(el.dataset.delay || "0");
      const duration = parseFloat(el.dataset.duration || "0.5");
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50,
          ease: "sine",
        },
        {
          y: 0,
          delay,
          duration,

          opacity: 1,
          scrollTrigger: {
            once: true,
            trigger: el,
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.fromTo(
      document.body,
      {
        opacity: 0,

        ease: "sine",
      },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: document.body,
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.utils.toArray<HTMLElement>(".animate-fade").forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,

          ease: "linear",
          duration: 1.6,
        },
        {
          opacity: 1,
          duration: 1.6,
          scrollTrigger: {
            trigger: document.body,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    gsap.utils.toArray<HTMLElement>(".promo-image").forEach((el) => {
      gsap.fromTo(
        el,
        {
          x: 30,
          opacity: 0,
          ease: "sine",
          duration: 1,
        },
        { delay: 0.5, opacity: 1, x: 0, duration: 1, ease: "sine" }
      );
    });
  }, []);
  return <></>;
}
