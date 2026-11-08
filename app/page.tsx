import Script from "next/script";
import { readFileSync } from "fs";
import { join } from "path";

const html = readFileSync(join(process.cwd(), "app", "body.html"), "utf8");

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} style={{ display: "contents" }} />
      <Script src="/rtg.js" strategy="afterInteractive" />
    </>
  );
}
