import {
  boolean,
  integer,
  real,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { dbSchema } from "../schema";
import { relations } from "drizzle-orm";
import { products } from "./products";

export const productAddons = dbSchema.table("product_addons", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  price: real("price").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const productAddonRelations = relations(productAddons, ({ one }) => ({
  product: one(products, {
    fields: [productAddons.productId],
    references: [products.id],
  }),
}));
