import "server-only";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  ACCESS_TOKEN_JWT_SECRET: z.string(),
  ACCESS_TOKEN_JWT_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_JWT_SECRET: z.string(),
  REFRESH_TOKEN_JWT_EXPIRES_IN: z.string(),
});

export type Env = z.infer<typeof envSchema>;

let parsedEnv: Env;

export function getEnv(): Env {
  if (!parsedEnv) {
    const parsed = envSchema.safeParse(process.env);

    if (!parsed.success) {
      const { fieldErrors } = parsed.error.flatten();
      const message = Object.entries(fieldErrors)
        .map(([k, v]) => `${k}: ${v?.join(", ")}`)
        .join("\n");
      throw new Error("Invalid environment variables:\n" + message);
    }

    parsedEnv = parsed.data;
  }

  return parsedEnv;
}

// Usage in other files:
// import { getEnv } from '@/lib/env'
// const env = getEnv()
