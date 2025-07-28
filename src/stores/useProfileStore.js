import { create } from 'zustand';

export const useProfileStore = create((set) => ({
    profile: [],
    setProfile: (profileArray) => set({ profile: profileArray }),
}));