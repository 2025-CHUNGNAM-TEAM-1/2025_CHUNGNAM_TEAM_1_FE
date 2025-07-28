import { create } from 'zustand';

export const useTransportStore = create(set => ({
    mode: 'walk',
    setMode: (newMode) => set({ mode: newMode }),
}));