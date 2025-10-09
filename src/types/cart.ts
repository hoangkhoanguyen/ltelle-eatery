export interface CartItemAddon {
  id: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  productId: number;
  quantity: number;
  addons: CartItemAddon[];
  notes: string;
}
