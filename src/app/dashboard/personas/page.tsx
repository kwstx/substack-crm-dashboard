"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Search,
  Plus,
  ArrowUpRight,
  Target,
  Zap,
  Brain,
  MessageCircle,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const personas = [
  {
    name: "Tech-Savvy Founders",
    count: 2450,
    growth: "+12%",
    description: "Early-stage startup founders interested in AI and productivity stacks.",
    traits: ["Product-led", "AI-focused", "Remote-first"],
    color: "from-blue-600 to-blue-400",
    avatar: "TF",
  },
  {
    name: "Creative Freelancers",
    count: 1820,
    growth: "+8%",
    description: "Designers and writers looking for business growth and portfolio tips.",
    traits: ["Visual learners", "Solopreneurs", "Tool-agnostic"],
    color: "from-pink-600 to-pink-400",
    avatar: "CF",
  },
  {
    name: "Enterprise Leaders",
    count: 1200,
    growth: "+15%",
    description: "Decision-makers at large companies focused on digital transformation.",
    traits: ["ROI-driven", "Security-focused", "Scale-oriented"],
    color: "from-green-600 to-green-400",
    avatar: "EL",
  },
];

export default function PersonasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Personas</h1>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
            <Brain className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        <Button className="rounded-xl bg-black text-white px-6 shadow-lg shadow-black/10">
          <Plus className="w-4 h-4 mr-2" />
          Create Persona
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <Card key={persona.name} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden group hover:shadow-[0_8px_35px_rgb(0,0,0,0.08)] transition-all">
            <div className={`h-2 w-full bg-gradient-to-r ${persona.color}`} />
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <Avatar className="w-14 h-14 border-4 border-white shadow-md">
                  <AvatarFallback className={`bg-gradient-to-br ${persona.color} text-white font-bold`}>
                    {persona.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {persona.growth}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{persona.name}</h3>
              <p className="text-sm text-gray-500 font-medium mb-6 leading-relaxed">
                {persona.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {persona.traits.map((trait) => (
                  <Badge key={trait} variant="secondary" className="bg-gray-50 text-gray-500 border-none font-bold rounded-lg px-2.5 py-1">
                    {trait}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Members</p>
                  <p className="text-lg font-bold text-gray-900">{persona.count.toLocaleString()}</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-50 hover:bg-gray-100">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 lg:col-span-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <CardTitle className="text-xl font-bold">Audience Insights</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm w-48 focus:w-64 transition-all" placeholder="Analyze segment..." />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {[
              { label: "Content Preference", tech: 85, creative: 45, enterprise: 25 },
              { label: "Email Open Rate", tech: 65, creative: 72, enterprise: 58 },
              { label: "Conversion Propensity", tech: 42, creative: 38, enterprise: 55 },
            ].map((insight) => (
              <div key={insight.label} className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-gray-900">{insight.label}</span>
                </div>
                <div className="h-4 w-full bg-gray-50 rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-500" style={{ width: `${insight.tech}%` }} />
                  <div className="h-full bg-pink-500" style={{ width: `${insight.creative / 2}%` }} />
                  <div className="h-full bg-green-500" style={{ width: `${insight.enterprise / 3}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tech Founders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Creators</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Enterprise</span>
            </div>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-4 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8 relative overflow-hidden group h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-95 group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10 h-full flex flex-col justify-between text-white">
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center border border-white/20">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold leading-tight">AI Persona Matching</h3>
              <p className="text-white/80 font-medium">
                Our AI just identified 450 new subscribers that match your "Tech Founders" persona.
              </p>
            </div>
            <Button className="w-full rounded-2xl bg-white text-indigo-600 font-bold py-6 hover:bg-white/90">
              Auto-assign Segments
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
