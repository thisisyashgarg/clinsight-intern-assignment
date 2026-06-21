"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ShortlistState = {
  ids: number[];
  toggle: (id: number) => void;
  isShortlisted: (id: number) => boolean;
};
// fix persist store
export const useShortlist = create<ShortlistState>()(
 persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((x) => x !== id)
            : [...state.ids, id],
        })),
      isShortlisted: (id) => get().ids.includes(id),
    }),
    {
      name:'clinshight-shortlist'
    },
  ),
);
