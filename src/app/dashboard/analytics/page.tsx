"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  BarChart3,
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
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

const kpiCards = [
  {
    title: "Open Rate",
    value: "48.6%",
    change: "+5.2%",
    trend: "up",
    icon: Mail,
    color: "from-blue-600 to-blue-400",
  },
  {
    title: "Click Rate",
    value: "12.8%",
    change: "+2.1%",
    trend: "up",
    icon: MousePointer,
    color: "from-pink-600 to-pink-400",
  },
  {
    title: "Subscribers",
    value: "12,847",
    change: "+18.3%",
    trend: "up",
    icon: Users,
    color: "from-green-600 to-green-400",
  },
  {
    title: "Revenue",
    value: "$12,480",
    change: "-3.2%",
    trend: "down",
    icon: DollarSign,
    color: "from-orange-600 to-orange-400",
  },
];

const growthData = [
  { month: "Jan", total: 8200 },
  { month: "Feb", total: 9100 },
  { month: "Mar", total: 9800 },
  { month: "Apr", total: 10600 },
  { month: "May", total: 11800 },
  { month: "Jun", total: 12847 },
];

const engagementTrend = [
  { week: "W1", openRate: 45, clickRate: 10 },
  { week: "W2", openRate: 48, clickRate: 11 },
  { week: "W3", openRate: 42, clickRate: 9 },
  { week: "W4", openRate: 52, clickRate: 14 },
  { week: "W5", openRate: 49, clickRate: 13 },
  { week: "W6", openRate: 51, clickRate: 12 },
];

export default function AnalyticsPage() {
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
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm text-sm font-medium text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Last 30 Days</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <Button variant="outline" size="sm" className="rounded-lg border-gray-200 shadow-sm font-medium text-gray-600">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-6 group hover:shadow-[0_8px_35px_rgb(0,0,0,0.08)] transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{kpi.title}</p>
                <p className="text-3xl font-bold mt-1 text-gray-900">{kpi.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-pink-500" />
                  )}
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
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-1">Overall</Badge>
              <Badge variant="ghost" className="text-gray-400 hover:bg-gray-50 rounded-lg px-3 py-1">Paid</Badge>
            </div>
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.95)", 
                    borderRadius: "16px", 
                    border: "none", 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
                  }} 
                />
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

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <CardTitle className="text-lg font-bold">Quick Insights</CardTitle>
              <Lightbulb className="w-5 h-5 text-orange-400" />
            </div>
            <div className="space-y-4">
              {[
                { title: "Peak Engagement", detail: "Tuesday 9:00 AM", color: "bg-blue-50 text-blue-600" },
                { title: "Top Content", detail: "Case Studies", color: "bg-green-50 text-green-600" },
                { title: "Best Region", detail: "North America", color: "bg-pink-50 text-pink-600" },
              ].map((insight) => (
                <div key={insight.title} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-500">{insight.title}</span>
                  <Badge className={`${insight.color} border-none font-bold rounded-lg`}>{insight.detail}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-6 relative overflow-hidden group cursor-pointer h-[240px]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 opacity-90 group-hover:scale-105 transition-transform duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <Target className="w-6 h-6 opacity-80" />
                <ArrowUpRight className="w-5 h-5 opacity-80" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold leading-tight">Optimization Report</p>
                <p className="text-xs text-white/70 font-medium">Your delivery rates are at an all-time high. View detailed technical analysis.</p>
              </div>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8">
          <CardTitle className="text-xl font-bold mb-8">Engagement Trends</CardTitle>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementTrend}>
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 600 }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.95)", 
                    borderRadius: "16px", 
                    border: "none", 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="openRate" 
                  stroke="#3B82F6" 
                  strokeWidth={4} 
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="clickRate" 
                  stroke="#F472B6" 
                  strokeWidth={4} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Open Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Click Rate</span>
            </div>
          </div>
        </Card>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <CardTitle className="text-xl font-bold">Content Performance</CardTitle>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </Button>
          </div>
          <div className="space-y-6">
            {[
              { topic: "Tech Tutorials", opens: 82, color: "bg-blue-500" },
              { topic: "Industry News", opens: 64, color: "bg-green-500" },
              { topic: "Productivity Tips", opens: 91, color: "bg-pink-500" },
              { topic: "Case Studies", opens: 45, color: "bg-orange-500" },
            ].map((content) => (
              <div key={content.topic} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">{content.topic}</span>
                  <span className="text-sm font-bold text-gray-900">{content.opens}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${content.color}`} 
                    style={{ width: `${content.opens}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
