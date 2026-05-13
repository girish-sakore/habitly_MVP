"use client";

export function PricingFooter() {
  return (
    <section className="flex flex-col gap-4 text-center">
      {/* CTA */}
      <button
        className="w-full h-14 rounded-xl text-[18px] font-bold transition-all duration-75 active:translate-y-1"
        style={{
          backgroundColor: "var(--secondary)",
          color: "white",
          boxShadow: "0 4px 0 0 #224f40",
        }}
        onClick={() => {
          // Wire up to your payment handler (Razorpay etc.)
        }}
      >
        Subscribe Now
      </button>

      {/* Legal links */}
      <div className="flex justify-center gap-6 pt-2">
        {["Restore Purchase", "Terms of Use", "Privacy Policy"].map((label) => (
          <button
            key={label}
            className="text-[10px] font-bold tracking-widest uppercase transition-opacity hover:opacity-100 opacity-60"
            style={{ color: "var(--on-surface-variant)" }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Disclaimer */}
      <p
        className="text-xs leading-relaxed px-4"
        style={{ color: "var(--outline)" }}
      >
        Your subscription will automatically renew at the end of each billing
        period unless cancelled at least 24 hours prior to renewal. Manage your
        subscription in your Account Settings.
      </p>
    </section>
  );
}