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
      this.isOpen = !this.isOpen;
    },
  },
});

export const useNotifyStore = defineStore("noti", {
  state: () => ({
    shown: false,
    header: "",
    description: "",
    type: "info",
  }),
  getters: {
    isNotiShown: (state) => state.shown,
  },
  actions: {
    showNotify({
      header,
      description,
      type,
    }: {
      header: string;
      description?: string;
      type: string;
    }) {
      this.header = header;
      this.description = description || "";
      this.type = type;
      this.shown = true;
      setTimeout(() => {
        this.shown = false;
      }, 1500);
    },
    closeNoti() {
      this.shown = false;
    },
  },
});
