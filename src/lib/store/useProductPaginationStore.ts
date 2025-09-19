import { create } from "zustand";

type PaginationState = {
  pageIndex: number;
  limit: number;
  setPageIndex: (page: number) => void;
  setLimit: (limit: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: (totalCount: number) => void;
  getSkip: () => number;
};

export const usePaginationStore = create<PaginationState>((set, get) => ({
  pageIndex: 0,
  limit: 15,

  setPageIndex: (pageIndex) => set({ pageIndex }),

  setLimit: (limit) => {
    set({ limit, pageIndex: 0 });
  },

  nextPage: () => set({ pageIndex: get().pageIndex + 1 }),

  prevPage: () => set({ pageIndex: Math.max(0, get().pageIndex - 1) }),

  firstPage: () => set({ pageIndex: 0 }),

  lastPage: (totalCount) => {
    const { limit } = get();
    const lastIndex = Math.max(0, Math.ceil(totalCount / limit) - 1);
    set({ pageIndex: lastIndex });
  },

  getSkip: () => {
    const { pageIndex, limit } = get();
    return pageIndex * limit;
  },
}));
