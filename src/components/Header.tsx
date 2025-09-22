"use client";

import { useCartStore } from "@/lib/store/useStore";
import {
  EllipsisVertical,
  Github,
  LucideMoreVertical,
  MoreVerticalIcon,
  ShoppingCart,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";
import { Cart } from "./Cart";

export const Header = () => {
  return (
    <header className="h-18 bg-muted-background flex items-center justify-between px-6 shadow-md border-b-1">
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
