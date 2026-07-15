import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const km = (n: number) => numberToWords(n, "km");

test("single digits", () => {
  assert.equal(km(0), "សូន្យ");
  assert.equal(km(1), "មួយ");
  assert.equal(km(5), "ប្រាំ");
  assert.equal(km(7), "ប្រាំពីរ");
  assert.equal(km(9), "ប្រាំបួន");
});

test("teens and tens", () => {
  assert.equal(km(10), "ដប់");
  assert.equal(km(15), "ដប់ប្រាំ");
  assert.equal(km(20), "ម្ភៃ");
  assert.equal(km(21), "ម្ភៃមួយ");
  assert.equal(km(42), "សែសិបពីរ");
  assert.equal(km(99), "កៅសិបប្រាំបួន");
});

test("hundreds", () => {
  assert.equal(km(100), "មួយរយ");
  assert.equal(km(123), "មួយរយម្ភៃបី");
  assert.equal(km(500), "ប្រាំរយ");
});

test("Khmer scale words: ពាន់, ម៉ឺន, សែន, លាន", () => {
  assert.equal(km(1000), "មួយពាន់");
  assert.equal(km(10000), "មួយម៉ឺន");
  assert.equal(km(100000), "មួយសែន");
  assert.equal(km(1000000), "មួយលាន");
  assert.equal(km(2500000), "ពីរលានប្រាំសែន");
});

test("large numbers combine លាន", () => {
  assert.equal(km(1000000000), "មួយពាន់លាន");
  assert.equal(km(1000000000000), "មួយលានលាន");
});

test("negative numbers", () => {
  assert.equal(km(-5), "ដកប្រាំ");
});
