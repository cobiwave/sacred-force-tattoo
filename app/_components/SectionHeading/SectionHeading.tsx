import clsx from "clsx";
import type { Ref } from "react";
import styles from "./SectionHeading.module.css";

type Props = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  /**
   * `split` (default): kicker and title side by side on the grid.
   * `stacked`: kicker above the title, for headings that share a row.
   */
  layout?: "split" | "stacked";
  /**
   * The parent section animates the heading: pass a ref and reveal
   * `childrenOf(ref.current)` (kicker, then title) in its timeline.
   */
  ref?: Ref<HTMLDivElement>;
};

export function SectionHeading({ id, index, kicker, title, layout = "split", ref }: Props) {
  return (
    <div ref={ref} className={clsx(styles.heading, layout === "split" ? "subgrid" : styles.stacked)}>
      <p className={clsx("mono", styles.kicker)}>
        {index} — {kicker}
      </p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
