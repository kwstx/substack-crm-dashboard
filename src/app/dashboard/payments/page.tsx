"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  DollarSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCcw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const transactions = [
  {
    id: "txn_1",
    customer: "Emma Wilson",
    email: "emma@example.com",
    amount: 15.00,
    status: "succeeded",
    date: "Dec 18, 2024, 2:45 PM",
    method: "Visa •••• 4242",
    plan: "Pro Monthly",
  },
  {
    id: "txn_2",
    customer: "Alex Thompson",
    email: "alex@example.com",
    amount: 150.00,
    status: "succeeded",
    date: "Dec 18, 2024, 11:20 AM",
    method: "Mastercard •••• 8888",
    plan: "Pro Annual",
  },
  {
    id: "txn_3",
    customer: "Sophie Chen",
    email: "sophie@example.com",
    amount: 15.00,
    status: "pending",
    date: "Dec 17, 2024, 4:12 PM",
    method: "Apple Pay",
    plan: "Pro Monthly",
  },
  {
    id: "txn_4",
    customer: "Marcus Johnson",
    email: "marcus@example.com",
    amount: 15.00,
    status: "succeeded",
    date: "Dec 17, 2024, 9:30 AM",
    method: "Visa •••• 1234",
    plan: "Pro Monthly",
  },
  {
    id: "txn_5",
    customer: "Lisa Park",
    email: "lisa@example.com",
    amount: 15.00,
    status: "failed",
    date: "Dec 16, 2024, 3:20 PM",
    method: "Visa •••• 5678",
    plan: "Pro Monthly",
  },
  {
    id: "txn_6",
    customer: "David Kim",
    email: "david@example.com",
    amount: 15.00,
    status: "succeeded",
    date: "Dec 16, 2024, 10:15 AM",
    method: "Google Pay",
    plan: "Pro Monthly",
  },
];

const revenueData = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 1900 },
  { day: "Wed", amount: 1500 },
  { day: "Thu", amount: 2400 },
  { day: "Fri", amount: 2100 },
  { day: "Sat", amount: 1800 },
  { day: "Sun", amount: 2800 },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground mt-1">Manage transactions and revenue</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Net Volume</span>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-emerald-100">+12.5%</Badge>
              </div>
              <div className="text-3xl font-bold">$12,480.00</div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </div>
            <div className="h-20 w-full px-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="payGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#payGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Active Subscriptions</span>
            <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100">+8.2%</Badge>
          </div>
          <div className="text-3xl font-bold">2,340</div>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">+12 new today</span>
          </div>
        </Card>

        <Card className="border-border/50 shadow-sm p-5 bg-gradient-to-br from-violet-600 to-purple-700 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/80">Pending Payout</span>
            <RefreshCcw className="w-4 h-4 text-white/60" />
          </div>
          <div className="text-3xl font-bold">$2,845.50</div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-white/70">Next payout: Dec 20</span>
            <Button size="sm" variant="secondary" className="h-7 text-xs bg-white/20 hover:bg-white/30 text-white border-0">
              View Schedule
            </Button>
          </div>
        </Card>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search payments..."
                  className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-secondary/30 transition-colors text-sm">
                    <td className="px-4 py-3">
                      <div className="font-semibold">${txn.amount.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">USD</div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          txn.status === "succeeded"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : txn.status === "pending"
                            ? "bg-amber-50 text-amber-700 border-amber-100"
                            : "bg-rose-50 text-rose-700 border-rose-100"
                        }
                      >
                        {txn.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{txn.customer}</div>
                      <div className="text-xs text-muted-foreground">{txn.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>{txn.plan}</div>
                      <div className="text-xs text-muted-foreground">{txn.method}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {txn.date}
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">Showing 1-6 of 1,284 payments</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
