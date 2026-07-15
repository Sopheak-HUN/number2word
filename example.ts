import { numberToWords, languages, type Language } from "./src/index.ts";

const NAMES: Record<Language, string> = {
  ar: "Arabic",
  de: "German",
  en: "English",
  es: "Spanish",
  fr: "French",
  hi: "Hindi",
  id: "Indonesian",
  km: "Khmer",
  lo: "Lao",
  ms: "Malay",
  my: "Burmese",
  pt: "Portuguese",
  ru: "Russian",
  th: "Thai",
  vi: "Vietnamese",
  zh: "Chinese",
};

console.log("1234 in every language:\n");
for (const lang of languages) {
  console.log(`  ${lang}  ${NAMES[lang].padEnd(12)} ${numberToWords(1234, lang)}`);
}
