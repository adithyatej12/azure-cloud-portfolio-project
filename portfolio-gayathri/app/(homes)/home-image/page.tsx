import About from "@/components/about/About";
import ParallaxBackground from "@/components/backgrounds/ParallaxBackground";

import Contact from "@/components/contact/Contact";
import Header1 from "@/components/headers/Header1";
import Intro from "@/components/intro/Intro";
import Portfolio from "@/components/portfolio/Portfolio";
import Profile from "@/components/profile/Profile";
import Education from "@/components/resume/Education";
import Experience from "@/components/resume/Experience";
import Research from "@/components/resume/Research";
import ResumeHeading from "@/components/resume/ResumeHeading";
import Tools from "@/components/resume/Tools";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Gayathri M | Developer Portfolio",
  description: "Portfolio of Gayathri M, an MCA student specializing in Storage and Cloud Technology with skills in frontend development, React, Python, Java, cloud computing, machine learning, and full-stack web development.",
};
export default function Home() {
  return (
    <>
      <Header1 />
      <ParallaxBackground />
      <Profile profileImage="/img/avatars/gayathri_new.png" />
      <div id="content" className="content">
        <div className="content__wrapper">
          <Intro />
          <About />
          <section id="resume" className="inner resume">
            <Tools />
            <Experience />
            <Education />
            <Research />
          </section>
          <Portfolio />
          <Contact />
        </div>
      </div>
    </>
  );
}
