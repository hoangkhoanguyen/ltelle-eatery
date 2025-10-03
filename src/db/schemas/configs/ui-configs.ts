import { dbSchema } from "@/db/schema";
import { Config } from "@/types/configs";
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
    title: varchar("title", { length: 255 }).notNull(),
    scope: varchar("scope", { length: 50 }).notNull(),
    value: jsonb("value").$type<Config>().notNull(),
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

export type UIConfigDB = typeof uiConfigs.$inferSelect;
export type NewUIConfigDB = typeof uiConfigs.$inferInsert;
export type UpdateUIConfigDB = Partial<
  Omit<UIConfigDB, "key" | "scope" | "createdAt" | "updatedAt">
>;
