"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";

const releases = [
    {
        version: "1.0.0",
        date: "December 19, 2025",
        title: "Initial Launch",
        description: "Welcome to Lume. We're live with core CRM features.",
        changes: [
            "Dashboard: Real-time overview of revenue and engagement",
            "Subscribers: Detailed lists with filtering and search",
            "Analytics: Growth charts and conversion tracking",
            "Payments: Transaction history"
        ]
    }
];

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <LandingNavbar />

            <main className="pt-32 pb-20 px-6 relative">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-16">
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Changelog</h1>
                        <p className="text-lg text-muted-foreground">Everything new in Lume.</p>
                    </div>

                    <div className="space-y-12">
                        {releases.map((release) => (
                            <div key={release.version} className="relative pl-8 md:pl-0">
                                {/* Timeline Line */}
                                <div className="absolute top-0 bottom-0 left-[7px] md:left-0 w-px bg-gray-200" />

                                <div className="md:grid md:grid-cols-4 md:gap-8">
                                    <div className="mb-4 md:mb-0 relative">
                                        <div className="absolute -left-[29px] md:left-auto md:-right-[5px] top-1.5 w-3 h-3 rounded-full bg-violet-600 border-4 border-white shadow-sm z-10" />
                                        <div className="font-mono text-sm text-muted-foreground sticky top-24">
                                            {release.date}
                                        </div>
                                    </div>

                                    <div className="md:col-span-3 pb-12 border-b border-gray-100 last:border-0 relative">
                                        <div className="flex items-center gap-3 mb-4">
                                            <h2 className="text-2xl font-bold text-gray-900">{release.title}</h2>
                                            <Badge variant="outline" className="font-mono">{release.version}</Badge>
                                        </div>
                                        <p className="text-gray-600 mb-6">{release.description}</p>

                                        <ul className="space-y-3">
                                            {release.changes.map((change, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                                    {change}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
