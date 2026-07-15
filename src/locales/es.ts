import type { LocaleConverter } from "../types.ts";

// 0-29 are irregular enough to list outright.
const UNITS = [
  "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho",
  "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis",
  "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós",
  "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete",
  "veintiocho", "veintinueve",
] as const;

const TENS = [
  "", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta",
  "ochenta", "noventa",
] as const;

const HUNDREDS = [
  "", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos",
  "seiscientos", "setecientos", "ochocientos", "novecientos",
] as const;

/** `apocope` shortens the final 1: "veintiún mil", "treinta y un millones". */
function below100(n: number, apocope = false): string {
  if (n < 30) {
    if (apocope && n === 21) return "veintiún";
    if (apocope && n === 1) return "un";
    return UNITS[n]!;
  }
  const one = n % 10;
  const ten = TENS[Math.floor(n / 10)]!;
  if (!one) return ten;
  return `${ten} y ${apocope && one === 1 ? "un" : UNITS[one]}`;
}

function below1000(n: number, apocope = false): string {
  if (n === 100) return "cien";
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  if (!hundreds) return below100(n, apocope);
  return rest ? `${HUNDREDS[hundreds]} ${below100(rest, apocope)}` : HUNDREDS[hundreds]!;
}

function belowMillion(n: number, apocope = false): string {
  const thousands = Math.floor(n / 1000);
  const rest = n % 1000;
  const parts: string[] = [];
  if (thousands) {
    parts.push(thousands === 1 ? "mil" : `${below1000(thousands, true)} mil`);
  }
  if (rest) parts.push(below1000(rest, apocope));
  return parts.join(" ");
}

function toWordsAbs(n: number): string {
  if (n === 0) return UNITS[0];

  const parts: string[] = [];
  // Spanish long scale: billón = 10^12, and 10^9 is "mil millones".
  const billones = Math.floor(n / 1_000_000_000_000);
  n %= 1_000_000_000_000;
  const millones = Math.floor(n / 1_000_000);
  n %= 1_000_000;

  if (billones) {
    parts.push(billones === 1 ? "un billón" : `${belowMillion(billones, true)} billones`);
  }
  if (millones) {
    parts.push(millones === 1 ? "un millón" : `${belowMillion(millones, true)} millones`);
  }
  if (n) parts.push(belowMillion(n));
  return parts.join(" ");
}

/** Spanish: 42 → "cuarenta y dos" */
export const es: LocaleConverter = (num) =>
  (num < 0 ? "menos " : "") + toWordsAbs(Math.abs(num));
