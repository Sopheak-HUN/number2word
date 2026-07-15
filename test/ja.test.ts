import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const ja = (n: number) => numberToWords(n, "ja");

test("basics", () => {
  assert.equal(ja(0), "零");
  assert.equal(ja(10), "十");
  assert.equal(ja(15), "十五");
  assert.equal(ja(21), "二十一");
  assert.equal(ja(42), "四十二");
});

test("一 is dropped before 十/百/千", () => {
  assert.equal(ja(100), "百");
  assert.equal(ja(111), "百十一");
  assert.equal(ja(1000), "千");
  assert.equal(ja(1234), "千二百三十四");
});

test("skipped digits take no filler", () => {
  assert.equal(ja(101), "百一");
  assert.equal(ja(1001), "千一");
  assert.equal(ja(10500), "一万五百");
  assert.equal(ja(100000001), "一億一");
});

test("groups of 10^4: 万, 億, 兆", () => {
  assert.equal(ja(10000), "一万");
  assert.equal(ja(100000), "十万");
  assert.equal(ja(100000000), "一億");
  assert.equal(ja(1000000000000), "一兆");
});

test("千 takes 一 in numbers of 万 or more", () => {
  assert.equal(ja(11000), "一万一千");
  assert.equal(ja(10000000), "一千万");
  assert.equal(ja(100000000000), "一千億");
});

test("negative numbers", () => {
  assert.equal(ja(-7), "マイナス七");
});
