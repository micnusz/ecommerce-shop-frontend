"use client";

import { useCartStore } from "@/lib/store/useStore";
import { Button } from "./ui/button";
import { BaggageClaim, X } from "lucide-react";
import Link from "next/link";
import { useCheckoutStore } from "@/lib/store/useCheckoutShippingStore";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";

export const CheckoutPaymentCartView = () => {
  const { selectedShippingMethod } = useCheckoutStore();
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const shippingPrice = selectedShippingMethod?.price || 0;

  const finalPrice = (price: number, quantity: number) => price * quantity;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + finalPrice(item.price, item.quantity),
    0
  );
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

      <ScrollArea className="max-h-[32rem] flex flex-col gap-3 ">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-accent py-3"
          >
            {/* Miniaturka */}
            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src={item.thumbnail}
                width={80}
                height={80}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Tekst */}
            <div className="flex-1 ml-4 pr-2">
              <Link href={`/products/${item.slug}`}>
                <p className="font-semibold text-sm break-words line-clamp-2 hover:text-gray-400">
                  {item.title}
                </p>
              </Link>

              <p className="text-sm text-gray-400">
                Quantity: {item.quantity} × ${item.price.toFixed(2)}
              </p>
            </div>

            {/* Cena i przycisk */}
            <div className="flex items-center gap-3">
              <p className="font-bold text-sm text-right">
                ${finalPrice(item.price, item.quantity).toFixed(2)}
              </p>
              <Button
                onClick={() => removeItem(item.id)}
                size="icon"
                className="text-gray-400 hover:text-gray-600 rounded-full"
                variant="ghost"
              >
                <X size={18} />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>

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
          <div className="flex justify-between font-bold text-xl">
            <h1>Total:</h1>
            <h1>${totalPrice.toFixed(2)}</h1>
          </div>

          <Button className="w-full">Pay now</Button>
        </div>
      )}
    </div>
  );
};
