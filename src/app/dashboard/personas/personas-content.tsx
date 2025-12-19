"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Brain,
    Search,
    Plus,
    Zap,
    ChevronRight,
    TrendingUp,
} from "lucide-react";

interface Persona {
    id: string;
    name: string;
    description: string | null;
    traits: string[] | null;
    count?: number; // Calculated or manual
    growth?: string;
}

interface PersonasContentProps {
    initialPersonas: Persona[];
}

export default function PersonasContent({ initialPersonas }: PersonasContentProps) {
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
                {initialPersonas?.map((persona) => (
                    <Card key={persona.id} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden group hover:shadow-[0_8px_35px_rgb(0,0,0,0.08)] transition-all">
                        <div className={`h-2 w-full bg-gradient-to-r from-blue-600 to-blue-400`} />
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <Avatar className="w-14 h-14 border-4 border-white shadow-md">
                                    <AvatarFallback className={`bg-gradient-to-br from-blue-600 to-blue-400 text-white font-bold`}>
                                        {persona.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    {persona.growth || '+0%'}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{persona.name}</h3>
                            <p className="text-sm text-gray-500 font-medium mb-6 leading-relaxed">
                                {persona.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {persona.traits?.map((trait) => (
                                    <Badge key={trait} variant="secondary" className="bg-gray-50 text-gray-500 border-none font-bold rounded-lg px-2.5 py-1">
                                        {trait}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                <div className="space-y-0.5">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Members</p>
                                    <p className="text-lg font-bold text-gray-900">{/*persona.count*/ 0}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="rounded-full bg-gray-50 hover:bg-gray-100">
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {initialPersonas.length === 0 && (
                    <div className="col-span-3 text-center p-12 text-muted-foreground bg-gray-50 rounded-xl">
                        No personas generated yet.
                    </div>
                )}
            </div>

            {/* Insights Section (Mock) */}
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
                    {/* ... keeping static charts for visual fidelity ... */}
                    <div className="space-y-6">
                        <div className="text-center text-gray-400 py-10">AI Analysis Module requires more data to populate insights.</div>
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
                                Our AI is ready to identify new subscribers that match your personas.
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
