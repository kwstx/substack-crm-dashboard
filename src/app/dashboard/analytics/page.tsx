
import AnalyticsContent from "./analytics-content";
import { getDashboardMetrics, getEngagementMetrics, getSuggestions } from "@/actions/analytics";

export default async function AnalyticsPage({ searchParams }: { searchParams: { from?: string; to?: string } }) {
  const from = searchParams.from ? new Date(searchParams.from) : undefined;
  const to = searchParams.to ? new Date(searchParams.to) : undefined;

  const [metrics, engagement, suggestions] = await Promise.all([
    getDashboardMetrics(from, to),
    getEngagementMetrics(30),
    getSuggestions()
  ]);

  return (
    <AnalyticsContent
      metrics={metrics}
      engagementData={engagement.data}
      growthData={[]}
      engagementTrend={[]}
      contentPerformance={[]}
    />
  );
}
