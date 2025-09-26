"use server";
import { adminRoutes } from "@/constants/route";
import { createOrder, CreateOrderRequest } from "@/services/orders";
import {
  createProduct,
  deleteProductImages,
  isExistingSlug,
  updateProductById,
} from "@/services/products";
import { AdminEditProductForm, NewProductDB } from "@/types/products";
import { revalidatePath } from "next/cache";

export async function createOrderAction(data: CreateOrderRequest) {
  try {
    const createdOrder = await createOrder(data);

    return {
      success: true,
      data: createdOrder,
    };
  } catch {
    return {
      success: false,
      error: "Failed to create order",
    };
  }
}

export async function createProductAction(data: NewProductDB) {
  try {
    console.log("Creating product with data:", data);
    const isExisSlug = await isExistingSlug(data.slug);

    if (isExisSlug) {
      return {
        success: false,
        code: 1,
        error: "Duplicate slug",
      };
    }

    const newProduct = await createProduct(data);
    // TODO: revalidate website

    return {
      success: true,
      data: { newProduct },
    };
  } catch {
    return {
      success: false,
      error: "Failed to create product",
    };
  }
}

export async function deleteProductImagesAction(ids: number[]) {
  try {
    await deleteProductImages(ids);
    // TODO: revalidate website

    return {
      success: true,
      data: { deletedIds: ids },
    };
  } catch {
    return {
      success: false,
      error: "Failed to delete product images",
    };
  }
}

export async function updateProductAction({
  data: { images, addons, ...rest },
  id,
}: {
  data: AdminEditProductForm;
  id: number;
}) {
  try {
    const imagesWithOrder = images.map((item, index) => ({
      ...item,
      sortOrder: index + 1,
      altText: rest.title,
    }));

    const addonsWithOrder = addons.map((item, index) => ({
      ...item,
      sortOrder: index + 1,
    }));

    await updateProductById({
      id,
      productData: rest,
      newAddons: addonsWithOrder
        .filter((item) => !item.id)
        .map((item) => ({
          ...item,
          productId: id,
        })),
      oldAddons: addonsWithOrder
        .filter((item) => item.id)
        .map((item) => ({
          ...item,
          id: item.id!,
          productId: id,
        })),
      newImages: imagesWithOrder
        .filter((item) => !item.id)
        .map((item) => ({
          ...item,
          productId: id,
        })),
      oldImages: imagesWithOrder
        .filter((item) => item.id)
        .map((item) => ({
          ...item,
          id: item.id!,
          productId: id,
        })),
    });

    revalidatePath(adminRoutes.product(id));
    // TODO: revalidate for website

    return {
      success: true,
      data: { id, message: "Product updated successfully" },
    };
  } catch {
    return {
      success: false,
      error: "Failed to update product",
    };
  }
}
