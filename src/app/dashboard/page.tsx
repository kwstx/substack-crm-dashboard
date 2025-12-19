import { getDashboardMetrics } from "@/actions/analytics";
import DashboardContent from "./dashboard-content";

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();

  return <DashboardContent metrics={metrics} />;
}
