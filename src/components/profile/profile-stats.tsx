export function ProfileStats() {
  return (
    <section className="grid grid-cols-2 gap-4">
      {/* Streak card */}
      <div
        className="p-6 rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform duration-200"
        style={{ backgroundColor: "var(--surface-container-low)" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
          style={{ backgroundColor: "color-mix(in srgb, var(--secondary-container) 30%, transparent)" }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 28,
              color: "var(--secondary)",
              fontVariationSettings: "'FILL' 1",
            }}
          >
            local_fire_department
          </span>
        </div>
        <span
          className="text-[42px] font-extrabold leading-none"
          style={{ color: "var(--secondary)" }}
        >
          14
        </span>
        <span
          className="text-[11px] font-bold tracking-widest uppercase"
          style={{ color: "var(--on-surface-variant)" }}
        >
          Day Streak
        </span>
      </div>

      {/* Plan card */}
      <div
        className="p-6 rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform duration-200"
        style={{
          backgroundColor: "var(--primary-container)",
          border: "1px solid color-mix(in srgb, var(--outline-variant) 10%, transparent)",
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
          style={{ backgroundColor: "color-mix(in srgb, var(--tertiary-fixed) 30%, transparent)" }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 28, color: "var(--tertiary)" }}
          >
            verified
          </span>
        </div>
        <span
          className="text-[20px] font-bold"
          style={{ color: "var(--tertiary)" }}
        >
          Premium
        </span>
        <span
          className="text-[11px] font-bold tracking-widest uppercase"
          style={{ color: "var(--on-surface-variant)" }}
        >
          Annual Plan
        </span>
      </div>
    </section>
  );
}