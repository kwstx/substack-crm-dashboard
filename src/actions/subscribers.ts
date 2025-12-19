"use server";

import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { desc, ilike, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSubscribers(query?: string) {
    try {
        const data = await db.select()
            .from(subscribers)
            .where(query ? or(ilike(subscribers.email, `%${query}%`), ilike(subscribers.name, `%${query}%`)) : undefined)
            .limit(100)
            .orderBy(desc(subscribers.createdAt));
        return { data };
    } catch (error) {
        console.error("Failed to fetch subscribers:", error);
        return { data: [] };
    }
}

export async function importSubscribers(csvData: any[]) {
    // Mock implementation for bulk upsert
    // Real implementation would parse CSV and batch insert
    try {
        if (!csvData || csvData.length === 0) return { success: false, error: "No data" };

        // Example mapping
        const values = csvData.map(row => ({
            email: row.email,
            name: row.name,
            status: row.status || 'free',
            source: 'import'
        }));

        await db.insert(subscribers).values(values).onConflictDoNothing();

        revalidatePath("/dashboard");
        return { success: true, count: values.length };
    } catch (error) {
        console.error("Import failed:", error);
        return { success: false, error: "Database error" };
    }
}
