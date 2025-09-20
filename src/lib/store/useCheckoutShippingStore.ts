import { create } from "zustand";

// Definicja typu metody wysyłki
export type ShippingMethod = {
  id: number;
  name: string;
  price: number;
};

// Typ stanu checkout
type CheckoutState = {
  shippingMethods: ShippingMethod[];
  selectedShippingMethod: ShippingMethod | null;
  setSelectedShippingMethod: (method: ShippingMethod) => void;
};

// Tworzymy store
export const useCheckoutStore = create<CheckoutState>((set) => ({
  shippingMethods: [
    { id: 1, name: "DHL", price: 14.99 },
    { id: 2, name: "GLS", price: 11.99 },
  ],
  selectedShippingMethod: null,
  setSelectedShippingMethod: (method) =>
    set({ selectedShippingMethod: method }),
}));
