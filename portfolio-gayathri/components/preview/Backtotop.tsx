"use client";

import { useEffect, useState } from "react";

export default function Backtotop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // run once to set initial state
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#"
      id="to-top"
      className="to-top btn btn-square btn-hover btn-hover-outline"
      onClick={(e) => {
        e.preventDefault();
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? "inherit" : "hidden",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <i className="ph-bold ph-arrow-up" />
    </a>
  );
}
