import { create } from "zustand";

type FilterState = {
  searchQuery: string;
  categories: string[];
  setSearchQuery: (query: string) => void;
  toggleCategory: (category: string) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterState>((set, get) => ({
  searchQuery: "",
  categories: [],

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleCategory: (category) => {
    const { categories } = get();
    if (categories.includes(category)) {
      set({ categories: categories.filter((c) => c !== category) });
    } else {
      set({ categories: [...categories, category] });
    }
  },

  clearFilters: () => set({ searchQuery: "", categories: [] }),
}));
