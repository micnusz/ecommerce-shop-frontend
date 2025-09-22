"use client";

import Link from "next/link";
import { Cart } from "./Cart";

export const Header = () => {
  return (
    <header className="h-16 bg-background flex items-center justify-between px-6 shadow-md border-b-1 sticky top-0 z-50">
      {/* Shop name */}
      <Link href={"/"}>
        <h1 className="text-xl font-bold text-white hover:text-destructive transition duration-150">
          My Shop
        </h1>
      </Link>

      {/* Cart with Sheet */}
      <div className="flex flex-row gap-x-1 items-center">
        <Cart />
      </div>
    </header>
  );
};
