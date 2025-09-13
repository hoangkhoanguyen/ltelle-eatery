import {
  productAddons,
  productCategories,
  productImages,
  products,
} from "@/db/schemas";
import { createProductSchema } from "@/validations/product";
import { z } from "zod";

export type ProductDB = typeof products.$inferSelect;
export type NewProductDB = typeof products.$inferInsert;
export type UpdateProductDB = Partial<NewProductDB>;

export type ProductCategoryDB = typeof productCategories.$inferSelect;
export type NewProductCategoryDB = typeof productCategories.$inferInsert;
export type UpdateProductCategoryDB = Partial<NewProductCategoryDB>;

export type ProductAddOnDB = typeof productAddons.$inferSelect;
export type NewProductAddOnDB = Omit<
  typeof productAddons.$inferInsert,
  "createdAt" | "updatedAt"
>;
export type UpdateProductAddOnDB = Omit<
  Partial<NewProductAddOnDB>,
  "createdAt" | "updatedAt"
>;

export type ProductImageDB = typeof productImages.$inferSelect;
export type NewProductImageDB = Omit<
  typeof productImages.$inferInsert,
  "createdAt" | "updatedAt"
>;
export type UpdateProductImageDB = Omit<
  Partial<NewProductImageDB>,
  "createdAt" | "updatedAt"
>;

export interface AdminProductTable {
  id: number;
  title: string;
  price: number;
  category: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdminProductAddons {
  id: number;
  name: string;
  price: number;
  isActive: boolean;
}

export interface AdminProductCategory {
  id: number;
  name: string;
  isActive: boolean;
  description?: string;
}

export interface AdminProductImage {
  id: number;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export type AdminRelatedProduct = Pick<
  AdminProductTable,
  "id" | "title" | "imageUrl"
>;

export interface AdminProductDetails
  extends Omit<AdminProductTable, "category" | "imageUrl"> {
  images: AdminProductImage[];
  addons: AdminProductAddons[];
  category: AdminProductCategory;
  allergenInfo?: string;
  subDescription?: string;
  description?: string;
  relatedProducts: AdminRelatedProduct[];
  isActive: boolean;
}

export type AdminCreateProductForm = z.infer<typeof createProductSchema>;
