import About from "@/components/about/About";
import GradientBackground from "@/components/backgrounds/GradientBackground";
import Header1 from "@/components/headers/Header1";
import Profile from "@/components/profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Gayathri M",
  description: "About Gayathri M - MCA student specializing in Storage and Cloud Technology",
};

export default function AboutPage() {
  return (
    <>
      <Header1 />
      <GradientBackground />
      <Profile profileImage="/img/avatars/gayathri_new.png" />
      <div id="content" className="content">
        <div className="content__wrapper">
          <About />
        </div>
      </div>
    </>
  );
}
