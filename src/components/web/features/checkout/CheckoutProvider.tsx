"use client";
import { useCartStore } from "@/hooks/web/cart/store";
import useGetCartProducts from "@/hooks/web/cart/useGetCartProducts";
import useCheckout from "@/hooks/web/checkout/useCheckout";
import { useSetLoading } from "@/hooks/web/ui/loading";
import { CreateOrderResponse } from "@/services/orders";
import { EShippingMethod } from "@/types/app-configs";
import { CartItemDisplay } from "@/types/cart";
import { CheckoutFormData, checkoutSchema } from "@/validations/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import { Control, useForm, useWatch } from "react-hook-form";
import EmptyCart from "../cart/EmptyCart";

const mockOrder: CreateOrderResponse = {
  order: {
    id: 3,
    uuid: "6fb31135-67ee-452e-83c0-9c540296978c",
    code: "3MHYQC2N",
    firstName: "Hưng",
    lastName: "Trương",
    customerPhone: "0987445132",
    totalPrice: 1800000,
    note: "",
    internalNote: "",
    orderType: "pickup",
    orderTypeLabel: "Pick up restaurant",
    deliveryAddress: "",
    addressNote: "",
    status: "pending",
    paymentMethod: "cash",
    shippingFee: 0,
    createdAt: new Date("2025-10-16T10:13:54.420Z"),
    updatedAt: new Date("2025-10-16T10:13:54.420Z"),
  },
  items: [
    {
      id: 5,
      orderId: 3,
      productId: 3,
      productName: "Bánh bao trứng muối",
      price: 300000,
      quantity: 6,
      totalPrice: 1940000,
      note: "",
      createdAt: new Date("2025-10-16T10:13:54.420Z"),
      updatedAt: new Date("2025-10-16T10:13:54.420Z"),
      addons: [
        {
          id: 5,
          orderItemId: 5,
          addonId: 3,
          addonName: "Trứng cút 1",
          price: 20000,
          quantity: 7,
          totalPrice: 140000,
          createdAt: new Date("2025-10-16T10:13:54.420Z"),
          updatedAt: new Date("2025-10-16T10:13:54.420Z"),
        },
      ],
      productImageUrl:
        "https://ltelle-upload.erosnguyen.com/uploads/img/z7119287184735_d9302ceae5fe98ee9cb5acb4a48264a2.jpg",
      productSlug: "banh-bao-trung-muoi",
    },
    {
      id: 6,
      orderId: 3,
      productId: 2,
      productName: "Spagetti",
      price: 0,
      quantity: 3,
      totalPrice: 0,
      note: "",
      createdAt: new Date("2025-10-16T10:13:54.420Z"),
      updatedAt: new Date("2025-10-16T10:13:54.420Z"),
      addons: [],
      productImageUrl:
        "https://ltelle-upload.erosnguyen.com/uploads/img/z7119287184735_d9302ceae5fe98ee9cb5acb4a48264a2.jpg",
      productSlug: "spagetti",
    },
  ],
};

const Context = createContext<{
  cartItems: CartItemDisplay[];
  control: Control<CheckoutFormData>;
  onCheckout: () => void;
  totalPrice: number;
  subTotalPrice: number;
  shippingFee: number;
  successOrder: CreateOrderResponse | null;
} | null>(null);

const CheckoutProvider: FC<
  PropsWithChildren<{
    shippingRules: any;
    defaultMethod?: EShippingMethod;
    shippingMethods: any;
  }>
> = ({ children, shippingRules, defaultMethod, shippingMethods }) => {
  const [successOrder, setSuccessOrder] = useState<CreateOrderResponse | null>(
    null,
  );
  const { mutate, isPending } = useCheckout();
  const clearCart = useCartStore((state) => state.actions.clearCart);
  const cartItems: CartItemDisplay[] = useGetCartProducts();
  const { control, handleSubmit } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onSubmit",
    defaultValues: {
      paymentMethod: "cash",
      shippingMethod: defaultMethod,
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
    return cartItems.reduce(
      (acc, item) =>
        acc +
        item.price * item.quantity +
        item.addons.reduce(
          (result, addon) => result + addon.price * addon.quantity,
          0,
        ),
      0,
    );
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
    mutate(
      {
        orderData: {
          customerPhone: data.customerPhone,
          firstName: data.customerFirstName,
          lastName: data.customerLastName,
          paymentMethod: data.paymentMethod,
          orderType: data.shippingMethod,
          deliveryAddress: data.deliveryAddress,
          totalPrice: totalPrice,
          shippingFee: shippingFee,
          note: data.note,
          addressNote: data.addressNote,
          internalNote: "",
          orderTypeLabel: shippingMethods.find(
            (item: any) => item.method === data.shippingMethod,
          )?.label,
        },
        orderItems: cartItems.map((item) => ({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
          productName: item.title,
          totalPrice: item.totalPrice,
          note: item.notes || "",
          addons: item.addons.map((addon) => ({
            quantity: addon.quantity,
            price: addon.price,
            totalPrice: addon.price * addon.quantity,
            addonId: addon.id,
            addonName: addon.name,
          })),
        })),
      },
      {
        onSuccess: (data) => {
          if (data.success && data.data) {
            setSuccessOrder(data.data);
            clearCart();
          }
        },
      },
    );
  });

  useSetLoading(isPending);

  return (
    <Context.Provider
      value={{
        cartItems,
        control,
        onCheckout,
        totalPrice,
        shippingFee,
        subTotalPrice,
        successOrder,
      }}
    >
      {cartItems.length > 0 ? children : <EmptyCart />}
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
