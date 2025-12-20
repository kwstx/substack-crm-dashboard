"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Database, LineChart, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const steps = [
    {
        title: "Connect Your Stack",
        description: "Securely link your Substack account with just a few clicks. We instantly import your subscribers, posts, and engagement history to build your initial dashboard.",
        icon: Database,
        color: "violet",
        gradient: "from-violet-500 to-purple-600"
    },
    {
        title: "Uncover Hidden Insights",
        description: "Connect your data source to analyze reading patterns and identify your most valuable subscribers (Whales). Keep your data private while getting big insights.",
        icon: LineChart,
        color: "blue",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        title: "Automate Personal Growth",
        description: "Set up smart workflows to welcome new VIPs, re-engage cold readers, and upsell free subscribers to paid tiers. It's like having a growth team on autopilot.",
        icon: Sparkles,
        color: "amber",
        gradient: "from-amber-400 to-orange-500"
    }
];

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-500/5 rounded-full blur-[100px] -z-10" />
            </div>

            <LandingNavbar />

            <main className="pt-32 pb-20 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Home
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                        >
                            Turn Subscribers into <br />
                            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Superfans.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-muted-foreground"
                        >
                            Lume isn't just another dashboard. It's an intelligent CRM built specifically for the unique needs of newsletters.
                        </motion.p>
                    </div>

                    {/* Steps */}
                    <div className="grid md:grid-cols-3 gap-8 mb-24 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0" />

                        {steps.map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i + 0.2 }}
                                className="relative z-10"
                            >
                                <div className="text-center">
                                    <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br ${step.gradient} p-0.5 shadow-xl mb-8 group transition-transform hover:scale-105 duration-500`}>
                                        <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center relative overflow-hidden">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                                            <step.icon className={`w-10 h-10 text-${step.color}-600 relative z-10`} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed px-4">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Integration Highlight */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-[3rem] p-8 md:p-12 mb-20 border border-gray-100"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Live Sync</span>
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">Works seamlessly with Substack.</h2>
                                <p className="text-muted-foreground text-lg">
                                    No complex migrations or technical setup required. We use the connection you already have to safely read your list and activity data in real-time.
                                </p>
                                <ul className="space-y-3">
                                    {['Secure OAuth Connection', 'Real-time Webhooks', 'Historical Data Import'].map(item => (
                                        <li key={item} className="flex items-center gap-2 font-medium text-gray-700">
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 flex justify-center w-full max-w-sm">
                                {/* Abstract Representation of Sync */}
                                <div className="relative w-full aspect-square bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-gray-100 p-8 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-grid-gray-100 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

                                    <div className="relative z-10 flex items-center gap-4">
                                        <div className="w-16 h-16 bg-[#FF6719] rounded-2xl flex items-center justify-center shadow-lg text-white font-bold text-xl">
                                            S
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-gray-300 animate-[bounce_1s_infinite_0ms]" />
                                            <div className="w-2 h-2 rounded-full bg-gray-300 animate-[bounce_1s_infinite_200ms]" />
                                            <div className="w-2 h-2 rounded-full bg-gray-300 animate-[bounce_1s_infinite_400ms]" />
                                        </div>
                                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg text-white font-bold">
                                            <span className="font-display">S</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <div className="text-center">
                        <Link href="/dashboard">
                            <Button size="lg" className="rounded-full bg-violet-600 hover:bg-violet-700 text-white px-10 font-bold text-base h-14 shadow-xl shadow-violet-200">
                                Start Your Growth Engine
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <p className="mt-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            Completely Free • Open Source • No credit card required
                        </p>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
