"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Mail,
  TrendingUp,
  TrendingDown,
  Star,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  UserPlus,
  Upload,
  Users,
} from "lucide-react";

const subscribers = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    status: "paid",
    engagement: "high",
    openRate: 82,
    joinedDate: "2024-01-15",
    lastActive: "2 hours ago",
    tags: ["tech", "productivity"],
  },
  {
    id: 2,
    name: "Alex Thompson",
    email: "alex.t@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    status: "free",
    engagement: "medium",
    openRate: 65,
    joinedDate: "2024-02-20",
    lastActive: "1 day ago",
    tags: ["startup"],
  },
  {
    id: 3,
    name: "Sophie Chen",
    email: "sophie.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    status: "paid",
    engagement: "high",
    openRate: 91,
    joinedDate: "2023-11-08",
    lastActive: "5 minutes ago",
    tags: ["ai", "tech", "investing"],
  },
  {
    id: 4,
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    status: "free",
    engagement: "low",
    openRate: 23,
    joinedDate: "2024-03-01",
    lastActive: "2 weeks ago",
    tags: ["casual"],
  },
];

export default function SubscribersPage() {
  const [selectedSubscribers, setSelectedSubscribers] = useState<number[]>([]);

  const toggleSubscriber = (id: number) => {
    setSelectedSubscribers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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
          { label: "Total Audience", value: "12,847", growth: "+12%", color: "text-blue-600" },
          { label: "Paid Subs", value: "2,340", growth: "+8%", color: "text-green-600" },
          { label: "Active This Week", value: "8,122", growth: "+15%", color: "text-pink-600" },
          { label: "At Risk", value: "1,177", growth: "-2%", color: "text-orange-600" },
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
              {subscribers.map((sub) => (
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
                        <AvatarImage src={sub.avatar} />
                        <AvatarFallback>{sub.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-gray-900">{sub.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{sub.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <Badge variant="secondary" className={`${sub.status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'} border-none font-bold rounded-lg px-2.5 py-1 text-[10px] uppercase tracking-wider`}>
                      {sub.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        sub.engagement === 'high' ? 'bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                        sub.engagement === 'medium' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' :
                        'bg-pink-500 shadow-[0_0_8px_rgba(244,114,182,0.5)]'
                      }`} />
                      <span className="text-sm font-bold text-gray-700 capitalize">{sub.engagement}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${sub.openRate}%` }} />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{sub.openRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-sm font-bold text-gray-700">{sub.joinedDate}</p>
                    <p className="text-[10px] text-gray-400 font-medium">Last active {sub.lastActive}</p>
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
            Showing <span className="text-gray-900">1-8</span> of <span className="text-gray-900">12,847</span> subscribers
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl border-gray-100 font-bold text-gray-600 w-10 h-10 p-0" disabled>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            {[1, 2, 3, "...", 1606].map((page, i) => (
              <Button 
                key={i} 
                variant={page === 1 ? "default" : "ghost"} 
                size="sm" 
                className={`rounded-xl w-10 h-10 font-bold ${page === 1 ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-gray-400 hover:text-gray-900'}`}
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="rounded-xl border-gray-100 font-bold text-gray-600 w-10 h-10 p-0">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
