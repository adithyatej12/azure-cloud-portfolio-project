"use client";

import { useEffect, useState } from "react";
import ParallaxItem from "../scroll/Parallax";

export default function SvgBackgrounds() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 800);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      id="svgBackground"
      className={`svg-background ${loaded ? "loaded" : ""}`}
    >
      {/* top svg item */}
      <ParallaxItem speed={0.8} className="background__svg01">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1000"
          height="1000"
          viewBox="0 0 1000 1000"
        >
          <defs>
            <radialGradient
              id="color-gradient"
              cx="418.5665"
              cy="225.9685"
              r="499.9326"
              fx="866.8251"
              fy="4.6162"
              gradientTransform="matrix(-0.6935 0.7207 -0.7207 -0.6935 953.1126 355.0528)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#cec4ef" />
              <stop offset="1" stopColor="#cec4ef" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle fill="url(#color-gradient)" cx="500" cy="500" r="500" />
        </svg>
      </ParallaxItem>

      {/* bottom svg item */}
      <ParallaxItem speed={0.4} className="background__svg02">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="430"
          height="430"
          viewBox="0 0 429.6 429.6"
        >
          <defs>
            <radialGradient
              id="color-gradient-2"
              cx="2213.9312"
              cy="-11537.4219"
              r="214.85"
              fx="2393.6191"
              fy="-11419.6494"
              gradientTransform="matrix(0.019 0.9998 0.9998 -0.019 11706.5303 -2223.4016)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#cec4ef" />
              <stop offset="1" stopColor="#cec4ef" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            fill="url(#color-gradient-2)"
            d="M63,63C146.9-21,282.9-21,366.8,62.9s83.8,219.9-0.1,303.8s-219.9,83.9-303.8,0.1S-20.9,146.9,63,63z"
          />
        </svg>
      </ParallaxItem>
    </div>
  );
}
