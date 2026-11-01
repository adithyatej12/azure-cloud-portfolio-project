import ParallaxBackground from "@/components/backgrounds/ParallaxBackground";
import "../../public/css/demo-styles.css";

import ThemeSwitcherButton from "@/components/headers/ThemeSwitcherButton";
import Intro from "@/components/preview/Intro";
import Pages from "@/components/preview/Pages";
import Footer from "@/components/preview/Footer";
import Backtotop from "@/components/preview/Backtotop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Preview || Braxton - Personal Portfolio & Resume React Nextjs Template",
  description: "Braxton - Personal Portfolio & Resume React Nextjs Template",
};
export default function Preview() {
  return (
    <>
      {" "}
      <div className="demo">
        <ParallaxBackground />
        <>
          {/* Top Controls (Button and Color Switcher) Start */}
          <div className="demo__controls d-flex">
            <ThemeSwitcherButton parentClass="color-switcher btn mobile-horizontal btn-square btn-hover btn-hover-transparent" />
            <a
              className="btn mobile-horizontal btn-square-mobile btn-hover btn-hover-accent"
              href="https://themeforest.net/item/braxton-personal-portfolio-resume-react-nextjstemplate/59550577"
              target="_blank"
            >
              {/* template link here */}
              <span className="btn-caption">Purchase</span>
              <i className="ph-bold ph-shopping-cart" />
            </a>
          </div>
          {/* Top Controls (Button and Color Switcher) End */}
          {/* Demo Content Start */}
          <main className="demo__content">
            {/* Intro Start */}
            <Intro />
            {/* Intro End */}
            {/* Live Preview Links Start */}
            <Pages />
            {/* Live Preview Links End */}
          </main>
          {/* Demo Content End */}
          {/* Footer Start */}
          <Footer />
          {/* Footer End */}
          {/* To Top Button Start */}
          <Backtotop />
        </>
      </div>
    </>
  );
}
