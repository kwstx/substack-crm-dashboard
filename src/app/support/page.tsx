"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Clock } from "lucide-react";

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <LandingNavbar />

            <main className="pt-32 pb-20 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">How can we help?</h1>
                        <p className="text-lg text-muted-foreground">Our team looks forward to serving you.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Options */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-violet-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Email Support</h3>
                                    <p className="text-sm text-muted-foreground mb-2">Best for detailed inquiries.</p>
                                    <a href="mailto:support@lume.app" className="text-sm font-semibold text-violet-600 hover:text-violet-700">support@lume.app</a>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <MessageSquare className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Live Chat</h3>
                                    <p className="text-sm text-muted-foreground mb-2">Available for Pro plan users.</p>
                                    <span className="text-sm font-semibold text-gray-400">Currently Offline</span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                    <Clock className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Response Time</h3>
                                    <p className="text-sm text-muted-foreground">We usually respond within 24 hours.</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">First Name</label>
                                        <Input placeholder="Jane" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                                        <Input placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <Input type="email" placeholder="jane@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <Textarea placeholder="Tell us how we can help..." className="min-h-[120px]" />
                                </div>
                                <Button className="w-full bg-violet-600 hover:bg-violet-700">Send Message</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
