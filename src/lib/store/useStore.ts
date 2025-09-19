import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/app/types/types";

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void; // quantity opcjonalnie
  removeItem: (productId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          const index = state.items.findIndex((item) => item.id === product.id);

          if (index > -1) {
            const updatedItems = [...state.items];
            updatedItems[index].quantity += quantity;
            return { items: updatedItems };
          }

          return { items: [...state.items, { ...product, quantity }] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
