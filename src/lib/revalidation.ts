import { revalidateTag } from "next/cache";
import { REVALIDATION_MAP, CACHE_TAGS } from "@/constants/cache";

// Feature flags
const REVALIDATION_ENABLED = false; // Set to true when ready to use cache revalidation

/**
 * Revalidate cache tags for specific action
 */
export function revalidateAction(actionKey: keyof typeof REVALIDATION_MAP) {
  if (!REVALIDATION_ENABLED) return;
  const tags = REVALIDATION_MAP[actionKey];

  if (!tags) {
    console.warn(`No cache tags found for action: ${actionKey}`);
    return;
  }

  tags.forEach((tag) => {
    try {
      revalidateTag(tag);
      console.log(`Cache revalidated for tag: ${tag}`);
    } catch (error) {
      console.error(`Failed to revalidate tag ${tag}:`, error);
    }
  });
}

/**
 * Revalidate specific cache tags
 */
export function revalidateTags(tags: string[]) {
  if (!REVALIDATION_ENABLED) return;
  tags.forEach((tag) => {
    try {
      revalidateTag(tag);
      console.log(`Cache revalidated for tag: ${tag}`);
    } catch (error) {
      console.error(`Failed to revalidate tag ${tag}:`, error);
    }
  });
}

/**
 * Helper để revalidate các action phổ biến
 */
export const revalidateHelpers = {
  // Products
  productCreated: () => revalidateAction("PRODUCT_CREATE"),
  productUpdated: (productId?: number, categorySlug?: string) => {
    revalidateAction("PRODUCT_UPDATE");
    if (productId) {
      revalidateTags([CACHE_TAGS.PRODUCTS.BY_ID(productId)]);
    }
    // Revalidate specific category and "all" category
    if (categorySlug) {
      revalidateTags([
        CACHE_TAGS.PRODUCTS.BY_CATEGORY_SLUG(categorySlug),
        CACHE_TAGS.PRODUCTS.BY_CATEGORY_SLUG("all"), // Always revalidate "all" category
      ]);
    }
  },

  // Categories
  categoryCreated: () => revalidateAction("CATEGORY_CREATE"),
  categoryUpdated: (categoryId?: number) => {
    revalidateAction("CATEGORY_UPDATE");
    if (categoryId) {
      revalidateTags([CACHE_TAGS.CATEGORIES.BY_ID(categoryId)]);
    }
  },

  // Orders
  orderCreated: () => revalidateAction("ORDER_CREATE"),
  orderUpdated: (orderId?: number) => {
    revalidateAction("ORDER_UPDATE");
    if (orderId) {
      revalidateTags([CACHE_TAGS.ORDERS.BY_ID(orderId)]);
    }
  },
  orderStatusChanged: (orderId?: number) => {
    revalidateAction("ORDER_STATUS_UPDATE");
    if (orderId) {
      revalidateTags([CACHE_TAGS.ORDERS.BY_ID(orderId)]);
    }
  },

  // Configs
  configUpdated: (key?: string, type?: string) => {
    revalidateAction("CONFIG_UPDATE");
    if (key && type) {
      revalidateTags([CACHE_TAGS.CONFIGS.BY_KEY(key, type)]);
    }
  },

  // Reservations
  reservationCreated: () => revalidateAction("RESERVATION_CREATE"),
  reservationUpdated: (reservationId?: number) => {
    revalidateAction("RESERVATION_UPDATE");
    if (reservationId) {
      revalidateTags([CACHE_TAGS.RESERVATIONS.BY_ID(reservationId)]);
    }
  },
  reservationStatusChanged: (reservationId?: number) => {
    revalidateAction("RESERVATION_STATUS_UPDATE");
    if (reservationId) {
      revalidateTags([CACHE_TAGS.RESERVATIONS.BY_ID(reservationId)]);
    }
  },

  // ==================== SPECIFIC CACHE INVALIDATION ====================

  // Images
  imageUploaded: (productId?: number) => {
    revalidateAction("IMAGE_UPLOAD");
    if (productId) {
      revalidateTags([CACHE_TAGS.PRODUCTS.BY_ID(productId)]);
    }
  },

  imageDeleted: (productId?: number) => {
    revalidateAction("IMAGE_DELETE");
    if (productId) {
      revalidateTags([CACHE_TAGS.PRODUCTS.BY_ID(productId)]);
    }
  },

  // Addons
  addonCreated: (productId?: number) => {
    revalidateAction("ADDON_CREATE");
    if (productId) {
      revalidateTags([CACHE_TAGS.PRODUCTS.BY_ID(productId)]);
    }
  },

  addonUpdated: (productId?: number) => {
    revalidateAction("ADDON_UPDATE");
    if (productId) {
      revalidateTags([CACHE_TAGS.PRODUCTS.BY_ID(productId)]);
    }
  },

  // Cart
  cartUpdated: () => revalidateAction("CART_UPDATE"),

  // Category Relations
  categoryProductAdded: (categoryId?: number, productId?: number) => {
    revalidateAction("CATEGORY_PRODUCT_ADD");
    if (categoryId && productId) {
      revalidateTags([
        CACHE_TAGS.CATEGORIES.BY_ID(categoryId),
        CACHE_TAGS.PRODUCTS.BY_ID(productId),
        CACHE_TAGS.PRODUCTS.BY_CATEGORY(categoryId),
      ]);
    }
  },

  categoryProductRemoved: (categoryId?: number, productId?: number) => {
    revalidateAction("CATEGORY_PRODUCT_REMOVE");
    if (categoryId && productId) {
      revalidateTags([
        CACHE_TAGS.CATEGORIES.BY_ID(categoryId),
        CACHE_TAGS.PRODUCTS.BY_ID(productId),
        CACHE_TAGS.PRODUCTS.BY_CATEGORY(categoryId),
      ]);
    }
  },

  // Bulk operations
  bulkProductUpdate: () => revalidateAction("BULK_PRODUCT_UPDATE"),
  bulkOrderUpdate: () => revalidateAction("BULK_ORDER_UPDATE"),

  // Full refresh - use sparingly
  fullRefresh: () => revalidateAction("FULL_REFRESH"),

  // ==================== DYNAMIC TAG INVALIDATION ====================

  // Invalidate specific product by ID
  invalidateProduct: (productId: number) => {
    revalidateTags([CACHE_TAGS.PRODUCTS.BY_ID(productId)]);
  },

  // Invalidate specific product by slug
  invalidateProductSlug: (slug: string) => {
    revalidateTags([CACHE_TAGS.PRODUCTS.BY_SLUG(slug)]);
  },

  // Invalidate specific category
  invalidateCategory: (categoryId: number) => {
    revalidateTags([CACHE_TAGS.CATEGORIES.BY_ID(categoryId)]);
  },

  // Invalidate specific order
  invalidateOrder: (orderId: number) => {
    revalidateTags([CACHE_TAGS.ORDERS.BY_ID(orderId)]);
  },

  // Invalidate specific reservation
  invalidateReservation: (reservationId: number) => {
    revalidateTags([CACHE_TAGS.RESERVATIONS.BY_ID(reservationId)]);
  },

  // Invalidate specific config
  invalidateConfig: (key: string, type: string) => {
    revalidateTags([CACHE_TAGS.CONFIGS.BY_KEY(key, type)]);
  },

  // Invalidate products by category
  invalidateProductsByCategory: (categorySlug: string) => {
    revalidateTags([CACHE_TAGS.PRODUCTS.BY_CATEGORY_SLUG(categorySlug)]);
  },
};
