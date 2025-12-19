import { getCampaigns, getConversations } from "@/actions/outreach";
import OutreachContent from "./outreach-content";

export default async function OutreachPage() {
  const { data: campaigns } = await getCampaigns();

  return <OutreachContent campaigns={campaigns} />;
}
