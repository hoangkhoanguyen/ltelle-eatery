"use server";
import { createOrder } from "@/services/orders";
import {
  NewOrderDB,
  NewOrderItemAddonDB,
  NewOrderItemDB,
} from "@/types/orders";

export async function createOrderAction(data: {
  orderData: Omit<NewOrderDB, "code">;
  orderItems: (Omit<NewOrderItemDB, "id" | "orderId"> & {
    addons?: Omit<NewOrderItemAddonDB, "id" | "orderItemId">[];
  })[];
}) {
  try {
    const createdOrder = await createOrder(data);

    return {
      success: true,
      data: createdOrder,
    };
  } catch (error) {
    console.log('"createOrderAction" error', error);
    return {
      success: false,
      error: "Failed to create order",
    };
  }
}
