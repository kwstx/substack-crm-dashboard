
import OutreachContent from "./outreach-content";
import { getSegments } from "@/actions/subscribers";
import { getCampaigns } from "@/actions/outreach";

export default async function OutreachPage() {
  const [segments, campaigns, templates] = await Promise.all([
    getSegments(),
    getCampaigns('one-time'),
    getCampaigns('template')
  ]);

  return (
    <OutreachContent
      segments={segments.data || []}
      history={campaigns.data || []}
      templates={templates.data || []}
    />
  );
}
