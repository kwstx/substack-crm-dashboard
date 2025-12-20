
import { getPersonas } from "@/actions/personas";
import PersonasContent from "./personas-content";

export const dynamic = 'force-dynamic';

export default async function PersonasPage() {
  const { data } = await getPersonas();
  return <PersonasContent initialPersonas={data || []} />;
}
