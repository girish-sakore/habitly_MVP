import { MobileContainer } from "@/components/layout/mobile-container";
import { PricingBenefits } from "@/components/pricing/pricing-benefits";
import { PricingPlans } from "@/components/pricing/pricing-plans";
import { PricingFooter } from "@/components/pricing/pricing-footer";

export default function PricingPage() {
  return (
    <MobileContainer>
      {/* <PricingHeader /> */}
      <main className="flex flex-col gap-10 px-6 pt-6 pb-16">
        <PricingBenefits />
        <PricingPlans />
        <PricingFooter />
      </main>
    </MobileContainer>
  );
}