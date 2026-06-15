const benefits = [
  {
    icon: "workspace_premium",
    color: "var(--secondary)",
    title: "Unlimited Habits",
    description: "Track every aspect of your life without restrictions or caps.",
  },
  {
    icon: "insights",
    color: "var(--tertiary)",
    title: "Deep Analytics",
    description: "Visual trends and monthly performance insights to keep you on track.",
  },
  {
    icon: "cloud_sync",
    color: "var(--secondary)",
    title: "Cloud Sync",
    description: "Access your data across all devices with instant, secure sync.",
  },
  {
    icon: "group",
    color: "var(--tertiary)",
    title: "Private Circles",
    description: "Form groups with friends and build habits together in private.",
  },
];

export function PricingBenefits() {
  return (
    <section className="flex flex-col gap-4">
      {/* Hero area */}
      <div className="text-center flex flex-col gap-2 pb-2">
        <h1
          className="text-[32px] font-bold leading-tight"
          style={{ color: "var(--on-surface)" }}
        >
          Level Up Your Life
        </h1>
        <p
          className="text-[18px]"
          style={{ color: "var(--on-surface-variant)" }}
        >
          Unlock all premium features and accelerate your personal growth journey.
        </p>
      </div>

      {/* 2×2 bento grid */}
      <div className="grid grid-cols-2 gap-3">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="p-5 rounded-xl flex flex-col gap-3 shadow-sm"
            style={{ backgroundColor: "var(--surface-container-low)" }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 32,
                color: b.color,
                fontVariationSettings: "'FILL' 1",
              }}
            >
              {b.icon}
            </span>
            <h3
              className="text-[15px] font-bold leading-snug"
              style={{ color: "var(--on-surface)" }}
            >
              {b.title}
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--on-surface-variant)" }}
            >
              {b.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}