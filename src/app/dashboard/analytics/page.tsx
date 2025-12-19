import { getDashboardMetrics, getEngagementTrends, getGrowthData, getContentPerformance } from "@/actions/analytics";
import AnalyticsContent from "./analytics-content";

export default async function AnalyticsPage() {
  const [metrics, growthData, engagementTrend, contentPerformance] = await Promise.all([
    getDashboardMetrics(),
    getGrowthData(),
    getEngagementTrends(),
    getContentPerformance()
  ]);

  return <AnalyticsContent
    metrics={metrics || {}}
    growthData={growthData || []}
    engagementTrend={engagementTrend || []}
    contentPerformance={contentPerformance || []}
  />;
}
