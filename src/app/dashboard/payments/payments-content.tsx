"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Plus,
    RefreshCcw,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";

interface Payment {
    id: string;
    amount: number;
    currency: string | null;
    status: string | null;
    date: Date | null;
    subscriberName: string | null;
    subscriberEmail: string | null;
    productName: string | null;
}

interface PaymentsContentProps {
    initialPayments: Payment[];
    stats: {
        totalRevenue: number;
    };
}

const revenueData = [ // Keep mock for chart until we implement real aggregations
    { day: "Mon", amount: 1200 },
    { day: "Tue", amount: 1900 },
    { day: "Wed", amount: 1500 },
    { day: "Thu", amount: 2400 },
    { day: "Fri", amount: 2100 },
    { day: "Sat", amount: 1800 },
    { day: "Sun", amount: 2800 },
];

export default function PaymentsContent({ initialPayments, stats }: PaymentsContentProps) {

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
                            <div className="text-3xl font-bold">${(stats.totalRevenue / 100).toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground mt-1">All time</p>
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

                {/* Keeping other cards static/mock for now as per schema limitations */}
                <Card className="border-border/50 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Active Subscriptions</span>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100">+8.2%</Badge>
                    </div>
                    <div className="text-3xl font-bold">-</div>
                    <div className="flex items-center gap-2 mt-4">
                        <span className="text-xs text-muted-foreground">Data coming soon</span>
                    </div>
                </Card>

                <Card className="border-border/50 shadow-sm p-5 bg-gradient-to-br from-violet-600 to-purple-700 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/80">Pending Payout</span>
                        <RefreshCcw className="w-4 h-4 text-white/60" />
                    </div>
                    <div className="text-3xl font-bold">$0.00</div>
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
                                {initialPayments?.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                            No payments found.
                                        </td>
                                    </tr>
                                ) : initialPayments?.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-secondary/30 transition-colors text-sm">
                                        <td className="px-4 py-3">
                                            <div className="font-semibold">${(txn.amount / 100).toFixed(2)}</div>
                                            <div className="text-xs text-muted-foreground">{txn.currency?.toUpperCase() || 'USD'}</div>
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
                                            <div className="font-medium">{txn.subscriberName || 'Guest'}</div>
                                            <div className="text-xs text-muted-foreground">{txn.subscriberEmail || '-'}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div>{txn.productName || 'Payment'}</div>
                                            {/* <div className="text-xs text-muted-foreground">{txn.method}</div> */}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {txn.date ? new Date(txn.date).toLocaleDateString() : '-'}
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
                        <p className="text-sm text-muted-foreground">Showing 1-{initialPayments.length}</p>
                        {/* Pagination Mock */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
