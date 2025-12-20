"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { personas, subscribers, segments } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getPersonas() {
    try {
        const session = await auth();
        if (!session?.user?.id) return { data: [], error: "Unauthorized" };

        const data = await db.select()
            .from(personas)
            .where(eq(personas.userId, session.user.id))
            .orderBy(desc(personas.createdAt));

        return { data, error: null };
    } catch (error) {
        console.error("Fetch personas error:", error);
        return { data: [], error: "Failed to fetch personas" };
    }
}

export async function generatePersona(segmentId?: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) return { success: false, error: "Unauthorized" };

        // 1. Fetch Subscriber Data for Analysis
        // Filter by segment if provided, else all for user
        // For simple MVP without complex joining right now, let's just analyze ALL or ALL-in-Segment context
        // If segmentId is provided, we'd need to join. For now, let's "Simulate" analysis on the main list or a subset.

        const allSubscribers = await db.query.subscribers.findMany({
            where: eq(subscribers.userId, session.user.id),
            columns: {
                status: true,
                engagementLevel: true,
                joinDate: true,
                email: true,
            },
            limit: 1000 // Analyze sample
        });

        if (allSubscribers.length === 0) {
            return { success: false, error: "No subscribers to analyze. Import data first." };
        }

        // 2. Heuristic Analysis
        const total = allSubscribers.length;
        const paidCount = allSubscribers.filter(s => s.status === 'paid').length;
        const paidRatio = paidCount / total;

        const highEngagement = allSubscribers.filter(s => s.engagementLevel === 'high').length;
        const engagementScore = highEngagement / total;

        // Domain Analysis (Professional vs Personal)
        const domains = allSubscribers.map(s => s.email.split('@')[1]);
        const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
        const personalCount = domains.filter(d => personalDomains.includes(d)).length;
        const isProfessionalAudience = (personalCount / total) < 0.5;

        // Tenure Analysis
        const now = new Date().getTime();
        const avgTenureDays = allSubscribers.reduce((acc, sub) => {
            const joined = sub.joinDate ? new Date(sub.joinDate).getTime() : now;
            return acc + (now - joined);
        }, 0) / total / (1000 * 60 * 60 * 24);

        // 3. Generate Persona based on stats
        let name = "Reader";
        let description = "";
        let traits: Record<string, any> = {
            "Avg Tenure": `${Math.round(avgTenureDays)} days`,
            "Paid Ratio": `${Math.round(paidRatio * 100)}%`,
        };
        let avatarType = "neutral";

        if (paidRatio > 0.1) {
            name = isProfessionalAudience ? "The Professional Supporter" : "The Superfan";
            description = "A dedicated reader who values your content enough to pay. Highly engaged and likely to recommend you to peers.";
            traits["Motivation"] = isProfessionalAudience ? "Career Growth" : "Entertainment/Passion";
            traits["Willingness to Pay"] = "High";
            avatarType = "business";
        } else if (engagementScore > 0.3) {
            name = "The Avid Reader";
            description = "Opens every email but hasn't upgraded yet. Loves the content but needs a push or specific value prop to convert.";
            traits["Motivation"] = "Learning";
            traits["Willingness to Pay"] = "Medium";
            avatarType = "casual";
        } else {
            name = "The Casual Browser";
            description = "Signed up recently or reads occasionally. Skims content and is selective about what they open.";
            traits["Motivation"] = "Curiosity";
            traits["Willingness to Pay"] = "Low";
            avatarType = "young";
        }

        // Add some "Flavor" traits
        traits["Likely Industry"] = isProfessionalAudience ? "Tech / Finance / Business" : "General Interest";
        traits["Preferred Content"] = "Deep Dives & Analysis";

        // 4. Save to DB
        await db.insert(personas).values({
            userId: session.user.id,
            name: `${name} (${new Date().toLocaleDateString()})`, // Unique-ify name visually
            description,
            traits,
            generatedFromSegmentId: segmentId || null,
            avatarUrl: `https://api.dicebear.com/7.x/notionists/svg?seed=${name}${Date.now()}&backgroundColor=e5e7eb`, // Use DiceBear for automated avatar
        });

        revalidatePath("/dashboard/personas");
        return { success: true };
    } catch (error) {
        console.error("Generate persona error:", error);
        return { success: false, error: "Failed to generate persona" };
    }
}

export async function deletePersona(id: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) return { success: false, error: "Unauthorized" };

        await db.delete(personas).where(and(eq(personas.id, id), eq(personas.userId, session.user.id)));
        revalidatePath("/dashboard/personas");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete" };
    }
}
