// lib/queries.ts
import { Product, ProductResponse } from "@/app/types/types";
import axios from "./axios";

export const fetchProducts = async (
  searchQuery?: string,
  skip = 0,
  limit = 20
): Promise<ProductResponse> => {
  const params: Record<string, any> = { skip, limit };
  if (searchQuery && searchQuery.trim() !== "") {
    params.title = searchQuery.trim();
  }

  console.log("fetchProducts params:", params); // <--- dodaj to

  const { data } = await axios.get<ProductResponse>("/products", { params });
  return data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await axios.get(`/products/${id}`);
  return data;
};
