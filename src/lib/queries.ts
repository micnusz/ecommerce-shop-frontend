// lib/queries.ts
import { Product, ProductResponse } from "@/app/types/types";
import axios from "./axios";

export const fetchProducts = async (
  searchQuery?: string,
  skip = 0,
  limit = 20
): Promise<ProductResponse> => {
  const params: { skip: number; limit: number; title?: string } = {
    skip,
    limit,
  };
  if (searchQuery?.trim()) params.title = searchQuery.trim();

  console.log("fetchProducts params:", params);

  try {
    const { data } = await axios.get<ProductResponse>("/products", { params });
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await axios.get(`/products/${id}`);
  return data;
};
