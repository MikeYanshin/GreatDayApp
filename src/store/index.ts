import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

export const useSideMenuStore = defineStore("side-menu", {
  state: () => ({
    isOpen: false,
  }),
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    toggleSideMenu() {
      console.log("toggle");

      this.isOpen = !this.isOpen;
    },
  },
});
