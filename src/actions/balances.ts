"use server";

import { db } from "@/db";
import { payments, payouts } from "@/db/schema";
import { desc, sql, eq } from "drizzle-orm";

export async function getBalances() {
    try {
        const incoming = await db.select({ value: sql<number>`sum(${payments.amount})` })
            .from(payments)
            .where(eq(payments.status, "succeeded"));

        const outgoing = await db.select({ value: sql<number>`sum(${payouts.amount})` })
            .from(payouts)
            .where(eq(payouts.status, "completed"));

        const pending = await db.select({ value: sql<number>`sum(${payouts.amount})` })
            .from(payouts)
            .where(eq(payouts.status, "pending"));

        const available = (incoming[0]?.value || 0) - (outgoing[0]?.value || 0);
        const pendingAmount = pending[0]?.value || 0;

        return {
            available: available,
            pending: pendingAmount
        };
    } catch (error) {
        return { available: 0, pending: 0 };
    }
}

export async function getPayouts() {
    try {
        const data = await db.select().from(payouts).orderBy(desc(payouts.date)).limit(20);
        return { data };
    } catch (error) {
        return { data: [] };
    }
}
