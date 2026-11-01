import type { Metadata } from "next";
import "../public/css/styles.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import InitScroll from "@/components/scroll/InitScroll";
import Script from "next/script"; // ✅ use next/script
import LenisSmoothScroll from "@/components/scroll/LenisSmoothScroll";
export const metadata: Metadata = {
  title: "Gayathri M | Developer Portfolio",
  description: "Portfolio of Gayathri M, an MCA student specializing in Storage and Cloud Technology with skills in frontend development, React, Python, Java, cloud computing, machine learning, and full-stack web development.",
  icons: {
    icon: "/favicon.ico",
  },
};

const setColorSchemeScript = `
  (function() {
    try {
      var scheme = localStorage.getItem('color-scheme') || 'light';
      document.documentElement.setAttribute('color-scheme', scheme);
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="no-touch"
    >
      <body>
        <Script id="set-color-scheme" strategy="beforeInteractive">
          {setColorSchemeScript}
        </Script>
        {children}
        <LenisSmoothScroll />
        <InitScroll />
      </body>
    </html>
  );
}
