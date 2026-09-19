export interface VerifiedBadgeProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  title?: string;
}

const sizeClasses: Record<NonNullable<VerifiedBadgeProps["size"]>, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function VerifiedBadge({
  className = "",
  size = "sm",
  title = "Verified Account",
}: VerifiedBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center ${className}`}
      title={title}
      role="img"
      aria-label={title}
    >
      <svg
        className={`${sizeClasses[size]} fill-current text-indigo-600 drop-shadow-xs dark:text-indigo-400`}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.25 1.273 2.62 2.148 4.2 2.148 1.58 0 2.95-.875 3.6-2.148.435-.154.905-.238 1.4-.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.25 2.148-2.62 2.148-4.2zM9.7 16.6L5.4 12.3l1.4-1.4 2.9 2.9 7.3-7.3 1.4 1.4-8.7 8.7z" />
      </svg>
    </span>
  );
}

export default VerifiedBadge;
