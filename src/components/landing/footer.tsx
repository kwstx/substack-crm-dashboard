"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function LandingFooter() {
    return (
        <footer className="border-t border-border py-12 px-6 bg-white relative z-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <Logo className="w-6 h-6 text-violet-600" />
                        <span className="font-display text-lg font-bold">Lume</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <Link href="/manifesto" className="hover:text-foreground transition-colors">Manifesto</Link>
                        <Link href="/security" className="hover:text-foreground transition-colors">Security</Link>
                        <Link href="/changelog" className="hover:text-foreground transition-colors">Changelog</Link>
                        <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Lume. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
