import { getDashboardMetrics } from "@/actions/analytics";
import DashboardContent from "./dashboard-content";

// @ts-ignore
export default async function DashboardPage({ searchParams }: { searchParams: { from?: string; to?: string } }) {
  const from = searchParams?.from ? new Date(searchParams.from) : undefined;
  const to = searchParams?.to ? new Date(searchParams.to) : undefined;

  const metrics = await getDashboardMetrics(from, to);

  return <DashboardContent metrics={metrics} />;
}
