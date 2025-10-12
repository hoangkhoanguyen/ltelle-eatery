import { revalidateTag } from "next/cache";
import { REVALIDATION_MAP } from "@/constants/cache";

/**
 * Revalidate cache tags for specific action
 */
export function revalidateAction(actionKey: keyof typeof REVALIDATION_MAP) {
  const tags = REVALIDATION_MAP[actionKey];
  
  if (!tags) {
    console.warn(`No cache tags found for action: ${actionKey}`);
    return;
  }

  tags.forEach(tag => {
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
  tags.forEach(tag => {
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
  productCreated: () => revalidateAction('PRODUCT_CREATE'),
  productUpdated: (productId?: number) => {
    revalidateAction('PRODUCT_UPDATE');
    if (productId) {
      revalidateTags([`products:item:${productId}`]);
    }
  },
  productDeleted: () => revalidateAction('PRODUCT_DELETE'),
  
  // Categories  
  categoryCreated: () => revalidateAction('CATEGORY_CREATE'),
  categoryUpdated: (categoryId?: number) => {
    revalidateAction('CATEGORY_UPDATE');
    if (categoryId) {
      revalidateTags([`categories:item:${categoryId}`]);
    }
  },
  categoryDeleted: () => revalidateAction('CATEGORY_DELETE'),
  
  // Orders
  orderCreated: () => revalidateAction('ORDER_CREATE'),
  orderUpdated: (orderId?: number) => {
    revalidateAction('ORDER_UPDATE');
    if (orderId) {
      revalidateTags([`orders:item:${orderId}`]);
    }
  },
  orderStatusChanged: (orderId?: number) => {
    revalidateAction('ORDER_STATUS_UPDATE');
    if (orderId) {
      revalidateTags([`orders:item:${orderId}`]);
    }
  },
  
  // Configs
  configUpdated: (key?: string, type?: string) => {
    revalidateAction('CONFIG_UPDATE');
    if (key && type) {
      revalidateTags([`configs:key:${type}:${key}`]);
    }
  },
  
  // Reservations
  reservationCreated: () => revalidateAction('RESERVATION_CREATE'),
  reservationUpdated: (reservationId?: number) => {
    revalidateAction('RESERVATION_UPDATE');
    if (reservationId) {
      revalidateTags([`reservations:item:${reservationId}`]);
    }
  },
  reservationStatusChanged: () => revalidateAction('RESERVATION_STATUS_UPDATE'),
};
