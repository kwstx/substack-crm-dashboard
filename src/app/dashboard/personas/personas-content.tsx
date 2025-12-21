"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Trash2, Users } from "lucide-react";
import { generatePersona, deletePersona } from "@/actions/personas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface Persona {
    id: string;
    name: string;
    description: string | null;
    traits: any;
    avatarUrl: string | null;
    createdAt: Date | null;
}

interface PersonasContentProps {
    initialPersonas: Persona[];
}

export default function PersonasContent({ initialPersonas }: PersonasContentProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const result = await generatePersona();
            if (result.success) {
                toast.success("New persona generated from your audience data!");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to generate persona");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDelete = async (id: string) => {
        // Optimistic update could represent here, but for now simple standard pattern
        const result = await deletePersona(id);
        if (result.success) {
            toast.success("Persona deleted");
            // router.refresh() handles the UI update via server re-render
            router.refresh();
        } else {
            toast.error("Failed to delete");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900">Audience Personas</h1>
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border border-purple-200">
                        <Users className="w-4 h-4 text-purple-600" />
                    </div>
                </div>
                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="rounded-xl bg-black text-white px-3 md:px-6 h-9 md:h-10 shadow-lg shadow-black/10 font-bold gap-2"
                >
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden md:inline">{isGenerating ? "Analyzing..." : "Generate New Persona"}</span>
                </Button>
            </div>

            {initialPersonas.length === 0 ? (
                <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                        <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="max-w-md space-y-2">
                        <h3 className="text-xl font-bold text-gray-900">No Personas Generated Yet</h3>
                        <p className="text-gray-500">
                            Our smart analysis engine can analyze your subscriber data to create accurate profiles of your typical readers.
                            Click "Generate" to see who is reading your work!
                        </p>
                    </div>
                    <Button onClick={handleGenerate} disabled={isGenerating} variant="outline" className="mt-4">
                        Generate First Persona
                    </Button>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialPersonas.map((persona) => (
                        <Card key={persona.id} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-6 flex flex-col gap-6 relative group">
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full" onClick={() => handleDelete(persona.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 ring-2 ring-gray-50">
                                    <Image
                                        src={persona.avatarUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${persona.name}`}
                                        alt={persona.name}
                                        width={64}
                                        height={64}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{persona.name.split('(')[0]}</h3>
                                    <p className="text-xs text-gray-400 font-medium">Generated {new Date(persona.createdAt || new Date()).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    {persona.description}
                                </p>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-50">
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Key Traits</p>
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(persona.traits as Record<string, any>).map(([key, value]) => (
                                        <Badge key={key} variant="secondary" className="bg-gray-100 text-gray-600 border-none font-bold rounded-lg">
                                            {key}: {value}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
