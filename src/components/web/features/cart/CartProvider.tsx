import useGetCartProducts from "@/hooks/web/cart/useGetCartProducts";
import { CartItemDisplay } from "@/types/cart";
import React, { FC, PropsWithChildren, useMemo } from "react";

const Context = React.createContext<{
  cartItems: CartItemDisplay[];
  totalPrice: number;
} | null>(null);

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const cartItems = useGetCartProducts();

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cartItems]);

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
