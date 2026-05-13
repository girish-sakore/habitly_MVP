export default function PremiumBenefits() {
  const benefits = [
    {
      title: "Expert Coaching",
      desc: "Guided sessions from behavioral scientists.",
      icon: "verified",
    },
    {
      title: "Unlimited Devices",
      desc: "Sync seamlessly across your entire digital ecosystem.",
      icon: "cloud_sync",
    },
    {
      title: "Deep Analytics",
      desc: "Visualize your growth with advanced heatmaps.",
      icon: "insights",
    },
    {
      title: "Private Circles",
      desc: "Create exclusive habit groups with your family.",
      icon: "group_work",
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16">
        Unlock your full potential
      </h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-8 rounded-3xl border border-[#c6c7c0] hover:border-[#3a6757] transition-colors group"
          >
            <span
              className="material-symbols-outlined text-[#3a6757] text-3xl mb-4 block"
              data-icon={benefit.icon}
            >
              {benefit.icon}
            </span>
            <h5 className="text-xl font-bold mb-2">{benefit.title}</h5>
            <p className="text-[#454742] text-sm">{benefit.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}