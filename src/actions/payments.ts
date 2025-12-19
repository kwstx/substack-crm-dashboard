"use server";

import { db } from "@/db";
import { payments, products, subscribers } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function getPayments() {
    try {
        const data = await db.select({
            id: payments.id,
            amount: payments.amount,
            currency: payments.currency,
            status: payments.status,
            date: payments.date,
            subscriberName: subscribers.name,
            subscriberEmail: subscribers.email,
            productName: products.name,
        })
            .from(payments)
            .leftJoin(subscribers, eq(payments.subscriberId, subscribers.id))
            .leftJoin(products, eq(payments.productId, products.id))
            .orderBy(desc(payments.date))
            .limit(50);

        return { data };
    } catch (error) {
        console.error("Failed to fetch payments:", error);
        return { data: [] };
    }
}

export async function getPaymentStats() {
    try {
        // Mocking some stats if DB empty
        // In real app, run aggregations: sum(amount) where date > X
        const totalRevenue = await db.select({ value: sql<number>`sum(${payments.amount})` }).from(payments);

        return {
            totalRevenue: totalRevenue[0]?.value || 0,
        };
    } catch (error) {
        return { totalRevenue: 0 };
    }
}
