import { create } from 'zustand';

const useBadgeStore = create(set => ({
    isBadgeActive: false,
    setIsBadgeActive: (active) => set({ isBadgeActive: active }),
}));

export default useBadgeStore;