"use server";

import { db } from "@/db";
import { subscribers, payments, interactions, campaigns } from "@/db/schema";
import { count, eq, sql, desc, gte, and, lt } from "drizzle-orm";
import { auth } from "@/auth";

export async function getDashboardMetrics(from?: Date, to?: Date) {
    try {
        const endDate = to || new Date();
        const startDate = from || new Date(new Date().setDate(endDate.getDate() - 30));

        // Calculate previous period
        const duration = endDate.getTime() - startDate.getTime();
        const prevEndDate = new Date(startDate.getTime());
        const prevStartDate = new Date(startDate.getTime() - duration);

        const [
            totalSubscribers,
            paidSubscribers,
            grossVolumeResult,
            subsCurrentPeriod,
            subsPrevPeriod,
            volumeCurrentPeriod,
            volumePrevPeriod
        ] = await Promise.all([
            db.select({ count: count() }).from(subscribers),
            db.select({ count: count() }).from(subscribers).where(eq(subscribers.status, "paid")),
            db.select({ value: sql<number>`sum(${payments.amount})` }).from(payments),
            // Trends
            db.select({ count: count() }).from(subscribers).where(and(gte(subscribers.createdAt, startDate), lt(subscribers.createdAt, endDate))),
            db.select({ count: count() }).from(subscribers).where(and(gte(subscribers.createdAt, prevStartDate), lt(subscribers.createdAt, prevEndDate))),
            db.select({ value: sql<number>`sum(${payments.amount})` }).from(payments).where(and(gte(payments.date, startDate), lt(payments.date, endDate))),
            db.select({ value: sql<number>`sum(${payments.amount})` }).from(payments).where(and(gte(payments.date, prevStartDate), lt(payments.date, prevEndDate)))
        ]);

        const totalSubs = totalSubscribers[0].count;
        const paidSubs = paidSubscribers[0].count;
        const grossVolume = grossVolumeResult[0].value || 0;

        const currentSubsGrowth = subsCurrentPeriod[0].count;
        const prevSubsGrowth = subsPrevPeriod[0].count;
        const subTrend = prevSubsGrowth === 0 ? (currentSubsGrowth > 0 ? 100 : 0) : Math.round(((currentSubsGrowth - prevSubsGrowth) / prevSubsGrowth) * 100);

        const currentVol = volumeCurrentPeriod[0].value || 0;
        const prevVol = volumePrevPeriod[0].value || 0;
        const volTrend = prevVol === 0 ? (currentVol > 0 ? 100 : 0) : Math.round(((currentVol - prevVol) / prevVol) * 100);

        return {
            totalSubscribers: totalSubs,
            subscriberTrend: `${subTrend > 0 ? '+' : ''}${subTrend}%`,
            paidSubscribers: paidSubs,
            paidTrend: "+0%", // Needs historical snapshot for accuracy, keeping simplified
            grossVolume: grossVolume / 100, // Cents to dollars
            volumeTrend: `${volTrend > 0 ? '+' : ''}${volTrend}%`,
            openRate: "0%", // Would require aggregating all campaigns
            openRateTrend: "0%"
        };
    } catch (error) {
        console.error("Failed to fetch dashboard metrics:", error);
        return {
            totalSubscribers: 0,
            subscriberTrend: "0%",
            paidSubscribers: 0,
            paidTrend: "0%",
            grossVolume: 0,
            volumeTrend: "0%",
            openRate: "0%",
            openRateTrend: "0%"
        };
    }
}

export interface EngagementMetric {
    date: string;
    avgOpenRate: number;
    totalClicks: number;
}

export type SuggestionType = "growth" | "retention" | "monetization";

export interface Suggestion {
    id: string;
    type: SuggestionType;
    title: string;
    description: string;
    actionLabel: string;
    actionUrl?: string; // e.g. /dashboard/outreach?template=re-engage
    impact: "high" | "medium" | "low";
}

export async function getEngagementMetrics(days: number = 30): Promise<{ data: EngagementMetric[], error?: string }> {
    try {
        const session = await auth();
        if (!session?.user?.id) return { data: [], error: "Unauthorized" };

        // 1. Get current aggregate stats for context
        const currentSubs = await db.query.subscribers.findMany({
            where: eq(subscribers.userId, session.user.id),
            columns: { totalOpens: true, totalClicks: true, joinDate: true, engagementLevel: true }
        });

        if (currentSubs.length === 0) return { data: [] };

        // Generate trend data (Simulated for MVP based on real subscriber volume)
        const data: EngagementMetric[] = [];
        const now = new Date();

        // Base stats from actual data if available, else defaults
        const avgOpens = currentSubs.length > 0 ? (currentSubs.reduce((acc, s) => acc + (s.totalOpens || 0), 0) / currentSubs.length) : 0;

        for (let i = days; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            data.push({
                date: dateStr,
                avgOpenRate: 0,
                totalClicks: 0
            });
        }

        return { data };
    } catch (error) {
        console.error("Metrics error:", error);
        return { data: [], error: "Failed to load metrics" };
    }
}

