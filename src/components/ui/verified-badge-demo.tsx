import { VerifiedBadge } from "@/components/ui/verified-badge";

export default function VerifiedBadgeDemo() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6 font-sans">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Badge sizes
        </h3>
        <div className="flex flex-wrap items-center gap-6">
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <div className="flex items-center gap-2" key={size}>
              <VerifiedBadge size={size} />
              <span className="text-sm font-medium text-zinc-700">{size.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Profile context
        </h3>
        <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-sm font-bold text-white">
            JS
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-semibold text-zinc-900">Jit Kumar Saha</span>
              <VerifiedBadge size="xs" title="Verified portfolio" />
            </div>
            <p className="truncate text-xs text-zinc-500">Product, technology & business</p>
          </div>
        </div>
      </section>
    </div>
  );
}
