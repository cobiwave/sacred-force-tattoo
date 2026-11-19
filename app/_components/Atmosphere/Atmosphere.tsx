"use client";

import Image from "next/image";
import { useRef } from "react";
import {
	childrenOf,
	motion,
	revealTimeline,
	useMotion,
} from "@/app/_lib/motion";
import styles from "./Atmosphere.module.css";

export function Atmosphere() {
	const containerRef = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLElement>(null);
	const copyRef = useRef<HTMLDivElement>(null);

	useMotion(containerRef, {
		full: () => {
			revealTimeline(containerRef.current)
				// Image wipes up from the bottom edge while settling from a slight zoom.
				.from(imageRef.current, { clipPath: "inset(100% 0% 0% 0%)" })
				.from(
					imageRef.current?.querySelector("img") ?? null,
					{ scale: 1.2 },
					"<",
				)
				.from(
					childrenOf(copyRef.current),
					{ y: motion.y, autoAlpha: 0, stagger: motion.stagger.items },
					"<0.3",
				);
		},
	});

	return (
		<section
			ref={containerRef}
			data-reveal
			className={styles.atmosphere}
			aria-label="El estudio"
		>
			<div className="container">
				<figure ref={imageRef} className={styles.image}>
					<Image
						src="/assets/atmosphere/studio.jpg"
						alt="Sacred Force Tattoo Studio"
						width={1200}
						height={800}
					/>
					<figcaption className="mono">SACRED FORCE TATTOO STUDIO</figcaption>
				</figure>
				<div ref={copyRef} className={styles.copy}>
					<p className="mono">LAVALLE 1282 · CABA</p>
					<p>
						Un espacio para pensar el proyecto, preparar cada detalle y trabajar
						con tiempo.
					</p>
				</div>
			</div>
		</section>
	);
}
