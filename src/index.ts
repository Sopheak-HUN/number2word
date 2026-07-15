import { en } from "./locales/en.ts";
import { fr } from "./locales/fr.ts";
import { km } from "./locales/km.ts";

const LOCALES = { en, fr, km } as const;

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
