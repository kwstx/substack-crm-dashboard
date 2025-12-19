import { db } from "../db";
import { subscribers } from "../db/schema";

async function main() {
    console.log("Seeding database...");

    await db.insert(subscribers).values([
        {
            email: "alice@example.com",
            name: "Alice Johnson",
            status: "paid",
            tier: "annual",
            joinDate: new Date("2024-01-15"),
            totalOpens: 45,
        },
        {
            email: "bob@example.com",
            name: "Bob Smith",
            status: "free",
            joinDate: new Date("2024-02-20"),
            totalOpens: 12,
        },
        {
            email: "charlie@example.com",
            name: "Charlie Brown",
            status: "paid",
            tier: "monthly",
            joinDate: new Date("2024-03-10"),
            totalOpens: 8,
        }
    ]).onConflictDoNothing();

    console.log("Seeding complete!");
    process.exit(0);
}

main().catch((err) => {
    console.error("Seeding failed", err);
    process.exit(1);
});
