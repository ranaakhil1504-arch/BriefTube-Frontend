import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /**
   * Estimated height (px) of the section before it's rendered/measured.
   * Used as a layout-shift guard via contain-intrinsic-size — pass a
   * rough value close to the section's real height for best results.
   */
  minHeight?: number;
};

export default function LazySection({
  children,
  minHeight = 400,
}: Props) {
  // content-visibility: auto tells the browser to skip layout/style/paint
  // work for this section until it's near the viewport — the same
  // performance win the old IntersectionObserver approach was going for.
  //
  // Unlike the old approach, the children are always mounted in the DOM.
  // That matters for SEO/GEO: crawlers that don't execute JavaScript
  // (or don't simulate scrolling) need the real content present on
  // first render, not gated behind a visibility state that only
  // resolves after a scroll event fires in a real browser.
  const style: CSSProperties = {
    contentVisibility: "auto",
    containIntrinsicSize: `1px ${minHeight}px`,
  };

  return <div style={style}>{children}</div>;
}