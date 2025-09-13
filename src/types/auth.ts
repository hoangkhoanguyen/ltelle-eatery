import { refreshTokens, users } from "@/db/schemas";

export type UserDB = typeof users.$inferSelect;
export type NewUserDB = typeof users.$inferInsert;
export type RefreshTokenDB = typeof refreshTokens.$inferSelect;
export type NewRefreshTokenDB = typeof refreshTokens.$inferInsert;
