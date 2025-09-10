import { fetchCategories } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../types/types";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
