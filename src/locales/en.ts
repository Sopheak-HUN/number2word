import type { LocaleConverter } from "../types.ts";

const ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen",
] as const;

const TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy",
  "eighty", "ninety",
] as const;

const SCALES = ["", "thousand", "million", "billion", "trillion", "quadrillion"] as const;

function threeDigitsToWords(n: number): string {
  const parts: string[] = [];
  if (n >= 100) {
    parts.push(`${ONES[Math.floor(n / 100)]} hundred`);
    n %= 100;
  }
  if (n >= 20) {
    const one = n % 10;
    parts.push(one ? `${TENS[Math.floor(n / 10)]}-${ONES[one]}` : TENS[Math.floor(n / 10)]!);
  } else if (n > 0) {
    parts.push(ONES[n]!);
  }
  return parts.join(" ");
}

function toWordsAbs(n: number): string {
  if (n === 0) return ONES[0];

  const groups: number[] = [];
  while (n > 0) {
    groups.push(n % 1000);
    n = Math.floor(n / 1000);
  }

  const parts: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] === 0) continue;
    const words = threeDigitsToWords(groups[i]!);
    parts.push(SCALES[i] ? `${words} ${SCALES[i]}` : words);
  }
  return parts.join(" ");
}

/** English: 42 → "forty-two" */
export const en: LocaleConverter = (num) =>
  (num < 0 ? "minus " : "") + toWordsAbs(Math.abs(num));
