import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            cooldowns: {},

            setUser: (user) => set({ user }),

            setCooldown: (key, value) =>
                set((state) => ({
                    cooldowns: {
                        ...state.cooldowns,
                        [key]: value,
                    },
                })),

            logout: () => set({ user: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
