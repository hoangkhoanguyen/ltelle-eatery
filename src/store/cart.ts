import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cart";
import { create } from "zustand";

// Slice chỉ lưu danh sách item trong cart
export interface CartItemsSlice {
  cart: CartItem[];
}

export interface CartActionsSlice {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateAddonQuantity: (id: string, addonId: string, quantity: number) => void;
}

export type CartSlice = {
  context: CartItemsSlice;
  actions: CartActionsSlice;
};

const CART_STORAGE_KEY = "cart";

export const useCart = create<CartSlice>()(
  persist(
    (set) => ({
      context: {
        cart: [],
      },
      actions: {
        addToCart: (item) => {},
        removeFromCart(id) {},
        clearCart() {},
        updateQuantity(id, quantity) {},
        updateAddonQuantity(id, addonId, quantity) {},
      },
    }),
    {
      name: CART_STORAGE_KEY,
      partialize(state) {
        return { context: state.context };
      },
    },
  ),
);
