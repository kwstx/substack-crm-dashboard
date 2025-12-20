"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <LandingNavbar />

            <main className="pt-32 pb-20 px-6 relative">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
                    <h1 className="font-display text-3xl md:text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>

                    <div className="prose prose-gray max-w-none text-gray-600">
                        <p className="lead">Last updated: January 1, 2025</p>

                        <p>
                            At Lume, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our Substack CRM service.
                        </p>

                        <h3 className="text-gray-900 font-bold mt-8 mb-4">1. Information We Collect</h3>
                        <p>
                            We collect information that you provide directly to us when you register for an account, connect your Substack newsletter, or communicate with us. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>Account information (name, email, password)</li>
                            <li>Substack connection data (subscriber lists, engagement metrics)</li>
                            <li>Payment information (processed securely by Stripe)</li>
                        </ul>

                        <h3 className="text-gray-900 font-bold mt-8 mb-4">2. How We Use Your Information</h3>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>Processing your newsletter data to generate analytics</li>
                            <li>Facilitating automated outreach campaigns</li>
                            <li>Improving our AI algorithms for reader segmentation</li>
                        </ul>

                        <h3 className="text-gray-900 font-bold mt-8 mb-4">3. Data Security</h3>
                        <p>
                            We implement industry-standard security measures to protect your data. Your Substack data is encrypted both in transit and at rest. We never sell your subscriber data to third parties.
                        </p>

                        <h3 className="text-gray-900 font-bold mt-8 mb-4">4. Contact Us</h3>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at privacy@lume.app.
                        </p>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
