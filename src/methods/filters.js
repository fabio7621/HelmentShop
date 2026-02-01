/**
 * 全域格式化工具函式
 */

/**
 * 格式化金額為千分位格式
 * @param {number|string} num - 要格式化的數字
 * @returns {string} 格式化後的金額字串
 */
export function currency(num) {
  if (num === undefined || num === null) {
    return "0";
  }
  const n = parseInt(num, 10);
  if (isNaN(n)) {
    return "0";
  }
  return n
    .toFixed(0)
    .replace(/./g, (c, i, a) => {
      const isNotFirstChar = i > 0;
      const isNotDecimalPoint = c !== ".";
      const shouldAddComma = (a.length - i) % 3 === 0;
      if (isNotFirstChar && isNotDecimalPoint && shouldAddComma) {
        return `,${c}`;
      }
      return c;
    });
}

/**
 * 格式化 Unix 時間戳為本地日期字串
 * @param {number} time - Unix 時間戳（秒）
 * @returns {string} 格式化後的日期字串
 */
export function date(time) {
  if (!time) {
    return "";
  }
  const localDate = new Date(time * 1000);
  if (isNaN(localDate.getTime())) {
    return "";
  }
  return localDate.toLocaleDateString();
}
