"use client";

import { useEffect } from "react";
import { gsap } from "gsap";


/**
 * Pointer-driven and scroll-driven life for the page:
 * magnetic buttons, card spotlight, 3D tilt on work shots,
 * (no hero parallax).
 */
export default function Interactions() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Pointer effects (magnetic buttons, tilt, spotlight) are meaningless on touch: skip on phones
    if (window.matchMedia("(max-width: 820px), (hover: none) and (pointer: coarse)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const offs: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement | Document,
      type: K,
      fn: (e: HTMLElementEventMap[K]) => void
    ) => {
      el.addEventListener(type, fn as EventListener, { passive: true });
      offs.push(() => el.removeEventListener(type, fn as EventListener));
    };

    let ctx: gsap.Context | undefined;
    let tries = 0;
    let timer = 0;

    const start = () => {
      if (!document.querySelector("#workGrid .ba-stage, #workGrid .gl-shot") && tries++ < 40) {
        timer = window.setTimeout(start, 100);
        return;
      }

      // ---- "Compare all plans": slide the table down / up ----
      document.querySelectorAll<HTMLDetailsElement>("details.pr-compare").forEach((details) => {
        const summary = details.querySelector("summary");
        const body = details.querySelector<HTMLElement>(".pr-table-wrap");
        if (!summary || !body) return;
        let anim: Animation | null = null;
        const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
        const finish = () => {
          anim = null;
          body.style.overflow = "";
          details.classList.remove("is-closing");
        };
        // not passive: we need preventDefault to stop the native instant toggle
        const onClick = (e: MouseEvent) => {
          e.preventDefault();
          anim?.cancel();
          body.style.overflow = "hidden";
          if (!details.open || details.classList.contains("is-closing")) {
            details.classList.remove("is-closing");
            details.open = true;
            const h = body.scrollHeight;
            anim = body.animate(
              [
                { height: "0px", opacity: 0, transform: "translateY(-10px)" },
                { height: `${h}px`, opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 520, easing: ease }
            );
          } else {
            details.classList.add("is-closing");
            const h = body.offsetHeight;
            anim = body.animate(
              [
                { height: `${h}px`, opacity: 1, transform: "translateY(0)" },
                { height: "0px", opacity: 0, transform: "translateY(-10px)" },
              ],
              { duration: 380, easing: ease }
            );
            anim.onfinish = () => {
              details.open = false;
              finish();
            };
            return;
          }
          anim.onfinish = finish;
        };
        summary.addEventListener("click", onClick);
        offs.push(() => summary.removeEventListener("click", onClick));
      });

      ctx = gsap.context(() => {
        if (!fine) return;

        // ---- magnetic buttons ----
        document
          .querySelectorAll<HTMLElement>(".btn-primary, .btn-secondary, .nav-cta")
          .forEach((btn) => {
            const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
            const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
            on(btn, "pointermove", (e) => {
              const r = btn.getBoundingClientRect();
              xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
              yTo((e.clientY - (r.top + r.height / 2)) * 0.38);
            });
            on(btn, "pointerenter", () => gsap.to(btn, { scale: 1.04, duration: 0.3, ease: "power2.out" }));
            on(btn, "pointerleave", () => {
              xTo(0);
              yTo(0);
              gsap.to(btn, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" });
            });
          });

        // ---- 3D tilt on work screenshots ----
        document.querySelectorAll<HTMLElement>("#workGrid .gl-shot").forEach((shot) => {
          gsap.set(shot, { transformPerspective: 1100, transformOrigin: "center" });
          const rx = gsap.quickTo(shot, "rotationX", { duration: 0.6, ease: "power3.out" });
          const ry = gsap.quickTo(shot, "rotationY", { duration: 0.6, ease: "power3.out" });
          on(shot, "pointermove", (e) => {
            const r = shot.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ry(px * 9);
            rx(-py * 7);
            shot.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
            shot.style.setProperty("--my", `${(py + 0.5) * 100}%`);
          });
          on(shot, "pointerleave", () => {
            rx(0);
            ry(0);
          });
        });

        // ---- spotlight: cards light up toward the cursor ----
        const spotSel = ".how-card, .review-card, .svc-card, .proof-card, .pr-shell, .faq-item";
        on(document, "pointermove", (e) => {
          const el = (e.target as HTMLElement | null)?.closest?.(spotSel) as HTMLElement | null;
          if (!el) return;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
      });
    };

    timer = window.setTimeout(start, 0);
    return () => {
      window.clearTimeout(timer);
      offs.forEach((f) => f());
      ctx?.revert();
    };
  }, []);

  return null;
}
