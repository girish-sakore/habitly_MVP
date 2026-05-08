import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getWeek } from "@/data/mockGames";

import { PlayWeekFlow } from "./play-week-flow";

type PageProps = {
  params: Promise<{ weekId: string }> | { weekId: string };
};

export default async function PlayWeekPage({ params }: PageProps) {
  const { weekId } = await Promise.resolve(params);

  const rawWeek = getWeek(weekId);
  if (!rawWeek) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(`/play/${weekId}`)}`
    );
  }

  const prefillEmail = session.user.email ?? null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isPremium: true },
  });

  const isPremium = user?.isPremium ?? false;

  const week = {
    ...rawWeek,
    games: [...rawWeek.games].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    ),
  };

  return (
    <PlayWeekFlow
      week={week}
      isPremium={isPremium}
      prefillEmail={prefillEmail}
    />
  );
}
