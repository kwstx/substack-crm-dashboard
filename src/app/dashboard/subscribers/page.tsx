import { getSubscribers } from "@/actions/subscribers";
import SubscribersContent from "./subscribers-content";

export default async function SubscribersPage() {
  const { data } = await getSubscribers();

  // Transform DB data to match UI component props
  const formattedSubscribers = data?.map(sub => ({
    id: sub.id,
    name: sub.name,
    email: sub.email,
    status: sub.status,
    engagement: sub.engagementLevel || 'low',
    openRate: Math.round(((sub.totalOpens || 0) / 10) * 100), // Mock calc
    joinedDate: sub.joinDate,
    lastActive: sub.lastActive,
    avatar: null, // No avatar in DB yet
  }));

  return <SubscribersContent initialSubscribers={formattedSubscribers} />;
}
