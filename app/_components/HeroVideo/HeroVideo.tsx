"use client";

import { useEffect, useRef } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/*
  Decorative background video. There is no `autoPlay` attribute on purpose:
  playback starts from JS only when the user has not asked for reduced motion,
  so those users only see the poster. It also reacts if the setting changes.
*/
export function HeroVideo({ className }: { className?: string }) {
	const ref = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = ref.current;
		if (!video) return;

		const query = window.matchMedia(REDUCED_MOTION);
		const sync = () => {
			if (query.matches) {
				video.pause();
			} else {
				// play() rejects if the browser blocks autoplay; the poster stays.
				video.play().catch(() => {});
			}
		};

		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);

	return (
		<video
			ref={ref}
			className={className}
			poster="/assets/video/bg-video-poster.webp"
			muted
			loop
			playsInline
			preload="metadata"
			aria-hidden="true"
			tabIndex={-1}
		>
			<source src="/assets/video/bg-video.webm" type="video/webm" />
			<source src="/assets/video/bg-video.mp4" type="video/mp4" />
		</video>
	);
}
