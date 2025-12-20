"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import { Book, Code, Terminal, Zap, FileJson, Share2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const sidebarNav = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", active: true },
            { title: "Installation" },
            { title: "Authentication" },
            { title: "Quick Start" },
        ],
    },
    {
        title: "Core Concepts",
        items: [
            { title: "Subscribers" },
            { title: "Segmentation" },
            { title: "Campaigns" },
            { title: "Analytics" },
        ],
    },
    {
        title: "API Reference",
        items: [
            { title: "REST API" },
            { title: "Webhooks" },
            { title: "Errors" },
        ],
    },
];

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState("Introduction");

    const docsContent = {
        "Introduction": {
            title: "Introduction",
            icon: Terminal,
            content: (
                <>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                        Welcome to the Lume Developer Documentation. Learn how to integrate your custom tools,
                        build plugins, and access your subscriber data programmatically.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <button
                            onClick={() => setActiveSection("Quick Start")}
                            className="text-left p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg hover:shadow-violet-500/5 transition-all group cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                <Zap className="w-5 h-5 text-violet-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Quick Start</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Get up and running with our API in less than 5 minutes using our SDK.
                            </p>
                            <div className="flex items-center text-sm font-bold text-violet-600">
                                Read Guide <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveSection("REST API")}
                            className="text-left p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all group cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                <Code className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">API Reference</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Detailed endpoints, data models, and authentication methods.
                            </p>
                            <div className="flex items-center text-sm font-bold text-blue-600">
                                View Reference <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </button>
                    </div>
                </>
            )
        },
        "Installation": {
            title: "Installation",
            icon: Code,
            content: (
                <div className="prose prose-gray max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Install the Lume SDK to start building integrations with your favorite framework.
                    </p>
                    <h3>NPM Package</h3>
                    <p>Run the following command in your project directory:</p>
                    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 bg-[#1e1e1e] shadow-lg">
                        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-800 bg-[#252526]">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-sm font-mono text-gray-300">
                                npm install @lume/sdk
                            </pre>
                        </div>
                    </div>
                    <h3>Requirements</h3>
                    <ul>
                        <li>Node.js 18.0.0 or higher</li>
                        <li>A valid Lume API Key</li>
                    </ul>
                </div>
            )
        },
        "Authentication": {
            title: "Authentication",
            icon: Share2,
            content: (
                <div className="prose prose-gray max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Authenticate your requests using Bearer tokens.
                    </p>
                    <h3>API Keys</h3>
                    <p>
                        Access to the API requires an API key, which you can generate in your Dashboard Settings.
                        Include this key in the header of all requests.
                    </p>
                    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 bg-[#1e1e1e] shadow-lg">
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-sm font-mono text-gray-300">
                                <span className="text-violet-400">Authorization:</span> Bearer lume_sk_...
                            </pre>
                        </div>
                    </div>
                    <p className="text-sm text-amber-600 bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <strong>Warning:</strong> Never share your secret API keys in client-side code (browsers).
                    </p>
                </div>
            )
        },
        "Quick Start": {
            title: "Quick Start",
            icon: Zap,
            content: (
                <div className="prose prose-gray max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Create your first subscriber programmatically.
                    </p>
                    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 bg-[#1e1e1e] shadow-lg">
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-sm font-mono text-gray-300">
                                {`import { Lume } from '@lume/sdk';
    
    const lume = new Lume('YOUR_API_KEY');
    
    await lume.subscribers.create({
      email: 'hello@example.com',
      name: 'New Reader'
    });`}
                            </pre>
                        </div>
                    </div>
                </div>
            )
        },
        "Subscribers": {
            title: "Subscribers",
            icon: FileJson,
            content: (
                <div className="prose prose-gray max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Manage your newsletter audience programmatically.
                    </p>
                    <p>The Subscriber object represents a single reader in your CRM.</p>

                    <h3>The Subscriber Object</h3>
                    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 bg-[#1e1e1e] shadow-lg">
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-sm font-mono text-gray-300">
                                {`{
      "id": "sub_123...",
      "email": "jane@doe.com",
      "name": "Jane Doe",
      "status": "free",        // 'free' | 'paid' | 'comp'
      "tier": "monthly",       // 'free' | 'monthly' | 'annual' | 'founding'
      "source": "api",         // 'import' | 'api' | 'manual'
      "tags": ["vip", "tech"],
      "stats": {
        "total_opens": 24,
        "total_clicks": 12,
        "engagement_level": "high"
      },
      "joined_at": "2024-01-01T12:00:00Z"
    }`}
                            </pre>
                        </div>
                    </div>

                    <h3>Endpoints</h3>
                    <div className="space-y-4 not-prose">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-md">GET</span>
                            <code className="text-sm font-mono text-gray-700">/subscribers</code>
                            <span className="text-sm text-gray-500 ml-auto">List all subscribers</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">POST</span>
                            <code className="text-sm font-mono text-gray-700">/subscribers</code>
                            <span className="text-sm text-gray-500 ml-auto">Create a subscriber</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="px-2 py-1 text-xs font-bold bg-amber-100 text-amber-700 rounded-md">PATCH</span>
                            <code className="text-sm font-mono text-gray-700">/subscribers/:id</code>
                            <span className="text-sm text-gray-500 ml-auto">Update details</span>
                        </div>
                    </div>
                </div>
            )
        },
        "Segmentation": {
            title: "Segmentation",
            icon: FileJson,
            content: (
                <div className="prose prose-gray max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Organize subscribers into dynamic groups based on behavior.
                    </p>

                    <h3>The Segment Object</h3>
                    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 bg-[#1e1e1e] shadow-lg">
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-sm font-mono text-gray-300">
                                {`{
      "id": "seg_456...",
      "name": "Highly Engaged",
      "type": "dynamic",      // 'manual' | 'dynamic'
      "criteria": {
        "min_opens": 5,
        "last_active_days": 30,
        "tags": ["vip"]
      },
      "subscriber_count": 1240
    }`}
                            </pre>
                        </div>
                    </div>
                    <p>Dynamic segments automatically update as subscribers meet or fail criteria.</p>
                </div>
            )
        },
        "Campaigns": {
            title: "Campaigns",
            icon: FileJson,
            content: (
                <div className="prose prose-gray max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Create, schedule, and send newsletters programmaticallt.
                    </p>

                    <h3>The Campaign Object</h3>
                    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 bg-[#1e1e1e] shadow-lg">
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-sm font-mono text-gray-300">
                                {`{
      "id": "cam_789...",
      "subject": "Weekly Update",
      "status": "scheduled",   // 'draft' | 'scheduled' | 'sending' | 'completed'
      "type": "one-time",      // 'one-time' | 'automated'
      "stats": {
        "sent": 5000,
        "opens": 2100,
        "clicks": 450
      },
      "scheduled_for": "2024-03-01T09:00:00Z"
    }`}
                            </pre>
                        </div>
                    </div>
                </div>
            )
        },
        "Analytics": {
            title: "Analytics",
            icon: FileJson,
            content: (
                <div className="prose prose-gray max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Retrieve aggregate performance metrics for your publication.
                    </p>

                    <h3>Available Metrics</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li><strong>Growth Rate</strong>: Net new subscribers over time.</li>
                        <li><strong>EngagementScore</strong>: Calculated based on open/click weighted averages.</li>
                        <li><strong>Revenue</strong>: Total gross volume from paid subscriptions.</li>
                        <li><strong>Churn</strong>: Unsubscribe rate percentage.</li>
                    </ul>

                    <h3>Example Response</h3>
                    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 bg-[#1e1e1e] shadow-lg">
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-sm font-mono text-gray-300">
                                {`{
      "period": "30d",
      "total_subscribers": 12500,
      "active_subscribers": 8200,
      "growth_rate": "+5.2%",
      "open_rate_avg": 0.42,
      "volume_usd": 450000
    }`}
                            </pre>
                        </div>
                    </div>
                </div>
            )
        },
        "REST API": {
            title: "REST API",
            icon: Code,
            content: (
                <div className="prose prose-gray max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Standard RESTful endpoints for all resources.
                    </p>
                    <p>The Lume API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.</p>

                    <h3>Parameters</h3>
                    <p>Many list endpoints accept common query parameters:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li><code>limit</code> (int): Number of items to return (default 20, max 100).</li>
                        <li><code>cursor</code> (string): Pagination cursor for the next page of results.</li>
                    </ul>
                </div>
            )
        },
        "Webhooks": {
            title: "Webhooks",
            icon: Share2,
            content: (
                <div className="prose prose-gray max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Listen for real-time events as they happen in your publication.
                    </p>

                    <h3>Supported Events</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-[1fr,2fr] gap-4 border-b border-gray-100 pb-4">
                            <code className="text-sm font-bold text-violet-600">subscriber.created</code>
                            <span className="text-sm text-gray-600">Fired when a new subscriber joins via any source.</span>
                        </div>
                        <div className="grid grid-cols-[1fr,2fr] gap-4 border-b border-gray-100 pb-4">
                            <code className="text-sm font-bold text-violet-600">subscriber.unsubscribed</code>
                            <span className="text-sm text-gray-600">Fired when a user opts out of your newsletter.</span>
                        </div>
                        <div className="grid grid-cols-[1fr,2fr] gap-4 border-b border-gray-100 pb-4">
                            <code className="text-sm font-bold text-violet-600">payment.succeeded</code>
                            <span className="text-sm text-gray-600">Fired when a Stripe payment completes successfully.</span>
                        </div>
                    </div>
                </div>
            )
        },
        "Errors": {
            title: "Errors",
            icon: Terminal,
            content: (
                <div className="prose prose-gray max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Standard HTTP error codes.
                    </p>
                    <ul>
                        <li><code>400</code> - Bad Request</li>
                        <li><code>401</code> - Unauthorized</li>
                        <li><code>429</code> - Too Many Requests</li>
                    </ul>
                </div>
            )
        },
    };

    const CurrentIcon = docsContent[activeSection as keyof typeof docsContent]?.icon || Terminal;

    return (
        <div className="min-h-screen bg-background">
            <LandingNavbar />

            <main className="pt-24 max-w-7xl mx-auto px-6 flex">
                {/* Sidebar */}
                <aside className="hidden lg:block w-64 h-[calc(100vh-6rem)] sticky top-24 pr-8 overflow-y-auto">
                    <div className="space-y-8">
                        {sidebarNav.map((section) => (
                            <div key={section.title}>
                                <h4 className="font-bold text-sm text-gray-900 mb-3">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.items.map((item) => (
                                        <li key={item.title}>
                                            <button
                                                onClick={() => setActiveSection(item.title)}
                                                className={`text-sm transition-colors text-left w-full ${activeSection === item.title
                                                    ? "text-violet-600 font-bold"
                                                    : "text-gray-500 hover:text-gray-900"
                                                    }`}
                                            >
                                                {item.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 lg:pl-8 py-8 md:py-12">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-2 text-sm text-violet-600 font-medium mb-4">
                            <CurrentIcon className="w-4 h-4" />
                            <span>Developers</span>
                        </div>

                        <h1 className="font-display text-4xl font-bold tracking-tight mb-6">
                            {docsContent[activeSection as keyof typeof docsContent]?.title}
                        </h1>

                        {docsContent[activeSection as keyof typeof docsContent]?.content}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
