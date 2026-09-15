import { useEffect, useRef } from "react";

const words = [
  "OSDC",
  "Pizza",
  "Code",
  "Memes",
  "Linux",
  "LARP",
];

export default function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    let lastTime = performance.now();
    let animationFrame: number;

    const speed = 60;

    // Fill the track so there is always content across the banner.
    const fillTrack = () => {
      const tickerWidth = track.parentElement?.offsetWidth ?? 0;

      while (track.scrollWidth < tickerWidth * 2) {
        words.forEach((word) => {
          const span = document.createElement("span");
          span.textContent = `★ ${word}`;
          track.appendChild(span);
        });
      }
    };

    fillTrack();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      position -= speed * delta;

      const firstItem = track.firstElementChild as HTMLElement | null;

      if (firstItem && -position >= firstItem.offsetWidth) {
        position += firstItem.offsetWidth;
        track.appendChild(firstItem);
      }

      track.style.transform = `translate3d(${position}px, 0, 0)`;

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="ticker wenoselect">
      <div className="ticker-track wenoselect" ref={trackRef}>
        {words.map((word) => (
          <span key={word}>
            ★ {word}
          </span>
        ))}
      </div>
    </div>
  );
}
