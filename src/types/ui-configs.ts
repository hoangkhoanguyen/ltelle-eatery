import { uiConfigs } from "@/db/schemas";

export type UIConfigDB = typeof uiConfigs.$inferSelect;
export type NewUIConfigDB = typeof uiConfigs.$inferInsert;
export type UpdateUIConfigDB = Partial<
  Omit<UIConfigDB, "key" | "scope" | "createdAt">
>;
