"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { motion } from "framer-motion";

export default function ManifestoPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <LandingNavbar />

            <main className="pt-32 pb-20 px-6 relative">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                            Why we built Lume.
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed space-y-8"
                    >
                        <p className="text-xl font-medium text-gray-900">
                            Newsletter creators are the new media companies.
                        </p>

                        <p>
                            For too long, writers have been treated as "users" rather than independent creators. You build the audience, you create the value, but you often lack the data to understand what's actually working.
                        </p>

                        <p>
                            We believe that owning your relationship with your readers is the most important asset you have. But "owning" it means more than just having an email list. It means understanding who those people are.
                        </p>

                        <p>
                            It means knowing that <strong>Sarah</strong> reads every post but hasn't upgraded yet. It means knowing that <strong>Tom</strong> stopped opening emails three weeks ago. It means treating every subscriber like a unique individual, not a number on a dashboard.
                        </p>

                        <p>
                            We built Lume to give individual creators the same power that massive media conglomerates have had for decades. Advanced segmentation, behavioral analytics, and automated growth tools simplified and designed for one person to run.
                        </p>

                        <p>
                            Because your work matters. And you deserve tools that help you grow, not just publish.
                        </p>
                    </motion.div>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
