"use client";

import { useEffect, useRef } from "react";

/** Soft cursor glow, back-to-top. Transform/opacity only. */
export default function PageFX() {
  const aura = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        top.current?.classList.toggle("on", window.scrollY > window.innerHeight * 0.9);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    let tx = 0, ty = 0, x = 0, y = 0, running = false, shown = false;
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      if (aura.current) aura.current.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.5) requestAnimationFrame(loop);
      else running = false;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        x = tx;
        y = ty;
        aura.current?.classList.add("on");
      }
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    };
    const onLeave = () => {
      shown = false;
      aura.current?.classList.remove("on");
    };
    if (fine && !reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="fx-aura" ref={aura} aria-hidden="true" />
      <button
        ref={top}
        className="fx-top"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
