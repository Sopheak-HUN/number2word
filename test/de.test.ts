import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const de = (n: number) => numberToWords(n, "de");

test("eins vs ein", () => {
  assert.equal(de(0), "null");
  assert.equal(de(1), "eins");
  assert.equal(de(21), "einundzwanzig");
  assert.equal(de(101), "einhunderteins");
});

test("reversed compound tens", () => {
  assert.equal(de(42), "zweiundvierzig");
  assert.equal(de(99), "neunundneunzig");
  assert.equal(de(30), "dreißig");
});

test("compound thousands", () => {
  assert.equal(de(100), "einhundert");
  assert.equal(de(1000), "eintausend");
  assert.equal(de(1234), "eintausendzweihundertvierunddreißig");
  assert.equal(de(21000), "einundzwanzigtausend");
});

test("Millionen and Milliarden (long scale)", () => {
  assert.equal(de(1000000), "eine Million");
  assert.equal(de(2000000), "zwei Millionen");
  assert.equal(de(1000000000), "eine Milliarde");
  assert.equal(de(1000001), "eine Million eins");
});

test("negative numbers", () => {
  assert.equal(de(-7), "minus sieben");
});
