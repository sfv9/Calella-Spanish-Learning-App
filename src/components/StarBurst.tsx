import { useEffect } from "react";

const STARS = ["⭐", "✨", "🌟", "⭐", "✨", "🌟"];
const OFFSETS = ["8%", "22%", "37%", "53%", "68%", "83%"];

export function StarBurst({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 800);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {STARS.map((star, i) => (
        <span
          key={i}
          className="star-float bottom-1/2"
          style={{ left: OFFSETS[i], animationDelay: `${i * 55}ms` }}
        >
          {star}
        </span>
      ))}
    </div>
  );
}
