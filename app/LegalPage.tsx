import type { ReactNode } from "react";

export default function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="legal">
      <div className="legal-wrap">
        <a className="legal-back" href="/">
          ← Back to RTG
        </a>
        <p className="legal-eyebrow">Legal</p>
        <h1 className="legal-title">{title}</h1>
        <p className="legal-meta">Last updated {updated}</p>
        <p className="legal-intro">{intro}</p>
        <div className="legal-body">{children}</div>
        <div className="legal-foot">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="mailto:hello@rtg.studio">hello@rtg.studio</a>
        </div>
      </div>
    </main>
  );
}
