"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    Plus,
    FileText,
    Clock,
    Users,
    Sparkles,
    Share2,
} from "lucide-react";

interface Campaign {
    id: string;
    name: string;
    status: string | null;
    type: string | null;
    sentCount: number | null;
    openRate: number | null;
}

interface OutreachContentProps {
    campaigns: Campaign[];
}

export default function OutreachContent({ campaigns }: OutreachContentProps) {

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

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {campaigns?.length === 0 ? (
                        <div className="col-span-3 text-center p-12 text-muted-foreground bg-white rounded-3xl">
                            No campaigns found. Create your first one!
                        </div>
                    ) : campaigns?.map((campaign) => (
                        <Card key={campaign.id} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden group hover:shadow-[0_8px_35px_rgb(0,0,0,0.08)] transition-all">
                            <div className={`h-2 w-full bg-gradient-to-r from-blue-600 to-blue-400`} />
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
                                        <span className="text-sm font-bold text-gray-500">{campaign.sentCount || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm font-bold text-gray-500">{campaign.type}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                                        <span>Performance</span>
                                        <span className="text-gray-900">{campaign.openRate || 0}% Open</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                        <div className={`h-full bg-blue-500 rounded-full`} style={{ width: `${campaign.openRate || 0}%` }} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <CardTitle className="text-xl font-bold">Recent Templates</CardTitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {["Welcome Email", "Product Update", "Weekly Digest", "Survey Request"].map((t) => (
                            <div key={t} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                    <FileText className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                </div>
                                <p className="font-bold text-gray-900 mb-1">{t}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
