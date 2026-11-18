"use client";

import clsx from "clsx";
import { useRef } from "react";
import { motion, revealTimeline, useMotion } from "@/app/_lib/motion";
import styles from "./Intro.module.css";

export function Intro() {
  const containerRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useMotion(containerRef, {
    full: () => {
      revealTimeline(containerRef.current)
        .from(kickerRef.current, { autoAlpha: 0, y: 16 })
        .from(
          [copyRef.current, linkRef.current],
          { y: motion.y, autoAlpha: 0, stagger: motion.stagger.items },
          "<0.2",
        );
    },
  });

  return (
    <section
      ref={containerRef}
      data-reveal
      id="intro"
      className={styles.intro}
      aria-labelledby="intro-title"
    >
      <div className="container">
        <p ref={kickerRef} className={clsx("mono", styles.kicker)}>01 — EL ESTUDIO</p>
        <div ref={copyRef} className={styles.copy}>
          <h2 id="intro-title">
            Un estudio de tatuajes en Buenos Aires, con foco en{" "}
            <em>la calidad, el oficio</em> y las ideas de cada persona.
          </h2>
          <p>
            Nuestro equipo acompaña cada proyecto de principio a fin para
            llevarlo a la piel con atención y criterio.
          </p>
        </div>
        <a ref={linkRef} className={clsx("mono", styles.link)} href="#equipo">
          CONOCÉ AL EQUIPO <span>↘</span>
        </a>
      </div>
    </section>
  );
}
