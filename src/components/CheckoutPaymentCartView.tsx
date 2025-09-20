"use client";

import { useCartStore } from "@/lib/store/useStore";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import Link from "next/link";

export const CheckoutPaymentCartView = () => {
  const cartItems = useCartStore((state) => state.items);

  const finalPrice = (price: number, quantity: number): number =>
    price * quantity;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + finalPrice(item.price, item.quantity),
    0
  );
  return (
    <div className="flex flex-col gap-4 ">
      {cartItems.length === 0 && <p>Your cart is empty.</p>}

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
              ${finalPrice(item.price, item.quantity).toFixed(2)}
            </p>
            <Button
              onClick={() => useCartStore.getState().removeItem(item.id)}
              size="icon"
              className="text-gray-400 hover:text-gray-200 rounded-2xl"
              variant="ghost"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex flex-row gap-x-2 justify-between text-md text-gray-400">
            {cartItems.length == 1 ? (
              <span>Subtotal · {cartItems.length} item</span>
            ) : (
              <span>Subtotal · {cartItems.length} items</span>
            )}
            <p>${totalPrice.toFixed(2)}</p>
          </div>
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
