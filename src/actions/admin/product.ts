"use server";
import { adminRoutes } from "@/constants/route";
import {
  createProduct,
  deleteProductImages,
  isExistingSlug,
  updateProductById,
} from "@/services/products";
import { AdminEditProductForm, NewProductDB } from "@/types/products";
import { revalidatePath } from "next/cache";

export async function createProductAction(data: NewProductDB) {
  // Process form data and create product
  console.log("Creating product with data:", data);
  const isExisSlug = await isExistingSlug(data.slug);

  if (isExisSlug)
    throw {
      code: 1,
      message: "Duplicate slug",
    };
  const newProduct = await createProduct(data);
  // You can call your service function here to save the product to the database
  // TODO: revalidate
  return { newProduct };
}

export async function deleteProductImagesAction(ids: number[]) {
  try {
    // delete
    await deleteProductImages(ids);
    // TODO: revalidate website

    return {
      result: "success",
    };
  } catch (error) {
    console.log("eror", error);
    return {
      result: "error",
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
    message: "success",
  };
}
