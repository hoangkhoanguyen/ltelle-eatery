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
  // Thêm biến môi trường khác tại đây...
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const { fieldErrors } = parsed.error.flatten();
  const message = Object.entries(fieldErrors)
    .map(([k, v]) => `${k}: ${v?.join(", ")}`)
    .join("\n");
  throw new Error("Invalid environment variables:\n" + message);
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
// only import env in server-side code
// never import env in client-side code
