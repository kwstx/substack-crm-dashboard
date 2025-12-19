"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
                    <h1 className="text-2xl font-bold">Something went wrong!</h1>
                    <p className="text-red-500 font-mono text-sm bg-red-50 p-4 rounded-lg max-w-2xl border border-red-200">
                        {error.message}
                    </p>
                    <div className="text-left w-full max-w-2xl overflow-auto bg-gray-100 p-4 rounded text-xs font-mono h-64">
                        {error.stack}
                    </div>
                    <Button onClick={() => reset()}>Try again</Button>
                </div>
            </body>
        </html>
    );
}
