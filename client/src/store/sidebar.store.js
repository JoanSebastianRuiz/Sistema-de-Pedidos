import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
    open: false,

    toggleSidebar: () =>
        set((state) => ({
            open: !state.open,
        })),
}));
