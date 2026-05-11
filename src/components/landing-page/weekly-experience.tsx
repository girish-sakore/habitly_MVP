export default function WeeklyExperience() {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
        {/* Large Feature: The Weekly Board */}
        <div className="md:col-span-2 md:row-span-2 bg-[#3a6757] text-white rounded-4xl p-10 flex flex-col justify-between overflow-hidden relative">
          <div className="z-10 space-y-4">
            <span className="text-[12px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">MOST POPULAR</span>
            <h3 className="text-3xl font-bold">The Weekly Board</h3>
            <p className="opacity-90 max-w-xs text-lg">A bird&apos;s eye view of your commitments. Clear, calming, and completely under your control.</p>
          </div>
          <div className="mt-8 z-10 bg-[url('/images/thepaintedsquare.jpg')] bg-cover bg-center rounded-2xl h-48 flex items-center justify-center text-white font-bold">
            {/* Replace with your board screenshot */}
            Weekly Board Preview
          </div>
        </div>

        {/* Mini Card: Smart Reminders */}
        <div className="md:col-span-2 bg-[#fafbff] rounded-4xl p-8 flex items-center gap-6">
          <div className="flex-1 space-y-2">
            <h4 className="text-xl font-bold text-[#30628a]">Smart Reminders</h4>
            <p className="text-[#4778a0]">Gentle nudges that respect your flow and never overwhelm.</p>
          </div>
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">
            <span className="material-symbols-outlined text-4xl text-[#30628a]" data-icon="notifications_active">notifications_active</span>
          </div>
        </div>

        {/* Mini Card: Completion Rate */}
        <div className="md:col-span-1 bg-[#e5e2e1] rounded-4xl p-8 flex flex-col justify-center text-center space-y-2">
          <div className="text-4xl font-bold text-[#3a6757]">98%</div>
          <p className="text-[12px] font-bold text-[#454742] uppercase tracking-widest">COMPLETION RATE</p>
        </div>

        {/* Mini Card: Leaderboard */}
        <div className="md:col-span-1 bg-[#fdfbf7] rounded-4xl p-8 flex flex-col justify-center items-center text-center space-y-2 border border-[#c6c7c0]/30">
          <span className="material-symbols-outlined text-4xl font-bold text-[#3a6757]" data-icon="diversity_3">diversity_3</span>
          <p className="text-[12px] font-bold text-[#747471] uppercase tracking-widest">FRIENDS LEADERBOARD</p>
        </div>
      </div>
    </section>
  );
}