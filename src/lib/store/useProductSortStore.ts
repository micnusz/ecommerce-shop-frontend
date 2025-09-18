import { create } from "zustand";

type SortField = "title" | "price" | "rating" | "";
type SortOrder = "ASC" | "DESC";

type SortState = {
  sortBy: SortField;
  sortOrder: SortOrder;

  setSortBy: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;

  clearSort: () => void;
};

export const useSortStore = create<SortState>((set) => ({
  sortBy: "",
  sortOrder: "DESC",

  setSortBy: (field) => set({ sortBy: field }),
  setSortOrder: (order) => set({ sortOrder: order }),

  clearSort: () => set({ sortBy: "", sortOrder: "DESC" }),
}));
