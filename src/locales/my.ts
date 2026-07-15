import type { LocaleConverter } from "../types.ts";

const DIGITS = [
  "သုည", "တစ်", "နှစ်", "သုံး", "လေး", "ငါး", "ခြောက်", "ခုနစ်", "ရှစ်", "ကိုး",
] as const;

// [value, plain form, linked form when more digits follow (creaky tone)]
const SCALES = [
  [1_000_000, "သန်း", "သန်း"],
  [100_000, "သိန်း", "သိန်း"],
  [10_000, "သောင်း", "သောင်း"],
  [1_000, "ထောင်", "ထောင့်"],
  [100, "ရာ", "ရာ့"],
  [10, "ဆယ်", "ဆယ့်"],
] as const;

function toWordsAbs(n: number): string {
  if (n === 0) return DIGITS[0];

  let words = "";
  // ကုဋေ = 10^7; larger multiples recurse (10^8 → တစ်ဆယ်ကုဋေ).
  if (n >= 10_000_000) {
    words += toWordsAbs(Math.floor(n / 10_000_000)) + "ကုဋေ";
    n %= 10_000_000;
  }
  for (const [value, plain, linked] of SCALES) {
    if (n >= value) {
      const digit = Math.floor(n / value);
      n %= value;
      words += DIGITS[digit]! + (n > 0 ? linked : plain);
    }
  }
  if (n > 0) words += DIGITS[n];
  return words;
}

/** Burmese: 23 → "နှစ်ဆယ့်သုံး" (written without spaces, as is standard) */
export const my: LocaleConverter = (num) =>
  (num < 0 ? "အနုတ်" : "") + toWordsAbs(Math.abs(num));
