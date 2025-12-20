"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CreditCard,
    Plus,
    Download,
    Check,
} from "lucide-react";
import { toast } from "sonner";

interface Invoice {
    id: string;
    amount: number;
    status: string | null;
    date: Date | null;
    planName: string | null;
}

interface BillingContentProps {
    plan: any; // Type from schema
    invoices: Invoice[];
}

export default function BillingContent({ plan, invoices }: BillingContentProps) {
    const currentPlan = plan?.plan || 'free';
    const planName = currentPlan === 'free' ? 'Free Plan' : currentPlan === 'pro' ? 'Pro Monthly' : 'Enterprise';
    const price = currentPlan === 'free' ? 0 : currentPlan === 'pro' ? 29 : 99;

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight">Billing</h1>
                    <p className="text-muted-foreground mt-1">Manage your plan, payment methods, and invoices</p>
                </div>
                <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white" onClick={() => toast.info("Upgrading plan is coming soon!")}>
                    Upgrade Plan
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-border/50 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <CreditCard size={160} />
                    </div>
                    <CardHeader>
                        <CardTitle>Current Plan</CardTitle>
                        <CardDescription>You are currently on the {planName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end gap-2 mb-6">
                            <span className="text-4xl font-bold">${price}</span>
                            <span className="text-muted-foreground mb-1">/ month</span>
                            <Badge className="ml-2 bg-emerald-50 text-emerald-700 border-emerald-100 mb-1">Active</Badge>
                        </div>

                        <div className="space-y-3 mb-8">
                            {[
                                "Unlimited subscribers",
                                "Advanced audience segmentation",
                                "AI-powered persona generation",
                                "Custom outreach templates",
                            ].map((feature) => (
                                <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 pt-6 border-t">
                            <Button className="rounded-xl" onClick={() => toast.info("Change Plan is coming soon!")}>Change Plan</Button>
                            <Button variant="outline" className="rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-100" onClick={() => toast.info("Cancellation is coming soon!")}>Cancel Subscription</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Mock payment method since we don't store sensitive card info in our schema directly */}
                        <div className="p-4 rounded-xl border border-border bg-secondary/20 relative overflow-hidden group">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-7 bg-white rounded border flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-blue-800 italic">VISA</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">•••• 4242</p>
                                        <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-4 rounded-xl" onClick={() => toast.info("Update Payment Method is coming soon!")}>Update Method</Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Billing History</CardTitle>
                        <Button variant="outline" size="sm" className="rounded-xl">
                            <Download className="w-4 h-4 mr-2" />
                            Download All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-secondary/50">
                                <tr>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Plan</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                    <th className="w-12"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {invoices?.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">No invoices yet.</td>
                                    </tr>
                                ) : invoices?.map((invoice, i) => (
                                    <tr key={i} className="text-sm hover:bg-secondary/30">
                                        <td className="px-4 py-3">{invoice.date ? new Date(invoice.date).toLocaleDateString() : '-'}</td>
                                        <td className="px-4 py-3 font-medium">{invoice.planName}</td>
                                        <td className="px-4 py-3">${(invoice.amount / 100).toFixed(2)}</td>
                                        <td className="px-4 py-3">
                                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100">{invoice.status}</Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Download className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                        </td>
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
