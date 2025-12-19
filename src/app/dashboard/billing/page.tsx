import { getSubscriptionPlan, getInvoices } from "@/actions/billing";
import BillingContent from "./billing-content";

export default async function BillingPage() {
  const [plan, { data: invoices }] = await Promise.all([
    getSubscriptionPlan(),
    getInvoices()
  ]);

  return <BillingContent plan={plan} invoices={invoices} />;
}
