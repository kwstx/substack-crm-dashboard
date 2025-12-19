"use server";

import { db } from "@/db";
import { personas } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getPersonas() {
    try {
        const data = await db.select().from(personas).orderBy(desc(personas.createdAt));
        return { data };
    } catch (error) {
        console.error("Failed to fetch personas:", error);
        return { data: [] };
    }
}
