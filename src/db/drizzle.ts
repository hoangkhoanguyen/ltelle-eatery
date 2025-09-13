import { Pool } from "pg";
import { drizzle, NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import * as schema from "./schemas";
import { env } from "@/lib/env";
import { PgTransaction } from "drizzle-orm/pg-core";
import { ExtractTablesWithRelations } from "drizzle-orm";

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, { schema });

// export type DB = ReturnType<typeof drizzle>;

// export type TransactionType = Parameters<Parameters<DB["transaction"]>[0]>[0];

type Schema = typeof schema;

export type TransactionType = PgTransaction<
  NodePgQueryResultHKT,
  Schema,
  ExtractTablesWithRelations<Schema>
>;

export type DB = typeof db | TransactionType;
