"use client";

import { useCartStore } from "@/lib/store/useStore";
import { ShoppingCart, X } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

export const Header = () => {
  const cartItems = useCartStore((state) => state.items);

  const finalPrice = (price: number, quantity: number): number =>
    price * quantity;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + finalPrice(item.price, item.quantity),
    0
  );

  return (
    <header className="h-16 bg-accent flex items-center justify-between px-6 shadow-md">
      {/* Shop name */}
      <h1 className="text-xl font-bold text-white">My Shop</h1>

      {/* Cart with Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="relative cursor-pointer">
            <ShoppingCart size={28} className="text-white" />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[400px] px-4 py-6 flex flex-col gap-y-6"
        >
          <div>
            <DialogTitle>Your Cart:</DialogTitle>
            <p className="text-sm text-gray-400">
              Check your products before checkout.
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {cartItems.length === 0 && <p>Your cart is empty.</p>}

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
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
                <p className="text-right font-bold text-lg">
                  Total: ${totalPrice.toFixed(2)}
                </p>
                <Button className="w-full">Proceed to Checkout</Button>
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
    </header>
  );
};
