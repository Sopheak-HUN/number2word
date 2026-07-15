import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const pt = (n: number) => numberToWords(n, "pt");

test("basics", () => {
  assert.equal(pt(0), "zero");
  assert.equal(pt(16), "dezesseis");
  assert.equal(pt(21), "vinte e um");
  assert.equal(pt(42), "quarenta e dois");
});

test("hundreds: cem vs cento", () => {
  assert.equal(pt(100), "cem");
  assert.equal(pt(101), "cento e um");
  assert.equal(pt(500), "quinhentos");
});

test("the e connector around mil", () => {
  assert.equal(pt(1000), "mil");
  assert.equal(pt(1100), "mil e cem");
  assert.equal(pt(1120), "mil cento e vinte");
  assert.equal(pt(2500), "dois mil e quinhentos");
  assert.equal(pt(1234), "mil duzentos e trinta e quatro");
});

test("milhões and bilhões (Brazilian short scale)", () => {
  assert.equal(pt(1000000), "um milhão");
  assert.equal(pt(2000000), "dois milhões");
  assert.equal(pt(1000000000), "um bilhão");
});

test("negative numbers", () => {
  assert.equal(pt(-7), "menos sete");
});
