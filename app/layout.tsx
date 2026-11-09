import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "./CookieConsent";
import PageFX from "./PageFX";

export const metadata: Metadata = {
  title: "RTG · Let your brand rule the globe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* fonts as a <link> (not CSS @import) so they load in parallel instead of blocking render */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&family=Google+Sans:wght@400..700&family=Instrument+Serif:ital@0;1&display=swap"
        />
      </head>
      <body>
        {children}
        <PageFX />
        <CookieConsent />
      </body>
    </html>
  );
}
