# number2words

Convert numbers to words in **17 languages**.

```ts
numberToWords(42);        // "forty-two"
numberToWords(42, "km");  // "សែសិបពីរ"
numberToWords(42, "zh");  // "四十二"
```

- 17 languages, each following its real grammar rules
- Zero dependencies
- Written in TypeScript — full type checking and autocomplete included
- Handles any safe integer, positive or negative (up to ±9,007,199,254,740,991)

## Supported languages

| Language | Code | 42 | 1234 |
|---|---|---|---|
| English (default) | `en` | forty-two | one thousand two hundred thirty-four |
| Arabic (Modern Standard) | `ar` | اثنان وأربعون | ألف ومئتان وأربعة وثلاثون |
| Burmese | `my` | လေးဆယ့်နှစ် | တစ်ထောင့်နှစ်ရာ့သုံးဆယ့်လေး |
| Chinese (Mandarin) | `zh` | 四十二 | 一千二百三十四 |
| French | `fr` | quarante-deux | mille deux cent trente-quatre |
| German | `de` | zweiundvierzig | eintausendzweihundertvierunddreißig |
| Hindi | `hi` | बयालीस | एक हज़ार दो सौ चौंतीस |
| Indonesian | `id` | empat puluh dua | seribu dua ratus tiga puluh empat |
| Japanese | `ja` | 四十二 | 千二百三十四 |
| Khmer | `km` | សែសិបពីរ | មួយពាន់ពីររយសាមសិបបួន |
| Lao | `lo` | ສີ່ສິບສອງ | ໜຶ່ງພັນສອງຮ້ອຍສາມສິບສີ່ |
| Malay | `ms` | empat puluh dua | seribu dua ratus tiga puluh empat |
| Portuguese (Brazilian) | `pt` | quarenta e dois | mil duzentos e trinta e quatro |
| Russian | `ru` | сорок два | одна тысяча двести тридцать четыре |
| Spanish | `es` | cuarenta y dos | mil doscientos treinta y cuatro |
| Thai | `th` | สี่สิบสอง | หนึ่งพันสองร้อยสามสิบสี่ |
| Vietnamese | `vi` | bốn mươi hai | một nghìn hai trăm ba mươi bốn |

## Install

```sh
npm install @num-words/number2word
```

## How to use

### Basic usage

```ts
import { numberToWords } from "@num-words/number2word";

// English is the default
numberToWords(42);           // "forty-two"
numberToWords(100);          // "one hundred"
numberToWords(1000000);      // "one million"

// Pass a language code as the second argument
numberToWords(42, "es");     // "cuarenta y dos"
numberToWords(42, "th");     // "สี่สิบสอง"
numberToWords(42, "ar");     // "اثنان وأربعون"
```

### Negative numbers

Each language uses its own word for minus:

```ts
numberToWords(-7);           // "minus seven"
numberToWords(-7, "es");     // "menos siete"
numberToWords(-7, "km");     // "ដកប្រាំពីរ"
numberToWords(-7, "zh");     // "负七"
```

### List the available languages

```ts
import { numberToWords, languages } from "@num-words/number2word";

for (const lang of languages) {
  console.log(lang, numberToWords(1234, lang));
}
```

### TypeScript

The `lang` parameter is typed, so a typo is a compile error, and `Language` is exported for your own signatures:

```ts
import { numberToWords, type Language } from "@num-words/number2word";

function priceInWords(amount: number, lang: Language) {
  return numberToWords(amount, lang);
}

numberToWords(1, "xx"); // ✘ compile error: not a supported language
```

### Error handling

```ts
numberToWords(1.5);        // ✘ TypeError  — decimals are not supported
numberToWords(NaN);        // ✘ TypeError
numberToWords(2 ** 53);    // ✘ TypeError  — beyond the safe integer range
numberToWords(1, "xx");    // ✘ RangeError — unknown language code (at runtime)
```

## API reference

### `numberToWords(num: number, lang?: Language): string`

Converts an integer to words in the given language (default `"en"`). Works for any safe integer, positive or negative. Throws a `TypeError` for non-integers and a `RangeError` for unsupported language codes.

### `languages: Language[]`

Array of all supported language codes: `["ar", "de", "en", "es", "fr", "hi", "id", "ja", "km", "lo", "ms", "my", "pt", "ru", "th", "vi", "zh"]`.

### `Language`

Union type of the supported codes, e.g. `"en" | "fr" | "km" | ...`.

## Grammar notes

Each language implements its real spelling rules, not word-for-word substitution — for example: Russian declension (одна тысяча / две тысячи / пять тысяч), Chinese 零-insertion (101 → 一百零一), Japanese 一-dropping (1000 → 千, but 11000 → 一万一千), Vietnamese sound changes (21 → hai mươi mốt), Thai เอ็ด (11 → สิบเอ็ด), German compounds (21000 → einundzwanzigtausend), Arabic duals (2000 → ألفان), the Indian numbering system for Hindi (लाख, करोड़), and the correct long or short scale for each language.

## Adding a language

1. Create `src/locales/<code>.ts` exporting a `LocaleConverter` — a function that takes a safe integer and returns the words.
2. Register it in the `LOCALES` object in `src/index.ts`.
3. Add a `test/<code>.test.ts` with expected outputs.

The `Language` type, the `languages` list, and validation all update automatically.

## Development

Requires Node.js 24+ (runs TypeScript directly, no build step needed for tests).

```sh
npm install          # install dev dependencies
npm test             # run the test suite (91 tests)
npm run typecheck    # type-check without emitting files
npm run build        # compile src/ to dist/
node example.ts      # print 1234 in all 17 languages
```

## License

[MIT](LICENSE)
