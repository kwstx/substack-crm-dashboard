import { getPersonas } from "@/actions/personas";
import PersonasContent from "./personas-content";

export default async function PersonasPage() {
  const { data } = await getPersonas();

  // Transform
  const formattedPersonas = data?.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    traits: p.traits as string[] || [],
    growth: '+0%' // Mock
  })) || [];

  return <PersonasContent initialPersonas={formattedPersonas} />;
}
