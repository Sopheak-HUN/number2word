import type { LocaleConverter } from "../types.ts";

// Modern Standard Arabic, simplified masculine forms without case endings.
const UNITS = [
  "صفر", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية",
  "تسعة", "عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر",
  "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر",
] as const;

const TENS = [
  "", "", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون",
  "تسعون",
] as const;

const HUNDREDS = [
  "", "مئة", "مئتان", "ثلاثمئة", "أربعمئة", "خمسمئة", "ستمئة", "سبعمئة",
  "ثمانمئة", "تسعمئة",
] as const;

// [value, [singular, dual, plural for 3-10]]
const SCALES = [
  [1_000_000_000_000_000, ["كوادريليون", "كوادريليونان", "كوادريليونات"]],
  [1_000_000_000_000, ["تريليون", "تريليونان", "تريليونات"]],
  [1_000_000_000, ["مليار", "ملياران", "مليارات"]],
  [1_000_000, ["مليون", "مليونان", "ملايين"]],
  [1_000, ["ألف", "ألفان", "آلاف"]],
] as const;

function below100(n: number): string {
  if (n < 20) return UNITS[n]!;
  const one = n % 10;
  const ten = TENS[Math.floor(n / 10)]!;
  // Units come before tens: 21 → واحد وعشرون.
  return one ? `${UNITS[one]} و${ten}` : ten;
}

function below1000(n: number): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  if (!hundreds) return below100(n);
  return rest ? `${HUNDREDS[hundreds]} و${below100(rest)}` : HUNDREDS[hundreds]!;
}

function scaleWords(count: number, [singular, dual, plural]: readonly [string, string, string]): string {
  if (count === 1) return singular;
  if (count === 2) return dual;
  // 3-10 take the plural; 11+ revert to the singular form.
  const noun = count >= 3 && count <= 10 ? plural : singular;
  return `${below1000(count)} ${noun}`;
}

function toWordsAbs(n: number): string {
  if (n === 0) return UNITS[0];

  const parts: string[] = [];
  for (const [value, forms] of SCALES) {
    if (n >= value) {
      parts.push(scaleWords(Math.floor(n / value), forms));
      n %= value;
    }
  }
  if (n > 0) parts.push(below1000(n));
  return parts.join(" و");
}

/** Arabic (MSA): 42 → "اثنان وأربعون" */
export const ar: LocaleConverter = (num) =>
  (num < 0 ? "سالب " : "") + toWordsAbs(Math.abs(num));
