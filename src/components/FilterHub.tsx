"use client";

import React, { useState } from "react";
import {
  Check,
  ChevronLeft,
  Filter,
  Library,
  LoaderCircle,
  Tag,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";
import { useFilterStore } from "@/lib/store/useProductFilterStore";

type TaskFilterProps = {
  productBrands: string[];
  productCategory: string[];
};

const FilterHub = ({ productBrands, productCategory }: TaskFilterProps) => {
  const {
    categories,
    toggleCategory,
    brands,
    toggleBrand,
    clearFilters,
    clearBrands,
    clearCategories,
    clearPrices,
    clearRatings,
  } = useFilterStore();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"root" | "brand" | "category">("root");

  const handleBack = () => setView("root");

  const activeFiltersCount = (brands.length || 0) + (categories.length || 0);

  const buttonLabel = activeFiltersCount
    ? `Filter By (${activeFiltersCount})`
    : "Filter By";

  return (
    <Popover
      open={open}
      onOpenChange={(openState) => {
        setOpen(openState);
        if (!openState) setView("root");
      }}
      modal={true}
    >
      <PopoverTrigger asChild>
        <Button
          variant={activeFiltersCount ? "default" : "muted"}
          className="justify-between"
        >
          <Filter className="h-4 w-4" />
          {buttonLabel}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-[15rem] w-fit max-w-[20rem] rounded-lg shadow-md p-1">
        <Command>
          <CommandInput placeholder="Search filters..." />
          <CommandEmpty>No results found.</CommandEmpty>

          {/* ROOT VIEW */}
          {view === "root" && (
            <>
              <CommandGroup>
                <CommandItem onSelect={() => setView("brand")}>
                  {brands.length ? (
                    <>
                      <Tag className="text-muted-foreground" />
                      Brand: {brands.join(", ")}
                    </>
                  ) : (
                    <>
                      <Tag className="text-muted-foreground" />
                      Brand
                    </>
                  )}
                </CommandItem>

                <CommandItem onSelect={() => setView("category")}>
                  {categories.length ? (
                    <>
                      <Library className="text-muted-foreground" /> Category:{" "}
                      {categories.join(", ")}
                    </>
                  ) : (
                    <>
                      <Library className="text-muted-foreground" />
                      Category
                    </>
                  )}
                </CommandItem>
              </CommandGroup>

              <div className="p-2">
                <Button
                  variant={activeFiltersCount ? "destructive" : "muted"}
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    clearFilters();
                  }}
                >
                  Clear All
                </Button>
              </div>
            </>
          )}

          {/* BRAND VIEW */}
          {view === "brand" && (
            <>
              <CommandGroup>
                <CommandItem onSelect={handleBack}>
                  <ChevronLeft />
                  Back
                </CommandItem>
              </CommandGroup>
              <CommandGroup>
                <ScrollArea className="max-h-[20rem] h-fit overflow-y-auto">
                  <CommandSeparator />
                  {(productBrands || []).map((brand) => {
                    const isSelected = brands.includes(brand);
                    return (
                      <CommandItem
                        key={brand}
                        className={cn(
                          "flex justify-between items-center my-1",
                          isSelected ? "bg-accent/70" : ""
                        )}
                        onSelect={() => toggleBrand(brand)}
                      >
                        {brand}
                        {isSelected && <Check className="w-4 h-4" />}
                      </CommandItem>
                    );
                  })}
                </ScrollArea>
              </CommandGroup>
              <div className="p-2">
                <Button
                  variant={activeFiltersCount ? "destructive" : "muted"}
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    clearBrands(brands);
                  }}
                >
                  Clear
                </Button>
              </div>
            </>
          )}

          {/* CATEGORY VIEW */}
          {view === "category" && (
            <>
              <CommandGroup>
                <CommandItem onSelect={handleBack}>
                  <ChevronLeft />
                  Back
                </CommandItem>
              </CommandGroup>
              <CommandGroup>
                <ScrollArea className="max-h-[20rem] h-fit overflow-y-auto">
                  <CommandSeparator />
                  {(productCategory || []).map((category) => {
                    const isSelected = categories.includes(category);
                    return (
                      <CommandItem
                        key={category}
                        className={cn(
                          "flex justify-between items-center my-1",
                          isSelected ? "bg-accent/70" : ""
                        )}
                        onSelect={() => toggleCategory(category)}
                      >
                        {category}
                        {isSelected && <Check className="w-4 h-4" />}
                      </CommandItem>
                    );
                  })}
                </ScrollArea>
              </CommandGroup>
              <div className="p-2">
                <Button
                  variant={activeFiltersCount ? "destructive" : "muted"}
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    clearCategories(categories);
                  }}
                >
                  Clear
                </Button>
              </div>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterHub;
