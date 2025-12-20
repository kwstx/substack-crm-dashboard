"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Twitter, Code2, Users2, ArrowRight } from "lucide-react";
import Link from "next/link";

const resources = [
    {
        icon: Github,
        title: "Open Source",
        description: "Explore the code, report issues, and contribute to the future of the project on GitHub.",
        action: "Star on GitHub",
        href: "https://github.com/kwstx/substack-crm-dashboard",
        color: "bg-gray-900 text-white",
    },
    {
        icon: Twitter,
        title: "Follow on X",
        description: "Stay updated with the latest features, tips, and behind-the-scenes development.",
        action: "Follow @lume",
        href: "https://x.com/lume_app",
        color: "bg-black text-white",
    },
    {
        icon: Code2,
        title: "Developer Guide",
        description: "Want to build your own plugins? Check out our documentation for developers.",
        action: "Read Docs",
        href: "/docs",
        color: "bg-violet-600 text-white",
    },
];

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[100px] -z-10" />
            </div>

            <LandingNavbar />

            <main className="pt-32 pb-20 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-xs font-semibold mb-8 border border-border/50">
                            <Users2 className="w-3.5 h-3.5" />
                            <span>Open Source Community</span>
                        </div>

                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Built by creators, <br />
                            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">for creators.</span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Lume is more than just code. It's a movement to give power back to independent writers. Join our community to shape the future of the platform.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 mb-24">
                        {resources.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i + 0.2 }}
                                className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground mb-8 min-h-[3rem]">
                                    {item.description}
                                </p>

                                <Link href={item.href} className="inline-flex items-center font-bold text-sm hover:opacity-80 transition-opacity">
                                    {item.action}
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contribution CTA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gray-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px]" />

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Have a feature idea?</h2>
                            <p className="text-gray-400 text-lg mb-10">
                                We're open source for a reason. Check our roadmap, vote on features, or submit a PR. This project belongs to you.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="https://github.com/kwstx/substack-crm-dashboard/blob/main/ROADMAP.md">
                                    <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-100 font-bold px-8 h-12">
                                        View Roadmap
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>


        </div>
    );
}
