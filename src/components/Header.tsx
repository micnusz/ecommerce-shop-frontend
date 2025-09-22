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
    <header className="h-16 bg-muted-background flex items-center justify-between px-6 shadow-md border-b-1">
      {/* Shop name */}
      <Link href={"/"}>
        <h1 className="text-xl font-bold text-white hover:text-destructive transition duration-150">
          My Shop
        </h1>
      </Link>

      {/* Cart with Sheet */}
      <div className="flex flex-row gap-x-1 items-center">
        <div>
          <Cart />
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-muted-foreground">
                More
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a
                  href="https://github.com/micnusz"
                  target="_blank" // otwiera w nowej karcie
                  rel="noopener noreferrer" // bezpieczeństwo przy target="_blank"
                  className="flex flex-row gap-x-1"
                  role="menuitem" // ARIA
                  aria-label="Open GitHub in a new tab"
                >
                  <Github className="text-foreground" /> GitHub
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
