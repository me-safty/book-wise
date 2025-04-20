import { Client } from "@upstash/workflow"
import { config } from "./config"
export const workflowClient = new Client(config.env.upstash.qstash)
