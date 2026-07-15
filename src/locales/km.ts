import type { LocaleConverter } from "../types.ts";

const DIGITS = [
  "សូន្យ", "មួយ", "ពីរ", "បី", "បួន", "ប្រាំ",
  "ប្រាំមួយ", "ប្រាំពីរ", "ប្រាំបី", "ប្រាំបួន",
] as const;

const TENS = [
  "", "ដប់", "ម្ភៃ", "សាមសិប", "សែសិប", "ហាសិប",
  "ហុកសិប", "ចិតសិប", "ប៉ែតសិប", "កៅសិប",
] as const;

// Khmer has dedicated scale words up to 100,000, then combines លាន (million).
const SCALES = [
  [100_000, "សែន"],
  [10_000, "ម៉ឺន"],
  [1_000, "ពាន់"],
  [100, "រយ"],
] as const;

function below100(n: number): string {
  if (n < 10) return DIGITS[n]!;
  const one = n % 10;
  return TENS[Math.floor(n / 10)]! + (one ? DIGITS[one]! : "");
}

function belowMillion(n: number): string {
  let words = "";
  for (const [value, scale] of SCALES) {
    if (n >= value) {
      words += DIGITS[Math.floor(n / value)]! + scale;
      n %= value;
    }
  }
  return n > 0 ? words + below100(n) : words;
}

function toWordsAbs(n: number): string {
  if (n === 0) return DIGITS[0];
  if (n < 1_000_000) return belowMillion(n);
  // Large numbers combine លាន: 10^9 → ពាន់លាន, 10^12 → លានលាន.
  const low = n % 1_000_000;
  return toWordsAbs(Math.floor(n / 1_000_000)) + "លាន" + (low ? toWordsAbs(low) : "");
}

/** Khmer: 42 → "សែសិបពីរ" (written without spaces, as is standard) */
export const km: LocaleConverter = (num) =>
  (num < 0 ? "ដក" : "") + toWordsAbs(Math.abs(num));
