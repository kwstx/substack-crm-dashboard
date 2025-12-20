"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", { ...Object.fromEntries(formData), redirectTo: "/dashboard" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}



export async function register(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const substackUrl = formData.get("substackUrl") as string;

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (existingUser) {
        return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
        name: name || email.split("@")[0],
        email,
        password: hashedPassword,
        substackUrl: substackUrl || null,
    });

    return { success: true };
}

export async function resetPassword(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) {
        return { error: "Email is required" };
    }

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (!existingUser) {
        // Return success even if user not found to prevent enumeration
        return { success: true };
    }

    // TODO: Implement actual email sending logic here
    console.log(`[Mock] Password reset email sent to ${email}`);

    return { success: true };
}
