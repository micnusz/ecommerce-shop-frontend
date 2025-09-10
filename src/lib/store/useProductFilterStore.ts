import { create } from "zustand";

type FilterState = {
  searchQuery: string;

  // nowe filtry
  categories: string[];
  brands: string[];
  prices: number[];
  ratings: number[];

  // setter dla searchQuery
  setSearchQuery: (query: string) => void;

  // toggle dla każdej listy
  toggleCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
  togglePrice: (price: number) => void;
  toggleRating: (rating: number) => void;

  // clear wszystkie filtry
  clearFilters: () => void;
};

export const useFilterStore = create<FilterState>((set, get) => ({
  searchQuery: "",
  categories: [],
  brands: [],
  prices: [],
  ratings: [],

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleCategory: (category) => {
    const { categories } = get();
    if (categories.includes(category)) {
      set({ categories: categories.filter((c) => c !== category) });
    } else {
      set({ categories: [...categories, category] });
    }
  },

  toggleBrand: (brand) => {
    const { brands } = get();
    if (brands.includes(brand)) {
      set({ brands: brands.filter((b) => b !== brand) });
    } else {
      set({ brands: [...brands, brand] });
    }
  },

  togglePrice: (price) => {
    const { prices } = get();
    if (prices.includes(price)) {
      set({ prices: prices.filter((p) => p !== price) });
    } else {
      set({ prices: [...prices, price] });
    }
  },

  toggleRating: (rating) => {
    const { ratings } = get();
    if (ratings.includes(rating)) {
      set({ ratings: ratings.filter((r) => r !== rating) });
    } else {
      set({ ratings: [...ratings, rating] });
    }
  },

  clearFilters: () =>
    set({
      searchQuery: "",
      categories: [],
      brands: [],
      prices: [],
      ratings: [],
    }),
}));
