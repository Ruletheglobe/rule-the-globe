import Script from "next/script";
import ScrollAnimations from "./ScrollAnimations";
import HeroGlobe from "./HeroGlobe";
import { readFileSync } from "fs";
import { join } from "path";

const html = readFileSync(join(process.cwd(), "app", "body.html"), "utf8");

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} style={{ display: "contents" }} />
      <HeroGlobe />
      <ScrollAnimations />
      <Script src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/rtg.js`} strategy="afterInteractive" />
    </>
  );
}