export async function getSuggestions(): Promise<{ data: Suggestion[], error?: string }> {
    try {
        const session = await auth();
        if (!session?.user?.id) return { data: [], error: "Unauthorized" };

        const subs = await db.query.subscribers.findMany({
            where: eq(subscribers.userId, session.user.id)
        });

        const suggestions: Suggestion[] = [];

        // Rule 1: Monetization - High Engagement Free Users
        const highEngagedFree = subs.filter(s => s.status === 'free' && s.engagementLevel === 'high').length;
        if (highEngagedFree > 0) {
            suggestions.push({
                id: "convert-free",
                type: "monetization",
                title: "Convert High-Value Free Readers",
                description: `You have ${highEngagedFree} highly engaged free subscribers. They love your content—ask them to support you.`,
                actionLabel: "Send Offer Email",
                actionUrl: "/dashboard/outreach?segment=high-engaged-free",
                impact: "high"
            });
        }

        // Rule 2: Retention - Stalling Growth or Churn Risk
        const inactivePaid = subs.filter(s => s.status === 'paid' && s.engagementLevel === 'low').length;
        if (inactivePaid > 0) {
            suggestions.push({
                id: "retain-paid",
                type: "retention",
                title: "Re-engage At-Risk Paid Subs",
                description: `${inactivePaid} paid subscribers haven't opened emails recently. Check in before they cancel.`,
                actionLabel: "Draft Check-in",
                actionUrl: "/dashboard/outreach?template=retention",
                impact: "high"
            });
        }

        // Rule 3: Growth - General
        if (subs.length < 100) {
            suggestions.push({
                id: "growth-100",
                type: "growth",
                title: "Reach Your First 100",
                description: "You're building momentum. Share your best post on social media to drive signups.",
                actionLabel: "Share Post",
                impact: "medium"
            });
        }

        return { data: suggestions };
    } catch (error) {
        return { data: [], error: "Failed to load suggestions" };
    }
}

export async function getGrowthData() {
    try {
        // Group subscribers by month (last 6 months)
        // Note: Drizzle SQL helper for date_trunc varies by DB driver. Assuming Postgres.
        const result = await db.execute(sql`
            SELECT TO_CHAR(created_at, 'Mon') as month, COUNT(*) as total
            FROM ${subscribers}
            WHERE created_at > NOW() - INTERVAL '6 months'
            GROUP BY 1, TO_CHAR(created_at, 'MM')
            ORDER BY TO_CHAR(created_at, 'MM')
        `);

        // If no data, return empty structure or the query result
        return result.rows.map((row: any) => ({
            month: row.month,
            total: Number(row.total)
        }));
    } catch (error) {
        console.error("Failed to fetch growth data:", error);
        return [];
    }
}

export async function getEngagementTrends() {
    try {
        // Group interactions by week
        const result = await db.execute(sql`
            SELECT 
                'W' || TO_CHAR(date, 'W') as week,
                COUNT(CASE WHEN type = 'open' THEN 1 END) as opens,
                COUNT(CASE WHEN type = 'click' THEN 1 END) as clicks
            FROM ${interactions}
            WHERE date > NOW() - INTERVAL '4 weeks'
            GROUP BY 1
            ORDER BY 1
        `);

        return result.rows.map((row: any) => ({
            week: row.week,
            openRate: Number(row.opens),
            clickRate: Number(row.clicks)
        }));
    } catch (error) {
        console.error("Failed to fetch engagement trends:", error);
        return [];
    }
}

export async function getContentPerformance() {
    try {
        // Use Campaigns as proxy for content
        const data = await db.select({
            topic: campaigns.name,
            opens: campaigns.openRate, // Using rate as simple metric for now
            color: sql<string>`'bg-violet-500'` // Default color
        })
            .from(campaigns)
            .orderBy(desc(campaigns.createdAt))
            .limit(5);

        return data;
    } catch (error) {
        console.error("Failed to fetch content performance:", error);
        return [];
    }
}
