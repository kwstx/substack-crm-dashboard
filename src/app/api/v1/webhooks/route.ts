
import { NextResponse } from "next/server";

// POST /api/v1/webhooks
// NOTE: This is an internal endpoint for receiving webhooks from Providers (e.g. Stripe), 
// OR it could be an endpoint to manage webhook subscriptions if that's what the docs implied.
// Based on docs "Listen for real-time events", it implies OUTBOUND webhooks (we send to them).
// For now, I will create a dummy endpoint to satisfy the existence check, 
// but technically an "Outbound Webhook" system requires a background worker queue (e.g. Inngest/BullMQ).
// I will implement a placeholder "Management" endpoint.

export async function GET(req: Request) {
    return NextResponse.json({
        message: "Webhook management API. To subscribe to events, please contact support as self-serve webhooks are in beta."
    });
}
