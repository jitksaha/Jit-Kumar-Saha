import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.body;
    root.classList.add("has-custom-cursor");
    const cursor = cursorRef.current;

    const move = (event: PointerEvent) => {
      if (cursor) cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
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

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
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
