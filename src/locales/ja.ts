import type { LocaleConverter } from "../types.ts";

const DIGITS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"] as const;
const SMALL_UNITS = ["", "十", "百", "千"] as const;
// Japanese groups by 10^4: 万 = 10^4, 億 = 10^8, 兆 = 10^12.
const BIG_UNITS = ["", "万", "億", "兆"] as const;

/**
 * Convert 1-9999. Unlike Chinese, skipped digits take no filler (101 → 百一)
 * and 一 is dropped before 十/百/千 (111 → 百十一, 1000 → 千).
 */
function group4(n: number): string {
  let words = "";
  for (let pos = 3; pos >= 0; pos--) {
    const digit = Math.floor(n / 10 ** pos) % 10;
    if (digit === 0) continue;
    if (!(digit === 1 && pos > 0)) words += DIGITS[digit];
    words += SMALL_UNITS[pos];
  }
  return words;
}

function toWordsAbs(n: number): string {
  if (n === 0) return DIGITS[0];

  const groups: number[] = [];
  while (n > 0) {
    groups.push(n % 10_000);
    n = Math.floor(n / 10_000);
  }

  let words = "";
  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i]!;
    if (group === 0) continue;
    let groupWords = group4(group);
    // 千 keeps its 一 in numbers of 万 or more: 11000 → 一万一千, 10^7 → 一千万.
    if (groups.length > 1 && groupWords.startsWith("千")) {
      groupWords = DIGITS[1] + groupWords;
    }
    words += groupWords + BIG_UNITS[i];
  }
  return words;
}

/** Japanese: 42 → "四十二" */
export const ja: LocaleConverter = (num) =>
  (num < 0 ? "マイナス" : "") + toWordsAbs(Math.abs(num));
