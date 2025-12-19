import { getBalances, getPayouts } from "@/actions/balances";
import BalancesContent from "./balances-content";

export default async function BalancesPage() {
  const [balances, { data: payouts }] = await Promise.all([
    getBalances(),
    getPayouts()
  ]);

  return <BalancesContent balances={balances} payouts={payouts} />;
}
