import { useCartStore } from "@/hooks/web/cart/store";
import useGetProductsDetailsByIds from "@/hooks/web/products/useGetProductsDetailsByIds";
import { CartItemDisplay } from "@/types/cart";
import React, { FC, PropsWithChildren, useMemo } from "react";

const Context = React.createContext<{
  cartItems: CartItemDisplay[];
  totalPrice: number;
} | null>(null);

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const cart = useCartStore((state) => state.context.cart);

  const productIds = useMemo(() => cart.map((item) => item.productId), [cart]);

  const { data: products } = useGetProductsDetailsByIds({ ids: productIds });

  const cartItems: CartItemDisplay[] = useMemo((): CartItemDisplay[] => {
    if (!products) return [];
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          ...item,
          title: product.title,
          imageUrl: product.imageUrl || "",
          category: product.category,
          price: product.price,
          slug: product.slug,
          addons: product.addons.map((addon) => ({
            id: addon.id,
            name: addon.name,
            price: addon.price,
            quantity: item.addons.find((a) => a.id === addon.id)?.quantity || 0,
          })),
          totalPrice:
            item.quantity * product.price +
            product.addons.reduce((sum, addon) => {
              const addonInCart = item.addons.find((a) => a.id === addon.id);
              if (!addonInCart) return sum;
              return sum + addon.price * addonInCart.quantity;
            }, 0),
        };
      })
      .filter((item) => item !== null);
  }, [cart, products]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cartItems]);

  console.log("cartItems", cart);

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default CartProvider;

export const useCartContext = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
