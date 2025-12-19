"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Wallet,
    Download,
    History,
} from "lucide-react";

interface Payout {
    id: string;
    amount: number;
    status: string | null;
    date: Date | null;
    method: string | null;
}

interface BalancesContentProps {
    balances: { available: number; pending: number };
    payouts: Payout[];
}

export default function BalancesContent({ balances, payouts }: BalancesContentProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight">Balances</h1>
                    <p className="text-muted-foreground mt-1">Manage your payouts and funds</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white">
                        Withdraw Funds
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50 shadow-sm bg-gradient-to-br from-violet-600 to-purple-700 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Wallet size={120} />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-white/80 font-medium">Available to withdraw</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold">${(balances.available / 100).toFixed(2)}</div>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-sm">
                                <span className="text-xs text-white/70 block">Estimated arrival</span>
                                <span className="text-sm font-semibold">TBD</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">${(balances.pending / 100).toFixed(2)}</div>
                        <p className="text-sm text-muted-foreground mt-2">Funds are typically available after 2-3 business days</p>
                        <div className="mt-6 space-y-4">
                            {/* Show mock or nothing if no pending data details */}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle>Recent Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-secondary/50">
                                <tr>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Method</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {payouts?.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">No payouts yet.</td>
                                    </tr>
                                ) : payouts?.map((payout, i) => (
                                    <tr key={i} className="text-sm hover:bg-secondary/30">
                                        <td className="px-4 py-3">{payout.date ? new Date(payout.date).toLocaleDateString() : '-'}</td>
                                        <td className="px-4 py-3 font-semibold">${(payout.amount / 100).toFixed(2)}</td>
                                        <td className="px-4 py-3">
                                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100">{payout.status}</Badge>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">{payout.method}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
