import { z } from "zod"

export const signupSchema = z.object({
  fullname: z.string().min(3).max(50),
  email: z.string().email(),
  universityId: z.coerce.number(),
  password: z.string().min(8),
  universityCard: z.string().nonempty("Card University Is Required"),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
