import { relations } from "drizzle-orm";
import { dbSchema } from "../schema";
import {
  text,
  real,
  boolean,
  serial,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { productImages } from "./product-images";
import { productAddons } from "./product-addons";

export const products = dbSchema.table("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", {
    length: 255,
  })
    .notNull()
    .unique(),
  title: varchar("title", {
    length: 255,
  }).notNull(),
  allergenInfo: text("allergen_info"),
  subDescription: text("sub_description"),
  description: text("description"),
  price: real("price").default(0),
  isActive: boolean("is_active").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const productsRelations = relations(products, ({ many }) => ({
  images: many(productImages),
  addons: many(productAddons),
}));
