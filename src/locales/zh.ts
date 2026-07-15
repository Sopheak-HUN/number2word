import type { LocaleConverter } from "../types.ts";

const DIGITS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"] as const;
const SMALL_UNITS = ["", "十", "百", "千"] as const;
// Chinese groups by 10^4: 万 = 10^4, 亿 = 10^8, 万亿 = 10^12.
const BIG_UNITS = ["", "万", "亿", "万亿"] as const;

/** Convert 1-9999, inserting 零 for skipped internal digits (101 → 一百零一). */
function group4(n: number): string {
  let words = "";
  let zeroPending = false;
  for (let pos = 3; pos >= 0; pos--) {
    const digit = Math.floor(n / 10 ** pos) % 10;
    if (digit === 0) {
      if (words) zeroPending = true;
      continue;
    }
    if (zeroPending) {
      words += DIGITS[0];
      zeroPending = false;
    }
    words += DIGITS[digit]! + SMALL_UNITS[pos];
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
    // A leading gap inside the group needs 零: 一亿零一, 一万零五百.
    if (words && group < 1000) words += DIGITS[0];
    words += group4(group) + BIG_UNITS[i];
  }

  // 一十 at the start reads as 十: 15 → 十五, 150000 → 十五万.
  return words.startsWith("一十") ? words.slice(1) : words;
}

/** Chinese (Mandarin, simplified): 42 → "四十二" */
export const zh: LocaleConverter = (num) =>
  (num < 0 ? "负" : "") + toWordsAbs(Math.abs(num));
