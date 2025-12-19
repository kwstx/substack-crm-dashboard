"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Search,
    Filter,
    Download,
    MoreHorizontal,
    UserPlus,
    Upload,
    Users,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

interface Subscriber {
    id: string;
    name: string | null;
    email: string;
    status: string | null;
    engagement: string | null;
    openRate: number | null;
    joinedDate: Date | null;
    lastActive: Date | null;
    avatar?: string | null;
}

interface SubscribersContentProps {
    initialSubscribers: Subscriber[];
}

export default function SubscribersContent({ initialSubscribers }: SubscribersContentProps) {
    const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
    // In a real app, search/filter would trigger server re-fetch via URL params, 
    // but for now we'll just display the initial data or implement client-side filtering if needed.

    const toggleSubscriber = (id: string) => {
        setSelectedSubscribers((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const subscribers = initialSubscribers; // Rename for convenience

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Customers</h1>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
                        <Users className="w-4 h-4 text-gray-500" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-gray-200 shadow-sm font-bold text-gray-600">
                        <Upload className="w-4 h-4 mr-2" />
                        Import
                    </Button>
                    <Button className="rounded-xl bg-black text-white px-6 shadow-lg shadow-black/10 font-bold">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Subscriber
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Audience", value: subscribers.length.toString(), growth: "+0%", color: "text-blue-600" },
                    { label: "Paid Subs", value: subscribers.filter(s => s.status === 'paid').length.toString(), growth: "+0%", color: "text-green-600" },
                    { label: "Active This Week", value: "0", growth: "+0%", color: "text-pink-600" },
                    { label: "At Risk", value: "0", growth: "-0%", color: "text-orange-600" },
                ].map((stat) => (
                    <Card key={stat.label} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-6">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            <Badge className={`${stat.growth.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-pink-50 text-pink-600'} border-none font-bold rounded-lg`}>
                                {stat.growth}
                            </Badge>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email or tag..."
                                className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                            />
                        </div>
                        <Button variant="outline" className="rounded-2xl border-gray-100 h-12 px-6 font-bold text-gray-600">
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-gray-50">
                            <Download className="w-5 h-5 text-gray-400" />
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="w-16 px-8 py-5 text-left">
                                    <Checkbox className="rounded-md border-gray-200" />
                                </th>
                                <th className="px-4 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subscriber</th>
                                <th className="px-4 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-4 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Engagement</th>
                                <th className="px-4 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Open Rate</th>
                                <th className="px-4 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Joined</th>
                                <th className="w-20 px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {subscribers?.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-8 py-12 text-center text-gray-500">
                                        No subscribers found. Import some data!
                                    </td>
                                </tr>
                            ) : subscribers?.map((sub) => (
                                <tr key={sub.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <Checkbox
                                            className="rounded-md border-gray-200"
                                            checked={selectedSubscribers.includes(sub.id)}
                                            onCheckedChange={() => toggleSubscriber(sub.id)}
                                        />
                                    </td>
                                    <td className="px-4 py-5">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="w-10 h-10 ring-2 ring-white shadow-sm">
                                                <AvatarImage src={sub.avatar || undefined} />
                                                <AvatarFallback>{sub.name?.[0] || sub.email[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-gray-900">{sub.name || 'Unknown'}</p>
                                                <p className="text-xs text-gray-400 font-medium">{sub.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-5">
                                        <Badge variant="secondary" className={`${sub.status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'} border-none font-bold rounded-lg px-2.5 py-1 text-[10px] uppercase tracking-wider`}>
                                            {sub.status || 'free'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${sub.engagement === 'high' ? 'bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                                                sub.engagement === 'medium' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' :
                                                    'bg-pink-500 shadow-[0_0_8px_rgba(244,114,182,0.5)]'
                                                }`} />
                                            <span className="text-sm font-bold text-gray-700 capitalize">{sub.engagement || 'low'}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${sub.openRate || 0}%` }} />
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">{sub.openRate || 0}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-5">
                                        <p className="text-sm font-bold text-gray-700">{sub.joinedDate ? new Date(sub.joinedDate).toLocaleDateString() : '-'}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-gray-50 bg-white flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-400">
                        Showing <span className="text-gray-900">1-{subscribers.length}</span> of <span className="text-gray-900">{subscribers.length}</span> subscribers
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl border-gray-100 font-bold text-gray-600 w-10 h-10 p-0" disabled>
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        {/* Pagination Mock */}
                        <Button
                            variant="default"
                            size="sm"
                            className="rounded-xl w-10 h-10 font-bold bg-black text-white shadow-lg shadow-black/10"
                        >
                            1
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl border-gray-100 font-bold text-gray-600 w-10 h-10 p-0">
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
