"use client";

import { Logo } from "@/components/ui/logo";

export function LandingFooter() {
    return (
        <footer className="border-t border-border py-12 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <Logo className="w-6 h-6 text-violet-600" />
                        <span className="font-display text-lg font-bold">Stackly</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                        <a href="#" className="hover:text-foreground transition-colors">Support</a>
                        <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        © 2024 Stackly. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
