"use client";

import MarqueeWrapper from "../scroll/MarqueeWrapper";

const marqueeParts = Array.from({ length: 9 });
export default function MarqueeSlider() {
  return (
    <MarqueeWrapper className="marquee">
      <div className="marquee__inner">
        {marqueeParts.map((_, index) => (
          <div key={index} className="marquee__part">
            CV/Resume &amp; Creative Portfolio
            <div className="star">
              <i className="ph-bold ph-star-four" />
            </div>
          </div>
        ))}
      </div>
    </MarqueeWrapper>
  );
}
