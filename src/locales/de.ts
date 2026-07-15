import type { LocaleConverter } from "../types.ts";

const UNITS = [
  "null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht",
  "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn",
  "sechzehn", "siebzehn", "achtzehn", "neunzehn",
] as const;

const TENS = [
  "", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig",
  "achtzig", "neunzig",
] as const;

// German long scale: Milliarde = 10^9, Billion = 10^12.
const SCALES = [
  [1_000_000_000_000_000, "Billiarde", "Billiarden"],
  [1_000_000_000_000, "Billion", "Billionen"],
  [1_000_000_000, "Milliarde", "Milliarden"],
  [1_000_000, "Million", "Millionen"],
] as const;

/** `final` is true at the very end of the number: standalone 1 is "eins", but inside compounds it is "ein" (einundzwanzig). */
function below100(n: number, final: boolean): string {
  if (n < 20) return n === 1 && !final ? "ein" : UNITS[n]!;
  const one = n % 10;
  const ten = TENS[Math.floor(n / 10)]!;
  return one ? `${one === 1 ? "ein" : UNITS[one]}und${ten}` : ten;
}

function below1000(n: number, final: boolean): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  let words = hundreds ? `${hundreds === 1 ? "ein" : UNITS[hundreds]}hundert` : "";
  if (rest) words += below100(rest, final);
  return words;
}

function belowMillion(n: number, final: boolean): string {
  const thousands = Math.floor(n / 1000);
  const rest = n % 1000;
  let words = thousands
    ? `${thousands === 1 ? "ein" : below1000(thousands, false)}tausend`
    : "";
  if (rest) words += below1000(rest, final);
  return words;
}

function toWordsAbs(n: number): string {
  if (n === 0) return UNITS[0];

  const parts: string[] = [];
  for (const [value, singular, plural] of SCALES) {
    if (n >= value) {
      const count = Math.floor(n / value);
      parts.push(count === 1 ? `eine ${singular}` : `${below1000(count, false)} ${plural}`);
      n %= value;
    }
  }
  if (n > 0) parts.push(belowMillion(n, true));
  return parts.join(" ");
}

/** German: 42 → "zweiundvierzig" */
export const de: LocaleConverter = (num) =>
  (num < 0 ? "minus " : "") + toWordsAbs(Math.abs(num));
