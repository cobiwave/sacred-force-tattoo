"use client";

import clsx from "clsx";
import { useRef } from "react";
import {
	motion,
	revealTimeline,
	splitWords,
	useMotion,
} from "@/app/_lib/motion";
import { HeroVideo } from "../HeroVideo/HeroVideo";
import styles from "./Hero.module.css";

export function Hero() {
	const containerRef = useRef<HTMLElement>(null);
	const metaRef = useRef<HTMLDivElement>(null);
	const overlineRef = useRef<HTMLParagraphElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);

	useMotion(containerRef, {
		full: () => {
			const title = splitWords(titleRef.current);
			const timeline = revealTimeline();

			if (title) {
				timeline.from(title.words, {
					yPercent: motion.maskOffset,
					autoAlpha: 0,
					stagger: motion.stagger.words,
				});
			}

			timeline.from(
				[metaRef.current, overlineRef.current, bottomRef.current],
				{ y: motion.y, autoAlpha: 0, stagger: 0.12 },
				"-=0.45",
			);
		},
	});

	return (
		<section
			ref={containerRef}
			data-reveal
			id="inicio"
			className={styles.hero}
			aria-labelledby="hero-title"
		>
			<HeroVideo className={styles.video} />
			<div className={styles.shade} />

			<div ref={metaRef} className={clsx("mono", styles.meta)}>
				<span>TRIBUNALES · BUENOS AIRES</span>
			</div>

			<div className={clsx("container", styles.content)}>
				<p ref={overlineRef} className={clsx("mono", styles.overline)}>
					ESTUDIO DE TATUAJES · DESDE BUENOS AIRES
				</p>
				<h1 ref={titleRef} id="hero-title" aria-label="Sacred Force">
					SACRED
					<br />
					<span>FORCE</span>
				</h1>
				<div ref={bottomRef} className={styles.bottom}>
					<h2>Bienvenidos</h2>
					<a href="#intro" className={clsx("mono", styles.scrollLink)}>
						DESLIZÁ PARA EXPLORAR <span>↓</span>
					</a>
				</div>
			</div>
		</section>
	);
}
