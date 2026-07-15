import type { LocaleConverter } from "../types.ts";

// Brazilian Portuguese spellings (dezesseis, bilhão = 10^9).
const UNITS = [
  "zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito",
  "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis",
  "dezessete", "dezoito", "dezenove",
] as const;

const TENS = [
  "", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta",
  "oitenta", "noventa",
] as const;

const HUNDREDS = [
  "", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos",
  "seiscentos", "setecentos", "oitocentos", "novecentos",
] as const;

const SCALES = [
  [1_000_000_000_000_000, "quatrilhão", "quatrilhões"],
  [1_000_000_000_000, "trilhão", "trilhões"],
  [1_000_000_000, "bilhão", "bilhões"],
  [1_000_000, "milhão", "milhões"],
] as const;

function below100(n: number): string {
  if (n < 20) return UNITS[n]!;
  const one = n % 10;
  const ten = TENS[Math.floor(n / 10)]!;
  return one ? `${ten} e ${UNITS[one]}` : ten;
}

function below1000(n: number): string {
  if (n === 100) return "cem";
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  if (!hundreds) return below100(n);
  return rest ? `${HUNDREDS[hundreds]} e ${below100(rest)}` : HUNDREDS[hundreds]!;
}

function toWordsAbs(n: number): string {
  if (n === 0) return UNITS[0];

  const parts: string[] = [];
  for (const [value, singular, plural] of SCALES) {
    if (n >= value) {
      const count = Math.floor(n / value);
      parts.push(count === 1 ? `um ${singular}` : `${below1000(count)} ${plural}`);
      n %= value;
    }
  }
  if (n >= 1000) {
    const count = Math.floor(n / 1000);
    parts.push(count === 1 ? "mil" : `${below1000(count)} mil`);
    n %= 1000;
  }
  if (n > 0) {
    // "e" joins the final part when it is below 100 or a round hundred:
    // "mil e cem", "dois mil e quinhentos", but "mil cento e vinte".
    const connector = parts.length && (n < 100 || n % 100 === 0) ? "e " : "";
    parts.push(connector + below1000(n));
  }
  return parts.join(" ");
}

/** Portuguese: 42 → "quarenta e dois" */
export const pt: LocaleConverter = (num) =>
  (num < 0 ? "menos " : "") + toWordsAbs(Math.abs(num));
