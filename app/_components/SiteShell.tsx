import Link from "next/link";
import styles from "./SiteShell.module.css";

type SiteHeaderProps = { sectionLinks?: boolean };

export function SiteHeader({ sectionLinks = false }: SiteHeaderProps) {
  const prefix = sectionLinks ? "" : "/";
  return (
    <>
      <a className="skip-link" href="#contenido">Ir al contenido</a>
      <header className={styles.header}>
        <Link className={styles.mark} href="/" aria-label="Sacred Force Tattoo, inicio">SF<span>®</span></Link>
        <nav aria-label="Navegación principal">
          <Link href={`${prefix}#inicio`}>Inicio</Link>
          <Link href={`${prefix}#equipo`}>Equipo</Link>
          <Link href={`${prefix}#trabajos`}>Trabajos</Link>
          <Link href={`${prefix}#contacto`}>Contacto</Link>
        </nav>
        <a className={styles.reserve} href="https://wa.me/5491124019045" target="_blank" rel="noreferrer">Reservar ↗</a>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Link className={styles.wordmark} href="/">SACRED FORCE</Link>
      <span className={styles.meta}>LAVALLE 1282 · TRIBUNALES · CABA</span>
      <a className={styles.meta} href="https://www.instagram.com/sacredforcetattoo/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
      <span className={styles.meta}>© 2026 SF</span>
    </footer>
  );
}
