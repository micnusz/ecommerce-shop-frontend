"use client";

import { fetchProducts } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./ProductCard";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { useFilterStore } from "@/lib/store/useProductFilterStore";
import debounce from "lodash.debounce";
import { FilterHub } from "./FilterHub";

export const ProductsGrid = () => {
  const { searchQuery, setSearchQuery, categories, toggleCategory } =
    useFilterStore();
  const [inputValue, setInputValue] = useState("");

  const { data } = useQuery({
    queryKey: ["products", searchQuery],
    queryFn: () => fetchProducts(searchQuery),
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
          className="w-64 h-9" // dopasowanie wysokości
        />
        <Button
          size="sm"
          variant={isFiltered ? "destructive" : "muted"}
          className="h-9" // dopasowanie do Input
          onClick={() => {
            setInputValue("");
            debouncedSetSearch.cancel();
            setSearchQuery("");
          }}
        >
          Clear
        </Button>
      </div>
      <div>
        <FilterHub product={data?.products} />
      </div>
      <div>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {data?.products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
