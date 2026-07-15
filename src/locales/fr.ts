import type { LocaleConverter } from "../types.ts";

const ONES = [
  "zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit",
  "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize",
  "dix-sept", "dix-huit", "dix-neuf",
] as const;

const TENS = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante"] as const;

// French uses the long scale: milliard = 10^9, billion = 10^12.
const SCALES = [
  [1_000_000_000_000_000, "billiard"],
  [1_000_000_000_000, "billion"],
  [1_000_000_000, "milliard"],
  [1_000_000, "million"],
] as const;

/**
 * `followed` is true when another numeral comes after, which strips the
 * plural "s" from "quatre-vingts" and "cents" (e.g. "quatre-vingt mille").
 */
function below100(n: number, followed = false): string {
  if (n < 20) return ONES[n]!;
  if (n < 70) {
    const one = n % 10;
    const ten = TENS[Math.floor(n / 10)]!;
    if (one === 0) return ten;
    if (one === 1) return `${ten} et un`;
    return `${ten}-${ONES[one]}`;
  }
  if (n < 80) {
    return n === 71 ? "soixante et onze" : `soixante-${ONES[n - 60]}`;
  }
  if (n === 80) return followed ? "quatre-vingt" : "quatre-vingts";
  return `quatre-vingt-${ONES[n - 80]}`;
}

function below1000(n: number, followed = false): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  if (hundreds === 0) return below100(n, followed);
  const cent =
    hundreds === 1 ? "cent" : `${ONES[hundreds]} cent${rest || followed ? "" : "s"}`;
  return rest ? `${cent} ${below100(rest, followed)}` : cent;
}

function toWordsAbs(n: number): string {
  if (n === 0) return ONES[0];

  const parts: string[] = [];
  for (const [value, scale] of SCALES) {
    if (n >= value) {
      const count = Math.floor(n / value);
      parts.push(`${below1000(count)} ${scale}${count > 1 ? "s" : ""}`);
      n %= value;
    }
  }
  if (n >= 1000) {
    const count = Math.floor(n / 1000);
    parts.push(count === 1 ? "mille" : `${below1000(count, true)} mille`);
    n %= 1000;
  }
  if (n > 0) parts.push(below1000(n));
  return parts.join(" ");
}

/** French: 42 → "quarante-deux" */
export const fr: LocaleConverter = (num) =>
  (num < 0 ? "moins " : "") + toWordsAbs(Math.abs(num));
