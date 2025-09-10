"use client";
import { fetchProducts } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { ProductResponse } from "../types/types";

export const useProducts = () => {
  return useQuery<ProductResponse>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
