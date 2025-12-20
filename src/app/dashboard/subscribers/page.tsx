import { getSubscribers, getSegments } from "@/actions/subscribers";
import SubscribersContent from "./subscribers-content";

export default async function SubscribersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters = {
    query: typeof searchParams.query === 'string' ? searchParams.query : undefined,
    status: typeof searchParams.status === 'string' ? searchParams.status : undefined,
    engagement: typeof searchParams.engagement === 'string' ? searchParams.engagement : undefined,
    segmentId: typeof searchParams.segment === 'string' ? searchParams.segment : undefined,
  };

  const [subscribersResult, segmentsResult] = await Promise.all([
    getSubscribers(filters),
    getSegments() // Assuming this action exists and is imported
  ]);

  const data = subscribersResult.data || [];
  const segments = segmentsResult.data || [];

  // Transform DB data to match UI component props
  const formattedSubscribers = data.map((sub: any) => ({
    id: sub.id,
    name: sub.name,
    email: sub.email,
    status: sub.status,
    engagement: sub.engagementLevel || 'low',
    openRate: Math.round(((sub.totalOpens || 0) / 10) * 100),
    joinedDate: sub.joinDate,
    lastActive: sub.lastActive,
    avatar: null,
  }));

  return (
    <SubscribersContent
      initialSubscribers={formattedSubscribers}
      initialSegments={segments}
      initialFilters={filters}
    />
  );
}
