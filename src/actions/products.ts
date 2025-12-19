"use server";

import { db } from "@/db";
import { products, payments } from "@/db/schema";
import { desc, count, sql, eq } from "drizzle-orm";

export async function getProducts() {
    try {
        // Basic product list
        const productList = await db.select().from(products).orderBy(desc(products.createdAt));

        // Aggregation: Count subscribers/revenue per product (via payments table)
        // Detailed stats would require complex join/aggregation
        const stats = await db.select({
            productId: payments.productId,
            totalRevenue: sql<number>`sum(${payments.amount})`,
            count: count(payments.id)
        })
            .from(payments)
            .groupBy(payments.productId);

        const productsWithStats = productList.map(p => {
            const stat = stats.find(s => s.productId === p.id);
            return {
                ...p,
                subscribers: stat?.count || 0, // Approx (count of payments != active subs necessarily)
                revenue: stat?.totalRevenue || 0
            }
        });

        return { data: productsWithStats };
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return { data: [] };
    }
}
