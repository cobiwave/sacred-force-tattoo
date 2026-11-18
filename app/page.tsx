import { Atmosphere } from "./_components/Atmosphere/Atmosphere";
import { Contact } from "./_components/Contact/Contact";
import { Hero } from "./_components/Hero/Hero";
import { Intro } from "./_components/Intro/Intro";
import { SiteFooter, SiteHeader } from "./_components/SiteShell/SiteShell";
import { Team } from "./_components/Team/Team";
import { Works } from "./_components/Works/Works";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <SiteHeader sectionLinks />
      <main id="contenido" className={styles.page}>
        <Hero />
        <Intro />
        <Team />
        <Works />
        <Atmosphere />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
