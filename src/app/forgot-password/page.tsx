"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { resetPassword } from "@/actions/auth";
import { toast } from "sonner";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const res = await resetPassword(formData);

        setLoading(false);
        if (res?.error) {
            toast.error(res.error);
        } else {
            setIsSubmitted(true);
            toast.success("Reset link sent!");
        }
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[100px] -z-10" />
            </div>

            <LandingNavbar />

            <main className="pt-32 pb-20 px-6 relative min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="w-full max-w-md relative z-10">
                    <div className="text-center mb-8">
                        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">
                            Reset Password
                        </h1>
                        <p className="text-muted-foreground">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <Card className="border-gray-200 shadow-xl bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
                        <CardContent className="p-8 space-y-6">
                            {!isSubmitted ? (
                                <form action={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="text-sm font-bold text-gray-900 mb-1.5 block">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                required
                                                className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-12 rounded-full bg-black hover:bg-gray-900 text-white font-bold shadow-lg shadow-black/10 mt-2"
                                    >
                                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                        Send Reset Link
                                        {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                                    </Button>
                                </form>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Mail className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Check your inbox</h3>
                                    <p className="text-muted-foreground mb-6">
                                        We've sent a password reset link to your email address.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsSubmitted(false)}
                                        className="rounded-full"
                                    >
                                        Try another email
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="text-center mt-8">
                        <Link href="/login" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </main>

        </div>
    );
}
