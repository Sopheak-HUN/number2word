import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords, languages } from "../src/index.ts";

test("defaults to English", () => {
  assert.equal(numberToWords(42), "forty-two");
});

test("lists supported languages", () => {
  assert.deepEqual(
    [...languages].sort(),
    ["ar", "de", "en", "es", "fr", "hi", "id", "ja", "km", "lo", "ms", "my", "pt", "ru", "th", "vi", "zh"]
  );
});

test("every language handles 0, 1, and negatives", () => {
  for (const lang of languages) {
    for (const n of [0, 1, -1, 42, 1000, 1000000]) {
      const words = numberToWords(n, lang);
      assert.equal(typeof words, "string");
      assert.ok(words.length > 0, `${lang} returned empty string for ${n}`);
    }
  }
});

test("rejects unknown languages", () => {
  // @ts-expect-error - testing runtime validation with an unsupported code
  assert.throws(() => numberToWords(1, "xx"), RangeError);
});

test("rejects invalid numbers", () => {
  assert.throws(() => numberToWords(1.5), TypeError);
  // @ts-expect-error - testing runtime validation with a wrong type
  assert.throws(() => numberToWords("1"), TypeError);
  assert.throws(() => numberToWords(NaN), TypeError);
  assert.throws(() => numberToWords(Infinity), TypeError);
  assert.throws(() => numberToWords(9007199254740992), TypeError);
});
