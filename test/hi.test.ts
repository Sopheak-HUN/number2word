import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const hi = (n: number) => numberToWords(n, "hi");

test("irregular 0-99 words", () => {
  assert.equal(hi(0), "शून्य");
  assert.equal(hi(5), "पाँच");
  assert.equal(hi(17), "सत्रह");
  assert.equal(hi(21), "इक्कीस");
  assert.equal(hi(42), "बयालीस");
  assert.equal(hi(99), "निन्यानवे");
});

test("hundreds and thousands", () => {
  assert.equal(hi(100), "एक सौ");
  assert.equal(hi(101), "एक सौ एक");
  assert.equal(hi(1000), "एक हज़ार");
  assert.equal(hi(1234), "एक हज़ार दो सौ चौंतीस");
});

test("Indian numbering system: लाख and करोड़", () => {
  assert.equal(hi(100000), "एक लाख");
  assert.equal(hi(123456), "एक लाख तेईस हज़ार चार सौ छप्पन");
  assert.equal(hi(10000000), "एक करोड़");
  assert.equal(hi(1000000000), "एक अरब");
});

test("negative numbers", () => {
  assert.equal(hi(-7), "माइनस सात");
});
