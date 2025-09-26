"use client";
import { Button } from "@/components/admin/ui/button";
import { useCreateOrder } from "@/hooks/web/order/useCreateOrder";
import React from "react";

const CreateOrder = () => {
  const { mutate } = useCreateOrder();
  return (
    <Button
      onClick={() =>
        mutate({
          orderData: {
            customerPhone: "0123456789",
            firstName: "John",
            lastName: "Doe",
            deliveryAddress: "123 Main St",
            orderType: "delivery",
            totalPrice: 185000,
            paymentMethod: "on_delivery",
            addressNote: "Leave at door",
            shippingFee: 15000,
            note: "Please deliver between 5-6 PM",
          },
          orderItems: [
            {
              productId: 2,
              productName: "Spaghetti",
              quantity: 2,
              price: 90000,
              totalPrice: 180000,
              note: "No cheese",
              addons: [
                {
                  addonId: 1,
                  addonName: "Tương ớt",
                  price: 5000,
                  quantity: 1,
                  totalPrice: 5000,
                },
              ],
            },
          ],
        })
      }
    >
      CreateOrder
    </Button>
  );
};

export default CreateOrder;
