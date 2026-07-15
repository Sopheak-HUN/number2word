import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const th = (n: number) => numberToWords(n, "th");

test("basics", () => {
  assert.equal(th(0), "ศูนย์");
  assert.equal(th(1), "หนึ่ง");
  assert.equal(th(10), "สิบ");
  assert.equal(th(42), "สี่สิบสอง");
});

test("เอ็ด for trailing one, ยี่สิบ for twenty", () => {
  assert.equal(th(11), "สิบเอ็ด");
  assert.equal(th(20), "ยี่สิบ");
  assert.equal(th(21), "ยี่สิบเอ็ด");
  assert.equal(th(101), "หนึ่งร้อยเอ็ด");
  assert.equal(th(1001), "หนึ่งพันเอ็ด");
});

test("Thai scale words", () => {
  assert.equal(th(100), "หนึ่งร้อย");
  assert.equal(th(1000), "หนึ่งพัน");
  assert.equal(th(10000), "หนึ่งหมื่น");
  assert.equal(th(100000), "หนึ่งแสน");
  assert.equal(th(1000000), "หนึ่งล้าน");
  assert.equal(th(2500000), "สองล้านห้าแสน");
});

test("large numbers stack ล้าน", () => {
  assert.equal(th(1000000000000), "หนึ่งล้านล้าน");
});

test("negative numbers", () => {
  assert.equal(th(-5), "ลบห้า");
});
