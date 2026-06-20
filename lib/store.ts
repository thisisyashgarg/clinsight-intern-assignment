'use client'

import { create } from 'zustand'

type ShortlistState = {
  ids: number[]
  toggle: (id: number) => void
  isShortlisted: (id: number) => boolean
}

export const useShortlist = create<ShortlistState>((set, get) => ({
  ids: [],
  toggle: (id) =>
    set((state) => ({
      ids: state.ids.includes(id)
        ? state.ids.filter((x) => x !== id)
        : [...state.ids, id],
    })),
  isShortlisted: (id) => get().ids.includes(id),
}))
