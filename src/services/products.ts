import { DB, db } from "@/db/drizzle";
import {
  productAddons,
  productCategories,
  productImages,
  products,
} from "@/db/schemas";
import {
  NewProductAddOnDB,
  NewProductCategoryDB,
  NewProductDB,
  NewProductImageDB,
  ProductAddOnDB,
  ProductImageDB,
  UpdateProductAddOnDB,
  UpdateProductImageDB,
} from "@/types/products";
import { eq } from "drizzle-orm";

export async function addProductCategory(categoryData: NewProductCategoryDB) {
  const [newCategory] = await db
    .insert(productCategories)
    .values({
      ...categoryData,
    })
    .returning();

  return newCategory;
}

export async function createProduct(productData: NewProductDB) {
  const [newProduct] = await db
    .insert(products)
    .values({
      ...productData,
    })
    .returning();

  return newProduct;
}

export async function getAdminProductTable({
  limit = 20,
  page = 1,
}: {
  limit?: number;
  page?: number;
  search?: string;
}) {
  const offset = limit * (page - 1);

  const [productsList, totalCount] = await Promise.all([
    db.query.products.findMany({
      limit,
      offset,
      with: {
        category: true,
        images: {
          where: (image, { eq }) => eq(image.isPrimary, true),
          limit: 1,
        },
      },
    }),

    db.$count(products),
  ]);

  return {
    products: productsList,
    total: totalCount,
    page,
    limit,
  };
}

export async function getAdminProductById(id: number) {
  return await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      category: true,
      addons: true,
      images: true,
    },
  });
}

export async function addProductAddons(data: NewProductAddOnDB[], tx?: DB) {
  const executor = tx ?? db;
  return await executor.insert(productAddons).values(data).returning();
}

export async function updateProductAddon(
  id: number,
  data: UpdateProductAddOnDB,
  tx?: DB,
) {
  const executor = tx ?? db;
  const [updated] = await executor
    .update(productAddons)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(productAddons.id, id))
    .returning();
  return updated;
}

export async function updateProductAddons(
  addons: (Partial<UpdateProductAddOnDB> & { id: number })[],
  tx?: DB,
) {
  const executor = tx ?? db;
  const updated: ProductAddOnDB[] = [];

  for (const addon of addons) {
    // Fetch current addon
    const current = await executor.query.productAddons.findFirst({
      where: eq(productAddons.id, addon.id!),
      columns: {
        name: true,
        price: true,
        isActive: true,
        sortOrder: true,
      },
    });
    // Only update if data has changed
    if (
      current &&
      Object.keys(current).some(
        (key) =>
          addon[key as keyof UpdateProductAddOnDB] !==
          current[key as keyof typeof current],
      )
    ) {
      const result = await updateProductAddon(addon.id, addon, executor);
      if (result) updated.push(result);
    }
  }
  return updated;
}

export async function addProductImages(
  newImages: NewProductImageDB[],
  tx?: DB,
) {
  const executor = tx ?? db;

  return executor.insert(productImages).values(newImages).returning({
    id: productImages.id,
    url: productImages.url,
    altText: productImages.altText,
    isPrimary: productImages.isPrimary,
    sortOrder: productImages.sortOrder,
  });
}

export async function updateProductImage(
  id: number,
  data: UpdateProductImageDB,
  tx?: DB,
) {
  const executor = tx ?? db;
  return await executor
    .update(productImages)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(productImages.id, id))
    .returning();
}

export async function deleteProductImage(id: number) {
  const [deletedImage] = await db
    .delete(productImages)
    .where(eq(productImages.id, id))
    .returning();
  return deletedImage;
}

export async function updateProductImages(
  images: (Partial<UpdateProductImageDB> & { id: number })[],
  tx?: DB,
) {
  const executor = tx ?? db;
  const updated: ProductImageDB[] = [];

  for (const image of images) {
    // Fetch current image
    const current = await executor.query.productImages.findFirst({
      where: eq(productImages.id, image.id!),
      columns: {
        url: true,
        altText: true,
        isPrimary: true,
        sortOrder: true,
      },
    });
    // Only update if data has changed
    if (
      current &&
      Object.keys(current).some(
        (key) =>
          image[key as keyof UpdateProductImageDB] !==
          current[key as keyof typeof current],
      )
    ) {
      const [result] = await updateProductImage(image.id, image, executor);
      if (result) updated.push(result);
    }
  }
  return updated;
}

export async function updateProductById({
  id,
  productData,
  newAddons,
  oldAddons,
  newImages,
  oldImages,
}: {
  id: number;
  productData: Partial<NewProductDB>;
  newAddons: NewProductAddOnDB[];
  oldAddons: (UpdateProductAddOnDB & { id: number })[];
  newImages: NewProductImageDB[];
  oldImages: (UpdateProductImageDB & { id: number })[];
}) {
  return await db.transaction(async (tx) => {
    await Promise.all([
      // update addons
      newAddons.length > 0
        ? addProductAddons(newAddons, tx)
        : Promise.resolve([]),
      oldAddons.length > 0
        ? updateProductAddons(oldAddons, tx)
        : Promise.resolve([]),
      // update images
      newImages.length > 0
        ? addProductImages(newImages, tx)
        : Promise.resolve([]),
      oldImages.length > 0
        ? updateProductImages(oldImages, tx)
        : Promise.resolve([]),
    ]);

    // update product
    const [updatedProduct] = await tx
      .update(products)
      .set({
        ...productData,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    return updatedProduct;
  });
}
