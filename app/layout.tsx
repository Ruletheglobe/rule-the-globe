import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "./CookieConsent";

export const metadata: Metadata = {
  title: "RTG · Let your brand rule the globe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
