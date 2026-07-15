import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const ar = (n: number) => numberToWords(n, "ar");

test("basics", () => {
  assert.equal(ar(0), "صفر");
  assert.equal(ar(1), "واحد");
  assert.equal(ar(2), "اثنان");
  assert.equal(ar(11), "أحد عشر");
});

test("units come before tens", () => {
  assert.equal(ar(21), "واحد وعشرون");
  assert.equal(ar(42), "اثنان وأربعون");
});

test("hundreds with dual", () => {
  assert.equal(ar(100), "مئة");
  assert.equal(ar(125), "مئة وخمسة وعشرون");
  assert.equal(ar(200), "مئتان");
  assert.equal(ar(300), "ثلاثمئة");
});

test("singular, dual, and plural scale nouns", () => {
  assert.equal(ar(1000), "ألف");
  assert.equal(ar(2000), "ألفان");
  assert.equal(ar(3000), "ثلاثة آلاف");
  assert.equal(ar(1000000), "مليون");
  assert.equal(ar(2000000), "مليونان");
  assert.equal(ar(5000000), "خمسة ملايين");
  assert.equal(ar(1000000000), "مليار");
});

test("negative numbers", () => {
  assert.equal(ar(-5), "سالب خمسة");
});
