"use server";
import { updateOrderInternalNote, updateOrderStatus } from "@/services/orders";

export async function updateOrderStatusAction({
  orderId,
  status,
}: {
  orderId: number;
  status: "processing" | "completed" | "cancelled";
}) {
  try {
    const updatedOrder = await updateOrderStatus(orderId, status);

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
