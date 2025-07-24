import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    refreshExpiration: true,

    effectiveness: () => { set({ refreshExpiration: true }); },

    expiration: () => { set({ refreshExpiration: false }); },
}));