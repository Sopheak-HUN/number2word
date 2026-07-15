import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const en = (n: number) => numberToWords(n, "en");

test("single digits", () => {
  assert.equal(en(0), "zero");
  assert.equal(en(1), "one");
  assert.equal(en(9), "nine");
});

test("teens and tens", () => {
  assert.equal(en(10), "ten");
  assert.equal(en(13), "thirteen");
  assert.equal(en(20), "twenty");
  assert.equal(en(21), "twenty-one");
  assert.equal(en(42), "forty-two");
  assert.equal(en(99), "ninety-nine");
});

test("hundreds", () => {
  assert.equal(en(100), "one hundred");
  assert.equal(en(101), "one hundred one");
  assert.equal(en(115), "one hundred fifteen");
  assert.equal(en(999), "nine hundred ninety-nine");
});

test("thousands and beyond", () => {
  assert.equal(en(1000), "one thousand");
  assert.equal(en(1001), "one thousand one");
  assert.equal(en(12345), "twelve thousand three hundred forty-five");
  assert.equal(en(1000000), "one million");
  assert.equal(en(2500000), "two million five hundred thousand");
  assert.equal(en(1000000000), "one billion");
});

test("skips empty groups", () => {
  assert.equal(en(1000001), "one million one");
  assert.equal(en(5000000010), "five billion ten");
});

test("negative numbers", () => {
  assert.equal(en(-1), "minus one");
  assert.equal(en(-42), "minus forty-two");
});

test("largest safe integer", () => {
  assert.equal(
    en(9007199254740991),
    "nine quadrillion seven trillion one hundred ninety-nine billion " +
      "two hundred fifty-four million seven hundred forty thousand " +
      "nine hundred ninety-one"
  );
});
