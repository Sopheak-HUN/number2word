import type { LocaleConverter } from "../types.ts";

const DIGITS = [
  "ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า",
] as const;

const SCALES = [
  [100_000, "แสน"],
  [10_000, "หมื่น"],
  [1_000, "พัน"],
  [100, "ร้อย"],
] as const;

/** `hasHigher` marks that scale words precede, so a trailing 1 reads เอ็ด. */
function belowMillion(n: number, hasHigher: boolean): string {
  let words = "";
  for (const [value, scale] of SCALES) {
    if (n >= value) {
      words += DIGITS[Math.floor(n / value)]! + scale;
      n %= value;
    }
  }
  const ten = Math.floor(n / 10);
  const one = n % 10;
  if (ten) {
    // 20 is ยี่สิบ, and bare 10 is สิบ (not หนึ่งสิบ).
    words += ten === 2 ? "ยี่สิบ" : ten === 1 ? "สิบ" : DIGITS[ten]! + "สิบ";
  }
  if (one) {
    words += one === 1 && (words || hasHigher) ? "เอ็ด" : DIGITS[one];
  }
  return words;
}

function toWordsAbs(n: number): string {
  if (n === 0) return DIGITS[0];
  if (n < 1_000_000) return belowMillion(n, false);
  // Large numbers stack ล้าน: 10^12 → ล้านล้าน.
  const low = n % 1_000_000;
  return toWordsAbs(Math.floor(n / 1_000_000)) + "ล้าน" + (low ? belowMillion(low, true) : "");
}

/** Thai: 42 → "สี่สิบสอง" (written without spaces, as is standard) */
export const th: LocaleConverter = (num) =>
  (num < 0 ? "ลบ" : "") + toWordsAbs(Math.abs(num));
