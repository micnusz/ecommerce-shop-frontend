"use client";

import { fetchProducts, getBrands, getCategories } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./ProductCard";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { useFilterStore } from "@/lib/store/useProductFilterStore";
import debounce from "lodash.debounce";
import FilterHub from "./FilterHub";
import { Skeleton } from "./ui/skeleton";

import { List, LoaderCircle } from "lucide-react";
import Link from "next/link";

export const ProductsGrid = () => {
  const { searchQuery, setSearchQuery, categories, brands } = useFilterStore();
  const [inputValue, setInputValue] = useState("");

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useQuery({
    queryKey: ["products", searchQuery, categories, brands],
    queryFn: () => fetchProducts(searchQuery, categories, brands),
  });

  const {
    data: brandsData,
    isLoading: isBrandsLoading,
    isError: brandsError,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  });

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const isFiltered = inputValue.trim() !== "" || searchQuery.trim() !== "";

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
      }, 300),
    [setSearchQuery]
  );

  useEffect(() => {
    debouncedSetSearch(inputValue);
  }, [inputValue, debouncedSetSearch]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row gap-x-2 items-center">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for products."
          className="w-64 h-9"
        />

        <Button
          size="sm"
          variant={isFiltered ? "destructive" : "muted"}
          className="h-9"
          onClick={() => {
            setInputValue("");
            debouncedSetSearch.cancel();
            setSearchQuery("");
          }}
        >
          Clear
        </Button>
      </div>
      <div className="flex flex-row items-center justify-between">
        <FilterHub
          productBrands={brandsData}
          productCategory={categoriesData}
          isCategoriesLoading={isCategoriesLoading}
          isBrandsLoading={isBrandsLoading}
          isBrandsError={brandsError}
          isCategoriesError={categoriesError}
        />

        <div className="flex flex-row items-center gap-x-1 text-muted-foreground text-sm">
          {isProductsLoading ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <List className="w-4 h-4" />
              <span>Count: {productsData?.total ?? 0}</span>
            </>
          )}
        </div>
      </div>

      <div>
        {isProductsLoading && (
          <ul className="grid gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <li key={i} className="flex flex-col gap-2">
                <Skeleton className="w-full h-[32rem] rounded-lg" />
              </li>
            ))}
          </ul>
        )}

        {isProductsError && (
          <p className="text-red-500">
            {productsError instanceof Error
              ? productsError.message
              : "Failed to fetch products."}
          </p>
        )}

        {!isProductsLoading && !isProductsError && (
          <ul className="grid gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {productsData?.products?.length ? (
              productsData.products.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id}>
                  <ProductCard product={product} />
                </Link>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
