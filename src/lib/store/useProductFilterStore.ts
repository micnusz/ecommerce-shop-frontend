import { create } from "zustand";

type FilterState = {
  searchQuery: string;

  categories: string[];
  brands: string[];
  ratings: number[];
  priceRange: [number, number] | null;
  ratingRange: [number, number] | null;

  setSearchQuery: (query: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setRatingRange: (range: [number, number]) => void;

  toggleCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
  toggleRating: (rating: number) => void;

  clearFilters: () => void;

  clearRatingRange: () => void;
  clearPriceRange: () => void;
  clearBrands: () => void;
  clearCategories: () => void;
  clearRatings: () => void;
};

export const useFilterStore = create<FilterState>((set, get) => ({
  searchQuery: "",
  categories: [],
  brands: [],
  ratings: [],
  priceRange: null,
  ratingRange: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleCategory: (category) => {
    const { categories } = get();
    set({
      categories: categories.includes(category)
        ? categories.filter((c) => c !== category)
        : [...categories, category],
    });
  },

  toggleBrand: (brand) => {
    const { brands } = get();
    set({
      brands: brands.includes(brand)
        ? brands.filter((b) => b !== brand)
        : [...brands, brand],
    });
  },

  toggleRating: (rating) => {
    const { ratings } = get();
    set({
      ratings: ratings.includes(rating)
        ? ratings.filter((r) => r !== rating)
        : [...ratings, rating],
    });
  },

  setPriceRange: (range) => set({ priceRange: range }),
  setRatingRange: (range) => set({ ratingRange: range }),

  clearFilters: () =>
    set({
      searchQuery: "",
      categories: [],
      brands: [],
      ratings: [],
      priceRange: null,
      ratingRange: null,
    }),

  clearCategories: () => set({ categories: [] }),
  clearBrands: () => set({ brands: [] }),
  clearRatings: () => set({ ratings: [] }),
  clearPriceRange: () => set({ priceRange: null }),
  clearRatingRange: () => set({ ratingRange: null }),
}));
