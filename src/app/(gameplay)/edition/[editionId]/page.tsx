import { notFound } from "next/navigation";

import { MobileContainer } from "@/components/layout/mobile-container";
import { GameplayEngine } from "@/features/gameplay/engine/gameplay-engine";
import { getEditionById } from "@/features/editions/edition-content";
import { getCachedAuthSession } from "@/lib/auth-session";
import BottomNav from "@/components/layout/bottom-nav";

type PageProps = {
  params: Promise<{ editionId: string }> | { editionId: string };
};

export default async function EditionGameplayPage({ params }: PageProps) {
  const { editionId } = await Promise.resolve(params);
  const edition = getEditionById(editionId);

  if (!edition) {
    notFound();
  }

  // await requireUserSession(`/edition/${editionId}`);

  return (
    <MobileContainer>
      
    {/* <ProfileHeader name={name ?? ""} email={email} image={image} /> */}

    <main className="flex flex-col gap-12 px-6 pt-8 pb-32 bg-surface">
      <GameplayEngine edition={edition} />
      
    </main>

    <BottomNav />
  </MobileContainer>
  );
}
