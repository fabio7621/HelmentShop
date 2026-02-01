/**
 * 全域過濾器 Composables
 * 提供 date 與 currency 格式化功能
 */
import { date, currency } from "@/methods/filters";

export function useFilters() {
  return {
    date,
    currency,
  };
}
