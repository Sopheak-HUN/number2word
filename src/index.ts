import { ar } from "./locales/ar.ts";
import { de } from "./locales/de.ts";
import { en } from "./locales/en.ts";
import { es } from "./locales/es.ts";
import { fr } from "./locales/fr.ts";
import { hi } from "./locales/hi.ts";
import { id } from "./locales/id.ts";
import { km } from "./locales/km.ts";
import { lo } from "./locales/lo.ts";
import { ms } from "./locales/ms.ts";
import { my } from "./locales/my.ts";
import { pt } from "./locales/pt.ts";
import { ru } from "./locales/ru.ts";
import { th } from "./locales/th.ts";
import { vi } from "./locales/vi.ts";
import { zh } from "./locales/zh.ts";

const LOCALES = { ar, de, en, es, fr, hi, id, km, lo, ms, my, pt, ru, th, vi, zh } as const;

/** A supported language code. */
export type Language = keyof typeof LOCALES;

/** All supported language codes. */
export const languages = Object.keys(LOCALES) as Language[];

/**
 * Convert an integer to words in the given language.
 *
 * numberToWords(42)         → "forty-two"
 * numberToWords(42, "fr")   → "quarante-deux"
 * numberToWords(42, "km")   → "សែសិបពីរ"
 * numberToWords(42, "zh")   → "四十二"
 *
 * Works for any safe integer, positive or negative
 * (up to ±9,007,199,254,740,991).
 *
 * @param num - An integer.
 * @param lang - Language code (default "en").
 * @returns The number spelled out in words.
 * @throws {TypeError} If num is not a safe integer.
 * @throws {RangeError} If lang is not a supported language.
 */
export function numberToWords(num: number, lang: Language = "en"): string {
  if (!Number.isSafeInteger(num)) {
    throw new TypeError(`Expected an integer, got: ${num}`);
  }
  const locale = LOCALES[lang];
  if (!locale) {
    throw new RangeError(
      `Unsupported language "${lang}". Supported: ${languages.join(", ")}`
    );
  }
  return locale(num);
}
