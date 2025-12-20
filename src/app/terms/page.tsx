"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <LandingNavbar />

            <main className="pt-32 pb-20 px-6 relative">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
                    <h1 className="font-display text-3xl md:text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>

                    <div className="prose prose-gray max-w-none text-gray-600">
                        <p className="lead">Last updated: January 1, 2025</p>

                        <p>
                            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Lume website and service operated by the Lume Project.
                        </p>

                        <h3 className="text-gray-900 font-bold mt-8 mb-4">1. Acceptance of Terms</h3>
                        <p>
                            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                        </p>

                        <h3 className="text-gray-900 font-bold mt-8 mb-4">2. Description of Service</h3>
                        <p>
                            Lume provides a Customer Relationship Management (CRM) dashboard designed for Substack newsletter creators, offering analytics, segmentation, and automation tools.
                        </p>

                        <h3 className="text-gray-900 font-bold mt-8 mb-4">3. Accounts</h3>
                        <p>
                            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>

                        <h3 className="text-gray-900 font-bold mt-8 mb-4">4. Intellectual Property</h3>
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of Lume and its licensors.
                        </p>

                        <h3 className="text-gray-900 font-bold mt-8 mb-4">5. Termination</h3>
                        <p>
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
