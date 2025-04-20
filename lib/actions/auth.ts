"use server"

import { eq } from "drizzle-orm"
import { db } from "../../database/drizzle"
import { users } from "../../database/schema"
import { AuthCredentials } from "../../types"
import { hash } from "bcryptjs"
import { signIn } from "@/auth"
import { headers } from "next/headers"
import { ratelimit } from "../ratelimit"
import { redirect } from "next/navigation"

const rateLimitHandler = async () => {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1"
  const { success } = await ratelimit.limit(ip)
  return { success }
}

export const signInWithCredentials = async ({
  email,
  password,
}: Pick<AuthCredentials, "email" | "password">) => {
  const { success } = await rateLimitHandler()
  if (!success) return redirect("/too-fast")

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result.error) {
      return { success: false, message: result.error }
    }

    return { success: true, message: "User signed in successfully" }
  } catch (error) {
    console.log(error, "sign in error")
    return { success: false, message: "sign in error" }
  }
}
export const signUp = async ({
  fullName,
  password,
  email,
  universityId,
  universityCard,
}: AuthCredentials) => {
  const { success } = await rateLimitHandler()
  if (!success) return redirect("/too-fast")

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existingUser.length > 0) {
    return { success: false, message: "User already exists" }
  }

  const hashedPassword = await hash(password, 10)

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId: universityId.toString(),
      universityCard,
    })

    await signInWithCredentials({ email, password })

    return { success: true, message: "User created successfully" }
  } catch (error) {
    console.log(error, "signup error")
    return { success: false, message: "signup error" }
  }
}
