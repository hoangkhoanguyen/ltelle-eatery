import { dbSchema } from "@/db/schema";
import { jsonb, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const appConfigs = dbSchema.table("app_configs", {
  key: varchar("key", { length: 255 }).primaryKey(),
  value: jsonb("value").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type AppConfigDB = typeof appConfigs.$inferSelect;
export type NewAppConfigDB = typeof appConfigs.$inferInsert;
export type UpdateAppConfigDB = Partial<Omit<AppConfigDB, "key" | "createdAt">>;
