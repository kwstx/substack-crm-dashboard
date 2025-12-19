"use server";

import { db } from "@/db";
import { subscribers, payments, interactions } from "@/db/schema";
import { count, eq, sql } from "drizzle-orm";

export async function getDashboardMetrics() {
    try {
        const [
            totalSubscribers,
            paidSubscribers,
            grossVolumeResult,
            interactionsCount
        ] = await Promise.all([
            db.select({ count: count() }).from(subscribers),
            db.select({ count: count() }).from(subscribers).where(eq(subscribers.status, "paid")),
            db.select({ value: sql<number>`sum(${payments.amount})` }).from(payments),
            db.select({ count: count() }).from(interactions)
        ]);

        const totalSubs = totalSubscribers[0].count;
        const paidSubs = paidSubscribers[0].count;
        const grossVolume = grossVolumeResult[0].value || 0;

        // Calculate mock "trends" or use real if historical data table existed
        return {
            totalSubscribers: totalSubs,
            subscriberTrend: "+12.5%",
            paidSubscribers: paidSubs,
            paidTrend: "+8.2%",
            grossVolume: grossVolume / 100, // Cents to dollars
            volumeTrend: "+15.3%",
            openRate: "42.8%", // Placeholder
            openRateTrend: "+5.0%"
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

export async function getGrowthData() {
    // Mock implementation for chart
    return [
        { month: "Jan", total: 1000 },
        { month: "Feb", total: 1500 },
        { month: "Mar", total: 2000 },
        { month: "Apr", total: 3500 },
        { month: "May", total: 4200 },
        { month: "Jun", total: 5600 },
    ];
}

export async function getEngagementTrends() {
    // Mock implementation for chart
    return [
        { week: "W1", openRate: 45, clickRate: 10 },
        { week: "W2", openRate: 48, clickRate: 11 },
        { week: "W3", openRate: 42, clickRate: 9 },
        { week: "W4", openRate: 52, clickRate: 14 },
    ];
}

export async function getContentPerformance() {
    return [
        { topic: "Tech Tutorials", opens: 82, color: "bg-blue-500" },
        { topic: "Industry News", opens: 64, color: "bg-green-500" },
    ];
}
