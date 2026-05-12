interface Edition {
  id: number;
  title: string;
  period: string;
  days: string;
  icon: string;
  iconBg: string;       // CSS var name e.g. "--secondary-fixed"
  iconColor: string;    // CSS var name e.g. "--on-secondary-fixed-variant"
}

const editions: Edition[] = [
  {
    id: 1,
    title: "Daily Hydration",
    period: "March 2024",
    days: "30/30 Days",
    icon: "water_drop",
    iconBg: "--secondary-fixed",
    iconColor: "--on-secondary-fixed-variant",
  },
  {
    id: 2,
    title: "Evening Reading",
    period: "February 2024",
    days: "28/28 Days",
    icon: "menu_book",
    iconBg: "--tertiary-fixed",
    iconColor: "--on-tertiary-fixed-variant",
  },
  {
    id: 3,
    title: "Morning Zen",
    period: "January 2024",
    days: "31/31 Days",
    icon: "mindfulness",
    iconBg: "--primary-fixed-dim",
    iconColor: "--on-primary-fixed-variant",
  },
];

export function ProfileEditions() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <h2
          className="text-[22px] font-bold"
          style={{ color: "var(--on-surface)" }}
        >
          Completed Editions
        </h2>
        <span
          className="text-[11px] font-bold tracking-widest uppercase underline cursor-pointer"
          style={{ color: "var(--secondary)" }}
        >
          View All
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {editions.map((edition) => (
          <div
            key={edition.id}
            className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors"
            style={{
              backgroundColor: "var(--surface-container-lowest)",
              borderBottom: "2px solid var(--surface-container)",
            }}
            >
            {/* onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--surface-container-low)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--surface-container-lowest)")
            }
                */}
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-lg shrink-0 flex items-center justify-center"
              style={{ backgroundColor: `var(${edition.iconBg})` }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: `var(${edition.iconColor})` }}
              >
                {edition.icon}
              </span>
            </div>

            {/* Text */}
            <div className="grow">
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "var(--on-surface)" }}
              >
                {edition.title}
              </h3>
              <p
                className="text-[11px] font-bold tracking-widest uppercase"
                style={{ color: "var(--on-surface-variant)" }}
              >
                {edition.period} • {edition.days}
              </p>
            </div>

            {/* Progress + check */}
            <div className="flex items-center gap-2">
              <div
                className="h-1 w-12 rounded-full overflow-hidden"
                style={{ backgroundColor: "var(--surface-variant)" }}
              >
                <div
                  className="h-full w-full"
                  style={{ backgroundColor: "var(--secondary)" }}
                />
              </div>
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 20,
                  color: "var(--secondary)",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                check_circle
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}