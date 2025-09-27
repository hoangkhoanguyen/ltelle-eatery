import { dbSchema } from "@/db/schema";
import {
  jsonb,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const uiConfigs = dbSchema.table(
  "ui_configs",
  {
    key: varchar("key", { length: 255 }).notNull(),
    scope: varchar("scope", { length: 50 }).notNull(), // 'global', 'admin', 'web'
    value: jsonb("value").notNull(),
    category: varchar("category", { length: 100 }).notNull(), // 'theme', 'layout', 'display'
    description: text("description"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.key, table.scope] }),
  }),
);
