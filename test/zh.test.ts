import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const zh = (n: number) => numberToWords(n, "zh");

test("basics", () => {
  assert.equal(zh(0), "零");
  assert.equal(zh(10), "十");
  assert.equal(zh(15), "十五");
  assert.equal(zh(21), "二十一");
  assert.equal(zh(42), "四十二");
});

test("零 fills skipped digits", () => {
  assert.equal(zh(101), "一百零一");
  assert.equal(zh(110), "一百一十");
  assert.equal(zh(1001), "一千零一");
  assert.equal(zh(10500), "一万零五百");
  assert.equal(zh(100000001), "一亿零一");
});

test("groups of 10^4: 万 and 亿", () => {
  assert.equal(zh(10000), "一万");
  assert.equal(zh(100000), "十万");
  assert.equal(zh(100000000), "一亿");
  assert.equal(zh(1234), "一千二百三十四");
});

test("negative numbers", () => {
  assert.equal(zh(-7), "负七");
});
