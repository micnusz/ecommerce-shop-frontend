"use client";

import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/app/types/types";
import { Funnel } from "lucide-react";

type FilterHubProps = {
  product: Product[] | undefined;
};

export const FilterHub = ({ product }: FilterHubProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const sortedBrands = useMemo(() => {
    if (!product) return [];
    return [...product]
      .map((p) => p.brand)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a?.localeCompare(b));
  }, [product]);

  const sortedCategories = useMemo(() => {
    if (!product) return [];
    return [...product]
      .map((p) => p.category)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a?.localeCompare(b));
  }, [product]);

  return (
    <div className="flex flex-row gap-x-2 items-center">
      <Button
        variant={open ? "outline" : "muted"}
        onClick={() => setOpen(!open)}
      >
        <Funnel />
        Filter By:
      </Button>

      {open && (
        <div className="flex flex-row gap-x-2 ">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              {sortedBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {sortedCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="muted">Price</Button>
          <Button variant="muted">Rating</Button>
        </div>
      )}
    </div>
  );
};
