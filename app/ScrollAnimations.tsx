"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ease = "power3.out";

export default function ScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia("(max-width: 820px), (hover: none) and (pointer: coarse)").matches) {
      // phones: fades still run with Reduce Motion on (CSS drops the movement)
      return mobileReveals();
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Phones: skip the GSAP reveals entirely (content simply shows). It removes dozens of
    // opacity/transform tweens and ScrollTriggers that were adding to lag and memory pressure.

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

/**
 * Phones: a light reveal system instead of GSAP. One IntersectionObserver adds a
 * class, CSS runs an opacity/transform transition (compositor only), then the
 * element is unobserved. rtg.js builds some blocks after load, so it rescans briefly.
 */
const MOBILE_TARGETS = [
  ".section-label", ".section-title", ".section-subtitle",
  ".ba-stage", ".ba-info", ".ba-tabs",
  ".sys-acc > *", ".pr-shell", ".xs-card", ".results-stats .result-stat",
  ".team-card", ".faq-list > *", ".faq-art", ".cta-band", ".footer-grid > *",
].join(",");

function mobileReveals() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("m-in");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  const seen = new WeakSet<Element>();
  const scan = () => {
    const vh = window.innerHeight;
    document.querySelectorAll<HTMLElement>(MOBILE_TARGETS).forEach((el) => {
      if (seen.has(el) || el.closest(".hero")) return;
      seen.add(el);
      // anything already on screen stays put: no flash
      if (el.getBoundingClientRect().top < vh * 0.9) return;
      const sibs = el.parentElement ? Array.from(el.parentElement.children) : [];
      const i = Math.min(sibs.indexOf(el), 4);
      if (i > 0) el.style.transitionDelay = `${i * 70}ms`;
      el.classList.add("m-rev");
      io.observe(el);
    });
  };
  scan();
  let n = 0;
  const timer = window.setInterval(() => {
    scan();
    if (++n > 15) window.clearInterval(timer);
  }, 200);
  return () => {
    window.clearInterval(timer);
    io.disconnect();
  };
}
