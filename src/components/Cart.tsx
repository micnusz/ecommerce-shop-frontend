"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { BaggageClaim, ShoppingCart, X } from "lucide-react";
import { DialogTitle } from "./ui/dialog";
import Link from "next/link";
import { useCartStore } from "@/lib/store/useStore";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";

export const Cart = () => {
  const cartItems = useCartStore((state) => state.items);

  const finalPrice = (price: number, quantity: number): number =>
    price * quantity;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + finalPrice(item.price, item.quantity),
    0
  );
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <div className="relative">
            <ShoppingCart className="text-white" />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[400px] px-6 md:px-4 py-6 flex flex-col gap-y-6"
      >
        <div>
          <DialogTitle>
            {cartItems.length != 0 ? (
              <span>Your Cart: {cartItems.length} items</span>
            ) : (
              <span>Your Cart:</span>
            )}
          </DialogTitle>
          <p className="text-sm text-gray-400">
            Check your products before checkout.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <ScrollArea className="max-h-92">
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
                className="flex items-center justify-between border-b border-accent py-3"
              >
                {/* Zdjęcie */}
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
                <div className="flex-1 ml-4">
                  <p className="font-semibold text-sm line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Quantity: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Cena i przycisk */}
                <div className="flex items-center gap-3">
                  <p className="font-bold text-sm text-right">
                    ${finalPrice(item.price, item.quantity).toFixed(2)}
                  </p>
                  <Button
                    onClick={() => useCartStore.getState().removeItem(item.id)}
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

          {/* Podsumowanie koszyka */}
          {cartItems.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-right font-bold text-lg">
                Total: ${totalPrice.toFixed(2)}
              </p>
              <Link href={`/checkouts`}>
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          )}
        </div>

        <SheetClose asChild>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-4 right-4 p-1 rounded-2xl"
          >
            <X size={20} />
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};
