import { getEditionById } from "@/features/editions/edition-content";

export function useEdition(editionId: string) {
  return getEditionById(editionId);
}
