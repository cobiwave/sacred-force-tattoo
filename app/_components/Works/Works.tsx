"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRef } from "react";
import { childrenOf, motion, revealTimeline, useMotion } from "@/app/_lib/motion";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import styles from "./Works.module.css";

const categories = [
  { number: "01", name: "Small Tattoos", href: "/trabajos/small" },
  { number: "02", name: "Medium Tattoos", href: "/trabajos/medium" },
  { number: "03", name: "Large Tattoos", href: "/trabajos/large" },
];

export function Works() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useMotion(containerRef, {
    full: () => {
      revealTimeline(containerRef.current)
        .from(childrenOf(headingRef.current), {
          autoAlpha: 0,
          y: 16,
          stagger: motion.stagger.words,
        })
        .from(leadRef.current, { autoAlpha: 0, y: motion.y }, "<0.2");

      // The list sits further down, so it gets its own trigger.
      revealTimeline(listRef.current).from(childrenOf(listRef.current), {
        x: -motion.y,
        autoAlpha: 0,
        stagger: motion.stagger.items,
      });
    },
  });

  return (
    <section
      ref={containerRef}
      data-reveal
      id="trabajos"
      className={styles.works}
      aria-labelledby="works-title"
    >
      <div className="container">
        <div className={clsx("subgrid", styles.head)}>
          <SectionHeading
            ref={headingRef}
            id="works-title"
            index="03"
            kicker="SELECCIÓN"
            title="Trabajos"
            layout="stacked"
          />
          <p ref={leadRef} className={styles.lead}>
            Acá vas a encontrar una selección de la variedad de trabajos que
            realizamos. Explorá los proyectos para conocer la calidad de
            nuestros tatuajes.
          </p>
        </div>

        <div ref={listRef} className={clsx("subgrid", styles.list)}>
          {categories.map((category) => (
            <Link className={clsx("subgrid", styles.category)} href={category.href} key={category.number}>
              <span className="mono">{category.number}</span>
              <span className={styles.title}>{category.name}</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
