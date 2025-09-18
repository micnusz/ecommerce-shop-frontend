"use client";

import React, { useState } from "react";
import {
  Check,
  ChevronLeft,
  Filter,
  Library,
  LoaderCircle,
  Star,
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
import { Slider } from "./ui/slider";

type TaskFilterProps = {
  productBrands: string[];
  productCategory: string[];
  isCategoriesLoading: boolean;
  isBrandsLoading: boolean;
  isBrandsError?: boolean;
  isCategoriesError?: boolean;
};

const FilterHub = ({
  productBrands,
  productCategory,
  isCategoriesLoading,
  isBrandsLoading,
  isBrandsError,
  isCategoriesError,
}: TaskFilterProps) => {
  const {
    categories,
    brands,
    priceRange,
    ratingRange,
    toggleCategory,
    toggleBrand,
    setPriceRange,
    setRatingRange,
    clearFilters,
    clearBrands,
    clearCategories,
    clearPriceRange,
    clearRatingRange,
  } = useFilterStore();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<
    "root" | "brand" | "category" | "price" | "rating"
  >("root");

  const handleBack = () => setView("root");

  const activeFiltersCount =
    (brands.length || 0) +
    (categories.length || 0) +
    (priceRange?.length || 0) +
    (ratingRange?.length || 0);

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

                <CommandItem onSelect={() => setView("price")}>
                  {priceRange?.length ? (
                    <>
                      <Tag className="text-muted-foreground" /> Price:{" "}
                      {`$${priceRange[0]} – $${priceRange[1]}`}
                    </>
                  ) : (
                    <>
                      <Tag className="text-muted-foreground" />
                      Price
                    </>
                  )}
                </CommandItem>

                <CommandItem onSelect={() => setView("rating")}>
                  {ratingRange?.length ? (
                    <>
                      <Star className="text-muted-foreground" /> Rating:{" "}
                      {ratingRange?.join(" - ")}
                    </>
                  ) : (
                    <>
                      <Star className="text-muted-foreground" />
                      Rating
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
                  {isBrandsLoading ? (
                    <div className="flex justify-center py-4">
                      <LoaderCircle className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : isBrandsError ? (
                    <p className="text-red-500 p-2">error</p>
                  ) : !productBrands?.length ? (
                    <p className="text-muted-foreground p-2 text-sm">
                      No brands available.
                    </p>
                  ) : (
                    productBrands.map((brand) => {
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
                    })
                  )}
                </ScrollArea>
              </CommandGroup>
              <div className="p-2">
                <Button
                  variant={activeFiltersCount ? "destructive" : "muted"}
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    clearBrands();
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
                  {isCategoriesLoading ? (
                    <div className="flex justify-center py-4">
                      <LoaderCircle className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : isCategoriesError ? (
                    <p className="text-red-500 p-2">error</p>
                  ) : !productCategory?.length ? (
                    <p className="text-muted-foreground p-2 text-sm">
                      No categories available.
                    </p>
                  ) : (
                    productCategory.map((category) => {
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
                    })
                  )}
                </ScrollArea>
              </CommandGroup>
              <div className="p-2">
                <Button
                  variant={activeFiltersCount ? "destructive" : "muted"}
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    clearCategories();
                  }}
                >
                  Clear
                </Button>
              </div>
            </>
          )}

          {/* PRICE VIEW */}
          {view === "price" && (
            <>
              <CommandGroup>
                <CommandItem onSelect={handleBack}>
                  <ChevronLeft />
                  Back
                </CommandItem>
              </CommandGroup>
              <CommandGroup>
                <ScrollArea className="max-h-[20rem] h-fit overflow-y-auto">
                  <CommandItem className="py-6 flex flex-col gap-4">
                    <p className="text-sm font-medium">
                      {priceRange
                        ? `$${priceRange[0]} – $${priceRange[1]}`
                        : "Select price range"}
                    </p>
                    <Slider
                      value={priceRange ?? [0, 1000]}
                      min={0}
                      max={1000}
                      step={10}
                      onValueChange={(val) =>
                        setPriceRange(val as [number, number])
                      }
                    />
                  </CommandItem>
                </ScrollArea>
              </CommandGroup>
              <div className="p-2">
                <Button
                  variant={priceRange ? "destructive" : "muted"}
                  size="sm"
                  className="w-full"
                  onClick={clearPriceRange}
                >
                  Clear
                </Button>
              </div>
            </>
          )}

          {/* RATING VIEW */}
          {view === "rating" && (
            <>
              <CommandGroup>
                <CommandItem onSelect={handleBack}>
                  <ChevronLeft />
                  Back
                </CommandItem>
              </CommandGroup>
              <CommandGroup>
                <ScrollArea className="max-h-[20rem] h-fit overflow-y-auto">
                  <CommandItem className="py-6 flex flex-col gap-4">
                    <p className="text-sm font-medium">
                      {ratingRange
                        ? `${ratingRange[0]} – ${ratingRange[1]}`
                        : "Select rating range (0 - 5)"}
                    </p>
                    <Slider
                      value={ratingRange ?? [0, 5]}
                      min={0}
                      max={5}
                      step={0.1}
                      onValueChange={(val) =>
                        setRatingRange(val as [number, number])
                      }
                    />
                  </CommandItem>
                </ScrollArea>
              </CommandGroup>
              <div className="p-2">
                <Button
                  variant={ratingRange ? "destructive" : "muted"}
                  size="sm"
                  className="w-full"
                  onClick={clearRatingRange}
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
