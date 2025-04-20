import { Redis } from "@upstash/redis"
import { config } from "../lib/config"

export const redis = new Redis(config.env.upstash.redis)
