"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    Plus,
    Calendar,
    ChevronDown,
    TrendingUp,
    Link as LinkIcon,
    Search,
    ArrowUpRight,
    ArrowDownRight,
    Target,
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
    LineChart,
    Line,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const retentionData = [
    { name: "Jan", value: 0 },
    { name: "Feb", value: 0 },
    { name: "Mar", value: 0 },
    { name: "Apr", value: 0 },
    { name: "May", value: 0 },
    { name: "Jun", value: 0 },
    { name: "Jul", value: 0 },
];

const transactionsData = [
    { name: "M", value: 0 },
    { name: "T", value: 0 },
    { name: "W", value: 0 },
    { name: "T", value: 0 },
    { name: "F", value: 0 },
    { name: "S", value: 0 },
    { name: "S", value: 0 },
];

const customersData = [
    { name: "M", value: 0 },
    { name: "T", value: 0 },
    { name: "W", value: 0 },
    { name: "T", value: 0 },
    { name: "F", value: 0 },
    { name: "S", value: 0 },
    { name: "S", value: 0 },
];

interface DashboardContentProps {
    metrics: {
        totalSubscribers: number;
        paidSubscribers: number;
        grossVolume: number;
        trends: any[];
    }
}

export default function DashboardContent({ metrics }: DashboardContentProps) {
    // Use metrics from props where available, fallback to mock/defaults if needed
    const { trends = [], totalSubscribers = 0, paidSubscribers = 0, grossVolume = 0 } = metrics || {};

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Overview</h1>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
                        <LinkIcon className="w-4 h-4 text-gray-500" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* ... Date pickers ... */}
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm text-sm font-medium text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Jan 01 - July 31</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-400 font-medium">compared to</span>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm text-sm font-medium text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Aug 01 - Dec 31</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm text-sm font-medium text-gray-600 ml-2">
                        <span>Daily</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg ml-2 border-gray-200 shadow-sm font-medium text-gray-600">
                        Add widget
                        <Plus className="w-4 h-4 ml-1.5" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Payments Section */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between px-8 pt-8">
                            <CardTitle className="text-xl font-bold">Payments</CardTitle>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <MoreHorizontal className="w-5 h-5 text-gray-400" />
                            </Button>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <div className="grid grid-cols-5 gap-4 mb-8">
                                {trends?.map((item) => (
                                    <div key={item.name} className="space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">{item.name}</span>
                                        <span className="text-xl font-bold text-gray-900">{(item.value / 1000).toFixed(1)}k</span>
                                    </div>
                                ))}
                            </div>

                            <div className="relative h-[240px] w-full flex items-end gap-1 px-2">
                                {trends?.map((item, i) => (
                                    <div key={i} className="flex-1 relative group">
                                        <div
                                            className={`w-full rounded-lg transition-all duration-500 relative ${item.active
                                                ? "bg-gradient-to-b from-blue-600 to-blue-400 shadow-xl shadow-blue-500/20"
                                                : "bg-gradient-to-b from-blue-400/40 to-blue-200/20"
                                                }`}
                                            style={{ height: `${item.height}%` }}
                                        >
                                            {/* Stripes overlay */}
                                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:12px_12px]" />
                                        </div>
                                        {item.active && (
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur shadow-xl border border-gray-100 rounded-full px-4 py-2 whitespace-nowrap z-20 flex items-center gap-2">
                                                <span className="text-xs font-bold text-gray-900">{item.value.toLocaleString()}</span>
                                                <span className="text-xs text-gray-400 font-medium">|</span>
                                                <span className="text-xs font-bold text-gray-900">Active</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* AI Insight Bar */}
                            <div className="mt-8 bg-[#F9FAFB] rounded-2xl border border-gray-100 p-4 flex items-center justify-between shadow-inner">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100">
                                        <Target className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <span className="text-gray-400">What would you like to explore next?</span>
                                        <div className="bg-white border border-gray-200 rounded-md px-2 py-0.5 text-xs flex items-center gap-1.5 shadow-sm">
                                            <span className="text-gray-900">I want to know what caused the drop-off from authorized to</span>
                                            <span className="bg-orange-50 text-orange-600 px-1 rounded">/successful payments</span>
                                            <span className="w-[1px] h-3 bg-black animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Retention Card */}
                        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8">
                            <div className="flex items-center justify-between mb-8">
                                <CardTitle className="text-xl font-bold">Retention</CardTitle>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                </Button>
                            </div>
                            <div className="relative mb-4">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 bg-white shadow-lg border border-gray-50 rounded-full px-3 py-1 text-xs font-bold text-gray-900 z-10">
                                    -%
                                </div>
                                <div className="h-[180px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={retentionData}>
                                            <Line
                                                type="step"
                                                dataKey="value"
                                                stroke="#F472B6"
                                                strokeWidth={3}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="flex justify-between px-2">
                                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(m => (
                                    <span key={m} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m}</span>
                                ))}
                            </div>
                        </Card>

                        <div className="space-y-6">
                            {/* Transactions Card */}
                            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-6 hover:shadow-[0_8px_35px_rgb(0,0,0,0.08)] transition-all cursor-pointer group" onClick={() => window.location.href = '/dashboard/payments'}>
                                <div className="flex items-center justify-between mb-2">
                                    <CardTitle className="text-lg font-bold">Transactions</CardTitle>
                                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="w-4 h-4 text-gray-400" />
                                    </Button>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <div className="text-3xl font-bold">{(grossVolume / 1000).toFixed(1)}k</div>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">vs last period</span>
                                            <span className="text-xs font-bold text-gray-900 ml-1">+34%</span>
                                        </div>
                                    </div>
                                    <div className="h-16 w-32 relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={transactionsData}>
                                                <Bar dataKey="value" fill="#10B981" radius={[2, 2, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Card>

                            {/* Customers Card */}
                            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-6 hover:shadow-[0_8px_35px_rgb(0,0,0,0.08)] transition-all cursor-pointer group" onClick={() => window.location.href = '/dashboard/subscribers'}>
                                <div className="flex items-center justify-between mb-2">
                                    <CardTitle className="text-lg font-bold">Customers</CardTitle>
                                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="w-4 h-4 text-gray-400" />
                                    </Button>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <div className="text-3xl font-bold">{totalSubscribers.toLocaleString()}</div>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">Paid</span>
                                            <span className="text-xs font-bold text-gray-900 ml-1">{paidSubscribers}</span>
                                        </div>
                                    </div>
                                    <div className="h-16 w-32 relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={customersData}>
                                                <Bar dataKey="value" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Right Section: Gross Volume & Insights */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8 h-full min-h-[500px]">
                        <div className="flex items-center justify-between mb-8">
                            <CardTitle className="text-xl font-bold">Gross Volume</CardTitle>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <MoreHorizontal className="w-5 h-5 text-gray-400" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">${grossVolume.toLocaleString()}</span>
                            <div className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                15%
                            </div>
                        </div>

                        <div className="space-y-8">
                            {[
                                { label: "Total Revenue", value: `$${grossVolume.toFixed(0)}`, color: "bg-green-500", percent: 100 },
                            ].map((item) => (
                                <div key={item.label} className="space-y-3">
                                    <div className="flex justify-between items-center text-sm font-bold">
                                        <span className="text-gray-400 tracking-tight">{item.label}</span>
                                        <span className="text-gray-900">{item.value}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden relative">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${item.color}`}
                                            style={{ width: `${item.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* AI Insights Card in Right Column */}
                        <div className="mt-12">
                            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5] via-[#9333EA] to-[#F43F5E] opacity-90 transition-transform duration-500 group-hover:scale-110" />

                                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-2 border border-white/20">
                                            <Target className="w-3 h-3" />
                                            Insights
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="text-6xl font-bold tracking-tighter">--%</div>
                                        <div className="space-y-2">
                                            <p className="text-xl font-bold leading-tight">
                                                Not enough data for insights yet.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
