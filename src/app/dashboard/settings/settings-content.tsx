"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    Smartphone,
    Globe,
    Trash2,
    Download,
    Settings,
    Sparkles,
} from "lucide-react";

interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface SettingsContentProps {
    user: User;
}

const integrations = [
    {
        name: "Substack",
        description: "Connect your Substack account to sync subscribers",
        icon: "https://substackcdn.com/image/fetch/w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fsubstack.png",
        connected: false, // Default to false until we have real integration check
        lastSync: null,
    },
    {
        name: "Zapier",
        description: "Automate workflows with 5,000+ apps",
        icon: "https://cdn.zapier.com/zapier/images/favicon.ico",
        connected: false,
        lastSync: null,
    },
    {
        name: "Google Sheets",
        description: "Export subscriber data to spreadsheets",
        icon: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png",
        connected: false,
        lastSync: null,
    },
];

export default function SettingsContent({ user }: SettingsContentProps) {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Settings</h1>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
                        <Settings className="w-4 h-4 text-gray-500" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8">
                        <div className="flex items-center justify-between mb-8">
                            <CardTitle className="text-xl font-bold">Profile Settings</CardTitle>
                            <Badge variant="outline" className="rounded-full border-gray-100 text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                                Public Profile
                            </Badge>
                        </div>

                        <div className="flex items-center gap-8 mb-10">
                            <div className="relative group">
                                <Avatar className="w-24 h-24 ring-4 ring-gray-50 shadow-xl">
                                    <AvatarImage src={user.image || undefined} />
                                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Button variant="outline" size="sm" className="rounded-xl border-gray-200 shadow-sm font-bold text-gray-600">
                                    Change Avatar
                                </Button>
                                <p className="text-xs text-gray-400 font-medium">JPG, PNG or GIF. Max 2MB.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue={user.name || ""}
                                    className="w-full h-12 px-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue={user.email || ""}
                                    className="w-full h-12 px-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                    disabled // Email usually can't be changed easily in simple auth
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Newsletter Name</label>
                                <input
                                    type="text"
                                    placeholder="My Newsletter"
                                    className="w-full h-12 px-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Timezone</label>
                                <input
                                    type="text"
                                    defaultValue="UTC"
                                    className="w-full h-12 px-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-50">
                            <Button className="rounded-2xl bg-black text-white px-8 py-6 font-bold shadow-xl shadow-black/10 hover:bg-gray-900 transition-all">
                                Save Profile Changes
                            </Button>
                        </div>
                    </Card>

                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8">
                        <div className="flex items-center justify-between mb-8">
                            <CardTitle className="text-xl font-bold">Connected Tools</CardTitle>
                            <Button variant="ghost" size="sm" className="font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full px-4">
                                Explore Marketplace
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {integrations.map((integration) => (
                                <div
                                    key={integration.name}
                                    className="flex items-center justify-between p-6 rounded-3xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all group"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden p-3 group-hover:scale-105 transition-transform">
                                            <img
                                                src={integration.icon}
                                                alt={integration.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-gray-900">{integration.name}</p>
                                                {integration.connected && (
                                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-400 font-medium">{integration.description}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant={integration.connected ? "outline" : "default"}
                                        size="sm"
                                        className={`rounded-xl px-6 font-bold transition-all ${integration.connected
                                                ? "border-gray-200 text-gray-600 hover:bg-white"
                                                : "bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
                                            }`}
                                    >
                                        {integration.connected ? "Configure" : "Connect"}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8">
                        <CardTitle className="text-xl font-bold mb-8">Notifications</CardTitle>
                        <div className="space-y-6">
                            {[
                                { label: "Email Alerts", icon: Mail, checked: true },
                                { label: "Push Notifications", icon: Smartphone, checked: false },
                                { label: "Weekly Digest", icon: Globe, checked: true },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100">
                                            <item.icon className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-700">{item.label}</span>
                                    </div>
                                    <Switch defaultChecked={item.checked} className="data-[state=checked]:bg-blue-600" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-rose-600 to-orange-600 opacity-95 group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10 space-y-6 text-white">
                            <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center border border-white/20">
                                <Trash2 className="w-6 h-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Danger Zone</h3>
                                <p className="text-white/80 text-sm font-medium leading-relaxed">
                                    Irreversible actions. Deleting your account will permanently remove all your data.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <Button variant="outline" className="w-full rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export All Data
                                </Button>
                                <Button variant="destructive" className="w-full rounded-xl bg-white text-rose-600 hover:bg-white/90 font-bold border-none shadow-xl shadow-black/10">
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
