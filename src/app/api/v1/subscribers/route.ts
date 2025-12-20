
import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { auth } from "@/auth";

// GET /api/v1/subscribers
export async function GET(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "20");

    // TODO: Add cursor-based pagination

    const results = await db.query.subscribers.findMany({
        where: (subscribers, { eq }) => eq(subscribers.userId, session.user.id),
        limit: limit,
    });

    return NextResponse.json(results);
}

// POST /api/v1/subscribers
export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { email, name, status, tags } = body;

        const [newSubscriber] = await db.insert(subscribers).values({
            userId: session.user.id,
            email,
            name,
            status: status || "free",
            tags: tags || [],
            source: "api"
        }).returning();

        return NextResponse.json(newSubscriber);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
