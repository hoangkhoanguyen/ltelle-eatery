"use server";

import { updateOrderInternalNote, updateOrderStatus } from "@/services/orders";
import { revalidatePath } from "next/cache";

export async function updateOrderStatusAction({
  orderId,
  status,
}: {
  orderId: number;
  status: "processing" | "completed" | "cancelled";
}) {
  try {
    const updatedOrder = await updateOrderStatus(orderId, status);

    revalidatePath("/admin/orders");
    return {
      success: true,
      data: { updatedOrder },
    };
  } catch (error) {
    console.log("Error updating order status:", error);
    return {
      success: false,
    };
  }
}

export async function updateOrderInternalNoteAction({
  orderId,
  internalNote,
}: {
  orderId: number;
  internalNote: string;
}) {
  try {
    const updatedOrder = await updateOrderInternalNote(orderId, internalNote);

    revalidatePath("/admin/orders");
    return {
      success: true,
      data: { updatedOrder },
    };
  } catch (error) {
    console.log("Error updating order internal note:", error);
    return {
      success: false,
    };
  }
}
