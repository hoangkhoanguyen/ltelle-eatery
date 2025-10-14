"use server";
import { adminRoutes } from "@/constants/route";
import {
  checkProductExists,
  createProduct,
  deleteProductImages,
  isExistingSlug,
  updateProductById,
  updateProductStatus,
} from "@/services/products";
import { AdminEditProductForm, NewProductDB } from "@/types/products";
import { revalidatePath } from "next/cache";

export async function createProductAction(data: NewProductDB) {
  try {
    const isExisSlug = await isExistingSlug(data.slug);

    if (isExisSlug) {
      return {
        success: false,
        error: "Đường dẫn đã tồn tại",
        code: "DUPLICATE_SLUG",
      };
    }

    const newProduct = await createProduct(data);

    return {
      success: true,
      data: { newProduct },
    };
  } catch (error) {
    console.log("Error creating product:", error);
    return {
      success: false,
      error: "Không thể tạo sản phẩm",
    };
  }
}

export async function deleteProductImagesAction(ids: number[]) {
  try {
    await deleteProductImages(ids);

    return {
      success: true,
      data: { deletedIds: ids },
    };
  } catch (error) {
    console.log("Error deleting product images:", error);
    return {
      success: false,
      error: "Không thể xóa hình ảnh sản phẩm",
    };
  }
}

export async function updateProductAction({
  data: { images, addons, relatedProducts, ...rest },
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
      productData: {
        ...rest,
        relatedProductIds: relatedProducts.map((item) => item.id),
      },
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

    return {
      success: true,
      data: { id, message: "Cập nhật sản phẩm thành công" },
    };
  } catch (error) {
    console.log("Error updating product:", error);
    return {
      success: false,
      error: "Không thể cập nhật sản phẩm",
    };
  }
}

export async function updateProductStatusAction(id: number, isActive: boolean) {
  try {
    // Validate product exists
    const productExists = await checkProductExists(id);
    if (!productExists) {
      return {
        success: false,
        error: "Sản phẩm không tồn tại",
        code: "PRODUCT_NOT_FOUND",
      };
    }

    // Update product status
    const updatedProduct = await updateProductStatus(id, isActive);

    return {
      success: true,
      data: {
        product: updatedProduct,
        message: isActive
          ? "Kích hoạt sản phẩm thành công"
          : "Vô hiệu hóa sản phẩm thành công",
      },
    };
  } catch (error) {
    console.log("Error updating product status:", error);
    return {
      success: false,
      error: "Không thể cập nhật trạng thái sản phẩm",
    };
  }
}
