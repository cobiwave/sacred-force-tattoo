import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkGallery } from "../../_components/WorkGallery";
import { SiteFooter, SiteHeader } from "../../_components/SiteShell";
import styles from "./GalleryPage.module.css";

const workCategories = {
  small: {
    title: "Small Tattoos",
    description: "Piezas pequeñas, pensadas para acompañar una idea con precisión.",
    next: "medium",
  },
  medium: {
    title: "Medium Tattoos",
    description: "Diseños de tamaño medio, con espacio para desarrollar cada detalle.",
    next: "large",
  },
  large: {
    title: "Large Tattoos",
    description: "Proyectos de gran escala, construidos en diálogo con cada persona.",
    next: "small",
  },
} as const;

type CategorySlug = keyof typeof workCategories;

export function generateStaticParams() {
  return Object.keys(workCategories).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[category]">): Promise<Metadata> {
  const { category } = await params;
  const details = workCategories[category as CategorySlug];
  return details ? { title: details.title, description: details.description } : {};
}

export default async function WorkCategoryPage({ params }: PageProps<"/trabajos/[category]">) {
  const { category } = await params;
  if (!(category in workCategories)) notFound();
  const slug = category as CategorySlug;
  const details = workCategories[slug];

  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <section className={styles.hero} aria-labelledby="gallery-title">
          <div className={`${styles.heroContent} container`}>
            <p className={`${styles.eyebrow} mono`}>SACRED FORCE · TRABAJOS / {slug.toUpperCase()}</p>
            <h1 id="gallery-title">{details.title}</h1>
            <p className={styles.description}>{details.description}</p>
            <div className={`${styles.controls} mono`}><Link href="/#trabajos">← VOLVER A TRABAJOS</Link><span>SELECCIÓN DE TRABAJOS</span></div>
          </div>
        </section>
        <WorkGallery category={slug} title={details.title} />
        <div className={`${styles.nextCategory} container`}>
          <span className="mono">SIGUIENTE CATEGORÍA</span>
          <Link href={`/trabajos/${details.next}`}>{workCategories[details.next].title} <span aria-hidden="true">↗</span></Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
