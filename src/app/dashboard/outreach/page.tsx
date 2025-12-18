"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Mail,
  MessageSquare,
  Plus,
  Search,
  FileText,
  Clock,
  CheckCircle,
  Users,
  Sparkles,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Copy,
  Eye,
  Calendar,
  Filter,
  Share2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const campaigns = [
  {
    id: 1,
    name: "Welcome Sequence",
    status: "active",
    type: "automated",
    recipients: 847,
    openRate: 68,
    color: "from-blue-600 to-blue-400",
  },
  {
    id: 2,
    name: "Re-engagement Campaign",
    status: "scheduled",
    type: "one-time",
    recipients: 1177,
    openRate: 0,
    color: "from-pink-600 to-pink-400",
  },
  {
    id: 3,
    name: "Paid Upsell Series",
    status: "active",
    type: "automated",
    recipients: 3240,
    openRate: 52,
    color: "from-green-600 to-green-400",
  },
];

const conversations = [
  {
    id: 1,
    subscriber: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    lastMessage: "Thanks for the great content! I have a question...",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    subscriber: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    lastMessage: "Would love to see more content about productivity",
    time: "5h ago",
    unread: false,
  },
];

export default function OutreachPage() {
  const [activeTab, setActiveTab] = useState("campaigns");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Connect</h1>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
            <Share2 className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        <Button className="rounded-xl bg-black text-white px-6 shadow-lg shadow-black/10">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between bg-white border border-gray-100 p-1.5 rounded-2xl shadow-sm w-fit">
          <TabsList className="bg-transparent border-none gap-2">
            <TabsTrigger value="campaigns" className="rounded-xl data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-6">
              <Mail className="w-4 h-4 mr-2" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="messages" className="rounded-xl data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-6">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden group hover:shadow-[0_8px_35px_rgb(0,0,0,0.08)] transition-all">
                <div className={`h-2 w-full bg-gradient-to-r ${campaign.color}`} />
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                      {campaign.type === "automated" ? <Sparkles className="w-6 h-6 text-blue-500" /> : <Mail className="w-6 h-6 text-pink-500" />}
                    </div>
                    <Badge variant="outline" className="rounded-full border-gray-100 text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                      {campaign.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{campaign.name}</h3>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-bold text-gray-500">{campaign.recipients}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-bold text-gray-500">{campaign.type}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                      <span>Performance</span>
                      <span className="text-gray-900">{campaign.openRate}% Open</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${campaign.color} rounded-full`} style={{ width: `${campaign.openRate}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <CardTitle className="text-xl font-bold">Recent Templates</CardTitle>
              <Button variant="ghost" size="sm" className="font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full px-4">
                View all templates
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["Welcome Email", "Product Update", "Weekly Digest", "Survey Request"].map((t) => (
                <div key={t} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <FileText className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <p className="font-bold text-gray-900 mb-1">{t}</p>
                  <p className="text-xs text-gray-400 font-medium">Last used 2 days ago</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="grid grid-cols-12 gap-6">
          <Card className="col-span-12 lg:col-span-4 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden flex flex-col h-[600px]">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg">Inbox</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm w-32 focus:w-48 transition-all" placeholder="Search..." />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((c) => (
                <div key={c.id} className="p-6 hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-4 border-b border-gray-50 last:border-none">
                  <div className="relative">
                    <Avatar className="w-12 h-12 ring-2 ring-white">
                      <AvatarImage src={c.subscriber.avatar} />
                      <AvatarFallback>{c.subscriber.name[0]}</AvatarFallback>
                    </Avatar>
                    {c.unread && <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-gray-900 truncate">{c.subscriber.name}</p>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{c.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{c.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="col-span-12 lg:col-span-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden flex flex-col h-[600px]">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 ring-2 ring-white">
                  <AvatarImage src={conversations[0].subscriber.avatar} />
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-gray-900">{conversations[0].subscriber.name}</p>
                  <p className="text-xs text-gray-400 font-medium">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </Button>
              </div>
            </div>
            <div className="flex-1 bg-gray-50/50 p-8 overflow-y-auto space-y-6">
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm border border-gray-100 max-w-[70%]">
                  <p className="text-sm text-gray-900 leading-relaxed">
                    Thanks for the great content! I have a question about the new automation features you mentioned in the last newsletter.
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">10:42 AM</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-600 p-4 rounded-3xl rounded-tr-none shadow-lg shadow-blue-500/10 text-white max-w-[70%]">
                  <p className="text-sm leading-relaxed">
                    Hey Emma! Glad you liked it. The automation features are designed to help you scale your outreach without losing the personal touch.
                  </p>
                  <p className="text-[10px] font-bold text-white/60 mt-2 uppercase tracking-wider">10:45 AM</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                <input className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4 py-2" placeholder="Write a message..." />
                <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
