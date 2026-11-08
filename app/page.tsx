import Script from "next/script";
import ScrollAnimations from "./ScrollAnimations";
import HeroGlobe from "./HeroGlobe";
import Interactions from "./Interactions";
import { readFileSync } from "fs";
import { join } from "path";

export default function Home() {
  // read per render so edits to body.html show up in dev; static export still reads it once at build
  const html = readFileSync(join(process.cwd(), "app", "body.html"), "utf8");
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} style={{ display: "contents" }} />
      <HeroGlobe />
      <ScrollAnimations />
      <Interactions />
      <Script src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/rtg.js`} strategy="afterInteractive" />
    </>
  );
}
