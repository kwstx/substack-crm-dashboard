"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { Shield, Lock, Eye, Server } from "lucide-react";

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <LandingNavbar />

            <main className="pt-32 pb-20 px-6 relative">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Security First.</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            We treat your subscriber data with the same care we treat our own. Here is how we keep your business safe.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                                <Lock className="w-6 h-6 text-violet-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Encryption at Rest & Transit</h3>
                            <p className="text-muted-foreground">
                                All data sent between your browser and our servers is encrypted using TLS 1.2 or higher. Your data stored in our databases is also encrypted at rest.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Minimal Data Access</h3>
                            <p className="text-muted-foreground">
                                We only request the permissions necessary to provide analytics. We never ask for "write" access to your newsletter content unless explicitly required for an automation you set up.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <Eye className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">No Data Selling</h3>
                            <p className="text-muted-foreground">
                                Your subscriber list is yours. Period. We do not sell, rent, or share your subscriber data with third-party advertisers or data brokers.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                                <Server className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Isolated Infrastructure</h3>
                            <p className="text-muted-foreground">
                                Our application runs on secure, isolated cloud infrastructure with regular backups and automated threat monitoring to ensure high availability and integrity.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
