import type { LocaleConverter } from "../types.ts";

const DIGITS = [
  "ສູນ", "ໜຶ່ງ", "ສອງ", "ສາມ", "ສີ່", "ຫ້າ", "ຫົກ", "ເຈັດ", "ແປດ", "ເກົ້າ",
] as const;

const SCALES = [
  [100_000, "ແສນ"],
  [10_000, "ໝື່ນ"],
  [1_000, "ພັນ"],
  [100, "ຮ້ອຍ"],
] as const;

/** `hasHigher` marks that scale words precede, so a trailing 1 reads ເອັດ. */
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
    // 20 is the special word ຊາວ, and bare 10 is ສິບ.
    words += ten === 2 ? "ຊາວ" : ten === 1 ? "ສິບ" : DIGITS[ten]! + "ສິບ";
  }
  if (one) {
    words += one === 1 && (words || hasHigher) ? "ເອັດ" : DIGITS[one];
  }
  return words;
}

function toWordsAbs(n: number): string {
  if (n === 0) return DIGITS[0];
  if (n < 1_000_000) return belowMillion(n, false);
  const low = n % 1_000_000;
  return toWordsAbs(Math.floor(n / 1_000_000)) + "ລ້ານ" + (low ? belowMillion(low, true) : "");
}

/** Lao: 42 → "ສີ່ສິບສອງ" (written without spaces, as is standard) */
export const lo: LocaleConverter = (num) =>
  (num < 0 ? "ລົບ" : "") + toWordsAbs(Math.abs(num));
