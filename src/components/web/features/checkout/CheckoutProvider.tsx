"use client";
import useGetCartProducts from "@/hooks/web/cart/useGetCartProducts";
import { EShippingMethod } from "@/types/app-configs";
import { CartItemDisplay } from "@/types/cart";
import { CheckoutFormData, checkoutSchema } from "@/validations/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, FC, PropsWithChildren, useMemo } from "react";
import { Control, useForm, useWatch } from "react-hook-form";

const Context = createContext<{
  cartItems: CartItemDisplay[];
  control: Control<CheckoutFormData>;
  onCheckout: () => void;
  totalPrice: number;
  subTotalPrice: number;
  shippingFee: number;
} | null>(null);

const CheckoutProvider: FC<PropsWithChildren<{ shippingRules: any }>> = ({
  children,
  shippingRules,
}) => {
  const cartItems: CartItemDisplay[] = useGetCartProducts();
  const { control, handleSubmit } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onSubmit",
    defaultValues: {
      paymentMethod: "cash",
      shippingMethod: EShippingMethod.door2door,
      addressNote: "",
      customerFirstName: "",
      customerLastName: "",
      customerPhone: "",
      deliveryAddress: "",
      note: "",
    },
  });

  const shippingMethod = useWatch({
    control,
    name: "shippingMethod",
  });

  const subTotalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const shippingFee = useMemo(() => {
    if (shippingRules && shippingMethod === EShippingMethod.door2door) {
      shippingRules.sort((a: any, b: any) => b.minOrderValue - a.minOrderValue);
      for (const rule of shippingRules) {
        if (subTotalPrice >= rule.minOrderValue) {
          return rule.shippingFee;
        }
      }
    }
    return 0;
  }, [shippingRules, shippingMethod, subTotalPrice]);

  const totalPrice = subTotalPrice + shippingFee;

  const onCheckout = handleSubmit((data: CheckoutFormData) => {
    console.log(data);
  });

  return (
    <Context.Provider
      value={{
        cartItems,
        control,
        onCheckout,
        totalPrice,
        shippingFee,
        subTotalPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default CheckoutProvider;

export const useCheckoutContext = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(
      "useCheckoutContext must be used within a CheckoutProvider",
    );
  }
  return context;
};
