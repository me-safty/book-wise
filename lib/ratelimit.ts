import { Ratelimit } from "@upstash/ratelimit" // for deno: see above
import { redis } from "@/database/redis"
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
})
