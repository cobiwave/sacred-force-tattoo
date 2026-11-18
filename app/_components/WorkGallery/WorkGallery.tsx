"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./WorkGallery.module.css";

type WorkCategory = "small" | "medium" | "large";
type WorkGalleryProps = { category: WorkCategory; title: string };

export function WorkGallery({ category, title }: WorkGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const items = Array.from({ length: 6 }, (_, index) => ({
    src: `/assets/works/${category}/foto-${index + 1}.svg`,
    alt: `Placeholder para foto real de tatuaje ${index + 1}`,
  }));

  useEffect(() => {
    if (activeIndex === null) {
      returnFocus.current?.focus();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? null : (index + items.length - 1) % items.length);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? null : (index + 1) % items.length);
      if (event.key === "Tab") {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-lightbox] button"));
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, items.length]);

  const open = (index: number, target: HTMLElement) => {
    returnFocus.current = target;
    setActiveIndex(index);
  };

  return (
    <>
      <section className={`${styles.gallery} container`} aria-label={`Galería de ${title}`}>
        {items.map((item, index) => (
          <button
            className={`${styles.item} ${styles[`item${index + 1}`]}`}
            type="button"
            key={item.src}
            aria-label={`Ver foto de trabajo ${index + 1}`}
            onClick={(event) => open(index, event.currentTarget)}
          >
            <Image src={item.src} alt={item.alt} width={720} height={960} loading={index < 2 ? "eager" : "lazy"} />
            <span className="mono">FOTO REAL PENDIENTE · {String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </section>
      {activeIndex !== null ? (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Visor de imágenes" data-lightbox onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveIndex(null); }}>
          <button ref={closeButton} className={styles.close} type="button" aria-label="Cerrar visor" onClick={() => setActiveIndex(null)}>×</button>
          <button className={styles.previous} type="button" aria-label="Imagen anterior" onClick={() => setActiveIndex((activeIndex + items.length - 1) % items.length)}>←</button>
          <Image className={styles.lightboxImage} src={items[activeIndex].src} alt={items[activeIndex].alt} width={1000} height={1200} priority />
          <button className={styles.next} type="button" aria-label="Imagen siguiente" onClick={() => setActiveIndex((activeIndex + 1) % items.length)}>→</button>
          <p className={`${styles.count} mono`}>{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p>
        </div>
      ) : null}
    </>
  );
}
