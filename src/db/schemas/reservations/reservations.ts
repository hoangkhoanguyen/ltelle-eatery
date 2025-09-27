import { dbSchema } from "@/db/schema";
import {
  integer,
  serial,
  text,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

// export const reservationStatusEnum = pgEnum("status", [
//   "scheduled", // Đã đặt thành công
//   "confirmed", // Đã xác nhận lại
//   "seated", // Đã nhận bàn
//   "completed", // Hoàn thành
//   "cancelled", // Đã hủy
//   "no_show", // Không đến
// ]);

export const reservationsSchema = dbSchema.table("reservations", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").notNull().defaultRandom().unique(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  customerFirstName: varchar("customer_first_name", { length: 255 }).notNull(),
  customerLastName: varchar("customer_last_name", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  note: text("note").notNull().default(""),
  internalNote: text("internal_note").notNull().default(""),
  numberOfPeople: integer("number_of_people").notNull().default(1),
  arrivalTime: timestamp("arrival_time").notNull(),
  status: varchar("status", {
    length: 20,
  })
    .notNull()
    .default("scheduled"),
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
});
