import { create } from "zustand";

interface VideoState {
    visibleIds: (string | number)[];
    activeId: string | number | null;
    setVisibleIds: (ids: (string | number)[]) => void;
    setActiveId: (id: string | number | null) => void;
    activeIndex: number;
    setActiveIndex: (index: number | ((prev: number) => number)) => void;
}

export const useVideoStore = create<VideoState>((set, get) => ({
    visibleIds: [],
    activeId: null,
    setVisibleIds: (ids) => {
        set({ visibleIds: ids })
        const first = ids[0] ?? null
        if (get().activeId !== first) {
            set({ activeId: first })
        }
    },
    setActiveId: (id) => set({ activeId: id }),


    activeIndex: 0,
    setActiveIndex: (index) =>
        set((state) => ({
            activeIndex: typeof index === "function" ? index(state.activeIndex) : index,
        })),
}));
