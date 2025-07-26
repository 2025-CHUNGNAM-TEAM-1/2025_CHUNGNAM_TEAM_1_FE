import { create } from 'zustand';

export const userLocationStore = create((set) => ({
  location: null,
  setLocation: (newLocation) => set({ location: newLocation }),  
}));