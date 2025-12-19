import { auth } from "@/auth";
import SettingsContent from "./settings-content";

export default async function SettingsPage() {
  const session = await auth();

  // Provide fallback user object if not logged in (or redirect)
  const user = session?.user || { name: 'Guest', email: 'guest@example.com', image: null };

  return <SettingsContent user={user} />;
}
