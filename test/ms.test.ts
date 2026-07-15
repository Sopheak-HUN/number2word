import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const ms = (n: number) => numberToWords(n, "ms");

test("basics with Malay spellings", () => {
  assert.equal(ms(0), "sifar");
  assert.equal(ms(8), "lapan");
  assert.equal(ms(11), "sebelas");
  assert.equal(ms(15), "lima belas");
  assert.equal(ms(42), "empat puluh dua");
});

test("se- forms", () => {
  assert.equal(ms(100), "seratus");
  assert.equal(ms(121), "seratus dua puluh satu");
  assert.equal(ms(1000), "seribu");
  assert.equal(ms(2500), "dua ribu lima ratus");
});

test("juta and bilion (Malaysian short scale)", () => {
  assert.equal(ms(1000000), "satu juta");
  assert.equal(ms(1000000000), "satu bilion");
});

test("negative numbers", () => {
  assert.equal(ms(-7), "negatif tujuh");
});
