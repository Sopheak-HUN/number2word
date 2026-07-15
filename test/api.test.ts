import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords, languages } from "../src/index.ts";

test("defaults to English", () => {
  assert.equal(numberToWords(42), "forty-two");
});

test("lists supported languages", () => {
  assert.deepEqual([...languages].sort(), ["en", "fr", "km"]);
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
