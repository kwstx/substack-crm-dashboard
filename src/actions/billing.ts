"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { invoices, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getSubscriptionPlan() {
    const session = await auth();
    if (!session?.user?.id) return null;

    try {
        const user = await db.query.users.findFirst({
            where: eq(users.id, session.user.id),
            columns: {
                plan: true,
                stripeCustomerId: true
            }
        });
        return user;
    } catch (error) {
        return null;
    }
}

export async function getInvoices() {
    const session = await auth();
    if (!session?.user?.id) return { data: [] };

    try {
        const data = await db.select()
            .from(invoices)
            .where(eq(invoices.userId, session.user.id))
            .orderBy(desc(invoices.date));
        return { data };
    } catch (error) {
        return { data: [] };
    }
}
