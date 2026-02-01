/**
 * Toast 訊息狀態管理 Store
 * 管理全域通知訊息的顯示與清除
 */
import { defineStore } from "pinia";

export const useToastMessageStore = defineStore("toastMessage", {
  state: () => {
    return {
      messages: [],
    };
  },
  actions: {
    /**
     * 設定訊息自動消失
     */
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 6000);
    },
    /**
     * 清除指定位置的訊息
     * @param {number} index - 訊息索引
     */
    clearToast(index) {
      this.messages.splice(index, 1);
    },
    /**
     * 推送新訊息
     * @param {Object} message - 訊息物件
     * @param {string} message.style - 樣式 (success/danger/warning)
     * @param {string} message.title - 標題
     * @param {string} message.content - 內容
     */
    pushMessage(message) {
      const style = message.style || "success";
      const title = message.title;
      const content = message.content;
      this.messages.push({ style, title, content });
      this.toastShow();
    },
  },
});

// 同時提供 default export 以保持向後相容
export default useToastMessageStore;
