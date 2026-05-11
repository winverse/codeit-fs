import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

class WebSocketManager {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.listeners = new Map();
    this.isConnecting = false;
  }

  connect(url) {
    if (
      this.isConnecting ||
      (this.ws && this.ws.readyState === WebSocket.OPEN)
    ) {
      return Promise.resolve();
    }

    this.isConnecting = true;

    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log("🔌 WebSocket 연결됨");
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error("WebSocket 메시지 파싱 오류:", error);
        }
      };

      this.ws.onclose = (event) => {
        console.log("🔌 WebSocket 연결 종료됨", event.code);
        this.isConnecting = false;

        // 정상 종료가 아닌 경우 재연결 시도
        if (
          event.code !== 1000 &&
          this.reconnectAttempts < this.maxReconnectAttempts
        ) {
          setTimeout(() => {
            this.reconnectAttempts++;
            console.log(
              `🔄 재연결 시도 ${this.reconnectAttempts}/${this.maxReconnectAttempts}`
            );
            this.connect(url);
          }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts));
        }
      };

      this.ws.onerror = (error) => {
        console.error("🔌 WebSocket 오류:", error);
        this.isConnecting = false;
        reject(error);
      };
    });
  }

  handleMessage(data) {
    const { type, payload } = data;
    const listeners = this.listeners.get(type) || [];
    listeners.forEach((callback) => callback(payload));
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);

    // 구독 해제 함수 반환
    return () => {
      const listeners = this.listeners.get(eventType) || [];
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket이 연결되지 않음");
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close(1000); // 정상 종료
      this.ws = null;
    }
    this.listeners.clear();
  }
}

const wsManager = new WebSocketManager();

export const useRealTimeStore = create(
  subscribeWithSelector((set, get) => ({
    // 연결 상태
    connectionStatus: "disconnected", // 'disconnected', 'connecting', 'connected', 'error'

    // 실시간 데이터
    onlineUsers: [],
    liveNotifications: [],

    // 연결 관리
    connect: async () => {
      set({ connectionStatus: "connecting" });

      try {
        await wsManager.connect("wss://your-websocket-server.com");
        set({ connectionStatus: "connected" });

        // 이벤트 리스너 설정
        get().setupEventListeners();
      } catch (error) {
        set({ connectionStatus: "error" });
        console.error("WebSocket 연결 실패:", error);
      }
    },

    disconnect: () => {
      wsManager.disconnect();
      set({
        connectionStatus: "disconnected",
        onlineUsers: [],
        liveNotifications: [],
      });
    },

    setupEventListeners: () => {
      // 사용자 상태 업데이트
      wsManager.subscribe("user:online", (user) => {
        set((state) => ({
          onlineUsers: [
            ...state.onlineUsers.filter((u) => u.id !== user.id),
            user,
          ],
        }));
      });

      wsManager.subscribe("user:offline", (userId) => {
        set((state) => ({
          onlineUsers: state.onlineUsers.filter((u) => u.id !== userId),
        }));
      });

      // 실시간 알림
      wsManager.subscribe("notification:new", (notification) => {
        set((state) => ({
          liveNotifications: [notification, ...state.liveNotifications].slice(
            0,
            50
          ), // 최대 50개
        }));

        // 브라우저 알림 (권한이 있는 경우)
        if (Notification.permission === "granted") {
          new Notification(notification.title, {
            body: notification.message,
            icon: "/icon.png",
          });
        }
      });

      // 포스트 실시간 업데이트 (다른 스토어와 연동)
      // useSocialStore는 여기에 직접 import되지 않음. get()._executeRequest 등에서 간접적으로 사용될 수 있음.
      // 이 부분은 실제 구현에서 useSocialStore.getState()를 통해 접근해야 함.
      // wsManager.subscribe("post:created", (post) => {
      //   const socialStore = useSocialStore.getState();
      //   socialStore.entities.posts[post.id] = post;
      // });

      // wsManager.subscribe("post:updated", (updatedPost) => {
      //   const socialStore = useSocialStore.getState();
      //   if (socialStore.entities.posts[updatedPost.id]) {
      //     socialStore.entities.posts[updatedPost.id] = updatedPost;
      //   }
      // });

      // wsManager.subscribe("post:deleted", (postId) => {
      //   const socialStore = useSocialStore.getState();
      //   delete socialStore.entities.posts[postId];
      // });
    },

    // 메시지 전송
    sendMessage: (type, payload) => {
      wsManager.send({ type, payload });
    },

    // 알림 관리
    markNotificationAsRead: (notificationId) => {
      set((state) => ({
        liveNotifications: state.liveNotifications.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        ),
      }));

      // 서버에도 읽음 처리 전송
      wsManager.send({
        type: "notification:read",
        payload: { notificationId },
      });
    },

    clearNotifications: () => {
      set({ liveNotifications: [] });
    },

    // 사용자 상태 조회
    isUserOnline: (userId) => {
      return get().onlineUsers.some((user) => user.id === userId);
    },

    getUnreadNotifications: () => {
      return get().liveNotifications.filter((n) => !n.isRead);
    },
  }))
);

export async function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  return Notification.permission === "granted";
}