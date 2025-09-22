"use client";

import { useCartStore } from "@/lib/store/useStore";
import { Button } from "./ui/button";
import { BaggageClaim, X } from "lucide-react";
import Link from "next/link";
import { useCheckoutStore } from "@/lib/store/useCheckoutShippingStore";

export const CheckoutPaymentCartView = () => {
  const { selectedShippingMethod } = useCheckoutStore();
  const cartItems = useCartStore((state) => state.items);

  const shippingPrice = selectedShippingMethod?.price || 0;

  // Subtotal = suma produktów
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Total = subtotal + shipping
  const totalPrice = subtotal + shippingPrice;

  return (
    <div className="flex flex-col gap-4">
      {cartItems.length === 0 && (
        <div className="flex flex-col items-center gap-y-1">
          <BaggageClaim className="w-24 h-24 text-muted-foreground" />

          <p className="text-center text-muted-foreground py-10">
            Your cart is currently empty.
          </p>
          <Link href={`/`}>
            <Button>Start shopping</Button>
          </Link>
        </div>
      )}

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b pb-2"
        >
          <div>
            <Link href={`/products/${item.slug}`}>
              <p className="font-semibold hover:text-gray-400">{item.title}</p>
            </Link>
            <p className="text-sm text-gray-400">
              Quantity: {item.quantity} × ${item.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {/* Subtotal */}
          <div className="flex flex-row gap-x-2 justify-between text-md text-gray-400">
            <span>
              Subtotal · {cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"}
            </span>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          {/* Shipping */}
          <div className="flex flex-row gap-x-2 justify-between text-md text-gray-400">
            <span>Shipping:</span>
            <p>${shippingPrice.toFixed(2)}</p>
          </div>

          {/* Total */}
          <div className="flex justify-between font-bold">
            <h1 className="text-xl">Total:</h1>
            <h1 className="text-xl">${totalPrice.toFixed(2)}</h1>
          </div>

          <Button className="w-full">Pay now</Button>
        </div>
      )}
    </div>
  );
};
