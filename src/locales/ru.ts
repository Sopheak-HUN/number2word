import type { LocaleConverter } from "../types.ts";

const UNITS = [
  "ноль", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь",
  "девять", "десять", "одиннадцать", "двенадцать", "тринадцать",
  "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать",
  "девятнадцать",
] as const;

const TENS = [
  "", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят",
  "семьдесят", "восемьдесят", "девяносто",
] as const;

const HUNDREDS = [
  "", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот",
  "семьсот", "восемьсот", "девятьсот",
] as const;

// [value, [singular, few (2-4), many (5+)], takes feminine 1/2]
const SCALES = [
  [1_000_000_000_000_000, ["квадриллион", "квадриллиона", "квадриллионов"], false],
  [1_000_000_000_000, ["триллион", "триллиона", "триллионов"], false],
  [1_000_000_000, ["миллиард", "миллиарда", "миллиардов"], false],
  [1_000_000, ["миллион", "миллиона", "миллионов"], false],
  [1_000, ["тысяча", "тысячи", "тысяч"], true],
] as const;

/** Russian plural form: 1 → singular, 2-4 → few, 5-20 and others → many. */
function plural(n: number, [one, few, many]: readonly [string, string, string]): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return many;
  const mod10 = n % 10;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

/** тысяча is feminine: одна тысяча, две тысячи. */
function below1000(n: number, feminine: boolean): string {
  const parts: string[] = [];
  if (n >= 100) {
    parts.push(HUNDREDS[Math.floor(n / 100)]!);
    n %= 100;
  }
  if (n >= 20) {
    parts.push(TENS[Math.floor(n / 10)]!);
    n %= 10;
  }
  if (n > 0) {
    if (feminine && n === 1) parts.push("одна");
    else if (feminine && n === 2) parts.push("две");
    else parts.push(UNITS[n]!);
  }
  return parts.join(" ");
}

function toWordsAbs(n: number): string {
  if (n === 0) return UNITS[0];

  const parts: string[] = [];
  for (const [value, forms, feminine] of SCALES) {
    if (n >= value) {
      const count = Math.floor(n / value);
      parts.push(`${below1000(count, feminine)} ${plural(count, forms)}`);
      n %= value;
    }
  }
  if (n > 0) parts.push(below1000(n, false));
  return parts.join(" ");
}

/** Russian: 42 → "сорок два" */
export const ru: LocaleConverter = (num) =>
  (num < 0 ? "минус " : "") + toWordsAbs(Math.abs(num));
