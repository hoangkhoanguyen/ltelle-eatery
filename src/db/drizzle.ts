import { Pool } from "pg";
import {
  drizzle,
  NodePgDatabase,
  NodePgQueryResultHKT,
} from "drizzle-orm/node-postgres";
import * as schema from "./schemas";
import { getEnv } from "@/lib/env";
import { PgTransaction } from "drizzle-orm/pg-core";
import { ExtractTablesWithRelations } from "drizzle-orm";

let db: NodePgDatabase<typeof schema> & {
  $client: Pool;
};

export function getDb() {
  if (!db) {
    const env = getEnv();
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

    db = drizzle(pool, { schema });
  }

  return db;
}

type Schema = typeof schema;

export type TransactionType = PgTransaction<
  NodePgQueryResultHKT,
  Schema,
  ExtractTablesWithRelations<Schema>
>;

// export type DB = ReturnType<typeof drizzle> | TransactionType;
export type DB = typeof db | TransactionType;
