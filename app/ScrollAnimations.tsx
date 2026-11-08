"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ease = "power3.out";

export default function ScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | undefined;
    let tries = 0;

    // rtg.js renders parts of the page (work grid, reviews) after load,
    // so wait for them before wiring up the triggers.
    const start = () => {
      const ready = document.querySelector("#workGrid .gl-work");
      if (!ready && tries++ < 40) {
        timer = window.setTimeout(start, 100);
        return;
      }

      ctx = gsap.context(() => {
        // Section headings
        gsap.utils.toArray<HTMLElement>(".section").forEach((section) => {
          const head = section.querySelectorAll(
            ".section-label, .section-title, .section-subtitle"
          );
          if (!head.length) return;
          gsap.from(head, {
            y: 26,
            opacity: 0,
            duration: 0.65,
            ease,
            stagger: 0.08,
            scrollTrigger: { trigger: section, start: "top 92%", once: true },
          });
        });

        const batch = (selector: string, y = 50) => {
          const els = document.querySelectorAll(selector);
          if (!els.length) return;
          gsap.set(els, { opacity: 0, y });
          ScrollTrigger.batch(els, {
            start: "top 96%",
            once: true,
            onEnter: (items) =>
              gsap.to(items, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease,
                stagger: 0.07,
                overwrite: true,
                clearProps: "opacity,transform",
              }),
          });
        };

        batch("#workGrid .gl-work", 70);
        batch(".results-stats .result-stat", 30);
        batch(".reviews-grid .review-card", 40);
        batch(".faq-list > *", 24);

        // Larger blocks: gentle rise + scale
        gsap.utils
          .toArray<HTMLElement>(".pr-shell, .cta-band, .footer")
          .forEach((el) => {
            gsap.from(el, {
              y: 60,
              opacity: 0,
              scale: 0.98,
              duration: 1.1,
              ease,
              clearProps: "opacity,transform",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
          });

        ScrollTrigger.refresh();
      });
    };

    let timer = window.setTimeout(start, 0);
    return () => {
      window.clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return null;
}
