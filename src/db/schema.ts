import {
    timestamp,
    pgTable,
    text,
    uuid,
    integer,
    boolean,
    jsonb,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

// --- Auth Tables (NextAuth Schema) ---
export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    role: text("role").default("user"), // 'admin', 'user'
    plan: text("plan").default("free"), // 'free', 'pro', 'enterprise'
    password: text("password"),
    substackUrl: text("substack_url"),
    stripeCustomerId: text("stripe_customer_id"),
    newsletterName: text("newsletter_name"),
    timezone: text("timezone").default("UTC"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const accounts = pgTable("account", {
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
}, (account) => [
    // primaryKey({ columns: [account.provider, account.providerAccountId] }),
]);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verification_token", {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
}, (vt) => [
    // primaryKey({ columns: [vt.identifier, vt.token] }),
]);

// --- CRM Tables ---

// Subscribers imported from Substack
export const subscribers = pgTable("subscribers", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    name: text("name"),
    status: text("status").default("free"), // 'free', 'paid', 'comp'
    tier: text("tier").default("free"), // 'founding', 'annual', 'monthly'
    source: text("source"), // 'import', 'api', 'manual'
    substackId: text("substack_id"), // Original ID from Substack if available
    joinDate: timestamp("join_date"),
    engagementLevel: text("engagement_level"), // 'high', 'medium', 'low', 'churned'
    totalOpens: integer("total_opens").default(0),
    totalClicks: integer("total_clicks").default(0),
    lastActive: timestamp("last_active"),
    notes: text("notes"),
    tags: jsonb("tags").$type<string[]>(), // e.g. ["interested-in-tech", "vip"]
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Groups/Segments of subscribers
export const segments = pgTable("segments", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    criteria: jsonb("criteria"), // Logic for auto-segmentation e.g. { "min_opens": 5 }
    type: text("type").default("manual"), // 'manual' or 'dynamic'
    createdAt: timestamp("created_at").defaultNow(),
});

// Mapping subscribers to segments
export const subscriberSegments = pgTable("subscriber_segments", {
    subscriberId: uuid("subscriber_id")
        .references(() => subscribers.id, { onDelete: "cascade" })
        .notNull(),
    segmentId: uuid("segment_id")
        .references(() => segments.id, { onDelete: "cascade" })
        .notNull(),
});

// Reader Personas (AI Generated or Manual)
export const personas = pgTable("personas", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(), // e.g., "Tech Enthusiast Alex"
    description: text("description"),
    traits: jsonb("traits"), // { "age": "30s", "interests": ["tech", "coding"] }
    avatarUrl: text("avatar_url"),
    generatedFromSegmentId: uuid("generated_from_segment_id").references(() => segments.id),
    createdAt: timestamp("created_at").defaultNow(),
});

// Interactions (Opens, Clicks, Comments - detailed log)
export const interactions = pgTable("interactions", {
    id: uuid("id").defaultRandom().primaryKey(),
    subscriberId: uuid("subscriber_id").references(() => subscribers.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // 'open', 'click', 'reply', 'comment'
    date: timestamp("date").defaultNow(),
    details: jsonb("details"), // { "url": "...", "post_title": "..." }
});

// Products (Plans/Items sold)
export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    price: integer("price").notNull(), // In cents
    currency: text("currency").default("USD"),
    type: text("type").default("subscription"), // 'subscription', 'one-time'
    createdAt: timestamp("created_at").defaultNow(),
});

// Payments from Subscribers
export const payments = pgTable("payments", {
    id: uuid("id").defaultRandom().primaryKey(),
    subscriberId: uuid("subscriber_id").references(() => subscribers.id, { onDelete: "set null" }),
    amount: integer("amount").notNull(), // In cents
    currency: text("currency").default("USD"),
    status: text("status").default("succeeded"), // 'succeeded', 'pending', 'failed'
    date: timestamp("date").defaultNow(),
    stripeId: text("stripe_id"), // if referencing external payment
    productId: uuid("product_id").references(() => products.id),
});

// --- New Tables for Balances, Billing, Outreach ---

// Payouts (Withdrawals by the admin)
export const payouts = pgTable("payouts", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(), // In cents
    status: text("status").default("pending"), // 'pending', 'completed', 'failed'
    date: timestamp("date").defaultNow(),
    method: text("method"), // 'bank_transfer', 'stripe'
});

// Admin Invoices (Billing for the SaaS user)
export const invoices = pgTable("invoices", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id),
    amount: integer("amount").notNull(), // In cents
    status: text("status").default("paid"), // 'paid', 'due'
    date: timestamp("date").defaultNow(),
    planName: text("plan_name"), // 'Pro Monthly'
    invoiceUrl: text("invoice_url"),
});

// Outreach Campaigns
export const campaigns = pgTable("campaigns", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    status: text("status").default("draft"), // 'draft', 'scheduled', 'active', 'completed'
    type: text("type").default("one-time"), // 'one-time', 'automated'
    subject: text("subject"),
    content: text("content"),
    sentCount: integer("sent_count").default(0),
    openRate: integer("open_rate").default(0),
    clickRate: integer("click_rate").default(0),
    scheduledFor: timestamp("scheduled_for"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Messages (Inbox/Chat with Subscribers)
export const messages = pgTable("messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    subscriberId: uuid("subscriber_id").references(() => subscribers.id, { onDelete: "cascade" }),
    direction: text("direction").notNull(), // 'inbound' (from sub), 'outbound' (from admin)
    content: text("content").notNull(),
    isRead: boolean("is_read").default(false),
    sentAt: timestamp("sent_at").defaultNow(),
});
