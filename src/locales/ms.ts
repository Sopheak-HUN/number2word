import type { LocaleConverter } from "../types.ts";

// Malaysian Malay: lapan, sifar; official short scale (bilion = 10^9).
const UNITS = [
  "sifar", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "lapan",
  "sembilan",
] as const;

const SCALES = [
  [1_000_000_000_000_000, "kuadrilion"],
  [1_000_000_000_000, "trilion"],
  [1_000_000_000, "bilion"],
  [1_000_000, "juta"],
] as const;

function below100(n: number): string {
  if (n < 10) return UNITS[n]!;
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${UNITS[n - 10]} belas`;
  const one = n % 10;
  const tens = `${UNITS[Math.floor(n / 10)]} puluh`;
  return one ? `${tens} ${UNITS[one]}` : tens;
}

function below1000(n: number): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  if (!hundreds) return below100(n);
  const head = hundreds === 1 ? "seratus" : `${UNITS[hundreds]} ratus`;
  return rest ? `${head} ${below100(rest)}` : head;
}

function toWordsAbs(n: number): string {
  if (n === 0) return UNITS[0];

  const parts: string[] = [];
  for (const [value, scale] of SCALES) {
    if (n >= value) {
      parts.push(`${below1000(Math.floor(n / value))} ${scale}`);
      n %= value;
    }
  }
  if (n >= 1000) {
    const count = Math.floor(n / 1000);
    parts.push(count === 1 ? "seribu" : `${below1000(count)} ribu`);
    n %= 1000;
  }
  if (n > 0) parts.push(below1000(n));
  return parts.join(" ");
}

/** Malay: 42 → "empat puluh dua" */
export const ms: LocaleConverter = (num) =>
  (num < 0 ? "negatif " : "") + toWordsAbs(Math.abs(num));
