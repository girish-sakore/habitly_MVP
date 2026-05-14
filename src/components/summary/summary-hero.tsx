interface SummaryHeroProps {
  editionTitle: string;
}

export function SummaryHero({ editionTitle }: SummaryHeroProps) {
  return (
    <section
      className="relative rounded-3xl overflow-hidden shadow-lg flex flex-col justify-end"
      style={{ minHeight: "220px" }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1a3a2e 0%, #2d5a45 40%, #3a6757 70%, #4a8068 100%)",
        }}
      />
      {/* Decorative sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {["auto_awesome", "flare", "celebration"].map((icon, i) => (
          <span
            key={i}
            className="material-symbols-outlined absolute"
            style={{
              fontSize: [36, 22, 28][i],
              color: "rgba(255,255,255,0.15)",
              fontVariationSettings: "'FILL' 1",
              top: ["15%", "20%", "10%"][i],
              left: ["8%", undefined, undefined][i],
              right: [undefined, "10%", "28%"][i],
            }}
          >
            {icon}
          </span>
        ))}
      </div>
      {/* Bottom gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
        }}
      />
      {/* Content */}
      <div className="relative px-6 pb-6 pt-16 flex flex-col gap-2">
        <span
          className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full self-start"
          style={{
            backgroundColor: "var(--secondary-container)",
            color: "var(--on-secondary-container)",
          }}
        >
          Session Complete
        </span>
        <h2 className="text-[28px] font-extrabold text-white leading-tight">
          Incredible Session!
        </h2>
        <p className="text-white/80 text-[15px]">
          You completed <span className="font-bold">{editionTitle}</span>
        </p>
      </div>
    </section>
  );
}