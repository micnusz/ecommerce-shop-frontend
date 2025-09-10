import { fetchProductById } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/types";

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });
};
