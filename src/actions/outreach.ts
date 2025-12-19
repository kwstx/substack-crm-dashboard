"use server";

import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getCampaigns() {
    try {
        const data = await db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
        return { data };
    } catch (error) {
        return { data: [] };
    }
}
