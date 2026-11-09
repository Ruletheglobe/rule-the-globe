"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="legal-link-btn"
      onClick={() => window.dispatchEvent(new Event("rtg:cookie-settings"))}
    >
      Cookie settings
    </button>
  );
}
