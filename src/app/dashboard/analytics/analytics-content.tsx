"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Mail,
    MousePointer,
    Users,
    DollarSign,
    Calendar,
    Download,
    Lightbulb,
    ChevronDown,
    Activity,
    Target,
    MoreHorizontal,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";

interface AnalyticsContentProps {
    metrics: any;
    growthData: any[];
    engagementTrend: any[];
    contentPerformance: any[];
}

export default function AnalyticsContent({ metrics, growthData, engagementTrend, contentPerformance }: AnalyticsContentProps) {

    const kpiCards = [
        {
            title: "Open Rate",
            value: metrics?.openRate || "0%",
            change: metrics?.openRateTrend || "0%",
            trend: "up",
            icon: Mail,
            color: "from-blue-600 to-blue-400",
        },
        {
            title: "Click Rate",
            value: "12.8%", // Mock
            change: "+2.1%",
            trend: "up",
            icon: MousePointer,
            color: "from-pink-600 to-pink-400",
        },
        {
            title: "Subscribers",
            value: (metrics?.totalSubscribers || 0).toLocaleString(),
            change: metrics?.subscriberTrend || "0%",
            trend: "up",
            icon: Users,
            color: "from-green-600 to-green-400",
        },
        {
            title: "Revenue",
            value: `$${(metrics?.grossVolume || 0).toLocaleString()}`,
            change: metrics?.volumeTrend || "0%",
            trend: "up",
            icon: DollarSign,
            color: "from-orange-600 to-orange-400",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Reports</h1>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
                        <Activity className="w-4 h-4 text-gray-500" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg border-gray-200 shadow-sm font-medium text-gray-600">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiCards?.map((kpi) => (
                    <Card key={kpi.title} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-6 group hover:shadow-[0_8px_35px_rgb(0,0,0,0.08)] transition-all">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{kpi.title}</p>
                                <p className="text-3xl font-bold mt-1 text-gray-900">{kpi.value}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className={`text-sm font-bold ${kpi.trend === "up" ? "text-green-500" : "text-pink-500"}`}>
                                        {kpi.change}
                                    </span>
                                </div>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg shadow-blue-500/10`}>
                                <kpi.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-6">
                <Card className="col-span-12 lg:col-span-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <CardTitle className="text-xl font-bold">Subscriber Growth</CardTitle>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 600 }}
                                />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#3B82F6"
                                    strokeWidth={4}
                                    fill="url(#growthGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Keeping Quick Insights Static for now as it needs advanced analytics logic not in scope */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <CardTitle className="text-lg font-bold">Quick Insights</CardTitle>
                            <Lightbulb className="w-5 h-5 text-orange-400" />
                        </div>
                        <div className="space-y-4">
                            <div className="text-sm text-gray-500">Insights will appear here once you have more interaction data.</div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
