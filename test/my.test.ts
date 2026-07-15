import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const my = (n: number) => numberToWords(n, "my");

test("basics", () => {
  assert.equal(my(0), "သုည");
  assert.equal(my(1), "တစ်");
  assert.equal(my(10), "တစ်ဆယ်");
  assert.equal(my(100), "တစ်ရာ");
});

test("linked (creaky tone) forms when digits follow", () => {
  assert.equal(my(23), "နှစ်ဆယ့်သုံး");
  assert.equal(my(230), "နှစ်ရာ့သုံးဆယ်");
  assert.equal(my(1023), "တစ်ထောင့်နှစ်ဆယ့်သုံး");
});

test("Burmese scale words", () => {
  assert.equal(my(1000), "တစ်ထောင်");
  assert.equal(my(10000), "တစ်သောင်း");
  assert.equal(my(100000), "တစ်သိန်း");
  assert.equal(my(1000000), "တစ်သန်း");
  assert.equal(my(10000000), "တစ်ကုဋေ");
});

test("negative numbers", () => {
  assert.equal(my(-5), "အနုတ်ငါး");
});
