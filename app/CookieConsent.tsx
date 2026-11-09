"use client";

import { useEffect, useState } from "react";

const KEY = "rtg_cookie_consent";
const VERSION = 1; // bump to ask everyone again if the policy changes
const MAX_AGE = 60 * 60 * 24 * 180; // re-ask after about 6 months

type Choice = "all" | "essential";
type Saved = { v: number; choice: Choice; t: number };

function readCookie(): Saved | null {
  try {
    const m = document.cookie.match(new RegExp("(?:^|; )" + KEY + "=([^;]*)"));
    return m ? JSON.parse(decodeURIComponent(m[1])) : null;
  } catch {
    return null;
  }
}

function load(): Saved | null {
  let s: Saved | null = null;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) s = JSON.parse(raw);
  } catch {}
  if (!s) s = readCookie(); // fallback when localStorage is blocked
  if (!s || s.v !== VERSION) return null;
  if (Date.now() - s.t > MAX_AGE * 1000) return null;
  return s;
}

function save(choice: Choice) {
  const s: Saved = { v: VERSION, choice, t: Date.now() };
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
  try {
    document.cookie = `${KEY}=${encodeURIComponent(JSON.stringify(s))}; max-age=${MAX_AGE}; path=/; SameSite=Lax${
      location.protocol === "https:" ? "; Secure" : ""
    }`;
  } catch {}
  (window as unknown as { rtgConsent?: Choice }).rtgConsent = choice;
  window.dispatchEvent(new CustomEvent("rtg:consent", { detail: choice }));
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = load();
    if (s) (window as unknown as { rtgConsent?: Choice }).rtgConsent = s.choice;
    setOpen(!s);
    setReady(true);
    const reopen = () => setOpen(true);
    window.addEventListener("rtg:cookie-settings", reopen);
    return () => window.removeEventListener("rtg:cookie-settings", reopen);
  }, []);

  if (!ready || !open) return null;

  const choose = (c: Choice) => {
    save(c);
    setOpen(false);
  };

  return (
    <div className="ck" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="ck-text">
        <strong>Cookies, kept simple.</strong>
        <p>
          We use essential storage to run the site and remember your choice. With your OK we may also use optional
          cookies to understand how the site is used. Read our <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
      <div className="ck-actions">
        <button className="ck-btn ck-ghost" onClick={() => choose("essential")}>
          Essential only
        </button>
        <button className="ck-btn ck-solid" onClick={() => choose("all")}>
          Accept all
        </button>
      </div>
    </div>
  );
}
