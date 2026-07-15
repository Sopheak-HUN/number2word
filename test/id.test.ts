import { test } from "node:test";
import assert from "node:assert/strict";
import { numberToWords } from "../src/index.ts";

const id = (n: number) => numberToWords(n, "id");

test("basics with Indonesian spellings", () => {
  assert.equal(id(0), "nol");
  assert.equal(id(8), "delapan");
  assert.equal(id(21), "dua puluh satu");
  assert.equal(id(42), "empat puluh dua");
});

test("se- forms", () => {
  assert.equal(id(100), "seratus");
  assert.equal(id(1000), "seribu");
  assert.equal(id(1234), "seribu dua ratus tiga puluh empat");
});

test("juta, miliar, triliun", () => {
  assert.equal(id(1000000), "satu juta");
  assert.equal(id(1000000000), "satu miliar");
  assert.equal(id(1000000000000), "satu triliun");
});

test("negative numbers", () => {
  assert.equal(id(-7), "minus tujuh");
});
