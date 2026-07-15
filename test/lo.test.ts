import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const lo = (n: number) => numberToWords(n, "lo");

test("basics", () => {
  assert.equal(lo(0), "ສູນ");
  assert.equal(lo(1), "ໜຶ່ງ");
  assert.equal(lo(10), "ສິບ");
  assert.equal(lo(42), "ສີ່ສິບສອງ");
});

test("ຊາວ for twenty, ເອັດ for trailing one", () => {
  assert.equal(lo(11), "ສິບເອັດ");
  assert.equal(lo(20), "ຊາວ");
  assert.equal(lo(21), "ຊາວເອັດ");
});

test("Lao scale words", () => {
  assert.equal(lo(100), "ໜຶ່ງຮ້ອຍ");
  assert.equal(lo(1000), "ໜຶ່ງພັນ");
  assert.equal(lo(10000), "ໜຶ່ງໝື່ນ");
  assert.equal(lo(100000), "ໜຶ່ງແສນ");
  assert.equal(lo(1000000), "ໜຶ່ງລ້ານ");
});

test("negative numbers", () => {
  assert.equal(lo(-5), "ລົບຫ້າ");
});
