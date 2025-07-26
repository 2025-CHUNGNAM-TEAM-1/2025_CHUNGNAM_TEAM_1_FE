import { create } from 'zustand';

export const usePlaceStore = create((set) => ({
  place: [],
  setPlace: (placesArray) => set({ place: placesArray }),
  selectedPlace: null,
  setSelectedPlace: (placeObj) => set({ selectedPlace: placeObj }),
}));