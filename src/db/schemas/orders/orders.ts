import { dbSchema } from "@/db/schema";
import { relations } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import { real, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { orderItems } from "./order-items";
export const orderTypeEnum = pgEnum("order_type", ["delivery", "pickup"]);
export const orderStatusEnum = pgEnum("status", [
  "pending",
  "processing",
  "completed",
  "cancelled",
]);

export const orders = dbSchema.table("orders", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 20 }).notNull(),
  customerName: varchar("customer_name", {
    length: 255,
  }).notNull(),
  customerPhone: varchar("phone", {
    length: 20,
  }).notNull(),
  totalPrice: real("total_price").notNull(),
  note: text("note"),
  orderType: orderTypeEnum("order_type"),
  deliveryAddress: text("delivery_address"),
  internalNote: text("internal_note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));
