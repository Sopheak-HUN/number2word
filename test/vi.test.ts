import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const vi = (n: number) => numberToWords(n, "vi");

test("basics", () => {
  assert.equal(vi(0), "không");
  assert.equal(vi(5), "năm");
  assert.equal(vi(15), "mười lăm");
  assert.equal(vi(42), "bốn mươi hai");
});

test("mốt and lăm after mươi", () => {
  assert.equal(vi(21), "hai mươi mốt");
  assert.equal(vi(25), "hai mươi lăm");
});

test("linh for skipped tens", () => {
  assert.equal(vi(101), "một trăm linh một");
  assert.equal(vi(110), "một trăm mười");
});

test("không trăm pads inner groups", () => {
  assert.equal(vi(2015), "hai nghìn không trăm mười lăm");
  assert.equal(vi(2001), "hai nghìn không trăm linh một");
});

test("nghìn, triệu, tỷ", () => {
  assert.equal(vi(1000), "một nghìn");
  assert.equal(vi(1234), "một nghìn hai trăm ba mươi bốn");
  assert.equal(vi(1000000), "một triệu");
  assert.equal(vi(1000000000), "một tỷ");
});

test("negative numbers", () => {
  assert.equal(vi(-7), "âm bảy");
});
