import { ClientTierList } from "./Tierlist";
import { getInitialCharacters } from "@/lib/utils";

export default async function Page() {
  const initialCharacters = await getInitialCharacters();

  return <ClientTierList initialCharacters={initialCharacters} />;
}
