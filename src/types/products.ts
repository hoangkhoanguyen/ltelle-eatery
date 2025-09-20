import {
  productAddons,
  productCategories,
  productImages,
  products,
} from "@/db/schemas";
import {
  createProductSchema,
  productCategorySchema,
  updateProductSchema,
} from "@/validations/product";
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

export type AdminProductTableApi = ProductDB & {
  category: ProductCategoryDB;
  images: ProductImageDB[];
};

export interface AdminProductTable {
  id: number;
  title: string;
  price: number | null;
  category: string;
  imageUrl?: string;
  isActive: boolean;
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
  description: string | null;
}

export interface AdminProductImage {
  id: number;
  url: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
}

export type AdminRelatedProduct = Pick<AdminProductTable, "id" | "title">;

export interface AdminProductDetails
  extends Omit<AdminProductTable, "category" | "imageUrl"> {
  images: AdminProductImage[];
  addons: AdminProductAddons[];
  category: AdminProductCategory;
  slug: string;
  allergenInfo: string | null;
  subDescription: string | null;
  description: string | null;
  relatedProducts: AdminRelatedProduct[];
  isActive: boolean;
}

export type AdminCreateProductForm = z.infer<typeof createProductSchema>;

export type AdminCreateProductCategoryForm = z.infer<
  typeof productCategorySchema
>;

export type AdminEditProductForm = z.infer<typeof updateProductSchema>;
