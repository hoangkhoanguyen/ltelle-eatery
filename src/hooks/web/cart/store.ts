import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { toast } from "sonner";
import { capitalize } from "lodash";

export interface CartItemsSlice {
  cart: CartItem[];
  length: number;
}

export interface CartActionsSlice {
  addToCart: (item: Omit<CartItem, "id">, productName: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateAddonQuantity: (id: string, addonId: number, quantity: number) => void;
  updateNote: (id: string, notes: string) => void;
}

export type CartSlice = {
  context: CartItemsSlice;
  actions: CartActionsSlice;
};

const CART_STORAGE_KEY = "cart";

export const useCartStore = create<CartSlice>()(
  persist(
    (set, get) => ({
      context: {
        cart: [],
        length: 0,
      },
      actions: {
        addToCart: (item, productName) => {
          set((state) => ({
            context: {
              cart: [
                ...state.context.cart,
                { ...item, id: crypto.randomUUID() },
              ],
              length: state.context.cart.length + 1,
            },
          }));
          toast.success(`${capitalize(productName)} added to cart`, {
            description: "Ready for checkout",
          });
        },
        removeFromCart(id) {
          set((state) => ({
            context: {
              cart: state.context.cart.filter((item) => item.id !== id),
              length: state.context.cart.length - 1,
            },
          }));
        },
        clearCart() {
          set(() => ({
            context: { cart: [], length: 0 },
          }));
        },
        updateQuantity(id, quantity) {
          set((state) => ({
            context: {
              ...state.context,
              cart: state.context.cart.map((item) =>
                item.id === id ? { ...item, quantity } : item,
              ),
            },
          }));
        },
        updateAddonQuantity(id, addonId, quantity) {
          const item = get().context.cart.find((item) => item.id === id);
          if (!item) return;
          const addon = item.addons.find((addon) => addon.id === addonId);
          if (!addon) {
            set((state) => ({
              context: {
                ...state.context,
                cart: state.context.cart.map((cartItem) =>
                  cartItem.id === id
                    ? {
                        ...cartItem,
                        addons: [...cartItem.addons, { id: addonId, quantity }],
                      }
                    : cartItem,
                ),
              },
            }));

            return;
          }

          set((state) => ({
            context: {
              ...state.context,
              cart: state.context.cart.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      addons: item.addons.map((addon) =>
                        addon.id === addonId ? { ...addon, quantity } : addon,
                      ),
                    }
                  : item,
              ),
            },
          }));
        },
        updateNote(id, notes) {
          set((state) => ({
            context: {
              ...state.context,
              cart: state.context.cart.map((item) =>
                item.id === id ? { ...item, notes } : item,
              ),
            },
          }));
        },
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
