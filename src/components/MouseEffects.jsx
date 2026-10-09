import { useEffect, useRef } from "react";

const symbols = ["🏏", "🏆", "⚾", "✨", "🏏"];

export default function MouseEffects() {
  const layer = useRef(null);
  const last = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      const now = performance.now();
      if (now - last.current < 90) return;
      last.current = now;
      const el = document.createElement("span");
      el.className = "cursor-spark";
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.setProperty("--dx", `${(Math.random() - .5) * 90}px`);
      el.style.setProperty("--dy", `${-30 - Math.random() * 80}px`);
      el.style.setProperty("--rot", `${(Math.random() - .5) * 70}deg`);
      layer.current?.appendChild(el);
      setTimeout(() => el.remove(), 900);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={layer} className="cursor-effects" aria-hidden="true" />;
}
