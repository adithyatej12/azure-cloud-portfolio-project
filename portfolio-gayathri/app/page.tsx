

import { Metadata } from "next";
import Preview from "./preview/page";
import Home1 from "./(homes)/home-gradient/page";

export const metadata: Metadata = {
  title: "Gayathri M | Developer Portfolio",
  description: "Portfolio of Gayathri M, an MCA student specializing in Storage and Cloud Technology with skills in frontend development, React, Python, Java, cloud computing, machine learning, and full-stack web development.",
};
export default function Home() {
  return (
    <>
      <Home1 />
    </>
  );
}
