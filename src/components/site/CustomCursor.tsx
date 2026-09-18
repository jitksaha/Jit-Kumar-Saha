import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const target = useRef({ x: -80, y: -80 });
  const current = useRef({ x: -80, y: -80 });

  useEffect(() => {
    const root = document.body;
    root.classList.add("has-custom-cursor");
    const cursor = cursorRef.current;

    const render = () => {
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;
      if (cursor) {
        cursor.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      frameRef.current = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      cursor?.classList.add("is-visible");
    };
    const leave = () => cursor?.classList.remove("is-visible");
    const over = (event: PointerEvent) => {
      const element = event.target as HTMLElement | null;
      cursor?.classList.toggle("is-link", Boolean(element?.closest("a, button, [role='button']")));
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <svg viewBox="0 0 32 32" focusable="false">
        <path d="M4 3.5 27.2 11c1.8.6 1.9 2.9.2 3.7l-8.7 4.1-3.4 8.9c-.7 1.8-3.2 1.8-3.8-.1L4 3.5Z" />
      </svg>
    </div>
  );
}
