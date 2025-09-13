import { z } from "zod";

export const productCategorySchema = z.object({
  name: z
    .string()
    .min(1, { error: "Tên danh mục không được để trống" })
    .max(255, { error: "Tên danh mục quá dài" }),
  isActive: z.boolean().optional(),
  description: z.string().max(1000, { error: "Mô tả quá dài" }).optional(),
});

const productAddonSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Tên addons không được để trống" })
    .max(255, { error: "Tên addons quá dài" }),
  price: z.number({ error: "Giá không hợp lệ" }),
  isActive: z.boolean().optional(),
});

const productImageSchema = z.object({
  url: z.string({ message: "URL hình ảnh không hợp lệ" }),
  altText: z
    .string()
    .max(255, { error: "Văn bản thay thế quá dài" })
    .optional(),
  isPrimary: z.boolean().optional().default(false),
  sortOrder: z.number().min(0).optional().default(0),
});

const basicProductSchema = {
  title: z
    .string()
    .min(1, { error: "Tên sản phẩm không được để trống" })
    .max(255, { error: "Tên sản phẩm quá dài" }),
  slug: z
    .string()
    .min(1, { error: "Slug không được để trống" })
    .max(255, { error: "Slug quá dài" }),
  categoryId: z.number({ error: "Danh mục không hợp lệ" }).min(1, {
    error: "Danh mục không hợp lệ",
  }),
};

export const createProductSchema = z.object({
  ...basicProductSchema,
});

const relatedProductSchema = z.object({
  id: z.number({ error: "Sản phẩm liên quan không hợp lệ" }).min(1, {
    error: "Sản phẩm liên quan không hợp lệ",
  }),
  title: z.string(),
  imageUrl: z.string().optional(),
});

export const updateProductSchema = z.object({
  ...basicProductSchema,
  allergenInfo: z.string().optional(),
  subDescription: z.string().optional(),
  description: z.string().optional(),
  price: z
    .number({ error: "Giá không hợp lệ" })
    .positive({ error: "Giá phải là số dương" }),
  relatedProductId: z.array(relatedProductSchema).optional(),
  isActive: z.boolean().default(false),
  addons: z.array(productAddonSchema).optional().default([]),
  images: z.array(productImageSchema).optional().default([]),
});
