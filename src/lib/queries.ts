// lib/queries.ts
import { Product, ProductResponse } from "@/app/types/types";
import axios from "./axios";

export const fetchProducts = async (
  searchQuery?: string,
  categories?: string[],
  brands?: string[],
  priceRange?: [number, number] | null,
  ratingRange?: [number, number] | null,
  skip = 0,
  limit = 20
): Promise<ProductResponse> => {
  let url = `/products?skip=${skip}&limit=${limit}`;

  if (searchQuery?.trim()) {
    url += `&title=${encodeURIComponent(searchQuery.trim())}`;
  }

  categories?.forEach((c) => {
    url += `&category=${encodeURIComponent(c)}`;
  });

  brands?.forEach((b) => {
    url += `&brand=${encodeURIComponent(b)}`;
  });

  if (priceRange) {
    url += `&minPrice=${encodeURIComponent(priceRange[0])}`;
    url += `&maxPrice=${encodeURIComponent(priceRange[1])}`;
  }

  if (ratingRange) {
    url += `&minRating=${encodeURIComponent(ratingRange[0])}`;
    url += `&maxRating=${encodeURIComponent(ratingRange[1])}`;
  }

  console.log("fetchProducts URL:", url);

  try {
    const { data } = await axios.get<ProductResponse>(url);
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

export const getBrands = async () => {
  try {
    const { data } = await axios.get("/products/brands");
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const { data } = await axios.get("/products/categories");
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
