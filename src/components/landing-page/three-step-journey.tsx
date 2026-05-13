import StepCard from './step-card';

export default function ThreeStepJourney() {
  return (
    <section className="bg-[#f7f3f2] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">A 3-step journey to mastery</h2>
          <p className="text-lg text-[#454742]">Simple to start, impossible to quit.</p>
        </div>
        <div className="grid md:grid-cols-1 gap-8">
          <StepCard 
            number="1" 
            title="Define Your Focus" 
            desc="Choose from our curated habits or build your own. We focus on small, manageable actions."
            color="bg-[#baead6]"
          />
          <StepCard 
            number="2" 
            title="Tactile Tracking" 
            desc="Experience the satisfaction of checking off tasks with our squishy, physics-based interface."
            color="bg-[#fafbff]"
            translate
          />
          <StepCard 
            number="3" 
            title="Grow Your World" 
            desc="Watch your digital garden bloom as you maintain your streaks. Every habit fuels your ecosystem."
            color="bg-[#e4e2de]"
          />
        </div>
      </div>
    </section>
  );
}