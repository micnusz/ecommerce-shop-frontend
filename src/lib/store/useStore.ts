import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/app/types/types";

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void; // nowa funkcja
};

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          const validQuantity = Math.max(1, quantity);
          const index = state.items.findIndex((item) => item.id === product.id);

          if (index > -1) {
            const updatedItems = [...state.items];
            updatedItems[index].quantity += validQuantity;
            return { items: updatedItems };
          }

          return {
            items: [...state.items, { ...product, quantity: validQuantity }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      clearCart: () => set({ items: [] }),

      // ===== nowa funkcja =====
      updateQuantity: (productId, quantity) =>
        set((state) => {
          const validQuantity = Math.max(1, quantity); // minimalna 1
          const updatedItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity: validQuantity } : item
          );
          return { items: updatedItems };
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);
