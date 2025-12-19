import { getPayments, getPaymentStats } from "@/actions/payments";
import PaymentsContent from "./payments-content";

export default async function PaymentsPage() {
  const [{ data }, stats] = await Promise.all([
    getPayments(),
    getPaymentStats()
  ]);

  return <PaymentsContent initialPayments={data} stats={stats} />;
}
