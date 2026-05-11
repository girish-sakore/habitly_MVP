export default function FinalCTA() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-5xl mx-auto bg-[#1c1b1b] text-[#fcf8f7] rounded-[48px] p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3a6757]/20 rounded-full blur-3xl"></div>
        <h2 className="text-5xl font-bold relative z-10">Ready to start your streak?</h2>
        <p className="text-lg opacity-80 max-w-xl mx-auto relative z-10 my-4">
          Join over 50,000 people who have transformed their lives through the power of consistent, joyful habits.
        </p>
        <div className="relative z-10">
          <button className="btn-tactile px-12 py-6 bg-[#3a6757] text-white rounded-2xl text-xl font-bold hover:scale-[1.05]">
            Start This Week&apos;s Challenge
          </button>
          <p className="mt-4 text-[12px] font-bold opacity-60 uppercase tracking-widest">7-DAY FREE TRIAL • NO CREDIT CARD REQUIRED</p>
        </div>
      </div>
    </section>
  );
}