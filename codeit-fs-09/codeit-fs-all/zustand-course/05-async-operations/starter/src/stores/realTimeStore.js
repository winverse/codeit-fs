import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useRealTimeStore = create(
  subscribeWithSelector((set, get) => ({
    // TODO: Implement realTimeStore as per README.md
    connectionStatus: "disconnected",
    onlineUsers: [],
    liveNotifications: [],

    connect: async () => {
      console.log("TODO: connect to WebSocket");
    },

    disconnect: () => {
      console.log("TODO: disconnect from WebSocket");
    },

    setupEventListeners: () => {
      console.log("TODO: setupEventListeners");
    },

    sendMessage: (type, payload) => {
      console.log("TODO: sendMessage", type, payload);
    },

    markNotificationAsRead: (notificationId) => {
      console.log("TODO: markNotificationAsRead", notificationId);
    },

    clearNotifications: () => {
      console.log("TODO: clearNotifications");
    },

    isUserOnline: (userId) => {
      return false;
    },

    getUnreadNotifications: () => {
      return [];
    },
  }))
);