"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import {
	childrenOf,
	motion,
	revealTimeline,
	useMotion,
} from "@/app/_lib/motion";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import styles from "./Team.module.css";

const artists = [
	{
		name: "Caro Gutiz",
		role: "TATUADORA",
		image: "/assets/team/caro.webp",
		instagram: "https://www.instagram.com/caro.gutiz/",
	},
	{
		name: "David Arana",
		role: "TATUADOR · MANAGER",
		image: "/assets/team/david-arana.webp",
		instagram: "https://www.instagram.com/david__arana/",
	},
];

export function Team() {
	const containerRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	useMotion(containerRef, {
		full: () => {
			revealTimeline(containerRef.current)
				.from(childrenOf(headingRef.current), {
					autoAlpha: 0,
					y: 16,
					stagger: motion.stagger.words,
				})
				.from(
					childrenOf(listRef.current),
					{ autoAlpha: 0, y: motion.y, stagger: motion.stagger.items },
					"<0.2",
				);
		},
	});

	return (
		<section
			ref={containerRef}
			data-reveal
			id="equipo"
			className={styles.team}
			aria-labelledby="team-title"
		>
			<div className="container">
				<SectionHeading
					ref={headingRef}
					id="team-title"
					index="02"
					kicker="LAS PERSONAS"
					title="Equipo"
				/>

				<div ref={listRef} className={clsx("subgrid", styles.grid)}>
					{artists.map((artist) => (
						<article className={styles.artist} key={artist.name}>
							<div className={styles.portrait}>
								<Image
									src={artist.image}
									alt={`${artist.name} tatuando en Sacred Force Tattoo`}
									width={600}
									height={750}
									sizes="(width <= 32em) 100vw, (width <= 75em) 50vw, 42vw"
								/>
							</div>
							<div className={styles.caption}>
								<div>
									<h3>{artist.name}</h3>
									<p className="mono">{artist.role}</p>
								</div>
								<a href={artist.instagram} target="_blank" rel="noreferrer">
									INSTAGRAM ↗
								</a>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
