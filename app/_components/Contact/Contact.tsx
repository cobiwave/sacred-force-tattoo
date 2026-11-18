"use client";

import clsx from "clsx";
import { useRef } from "react";
import { childrenOf, motion, revealTimeline, splitWords, useMotion } from "@/app/_lib/motion";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import styles from "./Contact.module.css";

const whatsapp = "https://wa.me/5491124019045";
const instagram = "https://www.instagram.com/sacredforcetattoo/";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaTitleRef = useRef<HTMLParagraphElement>(null);
  const ctaLinksRef = useRef<HTMLDivElement>(null);

  useMotion(containerRef, {
    full: () => {
      revealTimeline(containerRef.current)
        .from(childrenOf(headingRef.current), {
          autoAlpha: 0,
          y: 16,
          stagger: motion.stagger.words,
        })
        .from(
          childrenOf(gridRef.current),
          { autoAlpha: 0, y: motion.y, stagger: 0.08 },
          "<0.2",
        );

      // The CTA sits further down, so it gets its own trigger.
      const ctaTitle = splitWords(ctaTitleRef.current);
      const cta = revealTimeline(ctaRef.current);
      if (ctaTitle) {
        cta.from(ctaTitle.words, {
          yPercent: motion.maskOffset,
          stagger: motion.stagger.words,
        });
      }
      cta.from(
        childrenOf(ctaLinksRef.current),
        { autoAlpha: 0, y: motion.y, stagger: motion.stagger.items },
        "<0.3",
      );
    },
  });

  return (
    <section
      ref={containerRef}
      data-reveal
      id="contacto"
      className={styles.contact}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <SectionHeading ref={headingRef} id="contact-title" index="04" kicker="ENCONTRANOS" title="Contacto" />

        <div ref={gridRef} className={clsx("subgrid", styles.grid)}>
          <div className={styles.cell}>
            <p className="mono">SEGUINOS</p>
            <a href={instagram} target="_blank" rel="noreferrer">@sacredforcetattoo ↗</a>
          </div>
          <div className={styles.cell}>
            <p className="mono">DIRECCIÓN</p>
            <a href="https://maps.google.com/?cid=4829144903845598520" target="_blank" rel="noreferrer">
              Lavalle 1282<br />Tribunales, CABA<br />Buenos Aires, Argentina ↗
            </a>
          </div>
          <div className={styles.cell}>
            <p className="mono">MANAGER · DAVID ARANA</p>
            <a href="tel:+5491124019045">+54 9 11 2401-9045</a>
            <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
            <a href="https://www.instagram.com/david__arana/" target="_blank" rel="noreferrer">@david__arana ↗</a>
          </div>
          <div className={styles.cell}>
            <p className="mono">EMAIL</p>
            <a href="mailto:info.sftattoo@gmail.com">info.sftattoo@gmail.com ↗</a>
          </div>
        </div>

        <div ref={ctaRef} className={clsx("subgrid", styles.cta)}>
          <p ref={ctaTitleRef}>¿Tenés una idea?</p>
          <div ref={ctaLinksRef}>
            <a href={whatsapp} target="_blank" rel="noreferrer">RESERVÁ TU SESIÓN POR WHATSAPP ↗</a>
            <a href={instagram} target="_blank" rel="noreferrer">O ESCRIBINOS POR INSTAGRAM ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
