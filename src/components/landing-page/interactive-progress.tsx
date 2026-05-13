import { ProgressBar } from "../ui/progress-bar";

export default function ProgressSection() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-8 soft-card-shadow border border-[#e5e2e1]/50">
        <div className="flex flex-col md:flex-col items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold">Feel the progress</h2>
            <p className="text-[#454742] text-lg">Every action has a reaction. Watch your progress bars fill with liquid smoothness.</p>

            <div className="space-y-4">
              <ProgressBar label="READING 20 MINS" progress="w-[85%]" color="bg-[#3A6757]" percent="85%" />
              <ProgressBar label="MORNING MEDITATION" progress="w-[60%]" color="bg-[#30628a]" percent="60%" />
            </div>
          </div>

          <div className="w-64 h-64 bg-[#bdedd9] rounded-full flex items-center justify-center p-8 relative overflow-hidden">
            <div className="text-center z-10">
              <span className="material-symbols-outlined text-[60px] mb-2" data-icon="joystick">joystick</span>
              <div className="text-2xl font-bold text-[#002117]">Level 12</div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white/20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}