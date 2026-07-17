import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notifications: [],

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  setNotifications: (data) => set({ notifications: data }),

  clearNotifications: () => set({ notifications: [] }),
}));

export default useNotificationStore;