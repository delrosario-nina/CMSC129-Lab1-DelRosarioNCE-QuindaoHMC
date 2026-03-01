import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("5000"),
  MONGODB_URI: z.string(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export const env = envSchema.parse(process.env);
