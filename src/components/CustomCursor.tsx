"use client";

import { useEffect, useRef, useState } from "react";

const RING_LERP = 0.12;

function isHoverTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("a, button, [data-hoverable]"));
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setVisible(true);

      dotRef.current?.style.setProperty(
        "transform",
        `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      );
    };

    const onOver = (e: MouseEvent) => {
      setHovering(isHoverTarget(e.target));
    };

    const onLeave = () => setVisible(false);

    let frame = 0;
    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * RING_LERP;
      ring.current.y += (mouse.current.y - ring.current.y) * RING_LERP;

      ringRef.current?.style.setProperty(
        "transform",
        `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      );

      frame = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={[
          "custom-cursor-ring",
          visible ? "is-visible" : "",
          hovering ? "is-hovering" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={[
          "custom-cursor-dot",
          visible ? "is-visible" : "",
          hovering ? "is-hovering" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      />
    </>
  );
}
