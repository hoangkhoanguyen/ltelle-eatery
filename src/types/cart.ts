export interface CartItemAddon {
  id: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  addons?: CartItemAddon[];
  notes?: string;
}
