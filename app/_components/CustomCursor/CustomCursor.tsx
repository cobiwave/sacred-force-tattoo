"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/app/_lib/motion";
import styles from "./CustomCursor.module.css";

export function CustomCursor() {
	const cursor = useRef<HTMLSpanElement | null>(null);

	useGSAP(
		() => {
			const node = cursor.current;
			if (
				!node ||
				!window.matchMedia("(pointer: fine)").matches ||
				window.matchMedia("(prefers-reduced-motion: reduce)").matches
			)
				return;
			const xTo = gsap.quickTo(node, "x", {
				duration: 0.22,
				ease: "power3.out",
			});
			const yTo = gsap.quickTo(node, "y", {
				duration: 0.22,
				ease: "power3.out",
			});
			const onMove = (event: PointerEvent) => {
				xTo(event.clientX);
				yTo(event.clientY);
			};
			const onEnter = (event: Event) => {
				if ((event.target as Element | null)?.closest("a, button"))
					node.classList.add(styles.link);
			};
			const onLeave = (event: Event) => {
				if ((event.target as Element | null)?.closest("a, button"))
					node.classList.remove(styles.link);
			};
			window.addEventListener("pointermove", onMove, { passive: true });
			document.addEventListener("pointerover", onEnter);
			document.addEventListener("pointerout", onLeave);
			return () => {
				window.removeEventListener("pointermove", onMove);
				document.removeEventListener("pointerover", onEnter);
				document.removeEventListener("pointerout", onLeave);
			};
		},
		{ scope: cursor },
	);

	return <span ref={cursor} className={styles.cursor} aria-hidden="true" />;
}
