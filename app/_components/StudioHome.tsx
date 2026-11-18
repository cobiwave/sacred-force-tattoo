"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotion, splitWords, revealTimeline, motion, gsap, childrenOf } from "../_lib/motion";
import { SiteFooter, SiteHeader } from "./SiteShell";
import styles from "./StudioHome.module.css";

const artists = [
  { name: "Caro", role: "TATUADORA", image: "/assets/team/caro.svg", instagram: "https://www.instagram.com/caro.gutiz/" },
  { name: "David Arana", role: "TATUADOR · MANAGER", image: "/assets/team/david.svg", instagram: "https://www.instagram.com/david__arana/" },
];

const categories = [
  { number: "01", name: "Small Tattoos", href: "/trabajos/small" },
  { number: "02", name: "Medium Tattoos", href: "/trabajos/medium" },
  { number: "03", name: "Large Tattoos", href: "/trabajos/large" },
];

export function StudioHome() {
  const pageRef = useRef<HTMLElement | null>(null);
  const [loaderPhase, setLoaderPhase] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    const video = pageRef.current?.querySelector("video");
    const showVideo = () => video?.parentElement?.classList.add(styles.hasVideo);
    let completed = false;
    let exitTimer: number | undefined;

    const finishLoading = () => {
      if (completed) return;
      completed = true;
      window.clearTimeout(fallbackTimer);
      video?.removeEventListener("canplay", finishLoading);
      video?.removeEventListener("error", finishLoading);
      video?.removeEventListener("loadeddata", showVideo);
      setLoaderPhase("leaving");
      exitTimer = window.setTimeout(() => setLoaderPhase("done"), 500);
    };

    const fallbackTimer = window.setTimeout(finishLoading, 2500);
    if (video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      showVideo();
    } else {
      video?.addEventListener("loadeddata", showVideo, { once: true });
    }

    if (!video || video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      finishLoading();
    } else {
      video.addEventListener("canplay", finishLoading, { once: true });
      video.addEventListener("error", finishLoading, { once: true });
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(exitTimer);
      video?.removeEventListener("canplay", finishLoading);
      video?.removeEventListener("error", finishLoading);
      video?.removeEventListener("loadeddata", showVideo);
    };
  }, []);

  useMotion(pageRef, {
    full: () => {
      const root = pageRef.current;
      if (!root) return;
      const select = gsap.utils.selector(root);
      const title = splitWords(root.querySelector("[data-hero-title]"));
      const hero = revealTimeline();
      if (title) hero.from(title.words, { yPercent: motion.maskOffset, autoAlpha: 0, stagger: motion.stagger.words });
      hero.from(select("[data-hero-meta], [data-hero-bottom]"), { y: motion.y, autoAlpha: 0, stagger: 0.12 }, "-=0.45");

      const intro = root.querySelector("[data-intro]");
      revealTimeline(intro).from(select("[data-intro-copy], [data-intro-link]"), { y: motion.y, autoAlpha: 0, stagger: motion.stagger.items });

      const team = root.querySelector("[data-team]");
      const artistCards = team ? gsap.utils.toArray<HTMLElement>(team.querySelectorAll("[data-artist]")) : [];
      revealTimeline(team).from(artistCards, { y: motion.y, autoAlpha: 0, stagger: motion.stagger.items });

      const work = root.querySelector("[data-work]");
      const categoryLinks = work ? childrenOf(work.querySelector("[data-category-list]")) : [];
      revealTimeline(work).from(categoryLinks, { x: -motion.y, autoAlpha: 0, stagger: motion.stagger.items });

      const contact = root.querySelector("[data-contact]");
      const contactCells = contact ? gsap.utils.toArray<HTMLElement>(contact.querySelectorAll("[data-contact-cell]")) : [];
      revealTimeline(contact).from(contactCells, { y: motion.y, autoAlpha: 0, stagger: 0.08 });
    },
  });

  return (
    <>
      {loaderPhase !== "done" && (
        <div
          className={styles.preloader + (loaderPhase === "leaving" ? " " + styles.preloaderLeaving : "")}
          data-preloader
          role="status"
          aria-live="polite"
        >
          <p className={styles.preloaderMark} aria-hidden="true">SACRED<br />FORCE</p>
          <p className={styles.preloaderLabel + " mono"}>PREPARANDO EL ESTUDIO</p>
        </div>
      )}
      <SiteHeader sectionLinks />
      <main id="contenido" ref={pageRef} className={styles.page} data-reveal>
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <video className={styles.heroVideo} autoPlay muted loop playsInline preload="auto" poster="/assets/atmosphere/studio-poster.svg" aria-label="Interior del estudio Sacred Force Tattoo">
            <source src="/assets/video/bg-video.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroShade} />
          <div className={`${styles.heroMeta} mono`} data-hero-meta>
            <span>TRIBUNALES · BUENOS AIRES</span><span>34°36′S 58°23′W</span>
          </div>
          <div className={`${styles.heroContent} container`}>
            <p className={`${styles.heroOverline} mono`} data-hero-meta>ESTUDIO DE TATUAJES · DESDE BUENOS AIRES</p>
            <h1 id="hero-title" aria-label="Sacred Force" data-hero-title>SACRED<br /><span>FORCE</span></h1>
            <div className={styles.heroBottom} data-hero-bottom>
              <h2>Bienvenidos</h2><a href="#intro" className={`${styles.scrollLink} mono`}>DESLIZÁ PARA EXPLORAR <span>↓</span></a>
            </div>
          </div>
          <span className={`${styles.heroIndex} mono`}>SF — 01 / 04</span>
        </section>

        <section className={`${styles.section} ${styles.intro}`} id="intro" data-intro aria-labelledby="intro-title">
          <div className="container">
            <p className={`${styles.kicker} mono`}>01 — EL ESTUDIO</p>
            <div className={styles.introCopy} data-intro-copy>
              <h2 id="intro-title">Un estudio de tatuajes en Buenos Aires, con foco en <em>la calidad, el oficio</em> y las ideas de cada persona.</h2>
              <p>Nuestro equipo acompaña cada proyecto de principio a fin para llevarlo a la piel con atención y criterio.</p>
            </div>
            <a className={`${styles.textLink} mono`} href="#equipo" data-intro-link>CONOCÉ AL EQUIPO <span>↘</span></a>
          </div>
        </section>

        <section className={`${styles.section} ${styles.team}`} id="equipo" data-team aria-labelledby="team-title">
          <div className="container">
            <div className={`${styles.sectionHead} subgrid`}>
              <p className={`${styles.kicker} mono`}>02 — LAS PERSONAS</p><h2 id="team-title">Equipo</h2>
            </div>
            <div className={`${styles.teamGrid} subgrid`}>
              {artists.map((artist, index) => (
                <article className={styles.artist} data-artist key={artist.name}>
                  <div className={`${styles.portrait} ${index === 1 ? styles.portraitOffset : ""}`}>
                    <Image src={artist.image} alt={`Placeholder de retrato para ${artist.name}`} width={600} height={750} />
                    <span className="mono">FOTO REAL PENDIENTE</span>
                  </div>
                  <div className={styles.artistCaption}>
                    <div><h3>{artist.name}</h3><p className="mono">{artist.role}</p></div>
                    <a href={artist.instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.works}`} id="trabajos" data-work aria-labelledby="works-title">
          <div className="container">
            <div className={`${styles.sectionHead} ${styles.worksHead} subgrid`}>
              <div><p className={`${styles.kicker} mono`}>03 — SELECCIÓN</p><h2 id="works-title">Trabajos</h2></div>
              <p className={styles.worksIntro}>Acá vas a encontrar una selección de la variedad de trabajos que realizamos. Explorá los proyectos para conocer la calidad de nuestros tatuajes.</p>
            </div>
            <div className={`${styles.categoryList} subgrid`} data-category-list>
              {categories.map((category) => (
                <Link className={`${styles.category} subgrid`} href={category.href} key={category.number}>
                  <span className="mono">{category.number}</span><span className={styles.categoryTitle}>{category.name}</span><span className={styles.categoryArrow} aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.atmosphere}`} aria-label="El estudio">
          <div className="container">
            <figure className={styles.atmoImage}>
              <Image src="/assets/atmosphere/studio-interior.svg" alt="Placeholder de fotografía del interior del estudio" width={1200} height={800} />
              <figcaption className="mono">IMAGEN DE AMBIENTE · REEMPLAZAR</figcaption>
            </figure>
            <div className={styles.atmoCopy}><p className={`${styles.kicker} mono`}>LAVALLE 1282 · CABA</p><p>Un espacio para pensar el proyecto, preparar cada detalle y trabajar con tiempo.</p></div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.contact}`} id="contacto" data-contact aria-labelledby="contact-title">
          <div className="container">
            <div className={`${styles.sectionHead} subgrid`}><p className={`${styles.kicker} mono`}>04 — ENCONTRANOS</p><h2 id="contact-title">Contacto</h2></div>
            <div className={`${styles.contactGrid} subgrid`}>
              <div className={styles.contactCell} data-contact-cell><p className="mono">SEGUINOS</p><a href="https://www.instagram.com/sacredforcetattoo/" target="_blank" rel="noreferrer">@sacredforcetattoo ↗</a></div>
              <div className={styles.contactCell} data-contact-cell><p className="mono">DIRECCIÓN</p><a href="https://maps.google.com/?q=Lavalle+1282,+Tribunales,+CABA,+Buenos+Aires,+Argentina" target="_blank" rel="noreferrer">Lavalle 1282<br />Tribunales, CABA<br />Buenos Aires, Argentina ↗</a></div>
              <div className={styles.contactCell} data-contact-cell><p className="mono">MANAGER · DAVID ARANA</p><a href="tel:+5491124019045">+54 9 11 2401-9045</a><a href="https://wa.me/5491124019045" target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="https://www.instagram.com/david__arana/" target="_blank" rel="noreferrer">@david__arana ↗</a></div>
              <div className={styles.contactCell} data-contact-cell><p className="mono">EMAIL</p><a href="mailto:info.sftattoo@gmail.com">info.sftattoo@gmail.com ↗</a></div>
            </div>
            <div className={`${styles.contactCta} subgrid`}><p>¿Tenés una idea?</p><div><a href="https://wa.me/5491124019045" target="_blank" rel="noreferrer">RESERVÁ TU SESIÓN POR WHATSAPP ↗</a><a href="https://www.instagram.com/sacredforcetattoo/" target="_blank" rel="noreferrer">O ESCRIBINOS POR INSTAGRAM ↗</a></div></div>
          </div>
        </section>
      </main>
      <SiteFooter />

    </>
  );
}
